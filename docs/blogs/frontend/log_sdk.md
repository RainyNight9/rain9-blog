# 日志 sdk

## 性能日志计算公式

- pv：是用 SDK 采集的性能日志（Performace-OL）进行计算
- UV：使用客户端采集的性能日志（Performace-OL）中的客户端 IP 字段，进行去重计算

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
