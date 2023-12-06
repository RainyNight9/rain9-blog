# PWA

## 背景

大家都知道 Native app 体验确实很好，下载到手机上之后入口也方便。它也有一些缺点:

- 开发成本高(ios和安卓)
- 软件上线需要审核
- 版本更新需要将新版本上传到不同的应用商店
- 想使用一个 app 就必须去下载才能使用，即使是偶尔需要使用一下下

而 web 网页开发成本低，网站更新时上传最新的资源到服务器即可，用手机带的浏览器打开就可以使用。但是除了体验上比 Native app 还是差一些，还有一些明显的缺点

- 手机桌面入口不够便捷，想要进入一个页面必须要记住它的 url 或者加入书签
- 没网络就没响应，不具备离线能力
- 不像 APP 一样能进行消息推送

## 介绍

PWA 全称 Progressive Web App，即渐进式 WEB 应用。

Google 在 2016 年提出的概念，2017 年落地的 web 技术。目的就是在移动端利用提供的标准化框架，在网页应用中实现和原生应用相近的用户体验的渐进式网页应用。

## 能力

- 可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏 ( Manifest 文档地址)
- 实现离线缓存功能，即使用户手机没有网络，依然可以使用一些离线功能
- 实现了消息推送

这些特性将使得 Web 应用渐进式接近原生 App。

**service worker 实现离线缓存：**

- Service Worker 是 Chrome 团队提出和力推的一个 WEB API，用于给 web 应用提供高级的可持续的后台处理能力。
- Service Workers 就像介于服务器和网页之间的拦截器，能够拦截进出的 HTTP 请求，从而完全控制你的网站。

**最主要的特点：**

- 在页面中注册并安装成功后，运行于浏览器后台，不受页面刷新的影响，可以监听和截拦作用域范围内所有页面的 HTTP 请求。
- 网站必须使用 HTTPS。除了使用本地开发环境调试时(如域名使用 localhost)
- 运行于浏览器后台，可以控制打开的作用域范围下所有的页面请求
- 单独的作用域范围，单独的运行环境和执行线程
- 不能操作页面 DOM。但可以通过事件机制来处理
- 事件驱动型服务线程
- 是 PWA 的核心

>为什么要求网站必须是 HTTPS 的，大概是因为 service worker 权限太大能拦截所有页面的请求吧，如果 http 的网站安装 service worker 很容易被攻击

## 缺点

**PWA 的优势：**

- 可以将 app 的快捷方式放置到桌面上，全屏运行，与原生 app 无异
- 能够在各种网络环境下使用，包括网络差和断网条件下，不会显示 undefind
- 推送消息的能力
- 其本质是一个网页，没有原生 app 的各种启动条件，快速响应用户指令

**PWA 的缺点：**

- 支持率不高:现在 ios11.2 以下手机端不支持 pwa，IE 也暂时不支持
- Chrome 在中国桌面版占有率还是不错的，安卓移动端上的占有率却很低
- 各大厂商还未明确支持 pwa
- 依赖的 GCM 服务在国内无法使用
- 微信小程序的竞争

## 风险点

### 1. PWA 的更新问题

- 要对 sw 设置缓存文件对版本号
- 由于 sw 的异步注册特点, 更新的文件不能立即生效, 需要刷新一下页面, 因此对于手动刷新不方便的页面, 慎重使用
- 参考 https://blog.csdn.net/weixin_34245082/article/details/91426966

### 2. 卸载 service worker

```js
navigator.serviceWorker.getRegistrations()
  .then(function(registrations) {
      for(let registration of registrations) { 
          registration.unregister();
      }
  })
```

### 3. 对于 ajax 的 get 请求,需要放到黑名单中

```js
var ignoreCache = [
    /src\/js\/1.js/
]
```

## 开源框架

LAVAS： https://juejin.im/e/pwa-lavas

LAVAS demo：https://lavas-project.github.io/lavas-demo/appshell-new/#/

**Lavas 解决方案能够帮助开发者完成：**

- 最基本的移动站点建设，包括 Vue, Vuex, Vue-router, webpack 等常用且成套的技术提供支持
- 允许站点添加至手机桌面，再次打开时全屏运行，摆脱浏览器的固定显示框架(地址栏，菜单栏等)
- 强化缓存，允许站点在弱网甚至离线的情况下继续显示内容
- 支持消息推送，帮助站长主动推送用户感兴趣的信息，提升业务指标
- 支持服务端渲染(SSR)，对搜索引擎更加友好
- 支持App Shell 模型，在正常情况下提升加载性能，在异常情况下优化错误显示。

总结起来，Lavas 除了能帮助开发者完成 Vue 能做的(搭建基本站点)之外，通过一些配置还能够快速赋予站点 PWA 的特性，且不需要开发者过多的关心 PWA 的详细开发技术和细节。

