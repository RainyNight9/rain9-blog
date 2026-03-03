# 别再乱装库了：这 10 个浏览器原生 API 早就解决了你的问题

Web 平台的能力远比大多数开发者想象的要强大——而且每年都在悄悄地增加新的“超能力”。

有时候，想选题比写文章本身还难。

当我在想这周写点什么的时候，脑子里只有两种想法：要么是那种“爆炸性”的大新闻，要么是深度的技术硬核文。😅 但我想要点更轻松的。既要有技术含量，又要实用，但别让人掉进三天爬不出来的研究兔子洞里。

既然我真心喜欢探索浏览器的极限（以及我们能把它推到多远），我决定聊个“狡猾”的话题：**那些被低估的 Web API**。

其中一些可能是你的家常便饭。
但我敢打赌，至少有几个会让某些人惊呼：“等一下，还有这玩意儿？！” 😉

好了，废话不多说。让我们开始吧。

这里有 10 个值得更多关爱的浏览器原生 API。

---

## 1) Structured Clone API (结构化克隆)

我对这个 API 真是爱恨交加。

多年来，我最喜欢的面试题之一就是：**“你如何深拷贝一个对象？”**

你可以从答案中学到很多东西：他们懂引用吗？懂 `Object.assign` 和 `JSON` 黑魔法吗？会提到第三方库（如 Lodash）吗？还是直接慌了？ 😄

现在呢？

```javascript
const calendarEvent = {
  title: "Meeting",
  date: new Date(123),
  attendees: new Set(["Alice", "Bob"])
};

// ❌ JSON 大法：Date 变字符串，Set 变空对象 {}
const jsonCopy = JSON.parse(JSON.stringify(calendarEvent));

// ✅ Structured Clone：完美还原 Date 和 Set
const realCopy = structuredClone(calendarEvent);
```

Boom。完美的深拷贝。

**为什么它比 JSON 大法好？**
*   ✅ **支持更多类型**：`JSON` 方法会把 `Date` 变成字符串，把 `Map` 和 `Set` 弄丢，甚至忽略 `undefined`。而 `structuredClone` 能完美还原它们，还支持 `Blob`, `File`, `ArrayBuffer` 等二进制类型。
*   ✅ **不怕循环引用**：如果对象 A 引用了 B，B 又引用了 A，用 JSON 方法会直接报错（栈溢出爆炸 💥）。`structuredClone` 则能轻松搞定。
*   ❌ **注意**：它**不能**克隆函数（会抛错），不过在处理纯数据时这通常不是问题。

**支持情况**：现代浏览器 (Chrome, Firefox, Safari, Edge)。生产环境安全。

---

## 2) Performance API

严重被低估。我们经常谈论性能，安装各种工具，跑 Lighthouse，但有时候你只是想确认一下：**“A 真的比 B 快吗，还是我在过度设计？”**

你可能会想用 `Date.now()`，但它精度不够，且受系统时间修改影响。`performance.now()` 才是正解。

```javascript
performance.mark("start");

// 这里放你要测量的代码（比如一个复杂的循环）
doHeavyWork();

performance.mark("end");
performance.measure("my-benchmark", "start", "end");

// 获取高精度测量结果
const entries = performance.getEntriesByName("my-benchmark");
console.log(entries[0].duration + "ms");
```

**非常适合：**
*   微基准测试 (Micro-benchmarks)
*   检查 Web Worker 或 WASM 是否真的带来了性能提升（加上通信成本后）
*   对你的假设进行“现实核查”，因为有时候，“优化后”的版本反而更慢 😅

**支持情况**：所有现代浏览器完美支持。

---

## 3) Page Visibility API (页面可见性)

检测标签页是否处于激活状态。

不要再用 `window.onblur` 或 `window.onfocus` 了，它们在用户只是点击了另一个窗口（但你的页面还在屏幕上可见）时也会触发。

`visibilitychange` 才是检测“用户是否真的在看页面”的正确方式。

