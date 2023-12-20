# vite

- esbuild（10～100 倍）（go 直接转机器码、go 多线程共享内存、多核 cpu、零造轮子、复用 AST 节点）
- rollup

Vite 作为 Vue 团队出品的构建工具，其超快的`冷启动以及热更新`速度让它迅速🔥起来了。

由于浏览器开始原生支持 `ES 模块`，Vite 巧妙的利用生态系统中的新进展解决了 Webpack 构建速度慢，HMR(热更新)迟钝等问题。

Vite 作为思维比较前卫且先进的构建工具。

## 1. 如何指定 vite 插件 的执行顺序？

可以使用 `enforce` 修饰符来强制插件的位置:

- `pre`：在 Vite 核心插件之前调用该插件
- `默认`：在 Vite 核心插件之后调用该插件
- `post`：在 Vite 构建插件之后调用该插件

## 2. vite 插件 常见的 hook 有哪些？

`hook`: 即钩子。Vite 会在生命周期的不同阶段中去调用不同的插件以达到不同的目的.

- `config`： 可用于修改 vite config，用户可以通过这个 hook 修改 config；例如 vite-aliases 这个插件可以帮助我们自动生成别名。它利用的就是这个钩子。
- `configResolved`： 在解析 Vite 配置后调用，用于获取解析完毕的 config，在这个 hook 中不建议修改 config。
- `configureServer`： 用于给 dev server 添加自定义 middleware；例如 vite-plugin-mock 插件就是在这个生命周期调用的。
- `configurePreviewServer`：与 configureServer 相同但是作为预览服务器。vite preview 插件就是利用这个钩子。
- `transformIndexHtml`：注入变量，用来转换 HTML 的内容。vite-plugin-html 插件可以帮助我们在 html 里注入变量，就是利用这个钩子。
- `handleHotUpdate`：执行自定义 HMR 更新处理

## 3. Vite是否支持 commonjs 写法？

纯业务代码，一般建议采用 `ESM` 写法。如果引入的三方组件或者三方库采用了 `CJS` 写法，`vite` 在预构建的时候就会将 `CJS` 模块转化为 `ESM` 模块。

如果非要在业务代码中采用 `CJS` 模块，那么我们可以提供一个 `vite` 插件，定义 `load hook`，在 `hook` 内部识别是 `CJS` 模块还是 `ESM` 模块。如果是 `CJS` 模块，利用 `esbuild` 的 `transfrom` 功能，将 `CJS` 模块转化为 `ESM` 模块。

## 4. 为什么说 vite 比 webpack 要快

和 `webpack` 对比，为什么 `vite` 的冷启动、热启动、热更新都会快？这就要说说二者的区别。

使用 `webpack` 时，从 `yarn start` 命令启动，到最后页面展示，需要经历的过程：

1. 以 `entry` 配置项为起点，做一个全量的打包，并生成一个入口文件 `index.html` 文件；
2. 启动一个 `node` 服务；
3. 打开浏览器，去访问入 `index.html`，然后去加载已经打包好的 `js、css` 文件；

在整个工作过程中，最重要的就是第一步中的全量打包，中间涉及到构建 `module graph` (涉及到大量度文件操作、文件内容解析、文件内容转换)、`chunk` 构建，这个需要消耗大量的时间。尽管在二次启动、热更新过程中，在构建 `module graph` 中可以充分利用缓存，但随着项目的规模越来越大，整个开发体验也越来越差。

>在浏览器支持 ES 模块之前，JavaScript 并没有提供原生机制让开发者以模块化的方式进行开发。这也正是我们对 “打包” 这个概念熟悉的原因：`使用工具抓取、处理并将我们的源码模块串联成可以在浏览器中运行的文件`。诸如 webpack、Rollup 和 Parcel 等工具应运而生。

>Vite 旨在利用生态系统中的新进展解决上述问题：浏览器开始原生支持 ES 模块，且越来越多 JavaScript 工具使用编译型语言编写。

使用 `vite` 时， 从 `vite` 命令启动，到最后的页面展示，需要经历的过程：

1. 使用 `esbuild` 预构建依赖，提前将项目的第三方依赖格式化为 `ESM` 模块；
2. 启动一个 `node` 服务；
3. 打开浏览器，去访问 `index.html`；
4. 基于浏览器已经支持原生的 `ESM` 模块, 逐步去加载入口文件以及入口文件的依赖模块。浏览器发起请求以后，`dev server` 端会通过 `middlewares` 对请求做拦截，然后对源文件做 `resolve、load、transform、parse` 操作，然后再将转换以后的内容发送给浏览器。

在第四步中，`vite` 需要逐步去加载入口文件以及入口文件的依赖模块，但在实际应用中，这个过程中涉及的模块的数量级并不大，需要的时间也较短。而且在分析模块的依赖关系时， `vite` 采用的是 `esbuild`，`esbuild` 使用 `Go` 编写，比以 `JavaScript` 编写的打包器预构建依赖快 `10-100` 倍（webpack 就是采用 js ）

综上，开发模式下 `vite` 比 `webpack` 快的原因：

1. `vite` 不需要做全量的打包，这是比 `webpack` 要快的最主要的原因；
2. `vite` 在解析模块依赖关系时，利用了 `esbuild`，更快（`esbuild` 使用 `Go` 编写，并且比以 `JavaScript` 编写的打包器预构建依赖快 `10-100` 倍）；
3. `按需加载`；模块之间的依赖关系的解析由浏览器实现。`Vite` 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

## 5. vite 对比 webpack ，优缺点在哪

**优点**：

1. `更快的冷启动`：`Vite` 借助了浏览器对 `ESM` 规范的支持，采取了与 `Webpack` 完全不同的 `unbundle` 机制
2. `更快的热更新`：`Vite` 采用 `unbundle` 机制，所以 `dev server` 在监听到文件发生变化以后，只需要通过 `ws` 连接通知浏览器去重新加载变化的文件，剩下的工作就交给浏览器去做了。

**缺点**：

1. `开发环境下首屏加载变慢`：由于 `unbundle` 机制，`Vite` 首屏期间需要额外做其它工作。不过首屏性能差只发生在 `dev server` 启动以后第一次加载页面时发生。之后再 `reload` 页面时，首屏性能会好很多。原因是 `dev server` 会将之前已经完成转换的内容缓存起来
2. `开发环境下懒加载变慢`：跟首屏加载变慢的原因一样。`Vite` 在懒加载方面的性能也比 `Webpack` 差。由于 `unbundle` 机制，动态加载的文件，需要做 `resolve、load、transform、parse` 操作，并且还有大量的 `http` 请求，导致懒加载性能也受到影响。
3. `webpack支持的更广`。由于 `Vite` 基于 `ES Module`，所以代码中不可以使用 `CommonJs`；`webpack`更多的关注兼容性, 而 `Vite` 关注浏览器端的开发体验。`Vite`目前生态还不如 `Webpack`。

>当需要打包到生产环境时，Vite使用传统的rollup进行打包，所以，vite的优势是体现在开发阶段，缺点也只是在开发阶段存在。
