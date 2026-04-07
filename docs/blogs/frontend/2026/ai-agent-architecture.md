# Coco Server 中的 AI Agent：从会话 API 到 RAG + 工具/MCP + Deep Research 的端到端链路

本文基于当前仓库代码，梳理 Coco 的 AI Agent 能力如何在后端 Go 服务与前端聊天组件之间协作：
- 包括 Assistant 配置模型、
- 会话/消息存储、
- HTTP Streaming 输出、
- RAG 检索增强、
- 工具调用（内置 Tools + MCP Server）、
- 以及 Deep Think / Deep Research 两类更复杂的 Agent 工作流。

## 1. 总体架构（模块视角）

Agent 的主链路可以概括为：

```text
Browser(UI) -> /chat/_create 或 /chat/:session/_chat
            -> 生成 user message（持久化）
            -> 启动异步处理任务（可取消）
            -> (可选) history -> tools/mcp -> search -> deep pipeline
            -> LLM streaming chunk -> 持久化 assistant message -> END
```

后端关键模块：

- 领域模型（Assistant 配置、chat settings、tool/mcp/datasource 等）：[assistant.go](/coco-server/core/assistant.go)
- 对外 API（会话/聊天/assistant CRUD 与 _ask）：[init.go](/coco-server/modules/assistant/api/init.go) / [session.go](/coco-server/modules/assistant/api/session.go)
- Agent 主执行管线（simple / deep_think / deep_research 分支）：[background_job.go](/coco-server/modules/assistant/service/background_job.go)
- RAG 上下文（从请求参数聚合开关、datasource/mcp 交集、provider 解析）：[rag_context.go](/coco-server/modules/assistant/common/rag_context.go)
- LLM 输出（Streaming + reasoning/think 分块）：[llm_generate.go](/coco-server/modules/assistant/langchain/llm_generate.go)
- 工具调用（内置工具 + MCP server 客户端适配）：[call_mcp_tools.go](/coco-server/modules/assistant/tools/call_mcp_tools.go)
- 企业内搜工具（直接走 document.QueryDocuments）：[enterprise_search.go](/coco-server/modules/assistant/tools/enterprise_search.go)
- 文档检索与权限过滤（RAG 的检索底座之一）：[service.go](/coco-server/modules/document/service.go)

## 2. Assistant：Agent 的可配置大脑

### 2.1 核心 Assistant 配置模型

