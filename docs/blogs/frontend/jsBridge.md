# JSBridge

## 什么是 JSBridge

主要是给 JavaScript 提供调用 Native 功能的接口，让混合开发中的前端部分可以方便地使用 Native 的功能（例如：地址位置、摄像头）。

而且 JSBridge 的功能不止调用 Native 功能这么简单宽泛。实际上，JSBridge 就像其名称中的 Bridge 的意义一样，是 Native 和非 Native 之间的桥梁，它的核心是构建 Native 和非 Native 间消息通信的通道，而且这个通信的通道是双向的。

**双向通信的通道:**

- JS 向 Native 发送消息: 调用相关功能、通知 Native 当前 JS 的相关状态等。
- Native 向 JS 发送消息: 回溯调用结果、消息推送、通知 JS 当前 Native 的状态等

***整个 JSBridge 是分层的：1、接口层，2、API层的原理，3、最底层的原理***

***最底层的原理其实就是浏览器暴露给原生的句柄，在不同平台上，浏览器暴露给原生句柄的方式各不相同：ios有n种， 安卓有n种，pc有n种***

## Android、iOS 原生和 H5 的基本通信机制

在 Hybrid APP 中，原生与 H5 的交互方式在 Android 和 iOS 上的实现是有异同的, 原因是 Android、iOS 的通信机制有所区别，下面介绍原生和 H5 相互调用的方法。

**Android 端：**

Native 调 JS：

4.4版本之前

```js
// mWebView = new WebView(this); // 即当前 webview 对象        
mWebView.loadUrl("javascript: 方法名('参数,需要转为字符串')");
 
// ui线程中运行
runOnUiThread(new Runnable() { 
  @Override 
  public void run() { 
      mWebView.loadUrl("javascript: 方法名('参数,需要转为字符串')"); 
      Toast.makeText(Activity名.this, "调用方法...", Toast.LENGTH_SHORT).show(); 
  } 
});
```

4.4 以后(包括 4.4)

```js
//异步执行JS代码,并获取返回值  
mWebView.evaluateJavascript("javascript: 方法名('参数,需要转为字符串')", new ValueCallback() {
  @Override
  public void onReceiveValue(String value) {
      //这里的value即为对应JS方法的返回值
  }
});
```

如上所示，Native 用 H5 页面中的 JS 方法，有如下特点

- 4.4 之前 Native 通过 `loadUrl` 来调用 JS 方法，只能让某个 JS 方法执行，但是无法获取该方法的返回值
- 4.4 之后，通过 `evaluateJavascript` 异步调用 JS 方法，并且能在 `onReceiveValue` 中拿到返回值
- 不适合传输大量数据(大量数据建议用接口方式获取)
- `mWebView.loadUrl("javascript: 方法名('参数,需要转为字符串')")`;函数需在 UI 线程运行，因为 mWebView 为 UI 控件(但是有一个坏处是会阻塞 UI 线程)

JS 调 Native

```js
WebSettings = mWebView.getSettings(); 
 // Android 容器允许 JS 脚本，必须要
webSettings.setJavaScriptEnabled(true);
// Android 容器设置侨连对象
mWebView.addJavascriptInterface(getJSBridge(), "JSBridge");
```

Android中JSBridge的代码

```js
// Android4.2 版本以上，本地方法要加上注解 @JavascriptInterface，否则会找不到方法。
private Object getJSBridge(){ 
    Object insertObj = new Object(){ 
        @JavascriptInterface
        public String foo(){ 
            return "foo"; 
        }
        @JavascriptInterface
        public String foo2(final String param){ 
            return "foo2:" + param; 
        } 
    }; 
    return insertObj; 
}
```

Html 中 JS 调用原生的代码

```js
// 调用方法一
window.JSBridge.foo(); // 返回:'foo'
// 调用方法二
window.JSBridge.foo2('test'); // 返回:'foo2:test'
```

如上所示，Native 中通过 addJavascriptInterface 添加暴露出来的 JSBridge 对象，然后再该对象内部声明对应的 API 方法，有如下特点:

