# 数据处理手写题

## 1. 日期格式化函数

```js
function dateFormat = (date, format) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  let res = format.replace(/yyyy/, year)
  res = format.replace(/MM/, month)
  res = format.replace(/dd/, day)

  return res
}
```

## 2. 交换 a,b 的值，不能用临时变量

```js
let a = 1
let b = 2

a = a - b // 拿到 b 达到 a 需要加的 差值

b = b + a // b 加上了这个差值，值就变成了 a
a = b - a // 减去 这个差值 就是 b
```

## 3. 数组的乱序输出

```js
for(let i=0; i<arr.length; i++){
  const random = Math.floor(Math.random() * (arr.length-1-i)) + i

  [arr[i], arr[random]] = [arr[random], arr[i]]
}
```

## 4. 数组元素求和

```js
// 一维数组
function sums(arr){
  return arr.reduce((total, item) => total += item, 0)
}
```

```js
// 多维数组
function sums(arr){
  return arr.toString().splice(',').reduce((total, item) => total += Number(item), 0)
}
```

## 5. 数组的扁平化

```js
// 递归
function flatten(arr){
  let res = []

  for(let i=0; i<arr.length; i++){
    if(Array.isArray(arr[i])){
      res = res.concat(flatten(arr[i]))
    }else{
      res.push(arr[i])
    }
  }
  
  return res
}
```

```js
// reduce
function flatten(arr){
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
}
```

```js
// 扩展运算符
function flatten(arr){
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
```

```js
// toString 和 split
function flatten(arr){
  return arr.toString().split(',')
}
```

```js
// es6 的 flat
function flatten(arr){
  return arr.flat(Infinity)
}
```

```js
// 正则 和 JSON 方法
function flatten(arr){
  let str = JSON.stringify(arr)
  str = str.replace(/(\[|\])/g, '')
  str = '[' + str + ']'
  return JSON.parse(str)
}
```

## 6. 数组去重

```js
// Set
function uniqueArray(arr){
  return Array.from(new Set(arr))
}
```

```js
// Map
function uniqueArray(arr){
  let map = {}
  let res = []
  for(let i=0; i<arr.length; i++){
    if(!map.getOwnProperty(arr[i])) {
      map[arr[i]] = 1
      res.push(arr[i])
    }
  }
  return res
}
```

## 7. 数组的 flat 方法

```js
function flatArray(arr, depth){
  if(!Array.isArray(arr) || depth <= 0) {
    return arr
  }

  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatArray(next, depth-1) : next)
  }, [])
}
```

## 8. 数组的 push 方法

```js
Array.prototype.myPush = () => {
  for(let i=0; i<arguments.length; i++){
    this[this.length] = arguments[i]
  }
  return this.length
}
```

## 9. 数组的 filter 方法

```js
Array.prototype.myFilter = (fn) => {
  if(typeof fn !== 'function') {
    throw new Error('must be a function')
  }

  let arr = this
  let res = []
  for(let i=0; i<arr.length; i++){
    fn(arr[i]) && res.push(arr[i])
  }
  return res
}
```

## 10. 数组的 map 方法

```js
Array.prototype.myMap = (fn) => {
  if(typeof fn !== 'function') {
    throw new Error('must be a function')
  }

  let arr = this
  let res = []
  for(let i=0; i<arr.length; i++){
    res.push(fn(arr[i]))
  }
  return res
}
```

## 11. 字符串的 repeat 方法

```js
function repeat(str, n){
  return (new Array(n + 1)).join(str)
}
```

```js
// 递归
function repeat(str, n){
  return n > 0 ? str.concat(repeat(str, --n)) : str
}
```

## 12. 字符串翻转

```js
function reverse(str){
  return str.split("").reverse().join("")
}
```

## 13. 将数字每千分位用逗号隔开，钱，金额，money

```js
function format(num){
  return num.toLocaleString()
}

function format(num){
  return new Intl.NumberFormat().format(num)
}
```

```js
function format(num){
  num = num.toFixed ? num.toFixed(2) : num
  const arr = (num + '').split('.')
  const int = arr[0].split('')
  const decimals = arr[1] || '00'
  let res = ''
  int.reverse().forEach((item, index) => {
    if(index !== 0 && index % 3 === 0){
      res = item + ',' + res
    } else {
      res = item + res
    }
  })

  return res + '.' + decimals
}
```

## 14. 类数组转化为数组

