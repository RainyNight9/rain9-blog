# 前端常见状态管理方案盘点：Redux、MobX、Zustand、Pinia 到底有什么区别？

“要不要上状态管理？”这事儿，其实在项目立项阶段就能做出判断。

判断标准其实很简单：看看这轮版本的功能边界和数据形态。
- 如果只是少量页面、状态主要是局部 UI（弹窗/表单/交互），那就用 `useState` + 适度的 Context；
- 如果明确会出现“跨页面共享、跨模块联动、权限与路由耦合、复杂表单流转”等需求，那就把状态管理列为工程能力的一部分，提前设计好 store 结构和规范。

状态管理工具的价值，往往就在这两件事之间做平衡：

- 让“共享数据”别靠层层传参
- 让“数据变化”别变得不可追踪

---

## 先把“状态”分清楚：你到底在管什么？

很多团队一上来就讨论 Redux 还是 Zustand，其实第一步应该是：把状态分门别类。

常见状态大概就这几种：

- 本地 UI 状态：弹窗开关、表单输入、hover 之类，通常 `useState` 就够了
- 跨组件共享的客户端状态：用户信息、主题色、权限、购物车这类“多个页面都要用”的
- 服务端状态：列表数据、详情数据、搜索结果，本质是“远端缓存 + 同步策略”
- URL 状态：分页、筛选条件、排序方式，适合放在 query 里，能分享/可回放

真正容易出事的是第二类和第三类：

- 第二类：共享状态多了，传参传疯，或者全局变量到处写
- 第三类：请求、缓存、刷新、并发、过期、回滚……靠手写很容易乱

所以你会看到一个趋势：
- 很多项目把“服务端状态”交给 TanStack Query（以前叫 React Query），
- 把“客户端共享状态”交给 Redux/Zustand/MobX/Pinia 这类 store。

---

## React Context：它更像“注入”，不是“状态管理”

Context 经常被当成“最基础的状态管理”，但更准确的说法是：它是 React 内置的依赖注入通道。

你用它可以把 `theme`、`i18n`、`auth` 这类“全局配置”往下发，不用层层传 props。

```jsx
const UserContext = React.createContext(null)

function App() {
  return (
    <UserContext.Provider value={{ name: "Rain" }}>
      <Page />
    </UserContext.Provider>
  )
}
```

它的坑也很经典：Provider 的 `value` 一变化，消费这个 Context 的组件会触发渲染。状态一多、更新一频繁，就会变成“一个小字段变了，半个页面都在重渲”。

适用场景：

- 配置类、低频更新的共享数据：主题、语言包、权限上下文、路由对象等
- 你希望减少依赖，而不是引入完整的状态管理库

不太适用：

- 高频更新的状态（比如输入框、拖拽、实时数据）
- 大规模业务状态堆在一个 Context 里（会又慢又难维护）

底层原理一句话版：Context 变更会沿着 Fiber 树通知订阅者，订阅者重新渲染；它没有“选择性订阅”的能力（除非你自己拆 Context 或引入 selector 方案）。

---

## Redux：用“规则”换“可控”，适合做大工程的秩序

Redux 常被一句话概括：单向数据流。但更有用的理解是：它用一套严格的规则，让状态变化变得可预测、可回放、可审计。

最核心的约束有两个：

- 你不能随便改 state（要通过 action）
- reducer 必须是纯函数（同样输入得到同样输出）

你可以把它想象成一条流水线：

```
UI -> dispatch(action)
↓
reducer(prevState, action) -> nextState
↓
store 通知订阅者更新
```

### 底层原理（工程视角）

Redux 的 store 本质上就是三件事：

- 保存一个 state
- 提供 `dispatch` 来触发更新
- 维护一个订阅列表，state 变了就通知

配合 React 使用时，现代的 `react-redux` 是基于 `useSyncExternalStore` 做订阅，订阅粒度通过 selector 控制，能尽量避免无意义渲染。

### 优点（它为什么能活这么久）

- 可预测：所有变化都走 action/reducer，逻辑集中
- 可追踪：时间旅行调试、日志中间件、回放动作链
- 生态成熟：中间件、持久化、SSR、调试工具，一整套
- 适合多人协作：规则明确，代码 review 时也好对齐

### 缺点（它为什么让人烦）

- 样板代码多（尤其是“老 Redux”时代）
- 学习成本偏高：immutability、reducer 纯函数、middleware 这些概念要统一
- 过度使用会僵化：小项目硬上 Redux，反而拖慢节奏

### 使用建议

- 大型项目、多人协作、复杂业务流程（权限、审批、复杂表单、跨页面联动）偏适合
- 上 Redux 就尽量上 Redux Toolkit（RTK），别回到写 action types 的年代
- 服务端状态不要硬塞 Redux：列表缓存、刷新、并发，用 TanStack Query 这类更顺手

---

## MobX：把“状态”变成“响应式对象”，写起来爽，但要控制边界

MobX 的哲学跟 Redux 完全不一样。Redux 是“我规定你必须怎么改”，MobX 是“你怎么改都行，我会自动把依赖更新掉”。

它的核心是响应式三件套：

- observable：让数据变成可观察
- derivation/computed：派生值，自动缓存
- reaction/autorun：当依赖变化时触发更新

直觉上，它更像 Vue 的响应式体系，或者你熟悉的“依赖收集 + 变更通知”。

