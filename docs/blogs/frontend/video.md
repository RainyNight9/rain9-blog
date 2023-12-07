# video

## 第三方浏览器 video 拦截

手机大部分浏览器，强制性劫持 video 标签，引起的问题：

### h5 页面嵌入 webview 浏览器，video 标签脱离文档流的问题

1. video 标签所有的父级不能使用 position：absolute 属性。
2. video 标签需要设置的属性：

- IOS 微信浏览器是 Chrome 内核
- 安卓微信浏览器是 X5 内核
- webkit-playsinline="true"  // *这个属性是 ios 10 中设置可以让视频在小窗内播放
- x5-playsinline="true" // 禁用全屏
- x5-video-player-type="h5"  // 启用 H5 播放器,是 wechat 安卓版特性
- playsinline="true"  // IOS 微信浏览器支持小窗内播放
- x5-video-player-fullscreen="true" // 全屏设置，设置为 true 是防止横屏
- x5-video-orientation="h5" // 播放器支付的方向，landscape横屏，portraint竖屏，默认值为竖屏
- preload="auto" // 这个属性规定页面加载完成后载入视频

经过尝试，在 iOS 下，可以给 video 添加 webkit-playsinline 属性，使视频在页面上原本位置播放，但这个属性在安卓上无效。

IOS 微信浏览器是 Chrome 内核，大部分属性都支持，安卓微信浏览器是 X5 内核，一些属性是不支持的，比如可以设置局部播放的属性 playsinline，因此，始终是全屏。

autoplay="autoplay"： 视频自动播放设置，但是有经验的人都应该知道，autoplay 标签在手机上不兼容，APP 中设置问题导致无法自动播放，无论安卓 或 IOS。需要模拟自动播放只能通过一些事件触发。

webkit-playsinline playsinline：视频播放时局域播放，不脱离文档流 。但是这个属性比较特别， 需要嵌入网页的 APP 比如 WeChat 中 UIwebview 的allowsInlineMediaPlayback = YES webview.allowsInlineMediaPlayback = YES，才能生效。换句话说，如果 APP 不设置，你页面中加了这标签也无效，这也就是为什么安卓手机 WeChat 播放视频总是全屏，因为 APP 不支持 playsinline，而 ISO 的 WeChat 却支持。

这里就要补充下，如果是想做全屏直播或者全屏 H5 体验的用户，ISO 需要设置删除 webkit-playsinline 标签，因为你设置 false 是不支持的 ，安卓则不需要，因为默认全屏。但这时候全屏是有播放控件的，无论你有没有设置 control。 做直播的可能用得着播放控件，但是全屏 H5 是不需要的，那么去除全屏播放时候的控件，需要以下设置：同层播放。

x5-video-player-type：启用同层 H5 播放器，就是在视频全屏的时候，div 可以呈现在视频层上，也是 WeChat 安卓版特有的属性。同层播放别名也叫做沉浸式播放，播放的时候看似全屏，但是已经除去了 control 和微信的导航栏，只留下 "X"和"<" 两键。目前的同层播放器只在 Android（包括微信）上生效，暂时不支持iOS。

笔者想过为什么同层播放只对安卓开放，因为安卓不能像 ISO 一样局域播放，默认的全屏会使得一些界面操作被阻拦，如果是全屏 H5 还好，但是做直播的话，诸如弹幕那样的功能就无法实现了，所以这时候同层播放的概念就解决了这个问题。不过笔者在测试的过程中发现，不同版本的 ISO 和安卓效果略有不同。

x5-video-orientation：声明播放器支持的方向，可选值 landscape 横屏, portraint 竖屏。默认值 portraint。无论是直播还是全屏 H5一般都是竖屏播放，但是这个属性需要 x5-video-player-type 开启 H5 模式
