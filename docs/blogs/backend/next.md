# Next.js 技术要点总结

Next.js 是基于 React 的全栈 Web 框架，旨在提供最佳的开发体验和高性能的 Web 应用。以下是其核心技术点总结：

## 1. 渲染模式 (Rendering Patterns)
Next.js 最强大的特性之一是支持多种渲染模式，开发者可以根据页面需求灵活选择：

*   **SSR (Server-Side Rendering)**:
    *   **服务端渲染**：每次请求都在服务器端动态生成 HTML。
    *   **适用场景**：实时数据更新、个性化内容、SEO 要求高的页面。
    *   **实现**：`getServerSideProps` (Pages Router) 或直接在 Server Component 中获取数据 (App Router)。
*   **SSG (Static Site Generation)**:
    *   **静态生成**：在构建时（Build Time）生成 HTML。
    *   **适用场景**：博客文章、文档、营销页面。
    *   **实现**：`getStaticProps` (Pages Router) 或默认行为 (App Router)。
*   **ISR (Incremental Static Regeneration)**:
    *   **增量静态再生**：允许在应用运行时更新静态页面，无需重新构建整个站点。
    *   **机制**：设置 `revalidate` 时间，超时后后台重新生成页面。
*   **CSR (Client-Side Rendering)**:
    *   **客户端渲染**：传统的 React 渲染方式，浏览器加载 JS 后渲染。
    *   **适用场景**：交互性强、无需 SEO 的私有后台页面。

## 2. 路由系统 (Routing)

### App Router (自 Next.js 13 起)
*   **基于文件系统**：`app/` 目录下的文件夹结构映射 URL 路径。
*   **React Server Components (RSC)**: 默认所有组件都是服务端组件，减少发送到客户端的 JavaScript 体积。
*   **特殊文件**：`page.js` (页面 UI), `layout.js` (共享布局), `loading.js` (加载状态), `error.js` (错误处理), `not-found.js` (404).
*   **流式传输 (Streaming)**: 利用 React Suspense 逐步发送 HTML，优化首字节时间 (TTFB)。

### Pages Router (传统模式)
*   **基于文件系统**：`pages/` 目录下的文件映射 URL。
*   **API Routes**：`pages/api/` 目录下轻松创建后端 API 端点。

## 3. 数据获取 (Data Fetching)
*   **扩展的 fetch API** (App Router): Next.js 扩展了原生 `fetch`，增加了缓存和重新验证控制。
    ```javascript
    // 类似于 getStaticProps
    fetch('https://...', { cache: 'force-cache' })

    // 类似于 getServerSideProps
    fetch('https://...', { cache: 'no-store' })

    // ISR
    fetch('https://...', { next: { revalidate: 10 } })
    ```
*   **Server Actions**: 允许在组件中直接调用异步服务端函数来处理数据突变（Mutations），无需手动创建 API 路由。

## 4. 性能优化 (Optimizations)
*   **Image Optimization (`<Image>`)**: 自动调整图片大小、格式转换 (WebP/AVIF)、懒加载，防止累积布局偏移 (CLS)。
*   **Font Optimization (`next/font`)**: 自动托管 Google Fonts，零布局偏移。
*   **Script Optimization (`<Script>`)**: 控制第三方脚本的加载策略 (`beforeInteractive`, `afterInteractive`, `lazyOnload`)。
*   **Turbopack**: 基于 Rust 的增量打包引擎，开发服务器启动速度极快（Webpack 的替代者）。

## 5. 中间件 (Middleware)
*   在请求完成之前运行代码。
*   **用途**：重写、重定向、身份验证检查、修改请求/响应头、A/B 测试。
*   **运行时**：基于 Edge Runtime，启动速度快，但不支持所有 Node.js API。

