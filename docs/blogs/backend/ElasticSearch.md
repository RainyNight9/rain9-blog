# ElasticSearch

>ElasticSearch：智能搜索，分布式的搜索引擎

ElasticSearch（简称ES）是一个开源的分布式搜索和数据分析引擎，是用 Java 开发并且是`当前最流行的开源的企业级搜索引擎`，能够达到`近实时搜索`，它专门设计`用于处理大规模的文本数据和实现高性能的全文检索`。

是 ELK 的一个组成，是一个产品，而且是非常完善的产品，ELK 代表的是：

- E：EalsticSearch 搜索和分析的功能
- L：Logstach 搜集数据的功能，类似于 flume（使用方法几乎跟 flume一模一样），是日志收集系统
- K：Kibana 数据可视化（分析），可以用图表的方式来去展示，文不如表，表不如图，是数据可视化平台

## Kibana

Kibana 是一个为 Elasticsearch 设计的开源分析和可视化平台。它提供了一个用户友好的 Web 界面，让用户能够搜索、查看和分析存储在 Elasticsearch 中的数据。

### 主要功能

- **数据可视化**：通过各种图表类型（柱状图、折线图、饼图、热力图等）将数据以可视化的方式展现
- **实时仪表板**：创建动态仪表板来监控关键指标和KPI
- **数据探索**：通过Discover功能浏览和搜索Elasticsearch中的数据
- **日志分析**：分析应用程序日志、系统日志等各种日志数据
- **地理空间数据分析**：在地图上可视化地理位置数据
- **机器学习**：集成机器学习功能进行异常检测和预测分析

### 应用场景

- **运维监控**：监控系统性能、应用状态、基础设施健康度
- **业务分析**：分析用户行为、销售数据、业务指标
- **安全分析**：检测安全威胁、分析安全日志
- **日志管理**：集中管理和分析各种系统日志
- **APM（应用性能监控）**：监控应用程序性能和用户体验

## 优势

- 分布式架构
- 全文检索功能强大
- 多语言支持
- 高性能
- 实时性
- 易用性

## Elastic Stack 生态介绍

- ElasticSearch

核心搜索和分析引擎，提供存储、索引和分布式搜索功能

- Logstach

数据处理管道，负责数据收集、处理和传输

- Beats

边缘数据采集器,负责从各种来源采集数据并发送到 Logstash 或 Elasticsearch

- Kibana

可视化和管理工具,提供数据展示和交互式查询

## 常用 API 总结 (前端/BFF 视角)

作为前端/Node.js 开发者，往往不需要像运维那样去管理集群状态（Cluster API），最常打交道的是基于 HTTP 的**文档 CRUD 操作**和**搜索 DSL（Domain Specific Language）**。如果你用 Node.js（如 NestJS），通常会使用 `@elastic/elasticsearch` 官方 SDK。

### 1. 索引与文档操作 (CRUD)
ES 的一切操作都是基于 RESTful 的 JSON 数据交互：
*   **创建/全量替换文档**：`PUT /{index}/_doc/{id}`
    *   *场景*：已知主键 ID 插入数据。
*   **自动生成 ID 创建文档**：`POST /{index}/_doc`
*   **局部更新文档**：`POST /{index}/_update/{id}`
    *   *请求体*：`{ "doc": { "field_name": "new_value" } }`（只会修改指定的字段，比 PUT 性能更好）。
*   **查询单条文档**：`GET /{index}/_doc/{id}`
*   **删除单条文档**：`DELETE /{index}/_doc/{id}`

### 2. 核心搜索 API (Query DSL)
日常业务开发最常手写的 JSON 结构，发送至 `POST /{index}/_search`：

*   **全文检索 (Match Query)**：
    ES 会先对搜索词进行**分词**，再去倒排索引中匹配。
    ```json
    {
      "query": {
        "match": { "title": "前端开发" }
      }
    }
    ```
