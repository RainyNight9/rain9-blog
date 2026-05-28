## 🗓 总体时间线概览

| 阶段 | 内容 | 建议周数 | 累计周数 |
|------|------|----------|-----------|
| 1 | AI Coding | 2 周 | 2 |
| 2 | Agent Framework | 4 周 | 6 |
| 3 | MCP / Function Calling | 3 周 | 9 |
| 4 | Docker / Kubernetes | 3 周 | 12 |
| 5 | Agent 可观测性 | 2 周 | 14 |

最后 2 周为“综合实战 + 简历/作品集整理”。

---

## 📅 第一阶段：AI Coding（第 1-2 周）

**目标**：深度使用 Cursor / Claude Code，能独立用 AI 辅助完成一个小型项目。

### 第 1 周：工具熟悉 + 原理理解

| 天数 | 任务 | 产出 |
|------|------|------|
| 周一 | 安装 Cursor，配置主题、快捷键、AI 模型（可用自己的 API Key）。阅读 Cursor 官方文档（基础部分）。 | 能正常使用 Cursor 打开项目并对话。 |
| 周二 | 学习 Tab 补全、内联聊天（Cmd+K）、多文件上下文引用（@files）。 | 用 Cursor 生成一个简单的 Python 脚本（如批量重命名文件）。 |
| 周三 | 学习提示词编写：角色设定、任务拆分、约束条件。尝试用自然语言描述一个功能，看 AI 生成的效果。 | 记录 3 条“好提示词”和 3 条“差提示词”的对比。 |
| 周四 | 学习 Claude Code（需安装 Node 包）。了解它的 MCP 配置、本地模型支持。 | 运行 `claude` 命令，完成一次交互（如让 Claude 解释一段代码）。 |
| 周五 | 学习 `.cursorrules` 和 `CLAUDE.md` 的写法。给一个空项目写一份规则文件。 | 提交一个 `.cursorrules` 文件到 GitHub gist。 |
| 周六 | 用 Cursor 完整开发一个“命令行待办事项工具”（要求：增删改查，JSON 存储）。全程尽量让 AI 生成代码，你只写提示词和调试。 | 工具跑通，代码中有注释说明哪些部分是 AI 生成的。 |
| 周日 | 复盘：总结 AI Coding 的常见坑（如上下文截断、工具调用失败）。写一篇简短的学习笔记（Markdown 格式）。 | 笔记发布到你的掘金或 GitHub 仓库。 |

### 第 2 周：二次开发准备 + 进阶

| 天数 | 任务 | 产出 |
|------|------|------|
| 周一 | 研究 Cursor 的 AI 配置：可以切换模型（GPT-4、Claude 等），理解不同模型的差异。 | 用两个不同模型完成同一任务，对比结果。 |
| 周二 | 了解 AI 编程工具的二次开发可能性：Cursor 提供 Extension API 吗？Claude Code 的 MCP 集成原理。 | 画一张图：Claude Code ↔ MCP Server ↔ 本地工具的调用关系。 |
| 周三 | 尝试给 Cursor 配置自定义命令（如一键代码格式化、运行测试）。 | 配置一个 `Cmd+Shift+R` 运行 `npm run lint`。 |
| 周四 | 学习 Token 机制：用 `tiktoken` 计算一段对话的 token 数，理解 Context Window 限制。 | 写一个小脚本：读取对话历史，输出 token 数。 |
| 周五 | 学习 Prompt Injection 的概念，了解如何防止 AI 被恶意指令攻击。 | 能复述一个简单的注入攻击示例和防御方法。 |
| 周六 | 项目：用 Cursor 开发一个“Markdown 笔记整理工具”（支持标签、搜索）。 | 项目跑通，代码托管到 GitHub。 |
| 周日 | 完成第一阶段总结博客（可简略），列出你学会的技能和踩过的坑。 | 博客发布。 |

