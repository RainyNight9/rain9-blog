# JS 手写题

## 1. 手写 Object.create

```js
function create(obj){
  function F(){}
  F.prototype = obj
  return new F()
}
```

1. 创建一个空函数
2. 将此函数的原型设置为我们想要链接到的对象
3. 返回该函数创建出来的新实例，此实例具有我们希望链接到其上的原型链

## 2. 手写 instanceof 方法

```js
function myInstanceof(left, right) {
  left = Object.getPrototypeOf(left)
  let prototype = right.prototype

  while(true){
    if(!left) return false
    if(left === prototype) return true

    left = Object.getPrototypeOf(left)
  }
}
```

1. 获取对象的原型
2. 获取类型的原型
3. 沿着左侧参数（即可能为实例对象）的原型链进行遍历，直到找到右侧参数（即可能为构造函数）对应实例化对象时设定好的原型或者遍历完整个原型链。
4. 如果找到了就返回 true, 否则返回 false.

## 3. 手写 new 操作符

在调用 new 的过程中会发生以上四件事情：

1. 首先创建了一个新的空对象
2. 设置原型，将对象的原型设置为函数的 prototype 对象。
3. 让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
4. 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

```js
function myNew() {
  let newObj = null
  let fun = Array.prototype.shift.call(arguments)
  let res = null

  if(typeof fun !== 'function') {
    console.error('no function!')
    return
  }

  newObj = Object.create(fun.prototype)
  res = fun.apply(newObj, arguments)

  let flag = res && (typeof res === 'object' || typeof res === 'function')

  return flag ? res : newObj
}
```

1. 判断第一个参数是不是 function
2. 新建一个空对象，对象的原型为构造函数的 prototype 对象
3. 执行构造函数，将 this 指向新创建的对象，并传入参数
4. 判断返回结果

## 4. 手写 Promise

```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function myPromise(fn) {
  const self = this

  this.state = PENDING
  this.value = null
  this.resolvedCallbacks = []
  this.rejectedCallbacks = []

  function resolve(value) {
    if(value instanceof myPromise) {
      return value.then(resolve, reject)
    }

    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = RESOLVED
        self.value = value
        self.resolvedCallbacks.forEach((callback) => {
          callback(value)
        })
      }
    }, 0)
  }

  function reject(value){
    setTimeout(()=> {
      if (self.state === PENDING) {
        self.state = REJECTED
        self.value = value
        self.rejectedCallbacks.forEach((callback) => {
          callback(value)
        })
      }
    }, 0)
  }

  try{
    fn(resolve, reject)
  }catch(err){
    reject(err)
  }
}

myPromise.prototype.then = (onResolve, onReject) => {
  onResolve = typeof onResolve === 'function' ? onResolve : function(value) { return value }

  onReject = typeof onReject === 'function' ? onReject : function(error) { throw new Error('错误') }

  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onResolve)
    this.rejectedCallbacks.push(onReject)
  }

  if (this.state === RESOLVED) {
    onResolve(this.value)
  }
  if(this.state === REJECTED) {
    onReject(this.value)
  }
}
```

## 5. 手写 Promise.then

```js
function then(onResolve, onReject) {
  const self = this

  return new Promise((resolve, reject) => {
    let fulfilled = () => {
      try{
        const res = onResolve(self.value)
        return res instanceof myPromise ? res.then(resolve, reject) : resolve(res)
      }catch(err){
        reject(err)
      }
    }

    let rejected = () => {
      try{
        const res = onReject(self.reason)
        return res instanceof myPromise ? res.then(resolve, reject) : reject(res)
      }catch(err){
        reject(err)
      }
    }

    switch(self.status){
      case PENDING:
        self.resolvedCallbacks.push(fulfilled)
        self.rejectedCallbacks.push(rejected)
        break;
      case RESOLVED:
        fulfilled()
        break;
      case REJECT:
        rejected()
        break;
    }
  })
}
```

## 6. 手写 Promise.all

```js
function promiseAll(promises){
  if(!Array.isArray(promises)){
    throw new Error('must be a array')
  }
  return new Promise((resolve, reject) => {
    const count = promises.length
    let num = 0
    const res = []

    for(let i=0; i<count; i++){
      Promise.resolve(promises[i]).then((value)=>{
        num++
        res[i] = value
        if(res.length === count){
          return resolve(res)
        }
      }, (err)=>{
        return reject(err)
      })
    }
  })
}
```

## 7. 手写 Promise.race

```js
function promiseRace(promises){
  if(!Array.isArray(promises)){
    throw new Error('must be a array')
  }
  return new Promise((resolve, reject)=>{
    for(let i=0; i<promises.length; i++){
      promises[i].then(resolve, reject)
    }
  })
}
```

## 8. 手写防抖函数

防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。

```js
function debounce(fn, wait){
  let timer = null
  
  return function() {
    let self = this
    let args = arguments

    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout(()=>{
      fn.apply(self, args)
    }, wait)
  }
}
```

## 9. 手写节流函数

节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。

