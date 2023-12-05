# 数据处理手写题

## 1. 实现日期格式化函数

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

## 3. 实现数组的乱序输出

```js
for(let i=0; i<arr.length; i++){
  const random = Math.floor(Math.random() * (arr.length-1-i)) + i

  [arr[i], arr[random]] = [arr[random], arr[i]]
}
```

## 4. 实现数组元素求和

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

## 5. 实现数组的扁平化

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

## 6. 实现数组去重

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

## 7. 实现数组的 flat 方法

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

## 8. 实现数组的 push 方法

```js
Array.prototype.myPush = () => {
  for(let i=0; i<arguments.length; i++){
    this[this.length] = arguments[i]
  }
  return this.length
}
```

## 9. 实现数组的 filter 方法

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

## 10. 实现数组的 map 方法

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

## 11. 实现字符串的 repeat 方法

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

## 12. 实现字符串翻转

```js
function reverse(str){
  return str.split("").reverse().join("")
}
```

## 13. 将数字每千分位用逗号隔开

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

## 14. 实现类数组转化为数组

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
