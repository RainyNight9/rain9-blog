# 后端

> 按主题分层组织。快速找文章用右侧侧边栏；想系统补强，推荐顺序：语言 → 框架 → 数据 → 运维。

## 语言与运行时

| 语言 | 站内笔记 | 定位一句话 |
|------|----------|------------|
| Node.js | [node 相关](./node.md) · [事件循环（掘金）](https://juejin.cn/post/7109864753937252389) · [前端必会的 Node（掘金）](https://juejin.cn/post/7059192076793020430) | 全栈同构、BFF 与实时 IO |
| Rust | [rust](./rust.md) | 系统级性能与内存安全 |
| Go | [go](./go.md) | 云原生与高并发服务 |
| **Python** | [Python 后端开发指南](./python.md) | FastAPI/Django 与 AI 生态 |
| Java | [java](./java.md) | 企业级与大数据 |

▶ 不知道选哪个？读 [后端语言选型对比](./language-selection.md)（并发模型、性能与部署、场景速配）。

## 框架与工程化

1. [Nest.js 体系化整理](./nest.md) · [Nest（掘金）](https://juejin.cn/post/7323251349301755967)
2. [Nuxt](./nuxt.md) · [Next](./next.md)
3. [Git 常用命令](./git.md)

## 架构与网关

1. [后端架构设计](./后端架构设计.md)
2. [网关 Gateway](./gateway.md)
3. [认证与鉴权](./auth.md)（Session/JWT/OAuth2/OIDC 与 SSO、RBAC/ABAC）
4. [实时通信](./websocket.md)（WebSocket/SSE 选型、心跳重连、横向扩展）
5. [经典系统设计题](./system-design.md)（短链/秒杀/Feed 流/分布式 ID）

## 数据与中间件

1. [PostgreSQL](./PostgreSQL.md)
2. [MySQL 核心知识体系](./mysql.md)（事务/MVCC/索引/锁/日志/主从）
3. [MongoDB](./mongodb.md)（文档建模/副本集/分片/聚合）
4. [Redis 核心知识体系](./redis.md)（缓存三大问题/分布式锁/哨兵与集群）
5. [ElasticSearch](./ElasticSearch.md)
6. [消息队列：Kafka 与 RabbitMQ](./mq.md)（丢失/重复/顺序三题）

## 运维与部署

1. [Docker 从入门到生产](./docker.md)（镜像分层/Dockerfile 最佳实践/网络存储）
2. [Kubernetes 入门到上手](./k8s.md)（核心对象/探针/滚动更新/排障）
3. [CI/CD：GitHub Actions](./ci-cd.md)（流水线/镜像发布/环境审批/回滚）
4. [可观测性](./observability.md)（日志/指标/链路追踪、Prometheus 与 OTel、SLO）
5. [Linux](./linux.md)
6. [Nginx](./Nginx.md)