*   **精确匹配 (Term Query)**：
    **不分词**，完全精确匹配。常用于 ID、状态（如 `status: published`）、分类标签等枚举值的筛选。
    ```json
    {
      "query": {
        "term": { "category": "frontend" }
      }
    }
    ```
*   **复合查询 (Bool Query) —— 最常用的多条件组合**：
    用来将多个查询条件组合在一起。
    *   `must`：必须匹配（参与打分 Score）。
    *   `filter`：必须匹配（**不参与打分，走缓存，性能最高**。面试必考：用来替代不需要算分的 must）。
    *   `should`：可选匹配（相当于 OR，匹配得越多得分越高）。
    *   `must_not`：必须不匹配（相当于 NOT）。
    ```json
    {
      "query": {
        "bool": {
          "must": [ { "match": { "title": "React" } } ],
          "filter": [ { "term": { "status": 1 } } ],
          "must_not": [ { "term": { "is_deleted": true } } ]
        }
      }
    }
    ```

### 3. 分页与高亮 (Pagination & Highlighting)
*   **分页控制**：
    通过 `from`（偏移量）和 `size`（每页条数）控制。
    ```json
    {
      "from": 0,
      "size": 10,
      "query": { "match": { "content": "低代码" } }
    }
    ```
*   **前端高亮展示**：
    前端做搜索列表时非常依赖这个 API，ES 会返回被 `<em>` 标签包裹的匹配词，前端直接 `dangerouslySetInnerHTML` 渲染。
    ```json
    {
      "query": { "match": { "content": "低代码" } },
      "highlight": {
        "fields": {
          "content": { "pre_tags": ["<em class='highlight'>"], "post_tags": ["</em>"] }
        }
      }
    }
    ```

### 4. 聚合分析 (Aggregations)
前端画图表（如 Echarts 数据大屏）时，数据往往直接来自 ES 的聚合 API：
*   **Bucket 分桶（类似 SQL 的 Group By）**：比如按 `category` 统计文章数量，或者按天（`date_histogram`）统计 PV。
*   **Metrics 指标（类似 SQL 的 Sum/Avg/Max）**：比如计算某个条件下的总销售额。

---

> 💡 **面试话术建议（结合前端/BFF身份）**：
> *“在之前的项目中，我经常在 Node.js (BFF 层) 使用 `@elastic/elasticsearch` SDK 调用 ES。我对 ES 的 Query DSL 比较熟悉，在做复杂列表查询时，通常会用 `bool` 查询做组合。为了提升查询性能，我会有意识地**将不需要算分的精确筛选条件（如状态、分类）放到 `filter` 子句中去利用缓存**，只把需要全文检索的词放在 `must` 里。同时，在做 C 端搜索时，我也经常配合 ES 的 `highlight` API 来实现前端的搜索词高亮展示。”*

## 高频问题 (Questions)

### 1. Elasticsearch 为什么查询速度那么快？（核心：倒排索引）
**【参考答案】**：
ES 查询快的核心原因是它使用了**倒排索引（Inverted Index）**。
*   **正向索引**：以文档（Document）为中心，记录每个文档里包含了哪些词。查询时需要遍历所有文档，速度极慢。
*   **倒排索引**：以词（Term）为中心，记录每个词出现在哪些文档中（形成一个 Posting List）。当用户搜索某个关键词时，ES 直接通过 B+ 树或 FST（Finite State Transducer）等数据结构快速找到这个词，然后立刻获取包含该词的所有文档 ID 列表，从而实现毫秒级查询。

### 2. 请简述 Elasticsearch 的写入（写数据）流程？
**【参考答案】**：
这是一个考察对分布式系统底层理解的经典题：
1.  **路由**：客户端发起写入请求到协调节点（Coordinating Node），节点根据文档 ID 计算 Hash 值，路由到对应的主分片（Primary Shard）所在的节点。
2.  **写入主分片**：主分片节点接收请求，将数据先写入内存缓冲区（Memory Buffer），同时为了防止数据丢失，记录事务日志（Translog）。
3.  **同步副本**：主分片写入成功后，将请求并行转发给所有的副分片（Replica Shard）。
4.  **返回结果**：当所有副分片都报告写入成功后，主分片向协调节点报告成功，协调节点再向客户端返回成功。
5.  *(补充加分项)*：内存缓冲区的数据会默认每秒被 **Refresh** 到文件系统缓存中，形成一个新的 Segment（此时数据可被搜索，这也就是 ES 被称为“近实时”的原因）；Translog 会每 5 秒被 **Flush** 到磁盘，并清空旧的 Translog。