我们可以粗略的理解为： Lavas = Vue + PWA

## 技术评估

- 问:PWA 是否要使用?
- 答：目前 PWA 是组织可尝试的技术方案.

- 问:我们要使用 PWA 解决等问题?是否解决?
- 答：要解决白屏、提高页面性能达到秒开的问题.对用户第一次加载页面不能解决白屏、FP 耗时问题,但是非首次可以降低 onload 耗时 XX%,FP 耗时 XX%;

- 问:PC 客户端的内核是否支持 PWA
- 答：支持

- 问:Android X5 内核支持情况
- 答：不支持

- 问：lavas 是否建议使用
- 答：可关注，暂时没有需求场景。

## 测试方案设计

Slow 3G 网络下:

|  是否有用 sw   | fp 耗时（ms）  | onload 耗时（ms）  |
|  ----  | ----  | ----  |
| 有首次  | 5902 | 27170 |
| 非首次  | 2315 | 20655 |
| 无  | 5908 | 26900 |

结论： 有 sw 首次 fp 和 onload 时长差距不大,甚至还会略高，sw 非首次加载 fp、onload 明显降低, fp 降低 39% ，onload 降低 76% .

那么，什么情况下，能用 service worker 来优化首屏速度呢？我觉得主要是以下两个场景：

- 老用户回访率很高的业务。老用户回访时，service worker 已经劫持了网络请求，静态文件是可以通过 service worker 加载的。如果每天的页面 pv 里，大部分都是新用户，从整体上看，service worker 并不能发挥作用，并且维护 service worker 本身也是需要一定的成本的，就没有必要上 service worker了。
- 页面之间相互依赖。比如说有一个入口 A 页面，A 页面可以跳转到 B 页面，那么可以在 A 页面中使用 service worker 将 B 页面的静态文件也缓存下来，这样可以较大幅度地提高 B 页面的首屏速度。

## 参考资料

https://yq.aliyun.com/articles/608737

https://segmentfault.com/a/1190000019239906

https://juejin.im/e/pwa-lavas

https://www.jianshu.com/p/098af61bbe04

## workbox3---service worker 通用方案

### 技术背景

关于前端性能优化，大多数情况我们优化方案是减少资源请求时间，优化资源加载渲染几方面。

service worker 的目的就是减少每次的网络请求，通过在浏览器和服务器之间加一层 service 代理，通过缓存自己需要缓存的资源，使得每次浏览器请求的时候，可以直接读取本地缓存。这样可以极大的优化项目性能和提高用户使用体验。

但是同样的，service worker 的功能太强大了，它能够拦截我们所有的 http 请求，这样面临的问题就是我们使用原生 service worker api 需要处理兼容各种各样的网络请求状况。由此学习成本非常大。

淘宝官网也是使用了 service worker，借鉴他们的方案，使用 google 开发的 service worker 框架。能够提高简化流程，减少学习成本和使用成本。

### 成熟案例

淘宝官网使用 google 的 workbox3 来处理 service worker api

### 方案对比

**优势：**

- 大量简化操作原生 api，上手简单。
- 多种缓存及请求策略。
- 之前方案会拦截所有 get 请求，因此也会拦截接口的 get 请求，使得 get 接口回调函数无法执行，需要将所有的 get 接口加入黑名单。但是 workbox3 通过正则匹配，设置缓存资源白名单，使得缓存更加细化和简单。
- 有成熟的网上实践和google的支持维护。

**缺点：**

workbox 对于我们来说是一个黑盒，我们不了解内部如何实现，存在一定的风险。

### 参考资料1

https://github.com/GoogleChrome/workbox

https://www.jianshu.com/p/ff4b194cb56a

https://www.jianshu.com/p/a29fed4eeb86

https://www.jianshu.com/p/b37e2cd20f64

## PWA 实践 - OA

### 背景1

前端优化除了代码的优化之外，很大的一部分是在网络请求和浏览器渲染阶段的优化。

而 service worker 的优化手段正是优化网络请求阶段，通过在浏览器和服务器之间架一层代理，拦截请求并返回自己设定好的响应内容。

因此我们就可以使用 service worker 来拦截一些静态资源文件（js、css、image）保存在本地，然后在以后的请求中，直接将本地的静态资源返回给浏览器。

### 注意事项

- 由于 service worker 有很大的权限（可以拦截网络请求），所以为了安全考虑，service worker 只能运行在 https 协议下，http 协议无法运行（‘serviceWorker' in navigator === false）
- service worker 只能监听 service worker 脚本所在目录及以下目录，其它路径资源无法拦截。
- 我们可以自定义 service worker 的控制 scope, 但是 scope 最高只能与 service worker 脚本同级目录下，否则会报错（The Path of the provided scope (scope) is not under the max scope allwed (sw.js脚本所在目录).Adjust the scope, move the service worker script.or use the service-worker-allowed http header to allow the scope.）
- 在service worker脚本中无法访问window对象和DOM对象，它类似于web worker是一个子线程。