```js
Array.prototype.slice.call(arrayLike);

Array.prototype.splice.call(arrayLike, 0);

Array.prototype.concat.apply([], arrayLike);

Array.from(arrayLike);
```

## 15. 将 js 对象转化为树形结构

```js
// 转换前：
source = [
  {
    id: 1,
    pid: 0,
    name: 'body'
  },
  {
    id: 2,
    pid: 1,
    name: 'title'
  },
  {
    id: 3,
    pid: 2,
    name: 'div'
  }
]
// 转换为: 
tree = [{
  id: 1,
  pid: 0,
  name: 'body',
  children: [{
    id: 2,
    pid: 1,
    name: 'title',
    children: [{
      id: 3,
      pid: 1,
      name: 'div'
    }]
  }
}]
```

```js
function jsonToTree(data){
  let res = []
  if(!Array.isArray(data)){
    return res
  }

  let map = {}
  data.forEach(item => {
    map[item.id] = item
  })

  data.forEach(item => {
    const parent = map[item.pid]
    if(parent){
      (parent.children || (parent.children = [])).push(item)
    }else{
      res.push(item)
    }
  })
}
```

## 16. 解析 URL Params 为对象

```js
function parseQueryParam(url){
  let param = {}
  let arr  = url.split('?')
  if(arr.length <= 1){
    return param
  }
  arr = arr[1].split('&')
  for(let i=0; i<arr.length; i++){
    const keyVal = arr[i].split('=')
    param[keyVal[0]] = keyVal[1]
  }
  return param
}
```

## 17. 数组元素偏移

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function moveArray(arr, index, offset){
  const output = [...arr];
  let element = output.splice(index, 1)[0]
  let moveStep = index + offset
  if(moveStep < 0) moveStep++
  if(moveStep >= arr.length) moveStep -= arr.length
  output.splice(moveStep, 0, element)
  return output
}

console.log(moveArray(numbers, 3, -5));
```

## 18. 一个函数 fn({start,success,fail}) 可以进行 catch/then 的链式调用

```js
function fn({ start, success, fail }) {
  return new Promise((resolve, reject) => {
    try {
      const result = start();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  })
  .then(success)
  .catch(fail);
}

// 使用示例
fn({
  start: () => 'Start Function',
  success: result => console.log('Success:', result),
  fail: error => console.error('Error:', error),
});
```

## 19. 一个有序的数组，给定一个目标值，找到两个数组中的元素相加为目标值。要求：一次循环

```js
function findTwoSum(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const sum = nums[left] + nums[right];

        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;
        } else { // sum > target
            right--;
        }
    }

    return [-1, -1]; // 没有找到答案
}

// 测试用例：
console.log(findTwoSum([2, 7, 11, 15], 9)); // 输出：[0, 1]
```

```js
function findTwoSum(nums, target) {
    const map = {};
  
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map[complement] !== undefined) {
            return [map[complement], i];
        }
        
        map[nums[i]] = i;
    }

    return [-1, -1]; // 没有找到答案
}

// 测试用例：
console.log(findTwoSum([3, 2, 4], 6)); // 输出：[1, 2]
```

## 20. 求树的深度，先写一个树的结构

```js
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function maxDepth(root) {
  if (root === null) {
    return 0;
  } else {
    let leftHeight = maxDepth(root.left);
    let rightHeight = maxDepth(root.right);
    
    return Math.max(leftHeight, rightHeight) + 1;
  }
}
```

## 21. 最长不重复字符串

```js
function lengthOfLongestSubstring(s) {
  let map = new Map()
  let l = 0
  let max = 0

  for(let r=0; r<s.length; r++){
    let item = s[r]
    if(map.has(item) && map.get(item) >= l){
      const index = map.get(item)
      l = index + 1
    }
    max = Math.max(max, r - l + 1)
    map.set(item, r)
  }

  return max
}

