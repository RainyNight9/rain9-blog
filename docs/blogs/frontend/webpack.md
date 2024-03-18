# webpack

## 理解 Webpack 配置项

**Webpack 的打包过程**非常复杂，但大致上可简化为：

![打包流程](./images/webpack打包流程.png)

- `输入`：从文件系统读入代码文件；
- `模块递归处理`：调用 Loader 转译 Module 内容，并将结果转换为 AST，从中分析出模块依赖关系，进一步递归调用模块处理过程，直到所有依赖文件都处理完毕；
- `后处理`：所有模块递归处理完毕后开始执行后处理，包括模块合并、注入运行时、产物优化等，最终输出 Chunk 集合；
- `输出`：将 Chunk 写出到外部文件系统；

从上述打包流程角度，**Webpack 配置项大体上可分为两类**：

- `流程类`：作用于打包流程某个或若干个环节，直接影响编译打包效果的配置项
- `工具类`：打包主流程之外，提供更多工程化工具的配置项

**与打包流程强相关的配置项有：**

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

**工具类配置项：**

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

![sss](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02ccea1194e045689143011ef62ff553~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.png)

## Babel

Babel 是一个开源 JavaScript 转编译器，它能将高版本 —— 如 ES6 代码等价转译为向后兼容，能直接在旧版 JavaScript 引擎运行的低版本代码。

>Babel 还提供了一个在线版的 REPL 页面， [babeljs.io/repl](https://babeljs.io/repl) 实时体验功能效果。

Babel 提供的语言转译能力，能在确保产物兼容性的同时，让我们大胆使用各种新的 ECMAScript 语言特性。

## TypeScript

时至今日 TypeScript 依然是一项应用广泛的 JavaScript 超集语言。特别适合用于构建多人协作的大型 JavaScript 项目。

TypeScript 提供的类型检查能力，能有效提升应用代码的健壮性。

## ESLint

ESLint 是一种扩展性极佳的 JavaScript 代码风格检查工具，它能够自动识别违反风格规则的代码并予以修复。

ESLint 提供的风格检查能力，能确保多人协作时的代码一致性。

## Webpack 如何处理 CSS 资源？

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

## 使用预处理器

## 使用 post-css

PostCSS 也能在原生 CSS 基础上增加更多表达力、可维护性、可读性更强的语言特性。

PostCSS 并没有定义一门新的语言，而是与 @babel/core 类似，只是实现了一套将 CSS 源码解析为 AST 结构，并传入 PostCSS 插件做处理的流程框架，具体功能都由插件实现。

PostCSS 之于 CSS，则更像 Babel 与 JavaScript。

PostCSS 最大的优势在于其简单、易用、丰富的插件生态，基本上已经能够覆盖样式开发的方方面面。实践中，经常使用的插件有：

- `autoprefixer`：基于 Can I Use 网站上的数据，自动添加浏览器前缀
- `postcss-preset-env`：一款将最新 CSS 语言特性转译为兼容性更佳的低版本代码的插件
- `postcss-less`：兼容 Less 语法的 PostCSS 插件，类似的还有：postcss-sass、poststylus
- `stylelint`：一个现代 CSS 代码风格检查器，能够帮助识别样式代码中的异常或风格问题

## 使用 Vue-loader 处理 SFC 代码

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

## 运行页面

接入的 `vue-loader` 使得 Webpack 能够正确理解、翻译 Vue SFC 文件的内容，接下来让页面真正运行起来，这里会用到：

- 使用 `html-webpack-plugin` 自动生成 HTML 页面；
- 使用 `webpack-dev-server` 让页面真正运行起来，并具备热更新能力。

其中 `html-webpack-plugin` 是一款根据编译产物自动生成 HTML 文件的 Webpack 插件，借助这一插件我们无需手动维护产物数量、路径、hash 值更新等问题。

接入 `html-webpack-plugin` 后，还需要使用 `webpack-dev-server` 启动一套本地开发服务器。`webpack-dev-server` 主要提供两种功能：

- 结合 Webpack 工作流，提供基于 HTTP(S) 协议的静态资源服务；
- 提供资源热更新能力，在保持页面状态前提下自动更新页面代码，提升开发效率。

