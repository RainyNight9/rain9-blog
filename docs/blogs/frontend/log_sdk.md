# 日志埋点 sdk

- 背景 其他部门的方案不合适、特殊参数上传、耗时埋点等
- 流量监测（按时间空间维度分析，留存分析，转化分析）
- 构建行为路径， 获取用户的整条行为链路，实现用户分群、人群洞察、行为细查等，构建用户画像
- 通过对埋点数据的处理、分析、建模，判断产品的效果和未来走向
- 热力分析，帮助判断访客热衷的区域，评估网页设计是否合理等

- 技术 gif（跨域、远离dom，不阻塞、体积小，节约流量）
- 成果 7个 项目接入

**常见的埋点包括：**

- pv【PageView】上报（包括history上报、hash上报）、 hashChange
- uv【UserView】上报、
- dom 事件上报、click、data-xxx、keydown
- js 报错上报（包括常规错误上报、Promise报错上报）
- 批量上报和延迟上报
- 从数量维度上，将单条上报聚合成多条上报，大大减少了数量的请求
- 从时间维度上，先本地化存储数据，将上报请求延后，优先处理业务逻辑请求，在程序空闲时进行上报
- 一般采用组合方式，根据数据量，选择Image或者Beacon的方式，
- 若检测不支持Beacon, 在大数据量时回退到传统的XHR请求

## PV

`History API` 可以让我们更精细地控制`页面的导航和状态`

- `history.pushState(state, title, url)` 向浏览器的会话历史栈增加了一个条目、异步、
- `history.replaceState(stateObj, title[, url])` 修改当前历史记录实体
- `popstate` 事件只会在浏览器某些行为下触发，比如点击后退按钮（或者在 JS 中调用 history.back() 方法）

## dom 事件上报

```ts
private domReport(targetKey: string) {
     mouseEventList.forEach((ev) => {
       window.addEventListener(ev, (e) => {
         // console.log(e.target);
         const target = e.target as HTMLElement;
         if (target.getAttribute("target-key")) {
           console.log("监听到带有target-key属性元素的dom事件");
           this.reportTracker({
             event: ev,
             targetKey,
           });
         }
         console.log("未监听到带有target-key属性元素的dom事件");
         // let activeElement = document.activeElement;
         // if (activeElement?.getAttribute("target-key")) {
         //   console.log("监听到dom事件");
         // }
       });
     });
   }
```

## 错误上报

```js
// 常规报错上报
   private errorEvent() {
     window.addEventListener("error", (event) => {
       console.log(event.message, "常规报错");
       this.reportTracker({
         event: "error",
         targetKey: "message",
         message: event.message,
       });
     });
   }

// Promise报错上报
   private promiseReject() {
     window.addEventListener("unhandledrejection", (event) => {
       event.promise.catch((error) => {
         console.log(error, "promise报错");
         this.reportTracker({
           event: "unhandledrejection",
           targetKey: "message",
           reason: error,
         });
       });
     });
   }
```

## 发送日志

- gif（跨域、远离dom，不阻塞、体积小，节约流量）1×1 透明像素的 GIF 
- `navigator.sendBeacon(url, data)` 用于将数据以非阻塞（后台）方式发送到服务器、即使页面卸载（关闭）也会发送请求

## 性能日志计算公式

- pv：是用 SDK 采集的性能日志（Performace-OL）进行计算
- UV：使用客户端采集的性能日志（Performace-OL）中的`客户端 IP 字段`，进行去重计算

- first-paint（首屏有效绘制时间）：直接获取的 window.performance.getEntries().first-paint

**以下字段均来自于 performance.timing 下：**

- ttfb（发起文档请求到首字节返回的时间）: responseStart - requestStart
  - responseStart：当浏览器从服务器，缓存或本地资源接收到响应的第一个字节后， 立即返回时间戳
  - requestStart：开始请求文档时间

- FirstByte（从 DNS 解析到首字节返回的时间） :  responseStart - domainLookupStart
  - responseStart：当浏览器从服务器，缓存或本地资源接收到响应的第一个字节后，responseStart 立即返回时间戳
  - domainLookupStart：DNS 域名查询开始的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等

- DNS（DNS 解析时间）：domainLookupEnd - domainLookupStart
  - domainLookupEnd：DNS 域名查询完成的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
  - domainLookupStart：DNS 域名查询开始的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等

- TCP（TCP 链接建立时间）：connectEnd - connectStart
  - connectStart 和 connectEnd：分别代表TCP建立连接和连接成功的时间节点。如果浏览器没有进行TCP连接（比如使用持久化连接 webscoket、使用缓存或本地资源），则两者都等于 domainLookupEnd
  - domainLookupEnd：在浏览器完成资源的域名查找所需时间，如果有缓存则表示缓存查找时间

