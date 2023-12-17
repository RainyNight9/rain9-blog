# 场景应用

## 1. 循环打印红黄绿

红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？

```js
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}
```

```js
// callback 实现
function task(timer, light, callback){
  setTimeout(()=>{
    if(light==='red') red()
    if(light==='green') green()
    if(light==='yellow') yellow()
    callback()
  }, timer)
}
function step(){
  task(3000, 'red', ()=>{
    task(1000, 'green', ()=>{
      task(2000, 'yellow', step)
    })
  })
}

step()
```

```js
// promise 实现
function task(timer, fn){
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      fn()
      resolve()
    }, timer)
  })
}
function step(){
  task(3000, red)
    .then(()=> task(1000, green))
    .then(()=> task(2000, yellow))
    .then(step)
}

step()
```

```js
// async/await 实现
async function step(){
  await task(3000, red)
  await task(1000, green)
  await task(2000, yellow)
  step()
}

step()
```

## 2. 每隔一秒打印 1,2,3,4

```js
// let
function printNum(){
  for(let i=1; i<5; i++){
    setTimeout(() => console.log(i), i*1000)
  }
}

// 闭包
function printNum(){
  for(var i=1; i<5; i++){
    (function(num){
      setTimeout(()=> console.log(num), num*1000)
    })(i)
  }
}
```

## 3. 小孩报数问题

有30个小孩儿，编号从1-30，围成一圈依此报数，1、2、3 数到 3 的小孩儿退出这个圈， 然后下一个小孩 重新报数 1、2、3，问最后剩下的那个小孩儿的编号是多少?

```js
function childNum(num, count){
  let allPlayer = []
  for(let i=0; i<num; i++){
    allPlayer[i] = i+1
  }

  let exitCount = 0
  let curCount = 0
  let curIndex = 0

  while(exitCount < num -1){
    if(allPlayer[curIndex] !==0) curCount++

    if(curCount===count){
      allPlayer[curIndex] = 0
      curCount = 0
      exitCount++
    }

    curIndex++

    if(curIndex===num){
      curIndex = 0
    }
  }

  for(let i=0; i<num; i++){
    if(allPlayer[i] !== 0) {
      return allPlayer[i]
    }
  }
}
```

## 4. 用Promise实现图片的异步加载

```js
function imgAsync(url){
  return new Promise((resolve, reject)=>{
    let img = new Image()
    img.src = url
    img.onload = () =>{
      resolve()
    }
    img.onerror = () =>{
      reject()
    }
  })
}

imgAsync(url).then(()=>{
  console.log('加载成功！')
}).catch(()=>{
  console.error('加载成功！')
})
```

## 5. 发布-订阅模式

```js
class EventCenter{
  let handlers = {}

  addEventListener(type, handler){
    if(!this.handlers[type]){
      this.handlers[type] = []
    }

    this.handlers[type].push(handler)
  }

  dispatchEvent(type, params){
    if(!this.handlers[type]){
      console.error('no type')
      return
    }

    this.handlers[type].forEach((fn)=>{
      fn(...params)
    })
  }

  removeEvent(type, handler){
    if(!this.handlers[type]){
      console.error('no type')
      return
    }

    if(!handler){
      delete this.handlers[type]
    } else {
      const index = this.handlers[type].indexOf(handler)
      if(index>-1){
        this.handlers[type].splice(index, 1)
        if(this.handlers[type].length===0) {
          delete this.handlers[type]
        }
      }else{
        console.error('no handler')
        return
      }
    }
  }
}
```

## 6. 查找文章中出现频率最高的单词

```js
function getMostWord(text){
  if(!text) return
  text = text.trim().toLowerCase()
  text = text.match(/[a-z]+/g)

  let map = {}
  let maxItem = {maxWord: '', maxNum: 0}

  text.forEach((item)=>{
    let count = 1
    if(Object.prototype.hasOwnProperty.call(map, item)){
      count = map[item] + 1
    }
    map[item] = count
    if(count>maxItem.maxNum){
      maxItem = {maxWord: item, maxNum: count}
    }
  })

  return maxItem
}
```

## 7. 版本号排序的方法

题目描述:有一组版本号如下 ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']

```js
function sortVersion(arr){
  arr.sort((a, b)=>{
    const arr1 = a.split(".")
    const arr2 = b.split(".")

    let i = 0
    while(true){
      const c1 = arr1[i]
      const c2 = arr2[i]
      i++

      if(c1===undefined || c2===undefined){
        return arr2.length - arr1.length
      }

      if(c1===c3) continue

      return c2-c1
    }
  })
}
```