**第一阶段验收**：
- ✅ 能用 Cursor 完成一个 500 行以内的小工具，70% 代码由 AI 生成。
- ✅ 能解释 Context Window、Tool Use、System Prompt 的基本概念。
- ✅ 了解 `.cursorrules` 和 `CLAUDE.md` 的作用并会配置。

---

## 🤖 第二阶段：Agent Framework（第 3-6 周）

**目标**：掌握 LangChain 和 OpenAI Agents SDK，能手写 Agent 循环，理解多 Agent 协作。

### 第 3 周：LangChain 基础 + 手写 Agent Loop

| 天数 | 任务 | 产出 |
|------|------|------|
| 周一 | 安装 LangChain（Python），学习 `ChatOpenAI`、`ChatPromptTemplate`、`StrOutputParser`。 | 写一个“翻译助手”：用户输入中文，AI 输出英文。 |
| 周二 | 学习 `RunnableSequence` 和 `RunnablePassthrough`，实现链式调用。 | 做一个“总结 + 翻译 + 发送邮件”的链（邮件部分用打印代替）。 |
| 周三 | 学习 `Tool` 定义：用 `@tool` 装饰器写一个获取天气的假工具。 | 工具注册到 LangChain 并调用成功。 |
| 周四 | 学习 `AgentExecutor` 和 ReAct 模式。用 `create_react_agent` 创建一个简单 Agent，带上天气工具。 | Agent 能根据用户问题自动决定是否调用天气工具。 |
| 周五 | 手写一个极简 Agent Loop（不用 LangChain 内置）：while True: 调用 LLM → 解析是否有 tool_call → 执行工具 → 把结果追加到 messages。 | 代码能跑通，支持至少一个工具。 |
| 周六 | 对比 LangChain 的实现和手写版本的区别，理解 AgentExecutor 的内部逻辑（看源码）。 | 画一个流程图。 |
| 周日 | 学习 LangChain 的 Memory：`ConversationBufferMemory` 和 `ConversationSummaryMemory`。 | 实现一个带记忆的聊天机器人，能记住之前说过的话。 |

**第 4 周：LangChain 进阶 + OpenAI Agents SDK**

| 天数 | 任务 | 产出 |
|------|------|------|
| 周一 | 学习 LCEL（LangChain Expression Language）的高级用法：并行调用、回退、重试。 | 写一个链：先调用 GPT-4，失败则回退到 GPT-3.5。 |
| 周二 | 学习 LangChain 的文档加载器和文本分割器，构建一个简单的 RAG（检索增强生成）。 | 让 Agent 回答关于你自己一个 PDF 文档的问题。 |
| 周三 | 安装 OpenAI Agents SDK（`openai-agents` 包）。学习 `Agent`、`Runner`、`function_tool`。 | 用 OpenAI SDK 实现一个简单的单 Agent。 |
| 周四 | 学习 Handoff（移交）：多个 Agent 协作，一个负责客服，一个负责技术，通过 Handoff 切换。 | 实现一个“客服主管”Agent，能 handoff 到“退货专员”。 |
| 周五 | 学习 Tracing 基础：OpenAI SDK 自带 trace，在终端或 LangSmith 上查看。 | 跑一个对话，导出 trace 截图。 |
| 周六 | 对比 LangChain 和 OpenAI SDK 的异同（设计哲学、易用性、社区）。 | 写一篇对比分析（可发博客）。 |
| 周日 | 总结 LangChain 常用模式，整理自己的代码片段库。 | 在 GitHub 上创建 `agent-patterns` 仓库，存放典型示例。 |

**第 5 周：多 Agent 框架（AutoGen / CrewAI） + 原理深化**

