# Qodex 项目深度解析文档

## 1. 项目概述 (Overview)

源码地址：https://github.com/cloudymoma/qodex

**Qodex** 是一个基于 Web 的交互式 3D/2D 代码库可视化和搜索工具。它的主要目标是提供一种极具视觉冲击力（"hacker-chic" 风格）的方式来探索和理解开源代码库。

**核心工作流**：用户输入一个公开的 GitHub 仓库 URL，系统会自动将其克隆到本地，解析代码文件之间的依赖关系，构建并渲染出炫酷的 3D 依赖图谱（节点代表文件，连线代表引入/依赖关系），同时提供高级的全文代码搜索和文件树浏览功能。

## 2. 核心技术栈 (Tech Stack)

### 前端 (Frontend)
*   **框架**: React 19 + TypeScript + Vite
*   **样式**: Tailwind CSS v4 (主打纯正的暗黑主题模式)
*   **3D/2D 渲染**: `react-force-graph-3d` 和 `react-force-graph-2d`（基于 Three.js 和 d3-force-3d 引擎构建的力导向图）
*   **代码高亮**: `react-syntax-highlighter`
*   **UI 组件**: 纯手写结合 `lucide-react` 图标库

### 后端 (Backend)
*   **语言/框架**: Go 1.23+，使用标准库 `net/http` 提供 RESTful API 服务，轻量高效。
*   **代码库管理**: `go-git/go-git`（用于纯 Go 实现的 Git 仓库克隆和拉取）。
*   **全文检索**: `bleve`（一个强大的纯 Go 文本索引引擎，用于代码片段的高亮搜索）。
*   **依赖解析**: 自定义基于正则表达式（Regex）的多语言 AST/Import 解析器。
*   **配置管理**: `gopkg.in/yaml.v3` 解析 `conf.yaml`。

## 3. 核心功能与实现原理 (Core Principles)

整个项目的核心难点和实现主要集中在 **Ingestion（数据摄取）** 和 **Visualization（可视化渲染）** 两个阶段。

### 3.1 核心处理管线 (Ingest Pipeline)
当用户提交一个 GitHub URL 时，后端的 `IngestService` 启动一个流水线作业：

1.  **Clone (克隆代码)**: 
    *   通过 `go-git` 将目标 GitHub 仓库克隆到服务器的本地目录（默认在 `$HOME/.qodex/<repo_name>` 下）。
2.  **Parse (依赖解析)**: 
    *   遍历代码库文件，通过 `internal/parser` 模块针对不同语言（如 Go, JavaScript, Python, Rust）调用不同的解析器。
    *   **原理**：MVP 阶段为了保证速度和轻量化，没有使用重量级的 `tree-sitter`，而是使用**正则表达式 (Regex)** 提取文件中的 `import` 或 `require` 语句。
    *   将这些外部引用路径映射回代码库内部的相对文件路径，建立起“文件 A 依赖 文件 B”的有向边。
3.  **Index (全文索引构建)**: 
    *   使用 `bleve` 将文件的路径、名称、以及文件内容本身写入倒排索引（Inverted Index）。
    *   这使得后续用户进行代码搜索时，能够毫秒级返回匹配的文件和代码片段，并支持关键字高亮。
4.  **Graph Build (图谱数据构建)**: 
    *   将解析出来的文件节点（Nodes）和依赖关系（Links）组装成前端可视化库所需的 JSON 格式返回给前端。

### 3.2 交互式可视化原理 (Interactive Visualization)
前端通过调用 `/api/graph` 接口获取数据后，将数据交由 `<ForceGraph3D>` 渲染。

*   **力导向布局 (Force-Directed Layout)**: 节点通过物理模拟自动寻找合适的三维空间位置，形成具有聚类特征的图谱。
*   **交互逻辑**:
    *   **聚焦 (Focus)**: 当用户点击图谱中的某个节点或左侧文件树时，前端通过 React State 更新 `focusedNode`。系统会自动过滤图谱数据，仅显示该节点及其一级依赖，其他节点变暗或隐藏。
    *   **漫游**: 支持鼠标拖拽旋转视角和滚轮缩放。

