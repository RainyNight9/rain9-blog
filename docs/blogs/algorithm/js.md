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