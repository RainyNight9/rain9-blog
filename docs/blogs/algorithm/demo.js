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

// 测试用例：
console.log(lengthOfLongestSubstring("abcabcbb"));   // 