### 专属OA接入情况

由于专属 OA 是在原 OAweb 域（assist.xxxx.com）的/z 路径下，但是真实的静态资源却在 assist.xxxx.com/frontend/exclusive 下，通过 nginx 对/assist.xxxx.com\/z{1,}/ 的请求都跳转到 assist.xxxx.com/frontend/exclusive/index.html。所以我们在 index.html 里注册 service worker 的时候会遇到 service worker 脚本404的情况，如下：

```js
navigator.serviceWorker.register('./sw.js') // error fetch 404
```

因为我们真实的 sw.js 脚本在 frontend/exclusive/ 路径下。

因此有两种解决方案：

1. 通过 nginx 代理对在 /z 下的所有 sw.js 请求都转发到真实的 sw.js 路径下(/frontend/exclusive/sw.js)
2. 在访问 /z 请求到 index.html 页面的时候，前端跳转到 "https://assist.xxxx.com/frontend/exclusive/index.html" + "#前端路由及参数"下

具体代码如下：

```js
let arr = location.href.split('#')
if (/assist.xxxx.com\/z$/.test(arr[0])) {
  location.href = 'https://assist.xxxx.com/frontend/exclusive/index.html' + (arr[1] ? '#' + arr[1] : '')
}
if ('serviceWorker' in navigator) {
  const PATH = location.hostname === "localhost" ? './sw.js' : './sw.js'
  navigator.serviceWorker.register(PATH).then((register) => {
    console.log('register successful, scope is: ', register.scope)
  }).catch(err => {
    console.log('error: ', err)
  })
}
```

>注意：如果我们实践的 service worker 优化出现问题，通过回滚代码是不能够解决线上问题的，之前安装的 service worker 脚本还是会运行，返回给浏览器缓存的资源。因此我们需要再上一次代码，结束 sw 脚本的生命周期。代码如下：

```js
navigator.serviceWorker.getRegistrations()
  .then(function(registrations) {
      for(let registration of registrations) {
        registration.unregister();
      }
  }); // 降级方案
```

### service worker脚本

通过已有的 service worker 库：workbox3 来使用 service worker。其中的 importScripts 是引入 workbox3 的 cdn 资源，是 service worker 全局方法。

```js
/**
 * 使用 workbox 来使用 service worker
 */
importScripts('https://res11.xxxx.com/live/public/workbox/workbox-sw.js');
/**
 * 强制使用调试和生产构建
 */
 
workbox.setConfig({
    debug: false,
    modulePathPrefix: 'https://res11.xxxx.com/live/public/workbox/'
})
 
/**
 * 设置更改默认缓存名称
 */
workbox.core.setCacheNameDetails({
    prefix: 'exclusive',
    suffix: 'v2.3.0'
})
 
/**
 * 强制使用新发布的service worker
 */
workbox.skipWaiting();
workbox.clientsClaim();
 
/**
 * 设置workbox的日志等级
 */
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.error)
// console.log(workbox.core.cacheNames)
// console.log(workbox.core.logLevel)
// console.log('workbox', workbox);
 
/**
 * 拦截网络请求并做相应的处理
 * workbox拦截http请求处理策略参考地址
 * https://www.jianshu.com/p/0a327e2f9636
 */
workbox.routing.registerRoute( // 缓存index.html页面
    new RegExp('index'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'index-html'
    })
)
workbox.routing.registerRoute( // 当是资源js文件的时候
    new RegExp('(app|manifest|vendor)+.js'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'main-js'
    })
)
workbox.routing.registerRoute( // 当是懒加载动态路由的时候
    new RegExp('/js/[0-9]{1,2}.js'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'main-js'
    })
)
workbox.routing.registerRoute(
    new RegExp('/css/.*\.css'), // 当是css文件的时候
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'cache-css'
    })
)
workbox.routing.registerRoute( // 图片缓存
    new RegExp('/img/.*\.(jpg|jepg|png|icon|bmp|gif)'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'cache-img'
    })
)
```

### 优化效果

**优化前：**

- 首屏加载耗时 1s 以上占比 25%, 500ms 以上占 57%, 平均值 400ms
- onload 1s 以上占比 32%, 2s 以上占比 8.1%, 均值 1140ms

**优化后：**

- 首屏加载耗时 1s 以内占比 99.29%, 300ms 以内占比 95%, 平均值在 70ms;
- onload 1s 以内占比 75.94%, 2s 以内占 90.82%, 平均值在 850ms

>sw支持率: 96.57%

从上述生产环境数据可以看出, serviceWorker 可以大大提高页面性能, 首屏渲染提升 500%, onload 提升 134%, 生产环境中专属 OA 中 sw 支持率在 96.57%,支持率比较高.
