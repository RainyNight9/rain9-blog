# CDN 容错

## 现象

用户访问不了页面。发现用户 static.xxxx.com 的所有文件都加载失败了

终端 `ping static.xxxx.com` 正常

前端的静态资源访问以cdn为主，但也带来一系列的问题：

1. cdn本身的稳定性问题
2. 用户所在运营商网络问题
3. 用户dns缓存
4. 其他未知问题

这些都可能导致用户加载资源失败，从我们的实时日志来看，每天都有几十、上百例资源加载失败的。

## 解决方案

### 可以先尝试清理用户的dns缓存，或者修改用户路由器的dns解析服务器

- https://test-ipv6.com/index.html.zh_CN 检测用户网络环境是否支持 ipv6
- 尝试清除一下用户本地 dns 缓存，https://jingyan.baidu.com/article/546ae1851b79d51149f28c8d.html

### 前端容错

```html
<script type="text/javascript">
var cdnlist = ['cdn.bootcss2.com', 'cdn.bootcss.com']
function handleCDNError(dom, index) {
    var index = index || 0;
    var newsrc = dom.getAttribute('src').replace(/:\/\/[\w|.]+\//, '://'+ cdnlist[index] +'/')
    if (index < cdnlist.length - 1) {
        document.write('<script src="'+ newsrc +'" onerror="handleCDNError(this, ' + (index + 1)+')"><\/script>')
    }
    else {
        document.write('<script src="'+ newsrc +'"><\/script>')
    }
}
</script>
<script type="text/javascript" src="https://cdn.bootcss1.com/jquery/3.3.1/jquery.min.js" onerror="handleCDNError(this)"></script>
```
