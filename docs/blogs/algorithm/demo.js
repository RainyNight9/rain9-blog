// 高并发控制函数
function multiRequest(urls, max){
  const len = urls.length
  const res = new Array(len).fill(false)
  let count = 0

  return new Promise((resolve, reject)=>{
    if(count<max){
      next()
    }

    function next(){
      const cur = count++
      if(cur>len){
        !res.includes(false) && resolve(res)
        return;
      }
      fetch(urls[cur]).then(data=>{
        res[cur] = data
        next()
      })
    }
  })
}


// Promise模拟接口异步请求
function fetch(url) {
  return new Promise(resolve => {
      setTimeout(() => {
          console.log(url);
          resolve('data:' + url);
      }, 2000);
  });
}

// 高并发调用，
// 参数1：接口请求地址数组，
// 参数2：控制并发数量
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