## 6. 部署与生态
*   **Vercel**: Next.js 的开发团队出品，提供零配置部署、Edge Network、Serverless Functions 支持。
*   **Node.js Server**: 支持传统的 Node.js 服务器部署（Docker 容器化）。
*   **Static Export**: `output: 'export'` 支持导出为纯静态 HTML/CSS/JS，可部署在 Nginx、S3 等任何静态主机上。

## 总结
Next.js 不仅仅是一个 UI 框架，更是一个**全栈元框架 (Meta-Framework)**。它通过 App Router 和 Server Components 模糊了前后端的界限，极大地简化了数据流向，同时通过内置的各种优化手段，保证了应用的极致性能和 SEO 友好性。

## 面试题

### 1. 什么是 React Server Components (RSC)？它和传统的 SSR 有什么区别？
**答：**
*   **React Server Components (RSC)** 是 React 18 引入并在 Next.js App Router 中默认启用的组件架构。RSC 只在服务端运行，**它们的 JavaScript 代码永远不会被发送到客户端**。
*   **与传统 SSR 的区别**：
    *   **SSR**：服务端生成 HTML，但组件的代码仍然会发送到客户端进行 Hydration（水合），组件在客户端仍然是可交互的 React 组件。
    *   **RSC**：组件仅在服务端渲染成一种特殊的 JSON 格式（RSC Payload），客户端接收后直接映射为 DOM，不包含该组件的 JS 代码，不参与 Hydration。
    *   **组合使用**：在 Next.js 中，默认是 Server Components。如果需要交互（如 `onClick`、`useState`），需要在文件顶部声明 `"use client"` 将其标记为 Client Components。

### 2. Next.js 中的 App Router 和 Pages Router 有什么主要区别？
**答：**
*   **路由机制**：`Pages Router` 基于 `pages/` 目录下的文件名（如 `pages/about.js` 对应 `/about`）；`App Router` 基于 `app/` 目录下的文件夹名，且必须包含 `page.js` 文件（如 `app/about/page.js` 对应 `/about`）。
*   **组件默认类型**：`Pages Router` 中的组件默认是 Client Components（尽管可以 SSR）；`App Router` 中的组件默认是 React Server Components (RSC)。
*   **布局系统**：`App Router` 引入了 `layout.js`，支持嵌套布局且在路由切换时不会重新渲染，状态得以保留；`Pages Router` 的布局通常需要在 `_app.js` 中全局处理或手动在每个页面包装。
*   **数据获取**：`Pages Router` 依赖 `getServerSideProps`、`getStaticProps` 等 API；`App Router` 直接使用原生 `async/await` 和扩展的 `fetch` API，不再需要那些特定的导出函数。

### 3. 请解释 Next.js 中的渲染模式：CSR, SSR, SSG, ISR 分别是什么，应该在什么场景下使用？
**答：**
*   **CSR (Client-Side Rendering)**：客户端渲染。HTML 骨架先加载，然后下载 JS 在浏览器中请求数据并渲染。
    *   *场景*：高度交互的内部仪表盘、不需要 SEO 的私有页面。
*   **SSR (Server-Side Rendering)**：服务端渲染。每次用户请求时，服务器实时拉取数据并生成完整 HTML 返回。
    *   *场景*：数据频繁变化、高度个性化且需要 SEO 的页面（如用户主页、实时新闻）。
*   **SSG (Static Site Generation)**：静态生成。在构建时（`next build`）拉取数据并生成静态 HTML 返回，部署后直接通过 CDN 分发。
    *   *场景*：数据不常变化的页面（如关于我们、博客文章、帮助文档），性能极高。
*   **ISR (Incremental Static Regeneration)**：增量静态再生。允许在页面部署后，在后台定期（根据设定的时间间隔 `revalidate`）重新生成静态页面。
    *   *场景*：数据需要更新但不需要绝对实时，且访问量巨大的页面（如电商商品页、热门博客）。