```js
import { makeAutoObservable } from "mobx"

class Store {
  count = 0

  constructor() {
    makeAutoObservable(this)
  }

  increment() {
    this.count++
  }
}
```

### 底层原理（讲清楚很加分）

MobX 会在读取 observable 属性时做依赖收集：谁读了这个值，就把谁记下来。等这个值变化时，通知这些依赖重新执行（组件重新渲染、computed 重新计算等）。

### 优点

- 写法接近“普通 JS”，上手快
- UI 自动响应：你改了值，视图就跟着变
- computed 很好用：派生状态缓存、避免手写 memo

### 缺点（大项目容易踩）

- 可控性弱：谁在什么时候改了 state，不像 Redux 那么“全都记录在 action 里”
- 追踪成本高：状态变复杂时，定位“这次渲染为什么发生”会比较费劲
- 团队规范要求高：需要明确哪些地方可以改、哪些地方必须通过 action（即使 MobX 不强制）

### 使用场景

- 中小团队、快速迭代、业务形态偏“数据驱动 UI”且变化频繁
- 对开发体验要求高，团队对响应式/依赖追踪比较熟

不太建议：

- 大团队多人协作、强审计强可回放的业务（容易把状态搞成“谁都能改”）

---

## Zustand：用最小的 API 做一个“可订阅的 store”，轻、快、够用

Zustand 最近几年在 React 圈很火，原因很简单：它把状态管理做成了一个很小、很“像 hooks 的东西”。

你可以把它理解为：

- 一个 store（对象）
- 一个 `set`（更新）
- 一个订阅机制（selector 控制渲染）

```js
import { create } from "zustand"

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
```

组件里用 selector 取值：

```js
const count = useStore((state) => state.count)
```

### 底层原理（为什么它性能看起来不错）

Zustand 的核心是“订阅外部 store”，组件只订阅自己关心的那一段 state。你用 selector 取 `count`，只要 `count` 不变，这个组件就不会因为 store 里别的字段变化而重渲。

这套机制在 React 18 之后，通常也是围绕 `useSyncExternalStore` 这类能力来保证一致性。

### 优点

- API 极简，几乎没有样板代码
- selector 天然鼓励“按需订阅”，不容易一改全改
- 适合做“客户端共享状态”：登录态、主题、面包屑、全局弹窗、权限等

### 缺点（不是它不好，是要知道边界）

- 约束弱：大型团队如果没有规范，很容易 store 变成大杂烩
- 业务流程复杂时，缺少 Redux 那种“动作链可回放”的治理能力
- 依然不适合管理服务端状态（缓存/过期/并发那套它不专门解决）

### 使用场景

- 中型 React 项目：想要全局状态，但不想被 Redux 的“规矩”束缚
- 你更重视开发效率 + 性能，且愿意自己制定 store 结构规范

---

## Pinia：Vue 生态的“顺手工具”，核心是吃透 Vue 响应式

Vue 这边主流就是 Pinia。你可以把它理解为：把 Vue 3 的响应式（reactive/ref/computed）系统拿来做 store，并且加上模块化、devtools、TS 友好这些工程化能力。

```js
export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++
    },
  },
})
```

### 底层原理

Pinia 的 store 是响应式对象，组件使用时会建立依赖关系；当 store 字段变化，依赖它的组件会更新。整体依赖 Vue 的响应式追踪和调度机制。

### 优点

- API 简洁、模块化清晰
- TS 体验好（类型推导更自然）
- 和 Vue DevTools 集成成熟

### 使用场景

- Vue 项目里基本是默认选项
- 需要模块化 store、团队协作、可维护性时比手写 reactive 更稳

---

## 选型：别按“项目大小”拍脑袋，按“问题类型”来选

你可以用下面这套问题来快速定位：

### 1）你要管的是“服务端状态”吗？

如果是：优先 TanStack Query（React）/ Vue Query（Vue）一类。它解决的是缓存、并发、过期、重试、回滚、预取、分页这些“请求工程问题”。

### 2）你要管的是“客户端共享状态”吗？

- 想要“规矩”和“可回放”：Redux（建议 RTK）
- 想要“简单直接、订阅粒度好”：Zustand
- 想要“响应式 + 极佳开发体验”：MobX（但要管住边界）
- Vue 项目：Pinia

### 3）你只是想“少传点 props”吗？

Context/Provide 够用。别为了省传参引入一个大型状态系统。

---

## 一些容易误用的点（写给实践党）

- 别把所有东西都叫“全局状态”。能放组件里就放组件里，能放 URL 就放 URL。
- 别用 Redux/Zustand 去缓存列表数据再手写刷新逻辑。请求缓存这事儿专业库更强。
- Context 不是不能用，只是要拆分：一个巨大 Context Provider 往往是性能灾难的起点。
- MobX 很香，但要有团队共识：哪些地方允许直接改，哪些必须封装 action，怎么做可追踪。

---

## 总结

状态管理工具不是“越新越好”，也不是“越重越稳”。它们只是用不同方式帮你解决同一个问题：共享数据如何变得可控。

- Redux：规则明确，适合大工程的秩序
- MobX：响应式驱动，写起来爽，但要控边界
- Zustand：轻量够用，适合大多数客户端共享状态
- Pinia：Vue 生态的最佳实践，顺手且稳定
- TanStack Query：别忘了它，很多时候你要管的其实是“服务端状态”