Assistant 的配置集中在 [Assistant](/coco-server/core/assistant.go#L12-L35)：

- `Type`: `"simple" | "deep_think" | "deep_research" | ...`
- `AnsweringModel`: 回答模型（provider_id / name / settings / prompt）
- `Datasource`: 数据源开关 + ids + filter
- `ToolsConfig`: 内置工具开关（calculator / wikipedia / duckduckgo / scraper）
- `MCPConfig`: MCP server 列表、是否默认启用、最大迭代等
- `ChatSettings`: greeting、建议问题、history 策略（条数/压缩阈值/summary）

Deep 模式配置：

- Deep Think：`DeepThinkConfig`（意图分析模型、挑文档模型、是否挑 datasource/tools 等）[assistant.go](/coco-server/core/assistant.go#L37-L46)
- Deep Research：`DeepResearchConfig`（规划/研究/综合/报告/播客等多模型配置与执行参数）[assistant.go](/coco-server/core/assistant.go#L48-L92)

仓库提供了 Deep Research 默认值（偏开箱即用）：[DefaultDeepResearchConfig](/coco-server/core/assistant.go#L216-L260)

### 2.2 Assistant API 形态（仓库内文档）

仓库自带 assistant API 示例与 streaming 说明：[assistant.md](/coco-server/docs/content.en/docs/references/assistant.md)

## 3. API 层：会话/消息/assistant 的入口与 Streaming 协议

### 3.1 路由与权限

Assistant 模块注册 UI API，并通过 `api.RequirePermission(...)` 强制权限：  
[modules/assistant/api/init.go](/coco-server/modules/assistant/api/init.go)

核心接口：

- `POST /chat/_create`：创建会话（可带首条消息）
- `POST /chat/:session_id/_chat`：往会话里发消息（Streaming）
- `GET /chat/:session_id/_history`：拉取消息历史
- `POST /chat/:session_id/_cancel?message_id=...`：取消某条消息的回复任务
- `POST /assistant/:id/_ask`：不显式指定 session 的提问入口（仍会创建/写入 session 与消息）

实现入口见：[session.go](/coco-server/modules/assistant/api/session.go)

### 3.2 HTTP Streaming 的输出形态（Chunked JSON）

以 `sendChatMessageV2` 为例，流程是：

1. 先保存 user message  
2. 立即 `200` 返回第一段 JSON（包含新建消息的 `_id/_source`）  
3. 后续持续 `json.Encoder.Encode(...)` 输出 chunk  
4. 最终发送一个 `system: ReplyEnd` 的结束 chunk，并持久化 assistant message

对应实现：

- API 入口：[sendChatMessageV2](/coco-server/modules/assistant/api/session.go#L402-L478)
- 异步执行 + 最终落库 + END chunk：[ProcessMessageAsync](/coco-server/modules/assistant/service/background_job.go#L58-L170)

取消机制：

- API：[`cancelReplyMessage`](/coco-server/modules/assistant/api/session.go#L393-L400)
- 任务登记：API 中把 `CancelFunc` 放入 `InflightMessages`（见 `sendChatMessageV2/createChatSession/askAssistant` 的 Store 逻辑）

## 4. RAGContext：把请求开关 + assistant 配置合成一次 Agent 任务的上下文

每次消息处理前都会构建 RAGContext：  
[NewRagContext](/coco-server/modules/assistant/common/rag_context.go#L53-L116)

它做了几件很关键的事情：

- 从 URL query 获取开关与参数：
  - `search`（是否检索数据源）
  - `deep_thinking`
  - `mcp`
  - `datasource/category/subcategory/rich_category/tags`
  - `mcp_servers`
- 读取 `APP-INTEGRATION-ID`（即 `core.HeaderIntegrationID`）作为集成来源标识：[validate.go](/coco-server/core/validate.go#L21-L28)
- 对 datasource 与 mcp_servers 做交集裁剪：确保用户请求范围不会越过 assistant 配置允许的范围
- 解析 answering model provider，并把 provider 缓存在 context 内（用于补齐模型能力，例如 reasoning）

## 5. Agent 主执行管线：simple / deep_think / deep_research 三分支

核心分发点在：  
[ProcessMessageAsync](/coco-server/modules/assistant/service/background_job.go#L58-L170)

公共步骤：

- `params.InputValues["query"] = reqMsg.Message`
- history：按 `ChatSettings.HistoryMessage.Number` 拉取最近消息并塞进模板变量（同时构造 langchaingo 的 ChatMessageHistory）：[FetchSessionHistory](/coco-server/modules/assistant/service/background_job.go#L172-L219)

### 5.1 Simple（默认）

路径：`default` 分支

- 可选：工具调用（Tools/MCP）
- 可选：检索数据源（SearchDB + Datasource enabled）
- 最后：拼 prompt，调用 LLM，streaming 输出

实现：

- 主分支：[background_job.go](/coco-server/modules/assistant/service/background_job.go#L141-L167)
- 最终生成（含 context 拼装：history/references/tools_output）：[GenerateResponse](/coco-server/modules/assistant/langchain/llm_generate.go#L20-L166)

### 5.2 Deep Think（深度思考/深搜）

路径：`case core.AssistantTypeDeepThink` -> [RunDeepSearchTask](/coco-server/modules/assistant/deep_search/init.go#L19-L102)

关键特性：

- 可把 datasource 列表、mcp server 列表以字符串形式塞给模型（用于让模型决定选哪些）
- 先做 Query Intent（意图分析）：决定是否需要网络检索、是否需要调用工具
- 文档数量多时会二次精选并做 “in depth” 抓取（`PickingDocuments` / `FetchDocumentInDepth`）

代码入口：

- 意图分析：`langchain.ProcessQueryIntent`（入口在 deep_search）[init.go](/coco-server/modules/assistant/deep_search/init.go#L53-L57)
- 深搜整体：[deep_search/init.go](/coco-server/modules/assistant/deep_search/init.go)

### 5.3 Deep Research（研究型 Agent，带规划/执行/报告）

路径：`case core.AssistantTypeDeepResearch` -> `deep_research_v2.RunDeepResearchV2(...)`  
调用点：[background_job.go](/coco-server/modules/assistant/service/background_job.go#L131-L140)

Deep Research v2 使用 langgraphgo 构建有向图工作流：

- 图定义：[graph.go](/coco-server/modules/assistant/deep_research_v2/graph.go)
- 节点实现（planner/researcher/reporter/podcast 等）：[nodes.go](/coco-server/modules/assistant/deep_research_v2/nodes.go)

并且有一个 “内部优先 + 外部补充” 的搜索管理器：

- 内搜：EnterpriseSearchTool
- 外搜：TavilySearchTool  
见：[search_manager.go](/coco-server/modules/assistant/deep_research_v2/search_manager.go#L34-L116)

## 6. RAG（检索增强）链路：数据从哪里来、怎么被检索

### 6.1 文档数据如何进入系统（Connectors -> Document）

仓库里大量 connectors 会把外部系统内容转成 `core.Document` 并进入 pipeline/收集流程，例如：

- 飞书：构造 `core.Document`，带 categories/hierarchy path：[feishu/plugin.go](/coco-server/plugins/connectors/feishu/plugin.go#L404-L470)
- Dropbox：构造 Document、path hierarchy：[dropbox/files.go](/coco-server/plugins/connectors/dropbox/files.go#L124-L210)

文档 API 与 refine（URL 转 preview、icon fallback 等）：

- [document.go](/coco-server/modules/document/document.go)
- [search.go](/coco-server/modules/document/search.go)

### 6.2 检索：QueryDocuments（含权限/数据源过滤/检索模式）

Agent 内搜与 RAG 初筛依赖 `document.QueryDocuments`：

- 实现：[service.go](/coco-server/modules/document/service.go#L24-L160)

能力要点：

- 支持 `searchType`：
  - `"semantic"`：走 embedding 字段 `ai_insights.embedding.embedding1024`
  - `"hybrid"`：文本 fuzziness + semantic 组合
  - `"keyword"`：默认文本检索
- datasource 权限过滤与集成过滤：
  - `BuildDatasourceFilter(...)` 会把 “用户自有 + 分享 + integration 允许 + query 指定” 合并/求交集，并过滤 disabled datasource  
    代码：[BuildDatasourceFilter](/coco-server/modules/document/search.go#L259-L344)

Agent 在 simple/deep_think 分支里调用的初筛检索：

- [InitialDocumentBriefSearch](/coco-server/modules/assistant/tools/internal_search.go)

## 7. 工具系统：Built-in Tools + MCP Servers（Agent 的行动能力）

### 7.1 Built-in Tools

当 `assistant.ToolsConfig.Enabled` 为 true，会装配 langchaingo 的工具：

- Calculator / Wikipedia / Duckduckgo / Scraper  
见：[CallLLMTools](/coco-server/modules/assistant/tools/call_mcp_tools.go#L50-L75)

### 7.2 MCP Servers（多协议客户端 + LangChain 适配）

当 `mcp=true` 且 assistant 启用 MCP，并且 `mcp_servers` 与 assistant 的 MCP ids 有交集时，会初始化 MCP client。

支持协议（按代码分支）：

- Streamable HTTP：`client.NewStreamableHttpClient(cfg.URL)`
- SSE：`client.NewSSEMCPClient(cfg.URL)` + `Start`
- Stdio：`client.NewStdioMCPClient(cfg.Command, envs, cfg.Args...)` + `Start`  
见：[call_mcp_tools.go](/coco-server/modules/assistant/tools/call_mcp_tools.go#L99-L189)

## 8. Streaming 分块：Response / Think 的双通道输出

LLM streaming 的核心在 [GenerateResponse](/coco-server/modules/assistant/langchain/llm_generate.go#L20-L166)：

- 先发送一个 assistant response 的空 chunk（seq=0），作为开始信号
- 如果模型支持 reasoning，则使用 `WithStreamingReasoningFunc`：
  - `reasoningChunk` -> `common.Think`
  - `chunk` -> `common.Response`
- 否则使用 `WithStreamingFunc` 仅输出 `common.Response`

最终用 defer 把累计的 messageBuffer 写入 `replyMsg.Message`，并在 `ProcessMessageAsync` 的 defer 中落库 + ReplyEnd。

## 9. 权限/认证：Agent 能力的安全边界

### 9.1 请求侧认证方式（四选一）

`core.ValidateLogin` 会按顺序尝试：

1. Session access token（cookie session）
2. `Authorization: Bearer <jwt>`
3. `X-API-TOKEN: <token>`（KV 存储的 access token）
4. `APP-INTEGRATION-ID`（integration guest run-as）  
见：[validate.go](/coco-server/core/validate.go#L210-L241)

Auth Filter 会把 claims 注入 context，并加载用户权限集合：

- [plugins/security/filter/auth.go](/coco-server/plugins/security/filter/auth.go#L20-L78)

### 9.2 接口级权限

assistant/chat/document 等接口都通过 `api.RequirePermission(...)` 做鉴权（见第 3 节 init.go）。前端的权限文案映射也在仓库里可见：

- 中文：[permission.ts](/coco-server/web/src/locales/langs/zh-cn/permission.ts)
- 英文：[permission.ts](/coco-server/web/src/locales/langs/en-us/permission.ts)

## 10. 可验证的行为：仓库 DSL 测试用例

仓库内已有针对 assistant/chat 的 DSL 场景用例（包括创建会话、分享/可见性等）：

- [scenario2.dsl](/coco-server/tests/assistant/scenario2.dsl)
- [scenario3.dsl](/coco-server/tests/assistant/scenario3.dsl)

这些用例也能反向说明系统的权限 + 资源共享边界如何影响 assistant 的可见性与可用性。

## 11. 一句话总结

- Assistant 是 Agent 的配置载体：决定用什么模型、能访问哪些 datasource、能用哪些 tools/MCP、history 策略是什么。
- API 层提供 HTTP Streaming：前端能实时接收 token/think 分块，并可取消进行中的任务。
- Agent 执行是可插拔分支：simple（RAG + 生成）、deep_think（意图分析 + 二次精选 + 深挖）、deep_research（langgraph 工作流）。
- 检索与权限耦合在 document.QueryDocuments：datasource/integration/分享权限共同决定 RAG 能看到什么。
