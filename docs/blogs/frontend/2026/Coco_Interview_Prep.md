# Coco 项目核心架构与面试深度指南

本文档汇总了 Coco 项目（包含 Coco App 桌面端、Coco Server 服务端、Coco Web Admin 管理后台）的核心技术架构、关键实现细节以及面试常考的难点与解决方案（STAR 法则），旨在帮助你系统性地梳理项目亮点，从容应对面试拷打。

---

## 1. 项目概览与核心价值 (Elevator Pitch)

**一句话介绍**：
Coco 是一款集成了 **RAG（检索增强生成）** 与 **MCP（Model Context Protocol）** 的跨平台企业级 AI Agent 工作台。它打通了本地文件系统、命令行与企业知识库，实现了从“自然语言交互”到“系统级操作/深度研究”的完整闭环。

**解决的核心痛点**：
1. **工具割裂**：统一本地搜索、Web搜索、企业知识问答与命令行操作的入口。
2. **跨端维护成本**：通过适配器架构实现桌面端（Tauri）与 Web 端（SaaS）业务逻辑 100% 复用。
3. **大模型落地体验**：利用 RAG 注入精准上下文，利用 SSE 流式状态机解决推理延迟带来的体验焦虑。

---

## 2. 整体系统架构

系统分为三个主要端，各自承担不同的技术职责：

### 2.1 桌面端/客户端 (Coco App)
- **技术栈**：Tauri 2 + Rust + React 18 + Zustand + Vite。
- **定位**：高性能的本地入口。Rust 负责并发搜索、本地系统操作（FS/Shell）与 MCP 客户端通信；React 负责复杂的流式 UI 渲染。
- **亮点**：极低的内存占用（相比 Electron），毫秒级聚合搜索。

### 2.2 服务端 (Coco Server)
- **技术栈**：Go + LangChain/LangGraph + Vector DB (Milvus/PGVector)。
- **定位**：Agent 的“大脑”与数据中枢。负责 RAG 索引构建、检索、大模型路由、多步工作流编排（Deep Research）。
- **亮点**：配置化的 Assistant 模型，支持 Simple、Deep Think、Deep Research 三种复杂度的执行管线。

### 2.3 Web 管理后台 (Coco Web Admin)
- **技术栈**：React 18 + Vite 5 + Ant Design 5 + Redux Toolkit。
- **定位**：企业级资产管理（配置大模型、数据源、MCP Server、连接器等）。
- **亮点**：构建期文件路由生成、基于路由 Key 的 Keep-Alive、完善的微前端（Wujie）适配。

---

## 3. 核心业务模块与深度实现细节 (面试重点)

### 3.1 RAG (检索增强生成) 的全栈实现
RAG 是解决大模型幻觉和私有数据问答的核心底座。

* **数据摄入 (Ingestion)**：
  * 后端 Connector（如飞书、Notion、S3）将数据转化为 `core.Document`。
  * **切片策略**：固定长度 + 语义分段 + 滑窗，生成带有租户与权限元数据的 chunk。
* **检索与重排 (Retrieval & Rerank)**：
  * **混合检索**：基于 `document.QueryDocuments`，支持 Semantic (向量 embedding) + Keyword (文本倒排) + Hybrid 检索。
  * **权限过滤**：`BuildDatasourceFilter` 将“用户自有 + 分享 + 集成权限”做交集过滤，保证数据越权安全。
  * **重排**：使用 Cross-Encoder 对初筛结果进行重排序，提升 Top-K 准确率。
* **前端侧聚合 (App端)**：
  * 使用 Rust 的 `FuturesUnordered` 并发请求本地、历史、远程 API 等多数据源。
  * **公平性与熔断**：设置单源展示上限（防霸屏），并用 `tokio::time::timeout` 实施 Budget 熔断机制，慢源超时直接丢弃，保障整体 P99 延迟 < 200ms。

### 3.2 AI Agent 的执行管线与编排 (The Brain)
服务端针对不同的场景，提供了三种深度的 Agent 执行逻辑：

1. **Simple 模式**：
   * 标准的 RAG + LLM 生成。
   * 支持调用 Built-in Tools (计算器/维基百科) 和 MCP Servers。
