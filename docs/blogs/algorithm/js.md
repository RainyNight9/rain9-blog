# JS 手写题

## 1. 手写 Object.create

```js
function create(obj){
  function Fun(){}
  Fun.prototype = obj
  return new Fun()
}
```

## 2. 手写 instanceof 方法

```js
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left)
  let prototype = right.prototype

  while(true){
    if(!proto) return false
    if(proto === prototype) return true

    proto = Object.getPrototypeOf(proto)
  }
}
```

## 3. 手写 new 操作符

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

  onReject = typeof onReject === 'function' ? onReject : function(error) { throw error }

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

```js
function throttle(fn, delay){
  let cur = Date.now()

  return function(){
    let self = this
    let args = arguments
    let now = Date.mow()

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
  if(value === null) {
    return value + ''
  }

  if(typeof value === 'object') {
    let typeArray = Object.prototype.toString.call(value)
    let type  = typeArray.split(" ")[1].split("")
    type.pop()
    return type.join("").toLowerCase()
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

  if (arguments[1]){
    res = context.fn(...arguments[1])
  }else{
    res = context.fn()
  }

  delete context.fn
  return res
}
```
