# React

## 1. React18 新特性

### 18 不在支持 IE

### 批处理

18 之前，批处理`只限于 React 原生事件内部`的更新。

18 中，批处理支持处理的操作范围扩大了：`Promise，setTimout，native event handler` 等这些非 React 原生事件。

### Transitions

- `starTransition`：用于标记非紧急的更新，用 starTransition 包裹起来就是告诉 React，这部分代码渲染的优先级不高，可以优先处理其它更重要的渲染。

- `useTransition`：除了能提供 startTransition 以外，还能提供一个变量来跟踪当前渲染的执行状态。

### Suspense

### ReactDom.createRoot

### ReactDom.hydrateRoot

### New Hooks

- `useTransition`：用来标记低优先的 state 更新
- `useDeferredValue`：可以用来标记低优先的变量

### 架构演进

- React 15 主要分为 `Reconciler 协调器` 和 `Renderer 渲染器` 两部分：
  - Reconciler 负责生成虚拟 DOM 并进行 diff，找出变动的虚拟 DOM，
  - 然后 Renderer 负责将变化的组件渲染到不同的宿主环境中。

- React 16 多了一层 `Scheduler 调度器`，并且 `Reconciler 协调器` 的部分基于 `Fiber` 完成了重构。

- React 17 是一个用以稳定 `concurrent mode 并行模式` 的过渡版本，另外，它使用 `Lanes` 重构了优先级算法。
  - Lane 用二进制位表示任务的优先级，方便优先级的计算（位运算），不同优先级占用不同位置的“赛道”，而且存在批的概念，优先级越低，“赛道”越多。高优先级打断低优先级，新建的任务需要赋予什么优先级等问题都是 Lane 所要解决的问题。

### 流程

整个 `Reconciliation` 的流程可以简单地分为两个阶段：

- `Render 阶段`：当 React 需要进行 re-render 时，会遍历 Fiber 树的节点，根据 diff 算法将变化应用到 `workInProgress` 树上，这个阶段是随时可中断的。
- `Commit 阶段`：当 `workInProgress` 树构建完成之后，将其作为 `Current` 树，并把 DOM 变动绘制到页面上，这个阶段是不可中断的，必须一气呵成，类似操作系统中「原语」的概念。

- workInProgress tree 代表当前正在执行更新的 Fiber 树
- currentFiber tree 表示上次渲染构建的 Filber 树

### Scheduler

对于大部分浏览器来说，`每 1s 会有 60 帧`，所以每一帧差不多是 `16.6 ms`，如果 Reconciliation 的 Render 阶段的更新时间过长，挤占了主线程其它任务的执行时间，就会导致页面卡顿。

**思路：**
- 将 re-render 时的 JS 计算拆分成更小粒度的任务，可以随时暂停、继续和丢弃执行的任务。
- 当 JS 计算的时间达到 16 毫秒之后使其暂停，把主线程让给 UI 绘制，防止出现渲染掉帧的问题。
- 在浏览器空闲的时候继续执行之前没执行完的小任务。

React 给出的解决方案是将整次 Render 阶段的长任务拆分成多个小任务：
- 每个任务执行的时间控制在 5ms。
- 把每一帧 5ms 内未执行的任务分配到后面的帧中。
- 给任务划分优先级，同时进行时优先执行高优任务。

**如何把每个任务执行的时间控制在 5ms？**

Scheduler 提供的 `shouldYield` 方法在 源码 中叫 `shouldYieldToHost`，它通过综合判断已消耗的时间（是否超过 5ms）、是否有用户输入等高优事件来决定是否需要中断遍历，给浏览器渲染和处理其它任务的时间，防止页面卡顿。

**如何把每一帧 5ms 内未执行的任务分配到后面的帧中？**

时间切片

如果任务的执行因为超过了 5ms 等被中断了，那么 React Scheduler 会借助一种`效果接近于 setTimeout` 的方式来开启一个宏任务，预定下一次的更新。

React 是在借助 `MessageChannel 模拟 setTimeout` 的行为，将未完成的任务以宏任务的形式发放给浏览器，被动地让浏览器自行安排执行时间。

而 requestIdleCallback 是主动从浏览器处获取空闲信息并执行任务，个人感觉不太像是一种对 requestIdleCallback 的 polyfill。