## 8. prototype继承

```js
function Super(flag1){
  this.flag1 = flag1
}
function Sub(flag2){
  this.flag2 = flag2
}

const superInstance = new Super(true)

Sub.prototype = superInstance

const subInstance = new Sub(false)

subInstance.flag1 // true
subInstance.flag2 // false
```

## 9. 双向数据绑定

```js
let obj = {}
const input = document.getElementById('input')
const span = document.getElementById('span')

Object.defineProperty(obj, 'text', {
  configurable: true,
  enumerable: true,
  get(){
    console.log('获取数据了')
  }
  set(newVal){
    console.log('设置数据')
    input.value = newVal
    span.innerHTML = newVal
  }
})

input.addEventListener('keyup', (e)=>{
  obj.text = e.target.value
})
```

## 10. 简单路由

```js
class Route{
  constructor(){
    this.routes = {}
    this.currentHash = ''

    this.freshRoute = this.freshRoute.bind(this)

    window.addEventListener('load', this.freshRoute, false)
    window.addEventListener('hashchange', this.freshRoute, false)
  }

  storeRoute(path, cb){
    this.route[path] = cb || function (){}
  }

  freshRoute(){
    this.currentHash = location.hash.slice(1) || '/'
    this.route[this.currentHash]()
  }
}
```

## 11. 斐波那契数列

```js
// 递归
function fibonacci(n){
  if(n===0) return 0
  if(n===1) return 1
  return fibonacci(n-2) + fibonacci(n-1)
}

// 动态规划
function fibonacci(n){
  const arr = [1, 1, 2]
  const len = arr.length

  if(n < len){
    return arr[n]
  }
  for(let i=len; i<n; i++){
    arr.push(arr[i-2]+arr[i-1])
  }

  return arr[arr.length-1]
}
```

## 12. 字符串出现的不重复最长长度

[LCR 016. 无重复字符的最长子串](https://leetcode.cn/problems/wtcaE1/description/)

```js
function strLongLength(s){
  let str = ''
  let max = 0
  for(let i=0; i<s.length; i++){
    const item = s[i]
    const index = str.indexOf(item)
    if(index>-1){
      max = Math.max(max, str.length)
      str = str.slice(index+1) + item
    }else{
      str += item
    }
  }

  return Math.max(max, str.length)
}
```

## 13. 使用 setTimeout 实现 setInterval

```js
function mySetInterval(fn, timeout){
  const timer = {
    flag: true
  }
  function interval(){
    if(timer.flag){
      fn()
      setTimeout(interval, timeout)
    }
  }

  setTimeout(interval, timeout)
  return timer
}
```

## 14. 判断对象是否存在循环引用

```js
 function isCircular(obj){
  let visited = new Set()
  const stack = [obj]

  while(stack.length>0){
    const current = stack.pop()
    visited.add(current)

    for(let key in current){
      const value = current[key]

      if(typeof value === 'object' && value !== null){
        if(visited.has(value)) return true
      }

      stack.push(value)
    }
  }

  return false
}

// 递归
function isCircular(obj, visited = new Set()){
  visited.add(obj)

  for(const key in obj){
    const value = current[key]

      if(typeof value === 'object' && value !== null){
        if(visited.has(value) || isCircular(value, visited)) {
          return true
        }
      }
  }

  return false
}
```

## 15. 高并发控制

```js
// Promise模拟接口异步请求
function fetch(url) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(url);
            resolve('data:' + url);
        }, 2000);
    });
}


function multiRequest(urls, max) {
    const len = urls.length;
    const result = new Array(len).fill(false);
    let count = 0;

    return new Promise(resolve => {
        // 首次并发max个请求
        while (count < max) {
            next();
        }
        function next() {
            const cur = count++;
            if (cur > len) {
                !result.includes(false) && resolve(result);
                return;
            }
            fetch(urls[cur]).then(res => {
                result[cur] = res;
                next();
            });
        }
    });
}

multiRequest([
    'api/1',
    'api/2',
    'api/3',
    'api/4',
    'api/5',
    'api/6',
    'api/7',
    'api/8',
    'api/9'
], 3).then(result => {
    console.log('所有请求处理完毕');
    console.log(result);
});
```