| 天数 | 任务 | 产出 |
|------|------|------|
| 周一 | 安装 AutoGen（`pyautogen`）。学习 `ConversableAgent` 基础。 | 两个 Agent 互相聊天解决一个简单的数学问题。 |
| 周二 | 学习 AutoGen 的 GroupChat 和 Manager。模拟一个代码写手 + 评论员 + 执行员的团队。 | Agent 们一起完成一个“写排序算法并测试”的任务。 |
| 周三 | 安装 CrewAI。学习 `Agent`、`Task`、`Crew` 的概念。 | 定义一个研究助理团队：搜索 + 总结 + 报告生成。 |
| 周四 | 对比 AutoGen 和 CrewAI 的使用场景（自主对话 vs 预定义流程）。 | 制作一个对比表格。 |
| 周五 | 深入理解 ReAct 原理，阅读 Anthropic 关于 Tool Use 的官方文档。 | 能口头讲清楚“Thought → Action → Observation”循环。 |
| 周六 | 学习 Plan-and-Solve、CoT（Chain of Thought）等高级提示技术。 | 用提示词让 LLM 解决一个复杂逻辑题，要求输出推理步骤。 |
| 周日 | 复习本周内容，整理代码。 | GitHub 仓库增加 AutoGen 和 CrewAI 示例。 |

**第 6 周：Provider 抽象实战 + 集成测试**

| 天数 | 任务 | 产出 |
|------|------|------|
| 周一 | 设计一个简单的 `LLMProvider` 接口（支持 OpenAI 和 Anthropic）。 | 接口定义文件。 |
| 周二 | 实现 OpenAI Provider 和 Anthropic Provider。 | 两个类都能调用各自 API 返回结果。 |
| 周三 | 实现工厂模式 `ProviderFactory`，根据配置字符串创建对应 Provider。 | 单元测试通过。 |
| 周四 | 将手写的 Agent Loop 改造为依赖 Provider 接口，而不是硬编码 OpenAI。 | Agent 可以随时切换模型。 |
| 周五 | 集成测试：同一个任务（如写一首诗）用 OpenAI 和 Claude 分别运行，对比输出和 token 消耗。 | 记录结果到文档。 |
| 周六 | 写一篇关于 Provider 抽象层的博客（可以引用 mini-cc 源码）。 | 博客发布。 |
| 周日 | 第二阶段整体复盘，写一份“Agent Framework 学习总结”。 | 总结文档，列出你学到的核心概念和可复用代码。 |

**第二阶段验收**：
- ✅ 能用 LangChain 或 OpenAI SDK 构建一个能调用工具的 Agent。
- ✅ 能手写一个简化版 Agent Loop。
- ✅ 能实现一个简单的 Provider 抽象，支持至少两个模型。
- ✅ 了解 AutoGen / CrewAI 的多 Agent 协作模式。

---

## 🔌 第三阶段：MCP / Function Calling（第 7-9 周）

**目标**：深入理解 Function Calling 协议，能独立开发 MCP Server 并集成到 Client。

### 第 7 周：Function Calling 基础 + JSON Schema

| 天数 | 任务 | 产出 |
|------|------|------|
| 周一 | 学习 OpenAI Function Calling 官方文档。理解 `tools`、`tool_choice` 参数。 | 写一个 Python 脚本，调用 OpenAI API，定义一个“获取当前时间”的工具。 |
| 周二 | 学习 JSON Schema 基础：`type`、`properties`、`required`。 | 为“发送邮件”工具写一个完整的 JSON Schema。 |
| 周三 | 学习 Anthropic Tool Use 格式，对比两者的差异（特别是 `tool_calls` 结构）。 | 写一个对比表。 |
| 周四 | 实现一个简单的 Tool Runtime：接收 tool call 请求 → 校验参数 → 执行 → 返回结果。 | 代码托管。 |
| 周五 | 学习 Tool 调用中的错误处理：参数错误、超时、权限不足。 | 为你的 Tool Runtime 增加三种错误类型的返回。 |
| 周六 | 实战：写一个“计算器”工具，支持加减乘除，通过 Function Calling 让 LLM 调用。 | 完整交互演示（可用命令行）。 |
| 周日 | 学习 MCP 协议概念：JSON-RPC、Resources、Tools、Prompts。阅读 MCP 官方文档。 | 画一张 MCP 架构图（Client ↔ Server）。 |

