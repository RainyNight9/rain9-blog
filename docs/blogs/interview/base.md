# 面试题

## 基础

>简单（1.3-2.1+）

### 概念题（开发中最常用的概念）

1. CSS 中的定位
2. 跨域的几种方式
3. 前端本地存储的几种方式
4. 什么是深拷贝、浅拷贝，分别有哪些应用场景

### ES6 相关 API

1. let/const/var 的区别
2. 箭头函数与简单函数的区别
3. 实践题：（开发中最常用 API 的使用）
4. 数组相关的一道实践题：主要考察数组 API

### 字符串相关的一道实践题

1. 有一个字符串, 移除掉里面的空格，再剔除掉里面所有的中横线，保留前50个字符。
2. 翻转字符串

### 正则相关的一道实践题

1. 写一个正则表达式，匹配手机号码
2. 写一个正则表达式，匹配网址

### 样式布局的一道实践题

1. 写一个顶栏固定高度，侧栏固定宽度，其余部分自适应窗口的布局

### 事件的一道实践题

1. 写一个深/浅拷贝

>中等（2.1 - 2.3）

### 概念题（一些没那么常用，但是又有用武之地的概念）

1. 事件循环（宏任务与微任务）
2. 长连接与长轮询、短轮询的区别，实践
3. 对于编码你有哪些了解，为什么需要 encodeURI/decodeURI？
4. 编码常识：文件编码、URL 编码、Unicode 编码 什么含义。
5. 一个 gbk 编码的页面如何正确引用一个 utf8 的的资源
6. 前端缓存头
7. 事件的捕获和冒泡
8. XSS 和 CSRF 的概念
9. 深拷贝与浅拷贝

### ES6 相关 API2

1. Promise 的概念
2. Proxy 的概念，能解决哪些问题？
3. map
4. set
5. symbol
6. 迭代器
7. Object.defineProperty

### 实践题

1. 原型继承相关的一道实践题
2. call/apply 相关的一道实践题
3. Promise 相关的一道实践题
4. 递归相关的一道实践题
5. 事件的捕获和冒泡的一道实践题
6. 实现深拷贝与浅拷贝
7. 垂直居中的一道实践题
8. 闭包相关的一道实践题
9. canvas相关的一道实践题
10. svg相关的一道实践题：

>有深度（2.2 - 3+）

### 概念题（偏重标准和脱离前端的底层概念）

1. TCP\UDP 区别
2. 页面首屏加载时的都有哪几个指标，分别是什么意思？
3. 不加 Doctype 会有哪些影响
4. 简述 viewport 概念
5. Unicode 编码/ UTF-8 的概念
6. 对称加密与非对称加密
7. 什么是信息摘要算法，大概原理是啥，常用的有哪些，应用场景是什么？
8. http1与http2
9. http状态码
10. http头的属性有什么
11. http2 都有哪些内容，如果要改成 http2，需要做哪些工作？
12. PWA 的缓存流程
13. canvas、webgl 相关问题
14. 浏览器的渲染过程
15. 什么是贝塞尔曲线，前端中有哪些应用场景
16. 什么是尾递归，如何进行尾递归优化

## 框架

### 框架基础 API

1. 请用 vue 循环出一个列表
2. 请用 react 循环出一个列表
3. react 都有哪些生命周期函数

### 框架进阶 API

1. vue
2. vue的diff算法优化（vue2和3之间做了什么优化）
3. vue双向绑定原理（深挖 哪个属性？什么模式？vue2和3有什么不同）
4. vue路由的实现原理
5. react
6. react 与 vue 有什么不同
7. react 项目中的容错应该怎么做？
8. react 项目中的 context api 是干什么的？在什么场景下用
9. react 中的 ref 是干什么的，在什么场景下用
10. react 中的 portal 是干什么的，在什么场景下用
11. react 中的 pureComponent 有什么用
12. react 中的函数式组件和 hooks api
13. react 如何实现按需加载
14. 怎样避免修改了一个小的属性导致整片渲染
15. react的hooks，原理的东西

### 框架选型与核心原理

1. 为什么选择 vue/react
2. vue/react 的本质区别是什么？
3. vue/react中 vdom diff 的原理是什么？
4. vue 是如何对数据进行劫持的？

## 实践

### 前端工程化相关

1. webpack3、4 都有哪些编译时优化
2. rollup 和 webpack 区别
3. 如何提升 webpack 打包的性能
4. 你们用 webpack 的时候会用到哪些插件和 loader
5. 写没写过loader？如何写一个loader

### node.js相关

1. 为什么要用 node 做服务，为什么不用 java 或者 php
2. 用的什么框架，为什么选这个？
3. 一般开几个进程，部署了几台机器？
4. 有没有相关的监控和报警，分别是怎么做的？
5. 如何运行时捕获异常，出现异常如何保证服务不挂掉
6. 怎样做到无缝重启
7. 怎样处理定时任务？

### 前端测试相关

1. 做没做过，没做过的话通过什么别的方式保证质量
2. 单元测试和集成测试的区别

### 前端安全相关

