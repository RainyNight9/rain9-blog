# 2026 前端项目经验

## 🚀 核心业务项目

### 1. Coco App —— 跨平台 AI 智能搜索与问答客户端

**技术栈**：React 18, TypeScript, Tauri 2, Rust, Zustand
**项目描述**：一款集成本地文件、企业数据源与 AI 助手的统一入口应用，支持 macOS/Windows/Linux 桌面端与 Web 端。
**核心职责**：
*   **跨端架构设计**：设计 `PlatformAdapter` 适配层，抹平 Tauri 桌面端与 Web 端的能力差异（窗口管理、文件系统），实现**核心业务逻辑 100% 复用**。
*   **高性能聚合搜索**：在 Rust 后端实现多数据源（本地/远程/历史）并发查询与熔断机制，结合前端虚拟列表，确保在聚合大量数据源时 **P99 延迟控制在 200ms 内**。
*   **工程化质量门禁**：针对 Web SDK 构建引入产物扫描机制，在 CI 阶段自动拦截桌面端原生依赖泄露，**杜绝了 Web 端运行时崩溃风险**。
*   **复杂状态管理**：基于 Zustand 管理跨多窗口（搜索/聊天/设置）的全局状态，实现了流畅的流式对话（Streaming）与思维链（Chain of Thought）渲染体验。

### 2. EasySearch 前端管理平台 —— 企业级搜索集群管控系统

**技术栈**：React 18, Vite 5, Monorepo, Ant Design, @antv/G6
**项目描述**：面向运维专家的 EasySearch 集群管理平台，涵盖集群监控、索引生命周期管理 (ILM) 及数据探索功能。
**核心职责**：
*   **Monorepo 重构**：主导项目从传统 SPA 迁移至 pnpm workspace 架构，抽离 `@sa/axios`、`@sa/hooks` 等基础库，**代码复用率提升至 90%**，新模块开发效率提升 30%。
*   **大规模可视化优化**：解决集群拓扑图在万级节点下的渲染性能瓶颈，采用**自定义布局算法 + 虚拟化渲染**策略，实现复杂拓扑的秒级加载与流畅交互。
*   **复杂配置可视化**：开发索引生命周期管理（ILM）向导，将数千行的复杂 JSON 配置转化为可视化表单，使用户配置耗时从 **2 小时缩短至 15 分钟**。
*   **性能优化**：引入 `usePollingPlugin` 实现智能轮询（页面不可见自动暂停），并通过 Vite `manualChunks` 拆包优化，首屏加载速度提升 **40%**。

### 3. EasySearch 交互式控制台 (UI-WEB-CLI)

**技术栈**：React, RxJS, Ace Editor, TypeScript
**项目描述**：一个可嵌入的 Elasticsearch 高级查询控制台（类 Kibana DevTools），支持复杂的 DSL 语法高亮与智能补全。
**核心职责**：
*   **遗留代码现代化**：将基于 AngularJS/jQuery 的遗留编辑器内核移植并重构为现代 React 组件，解决了在微前端架构下的**样式隔离与生命周期管理**问题。
*   **智能补全引擎**：维护复杂的上下文感知补全逻辑，支持根据 HTTP Method 和 API Path 动态推荐 ES 聚合与查询语法，极大降低了用户的使用门槛。
*   **防御性编程**：解决了在 iframe 及严格 CSP 环境下 Clipboard API 与本地存储的兼容性问题，确保组件在第三方宿主环境中的稳定性。

## 🛠️ 基础设施与官网项目

### 4. UI-Common —— AI 垂直领域通用组件库

**技术栈**：React, Vite, pnpm, UnoCSS, Elastic EUI
**项目描述**：服务于全系产品的 Monorepo 组件库，包含 AI 聊天、数据可视化及通用业务组件。
**核心职责**：
*   **AI 思维链可视化**：开发 `ChatMessage` 组件，首创 **DeepResearch 可视化方案**，将 AI 的“规划-研究-阅读-回答”隐式步骤转化为用户可见的动态流程图，提升了 AI 回答的可解释性。
*   **构建体系建设**：解决 ESM 与 CommonJS 依赖混用的构建难题，配置 Vite 库模式打包，实现了组件库的 **Tree-shaking 友好**与类型定义自动生成。
*   **设计系统统一**：融合 Ant Design 与 Elastic EUI 两套设计体系，建立统一的 Token 系统，确保了跨产品线一致的**深色模式（Dark Mode）**体验。

### 5. Coco 官网与插件市场 (Coco Portal)
**技术栈**：Next.js 15, TypeScript, Tailwind CSS, Framer Motion
**项目描述**：Coco AI 产品的官方门户与插件生态市场，兼顾 SEO 流量获取与动态应用交互。
**核心职责**：
*   **混合渲染架构**：采用 **SSG (静态生成) + CSR (客户端渲染)** 混合模式，核心落地页实现极致 SEO 与秒开，插件市场模块支持动态筛选与实时搜索。
*   **泛型组件设计**：设计高扩展性的列表渲染架构，通过泛型组件一套代码适配 Assistant、Connector、Datasource 等 **6 种资源类型**，新业务接入仅需配置参数。
*   **用户体验优化**：实现了自定义路由进度感知系统，解决了 Next.js App Router 在静态导出模式下路由跳转无反馈的体验痛点。

### 6. Infinilabs 英文官网 (High-Performance Official Site)
**技术栈**：Next.js (SSG), React Three Fiber (WebGL), Shadergradient
**项目描述**：面向全球市场的企业官网，主打高性能与沉浸式 3D 视觉体验。
**核心职责**：
*   **极致性能优化**：基于 `output: 'export'` 构建纯静态站点，结合 CDN 全球分发，实现 **TTFB < 50ms**；优化第三方脚本（GTM/Hotjar）加载策略，TBT 降至近乎 0ms。
*   **3D 视觉工程化**：攻克 WebGL 在 SSG 环境下的水合（Hydration）难题，设计 **"View Tunneling" (视图隧道)** 架构，实现 3D 背景在路由切换时的无缝过渡，**GPU 内存占用降低 40%**。
。