**第 8 周：MCP Server 开发（Python 或 TypeScript）**

| 天数 | 任务 | 产出 |
|------|------|------|
| 周一 | 安装 MCP Python SDK（`mcp` 包）。按照官方教程创建第一个 MCP Server，只返回一个“ping”工具。 | 能用 MCP Inspector 测试连接。 |
| 周二 | 给 Server 添加一个“读取本地文件”工具，注意路径安全。 | 工具能返回文件内容（限制读取特定目录）。 |
| 周三 | 学习 MCP Resources：将某个目录下的文件列表暴露为 resources。 | Client 能列出 resources 并读取内容。 |
| 周四 | 学习 MCP Prompts：定义一个动态提示词模板（如“代码审查助手”）。 | 调用 prompt 返回结构化提示词。 |
| 周五 | 将 MCP Server 集成到 Claude Desktop 或 Cursor（配置 `claude_desktop_config.json`）。 | 在 Claude Desktop 里直接调用你的工具。 |
| 周六 | 用 TypeScript 实现同一个 MCP Server（`@modelcontextprotocol/sdk`）。 | 提供 Python 和 TS 两个版本。 |
| 周日 | 写一篇 MCP 实战教程，记录你搭建过程中踩的坑（比如 JSON-RPC 格式错误、工具参数不匹配）。 | 博客发布。 |

**第 9 周：安全 + 高级话题**

| 天数 | 任务 | 产出 |
|------|------|------|
| 周一 | 学习 MCP 安全最佳实践：输入校验、权限最小化、命令黑名单。 | 为你的 MCP Server 增加一个“危险命令黑名单”检查。 |
| 周二 | 学习 MCP 的 Transport：stdio 和 SSE（Server-Sent Events）。尝试实现一个 SSE 传输的 Server。 | 能用 HTTP 方式调用 MCP Server。 |
| 周三 | 学习 MCP 的 Client 端开发（如用 Python MCP Client 连接你的 Server）。 | 写一个简单的 Client，调用 Server 的工具。 |
| 周四 | 研究 MCP 社区有哪些好用的 Server（如 GitHub、Slack、数据库）。尝试跑一个社区 Server。 | 成功调用社区 Server 的一个工具。 |
| 周五 | 了解 MCP 与 Agent Framework 的集成方式（如 LangChain 的 `MCPTool`）。 | 写一个 LangChain Agent，使用 MCP 工具。 |
| 周六 | 项目：开发一个“个人知识库助手”MCP Server，支持搜索本地 Markdown 笔记。 | Server 完善，并写好 README 部署说明。 |
| 周日 | 第三阶段总结，整理代码和文档到 GitHub。 | 发布一个 `mcp-server-kb` 仓库。 |

**第三阶段验收**：
- ✅ 能独立从零开发一个 MCP Server（支持 Tools + Resources）。
- ✅ 能将该 Server 集成到 Claude Desktop 或 Cursor 中使用。
- ✅ 理解 MCP 协议的核心概念，并能解释与普通 Function Calling 的区别。

---

## 🐳 第四阶段：Docker / Kubernetes（第 10-12 周）

**目标**：将 Agent 应用容器化，并部署到 Kubernetes 集群。

### 第 10 周：Docker 基础 + 容器化 Agent

| 天数 | 任务 | 产出 |
|------|------|------|
| 周一 | 安装 Docker，学习 `docker run`、`docker build`、`docker ps` 等基础命令。 | 跑通 hello-world 容器。 |
| 周二 | 为你的 Python Agent（第二阶段写的）编写 `Dockerfile`。 | 镜像能成功 build，大小控制在 1GB 以内。 |
| 周三 | 学习 `.dockerignore` 和多阶段构建。优化镜像大小。 | 将镜像大小缩减 30% 以上。 |
| 周四 | 用 `docker run` 运行 Agent 容器，暴露 API 端口（如 FastAPI）。 | 用 `curl` 调用 Agent 的接口。 |
| 周五 | 学习 Docker Compose：定义一个 `docker-compose.yml`，同时启动 Agent + Redis（用于缓存）。 | 一个命令启动整套服务。 |
| 周六 | 学习容器日志管理（`docker logs`）、资源限制（`--memory`、`--cpus`）。 | 为 Agent 容器设置内存上限 512MB。 |
| 周日 | 将 Agent 镜像推送到 Docker Hub 或私有 Registry。 | 镜像仓库可被他人拉取。 |

