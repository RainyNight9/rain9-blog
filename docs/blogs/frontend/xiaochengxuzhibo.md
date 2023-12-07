# 小程序直播

## 基本直播能力

目前小程序支持两种格式直播

- flv 格式直播
- rtmp 格式直播

小程序直播开发要使用到最新的两个组件和两个新接口：

1. live-player组件，主要功能是播放。https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html
2. wx.createLivePlayerContext() 接口，主要控制 live-player 组件的播放。

wx.createLivePlayerContext() 会创建 live-player 上下文 LivePlayerContext 对象。

### 参数

- `string id` live-player 组件的 id
- `Object this` 在自定义组件下，当前组件实例的 this，以操作组件内 live-player 组件

### LivePlayerContext 方法

- `LivePlayerContext.play()` 播放视频，参数是三个回调函数
  - `success`	function	否	接口调用成功的回调函数
  - `fail`	function	否	接口调用失败的回调函数
  - `complete`	function	否	接口调用结束的回调函数（调用成功、失败都会执行）

- `LivePlayerContext.stop()` 停止
  - success	function	否	接口调用成功的回调函数
  - fail	function	否	接口调用失败的回调函数
  - complete	function	否	接口调用结束的回调函数（调用成功、失败都会执行）

- `LivePlayerContext.mute()` 静音
  - success	function	否	接口调用成功的回调函数
  - fail	function	否	接口调用失败的回调函数
  - complete	function	否	接口调用结束的回调函数（调用成功、失败都会执行）

- `LivePlayerContext.pause()` 暂停

- `LivePlayerContext.resume()` 恢复

- `LivePlayerContext.requestFullScreen(Object object)` 进入全屏
  - direction	number	0	否	设置全屏时的方向
    - 0	正常竖向
    - 90	屏幕逆时针90度
    - -90	屏幕顺时针90度
  - success	function	否	接口调用成功的回调函数
  - fail	function	否	接口调用失败的回调函数
  - complete	function	否	接口调用结束的回调函数（调用成功、失败都会执行）

- `LivePlayerContext.exitFullScreen()` 退出全屏

- `LivePlayerContext.exitPictureInPicture()` 退出小窗，该方法可在任意页面调用

## 优网计划额外能力-websocket

```js
wx.connectSocket(Object object)
```

创建一个 WebSocket 连接

- wx.onSocketOpen(function callback) 监听 WebSocket 连接打开事件

- wx.onSocketMessage(function callback) 监听 WebSocket 接受到服务器的消息事件

- wx.onSocketError(function callback) 监听 WebSocket 错误事件

- wx.onSocketClose(function callback) 监听 WebSocket 连接关闭事件

- wx.closeSocket(Object object) 关闭 WebSocket 连接

## 直播小程序要注意的地方

- live-player, live-pusher 组件是由客户端创建的原生组件，它的层级是最高的，不能通过 z-index 控制层级。可使用 cover-view cover-image 覆盖在上面。