**如何给任务划分优先级？**

基于 `Lanes` 的优先级控制。

不同的 Lanes 可以简单理解为不同的数值，数值越小，表明优先级越高。比如：
- 用户事件比较紧急，那么可以对应比较高的优先级如 SyncLane；
- UI 界面过渡的更新不那么紧急，可以对应比较低的优先级如 TransitionLane；
- 网络加载的更新也不那么紧急，可以对应低优先级 RetryLane。

## 2. 对 React Hook 的闭包陷阱的理解？

**为什么不能将hooks写到if else语句中了把？**

因为这样可能会导致顺序错乱，导致当前 hooks 拿到的不是自己对应的 Hook 对象。

## 3. 让 useEffect 支持 async/await ?

- 创建一个异步函数（async...await 的方式），然后执行该函数。

```js
useEffect(() => {
  const asyncFun = async () => {
    setPass(await mockCheck());
  };
  asyncFun();
}, []);
```

- 也可以使用 IIFE，如下所示：

```js
useEffect(() => {
  (async () => {
    setPass(await mockCheck());
  })();
}, []);
```

- ahooks useAsyncEffect

```js
function useAsyncEffect(
    effect: (isCanceled: () => boolean) => Promise<void>, 
    dependencies?: any[]
  ) {
    return useEffect(() => {
      let canceled = false;
      effect(() => canceled);

      return () => { 
        canceled = true; 
      }
    }, dependencies)
  }
```

## 4. React 性能优化

### 减少计算量

- 减少渲染的节点/降低渲染计算量(复杂度)
- 不要在渲染函数都进行不必要的计算
  - 比如不要在渲染函数(render)中进行数组排序、数据转换、订阅事件、创建事件处理器等等. 
- 减少不必要的嵌套
- 虚拟列表
- 惰性渲染
- CSS > 大部分 CSS-in-js > inline style

### 利用缓存

- 避免重新渲染
  - shouldComponentUpdate
  - React.memo
- 简化的 props 更容易理解, 且可以提高组件缓存的命中率
- 不变的事件处理器
  - useCallback
- 不可变数据
  - Immutable.js、Immer、immutability-helper 以及 seamless-immutable。
- 简化 state

### 精确重新计算的范围

- 响应式数据的精细化渲染
- 不要滥用 Context
  - 一旦 Context 的 Value 变动，所有依赖该 Context 的组件会全部 forceUpdate.

## 5. 为什么 useState 返回的是数组而不是对象？

因为解构赋值的原因：
- 返回数组，可以对数组中的变量命名，代码看起来也比较干净。
- 返回对象，那就必须和返回的值同名，不能重复使用了。

## 6. React 懒加载的实现原理？

### React.lazy

React 16.6 之后，React 提供了 `React.lazy` 方法来支持组件的懒加载。配合 webpack 的 code-splitting 特性，可以实现按需加载。

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

如上代码中，通过 `import()、React.lazy 和 Suspense` 共同一起实现了 React 的懒加载，也就是我们常说了运行时动态加载，即 OtherComponent 组件文件被拆分打包为一个新的包（bundle）文件，并且只会在 OtherComponent 组件渲染时，才会被下载到本地。

>React.lazy 需要配合 Suspense 组件一起使用，在 Suspense 组件中渲染 React.lazy 异步加载的组件。如果单独使用 React.lazy，React 会给出错误提示。

### Webpack 动态加载

`import() 函数`是由 TS39 提出的一种动态加载模块的规范实现，其返回是一个 `promise`。

webpack 检测到这种`import() 函数`语法会自动代码分割。使用这种动态导入语法代替以前的静态引入，可以让组件在渲染的时候，再去加载组件对应的资源，

webpack 通过`创建 script 标签`来实现动态加载的，找出依赖对应的 `chunk` 信息，然后生成 script 标签来动态加载 chunk，每个 chunk 都有对应的状态：`未加载、加载中、已加载`。

### Suspense 组件

Suspense 内部主要通过捕获组件的状态去判断如何加载，React.lazy 创建的动态加载组件具有 `Pending、Resolved、Rejected` 三种状态，当这个组件的状态为 Pending 时显示的是 Suspense 中 fallback 的内容，只有状态变为 resolve 后才显示组件。

## 7. React VS Vue

