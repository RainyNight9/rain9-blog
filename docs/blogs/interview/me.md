# M

岗位职责:
1.负责美团到店事业群的前端研发工作、工程化建设，逐步提升开发、交付效率，并保障产品工程质量;
2.负责解决前端开发流程中的各种痛点，带领技术攻关;
3.持续优化项目技术、保证代码质量和服务稳定、提升用户体验。

岗位基本要求:
1.前端基础知识扎实，熟练掌握原生 JavaScript(ES6)、HTML、CSS;
2.熟悉并掌握至少一种 MVVM 框架，如: Vue、React、Angular, Vue 优先;
3.2年以上前端开发经验(自认能力突出者不受此限);
4.熟悉前端工程化和相关构建打打包工具，如(webpack、Vue CLI、Babel、 ESlint);
5.熟悉 Node.js 及主流开发框架(Koa.js、Egg.js)或具备其他后端语言经验，如 php，Java;
6.具有良好的沟通能力、总结能力和独立解决问题的能力;
7.热爱前端开发，工作积极主动，而非找一份工作;
8.具备阅读英文文档的能力，例如 MDN 的文档阅读无障碍。

具备以下优先:
1.有 Hybrid / React Native等跨平台开发经验优先;
2.有个人开源项目或参与过开源项目的维护、个人技术博客等;
3.在浏览器内核、工程化、性能优化、模块化、自动化测试中的某一方面有深入研究;
4.爱折腾，喜欢研究和尝试各种新技术，喜欢使用工具解决问题。岗位亮点:
聚焦美团“Food +Platform”的战略，做公司旗舰业务泛前端开发、架构工作。参与美团前端基础设施建设，具备行业前沿的技术先进性。

## 自我介绍

我是谁 + 学习经历 + 工作经历 + 项目经历 + 成绩成就 + 胜任理由 = 自我介绍

面试官你好，我叫 xx，从 xx 毕业，专业是 xx...，因xxx 和前端结缘。

第一家公司技术 100 多人，在这家公司主要 红酒商城系统、旅游系统、企业应用、政务系统等，主要用到xxx技术，前端 6 人，前期主要承担主力开发人员，后期一些项目的主要负责人，同时开始带人开发。获得 2017 年团队最佳员工奖。

第二家公司技术 300 多人，APP 端内嵌的 h5 项目，小程序，客服系统、大数据系统、冬奥会系统、车联网系统等十几个项目，主要用到 xxx 技术，前端 20 人，前期主要承担主力开发人员，后期开始带小伙伴一起做项目。

第三家公司部门100个人，主要做日志中心、mlops、低代码问卷平台、运维平台、其他数据平台等，主要用到 xxx 技术。前期带几个外包一起开发，后期主力开发人员。年度团队协作奖

总得来说，这几年做的各类项目比较多，同时也注重工程化建设，提高开发效率等，喜欢做团队中难度高的项目，后期也开始关注业务，关注用户体验，优化项目。

最新关注：StyleX、量子吸引、vite rust

## 项目

1. 微前端
    - 背景 多项目合一，登录，公共模块，技术栈（公共模块升级和管理、技术栈差异、用户体验差）
    - 调研 iframe、single-spa、qiankun
    - 问题 子应用资源访问全部通过主应用进行，主应用通过 activeRule 识别子应用，通过 fetch 的方式请求子应用对应的 html 文件，从而激活子应用，所以主应用的 main.js 等资源需要放到域名根目录下
    - 问题 主应用未触发 fetch 的动作，也就不会去获取子应用的资源 由于路由配置规范不统一，子应用路由被网关的配置拦截
    - 在一般的情况下，用 qiankun 的数据传递方式就可以，但是对于复杂数据，或者在自定义导航的情况下，qiankun 数据传递就会由于网速等原因在某些地方监听不到数据
    - 问题 main.js 要放到域名根目录下、前端资源部署到OSS，前端访问不再走网关、依赖循环、联调问题、html缓存问题
    - 结果 多合一、共享公共能力
    - 原理 qiankun（single-spa + sandbox + import-html-entry）、Shadow DOM、Proxy
2. 埋点
   - 背景 其他部门的方案不合适、特殊参数上传、耗时埋点等
   - 技术 gif（跨域、远离dom，不阻塞、体积小，节约流量）
   - 成果 7个 项目接入
3. 站内信
   - 背景
   - 设计
4. 图表大盘
   - 背景 核心功能、体验
   - 技术 排序、布局、拖拉拽、主题、全屏、暗黑、水印
   - 难点 加载、排序、新建