### 3.3 目录与文件树浏览
后端暴露 `/api/tree` 接口，扫描本地仓库目录并将其转换为嵌套的树状结构 `TreeNode`。前端 `FileTree.tsx` 递归渲染该结构，并与中央 3D 画布进行状态联动（点击树节点即触发 3D 图的聚焦）。

### 3.4 访问安全控制 (Access Code Protection)
项目支持轻量级的权限控制（通过 `make run-accesscode` 启动）：
*   在 `internal/auth/auth.go` 中实现。
*   首次访问强制设置访问码，使用 `bcrypt` 哈希后保存在服务器本地的 `.accesscode` 文件中。
*   后续访问通过 Cookie 校验 Session（会话保留 30 分钟，内存存储机制，重启失效）。

## 4. 整体架构图 (Architecture Diagram)

```text
┌──────────────────────────────────────────────────────────────┐
│                     Browser (React SPA)                      │
│  ┌──────────┐  ┌─────────────────┐  ┌─────────────────────┐  │
│  │ FileTree │  │ ForceGraph3D    │  │ BottomPanel         │  │
│  │ (Left)   │  │ (Center/Right)  │  │ Search | Chat       │  │
│  └──────────┘  └─────────────────┘  └─────────────────────┘  │
└──────────────────────────┬───────────────────────────────────┘
                           │ HTTP (port 1983)
┌──────────────────────────▼───────────────────────────────────┐
│                     Go HTTP Server                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────┐     │
│  │ /ingest │ │ /graph  │ │ /tree   │ │ /search         │     │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────────┬────────┘     │
│       │           │           │                │             │
│  ┌────▼────────────▼───────────▼────────────────▼────────┐   │
│  │              IngestService (Orchestrator)             │   │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────┐             │   │
│  │  │ go-git   │ │ Regex    │ │ Bleve      │             │   │
│  │  │ (Clone)  │ │ Parsers  │ │ (Index)    │             │   │
│  │  └──────────┘ └──────────┘ └────────────┘             │   │
│  └───────────────────────────────────────────────────────┘   │
│  Storage: $HOME/.qodex/<repo>/                               │
│  Indexes: $HOME/.qodex/.indexes/<repo>/                      │
└──────────────────────────────────────────────────────────────┘
```

## 5. 项目结构 (Directory Layout)
- **`cmd/server/`**: 后端 Go 服务的启动入口 (`main.go`)。
- **`docs/`**: 产品需求文档 (PRD) 和技术设计文档，项目的蓝图。
- **`frontend/`**: 包含所有 React 源码、组件、状态管理以及 Vite 配置。
  - `src/components/`: 按功能模块划分的 UI（如 Sidebar, GraphCanvas, Panels）。
- **`internal/`**: 后端核心业务逻辑，由于 Go 的特性，外部无法直接引用。
  - `api/`: HTTP 路由、Handler 和中间件 (Auth, CORS, Logger)。
  - `parser/`: 核心依赖提取模块，针对不同语言的代码语法进行正则匹配提取。
  - `indexer/`: 基于 Bleve 的倒排索引模块。
  - `graph/`: 图谱构建逻辑。
  - `repository/`: 封装 Git 库操作。
- **`pkg/models/`**: 公共数据结构（例如跨模块使用的 JSON 结构体 `GraphData`, `TreeNode`）。
- **`Makefile`**: 提供了一键式编译、运行和测试命令。

## 6. 总结
Qodex 是一个典型的 "Go 后端计算 + React 前端重渲染" 项目。它巧妙地避开了复杂的编译器级别 AST 解析，采用正则匹配提取导入关系，从而在保证执行速度的前提下，快速实现了代码库结构的可视化。借助 Bleve 引擎，又为系统赋予了出色的全文检索能力，是一个结构非常清晰且极具极客风格的开源工具。
