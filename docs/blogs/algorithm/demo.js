function myFlat(arr){
  let res = []

  for(let i=0; i<arr.length; i++){
    let item = arr[i]
    if(Array.isArray(item)){
      res = res.concat(myFlat(item))
    } else {
      res.push(item)
    }
  }
  return res
}

function myFlat(arr){
  return arr.reduce((pre, cur)=>{
    return pre.concat(Array.isArray(cur) ? myFlat(cur) : cur)
  }, [])
}

function myFlat(arr){
  while(arr.some(item=> Array.isArray(item))){
    arr = [].concat(...arr)
  }

  return arr
}

function myFlat(arr){
  return arr.toString().split(',')
}

function myFlat(arr){
  return arr.flat(Infinity)
}

function myFlat(arr){
  let str = JSON.stringify(arr)
  str = str.replace(/(\[|\])/g, '')
  str = '[' + str + ']'
  return JSON.parse(str)
}