// 测试用例：
console.log(lengthOfLongestSubstring("abcabcbb"));   // 输出：3 ("abc" 是最长子串)
```

```js
function lengthOfLongestSubstring(s){
  let arr = []
  let max = 0

  for(let i=0; i<s.length; i++){
    let item = s[i]
    let index = arr.indexOf(item)
    if(index>-1){
      arr.splice(0, index+1)
    }
    arr.push(item)
    max = Math.max(max, arr.length)
  }

  return max
}
```

## 22. 旋转链表

```js
function rotateRight(head, k){
  if(!head || !head.next) return head
  
  let p = head
  let n = 1
  while(p.next){
    p = p.next
    n++
  }
  p.next = head

  k = k % n
  k = n - k

  while(k--){
    p = p.next
  }
  head = p.next
  p.next = null
  return head
}
```

## 23. 二分查找

```js
function search(nums, target){
  let l = 0, r = nums.length -1
  while(l <= r){
    let mid = Math.floor((r-l)/2) + l
    let midNum = nums[mid]
    if(midNum===target){
      return mid
    }else if(midNum > target){
      r = mid-1
    }else if(midNum < target){
      l = mid+1
    }
  }
  return -1
}
```

## 24. add(1)(2,3)(4).sum()

```js
function add(){
  let total = [...arguments].reduce((a, b)=> a+b, 0)

  function sum(){
    total += [...arguments].reduce((a, b)=> a+b, 0)
  }

  sum.toString = function(){
    return total
  }

  return sum
}
```

## 25. lodash  的 set 和 get

```js
let obj = {
  a: {
    b: {
      c: 'hello'
    }
  }
}

function set(obj, path, value){
  let keys = path.split('.')

  let curObj = obj
  for(let i=0; i<keys.length-1; i++){
    if(!(keys[i] in curObj)){
      curObj[keys[i]] = {}
    }
    curObj = curObj[keys[i]]
  }

  curObj[keys[keys.length-1]] = value
}

function get(obj, path){
  let keys = path.split('.')
  let curObj = obj

  for(let i=0; i<keys.length; i++){
    let key = keys[i]
    if(typeof key !== 'object' || !(key in curObj)) {
      return undefined
    }
    curObj = curobj[key]
  }

  return curObj
}
```

## 26. 去除字符串中出现次数最少的字符，不改变顺序

```js
"ababac" => "ababa"
"aaabbbcceeff" => "aaabbb"

function deleteLeast(str){
  let map = {}

  for(let i=0; i<str.length; i++){
    let item = str[i]
    if(map[item]){
      map[item]++
    }else{
      map[item] = 1
    }
  }

  let min = Math.min(...Object.values(map))
  for(let key in map){
    if(map[key]===min){
      delete map[key]
    }
  }

  let res = ''
  for(let i=0; i<str.length; i++){
    let item = str[i]
    if(map[item]){
      res += item
    }
  }

  return res
}
```

## 27. 一个批量请求函数，要求能够限制并发量

```js
function multiRequest(urls, max){
  let len = urls.length
  let count = 0
  let res = new Array(len).fill(false)

  return new Promise((relsove, reject)=>{
    while(count<max){
      next()
    }

    function next(){
      let curNum = count++

      if(curNum >= len){
        if(!res.includes(false)){
          resolve(res)
          return
        }
      }
      
      fetch(urls[curNum]).then((value)=>{
        res[curNum] = value
        if(curNum<len){
          next()
        }
      },err=>{
        res[curNum] = err
        if(curNum<len){
          next()
        }
      })
    }
  })
}
```

## 28. 树转数组

```js
function treeToArray(tree){
  let res = []
  res = getItem(tree, res)
  return res
}

function getItem(tree, res){
  for(let i=0; i<tree.length; i++){
    let item = tree[i]
    if(item.children){
      getItem(item.children, res)
      delete item.children
    }
    res.push(item)
  }
  return res
}
```

```js
function treeToArray(tree){
  let queue = []
  queue = queue.concat(tree)
  let res = []
  while(queue.length){
    let item = queue.shift()
    if(item.children){
      queue = queue.concat(item.children)
      delete item.children
    }
    res.push(item)
  }
  return res
}
```

## 29. 数组转树

```js
function arrayToTree(arr, pid){
  let res = []
  getItem(arr, pid, res)
  return res
}

function getItem(arr, pid, res){
  for(let i=0; i<arr.length; i++){
    let item = arr[i]
    if(item.pid === pid){
      let newItem = { ...item, children: []}
      res.push(newItem)
      getItem(arr, item.id, newItem.children)
    }
  }
}
```

## 30. 删除链表中的一个节点

```js
function deleteNode(head, val){
  if(head.val = val){
    return head.next
  }

  let pre = head
  let cur = head.next

  while(cur){
    if(cur.val === val){
      pre.next = cur.next
      cur = null
      break
    }else{
      pre = cur
      cur = cur.next
    }
  }

  return head
}
```

## 31. 实现一个函数，要求能在页面请求很多时候，尽可能的按照顺序的输出返回结果

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

## 32. 自动重试 3 次，任意一次成功就直接返回

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

## 33. 链表中，环的入口节点

```js
function detectCycle(head){
  let visited = new Set()

  while(head){
    if(visited.has(head)){
      return head
    }else{
      visited.add(head)
      head = head.next
    }
  }

  return null
}

