# Webpack

## Webpack 配置项

### Webpack 的打包过程

![打包流程](./images/webpack打包流程.png)

- `输入`：从文件系统读入代码文件；
- `模块递归处理`：调用 Loader 转译 Module 内容，并将结果转换为 AST，从中分析出模块依赖关系，进一步递归调用模块处理过程，直到所有依赖文件都处理完毕；
- `后处理`：所有模块递归处理完毕后开始执行后处理，包括模块合并、注入运行时、产物优化等，最终输出 Chunk 集合；
- `输出`：将 Chunk 写出到外部文件系统；

从上述打包流程角度，**Webpack 配置项大体上可分为两类**：

- `流程类`：作用于打包流程某个或若干个环节，直接影响编译打包效果的配置项
- `工具类`：打包主流程之外，提供更多工程化工具的配置项

### 与打包流程强相关的配置项

- 输入输出：
  - `entry`：用于定义项目入口文件，Webpack 会从这些入口文件开始按图索骥找出所有项目文件；
  - `context`：项目执行上下文路径；
  - `output`：配置产物输出路径、名称等；
- 模块处理：
  - `resolve`：用于配置模块路径解析规则，可用于帮助 Webpack 更精确、高效地找到指定模块
  - `module`：用于配置模块加载规则，例如针对什么类型的资源需要使用哪些 Loader 进行处理
  - `externals`：用于声明外部资源，Webpack 会直接忽略这部分资源，跳过这些资源的解析、打包操作
- 后处理：
  - `optimization`：用于控制如何优化产物包体积，内置 Dead Code Elimination、Scope Hoisting、代码混淆、代码压缩等功能
  - `target`：用于配置编译产物的目标运行环境，支持 web、node、electron 等值，不同值最终产物会有所差异
  - `mode`：编译模式短语，支持 development、production 等值，可以理解为一种声明环境的短语

1. Webpack 首先需要根据输入配置(`entry/context`) 找到项目入口文件；
2. 之后根据按模块处理(`module/resolve/externals` 等) 所配置的规则逐一处理模块文件，处理过程包括转译、依赖分析等；
3. 模块处理完毕后，最后再根据后处理相关配置项(`optimization/target` 等)合并模块资源、注入运行时依赖、优化产物结构等。

### 工具类配置项

- 开发效率类：
  - `watch`：用于配置持续监听文件变化，持续构建
  - `devtool`：用于配置产物 Sourcemap 生成规则
  - `devServer`：用于配置与 HMR 强相关的开发服务器功能
- 性能优化类：
  - `cache`：Webpack 5 之后，该项用于控制如何缓存编译过程信息与编译结果
  - `performance`：用于配置当产物大小超过阈值时，如何通知开发者
- 日志类：
  - `stats`：用于精确地控制编译过程的日志内容，在做比较细致的性能调试时非常有用
  - `infrastructureLogging`：用于控制日志输出方式，例如可以通过该配置将日志输出到磁盘文件
- 等等

![webpack-liucheng](./images/webpack-liucheng.png)



## Babel+TS+ESLint

### Babel

Babel 是一个开源 JavaScript 转编译器，它能将高版本 —— 如 ES6 代码等价转译为向后兼容，能直接在旧版 JavaScript 引擎运行的低版本代码。

