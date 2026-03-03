# Coco App - AI Agent 桌面端工作台（面试复盘）

## 1. 项目简介 (Project Overview)

**一句话介绍**：
Coco App 是一款集成了 **RAG（检索增强生成）** 与 **MCP（Model Context Protocol）** 的跨平台桌面端工具。它通过“搜索 + 问答 + 操作”的一体化入口，利用 LLM 能力打通本地文件系统与命令行，实现了从自然语言交互到系统级操作的闭环。

**核心价值**：
- **Unified Entry**：统一了本地搜索、企业数据检索与 AI 助手的入口，减少上下文切换。
- **Agentic Workflow**：不仅是 Chat，更能通过 MCP 协议直接操作本地环境（Chat to Action）。
- **Cross-Platform**：基于 Tauri 实现了 Desktop (Win/Mac/Linux) 与 Web 端的 100% 业务逻辑复用。

---

## 2. 业务背景与痛点 (Situation)

在开发 Coco App 之前，我们面临以下核心痛点：

1.  **工具割裂与上下文切换高昂**：
    - 知识工作者需要在 Spotlight（本地搜索）、Browser（Web 搜索）、ChatGPT（AI 问答）与 Terminal（命令行操作）之间频繁切换。
    - **痛点**：缺乏一个聚合入口能同时覆盖“找文件”、“问知识”和“执行命令”。

2.  **跨端维护成本失控**：
    - 需要同时交付桌面端（私有化部署、高性能）与 Web 端（SaaS 访问）。
    - **痛点**：原有方案中，桌面端与 Web 端代码割裂，平台特定能力（如窗口管理、文件读写）侵入业务逻辑，导致 30% 以上的重复开发与回归成本。

3.  **大模型落地体验差**：
    - 直接接入 LLM API 响应慢，且无法感知本地上下文（如当前打开的文件）。
    - **痛点**：需要 RAG（检索增强）来注入上下文，并需要流式 UI 解决推理延迟带来的焦虑感。

---

## 3. 技术选型与架构 (Technology & Architecture)

### 3.1 技术栈 (Tech Stack)

| 领域 | 选型 | 理由 (Why) |
|---|---|---|
| **前端框架** | **React 18 + TypeScript** | 利用 Strict Mode 约束组件边界；Zustand 管理轻量级状态（Search/Chat/Settings）。 |
| **桌面运行时** | **Tauri 2 + Rust** | 相比 Electron 内存占用减少 50%+；Rust 保证系统级操作（FS/Shell）的安全性与高性能。 |
| **AI 协议** | **MCP (Model Context Protocol)** | 标准化的 Client-Server 协议，解耦 LLM 与工具实现，便于接入第三方工具生态。 |
| **通信协议** | **SSE (Server-Sent Events)** | 相比 WebSocket 更轻量，完美适配 LLM 的流式输出（打字机效果）。 |
| **构建工具** | **Vite + Tsup** | Vite 用于应用构建；Tsup 用于构建 Web SDK，配合 AST 扫描实现质量门禁。 |

---

## 4. 核心难点与解决方案 (Key Challenges - STAR)

### 难点一：AI Agent 的流式编排与体验优化
**Situation**: 用户不仅需要文本回复，还需要 AI 执行多步推理（Chain of Thought）和工具调用（Tool Call）。传统的流式渲染无法处理“正在思考”、“正在执行命令”等中间状态。
**Task**: 设计一套能解析复杂事件流的 UI 状态机，平滑展示 AI 的思考与行动过程。
**Action**:
- **自定义 SSE 解析器**：实现了一个流式状态机，将后端 SSE 数据流拆解为三种原子状态：
  - `Reasoning`：思考过程（UI 折叠显示，减少屏幕占用）。
  - `ToolCall`：工具调用（UI 显示 Loading/Success/Error 状态卡片）。
  - `Content`：最终文本（Markdown 增量渲染）。
- **乐观更新与回退**：在工具调用发起时立即在 UI 占位，异步等待 MCP Server 返回结果后再更新状态，消除等待感。
**Result**: 实现了类 Claude/OpenAI 的流畅对话体验，用户可清晰感知 AI 的“思考-行动-反馈”闭环。

