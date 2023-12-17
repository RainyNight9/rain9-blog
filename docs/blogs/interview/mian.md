# mian

## xc

1. 自我介绍
2. 算法：将数字每千分位用逗号隔开
3. nextTick
4. Vue里 template 到 render 经过哪些步骤
5. vue 源码
6. 混合开发
7. 项目亮点

## mc

1. 自我介绍
2. 手写：手写 allSettled
3. 手写：合并多个 Map mapConcat
4. 手写：ts 范型 infer Map<k, v>
5. JSbridge
6. 性能优化

## aljk

1. 继承
2. 闭包
3. 原型
4. 安全
5. 基础数据类型、类型判断
6. 

## zx

// let a = {name: '张三', b: {name：‘李四’}}
// a.name = '王五'
// console.log(a.b.name) //王五


// let a = {name: '张三', b: { name: '李四' }}
// a.name = '王五'

// a.b.nama = a.name
// console.log(a.b.name)

// let a = { a: 1, b: [ 4,3,2,1, {name: 'zhangan'}]}

// let { b: [,,,, {name}]} = a
// console.log(name)

// 二  给你一个字符串，只包含{} [] (),字符串会随机嵌套，请你帮忙判断一下字符串是否闭合，是否合法；
// 如果闭合且合法输出true，否则输出false
// 合法规则：{} [] () 依次嵌套，可同级嵌套；
// 示例1：
// 示例 1：
// 输入：arr = {[()]}  闭合且合法
// 输出：true

// 示例 2：
// 输入：arr = {[(())]}  闭合且合法
// 输出：true

// 示例 3：
// 输入：arr = {[()}  未闭合
// 输出：false

// 示例 4：
// 输入：arr = {([()])}  出现（）嵌套[]的情况，不合法
// 输出：false

// function isCloseString(str){
//   let stack = []
//   let map = {
//     ')': '(',
//     ']': '[',
//     '}': '{',
//   }

//   let order = '{[('

//   for(let i=0; i<str.length; i++){
//     let item = str[i]
//     if(item === '(' || item === '{' || item === '['){
//       if(stack.length > 0 && order.indexOf(item) <= order.indexOf(map[stack[stack.length-1]])) {
//         return false
//       }
//       stack.push(item)
//     }else if(stack.length===0 || map[item] !== stack[stack.length-1]){
//       return false
//     }else if(map[item] === stack[stack.length - 1]){
//       stack.pop()
//     }
//   }

//   return stack.length === 0
// }

// console.log(isCloseString('{[()]}'))
// console.log(isCloseString('{[(())]}'))
// console.log(4444, isCloseString('{([()])}'))


// 编写一个函数来查找字符串数组中的最长公共前缀。
// 如果不存在公共前缀，返回空字符串 ""。
// 示例 1:
// 输入: ["flower","flow","flight"]
// 输出: "fl"
// 示例 2:
// 输入: ["dog","racecar","car"]
// 输出: ""

// function getCommonPrefixString(arr){
//   if(arr.length === 0) return ''

//   for(let i=0; i<arr[0].length; i++){
//     let c = arr[0].charAt(i)

//     for(let j=1; j<arr.length; j++){
//       if(i === arr[j].length || arr[j].charAt(i) != c) {
//         return arr[0].substring(0, i)
//       }
//     }
//   }

//   return arr[0]
// }

// console.log(getCommonPrefixString(["flower","flow","flight"]))
// console.log(getCommonPrefixString(["dog","racecar","car"]))

## yqg

## mtdj