2. **Deep Think (深度思考)**：
   * **意图识别 (Query Intent)**：先让模型判断是否需要联网或调工具。
   * **二次精选与深挖**：在海量召回文档中，让 LLM `PickingDocuments`，并对选中文档进行 `FetchDocumentInDepth`（深度读取），再进行总结。
3. **Deep Research (深度研究)**：
   * 基于 **LangGraph** 构建的有向图多步工作流。
   * 节点包含：`Planner` (生成研究计划) -> `Researcher` (多线程内外网搜索与阅读) -> `Reporter` (合成最终长篇报告) -> `Podcast` (生成播客)。
   * 具备“内部企业搜 + 外部 Tavily 搜”的智能路由能力。

### 3.3 MCP (Model Context Protocol) 的集成
MCP 是标准化大模型与外部工具交互的协议，让应用具备了“动手能力”。

* **为什么选 MCP**：解耦了大模型与工具的实现，方便接入海量第三方工具生态，无需为每个大模型定制 Tool Schema。
* **实现机制**：
  * 客户端/服务端通过 SSE 或 Stdio 协议与 MCP Server 建立连接。
  * 在大模型生成过程中，若触发 Tool Call，解析协议并转交对应的 MCP Server 执行，结果回传给 LLM 继续生成。

### 3.4 极致的流式交互体验 (The UI)
为了消除大模型等待的焦虑感，前端做了一套非常复杂的流式渲染引擎。

* **通信协议：为什么是 SSE 而不是 WebSocket？**
  * LLM 场景是“一次请求，持续单向流式响应”，SSE 原生契合。
  * 基于标准 HTTP 长连接，无需维护复杂的心跳与握手，自带断线重连。
  * 完美兼容后端的 Chunked JSON 协议与 MCP 标准。
* **流式状态机设计**：
  * 前端封装了自定义的 SSE 解析器，将后端的 chunk 数据拆解为原子状态：
    * `Reasoning`（Think 阶段）：折叠显示思考过程。
    * `ToolCall`（工具调用）：在 UI 上“乐观更新”占位（Loading卡片），执行完毕后转为 Success/Error。
    * `Content`：最终的 Markdown 增量渲染。
* **双通道输出**：服务端 `GenerateResponse` 会区分 `common.Think` 和 `common.Response`，前端 `@infinilabs/chat-message` 组件负责将 `<think>` 标签内容独立渲染为思维链可视化模块。

### 3.5 跨端架构与工程化质量
* **Adapter 适配器模式 (Write Once, Run Everywhere)**：
  * 抽象 `BasePlatformAdapter` 接口（定义 `search`, `chat`, `openWindow`）。
  * 桌面端注入 `TauriAdapter`（调 Rust 接口），Web 端注入 `WebAdapter`（调 HTTP API）。
  * 业务层代码 100% 复用。
* **Monorepo 与组件化**：将聊天核心抽离为 `@infinilabs/ai-chat` 和 `@infinilabs/chat-message`，支持在全屏搜索、悬浮助手(Copilot) 等多种形态中复用。
* **构建期质量门禁 (AST 检测)**：
  * 痛点：Web 端极易误引入 Tauri 的桌面专有依赖导致线上白屏。
  * 方案：在 `tsup.config.ts` 中编写插件，利用 AST / 正则扫描构建产物。一旦发现 `@tauri-apps` 引用直接阻断 CI/CD，将崩溃率降为 0。

### 3.6 Web Admin 后台的亮点
* **动态/静态路由与权限**：构建期扫描生成文件路由树，运行时通过 `userInfo.permissions` 与 `meta.permissions` 递归裁剪路由树，实现细粒度的菜单与按钮权限。
* **Keep-Alive 实现**：基于 URL `pathname + search` 生成唯一 `cacheKey`，结合 `keepalive-for-react` 实现复杂的页面级缓存与刷新。
* **统一请求与代理**：`@sa/axios` 封装扁平化请求响应（避免 `try/catch` 嵌套），巧妙利用 Vite Proxy 与 baseURL 支持开发环境代理与生产环境同域部署（Cookie Session）。

---

