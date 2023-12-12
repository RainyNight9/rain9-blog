function formatMoney(num){
  // num = num.toFixed && num.toFixed(2) || num
  // let [int, dec] = num.toString().split('.')
  // int = int.split('')

  // let res = ''
  // int.reverse().forEach((item, index) => {
  //   if(index % 3 === 0 && index !== 0){
  //     res = item + ',' + res
  //   }else{
  //     res = item + res
  //   }
  // })
  // return res + '.' + dec

  // return num.toLocaleString()

  return new Intl.NumberFormat().format(num)
}


console.log(formatMoney(1234567.891))