```js
function throttle(fn, delay){
  let cur = Date.now()

  return function(){
    let self = this
    let args = arguments
    let now = Date.now()

    if(now - cur >= delay) {
      cur = Date.now()
      return fn.apply(self, args)
    }
  }
}
```

## 10. 手写类型判断函数

```js
function getType(value){
  if (value === null) {
    return value + ''
  }

  if (typeof value === 'object') {
    let typeArray = Object.prototype.toString.call(value) // "[Object Array]""
    let type  = typeArray.split(" ")[1].split("") // [ A, r, r, a, y, ], ]
    type.pop() // [ A, r, r, a, y ]
    return type.join("").toLowerCase() // "array"
  } else {
    return typeof value
  }
}
```

## 11. 手写 call 函数

```js
Function.prototype.myCall = (context) => {
  if(typeof this !== "function") {
    throw new Error('must be a function')
  }

  let args = [...arguments].slice(1)
  let res = null

  context = context || window
  context.fn = this

  res = context.fn(...args)
  delete context.fn
  return res
}
```

## 12. 手写 apply 函数

```js
Function.prototype.myApply = (context) => {
  if (typeof this !== 'function'){
    throw new Error('must be a function')
  }

  let res = null
  context = context || window
  context.fn = this

  if (arguments[1]) {
    res = context.fn(...arguments[1])
  } else {
    res = context.fn()
  }

  delete context.fn
  return res
}
```

## 13. 手写 bind 函数

```js
Function.prototype.myBind = (context) => {
  if(typeof this !== "function") {
    throw new Error('must be a function')
  }

  let args = [...arguments].slice(1)
  let fn = this

  return function Fn(){
    return fn.apply(
      this instanceof Fn ? this : context
      args.concat(...arguments)
    )
  }
}
```

## 14. 函数柯里化的实现

```js
function curry(fn, args) {
  // 获取函数需要的参数长度
  let len = fn.length

  args = args || []

  return function(){
    let subArgs = args.slice(0)
    
    // 拼接得到现有的所有参数
    for(let i=0; i<arguments.length; i++){
      subArgs.push(arguments[i])
    }

    // 判断参数的长度是否已经满足函数所需参数的长度
    if(subArgs.length >= len){
      // 如果满足，执行函数
      return fn.apply(this, subArgs)
    }else{
      // 如果不满足，递归返回科里化的函数，等待参数的传入
      return curry.call(this, fn, subArgs)
    }
  }
}

// es6 实现
function curry(fn, ...args){
  return args.length >= fn.length ? fn(...args) : curry.bind(null, fn, ...args)
}
```

## 15. 实现 AJAX

创建AJAX请求的步骤：

1. 创建一个 XMLHttpRequest 对象。
2. 在这个对象上使用 open 方法创建一个 HTTP 请求，open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。
3. 在发起请求前，可以为这个对象添加一些信息和监听函数。
4. 最后调用 sent 方法来向服务器发起请求，可以传入参数作为发送的数据体。

```js
const SERVICE_URL = "/server"

let xhr = new XMLHttpRequest()

xhr.open('GET', SERVICE_URL, true)

xhr.onreadystatechange = function(){
  if(this.readyState !== 4) return
  if(this.state === 200){
    handle(this.response)
  }else{
    console.error(this.statusText)
  }
}
xhr.onerror = function(){
  console.error(this.statusText)
}
xhr.responseType = "json"
xhr.setRequestHeader("Accept", "application/json")

xhr.send(null)
```

## 16. 使用 Promise 封装 AJAX 请求

```js
function getJSON(url){
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()

    xhr.open("GET", url, true)

    xhr.onreadystatechange = () => {
      if(this.readyState !== 4) return
      if(this.status === 200) {
        resolve(this.response)
      }else{
        reject(new Error(this.stateText))
      }
    }
    xhr.onerror = () => {
      reject(new Error(this.stateText))
    }
    xhr.responseType = "json"
    xhr.setRequestHeader("Accept", "application/json")

    xhr.send(null)
  })
}
```

## 17. 实现浅拷贝

1. Object.assign()
2. 扩展运算符
3. Array.prototype.slice
4. Array.prototype.concat

```js
function shallowCopy(obj){
  if(!obj || typeof obj !== 'object') return

  let newObj = Array.isArray(obj) ? [] : {}

  for(let key in obj){
    if(obj.getOwnProperty(key)){
      newObj[key] = obj[key]
    }
  }

  return newObj
}
```

## 18. 实现深拷贝

1. JSON.parse(JSON.stringify(obj))
2. 函数库 lodash 的 _.cloneDeep 方法

```js
function deepCopy(obj){
  if(!obj || typeof obj !== 'object') return

  let newObj = Array.isArray(obj) ? [] : {}
  for(let key in obj){
    if(obj.getOwnProperty(key)) {
      let flag = typeof obj[key] === 'object'
      newObj[key] = flag ? deepCopy(obj[key]) : obj[key]
    }
  }

  return newObj
}
```

## 19. 实现 promise.finally

```js
Promise.prototype.finally = (cb) => {
  let p = this.constructor()

  return this.then(
    value => p.resolve(cb()).then(()=>value),
    err => p.reject(cb()).then(()=> throw new Error(err))
  )
}
```