### 难点二：多数据源聚合搜索 (RAG) 的高性能实现
**Situation**: 搜索需要同时聚合本地文件、历史记录、远程数据源等 5+ 个来源。只要有一个源（如远程 API）响应慢，整个搜索就会卡顿。
**Task**: 确保聚合搜索 P99 延迟控制在 200ms 内，且慢源不阻塞快源。
**Action**:
- **Rust 并发与熔断**：
  - 在 Rust 后端使用 `FuturesUnordered` 并发请求所有 `QuerySource`。
  - 配合 `tokio::time::timeout` 对每个源实施独立熔断（Budget 机制），超时直接丢弃慢源结果，保证整体响应速度。
- **结果公平性算法**：在聚合层实现动态权重排序，限制单个源的最大展示数量（`max_hits_per_source`），防止高频源（如历史记录）挤占结果页。
**Result**: 搜索响应速度稳定在 200ms 以内，且彻底解决了“慢源拖累”问题。

### 难点三：跨端架构适配 (Write Once, Run Everywhere)
**Situation**: 项目既要打包为桌面端 App，又要发布为 Web SDK 嵌入浏览器。两端 API 差异巨大（如 `fs.read` vs `fetch`）。
**Task**: 实现一套代码 100% 复用，无需维护两个分支。
**Action**:
- **适配器模式 (Adapter Pattern)**：
  - 设计 `BasePlatformAdapter` 抽象接口（定义 `search`, `chat`, `openWindow` 等核心能力）。
  - `TauriAdapter`：实现 Rust Command 调用。
  - `WebAdapter`：实现 HTTP API 调用。
- **依赖注入**：在应用启动时根据 `import.meta.env` 动态注入对应的 Adapter 实例，上层业务组件对平台差异完全无感。
**Result**: 业务逻辑复用率达到 100%，新功能开发只需写一次代码即可双端上线。

### 难点四：工程化质量门禁 (The Hard Gate)
**Situation**: Web SDK 经常因误引入桌面端依赖（如 `@tauri-apps/api`）而在运行时崩溃，人工 Code Review 难以杜绝。
**Task**: 从机制上根除跨端依赖泄露问题。
**Action**:
- **构建产物扫描**：在 `tsup.config.ts` 中编写自定义插件，构建完成后自动扫描所有产物文件。
- **AST/正则检测**：一旦发现包含 `@tauri-apps` 或 `src-tauri` 相关的引用字符串，直接抛出错误并阻断 CI/CD 流程。
**Result**: 上线后 Web 端因依赖问题的崩溃率降为 0。

---

## 5. 个人职责与成果 (My Role & Results)

### 核心职责
1.  **架构设计**：主导了前端 `PlatformAdapter` 分层架构与 Monorepo 工程搭建。
2.  **核心开发**：独立实现了 AI Agent 的 SSE 流式解析器与 MCP 客户端集成。
3.  **性能优化**：通过 Rust 并发与 React 虚拟列表优化，将搜索与对话渲染性能提升至毫秒级。

### 量化成果
- **性能指标**：聚合搜索 P99 延迟 < 200ms；首字渲染延迟（TTFB）降低 40%。
- **研发效率**：跨端代码复用率 100%，Web SDK 交付周期缩短 50%。
- **质量保障**：构建门禁拦截了 10+ 次潜在的跨端依赖泄露事故。

---

## 6. 附录：关键数据与代码索引

> 面试时可用于佐证技术深度的具体细节。

### 6.1 项目规模
- **Tauri Commands**: 81 个（Rust 接口面）
- **Rust Tests**: 144 个（后端测试覆盖）
- **Frontend Components**: 152 个（组件规模）
- **Zustand Stores**: 14 个（状态复杂度）

### 6.2 关键代码位置
- **流式解析与 UI**: [Chat.tsx](https://github.com/infinilabs/coco-app/src/components/Assistant/Chat.tsx)
- **平台适配接口**: [platform.ts](https://github.com/infinilabs/coco-app/src/types/platform.ts)
- **Rust 聚合搜索**: [search/mod.rs](https://github.com/infinilabs/coco-app/src-tauri/src/search/mod.rs)
- **Web 构建门禁**: [tsup.config.ts](https://github.com/infinilabs/coco-app/tsup.config.ts)