### 3. 请简述 Elasticsearch 的读取（查询数据）流程？
**【参考答案】**：
查询通常分为两阶段：**Query Then Fetch（查询后获取）**。
*   **Query 阶段**：客户端发送请求到协调节点。协调节点将查询请求广播到该索引的所有分片（主分片或副分片皆可，负载均衡）。每个分片在本地执行查询，并返回匹配文档的 ID 及其打分（Score）给协调节点。
*   **Fetch 阶段**：协调节点收到所有分片的结果后，进行全局排序和分页，提取出最终需要的几十个文档 ID。然后，协调节点再次根据这些 ID 去对应的分片拉取完整的文档内容（_source），最后组装返回给客户端。

### 4. Elasticsearch 在部署时，对 Linux 有哪些重要的系统优化建议？
**【参考答案】**：
ES 对系统资源要求很高，生产环境必须做优化：
1.  **关闭 Swap（交换分区）**：Swap 会导致 JVM 堆内存被置换到磁盘，极大地降低性能。必须通过 `swapoff -a` 关闭。
2.  **调整 JVM Heap 大小**：通常设置为物理内存的 50%，但不超过 32GB（通常是 31GB 以内），以保留内存给操作系统的文件系统缓存（Filesystem Cache），因为 Lucene 非常依赖系统缓存来加速索引读取。
3.  **增加最大文件描述符数（Max Open Files）**：ES 会打开大量的文件（每个 Segment 都是很多文件），需要修改 `/etc/security/limits.conf`，将 `nofile` 调大（如 65535 或更高）。
4.  **增加最大虚拟内存区域（Max Map Count）**：修改 `vm.max_map_count`（至少 262144），防止 OOM 异常。

### 5. ES 出现深度分页（Deep Paging）性能问题怎么解决？
**【参考答案】**：
*   **痛点**：默认的 `from + size` 方式，如果查询第 10000 页（每页 10 条），ES 需要在每个分片获取前 100010 条数据，汇聚到协调节点进行全量排序，极度消耗内存和 CPU，甚至导致 OOM。
*   **解决方案**：
    1.  **Scroll API**：适用于**非实时**的大批量数据导出。它会在服务端维护一个快照上下文，每次游标往下走，不能向前翻页。
    2.  **Search After**：适用于**实时**的下一页滚动。它利用上一页最后一条记录的 Sort Value（如基于时间戳或唯一 ID）作为下一页的起点，性能极高，是官方推荐的深度分页替代方案。
    3.  **限制最大分页数**：业务层面限制用户只能翻前 N 页（如百度/谷歌也只能翻几十页），通过设置 `index.max_result_window`（默认 10000）来强制熔断。

### 6. 什么是脑裂（Split-Brain），ES 是如何避免脑裂的？
**【参考答案】**：
*   **概念**：在一个 ES 集群中，由于网络分区或主节点假死，导致集群分裂成了两个或多个独立的小集群，各自选举出了新的 Master，导致数据不一致。
*   **解决机制**：ES 通过 **Quorum（法定票数）** 机制来解决。
    *   在 ES 7.x 之前，需要手动配置 `discovery.zen.minimum_master_nodes`，公式为 `(master_eligible_nodes / 2) + 1`。只有获得超过半数节点同意，才能选举出新的 Master。
    *   在 ES 7.x 及之后，官方重构了集群协调子系统，**移除了这个配置，改为内部自动管理**（基于 Raft 算法的变种），系统会自动计算法定票数，极大地降低了用户配置错误导致脑裂的风险。