**第 11 周：Kubernetes 基础**

| 天数 | 任务 | 产出 |
|------|------|------|
| 周一 | 安装 minikube 或 kind（本地 K8s 集群）。学习 `kubectl` 基础命令。 | 集群正常运行，`kubectl get nodes` 显示 Ready。 |
| 周二 | 学习 Pod 和 Deployment：写一个 YAML 部署你的 Agent 镜像。 | `kubectl apply` 后 Pod 运行成功。 |
| 周三 | 学习 Service：ClusterIP、NodePort。暴露 Agent 服务。 | 可以用 `kubectl port-forward` 或 NodePort 访问 Agent。 |
| 周四 | 学习 ConfigMap 和 Secret：将 API Key 等配置从镜像中分离。 | Agent 从环境变量读取 API Key。 |
| 周五 | 学习 Ingress：安装 Ingress Controller，配置域名访问 Agent。 | 通过域名（如 `agent.local`）调用服务。 |
| 周六 | 学习 Horizontal Pod Autoscaler（HPA）：基于 CPU 负载自动扩容。 | 对 Agent 进行压力测试，观察 Pod 数量变化。 |
| 周日 | 学习 Helm：用 Helm Chart 打包你的 Agent 应用。 | 能通过 `helm install` 一键部署。 |

**第 12 周：K8s 进阶 + Agent 特有考虑**

| 天数 | 任务 | 产出 |
|------|------|------|
| 周一 | 学习 StatefulSet：为 Agent 会话保持做铺垫（如果需要）。 | 部署一个带持久化存储的 Agent。 |
| 周二 | 学习 K8s 的日志收集：EFK（Elasticsearch, Fluentd, Kibana）或 Loki。 | Agent 的日志被收集到 Kibana 中。 |
| 周三 | 学习 K8s 的 RBAC：为 Agent 服务创建只读权限的 ServiceAccount。 | 最小权限原则配置。 |
| 周四 | 讨论：Agent 容器化的特殊点（如每个用户一个 Pod？长上下文如何缓存？API 速率限制）。 | 写一篇分析文章。 |
| 周五 | 实战：将第三阶段的 MCP Server 容器化并部署到 K8s。 | MCP Server 在集群内可被其他服务调用。 |
| 周六 | 学习 Knative（Serverless on K8s）：将 Agent 部署为 Knative Service，支持缩容到 0。 | 无流量时 Pod 停止，有流量自动启动。 |
| 周日 | 第四阶段总结：写一份“Agent 容器化与 K8s 部署最佳实践”文档。 | 文档分享到团队或 GitHub。 |

**第四阶段验收**：
- ✅ 能编写 `Dockerfile` 打包 Agent，并通过 `docker run` 运行。
- ✅ 能用 Kubernetes 部署 Agent 到 minikube，暴露外部访问。
- ✅ 了解 HPA、ConfigMap、Secret 等常用资源。
- ✅ 能讨论 Agent 容器化与普通 Web 应用的不同点。

---

## 📈 第五阶段：Agent 可观测性（第 13-14 周）

**目标**：为 Agent 增加日志、追踪、指标，并开发一个简单的轨迹可视化前端。

### 第 13 周：可观测性工具接入

