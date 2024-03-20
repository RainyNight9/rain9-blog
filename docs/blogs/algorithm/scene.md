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
        const random = Math.random()
        setTimeout(() => {
            console.log(url);
            resolve('data:' + url);
        }, random * 10000);
    });
}


function multiRequest(urls, max) {
    const len = urls.length;
    const result = new Array(len).fill(false);
    let count = 0;

    return new Promise(resolve => {
        // 首次并发 max 个请求
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

## 16. 实现一个函数，要求能在页面请求很多时候，尽可能的按照顺序的输出返回结果

```js
function processRequest(urls){
  let limit = 3
  let result = []

  let queue = urls.slice(0)

  async function sendRequest(){
    if(queue.length===0){
      return result
    }

    let url = queue.shift()
    try{
      let res = await fetch(url)
      res.push(res)
      sendRequest()
    }catch(err){
      sendRequest()
    }
  }

  for(let i=0; i<limit; i++){
    sendRequest()
  }
}
```

## 17. 自动重试 3 次，任意一次成功就直接返回

```js
function fetchWithRetry(url, max=3){
  return new promise((resolve, reject)=>{
    async function doFetch(count){
      try{
        let res = await fetch(url)
        if(res.code===200){
          resolve(res)
        }else{
          throw new Error()
        }
      }catch(err){
        if(count<max){
          doFetch(count++)
        }else{
          reject(err)
        }
      }
    }

    doFetch(0)
  })
}
```

## 18. 高并发控制 一次最多输出 n 个结果

```js
function creator(count) {
  const arr = [];
  let flag = true;

  function setup(fn) {
      arr.push(fn);
      // 包一层异步，让同步调用全部进来
      flag && setTimeout(() => {
          // 并发执行容器，初始化长度为 count
          const promises = arr.splice(0, count).map((item, index) => {
              // 返回下标，用于执行容器的替换
              return item().then(() => index);
          })

          // 真正执行过程开始,此时 arr 中为第一轮排不上的异步任务
          arr.reduce((pres, curFn) => {
              return pres.then(() => {
                  return Promise.race(promises); // 返回先完成的下标
              }).then(fastestIndex => {
                  // 要继续将这个下标返回，以便下一次遍历
                  promises[fastestIndex] = curFn().then(() => fastestIndex);
              })
          }, Promise.resolve());
      }, 0) && (flag = false);// flag 控制异步只调用一次
  }
  return setup
}
const setup = creator(2)



setup(fn)
setup(fn)
setup(fn)
setup(fn)
setup(fn)

function fn() {
  return new Promise((resolve) => {
      setTimeout(() => {
          console.log(Date())
          resolve(1)
      }, 2000)
  })
}
```

## 19. 字节高并发面试题

```js
// 分批请求，一次并发 limit 个，完了再并发下一批
async function fetchWithLimit(fetchList, limit) {
    const results = [];
    let completedCount = 0;
    let errorOccurred = false;

    async function fetchOne(fetchItem) {
        try {
            const result = await fetchItem();
            console.log('Request succeeded:', result);
            results.push(result);
        } catch (error) {
            console.error('Request failed:', error);
            errorOccurred = true;
        } finally {
            completedCount++;
        }
    }

    // 按并发限制逐个处理请求
    while (completedCount < fetchList.length && !errorOccurred) {
        const currentBatch = fetchList.slice(completedCount, completedCount + limit);
        await Promise.all(currentBatch.map(fetchOne));
    }

    // 如果有请求失败，则抛出错误
    if (errorOccurred) {
        throw new Error('One or more requests failed');
    }

    return results;
}

// 限制并发，请求完一个进入下一个
async function fetchWithLimit(fetchList, limit) {
    let results = [];
    let currentIndex = 0;
    let runningCount = 0;
    let errorOccurred = false;

    async function fetchAndHandle(index) {
        try {
            const result = await fetchList[index]();
            results.push(result);
        } catch (error) {
            errorOccurred = true;
            throw error;
        } finally {
            runningCount--;
            if (!errorOccurred && currentIndex < fetchList.length) {
                fetchAndHandle(currentIndex);
                runningCount++;
                currentIndex++;
            }
        }
    }

    while (currentIndex < fetchList.length && runningCount < limit) {
        fetchAndHandle(currentIndex);
        runningCount++;
        currentIndex++;
    }

    while (runningCount > 0) {
        await new Promise(resolve => setTimeout(resolve, 0)); // 等待当前请求完成
    }

    if (errorOccurred) {
        throw new Error('One or more requests failed.');
    }

    return results;
}

// 示例的异步请求方法
function asyncFetch(url) {
    return new Promise((resolve, reject) => {
        const random = Math.random();
        setTimeout(() => {
            if (random < 1) {
                console.log(url)
                resolve(`Request to ${url} succeeded: ${random}`);
            } else {
                reject(`Request to ${url} failed: ${random}`);
            }
        }, random * 10000);
    });
}

// 示例 fetchList
const fetchList = [
    async () => asyncFetch('http://example.com/1'),
    async () => asyncFetch('http://example.com/2'),
    async () => asyncFetch('http://example.com/3'),
    async () => asyncFetch('http://example.com/4'),
    async () => asyncFetch('http://example.com/5'),
    async () => asyncFetch('http://example.com/6'),
    async () => asyncFetch('http://example.com/7'),
    async () => asyncFetch('http://example.com/8'),
    async () => asyncFetch('http://example.com/9'),
    async () => asyncFetch('http://example.com/10'),
    async () => asyncFetch('http://example.com/11')
];

const limit = 2;

(async () => {
    try {
        const result = await fetchWithLimit(fetchList, limit);
        console.log('All requests succeeded:', result);
    } catch (error) {
        console.error('Request failed:', error.message);
    }
})();
```

```js
// 限制并发请求
function gets(ids, max) {
  return new Promise((resolve) => {
    const res = [];
    let completedCount = 0;

    function load(id, index) {
      get(id)
        .then((data) => {
          res[index] = data;
        })
        .catch((err) => {
          res[index] = err;
        })
        .finally(() => {
          completedCount++;
          if (completedCount === ids.length) {
            resolve(res);
          } else if (index < ids.length - 1) {
            load(ids[index + max], index + max);
          }
        });
    }

    for (let i = 0; i < max && i < ids.length; i++) {
      load(ids[i], i);
    }
  });
}
```

```js
// 优雅的 RXJS 实现
function gets(ids, max) {
  return from(ids).pipe(
    mergeMap((id) => get(id), max), // 使用mergeMap一次性处理max个请求
    toArray(), // 将结果转换为数组
    map((results) => {
      const resultMap = new Map();
      results.forEach((result, index) => {
        resultMap.set(ids[index], result); // 将结果映射到id上
      });
      return ids.map((id) => resultMap.get(id)); // 根据ids顺序返回结果数组
    })
  );
}
```