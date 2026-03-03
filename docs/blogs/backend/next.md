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