| 天数 | 任务 | 产出 |
|------|------|------|
| 周一 | 学习 OpenTelemetry 概念：Trace、Span、Exporter。 | 安装 OpenTelemetry SDK。 |
| 周二 | 为你的 Agent 代码手动添加 Span（每个 tool call、每次 LLM 请求）。 | 能输出 trace 到控制台（或 Jaeger）。 |
| 周三 | 搭建 Jaeger（用 Docker），将 Agent 的 trace 发送到 Jaeger。 | 在 Jaeger UI 中看到完整的调用链。 |
| 周四 | 学习 LangSmith：注册账号，将 Agent 的一次对话记录到 LangSmith。 | 生成分享链接，能看到每一步的输入输出。 |
| 周五 | 学习 LangFuse 或 Arize Phoenix（开源替代）。 | 对比它们与 LangSmith 的差异。 |
| 周六 | 学习 Metrics：用 Prometheus 收集 Agent 的 token 使用量、错误率、延迟。 | 在 Grafana 中展示仪表盘。 |
| 周日 | 学习日志结构化：将 Agent 日志输出为 JSON 格式，并采集到 Loki。 | 用 Grafana 查询日志。 |

**第 14 周：前端可视化 + 综合实战**

| 天数 | 任务 | 产出 |
|------|------|------|
| 周一 | 学习 React + TypeScript 基础（如果还不熟，突击一下）。 | 能跑起一个 Vite 项目。 |
| 周二 | 设计一个简单的 Agent Trace Viewer 前端：输入 trace ID，展示步骤列表。 | 能从 JSON 文件读取数据并展示。 |
| 周三 | 使用 `reactflow` 或 `vis-timeline` 将 Agent 的执行步骤可视化为时间轴。 | 每个步骤有 icon 和耗时。 |
| 周四 | 将前端与后端 Agent 集成：Agent 执行完成后自动生成 trace ID，前端通过 API 获取数据。 | 完整 demo。 |
| 周五 | 学习 `agenttrace-react` 之类的库，看看能否直接复用。 | 尝试集成，记录优缺点。 |
| 周六 | 综合实战：将之前所有阶段的成果整合——容器化 Agent + MCP Server + K8s 部署 + 可观测性 + 前端轨迹回放。 | 一个端到端的演示项目。 |
| 周日 | 写一篇“从零到一构建可观测的 AI Agent”总结文章，附上源码和演示截图。 | 博客发布 + GitHub README 更新。 |

**第五阶段验收**：
- ✅ Agent 能输出结构化日志并发送到 Jaeger / LangSmith。
- ✅ 能用 Prometheus + Grafana 监控关键指标。
- ✅ 能开发一个简单的 Web 界面展示 Agent 执行轨迹。

---

## 🎯 最终综合实战（第 15-16 周，可选）

如果时间允许，再加两周做一个完整的**对标 JD 的结业项目**：

- **项目名**：一个可配置的 Agent 服务平台（类似 mini-cc 但更完善）
- **功能**：
  - 支持多 Provider（OpenAI / Anthropic / Qwen）
  - 内置 3+ 工具（文件读写、命令执行、MCP 集成）
  - 记忆系统（短期 + 长期摘要）
  - 容器化 + K8s 部署
  - LangSmith 追踪 + 自定义前端轨迹回放
  - 提供 HTTP API 和 CLI 两种交互方式
- **产出**：
  - 完整代码仓库（包含 README、设计文档、部署指南）
  - 一篇万字实战教程
  - 在线 Demo（可选，可用免费的 K8s 集群）

---

## 📌 每日执行建议

- **每天固定时段**：建议晚上 8-10 点或早起 1.5 小时，形成习惯。
- **周五晚回顾**：本周学到的三个最重要概念 + 一个下周要改进的地方。
- **每周日整理**：将代码、笔记、博客推送到 GitHub，保持绿墙。
- **遇到卡顿**：最多花 1 小时自己研究，还不行就记录问题，跳过去或请教他人，不要停滞。

---

你可以把这份计划打印出来，每完成一天就划掉一天。三个月后再回头看，你会惊讶自己的成长。

如果你需要我把某个阶段的具体代码示例、参考资料链接整理出来，随时告诉我。祝你按计划拿下这份 JD！