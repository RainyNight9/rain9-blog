# 输出题

https://juejin.cn/post/6959043611161952269

## 1. window、obj、person1、person2

```js
var name = 'window'

function Person(name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}

var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()()   // window
person1.obj.foo1.call(person2)() // window
person1.obj.foo1().call(person2) // person2

person1.obj.foo2()() // obj
person1.obj.foo2.call(person2)() // person2
person1.obj.foo2().call(person2) // obj
```

## 2. promise

```js
const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
    throw new Error('error')
    reject('error');
})
promise.then(() => {
    console.log(3);
}).catch(e => console.log(e))


console.log(4);

// 1243
```

## 3. 

```js
var id = 'GLOBAL';
var obj = {
  id: 'OBJ',
  a: function(){
    console.log(this.id);
  },
  b: () => {
    console.log(this.id);
  }
};
obj.a(); // OBJ
obj.b(); // GLOBAL
new obj.a(); // undefined
new obj.b(); // error
```

## 4

```ts
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)

// 1
// Promise {<fulfilled>: undefined}
```

- 输出 1：因为前面两个 then 穿透，最后打印最初的 1
- 输出 Promise {<fulfilled>: undefined}：因为最后一个 then 没有 return，隐式返回 undefined，控制台打印整个链条的返回值

## 5

```ts
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})
console.log('promise1', promise1)
console.log('promise2', promise2)
setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)

// promise1 Promise {<pending>}
// promise2 Promise {<pending>}
// 680
// promise1 Promise {<fulfilled>: 'success'}
// promise2 Promise {<rejected>: Error: error!!!}
```

- 刚开始：两个都是 pending
- 1 秒后：promise1 成功，promise2 因抛错变成失败
- 2 秒后打印最终状态

## 6.

```ts
const promise = Promise.resolve().then(() => {
  return promise;
})
promise.catch(console.err)

// Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
```

- 结果：抛出 TypeError: Chaining cycle detected for promise
- 原因：.then() 里 return 了当前 Promise 自己，形成循环引用
- 规则：Promise A+ 规范禁止这种循环，直接报错

## 6.

```ts
function runAsync (x) {
  const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
  return p
}
function runReject (x) {
  const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x))
  return p
}
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
       .then(res => console.log(res))
       .catch(err => console.log(err))


// 1s后输出
1
3
// 2s后输出
2
Error: 2
// 4s后输出
4
```

- 谁定时器快，谁先打印
- 谁先 reject，谁就让 Promise.all 直接进 catch
- 已经排队的定时器，到点一定执行打印，拦不住