- 组件化方式不同
  - React 组件包含状态和行为，所有组件共享一个状态树
  - Vue 每个组件都有自己的状态和行为，并且可以很容易将数据和行为绑定在一起
- 数据驱动方式不同
  - React 单项数据流
  - Vue 双向数据绑定
- 模板语法不同
  - React 模板语法是 JSX
  - Vue 模板语法是 Template、js、css，支持指令
- 生命周期不同
  - React 生命周期：初始化、更新、卸载
  - Vue 生命周期：创建、挂载、更新、销毁
- 状态管理方式不同
  - React 状态管理：Redux、Mobx、zustand
  - Vue 状态管理：Vuex、Pinia
- 性能优化方式不同
  - React 性能优化：React.memo、shouldComponentUpdate
  - Vue 性能优化：keep-alive、v-if

## 8. React 组件通信

### 父组件调子组件

- 如果是类组件，可以在子组件类中定义一个方法，并将其挂载到实例上
- 如果是类组件，可以使用 `createRef 创建一个 ref 对象`，并将其传递给子组件的 ref prop
- 如果是函数式组件，可以使用 `useImperativeHandle` Hook 将指定的方法暴露给父组件
- 如果是函数式组件，可以使用 `useRef` 创建一个 ref 对象，并将其传递给子组件的 ref prop

## 9. React 中，Element、Component、Node、Instance 是四个重要的概念。

- `Element`：Element 是 React 应用中最基本的构建块，它是一个普通的 JavaScript 对象，用来描述 UI 的一部分。Element 可以是原生的 DOM 元素，也可以是自定义的组件。它的作用是用来向 React 描述开发者想在页面上 render 什么内容。Element 是不可变的，一旦创建就不能被修改。

- `Component`：Component 是 React 中的一个概念，它是由 Element 构成的，可以是函数组件或者类组件。Component 可以接收输入的数据（props），并返回一个描述 UI 的 Element。Component 可以被复用，可以在应用中多次使用。分为 Class Component 以及 Function Component。

- `Node`：Node 是指 React 应用中的一个虚拟节点，它是 Element 的实例。Node 包含了 Element 的所有信息，包括类型、属性、子节点等。Node 是 React 内部用来描述 UI 的一种数据结构，它可以被渲染成真实的 DOM 元素。

- `Instance`：Instance 是指 React 应用中的一个组件实例，它是 Component 的实例。每个 Component 在应用中都会有一个对应的 Instance，它包含了 Component 的所有状态和方法。Instance 可以被用来操作组件的状态，以及处理用户的交互事件等。

## 10. Redux

核心描述：
- `单一数据源`：整个应用的全局 state 被存储在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
- `State 是只读的`：唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事情的普通对象。
- `使用纯函数来执行修改`：为了描述 action 如何改变 state tree，你需要编写纯的 reducers。

## 11. React Hooks 实现生命周期？

### 相对于传统class， Hooks 有哪些优势?

- State Hook 使得组件内的状态的设置和更新相对独立，这样便于对这些状态单独测试并复用。
- Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分，这样使得各个逻辑相对独立和清晰。

｜生命周期方法 | Hooks 组件 |
| --- | --- |
| constructor | useState |
| getDerivedStateFromProps | useEffect 手动对比 props， 配合 useState 里面 update 函数 |
| shouldComponentUpdate | React.memo |
| render | 函数本身 |
| componentDidMount | useEffect 第二个参数为[] |
| componentDidUpdate | useEffect 配合useRef |
| componentWillUnmount | useEffect 里面返回的函数 |
| componentDidCatch | 无 |
| getDerivedStateFromError | 无 |

