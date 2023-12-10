function myCreate(obj){
  function Fn() {}
  Fn.prototype = obj
  return new Fn()
}

function myInstanceof(left, right){
  left = Object.getPrototypeOf(left)
  let proto = right.prototype
  
  while(true){
    if(!left) return false
    if(left === proto) return true
    left = Object.getPrototypeOf(left)
  }
}

function myNew(fn, ...args){
  let newObj = Object.create(fn.prototype)
  let res = fn.apply(newobj, args)

  let flag = typeof res === 'object' || typeof res === 'function'

  return flag ? res : newObj
}

const PENDING = 'pengding'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function myPromise(fn){
  this.state = PENGDING
  this.value = null
  this.resolveCB = []
  this.rejectCB = []

  function resolve(value){
    if(value instanceof myPromise) {
      return value.then(resolve, reject)
    }

    setTimeout(()=>{
      if(this.state===PENGDING){
        this.state = RESOLVED
        this.value = value
        this.resolveCB.forEach((cb)=>{
          cb(value)
        })
      }
    }, 0)
  }

  function reject(value){
    setTimeout(()=>{
      if(this.state===PENGDING){
        this.state = REJECTED
        this.value = value
        this.rejected.forEach((cb)=>{
          cb(value)
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
  onResolve = typeof onResolve === 'function' ? onResolve : function (value) { return value}
  onReject = typeof onReject === 'function' ? onReject : function () { throw new Error()}

  if(this.state === PENDING){
    this.resolveCB.push(onResolve)
    this.rejectCB.push(onReject)
  }

  if(this.state === RESOLVED){
    onResolve(this.value)
  }

  if(this.state === REJECTED){
    onReject(this.value)
  }
}

function promiseAll(promises){
  if(!Array.isArray(promises)){
    throw new Error('must be a array')
  }

  return new Promise((resolve, reject)=>{
    let len = promises.length
    let count = 0
    let result = []

    for(let i=0; i<len; i++){
      Promise.resolve(promises[i]).then((value)=>{
        count++
        result[i] = value
        if(result.length===len){
          return resolve(result)
        }
      }, (err)=>{
        return reject(err)
      }) 
    }
  })
}

function promiseRace(promises){
  if(!Array.isArray(promises)){
    throw new Error('must be a array')
  }

  return new Promise((resolve, reject)=>{
    for(let i=0; i<promises.length; i++){
      Promise.resolve(promises[i]).then(resolve, reject)
    }
  })
}

myPromise.prototype.finally = (cb) => {
  return this.then((value)=>{
    return Promise.resolve(cd()).then((value)=>value)
  }, err=>{
    return Promise.reject(cd()).then(err=> {throw new Error(err)})
  })
}

function set(obj, path, value){
  let keys = path.split('.')
  let curObj = obj

  for(let i=0; i<keys.length-1; i++){
    const key = keys[i]
    if(!(key in curObj)){
      curObj[key] = {}
    }
    console.log(111, curObj)
    curObj = curObj[key]
    console.log(222, curObj)
  }
  console.log(333, curObj)
  curObj[keys[keys.length-1]] = value
}

function get(obj, path){
  
}