1. 有没有了解，一般有哪些攻击手段？
2. 什么是XSS？
3. 什么是CSRF?
4. 具体怎么做来防止XSS？
5. 具体怎么做来防止CSRF？

### 前端质量相关

### 混合开发问题

1. 怎么保证客户端 JS 注入时机
2. JS 接口的安全性怎么保证
3. JS 接口升级如何向前兼容
4. 页面静态资源是否有缓存策略，有的话是什么

### 实际场景问题

1. 水印功能的实现思路
2. 说说你对域名收敛和域名发散的理解？分别在什么场景下使用

## 算法

### 基础算法

1. 爬楼梯（考察递归）
2. 将一个包含id/pid的列表转换为树的样子（考察递归）
3. 实现一个洗牌算法，将有序数组打乱
4. 变种排序题
5. 倒置字符串
6. 随机数生成
7. 简述堆排序的实现思路及其实现
8. LRU 缓存淘汰算法

### 基本数据结构

1. 将一个数组转化为一个二叉搜索树（考察二叉树的概念）
2. 链表
3. 数组
4. 哈希表
5. 索引

## 后端

### 数据库

1. 数据库索引原理，建立索引会带来哪些好处和哪些副作用
2. 当表的行数达到千万级后，有哪些手段进行优化
3. 一个具体的查询语句优化
4. 一个具体的插入语句优化

### 分布式

1. 简述 CAP 原理

### Linux系统

1. top 命令中有哪些参数，一般关注哪些
2. 如何查看硬盘空间/操作系统
3. 简述 linux 中 user， group 的概念

### 服务治理

1. 服务的注册和发现是怎么做的
2. 怎样监控服务是否存活

## 计算机基础知识

### 理论

1. 进程和线程的区别是什么？
2. 进程间通信有哪些方式？

### 网络框架

1. 什么是域名解析？
2. 简述七层网络结构，我们常用的 TCP、HTTP 协议处于七层网络中的哪一部分？TCP:数据链路层， HTTP：应用层
3. 什么是 CDN？

## 高级

### 关于网络

1. 场景: 用户反馈页面上一张图片不能正常展示, 但是开发人员本地无法复现，可能的原因是什么？
2. 延伸：请从公司网络层、CDN 网络层、用户网络层进行简述出现的原因
3. 如何做 cdn 容错方案？
4. 简述 TC P的三次握手与四次挥手

### 关于浏览器API

1. web 端都有哪些设置缓存的方式，可以分别运用在哪些场景？

答案：

- cookie
- localStorage & sessionStorage
- indexDB
- web sql
- http 缓存
- service worker

2. 进程之间如何进行通信？说一下应用场景？


### 关于 Web 安全

1. 什么是 XSS 攻击？
2. 如何防范 XSS 攻击？
3. 前端能做什么防范 XSS攻击？在展示用户可编辑内容如（url参数，服务端返回的富文本编辑内容）时进行过滤
4. 什么是 csrf 攻击，如何防范
5. 设计一个方案，可以安全的在前端对返回值进行解密。
6. ssl 加密的细节
7. 对称加密和非对称加密
8. 简述单点登录验证的过程

答案：

1. 尝试访问 yewu.domain.com, 校验 cookie 中携带的 session，发现已过期，跳转到 account.domain.com?redirecturl=yewu.domain.com;
2. 在 account.domain.com 页面调用 login 接口进行登录, 登录成功后在 *.domain.com 域下种上 sk 值，然后跳转到 yewu.domain.com
3. yewu.domain.com 通过 sk 值到 account.domain.com 服务验证 sk 值，如果成功，返回 ak 值
4. yewu.domain.com 返回时在 cookie 中种上 ak 值

### 关于 Hybrid 开发

1、某用户反馈 Hybrid 应用中的 web 页面打开比较慢，可能的原因是什么？如何解决？

答案：

- 原因：
  - web 服务本身较慢，比如服务器端处理时间长
  - web 服务依赖的网络层较慢，比如出现跨运营商流量
  - 身份验证设计不合理，身份验证过程中需要多次跳转
  - 用户机器硬件较差或者发生了发热、卡顿
- 解决方案：
  - 服务端问题由服务端解决，增加机器、增加数据缓存、解决机房跨运营商问题
  - 客户端可以通过缓存解决一部分问题
    - 最简单是开启 webview 默认的 http 缓存，但是 http 缓存缓存量较小，过期时间并不会真的按 http 协议头中的约定来设置。
    - 离线包缓存
      - 如何更新离线包？
      - 如何进行离线包下载完整性校验？
      - 如果离线包下载失败或者下载不完整如何容错？
      - 缓存清理策略是什么？
    - 拦截请求：拦截静态资源请求，并进行缓存，可以设计内存 + 磁盘的 LRU 缓存队列
      - 拦截请求如何处理302跳转？
      - 拦截请求如何处理带版本号的资源
      - 缓存清理策略是什么？
  - 客户端可以通过 httpdns 服务获取最优节点，加快首页域名打开速度，同时避免 dns 劫持
    - dns劫持和中间人攻击的区别？
  - 针对身份验证问题，打通端上身份和页面身份，避免每次打开页面都使用标准的 OSS 或者 Oauth 登录
    - 简述一下 OSS/Oauth 登录的基本流程
  - 打通客户端和 web 页之间的日志，提醒用户，并优化可能的客户端问题
    - 如何进行日志打通
    - 一般什么情况会导致客户端发热