function detectCycle(head){
  if(!head) return head

  let slow = head
  let fast = head
  while(fast && fast.next){
      slow = slow.next
      fast = fast.next.next

      if(fast===slow){
          let cur = head
          while(cur!== slow){
              cur = cur.next
              slow = slow.next
          }
          return cur
      }
  }

  return null
}
```

## 34. 快速排序

```js
function quickSort(arr){
  if(arr.length<=1){
    return arr
  }

  let midIndex = Math.floor(arr.length/2)
  let midNum = arr[midIndex]

  let left = []
  let right = []

  for(let i=0; i<arr.length; i++){
    if(arr[i]<midNum){
      left.push(arr[i])
    }else if(arr[i]>midNum){
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(midNum, quickSort(right))
}
```

## 35. 使用 js 实现有序数组原地去重

```js
function noRepeat(arr){
  for(let i=0; i<arr.length-1; i++){
    for(let j=i+1; j<arr.length; j++){
      if(arr[j]===arr[i]){
        arr.splice(j, 1)
        j--
      }
    }
  }
  return arr
}

function noRepeat(arr){
  for(let i=0; i<arr.length; i++){
    if(arr.indexOf(arr[i]) !== i){
      arr.splice(i, 1)
      i--
    }
  }
  return arr
}

function noRepeat(arr){
  return arr.filter((value, index)=>{
    return arr.indexof(value) !== index
  })
}

function noRepeat(arr){
  return Array.from(new Set(arr))
}
```

## 36. 计算数组中时间的平均时间

```js
const arr = ['8:15', '6:35', '11:22']

function averageTime(arr){
  const totalMinutes = arr.reduce((pre, cur)=>{
    const [hour, minutes] = cur.split(':')
    return pre + Number(hour) * 60 + Number(minutes)
  })

  let averageMinutes = Math.floor(totalMinutes/arr.length)
  const averageHour = Math.floor(averageMinutes/60)
  averageMinutes = averageMinutes % 60
  averageMinutes = averageMinutes<10 ? '0'+averageMinutes :  averageMinutes
  return averageHour + ':' + averageMinutes
}
```

## 37. 间隔执行函数

```js
function createRepeat(fn, repeat, interval){
  let count = 0

  return (param) => {
    const timer = setInterval(()=>{
      fn(param)
      count++
      if(count>=repaet){
        clearInterval(timer)
      }
    }, interval * 1000)
  }
}
```

## 38. 不定长二维数组的全排列

```js
const arr = [[A, B], [a, b], [1, 2]]
// [Aa1, Aa2, Ab1, Ab2, .....]

// 动态规划
function permutate(arr){
  let res = arr[0].slice()

  for(let i=1; i<arr.length; i++){
    let pre = res.slice()
    res = []
    pre.forEach(item=>{
      arr[i].forEach(cur=>{
        res.push(item+cur)
      })
    })
  }
  return res
}
```

## 39. 两个字符串对比，得出结论都做了什么操作？插入什么？删除什么？

```js
pre = 'abcde123'
cur = '1abc123'


function diffAction(pre, cur){

}
```

## 40. 从数组中，获取最小正数的索引值

```js
function findMinIndex(arr){
  let min = Math.max(...arr)
  let index = -1

  for(let i=0; i<arr.length; i++){
    if(arr[i]>=0 && arr[i]<min){
      min = arr[i]
      index = i
    }
  }

  return index
}
```

## 41. 实现一个等待函数，支持让 async 函数在执行时暂停一段时间，函数的入参为暂停的时间

```js
function wait(time){
  return new Promise(resolve=> setTimeout(()=>resolve()), time)
}

async function run(){
  console.log('start')
  await wait(2000)
  console.log('end')
}
```

## 42. 使用正则，筛选出数组中只包含大小写字母的字符串，并将结果转大写

```js
function filterArr(arr){
  arr = arr.filter(item => {
    return /^[A-Za-z]+$/.test(item)
  })
  return arr.map(item => item.toUpperCase())
}
```

## 43. 合并多个 Map

```ts
function mapConcat<T, U>(...maps: Map<T, U>[]): Map<T, U> {
  const result = new Map<T, U>();

  for (const map of maps) {
    for (const [key, value] of map) {
      result.set(key, value);
    }
  }

  return result;
}
```