- 在 Android4.2 以上(api17 后),暴露的 api 要加上注解 @JavascriptInterface，否则会找不到方法。
- 在 api17 以前，addJavascriptInterface 有风险，hacker 可以通过反编译获取 Native 注册的 Js 对象，然后在页面通过反射 Java 的内置 静态类，获取一些敏感的信息和破坏
  - 所以,也就是为什么 Android 中也会使用 JSBridge 来进行交互,而不是 addJavascriptInterface 直接暴露 api
- JS 能调用到已经暴露的 api, 并且能得到相应返回值.

**iOS端:**

Native 调 JS

```js
// 可以取得JS函数执行的返回值
// 方法必须是Html页面绑定在最顶层的 window 上对象的
// 如 window.top.foo
// Swift
webview.stringByEvaluatingJavaScriptFromString("方法名(参数)")
// OC
[webView stringByEvaluatingJavaScriptFromString:@"方法名(参数);"];
```

如上所示，Native 通过 stringByEvaluatingJavaScriptFromString 调用 Html 绑定在 window 上的函数，有如下特点

- Native 调用 JS 方法时,能拿到 JS 方法的返回值
- 不适合传输大量数据(大量数据建议用接口方式获取)

JS 调 Native

引入官方的库文件

```js
#import <JavaScriptCore/JavaScriptCore.h>
```

Native 注册 api 函数(OC)

```js
// webview加载完毕后设置一些js接口
-(void)webViewDidFinishLoad:(UIWebView *)webView{
    [self hideProgress];
    [self setJSInterface];
}
 
-(void)setJSInterface{
     
    JSContext *context =[_wv valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
     
    // 注册名为foo的api方法
    context[@"foo"] = ^() {
         
        // 获取参数
        NSArray *args = [JSContext currentArguments];
        NSString *title = [NSString stringWithFormat:@"%@",[args objectAtIndex:0]];
        // 做一些自己的逻辑
        // 返回一个值  'foo:'+title
        return [NSString stringWithFormat:@"foo:%@", title];
    };  
}              
```

Html 中 JS 调用原生的代码

```js
// 调用方法,用top是确保调用到最顶级,因为iframe要用top才能拿到顶级
window.top.foo('test'); // 返回:'foo:test'
```

如上所示，Native 中通过引入官方提供的 JavaScriptCore 库(iOS7 中出现的)，然后可以将 api 绑定到J SContext 上(然后 Html 中 JS 默认通过 window.top.***可调用)。有如下特点:

- iOS7 才出现这种方式，在这之前，js 无法直接调用 Native，只能通过 JSBridge 方式简介调用
- JS 能调用到已经暴露的 api，并且能得到相应返回值
- iOS 原生本身是无法被 JS 调用的，但是通过引入官方提供的第三方 "JavaScriptCore"，即可开放 api 给 JS 调用

## JSBridge 原理

JSBridge 是广为流行的 Hybrid 开发中 JS 和 Native 一种通信方式，各大公司的应用中都有用到这种方法

简单的说，JSBridge 就是定义 Native 和 JS 的通信，Native 只通过一个固定的桥对象调用 JS，JS 也只通过固定的桥对象调用 Native。

### 1、JavaScript 调用 Native 的方式

主要有两种：注入 API 和 拦截 URL SCHEME。

#### 1.1 注入API

注入 API 方式的主要原理是，通过 WebView 提供的接口，向 JavaScript 的环境（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的。

对于 iOS 的 UIWebView，实例如下：

```js
JSContext *context = [uiWebView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
context[@"postBridgeMessage"] = ^(NSArray<NSArray *> *calls) {
    // Native 逻辑
};

// 前端调用方式：
window.postBridgeMessage(message);
```

对于 iOS 的 WKWebView 可以用以下方式：

```js
@interface WKWebVIewVC ()<WKScriptMessageHandler>
@implementation WKWebVIewVC
- (void)viewDidLoad {
    [super viewDidLoad];
    WKWebViewConfiguration* configuration = [[WKWebViewConfiguration alloc] init];
    configuration.userContentController = [[WKUserContentController alloc] init];
    WKUserContentController *userCC = configuration.userContentController;
    // 注入对象，前端调用其方法时，Native 可以捕获到
    [userCC addScriptMessageHandler:self name:@"nativeBridge"];
    WKWebView wkWebView = [[WKWebView alloc] initWithFrame:self.view.frame configuration:configuration];
    // TODO 显示 WebView
}
- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
    if ([message.name isEqualToString:@"nativeBridge"]) {
        NSLog(@"前端传递的数据 %@: ",message.body);
        // Native 逻辑
    }
}
 
// 前端调用方式：
window.webkit.messageHandlers.nativeBridge.postMessage(message);
```

