# Coco App AI Agent 技术架构分析

本文档基于对 `coco-app` 代码库的分析，总结其 AI Agent 相关功能、架构设计与关键实现细节。

## 1. 概述

Coco App 是一个跨平台（Tauri + React）的桌面端应用，集成了**统一搜索**与**AI 助手**功能。其 Agent 能力主要体现在：
- **多模态交互**：支持文本对话、文件附件上传。
- **多阶段推理**：前端明确管理 `query_intent`（意图识别）、`tools`（工具调用）、`fetch_source`（数据获取）等推理步骤。
- **工具与扩展**：支持 MCP (Model Context Protocol) 协议，允许接入外部工具与数据源；同时内置本地计算器、文件搜索等扩展。
- **混合架构**：前端负责状态管理与 UI 呈现，Rust 后端负责系统级能力与请求转发，核心 Agent 逻辑（如 LLM 推理）主要依赖远程 `coco-server`，但支持本地 MCP 接入。

---

## 2. 前端 Agent 架构

前端是用户与 Agent 交互的主战场，负责维护会话状态、处理流式响应以及管理工具调用的可视化。

### 2.1 核心组件与状态管理

- **Chat 容器** (`src/components/Assistant/Chat.tsx`)
  - 作为 Agent 的主入口，集成了对话历史、输入框、工具状态展示等。
  - 通过 props 接收 `isSearchActive`, `isDeepThinkActive`, `isMCPActive` 等标志，表明 Agent 具备搜索增强、深度思考（CoT）和 MCP 工具调用的能力。

- **多阶段状态流转** (`src/hooks/useChatActions.ts`)
  - 代码中明确定义了 Agent 的执行步骤状态 `loadingStep`：
    ```typescript
    setLoadingStep({
      query_intent: false, // 意图识别
      tools: false,        // 工具调用
      fetch_source: false, // 获取数据源
      pick_source: false,  // 选择数据源
      // ...
    });
    ```
  - 这表明 Agent 的执行流程是结构化的，而非单一的文本生成。

- **流式响应处理** (`src/hooks/useStreamChat.ts`)
  - 负责处理服务端返回的 SSE (Server-Sent Events) 流。
  - 解析流中的不同事件（如 `thought` 思考过程、`tool_call` 工具调用、`content` 内容生成），并在 UI 上实时反馈。

### 2.2 MCP (Model Context Protocol) 集成

- **配置入口** (`src/components/Search/MCPPopover.tsx`)
  - 提供了 MCP 服务器的管理界面，允许用户启用/禁用特定的 MCP 服务。
  - 通过 `getMCPByServer` 获取可用的数据源（Data Sources），这些源可被 Agent 检索或作为上下文使用。

---

## 3. 后端 Agent 支持 (Rust)

Rust 层 (`src-tauri`) 主要作为系统能力的桥梁，处理本地资源访问、系统命令执行以及与远程 Agent 服务的通信。

### 3.1 Assistant 模块 (`src-tauri/src/assistant/`)

- **命令转发** (`src-tauri/src/assistant/mod.rs`)
  - 暴露了 Tauri 命令供前端调用，如 `chat_create`, `chat_chat`, `close_session_chat`。
  - 这些命令本质上是 HTTP 请求的封装，将用户的输入（消息、附件）转发给远程的 `coco-server`。
  - 示例代码：
    ```rust
    #[tauri::command]
    pub async fn chat_create(...) -> Result<(), String> {
        // 封装 ChatRequestMessage
        // 发送 POST 请求到 /chat/_create
        // 处理流式响应并 emit 给前端
    }
    ```

### 3.2 数据源与工具 (`src-tauri/src/server/datasource.rs`)

- **数据源管理**
  - 负责获取和缓存远程或 MCP 提供的数据源 (`DataSource`)。
  - Agent 在执行搜索或需要外部数据时，会通过此模块获取上下文。

### 3.3 本地扩展 (`src-tauri/src/extension/`)

- **内置能力**
  - 项目包含多个内置扩展，如计算器 (`built_in/calculator.rs`)、文件搜索 (`built_in/file_search`)。
  - 虽然这些扩展实现了 `SearchSource` trait，主要用于统一搜索，但它们也可以被视为 Agent 的“本地工具”，Agent 可以通过搜索接口调用这些能力来回答特定问题（如“计算 1+1”或“查找文件”）。

---

## 4. Agent 关键特性总结

| 特性 | 实现位置/方式 | 说明 |
| :--- | :--- | :--- |
| **深度思考 (Deep Think)** | 前端 Props / 后端参数 | 支持 Chain-of-Thought 推理模式，前端有专门的 UI 展示思考过程。 |
| **工具调用 (Tools)** | `useChatActions.ts` / MCP | 支持标准工具调用流程；通过 MCP 协议扩展外部工具库。 |
| **多源搜索 (RAG)** | `src-tauri/src/search/` | Agent 可聚合本地文件、应用、历史记录及远程数据源的结果作为回答依据。 |
| **会话管理** | `chat_history`, `session_chat` | 支持多会话管理，上下文持久化与恢复。 |

## 5. 结论

Coco App 并非仅仅是一个简单的聊天界面，而是一个**全功能的 AI Agent 客户端**。它通过：
1.  **前端** 精细的交互设计展示 Agent 的思考与行动过程。
2.  **Rust 后端** 提供高性能的系统集成与协议代理。
3.  **MCP 协议** 实现工具生态的无限扩展。

构成了一个现代化的、能够利用本地与云端能力的 AI 助理平台。
