import{_ as i,o as a,c as e,a as r}from"./app-b5df4a4f.js";const h={};function d(n,l){return a(),e("div",null,l[0]||(l[0]=[r('<h1 id="go" tabindex="-1"><a class="header-anchor" href="#go" aria-hidden="true">#</a> Go</h1><p>官方文档：https://go.dev/</p><h2 id="什么是-go-语言" tabindex="-1"><a class="header-anchor" href="#什么是-go-语言" aria-hidden="true">#</a> 什么是 Go 语言？</h2><ol><li>高性能、高并发</li><li>语法简单、学习曲线平缓</li><li>丰富的标准库</li><li>完善的工具链</li><li>静态链接</li><li>快速编译</li><li>跨平台</li><li>垃圾回收</li></ol><h2 id="常用标准库" tabindex="-1"><a class="header-anchor" href="#常用标准库" aria-hidden="true">#</a> 常用标准库</h2><h3 id="功能型" tabindex="-1"><a class="header-anchor" href="#功能型" aria-hidden="true">#</a> 功能型</h3><p>net、errors、os、sync、time</p><h3 id="输入输出型" tabindex="-1"><a class="header-anchor" href="#输入输出型" aria-hidden="true">#</a> 输入输出型</h3><p>io、fmt、log、strconv、strings、encoding</p><h2 id="常用工具储备" tabindex="-1"><a class="header-anchor" href="#常用工具储备" aria-hidden="true">#</a> 常用工具储备</h2><p>敏捷开发</p><p>mysql、mgo、redigo、web 框架、goini(配置文件)、zap(日志)、sarama 性能排查</p><p>pprof、go-torch、GOM</p><h2 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> map</h2><ul><li>make map</li><li>非线程安全</li><li>扩容</li><li>无序</li></ul><h2 id="slice" tabindex="-1"><a class="header-anchor" href="#slice" aria-hidden="true">#</a> slice</h2><ul><li>make slice <ul><li>len、cap</li></ul></li><li>底层结构</li><li>复制/基于创建</li><li>非线程安全</li><li>deep copy</li></ul><h2 id="channel" tabindex="-1"><a class="header-anchor" href="#channel" aria-hidden="true">#</a> channel</h2><ul><li>并发模型 Actor &amp; CSP <ul><li>Erlang</li><li>Go</li></ul></li><li>channel实现原理和特性 <ol><li>全局锁</li><li>移入/移出元素(移动拷贝)</li></ol></li><li>Named channel</li></ul><h2 id="开发高可用健壮应用" tabindex="-1"><a class="header-anchor" href="#开发高可用健壮应用" aria-hidden="true">#</a> 开发高可用健壮应用</h2><ul><li>单元测试 <ul><li>函数通过率</li><li>覆盖率</li></ul></li><li>竞争检测 <ul><li>go build -race</li></ul></li><li>死锁检测</li></ul><h2 id="协程" tabindex="-1"><a class="header-anchor" href="#协程" aria-hidden="true">#</a> 协程</h2><ul><li>GMP 工作原理</li><li>生命周期 <ul><li>超时、安全退出、并发安全</li></ul></li><li>常见问题排查 <ul><li>pprof</li><li>火焰图</li><li>go tool trace</li><li>GDB</li></ul></li></ul><h2 id="runtime" tabindex="-1"><a class="header-anchor" href="#runtime" aria-hidden="true">#</a> runtime</h2><ul><li>GMP 调度 <ul><li>GM-&gt;GMP</li></ul></li><li>什么时候会阻塞?会触发 schedule? <ul><li>sleep</li><li>等待 lock、channel</li><li>runtime.schedule()</li><li>系统调用</li></ul></li><li>epoll</li></ul><h2 id="垃圾回收" tabindex="-1"><a class="header-anchor" href="#垃圾回收" aria-hidden="true">#</a> 垃圾回收</h2><ul><li>mark sweep STW</li><li>三色并发标记工作机制</li><li>屏障技术</li><li>插入屏障</li><li>删除屏障</li><li>混合写屏障</li><li>常见问题分析 <ul><li>trace 样本快照</li><li>GODEBUG=gctrace=1,gcpacertrace=1</li></ul></li></ul><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><ul><li>通过 GMP 模型+抢占式调度+Work Stealing，把大量工作分配到少部分线程</li><li>Golang 通过 Channel 实现协程间通信(CSP)</li><li>通过灵活运用 Channel，可以控制协程数量、任务状态</li><li>在线程安全上，支持读写锁/互斥锁/原子操作/信号量</li><li>数字线程安全操作尽量使用原子操作，性能高</li><li>非分代、非紧缩、混合写屏障、并发标记清理的 GC</li></ul><h2 id="工程化" tabindex="-1"><a class="header-anchor" href="#工程化" aria-hidden="true">#</a> 工程化</h2><ul><li>选择合适框架，web-API、RPC、IM-Push</li><li>依赖/模块管理，gopath、vendor、gomod</li></ul><h2 id="微服务" tabindex="-1"><a class="header-anchor" href="#微服务" aria-hidden="true">#</a> 微服务</h2><ul><li>微服务框架</li><li>服务治理</li><li>网关</li><li>部署</li></ul><h2 id="小结-1" tabindex="-1"><a class="header-anchor" href="#小结-1" aria-hidden="true">#</a> 小结</h2><ul><li>框架(微服务框架/工程框架) MVC架构</li><li>Docker、Kubernetes</li><li>服务治理、服务发现</li><li>网关、中间件</li></ul><h2 id="个人发展方向" tabindex="-1"><a class="header-anchor" href="#个人发展方向" aria-hidden="true">#</a> 个人发展方向</h2><ul><li>服务端工程师(业务)</li><li>基础架构/服务等方向，中间件(网关、数据库中间件，服务发现等)</li><li>架构师，稳定性，内核，多参与开源项目</li></ul>',37)]))}const t=i(h,[["render",d],["__file","go.html.vue"]]);export{t as default};