#### 1.2 拦截 URL SCHEME

URL SCHEME 是一种类似于 url 的链接，是为了方便 app 直接互相调用设计的，形式和普通的 url 近似，主要区别是 protocol 和 host 一般是自定义的。

例如: qunarhy://hy/url?url=ymfe.tech，protocol 是 qunarhy，host 则是 hy。

拦截 URL SCHEME 的主要流程是：

- Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，
- 之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作。

在时间过程中，这种方式有一定的缺陷：

- 使用 iframe.src 发送 URL SCHEME 会有 url 长度的隐患。
  - 有些方案为了规避 url 长度隐患的缺陷，在 iOS 上采用了使用 Ajax 发送同域请求的方式，并将参数放到 head 或 body 里。这样，虽然规避了 url 长度的隐患，但是 WKWebView 并不支持这样的方式。
  - 为什么选择 iframe.src 不选择 locaiton.href ？
    - 因为如果通过 location.href 连续调用 Native，很容易丢失一些调用。
- 创建请求，需要一定的耗时，比注入 API 的方式调用同样的功能，耗时会较长。

**因此：JavaScript 调用 Native 推荐使用注入 API 的方式。**

### 2. Native 调用 JavaScript 的方式

相比于 JavaScript 调用 Native， Native 调用 JavaScript 较为简单，直接执行拼接好的 JavaScript 代码即可。

从外部调用 JavaScript 中的方法，因此 JavaScript 的方法必须在全局的 window 上。

对于 iOS 的 UIWebView，示例如下：

```js
result = [uiWebview stringByEvaluatingJavaScriptFromString:javaScriptString];
 
* javaScriptString为JavaScript 代码串
```

对于 iOS 的 WKWebView，示例如下：

```js
[wkWebView evaluateJavaScript:javaScriptString completionHandler:completionHandler];
```

## JSBridge 接口实现

从上面的剖析中，可以得知，JSBridge 的接口主要功能有两个：

- 调用 Native（给 Native 发消息）
- 被 Native 调用（接收 Native 消息）

在 Native 端配合实现 JSBridge 的 JavaScript 调用 Native 逻辑也很简单，主要的代码逻辑是：

接收到 JavaScript 消息 => 解析参数，拿到 bridgeName、data 和 callbackId => 根据 bridgeName 找到功能方法，以 data 为参数执行 => 执行返回值和 callbackId 一起回传前端。

Native 调用 JavaScript 也同样简单，直接自动生成一个唯一的 ResponseId，并存储，然后和 data 一起发送给前端即可。

## JSBridge 的引用

对于 JSBridge 的引用，常用有如下两种方式，但各有利弊。

### 1、由 Native 端进行注入

注入方式和 Native 调用 JavaScript 类似，直接执行桥的全部代码。

它的优点是：

- 桥的版本很容易与 Native 保持一致，Native 端不用对不同版本的 JSBridge 进行兼容。

它的缺点是：

- 注入时机不确定，需要实现注入失败后重试的机制，保证注入的成功率，同时 JavaScript 端在调用接口时，需要优先判断 JSBridge 是否已经注入成功。

### 2、由 JavaScript 端引用

直接与 JavaScript 一起执行。

它的优点是：

- JavaScript 端可以确定 JSBridge 的存在，直接调用即可。

它的缺点是：

- 如果桥的实现方式有更改，JSBridge 需要兼容多版本的 Native Bridge 或者 Native Bridge 兼容多版本的 JSBridge。

## 参考资料

1、https://blog.csdn.net/yuzhengfei7/article/details/93468914

2、https://blog.csdn.net/u010782846/article/details/91895132

3、https://juejin.im/post/6844903567560540173

4、https://zhuanlan.zhihu.com/p/32899522

5、https://www.cnblogs.com/dailc/p/5931322.html
