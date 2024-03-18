var ErrorJson = {
  PARAM_ERROR: {
    errorNo: 10001,
    errorMsg: '参数类型错误，需传递端內定义方法名'
  },
  CALLBACK_FUNC_ERROR: {
    errorNo: 10002,
    errorMsg: '回调方法执行错误，请查看定义的回调函数'
  },
  NO_MOBILE_FUNC_ERROR: {
    errorNo: 10003,
    errorMsg: '端內没有对应方法，请查看方法名是否正确'
  }
}

var jsBridge = function (funcName, data, callback) {
  if (typeof funcName !== 'string') {
    return errMsg(ErrorJson.PARAM_ERROR);
  }
  data = data || {};
  var callbackName = ''
  if (callback) {
    callbackName = funcName + 'cb' + Math.floor((Math.random() * 1000) + 1);
    window[callbackName] = function (res) {
      try {
        console.log(res)
        callback(res);
      } catch (err) {
        errMsg(ErrorJson.CALLBACK_FUNC_ERROR);
      }
      delete window[callbackName];
    };
  }
  // data = JSON.parse(data)
  var dataJSON = {
    callbackid: callbackName,
    data: data,
  }
  console.log(dataJSON, 'dataJSON988788')
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[funcName]) {
    // for IOS
    window.webkit.messageHandlers[funcName].postMessage(dataJSON);
  } else if (window.MutualAppH5DTO && window.MutualAppH5DTO[funcName]) {
    var dataJsonStr = JSON.stringify(dataJSON)
    console.log(funcName, 'window3232133213131312', dataJsonStr)
    window.MutualAppH5DTO[funcName](dataJsonStr);
  } else {
    return errMsg(ErrorJson.NO_MOBILE_FUNC_ERROR);
  }
}

var errMsg = function (err) {
  console.error('SQBridge Error:' + err.errorMsg)
  return err;
}
