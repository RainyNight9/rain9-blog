# nuxt

## SEO

通过了解各类搜索引擎如何抓取互联网页面、如何进行索引以及如何确定其对某一特定关键词的搜索结果排名等技术，来对网页内容进行相关的优化，使其符合用户浏览习惯，在不损害用户体验的情况下提高搜索引擎排名，从而提高网站访问量，最终提升的销售能力或宣传能力的技术。

- SEO：搜索引擎优化（Search Engine Optimization）, 通过各种技术（手段）来确保，我们的 Web 内容被搜索引擎最大化收录，最大化提高权重，最终带来更多流量。
- 非常明显，SPA 程序不利于 SEO

SEO解决方案：**提前将页面和数据进行整合**

- 前端：采用 SSR
- 后端：页面静态化 （freemarker 、thymeleaf、velocity）

## Nuxt.js 和纯 Vue 项目对比

### 1. build 后目标产物不同

- vue: dist
- nuxt: .nuxt

### 2. 网页渲染流程

- vue: 客户端渲染，先下载 js 后，通过 ajax 来渲染页面；
- nuxt： 服务端渲染，可以做到服务端拼接好 html 后直接返回，首屏可以做到无需发起 ajax 请求；


### 3. 部署流程

- vue： 只需部署 dist 目录到服务器，没有服务端，需要用 nginx 等做 Web 服务器；
- nuxt： 需要部署几乎所有文件到服务器（除 node_modules，.git），自带服务端，需要pm2管理（部署时需要 reload pm2），若要求用域名，则需要 nginx 做代理。

- 本地运行 npm run build 打包，然后把 .nuxt、static、nuxt.config.js、package.json、package-lock.json 上传到服务器,上传好后，运行 npm install 安装依赖，最后运行 npm run start 启动项目。

- 另外一种方法在服务器上打包上传整个项目到服务器上，当然像 node_modules、.idea 之类的除外，接着依次运行：npm install|npm run build|npm run start

### 4. 项目入口

- vue: /src/main.js，在 main.js 可以做一些全局注册的初始化工作；
- nuxt: 没有 main.js 入口文件，项目初始化的操作需要通过 nuxt.config.js 进行配置指定。

## 如何设置页面客户端渲染

- 场景一：关闭项目所有页面的ssr 对于不需要索引或用户经常访问的高度交互式web应用程序，可以在nuxt.config.ts中使用Nuxt启用仅客户端渲染：

```js
export default defineNuxtConfig({ ssr: false })
```

- 场景二：仅对个别页面关闭ssr
  使用路由规则：从 Nuxt 3 开始随着公测 rc. 12 版本发布，支持路由规则和混合渲染。
  使用路由规则，您可以为一组 nuxt 路由定义规则，改变呈现模式或分配基于路由的缓存策略。
    - redirect - 重定向。
    - ssr - 禁用应用程序部分的服务器端渲染，并使`ssr: false`使它们仅用于spa。
    - cors - 自动添加带有`cors: true`的 cors 报头-你可以通过用 headers 覆盖自定义输出
    - headers - 为站点的各个部分添加特定的标题
    - static and swr - static 支持单个(按需)构建; swr 启用静态构建，该构建持续一个可配置的TTL。
    配置ssr示例:

```ts
export default defineNuxtConfig({
  routeRules: {
    '/admin/**': { ssr: false },
  },
});
```

>如果确实使用`ssr:false`，还应该在/src目录新增app文件夹，文件夹下建立spa-loading-template.html文件（如果没有使用本文中的/src目录的配置，要在根目录下新增app文件夹），html文件中包含一些我们想用来渲染加载页面的HTML。
