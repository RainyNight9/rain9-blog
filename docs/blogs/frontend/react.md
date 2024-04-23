# React

## 资料

1. `React 英文`官方文档：https://react.dev/
2. `React 中文`官方稳定：https://zh-hans.react.dev/
3. `Redux` 英文官方文档：https://redux.js.org/
4. `React Router` 英文官方文档：https://reactrouter.com/en/main
5. `UmiJS` 文档：https://umijs.org/
6. `Ant Design` 文档：https://ant-design.antgroup.com/index-cn
7. `React 知识图谱`：https://www.processon.com/view/link/617d4f9f7d9c0850adca0be0
8. `React 哲学`：https://zh-hans.react.dev/learn/thinking-in-react
9. `React 源码`：https://github.com/facebook/react

## React 内容

文档：https://zh-hans.react.dev/learn/describing-the-ui

###  JSX

https://zh-hans.react.dev/learn/writing-markup-with-jsx

### props

https://zh-hans.react.dev/learn/passing-props-to-a-component

### 类组件（不推荐）

虽然不推荐使用了，但是之前旧版本很多代码可能需要维护。

类组件：https://zh-hans.legacy.reactjs.org/docs/react-component.html

生命周期：https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

### 函数组件

https://zh-hans.react.dev/reference/react/hooks

## React 18 新特性

### Concurrent

`Concurrent` 最主要的特点就是`渲染是可中断的`。

没错，以前是不可中断的，也就是说，以前 React 中的 update 是同步渲染，在这种情况下，一旦 update 开启，在任务完成前，都不可中断。

>注意：这里说的同步，和setState所谓的同步异步不是一码事，而且setState所谓的异步本质上是个批量处理。

在 `Concurrent` 模式下，`update 开始了也可以中断`，晚点再继续嘛，当然`中间也可能被遗弃掉`。

Concurrent 并不是 API 之类的新特性，但是呢，它很重要，因为它是 React18 大部分新特性的实现基础，包括 `Suspense、transitions、流式服务端渲染`等。

#### 可中断

对于复杂项目来说，任务`可中断`这件事情很重要。那么问题来了，React 是如何做到的呢，其实基础还是 fiber，fiber 本身链表结构，就是指针嘛，想指向别的地方加个属性值就行了。

#### 被遗弃

在 Concurrent 模式下，有些 update 可能会`被遗弃掉`。

#### 状态复用

Concurrent 模式下，还`支持状态的复用`。React 正在用 `Offscreen` 组件来实现这个功能。

使用 OffScreen，除了可以复用原先的状态，我们也可以使用它来当做新 UI 的缓存准备，就是虽然新 UI 还没登场，但是可以先在后台准备着嘛，这样一旦轮到它，就可以立马快速地渲染出来。