```js
import React, { useState, useEffect, useRef, memo } from 'react';

// 使用 React.memo 实现类似 shouldComponentUpdate 的优化， 
// React.memo 只对 props 进行浅比较
const UseEffectExample = memo((props) => {
    console.log("===== UseStateExample render=======");
    // 声明一个叫 “count” 的 state 变量。
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [fatherCount, setFatherCount] = useState(props.fatherCount)

    console.log(props);

    // 模拟 getDerivedStateFromProps
    useEffect(() => {
        // props.fatherCount 有更新，才执行对应的修改，没有更新执行另外的逻辑
        if(props.fatherCount == fatherCount ){
            console.log("======= 模拟 getDerivedStateFromProps=======");
            console.log(props.fatherCount, fatherCount);
        }else{
            setFatherCount(props.fatherCount);
            console.log(props.fatherCount, fatherCount);
        }
    })

    // 模拟 componentDidMount
    useEffect(() => {
        console.log("=======只渲染一次(相当于DidMount)=======");
        console.log(count);
    }, [])

    // 模拟 componentDidUpdate
    const mounted = useRef();
    useEffect(() => {
        console.log(mounted);
        if (!mounted.current) {
            mounted.current = true;
          } else {
            console.log("======count 改变时才执行(相当于DidUpdate)=========");
            console.log(count);
          }
    }, [count])

    // 模拟 componentDidMount 和 componentDidUpdate、componentWillUnmount
    useEffect(() => {
        // 在 componentDidMount，以及 count 更改时 componentDidUpdate 执行的内容
        console.log("======初始化、或者 count 改变时才执行(相当于Didmount和DidUpdate)=========");
        console.log(count);
        return () => {
            console.log("====unmount=======");
            console.log(count);
        }
    }, [count])

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>

            <button onClick={() => setCount2(count2 + 1)}>
                Click me2
            </button>
        </div>
    );
});

export default UseEffectExample;
```

**注意事项：**

- `useState` 只在初始化时执行一次，后面不再执行；

- `useEffect` 相当于是 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合，可以通过传参及其他逻辑，分别模拟这三个生命周期函数；

- `useEffect` 第二个参数是一个数组，
  - 如果数组为空时，则只执行一次（相当于 componentDidMount）；
  - 如果数组中有值时，则该值更新时，useEffect 中的函数才会执行；
  - 如果没有第二个参数，则每次 render 时，useEffect 中的函数都会执行；

- React 保证了每次运行 effect 的同时，DOM 都已经更新完毕，也就是说 effect 中的获取的 state 是最新的，但是需要注意的是，effect 中返回的函数（其清除函数）中，获取到的 state 是更新前的。

- 传递给 useEffect 的函数在每次渲染中都会有所不同，这是刻意为之的。事实上这正是我们可以在 effect 中获取最新的 count 的值，而不用担心其过期的原因。每次我们重新渲染，都会生成新的 effect，替换掉之前的。某种意义上讲，effect 更像是渲染结果的一部分 —— 每个 effect “属于”一次特定的渲染。

- effect 的清除阶段（返回函数）在每次重新渲染时都会执行，而不是只在卸载组件的时候执行一次。它会在调用一个新的 effect 之前对前一个 effect 进行清理，从而避免了我们手动去处理一些逻辑。

## 12. React.memo() 和 useMemo()

`React.memo()` 随 React v16.6 一起发布。 

虽然类组件已经允许您使用 `PureComponent` 或 `shouldComponentUpdate` 来控制重新渲染，但 React 16.6 引入了对函数组件执行相同操作的能力。

React.memo() 是一个`高阶组件 (HOC)`，它接收一个组件 A 作为参数并返回一个组件 B，如果组件 B 的 props（或其中的值）没有改变，则组件 B 会阻止组件 A 重新渲染 。

useMemo() 是一个 React Hook。 
- 可以依赖 useMemo() 作为性能优化，而不是语义保证
- 函数内部引用的每个值也应该出现在依赖项数组中

### React.memo() 和 useMemo() 之间的主要区别：

- React.memo() 是一个高阶组件，可以使用它来包装不想重新渲染的组件，除非其中的 props 发生变化
- useMemo() 是一个 React Hook，可以使用它在组件中包装函数。 可以使用它来确保该函数中的值仅在其依赖项之一发生变化时才重新计算。

虽然 memoization 似乎是一个可以随处使用的巧妙小技巧，但只有在绝对需要这些性能提升时才应该使用它。 Memoization 会占用运行它的机器上的内存空间，因此可能会导致意想不到的效果。

## 13. 实现 useTimeout hook

useTimeout 是可以在函数式组件中，处理 setTimeout 计时器函数

```js
// callback 回调函数， delay 延迟时间
function useTimeout(callback, delay) {
  const memorizeCallback = useRef();

  useEffect(() => {
    memorizeCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const timer = setTimeout(() => {
        memorizeCallback.current();
      }, delay);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [delay]);
};
```

## 14. 对 useReducer 的理解


