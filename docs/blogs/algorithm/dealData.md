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

## 5. 数组去重

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

```js
// js 实现有序数组原地去重
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
```

## 6. 合并多个 Map

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

## 7. 嵌套括号

- 给你一个字符串，只包含{} [] (),字符串会随机嵌套，请你帮忙判断一下字符串是否闭合，是否合法；
- 如果闭合且合法输出true，否则输出false
- 合法规则：{} [] () 依次嵌套，可同级嵌套；

- 示例 1：
- 输入：arr = {[()]}  闭合且合法
- 输出：true

- 示例 2：
- 输入：arr = {[(())]}  闭合且合法
- 输出：true

- 示例 3：
- 输入：arr = {[()}  未闭合
- 输出：false

- 示例 4：
- 输入：arr = {([()])}  出现（）嵌套[]的情况，不合法
- 输出：false

```js
function isValid(s) {
  const stack = [];
  const map = {
      '(': ')',
      '[': ']',
      '{': '}'
  };

  for (let i = 0; i < s.length; i++) {
      const item = s[i]
      if (item === '{' && !stack.includes('[') && !stack.includes('(')) {
        stack.push(item);
      } else if (item === '[' && !stack.includes('(')) {
        stack.push(item);
      } else if (item === '(') {
        stack.push(item);
      } else {
          let topElement = stack.length !== 0 ? stack.pop() : '#';
          if (item !== map[topElement]) {
              return false;
          }
      }
  }
  return !stack.length;
}

console.log(isValid('{[()]}'));     // 输出：true
console.log(isValid('{[(())]}'));   // 输出：true
console.log(isValid('{[()}'));      // 输出：false
console.log(isValid('{([()])}'));   // 输出：false 
```

## 8. 最长公共前缀

- 编写一个函数来查找字符串数组中的最长公共前缀。
- 如果不存在公共前缀，返回空字符串 ""。

- 示例 1:
- 输入: ["flower","flow","flight"]
- 输出: "fl"

- 示例 2:
- 输入: ["dog","racecar","car"]
- 输出: ""

```js
function longestCommonPrefix(strs) {
  if (!strs.length) return "";
  let prefix = strs[0];
  
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (!prefix) return "";
    }
  }
  return prefix;
}

// 测试用例
console.log(longestCommonPrefix(["flower","flow","flight"])); // 输出: "fl"
console.log(longestCommonPrefix(["dog","racecar","car"])); // 输出: ""
```

## 9. deleteABCD

输入是一个仅由大写英文字母组成的字符串。您需要把字符串中所有的连续 "AB" 和 "CD" 子串进行删除，直到不再包含连续 "AB" 和 "CD" 子串后，返回字符串的长度。

注意：

1.删除字符串后可能会导致新的连续"AB"和"CD"字符串，例如AABB，最终返回为0。
2.只需要最后返回正确结果即可，不需要真正对字符串进行删除操作

代码复杂度要求：o(n)

例子： 
- s = AAABCDBE
- 删除AB
- AACDBE
- 删除CD
- AABE
- 删除AB
- AE

```js
function remove(s) {
    let stack = [];
    for(let i=0; i<s.length; i++) {
        if(stack.length > 0 && ((s[i] === 'B' && stack[stack.length-1] === 'A') || (s[i] === 'D' && stack[stack.length-1] === 'C'))) {
            stack.pop();
        } else {
            stack.push(s[i]);
        }
    }
    return stack.length;
}
let s = "AAABCDBE";
console.log(remove(s)); // 输出：2
```

## 10. 数组中对称项有几个

const arr = ['AB', 'BA', 'XX', 'BA', 'AB', 'CD', 'XX', 'AB']

1. (i, j) i < j
2. arr[i] 和 arr[j] 是对称的
3. 输出有多少对？7

```js
function countPairs(arr) {
    const map = new Map();
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        const str = arr[i];
        const reversedStr = str.split('').reverse().join('');

        if (map.has(reversedStr)) {
            count += map.get(reversedStr);
        }

        if (!map.has(str)) map.set(str, 0);
        map.set(str, map.get(str) + 1);
    }
    return count;
}

const arr = ['AB', 'BA', 'XX', 'BA', 'AB', 'CD', 'XX', 'AB'];
console.log(countPairs(arr)); // 输出结果为7
```

## 11. 股票最大利润

- 数组
- 输入：[7,1,5,3,6,4]
- 输出：5
- 解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
- 注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

```js
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;

    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }

    return maxProfit;
}

console.log(maxProfit([7,1,5,3,6,4])); // 输出: 5
```

## 12. 字符串翻转

```js
function reverse(str){
  return str.split("").reverse().join("")
}
```

## 13. 千分位隔开，钱，金额，money

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

## 15. 对象转树形

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

## 16. 树转数组

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

## 17. 数组转树

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


## 18. 解析 URL Params 为对象

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

## 19. 数组元素偏移

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

## 20. 函数 fn({start,success,fail}) 可以 catch/then 的链式调用

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

## 21. 一个有序的数组，给定一个目标值，找到两个数组中的元素相加为目标值。要求：一次循环

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

## 22. 求树的深度，先写一个树的结构

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

## 23. 最长不重复字符串

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

## 24. 二分查找

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

## 27. 计算数组中时间的平均时间

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

## 28. 间隔执行函数

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

## 29. 不定长二维数组的全排列

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

## 30. 两个字符串对比，得出结论都做了什么操作？插入什么？删除什么？

```js
pre = 'abcde123'
cur = '1abc123'


function diffAction(pre, cur){

}
```

## 31. 从数组中，获取最小正数的索引值

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

## 32. 实现一个等待函数，支持让 async 函数在执行时暂停一段时间，函数的入参为暂停的时间

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

## 33. 使用正则，筛选出数组中只包含大小写字母的字符串，并将结果转大写

```js
function filterArr(arr){
  arr = arr.filter(item => {
    return /^[A-Za-z]+$/.test(item)
  })
  return arr.map(item => item.toUpperCase())
}
```

