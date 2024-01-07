# 各种排序

## 1. 快速排序

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