## 4. 面试高频拷打场景 (STAR 法则解析)

### 场景一：AI Agent 在多步操作时的 UI 渲染怎么做？
* **Situation**: 传统的 ChatGPT 只有文本流，但我们的 Agent 会思考、会查本地文件、会调工具，这些中间状态如果处理不好，页面会剧烈抖动或卡死。
* **Task**: 设计一套能解析复杂事件流的 UI 状态机。
* **Action**:
  1. 放弃 WebSocket，采用 **SSE (Server-Sent Events)**，利用其原生的单向流特性。
  2. 设计前端流式状态机，解析后端吐出的 JSON Chunk，区分为 `query_intent`, `think`, `tools`, `response` 等状态。
  3. **乐观更新 (Optimistic UI)**：当接收到 `tools` 调用信号时，立刻在聊天区插入一个 Loading 状态的工具卡片，异步等待执行结果。
  4. 采用 `@infinilabs/chat-message` 封装复杂的 Markdown + 工具卡片渲染逻辑，避免频繁 setState 导致整个聊天列表重绘。
* **Result**: 实现了媲美 Claude 3.5 Sonnet 的丝滑多步交互体验，用户能清晰看到大模型的“思考-行动-总结”完整闭环。

### 场景二：桌面端搜索如何保证聚合多个数据源时的性能？
* **Situation**: 用户搜一个词，App 需要同时请求本地文件、历史记录、企业知识库等 5+ 个来源，任何一个远程 API 慢，都会导致整个搜索列表卡顿出不来。
* **Task**: 保证搜索 P99 延迟在 200ms 以内。
* **Action**:
  1. **Rust 并发引擎**：在 Tauri 后端使用 Rust 的 `FuturesUnordered` 并发派发所有搜索任务。
  2. **Budget 熔断机制**：对每个源使用 `tokio::time::timeout` 施加严格的超时限制（如 150ms）。超时则视为空结果，绝不阻塞整体返回。
  3. **公平性算法**：在结果聚合层，设置 `max_hits_per_source`，防止本地历史记录等高频快源“霸屏”，保证企业知识等慢源结果的曝光率。
* **Result**: 彻底解决了“慢源拖累全盘”的问题，搜索延迟稳定在 200ms 左右，用户体验极佳。

### 场景三：你们是怎么解决 Tauri 桌面端和 Web 端代码维护成本的？
* **Situation**: 一开始桌面端和 Web 端分开写，业务逻辑重复度高达 30% 以上，且 Web 侧经常因为不小心引了 Tauri 的包而导致线上白屏崩溃。
* **Task**: 实现一套代码跨端运行，并从工程链路上根绝依赖污染。
* **Action**:
  1. **架构重构**：采用依赖注入的 **Adapter (适配器) 模式**。把所有平台强相关的 API（如网络请求、文件读写）抽离到 Adapter 中。在应用初始化时，根据环境变量注入对应的实现类。
  2. **Monorepo 管理**：抽离 `@infinilabs/ai-chat` 等核心 UI 组件为独立的 Package。
  3. **质量门禁 (Hard Gate)**：自己写了 Vite/Tsup 构建插件，利用 AST 解析构建产物，只要匹配到 Tauri 相关的 import，直接报错打断打包。
* **Result**: 实现了 100% 的业务组件复用，双端功能同步上线，且彻底消灭了跨端依赖污染引发的线上事故。

---

## 5. 面试加分项 (建议在交流中抛出)

1. **对状态管理的理解**：我们在管理后台用 Redux Toolkit（适合重逻辑、强规范的全局状态），但在 App 端聊天模块用 Zustand（适合轻量、灵活、响应快的组件级状态），这是基于场景的务实选型。
2. **对流式渲染的深度理解**：知道为什么不用 WebSocket。理解大模型的生成本质是 HTTP Chunked，SSE 是最符合 Web 标准的解法。
3. **LangGraph 的应用**：提到 Deep Research 并不是简单的 prompt 堆砌，而是用 LangGraph 将大模型从“单一对话者”变成了具有 Planner 和 Researcher 角色的图工作流引擎，体现了对 AI Agent 架构前沿的追踪。