```javascript
document.addEventListener("visibilitychange", () => {
  // document.visibilityState 可以是 'visible', 'hidden', 'prerender'
  if (document.visibilityState === 'hidden') {
    // 用户切走了：暂停视频、停止轮询、停止复杂的 Canvas 动画
    video.pause();
    stopPolling();
  } else {
    // 用户回来了：恢复一切
    video.play();
    startPolling();
  }
});
```

**使用场景：**
*   节省带宽：用户不看时，别再每秒请求一次接口了。
*   节省电量：暂停高能耗的动画。
*   更精准的数据分析：计算用户的**真实阅读时长**。

**支持情况**：所有现代浏览器。

---

## 4) ResizeObserver

终于来了——监听**元素**的大小，而不仅仅是窗口大小 (`window.resize`)。

以前，如果一个侧边栏折叠导致主内容区变宽，或者一个文本框被用户拖大，`window.resize` 根本不会触发。你只能写一堆烂代码去轮询或者 hack。

现在：

```javascript
const ro = new ResizeObserver(entries => {
  for (const entry of entries) {
    // 获取元素的精确尺寸信息
    const { width, height } = entry.contentRect;
    console.log(`Element size: ${width}x${height}`);
    
    // 比如：如果宽度小于 500px，就切换到“紧凑模式”
    if (width < 500) element.classList.add('compact');
  }
});

// 监听任何 DOM 元素
ro.observe(document.querySelector('.sidebar'));
ro.observe(document.querySelector('.main-content'));
```

这个 API 就像浏览器在对你说：“放轻松，布局变化交给我。”

**支持情况**：现代浏览器广泛支持。

---

## 5) IntersectionObserver

ResizeObserver 的兄弟。它检查**元素是否进入了视口（Viewport）**。

以前我们怎么做无限滚动？监听 `scroll` 事件，疯狂计算 `getBoundingClientRect()`，这会让主线程卡顿，导致页面滚动不流畅。

IntersectionObserver 是异步的，高性能的。

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 元素进入视口了！
      console.log("加载更多数据...");
      loadMoreItems();
      
      // 如果只需要触发一次（比如懒加载图片），用完记得取消监听
      observer.unobserve(entry.target);
    }
  });
}, {
  rootMargin: '100px' // 提前 100px 触发，让用户感觉不到加载过程
});

// 监听列表底部的那个“加载中”转圈圈元素
observer.observe(document.querySelector('#loading-spinner'));
```

**神器用于：**
*   无限滚动 (Infinite scroll)
*   图片懒加载 (Lazy loading)
*   埋点曝光（只有用户真的滑到了广告，才算一次展示）

**支持情况**：所有现代浏览器。

---

## 6) AbortController

很多开发者知道它是配合 `fetch` 用来取消请求的，但它的能力远不止于此。

它是一个通用的“取消信号”机制。

```javascript
const controller = new AbortController();
const { signal } = controller;

// 1. 取消 Fetch 请求
fetch(url, { signal }).catch(err => {
  if (err.name === 'AbortError') console.log('请求被取消');
});

// 2. 一键移除事件监听器（不用再保存函数引用了！）
window.addEventListener('resize', handleResize, { signal });

// 3. 取消任何支持 signal 的异步操作
doSomethingAsync({ signal });