### 4. Next.js 13+ 的 App Router 中是如何进行数据获取和缓存控制的？
**答：**
在 App Router 中，Next.js 扩展了原生的 `fetch` API，直接通过传递不同的 `cache` 或 `next` 参数来控制缓存行为，取代了原来的 `getStaticProps` 等 API：
*   **SSG 等效**：`fetch(url, { cache: 'force-cache' })` （默认行为），数据在构建时被缓存，后续请求直接读取缓存。
*   **SSR 等效**：`fetch(url, { cache: 'no-store' })`，不缓存数据，每次请求都重新向服务端发起抓取。
*   **ISR 等效**：`fetch(url, { next: { revalidate: 60 } })`，缓存数据，但每隔 60 秒在后台重新验证并更新缓存。

### 5. 在 Next.js 中，如何优化图片加载？（`next/image` 的核心原理）
**答：**
Next.js 提供了 `<Image />` 组件来替代原生的 `<img>` 标签，其核心优化包括：
*   **尺寸优化**：根据设备的屏幕尺寸，自动提供正确大小的图片，避免在手机上加载桌面级大图。
*   **格式转换**：自动将图片转换为现代 Web 格式（如 WebP、AVIF），大幅减小体积。
*   **懒加载 (Lazy Loading)**：默认情况下，图片只有在滚动到视口 (Viewport) 时才会加载，节省初始带宽。
*   **防止布局偏移 (CLS)**：强制要求提供 `width` 和 `height`（或使用 `fill`），在图片加载前预留占位空间，避免页面抖动。

### 6. Next.js 的 Middleware (中间件) 是什么？有哪些常见的应用场景？
**答：**
*   **定义**：Middleware 是一段在请求完成并返回响应之前运行的代码。它运行在轻量级的 Edge Runtime 中（V8 引擎），速度极快。
*   **应用场景**：
    1.  **鉴权与授权**：检查请求中的 Token 或 Cookie，未登录则重定向到登录页。
    2.  **A/B 测试**：根据用户特征或随机算法，将请求重写 (rewrite) 到不同的页面变体。
    3.  **国际化 (i18n)**：根据请求头的 `Accept-Language` 或地理位置，重定向到对应的语言路由（如 `/en` 或 `/zh`）。
    4.  **Bot 拦截与限流**：识别恶意爬虫并拦截，或做简单的 API 限流。

### 7. 什么是 Server Actions？它解决了什么问题？
**答：**
*   **定义**：Server Actions 是 Next.js 提供的一种在服务端执行的异步函数。它们可以直接在 React 组件中被调用（例如绑定到 `<form action={...}>` 或按钮的 `onClick` 中）。
*   **解决的问题**：
    *   **消除冗余的 API 路由**：以前提交表单需要前端写 `fetch` 请求，后端写一个专门的 API Route 接收数据。现在前端直接调用 Server Action，Next.js 底层自动处理 RPC 通信。
    *   **渐进式增强**：在 JavaScript 加载完成甚至被禁用的情况下，HTML 表单仍然可以正常提交到 Server Action。
    *   **强类型**：前后端代码在同一个文件中，可以完美共享 TypeScript 类型，避免接口字段对不上的问题。

### 8. Next.js 中如何进行 SEO 优化？
**答：**
*   **服务端渲染 (SSR/SSG)**：保证爬虫抓取到的是完整的 HTML 内容，而不是空挂载点。
*   **Metadata API**：在 App Router 中，可以通过导出一个 `metadata` 对象或 `generateMetadata` 函数来动态生成 `<title>`、`<meta name="description">`、Open Graph 标签等。
    ```javascript
    export const metadata = {
      title: '我的应用',
      description: '这是应用的描述',
    }
    ```
*   **动态 Sitemap 和 Robots.txt**：支持在 `app/` 目录下直接创建 `sitemap.ts` 和 `robots.ts` 动态生成这些对搜索引擎至关重要的文件。
*   **Canonical URLs**：通过 Metadata 轻松配置规范链接，防止内容重复惩罚。