>Babel 还提供了一个在线版的 REPL 页面， [babeljs.io/repl](https://babeljs.io/repl) 实时体验功能效果。

Babel 提供的语言转译能力，能在确保产物兼容性的同时，让我们大胆使用各种新的 ECMAScript 语言特性。

### TypeScript

时至今日 TypeScript 依然是一项应用广泛的 JavaScript 超集语言。特别适合用于构建多人协作的大型 JavaScript 项目。

TypeScript 提供的类型检查能力，能有效提升应用代码的健壮性。

### ESLint

ESLint 是一种扩展性极佳的 JavaScript 代码风格检查工具，它能够自动识别违反风格规则的代码并予以修复。

ESLint 提供的风格检查能力，能确保多人协作时的代码一致性。

## Webpack 与 CSS

在 Webpack 中处理 CSS 文件，通常需要用到：

- `css-loader`：该 Loader 会将 CSS 等价翻译为形如 `module.exports = "${css}"` 的JavaScript 代码，使得 Webpack 能够如同处理 JS 代码一样解析 CSS 内容与资源依赖；
- `style-loader`：该 Loader 将在产物中注入一系列 runtime 代码，这些代码会将 CSS 内容注入到页面的 `<style>`标签，使得样式生效；
- `mini-css-extract-plugin`：该插件会将 CSS 代码抽离到单独的 .css 文件，并将文件通过 `<link>` 标签方式插入到页面中。

![css-loader](./images/css-loader.png)

- **开发环境**：使用 `style-loader` 将样式代码注入到页面 `<style>` 标签；
- **生产环境**：使用 `mini-css-extract-plugin` 将样式代码抽离到单独产物文件，并以 `<link>` 标签方式引入到页面中。

经过 `style-loader + css-loader` 处理后，样式代码最终会被写入 Bundle 文件，并在运行时通过 `style` 标签注入到页面。这种将 JS、CSS 代码合并进同一个产物文件的方式有几个问题：

- JS、CSS 资源无法并行加载，从而降低页面性能；
- 资源缓存粒度变大，JS、CSS 任意一种变更都会致使缓存失效。

因此，生产环境中通常会用 `mini-css-extract-plugin` 插件替代 `style-loader`，将样式代码抽离成单独的 CSS 文件。

- `mini-css-extract-plugin` 库同时提供 Loader、Plugin 组件，需要同时使用
- `mini-css-extract-plugin` 不能与 style-loader 混用，否则报错，所以需要判断 process.env.NODE_ENV 环境变量决定使用那个 Loader
- `mini-css-extract-plugin` 需要与 `html-webpack-plugin` 同时使用，才能将产物路径以 `link` 标签方式插入到 html 中

### 预处理器

### post-css

PostCSS 也能在原生 CSS 基础上增加更多表达力、可维护性、可读性更强的语言特性。

PostCSS 并没有定义一门新的语言，而是与 @babel/core 类似，只是实现了一套将 CSS 源码解析为 AST 结构，并传入 PostCSS 插件做处理的流程框架，具体功能都由插件实现。

PostCSS 之于 CSS，则更像 Babel 与 JavaScript。

PostCSS 最大的优势在于其简单、易用、丰富的插件生态，基本上已经能够覆盖样式开发的方方面面。实践中，经常使用的插件有：

- `autoprefixer`：基于 Can I Use 网站上的数据，自动添加浏览器前缀
- `postcss-preset-env`：一款将最新 CSS 语言特性转译为兼容性更佳的低版本代码的插件
- `postcss-less`：兼容 Less 语法的 PostCSS 插件，类似的还有：postcss-sass、poststylus
- `stylelint`：一个现代 CSS 代码风格检查器，能够帮助识别样式代码中的异常或风格问题

## Webpack 与 Vue

### Vue-loader 处理 SFC 代码

Vue SFC(Single File Component) 文件(*.vue)是使用类 HTML 语法描述 Vue 组件的自定义文件格式，文件由四种类型的顶层语法块组成：

- `<template>`：用于指定 Vue 组件模板内容，支持类 HTML、Pug 等语法，其内容会被预编译为 JavaScript 渲染函数；
- `<script>`：用于定义组件选项对象，在 Vue2 版本支持导出普通对象或 defineComponent 值；Vue3 之后还支持 `<script setup>` 方式定义组件的 `setup()` 函数；
- `<style>`：用于定义组件样式，通过配置适当 Loader 可实现 Less、Sass、Stylus 等预处理器语法支持；也可通过添加 `scoped、module` 属性将样式封装在当前组件内；
- `Custom Block`：用于满足领域特定需求而预留的 SFC 扩展模块，例如 `<docs>`；Custom Block 通常需要搭配特定工具使用，详情可参考 [Custom Blocks | Vue Loader](https://vue-loader.vuejs.org/zh/guide/custom-blocks.html#example) 。

原生 Webpack 并不能处理这种内容格式的文件，为此我们需要引入专用于 Vue SFC 的加载器：`vue-loader`。

>提示：vue-loader 库同时提供用于处理 SFC 代码转译的 Loader 组件，与用于处理上下文兼容性的 Plugin 组件，两者需要同时配置才能正常运行。

- `<template>` 内容会被转译为用于构造 Virtual Dom 结构的 render 函数；
- `<script>` 标签导出的对象会被转译为 JavaScript 对象字面量形式。
- `<style>` 模块也将被转译为 JavaScript 内容。

### 运行 vue 页面

接入的 `vue-loader` 使得 Webpack 能够正确理解、翻译 Vue SFC 文件的内容，接下来让页面真正运行起来，这里会用到：

- 使用 `html-webpack-plugin` 自动生成 HTML 页面；
- 使用 `webpack-dev-server` 让页面真正运行起来，并具备热更新能力。

其中 `html-webpack-plugin` 是一款根据编译产物自动生成 HTML 文件的 Webpack 插件，借助这一插件我们无需手动维护产物数量、路径、hash 值更新等问题。

接入 `html-webpack-plugin` 后，还需要使用 `webpack-dev-server` 启动一套本地开发服务器。`webpack-dev-server` 主要提供两种功能：

- 结合 Webpack 工作流，提供基于 HTTP(S) 协议的静态资源服务；
- 提供资源热更新能力，在保持页面状态前提下自动更新页面代码，提升开发效率。

### vue 复用其它编译工具

`vue-loader` 能够复合使用其它 Webpack Loader 的能力处理各个模块内容，包括：

- 使用 `babel-loader、ts-loader` 等处理 SFC 的 `<script>` 模块；
- 使用 `less-loader、sass-loader` 等处理 `<style>` 模块；
- 使用 `pug-plain-loader` 等处理 `<template>` 模块。

为了达到这种效果，用法上我们需要为每种模块配置相应的 Webpack 处理规则，并正确设置模块的 `lang` 属性值。

`<template>` 的处理规则会稍微不同，因为绝大部分 Webpack 模板类 Loader 都会返回一个模板函数，而不是编译好的 HTML 片段，这与 Vue SFC 将 `<template>` 编译为 `render 函数`的规则相冲突，此时通常需要使用一个返回原始的 HTML 字符串的 loader，例如使用 `pug-plain-loader`，而不是 pug-loader。

### vue 使用 SSR

`SPA` 已经能解决许多前后端协作的开发效率、性能、分工、工程化问题，但却很自然地引入一些新的问题：

- **SEO 不友好**：大多数搜索引擎对网页内容的解读都依赖于同步 HTML 内容 —— 假设你的应用最开始只是展示了一个加载动画，然后通过 Ajax 获取异步数据进行渲染，爬虫并不会等待异步操作完成后才解析页面的内容，所以 SPA 应用通常无法向爬虫提供任何有用信息；
- **Time-To-Content 更长**：由于客户端需要等待所有 JavaScript 资源都加载完毕后，才会开始渲染页面真正有意义的内容，所以 TTC 时间相对更长。

`SSR(Server Side Render)` 正是为了解决这些问题而出现的技术。本质上，SSR 是一种在服务端将组件渲染 HTML 字符串并发送到浏览器，最后在浏览器上将这些 HTML 片段“激活”为客户端上可交互的应用技术。

在 Vue 场景下，通常可以选择 `Nuxt.js、Quasar、@vue/server-renderer` 等方案实现 `SSR`，这些技术的底层逻辑都包含三个大的步骤：

1. 编译时，将同一组件构建为适合在客户端、服务器运行的两份副本；
2. 服务端接收到请求时，调用 Render 工具将组件渲染为 HTML 字符串，并返回给客户端；
3. 客户端运行 HTML，并再次执行组件代码，“激活(Hydrate)” 组件。

**Node 服务的核心逻辑在于：**

- 调用 `entry-server.js` 导出的工厂函数渲染出 Vue 组件结构；
- 调用 `@vue/server-renderer` 将组件渲染为 HTML 字符串；
- 拼接 HTML 内容，将组件 HTML 字符串与 `entry-client.js` 产物路径注入到 HTML 中，并返回给客户端。

### vue 使用 SSG

SSR 不是银弹，依然带来了不少新问题：

- 更高的架构复杂度，这意味着更高的维护、扩展、学习成本；
- Node 与浏览器环境不完全匹配，部分浏览器特定的代码，只能在某些生命周期钩子函数中使用；
- 一些外部扩展库 (external library) 可能需要特殊处理，才能在 SSR 中运行；
- 组件要求更高，需要兼容 Node.js Server 运行环境；
- 服务端负载更高，毕竟相较于纯粹提供静态资源的 SPA 形式，SSR 需要在 Node 进程中执行大量 CPU 运算以渲染 HTML 片段。

因此，对于用户不敏感的应用，如公司官网、营销活动页等，还可以使用 `Static Site Generation` (或叫 Pre-renderer) 方式，在编译构建阶段提前生成各页面的静态 HTML 代码，这样技能满足 SEO 需求，又尽可能降低架构、编码复杂度。

### Vue CLI

- `Vue CLI`：基于 Webpack 搭建的 Vue 项目脚手架工具，提供多媒体资源处理、SFC 文件处理、dev-server、HMR、自动化测试、ESLint、Babel 等功能；
- `create-vue`： 基于 Vite 搭建的 Vue 项目脚手架工具，功能与 Vue-cli 基本对齐。

## Webpack 与 React

### Babel 加载 JSX 文件

在 Webpack 中可以借助 `babel-loader`，并使用 React 预设规则集 `@babel/preset-react` ，完成 JSX 到 JavaScript 的转换。

经过 `babel-loader` 处理后，JSX 将被编译为 JavaScript 格式的 `React.createElement` 函数调用。

**JSX 支持新旧两种转换模式：**
- 一是 `React.createElement` 函数，这种模式要求我们在代码中引入 React，如 `import React from "react"；`
- 二是自动帮我们注入运行时代码，此时需要设置 `runtime:automatic`，这种模式会自动导入 `react/jsx-runtime`，不必开发者手动管理 React 依赖。

### 运行 React 页面

接入的 `babel-loader` 使得 Webpack 能够正确理解、翻译 JSX 文件的内容，接下来还需要用 `html-webpack-plugin` 和 `webpack-dev-server` 让页面真正运行起来。

### React 复用其它编译工具

在 React 开发环境中我们也可以搭配其它工程化工具提升开发效率、质量，包括：

- 使用 `babel-loader、ts-loader` 加载 TSX 代码；
- 使用 `less-loader、sass-loader` 预处理样式代码。

**社区有两种主流的 TSX 加载方案：**
- 一是使用 Babel 的 `@babel/preset-typescript` 规则集；
- 二是直接使用 `ts-loader`。

### React 实现 SSR

React 有许多实现 SSR 的方案，例如：`Next.js、egg-react-ssr、ssr（基于egg-react-ssr）` 等。

在 SSR 中，通常由客户端代码提前做好 CSS 资源编译，对服务端而言只需要支持输出构建后的 CSS 文件路径即可，不需要关注 CSS 具体内容，因此通常会用一个简单的自定义 Loader 跳过 CSS 资源。

React 的 SSR 实现逻辑与 Vue 极为相似，都需要搭建对应的 `Client、Server` 端构建环境，之后在 Server 端引入组件代码并将其渲染为 HTML 字符串，配合 `manifest` 记录的产物信息组装出完整的 Web 页面代码，从而实现服务端渲染能力。

### Create React App

- `Create React App`：是官方支持的创建 React 应用程序的方式，提供免配置的现代构建开发环境；
- `Modern JS`：字节跳动开源的现代 Web 工程体系。

## Webpack 与 NPM Library

### 开发一个 NPM 库

```bash
mkdir test-lib && cd test-lib
npm init -y

yarn add -D webpack webpack-cli

mkdir src
touch src/index.js
```

```js
// test-lib/src/index.js
export const add = (a, b) => a + b
```

### Webpack 构建 NPM 库

```js
// webpack.config.js
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
    library: {
      name: "_",
      type: "umd",
   },
  }
};
```

- `output.library.name`：用于定义模块名称，在浏览器环境下使用 script 加载该库时，可直接使用这个名字调用模块。
- `output.library.type`：用于编译产物的模块化方案，可选值有：`commonjs、umd、module、jsonp` 等，通常选用兼容性更强的 `umd` 方案即可。

>提示：JavaScript 最开始并没有模块化方案，这就导致早期 Web 开发需要将许多代码写进同一文件，极度影响开发效率。后来，随着 Web 应用复杂度逐步增高，社区陆陆续续推出了许多适用于不同场景的模块化规范，包括：CommonJS、UMD、CMD、AMD，以及 ES6 推出的 ES Module 方案，不同方案各有侧重点与适用场景，NPM 库作者需要根据预期的使用场景选择适当方案。

### 正确使用第三方包

为解决这一问题，我们需要使用 `externals` 配置项，将第三方依赖排除在打包系统之外：

```js
// webpack.config.js
module.exports = {
  // ...
+  externals: {
+   lodash: {
+     commonjs: "lodash",
+     commonjs2: "lodash",
+     amd: "lodash",
+     root: "_",
+   },
+ },
  // ...
};
```

>提示： Webpack 编译过程会跳过 `externals` 所声明的库，并假定消费场景已经安装了相关依赖，常用于 NPM 库开发场景；在 Web 应用场景下则常被用于优化性能。

Webpack 不再打包 lodash 代码，我们可以顺手将 lodash 声明为 `peerDependencies`：

```json
{
  "name": "6-1_test-lib",
  // ...
+ "peerDependencies": {
+   "lodash": "^4.17.21"
+ }
}
```

方便起见，可以直接使用 `webpack-node-externals` 排除所有 `node_modules` 模块，使用方法：

```js
// webpack.config.js
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // ...
+  externals: [nodeExternals()]
  // ...
};
```

### 抽离 CSS 代码

假设我们开发的 NPM 库中包含了 CSS 代码 —— 这在组件库中特别常见，我们通常需要使用 `mini-css-extract-plugin` 插件将样式抽离成单独文件，由用户自行引入。

这是因为 Webpack 处理 CSS 的方式有很多，例如使用 `style-loader` 将样式注入页面的 `<head>` 标签；使用 `mini-css-extract-plugin` 抽离样式文件。作为 NPM 库开发者，如果我们粗暴地将 CSS 代码打包进产物中，有可能与用户设定的方式冲突。

```js
module.exports = {  
  // ...
+ module: {
+   rules: [
+     {
+       test: /\.css$/,
+       use: [MiniCssExtractPlugin.loader, "css-loader"],
+     },
+   ],
+ },
+ plugins: [new MiniCssExtractPlugin()],
};
```

### 生成 Sourcemap

Sourcemap 是一种代码映射协议，它能够将经过压缩、混淆、合并的代码还原回未打包状态，帮助开发者在生产环境中精确定位问题发生的行列位置，所以一个成熟的 NPM 库除了提供兼容性足够好的编译包外，通常还需要提供 Sourcemap 文件。

### 其它 NPM 配置

可以用一些小技巧优化 test-lib 的项目配置，提升开发效率，包括：

- 使用 `.npmignore` 文件忽略不需要发布到 NPM 的文件；
- 在 `package.json` 文件中，使用 `prepublishOnly` 指令，在发布前自动执行编译命令。
- 在 `package.json` 文件中，使用 `main 指定项目入口`，同时使用 `module 指定 ES Module 模式下的入口`，以允许用户直接使用源码版本。

## Webpack 与 微前端

`Module Federation` 通常译作`“模块联邦”`，是 Webpack 5 新引入的一种远程模块动态加载、运行技术。

MF 有不少实用性强，非常值得学习、使用的特性，包括：

- 应用可按需导出若干模块，这些模块最终会被单独打成模块包，功能上有点像 NPM 模块；
- 应用可在运行时基于 HTTP(S) 协议动态加载其它应用暴露的模块，且用法与动态加载普通 NPM 模块一样简单；
- 与其它微前端方案不同，MF 的应用之间关系平等，没有主应用/子应用之分，每个应用都能导出/导入任意模块；
- 等等。

>推荐一篇相关好文：https://www.lumin.tech/articles/webpack-module-federation/

`Module Federation` 的基本逻辑是一端导出模块，另一端导入、使用模块，实现上两端都依赖于 Webpack 5 内置的 `ModuleFederationPlugin` 插件：

- 对于模块生成方，需要使用 `ModuleFederationPlugin` 插件的 `expose` 参数声明需要导出的模块列表；使用 filename 指定生成的入口文件
- 对于模块使用方，需要使用 `ModuleFederationPlugin` 插件的 `remotes` 参数声明需要从哪些地方导入远程模块；之后在代码中使用异步导入语法 import("module") 引入模块。

>推荐一系列实用 MF 示例：https://github.com/module-federation/module-federation-examples/

## Webpack 与 PWA

`PWA 全称 Progressive Web Apps (渐进式 Web 应用)`，原始定义很复杂，可以简单理解为 **一系列将网页如同独立 APP 般安装到本地的技术集合**。
- 即可以保留普通网页轻量级、可链接(SEO 友好)、低门槛（只要有浏览器就能访问）等优秀特点，
- 又同时具备独立 APP 离线运行、可安装等优势。

PWA 与普通 Web 应用的开发方法大致相同，都是用 CSS、JS、HTML 定义应用的样式、逻辑、结构，两者主要区别在于，PWA 需要用一些新技术实现离线与安装功能：
- `ServiceWorker`： 可以理解为一种介于网页与服务器之间的本地代理，主要实现 PWA 应用的离线运行功能。例如 ServiceWorker 可以将页面静态资源缓存到本地，用户再次运行页面访问这些资源时，ServiceWorker 可拦截这些请求并直接返回缓存副本，即使此时用户处于离线状态也能正常使用页面；
- `manifest 文件`：描述 PWA 应用信息的 JSON 格式文件，用于实现本地安装功能，通常包含应用名、图标、URL 等内容，例如：

我们可以选择自行开发、维护 `ServiceWorker 及 manifest 文件` ，也可以简单点使用 `Google 开源的 Workbox 套件`自动生成 PWA 应用的壳，首先安装依赖：

```bash
yarn add -D workbox-webpack-plugin webpack-pwa-manifest
```

- `workbox-webpack-plugin`：用于自动生成 ServiceWorker 代码的 Webpack 插件；
- `webpack-pwa-mainifest`：根据 Webpack 编译结果，自动生成 PWA Manifest 文件的 Webpack 插件。

**webpack.config.js**
```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      title: "Progressive Web Application",
    }),
    // 自动生成 Manifest 文件
    new WebpackPwaManifest({
      name: "My Progressive Web App",
      short_name: "MyPWA",
      description: "My awesome Progressive Web App!",
      publicPath: "/",
      icons: [
        {
          // 桌面图标，注意这里只支持 PNG、JPG、BMP 格式
          src: path.resolve("src/assets/logo.png"),
          sizes: [150],
        },
      ],
    }),
    // 自动生成 ServiceWorker 文件
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
```

接下来，运行并使用 Chrome 打开页面，打开开发者工具，切换到 Applicatios > Service Workers 面板，可以看到：

![ServiceWorkers](./images/ServiceWorkers.png)

这表明 Service Worker 已经正常安装到浏览器上。此外，地址栏右方还会出现一个下载图标：

![pwa-download](./images/pwa-download.png)

点击该图标可将应用下载到本地，并在桌面创建应用图标 —— 效果如同安装独立 App 一样。

>提示：PWA 是一种复杂度较高的技术，前文只是介绍了一种 Webpack 构建 PWA 的简单方法，感兴趣的同学可以扩展阅读：
> - [developer.chrome.com/docs/workbo…](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/)
> - [developers.google.com/web/fundame…](https://developers.google.com/web/fundamentals/primers/service-workers)

## Webpack 与 Electron

与 Web 页面不同，Electron 应用由一个 `主进程` 及若干 `渲染进程` 组成，进程之间以 `IPC 方式通讯`，其中：

- `主进程`是一个 Node 程序，能够使用所有 Node 能力及 Electron 提供的 Native API，主要负责应用窗口的创建与销毁、事件注册分发、版本更新等；
- `渲染进程`本质上是一个 Chromium 实例，负责加载我们编写的页面代码，渲染成 Electron 应用界面。

>提示：Chromium 是一个非常简洁的开源浏览器，许多浏览器都基于 Chromium 二次开发而成，例如 Chrome、Microsoft Edge、Opera 等。

![Electron](./images/Electron.png)

Electron构建主进程时需要注意：

- 需要将 `target` 设置为 `electron-main` ，Webpack 会自动帮我们过滤掉一些 Electron 组件，如 `clipboard、ipc、screen` 等；
- 需要使用 `externals` 属性排除 `node_modules` 模块，简单起见也可以直接使用 `webpack-node-externals` 包；
- 生产环境建议将 `devtools` 设置为 `false`，减少包体积。

```js
// webpack.main.config.js
const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  // 主进程需要将 `target` 设置为 `electron-main`
  target: "electron-main",
  mode: process.env.NODE_ENV || "development",
  // 开发环境使用 `source-map`，保持高保真源码映射，方便调试
  devtool: process.env.NODE_ENV === "production"? false: "source-map",
  entry: {
    main: path.join(__dirname, "./src/main"),
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
  },
  externals: [nodeExternals()],
};
```

我们可以复用大部分普通 Web 页面构建的方式方法，主要差异点：

- 需要将 `Webpack` 的 `target` 配置设置为 `electron-renderer`；
- Electron 应用通常包含多个渲染进程，因此我们经常需要开启多页面构建配置；
- 为实现渲染进程的 `HMR` 功能，需要对主进程代码稍作改造。

>提示：Webpack 为 Electron 提供了三种特殊 `target` 值：`electron-main/electron-renderer/electron-preload`，分别用于主进程、Renderer 进程、Preload 脚本三种场景。

由于 Webpack 的 `HMR` 功能强依赖于 `WebSocket 实现通讯`，但 Electron 主进程常用`文件协议 file://` 打开页面，该协议不支持 WebSocket 接口，为此我们需要改造主进程启动代码，以 HTTP 方式打开页面代码，如：

```js
function createWindow() {
  const win = new BrowserWindow({
    //...
  });

  if (process.env.NODE_ENV === "development") {
    // 开发环境下，加载 http 协议的页面，方便启动 HMR
    win.loadURL("http://localhost:8080/home");
  } else {
    // 生产环境下，依然使用 `file://` 协议
    win.loadFile(path.join(app.getAppPath(), "home.html"));
  }
}
```

>提示：在生产环境中，出于性能考虑，Electron 主进程通常会以 File URL Scheme 方式直接加载本地 HTML 文件，这样我们就不必为了提供 HTML 内容而专门启动一个 HTTP 服务进程。不过，同一份代码，用 File URL Scheme 和用 HTTP 方式打开，浏览器提供的接口差异较大，开发时注意区分测试接口兼容性。

## Webpack 与 图片

### Webpack4 中

Webpack 4 只能处理标准 JavaScript 模块，因此需要借助 Loader —— 例如 `file-loader、url-loader、raw-loader` 等完成图像加载操作。
- `file-loader`：将图像引用转换为 url 语句并生成相应图片文件；
- `url-loader`：有两种表现，对于小于阈值 `limit` 的图像直接转化为 `base64` 编码；大于阈值的图像则调用 `file-loader` 进行加载；
- `raw-loader`：不做任何转译，只是简单将文件内容复制到产物中，适用于 `SVG 场景`；
- `svg-inline-loader`：能够自动删除 SVG 图片中与显式无关的各种原信息，达到压缩效果；
- `svg-url-loader`：以 DataURL 方式导入 SVG 图片，相比于 Base64 更节省空间；
- `react-svg-loader`：导入 SVG 图片并自动转化为 React 组件形态，效果类似 `@svgr/webpack`；
- `vue-svg-loader`：导入 SVG 图片并自动转化为 Vue 组件形态。

### Webpack5 中

原本需要安装、导入 Loader，Webpack5 之后只需要通过 `module.rules.type` 属性指定资源类型即可，对比来看：
- `file-loader` 对标到 `type = "asset/resource"'`
- `url-loader` 对标到 `type = "asset" 或 type = "asset/inline"`
- `raw-loader` 对标到 `type = "asset/source"`

>引入 `module.rules.type` 并不只是为了取代 Loader 那么简单，更重要的目的是在 `JavaScript Module` 之外增加对其它资源 —— `Asset Module` 的原生支持，让 Webpack 有机会介入这些多媒体资源的解析、生成过程，从而有机会实现更标准、高效的资源处理模型。

`Asset Module`：https://webpack.js.org/guides/asset-modules/

目前 module.rules.type 已经支持 `JSON、WebAssemsbly、二进制、文本`等资源类型。

### 图像优化：压缩

为 Web 页面中的图片做各种优化，提升页面性能，常见的优化方法包括：

- `图像压缩`：减少网络上需要传输的流量；
- `雪碧图`：减少 HTTP 请求次数；
- `响应式图片`：根据客户端设备情况下发适当分辨率的图片，有助于减少网络流量；
- `CDN`：减少客户端到服务器之间的物理链路长度，提升传输效率；
- 等等。

在 Webpack 生态中有不少优秀的图像压缩组件，`image-webpack-loader` 组件功能齐全且用法简单，推荐使用。

`image-webpack-loader` 底层依赖于 `imagemin` 及一系列的图像优化工具：

- `mozjpeg`：用于压缩 JPG(JPEG) 图片；
- `optipng`：用于压缩 PNG 图片；
- `pngquant`：同样用于压缩 PNG 图片；
- `svgo`：用于压缩 SVG 图片；
- `gifsicle`：用于压缩 Gif 图；
- `webp`：用于将 JPG/PNG 图压缩并转化为 WebP 图片格式。

>提示：图像压缩是一种非常耗时的操作，建议只在生产环境下开启。

### 图像优化：雪碧图

在 HTTP 2 之前，HTTP 请求-响应是一种性能低下的通讯模型，即使是为了请求一个非常少的数据，也可能需要完整经历：`建立 TCP 连接 => 发送 HTTP 请求 => 服务端处理 => 返回响应数据整个过程`，加之 HTTP 协议的`队首阻塞、浏览器并发请求数限制`等原因，迫使我们必须尽量减少 HTTP 请求数以提升网络通讯效率。

将许多细小的图片合并成一张大图 —— 从而将复数次请求合并为一次请求，之后配合 CSS 的 `background-position` 控制图片的可视区域，这种技术被称作`“雪碧图”`。

在 Webpack 中，我们可以使用 `webpack-spritesmith` 插件自动实现雪碧图效果。

>雪碧图曾经是一种使用广泛的性能优化技术，但 HTTP2 实现 TCP 多路复用之后，雪碧图的优化效果已经微乎其微 —— 甚至是反优化，可以预见随 HTTP2 普及率的提升，未来雪碧图的必要性会越来越低，因此建议读者们了解作用与基本原理即可，不必深究。

### 图像优化：响应式图片

- 同一张图片(主要是位图)在不同设备中，如果显示尺寸大于原始尺寸，最终效果会有明显颗粒感；
- 而如果显示尺寸小于原始尺寸，又会造成带宽浪费。
- 理想的解决方案是为不同设备提供不同的分辨率、不同尺寸的图片 —— 也就是所谓的`响应式图片`。

Webpack 中有不少能够自动生成响应式图片的组件，例如：`resize-image-loader、html-loader-srcset、responsive-loader` 等。