// 💥 一声令下，全部取消
controller.abort();
```

**更棒的是：**
👉 一个信号可以同时传递给多个操作。比如用户点击“取消”按钮时，同时取消 3 个 API 请求和 2 个事件监听器。

**支持情况**：所有现代浏览器。

---

## 7) Idle Detection API (空闲检测)

Page Visibility 告诉你标签页是否激活。
Idle Detection 告诉你**人**是否激活。

这有什么区别？
用户可能把你的即时通讯软件挂在第二个屏幕上（页面可见），但他本人其实去开会了（系统空闲）。

```javascript
// 需要用户授权权限
if (await IdleDetector.requestPermission() === 'granted') {
  const detector = new IdleDetector();
  
  detector.addEventListener("change", () => {
    const { userState, screenState } = detector;
    console.log(`用户状态: ${userState}, 屏幕状态: ${screenState}`);
    
    if (userState === 'idle') {
      updateStatusToAway(); // 自动把状态改成“离开”
    }
  });

  await detector.start({ threshold: 60000 }); // 1分钟无操作算空闲
}
```

**使用场景：**
*   聊天软件自动切换“忙碌/离开”状态
*   银行应用自动登出
*   停止高消耗的后台计算以省电

**注意**：这有点涉及隐私，所以必须经过用户明确许可。

**支持情况**：主要是 Chromium 内核浏览器。

---

## 8) BroadcastChannel API

简单的多标签页通信。

以前我们要在两个 Tab 之间同步数据，得用 `localStorage` 监听 `storage` 事件，或者搞个 SharedWorker，都很麻烦。

`BroadcastChannel` 就像一个对讲机，只要频道名称一样，大家都能听到。

```javascript
// 在 Tab A 中
const channel = new BroadcastChannel("my-app-channel");
channel.postMessage({ type: 'LOGOUT', user: 'rain9' });

// 在 Tab B 中 (无需引用 Tab A)
const channel = new BroadcastChannel("my-app-channel");
channel.onmessage = (event) => {
  if (event.data.type === 'LOGOUT') {
    alert("您已在其他页面登出");
    window.location.reload();
  }
};
```

**非常适合：**
*   用户在一个标签页登出，所有标签页自动跳转登录页
*   主题切换同步（这边切黑夜模式，那边也跟着黑）
*   数据变更通知

**支持情况**：现代浏览器。Safari 后来也跟进支持了。

---

## 9) Web Locks API

BroadcastChannel 的表亲。防止跨标签页的**竞态条件 (Race Conditions)**。

想象一下：用户打开了 5 个标签页，你的应用启动时会去同步大量数据。你不想让 5 个标签页同时去轰炸后端 API，对吧？

Web Locks 让你能“加锁”。

```javascript
// 请求一个叫 'my-sync-lock' 的锁
navigator.locks.request("my-sync-lock", async (lock) => {
  // 只有获得锁的那个标签页才会执行这里的代码
  // 其他标签页会排队等待，或者直接被告知“锁被占用了”
  
  await syncDataFromBackend();
  console.log("同步完成");
});
```

**使用场景：**
*   主从模式 (Leader Election)：选一个 Tab 当“主 Tab”负责处理 WebSocket 或定时任务。
*   防止多个 Tab 同时写入 IndexedDB 导致冲突。

感觉非常有“分布式系统遇上前端”的味道。

**支持情况**：主要是 Chromium。并非全平台通用，但 Polyfill 很容易写。

---

## 10) File System Access API

是的——浏览器里的**真实**文件系统访问权限。

不再是简单的 `<input type="file">` 上传了。你可以**打开**一个文件，修改它，然后**直接保存回原文件**。就像 VS Code 网页版那样。

```javascript
// 1. 让用户选择一个文件
const [fileHandle] = await window.showOpenFilePicker();

// 2. 读取内容
const file = await fileHandle.getFile();
const text = await file.text();

// 3. 修改后写回（需要再次请求写入权限）
const writable = await fileHandle.createWritable();
await writable.write("这是新追加的内容！");
await writable.close();
```

**非常适合：**
*   Web 版代码编辑器 / Markdown 编辑器
*   图片处理工具（直接覆盖原图）
*   本地配置文件的导入导出

第一次使用时，感觉有点违规。就像“我们真的被允许在 Web 上做这个吗？” 😄 当然，浏览器会弹出非常显眼的权限提示框。

**支持情况**：Chromium 为主。其他浏览器限制较多。

---

## 现实核查 (Reality Check) 🧠

这些 API 中的大多数在现代浏览器中都有很好的支持。但有些（Idle Detection, File System Access, Web Locks）仍然是以 Chromium 为中心的。

所以在全力投入之前，一定要检查兼容性。

但仅仅知道它们的存在？这已经给了你优势。

Web 平台发展迅速。有时候，“新技术”不是某个框架——而是那个一直静静待在那里的原生浏览器特性。
