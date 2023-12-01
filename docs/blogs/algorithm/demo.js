function getType(value){
  if(value === null) {
    return value + ''
  }

  if(typeof value === 'object') {
    let typeArray = Object.prototype.toString.call(value)
    let type  = typeArray.split(" ")[1].split("")
    console.log(type)
    type.pop()
    console.log(type)
    return type.join("").toLowerCase()
  } else {
    return typeof value
  }
}

console.log(getType({a: 1}))
