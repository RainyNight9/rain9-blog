# 日志中心

## 简介

日志中心文档：https://cloud.tal.com/docs/logcenter/introduction/

**目标：**

    统一稳定的日志服务
    一站式的日志解决方案

无需关注扩缩容等资源问题，五分钟快速便捷接入，即可享受日志的采集、存储、加工、检索分析、消费投递、生成仪表盘、告警、链路追踪等全方位稳定可靠服务。全面提升问题定位、指标监控的效率，大大降低日志查看的门槛。

**能力：**

提供核心数据**采集投递**、**数据传输**、**搜索查询**、**流式计算**、**离线分析**...

日志服务主要提供以下功能：

- 日志采集：便捷实时采集跨地域、多渠道、多平台、不同数据源的日志数据，轻松支持混合云日志接入。
- 日志存储：提供多种存储类型：热数据存储（elasticsearch）、冷备数据存储（oss）、数据计算数据存储（hdfs）、指标化数据存储（clickhouse）。
- 日志检索分析：使用关键词检索日志，帮助用户快速定位异常日志，同时支持使用 DSL 语句 对日志进行统计分析，获取日志条数随时间变化趋势、错误日志比例等统计指标。
- 日志数据加工：日志过滤、清洗、脱敏、富化、分发、结构化。
- 日志投递与消费：投递到 hdfs、kafka、es、oss、clickhouse，数据消费读取。
- 仪表盘：将检索分析结果快速生成自定义 Dashborad。
- 告警：异常日志实时秒级告警，支持通过知音楼、电话、短信、邮件、微信、和自定义接口回调等方式通知用户。

**生产扩展：**

- 日志数据投递 OSS，满足对日志数据长时间归档存储的需求。
- 日志数据投递 kafka，满足对日志数据实时消费的需求，便于进一步处理分析。
- 日志数据投递 hdfs，满足对日志数据进行离线数据分析的需求。
- 日志数据投递 clickhouse，满足对日志数据指标化长期保存的需求，可利用结构化数据出看板或者监控图。