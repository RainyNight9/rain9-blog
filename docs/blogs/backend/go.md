# Go

官方文档：https://go.dev/

## 什么是 Go 语言？

1. 高性能、高并发
2. 语法简单、学习曲线平缓
3. 丰富的标准库
4. 完善的工具链
5. 静态链接
6. 快速编译
7. 跨平台
8. 垃圾回收


## 常用标准库

### 功能型

net、errors、os、sync、time

### 输入输出型

io、fmt、log、strconv、strings、encoding

## 常用工具储备

敏捷开发

mysql、mgo、redigo、web 框架、goini(配置文件)、zap(日志)、sarama
性能排查

pprof、go-torch、GOM

## map

- make map
- 非线程安全
- 扩容
- 无序

## slice

- make slice
  - len、cap
- 底层结构
- 复制/基于创建
- 非线程安全
- deep copy

## channel

- 并发模型 Actor & CSP
  - Erlang
  - Go
- channel实现原理和特性
  1. 全局锁
  2. 移入/移出元素(移动拷贝)
- Named channel

## 开发高可用健壮应用

- 单元测试
  - 函数通过率
  - 覆盖率
- 竞争检测
  - go build -race
- 死锁检测

## 协程

- GMP 工作原理
- 生命周期
  - 超时、安全退出、并发安全
- 常见问题排查 
  - pprof
  - 火焰图
  - go tool trace
  - GDB

## runtime

- GMP 调度
  - GM->GMP
- 什么时候会阻塞?会触发 schedule?
  - sleep
  - 等待 lock、channel
  - runtime.schedule()
  - 系统调用
- epoll

## 垃圾回收

- mark sweep STW
- 三色并发标记工作机制
- 屏障技术
 - 插入屏障
 - 删除屏障
 - 混合写屏障
- 常见问题分析
  - trace 样本快照
  - GODEBUG=gctrace=1,gcpacertrace=1

## 小结

- 通过 GMP 模型+抢占式调度+Work Stealing，把大量工作分配到少部分线程
- Golang 通过 Channel 实现协程间通信(CSP)
- 通过灵活运用 Channel，可以控制协程数量、任务状态
- 在线程安全上，支持读写锁/互斥锁/原子操作/信号量
- 数字线程安全操作尽量使用原子操作，性能高
- 非分代、非紧缩、混合写屏障、并发标记清理的 GC

## 工程化

- 选择合适框架，web-API、RPC、IM-Push
- 依赖/模块管理，gopath、vendor、gomod

## 微服务

- 微服务框架
- 服务治理
- 网关
- 部署

## 小结

- 框架(微服务框架/工程框架) MVC架构
- Docker、Kubernetes
- 服务治理、服务发现
- 网关、中间件

## 个人发展方向

- 服务端工程师(业务)
- 基础架构/服务等方向，中间件(网关、数据库中间件，服务发现等)
- 架构师，稳定性，内核，多参与开源项目