- SSL（建立 ssl 链接所需要的时间）：connectEnd - secureConnectionStart
  - connectEnd：TCP 连接成功的时间节点
  - secureConnectionStart： HTTPS 连接开始的时间，如果不是安全连接，则值为 0

- TTL(可交互时间)：domInteractive - fetchStart
  - domInteractive：完成解析 DOM 树的时间，Document.readyState 变为 interactive，并将抛出 readystatechange 相关事件
  - fetchStart：表示浏览器即将开始获取资源之前的时间戳。

- Ready(基本 DOM 加载完毕的时间):  domContentLoadedEventEnd - fetchStart
  - domContentLoadedEventEnd：DOM 解析完成后，网页内资源加载完成的时间（如 JS 脚本加载执行完毕），文档的DOMContentLoaded 事件的结束时间
  - fetchStart：表示浏览器即将开始获取资源之前的时间戳。

- Load(所有资源加载完毕的时间):  loadEventStart - fetchStart
  - loadEventStart：DOM 解析完成后，网页内资源加载完成的时间（如 JS 脚本加载执行完毕），文档的DOMContentLoaded 事件的结束时间
  - fetchStart：表示浏览器即将开始获取资源之前的时间戳。

**其他一些指标：**

- LCP：最大内容绘制，LCP（Largest Contentful Paint），用于记录视窗内最大的元素绘制的时间。
- FID：首次输入延迟，FID（First Input Delay），FID指的是用户首次与产品进行交互时，我们产品可以在多长时间给出反馈。
- CLS：累计位移偏移，CLS（Cumulative Layout Shift），记录了页面上非预期的位移波动。
- TBT：阻塞总时间，TBT（Total Blocking Time），记录在 FCP 到 TTI 之间所有长任务的阻塞时间总和。

通过谷歌官方库 web-vitals 可以获取到这些指标

**埋点功能的意义：**

- `数据采集`：埋点是数据采集领域（尤其是用户行为数据采集领域）的术语，它针对特定用户行为或事件进行捕获、处理和发送的相关技术及其实施过程。通过埋点，可以收集到用户在应用中的所有行为数据，例如页面浏览、按钮点击、表单提交等。
- `数据分析`：采集的数据可以帮助业务人员分析网站或者App的使用情况、用户行为习惯等，是后续建立用户画像、用户行为路径等数据产品的基础。通过数据分析，企业可以更好地了解用户需求，优化产品和服务。
- `改进决策`：通过对埋点数据的分析，企业可以了解用户的真实需求和行为习惯，从而做出更符合市场和用户需求的决策，提高产品和服务的质量和竞争力。
- `优化运营`：通过埋点数据，企业可以了解用户的兴趣和行为，从而更好地定位目标用户群体，优化运营策略，提高运营效率和收益。
- `预测趋势`：通过对埋点数据的分析，企业可以预测市场和用户的未来趋势，从而提前做好准备，把握市场机遇，赢得竞争优势。

**主流模块做个总结:**

- `CommonJS`规范主要用于服务端编程，加载模块是同步的，这并不适合在浏览器环境，因为同步意味着阻塞加载，浏览器资源是异步加载的，因此有了AMD和CMD解决方案
- `AMD`规范在浏览器环境中异步加载模块，而且可以并行加载多个模块。不过，AMD规范开发成本高，代码的阅读和书写比较困难，模块定义方式的语义不顺畅。
- `CMD`规范整合了CommonJS和AMD规范的特点， CMD规范与AMD规范很相似，都用于浏览器编程，依赖就近，延迟执行，可以很容易在Node.js中运行。不过，依赖SPM打包，模块的加载逻辑偏重
- `UMD`是AMD和CommonJS两者的结合，这个模式中加入了当前存在哪种规范的判断，所以能够“通用”，它兼容了AMD和CommonJS，同时还支持老式的“全局”变量规范
- `ESM` ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

**rollup 和 webpack 的区别：**

- webpack 由于年代相对久远，在 commonjs 后且 esMoudles 之前,所以通过 webpack 通过自己来实现 commonjs 等语法，rollup 则可以通过配置打包成想要的语法，比如 esm
- 所以说 rollup 很适合打包成 库，而 webpack 比较适合用来做来打包应用
- 由于 rollup 不能够直接读取 node_modules 中的依赖项，需要引入加载 npm 模块的插件：rollup-plugin-node-resolve
- 由于 rollup 默认只支持 esm 模块打包，所以需要引入插件来支持 cjs 模块：rollup-plugin-commonjs
- 由于 rollup 通过可以 esm 模块开发和打包，所以支持 tree-shaking 模式
- vite 就是 rollup 开发而来的