5. 智能检索
   - 背景 kibana es7 kql 查询
   - 难点 语法分析、大小写转换、前置修改、键盘操作
6. 工程规范、项目模板
   - eslint、git commit、分支规范、code review、模板、脚手架、工具库
7. 低代码
   - 背景 内部没有、外部暴漏公司用户信息、文档无法当 url 用
   - 技术 Function(`"use strict";const formData = ${JSON.stringify(formData)};return (${string})`)()
   - 技术 动态关联
   - 成果 生成 url、10 分钟/人、4 期 7 个产品
8. 性能优化
   - 加载指标：秒开率
   - 稳定性指标：资源错误,JS报错,Crash,内存堆栈,接口报错等
   - 操作体验指标：响应延迟，卡顿，滚动流畅性，TTI（可交互时间） FID(用户首次和页面交互到页面响应交互的时间)
   - 加载链路的优化：从访问url到页面呈现，整个加载渲染链路可以做优化的思路
   - CRP 关键渲染路径
   - 减少请求数量、减少请求体积、加载顺序、资源合并压缩、GZIP
   - 缓存（Service Worke、HttpCache）
   - DNS 解析
   - 图片处理优化（选择合适的图片、压缩、svg、base64、异步加载）
   - url-》页面
     - url 解析
     - 缓存（强缓存 Expires / Cache-Control、协商缓存 Last-Modified / ETag、数据缓存）
     - DNS解析（20~120毫秒、dns-prefetch、CDN 加速）
     - TCP三次握手（SYN、AYN+ACK、ACK）
     - 数据传输
     - TCP四次挥手（FIN、ACK、ACK+FIN、ACK）
     - 页面渲染（async、defer）
   - vue
     - 路由懒加载
     - 按需引入
     - KeepAlive

## 小程序

- 微信客户端（渲染层webview、逻辑层jsCore、Native）
- 相比h5：运行环境内置解析器、更多系统权限、渲染机制（逻辑、渲染分开）
- 随用随搜，用完即走
- 微信流量入口
- 安全
- 开发门槛低
- 降低兼容性限制
- 缺点: 用户留存、体积受限（2M）、受控微信
- 优化: 压缩代码、及时清理无用代码和文件、图片等 cdn、分包加载、onLoad加载请求、减少https、缓存、骨架屏、合并setData）

## 混合开发

## JavaScript

## Vue

- Vue里 template 到 render 经过哪些步骤
  - 解析模板（Parsing Template） ——》AST
  - 静态分析（Static Analysis）静态节点、动态节点
  - 生成渲染函数（Generate Render Function）
  - 创建虚拟DOM（Create Virtual DOM）
  - 更新虚拟DOM（Update Virtual DOM）
  - 实际DOM操作（Actual DOM Manipulation）
- Object.defineProperty 有哪些缺陷，Vue3 为什么要用 proxy 重构
  - 不能监听数组的变化 重写数组方法
  - 不能监听对象属性新增和删除
  - 深层监听困难
  - 初始化阶段递归执行 Object.defineProperty 带来的性能负担

## ES6

- let、const
- 解构
- Set、WeakSet、Map、WeakMap
  - WeakSet 结构与 Set 类似，也是不重复的值的集合。WeakSet 的成员只能是对象和 Symbol 值
  - WeakSet 中的对象都是弱引用
- Proxy

```js
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
      console.log(`getting ${propKey}!`);
      return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
      console.log(`setting ${propKey}!`);
      return Reflect.set(target, propKey, value, receiver);
  }
});
```

## RN、Hybrid

## React

## 前端工程化

## webpack

## vite

- esbuild（10～100 倍）（go 直接转机器码、go 多线程共享内存、多核 cpu、零造轮子、复用 ast 节点）
- rollup
- webpack

## 浏览器内核

## 工程化、模块化

- 工具化：以针对各自业务场景开发脚手架为主，内置常用的前端组件库，提供代码格式检查、埋点及监控等插件，提升项目初始化的效率。
- 规范化：面向完成需求的整个研发流程，梳理需求管理、视觉交互设计、评审、开发、联调、测试验收、上线部署和质量监控等相关的规范，进一步建设工具来约束研发过程中的不确定性。
- 平台化：将支撑研发的有关工具和系统聚合起来，通过套件和插件的设计模式，实现对不同场景的支撑，支持在线初始化项目，横向打通研发的整体链路。
- 体系化：紧跟前沿技术，集成低代码、在线IDE、代码智能生成或推荐等能力，建设需求、设计、研发、运营一体化的云开发平台。