### 性能优化

1. B端：大数据量、复杂数据结构的性能优化
2. C端：
3. 延伸：从 Loading、Scripting、Layout(回流)、Painting(重绘)、GPU 加速阐述前端性能优化

### Node

1. 谈一谈你对Node.js中子进程的理解，
2. 为什么要用子进程？
3. 谈谈你对子进程使用的最佳实践
4. 谈谈 child_process 和 cluster 的区别
5. 你会通过哪些手段提升 Node 服务的可用性？

答案：

- 高可用架构：
  - 守护进程：PM2
    - PM2的原理
    - 为什么egg.js不用PM2
  - 多实例：防止某台机器实例挂掉导致
  - 多机房多活：防止某个机房因为光纤挖断等事故造成影响
  - 消息队列：防止大流量击穿
  - 流量控制
- 演练与压测：通过演练和压测找出系统的最大 QPS，以及瓶颈点，进行改进和预防
- 监控：
  - 系统级监控：内存、CPU
  - 进程级监控
- 报警：基于监控对关键指标进行报警
- 值班制度：服务要有值班人和backup
- 日志：要有完善的系统和应用级日志
- CI/CD: 可以在CI流程中集成 code review， 静态检查，自动化测试用例，防止手动上线操作导致的误操作
- 代码质量：

### ES6

1. 你觉得ES6里最有用的API是什么？
2. 箭头函数与普通函数区别
3. Map与Object的区别
4. Set与Array区别
5. 如何捕获 await/async 的错误、Promise 的链式调用的实现

### 算法1

1. 请问获取一个数组中两个值相加等于某一个值的index值,例如[1,2,3,4]  相加等于7

答案：

题目解析：两数之和

最优解：

```js
function add2Num (arr, result) {
  var temp = {}
  for (var i=0; i<arr.length; i++) {
    var target = result - arr[i]
    if (temp[target] !== undefined) return [temp[target], i]
    temp[arr[i]] = i
  }
  return []
}
```

可能次优解：

```js
function add2Num (arr, result) {
  for (var i=0; i<arr.length-1; i++) {
    var target = result - arr[i]
    console.log(target)
    for (var j=i+1; j<arr.length; j++) {
      if (target === arr[j]) {
        return [i, j]
      }
    }
  }
  return []
}
```

2. 生成一个1到30共30个整数的数组，从第1个数开始计数(注意：计数并不代表实际数组的索引)，1、2、3，每次计数到第3个，就将第3个从数组中删除掉(比如第1次，删除的就是3，第2次从4开始计数)，然后重新计数，1、2、3。不断重复这个过程，直到数组中剩下最后一个数，请问剩下的这个数是几？

答案：29

题目解析：本题的真身叫做击鼓传花，主要考察对题目的理解能力、JS数组灵活的特性、和如何不使用递归来无限重复某个过程的能力。只要理解题目需求，思路很简单，30个人围成圈从1开始报数，每次报数到3的人就出列，之后重新开始从1报数。只要明白，每次报数完成的那个人即变成了最后一个，即可。

最优解：

```js
var arr = []

for (var i=1; i<=30; i++) {
  arr.push(i)
}

function findLastOne (arr) {
  for (var i=0; i<Infinity; i++) {
    if (arr.length === 1) {
      return arr[0]
    }
    if (i < 2) {
      arr.push(arr.shift())
    } else {
      arr.shift()
      i = -1
    }
  }
}

console.log(findLastOne(arr))
```

次优解：

```js
var arr = []

for (var i=1; i<=30; i++) {
  arr.push(i)
}

function findLastOne (arr) {
  while (arr.length > 1) {
    for (var i=0; i<2; i++) {
      arr.push(arr.shift())
    }
    arr.shift()
  }
  return arr[0]
}

console.log(findLastOne(arr))
```

3. 给定任意 m * n 二维数组，例如：

```js
var arr = [
  [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  [ 7, 8, 9 ]
]

输出为一维数组：[9, 8, 7, 4, 1, 2, 3, 6, 5]
```

题目解析：反向螺旋矩阵，时间复杂度O(m*n)

答案：

```js
var spiralOrder = function (matrix) {
  var arr = []

  for (var i=matrix.length-1; i>=0; i--) {
    if (i === matrix.length - 1) {
      arr = arr.concat(matrix[i].reverse())
    } else if (i === 0) {
      arr = arr.concat(matrix[i])
    } else {
      if (matrix[i].length) {
        arr.push(matrix[i].shift())
      }
    }
  }

  matrix.pop()
  matrix.shift()

  for (var i=0; i<matrix.length-1; i++) {
    if (matrix[i].length) arr.push(matrix[i].pop())
  }

  if (matrix.length) {
    return arr.concat(spiralOrder(matrix))
  }

  return arr
}
```

4. 10000个大数字，内存只能运行2000个，如何进行排序
5. 
