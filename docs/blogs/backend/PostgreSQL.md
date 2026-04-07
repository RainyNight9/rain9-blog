# PostgreSQL

https://www.bilibili.com/video/BV1bM411a7Fm/?spm_id_from=333.788&vd_source=6166799f50a05ccb12501252a1578812

## PostgreSQL 特点

- ACID 与 MVCC：事务强一致与多版本并发控制，读不阻塞写、写不阻塞读（大多场景）；快照隔离默认级别为 Read Committed，可配置到 Repeatable Read/Serializable。
- WAL 日志与崩溃恢复：所有变更先写入 Write‑Ahead Logging，再落盘；支持时间点恢复（PITR）。
- 丰富索引类型：B‑Tree（默认）、Hash、GIN（倒排适合数组/JSONB/全文）、GiST（几何/范围）、BRIN（适合大表顺序相关数据）。
- JSONB 一等公民：原生文档存储与查询，配合 GIN 索引高效检索。
- 可扩展性：存储过程语言（PL/pgSQL/PLPython）、外部数据封装 FDW（对接 MySQL/CSV/S3 等）、扩展（PostGIS、pgvector、TimescaleDB）。
- 查询能力：CTE、公用表表达式与递归查询；窗口函数（排名/累计/分组内计算）。
- 分区与复制：范围/列表/哈希分区；物理复制（流复制/热备）、逻辑复制（按表/库级增量）。
- 统计与优化：自动统计信息、ANALYZE、成本优化器（基于统计选择执行计划）。
- 维护机制：VACUUM/Autovacuum 清理无效版本与冻结事务 ID；REINDEX/CLUSTER 优化物理布局。

## 常用实践与调优

- 索引选择：
  - 精确匹配/范围查询：B‑Tree
  - 数组/JSONB/全文检索：GIN；空间/范围/模糊：GiST
  - 超大顺序相关表：BRIN
- JSONB 索引示例：`CREATE INDEX idx_user_profile ON users USING GIN (profile jsonb_path_ops);`
- 分页优化：避免深度分页 `OFFSET/LIMIT`，改用键集分页（search after）或游标。
- 批量写入：`COPY`/批量插入优先，合理关闭自动提交；分批提交减少事务膨胀。
- 统计与计划：定期 `ANALYZE`，使用 `EXPLAIN (ANALYZE, BUFFERS)` 诊断慢查；命中率关注 seq scan 与 idx scan 比例。
- 连接池：PgBouncer（transaction pooling）减少连接开销；谨慎与长事务/游标共用。
- 维护：关注 Autovacuum 阈值、长事务阻塞 Vacuum；冷热数据分区或归档。

## 面试题（含参考答案）

1. 问：MVCC 如何实现“读写不互相阻塞”？  
   答：每次写入生成新版本并标记旧版本的可见性；读根据事务快照只见符合可见性的版本。冲突通过行级锁与快照隔离解决，长事务会拖慢 Vacuum。

2. 问：PostgreSQL 的事务隔离级别有哪些？默认是什么？  
   答：Read Committed（默认）、Repeatable Read、Serializable。默认级别每条语句使用最新已提交快照；RR 保证同事务内快照一致；Serializable 提供可串行化保障。

3. 问：WAL 的作用是什么？如何做时间点恢复（PITR）？  
   答：先写 WAL 保证崩溃一致性；通过 Base Backup + WAL 归档重放到目标时间点，实现 PITR。

4. 问：什么时候选择 GIN/GiST/BRIN？  
   答：GIN 适合包含关系/倒排（数组、JSONB、全文）；GiST 适合范围/几何/模糊匹配；BRIN 适合超大表且数据与物理位置相关（时间序列）。

5. 问：JSONB 如何高效查询并建立索引？  
   答：用操作符 `->`/`->>`/`@>` 或 `jsonb_path_query`，建立 GIN 索引（`jsonb_ops/jsonb_path_ops`），避免函数包裹导致索引失效。

6. 问：解释 CTE 与子查询的区别，何时使用窗口函数？  
   答：CTE（`WITH`）可读性强，早期版本物化可能影响性能；窗口函数用于分组内计算（排名、累计、分段统计），避免复杂自连接。

7. 问：如何诊断慢查询并优化？  
   答：使用 `EXPLAIN ANALYZE` 看执行计划、行数估计与节点耗时；检查统计是否过期、索引是否命中、是否不必要的排序/Hash；优化谓词与索引、调整 `work_mem`/`effective_cache_size`。

8. 问：深度分页如何优化？  
   答：避免大 `OFFSET`，改为键集分页（基于上页末行主键/时间戳），或业务限制最大页；批量导出用游标。

9. 问：Autovacuum 为什么重要？如何避免它被阻塞？  
   答：清理死元组与冻结事务 ID，维持性能与可用性；避免长事务与长时间打开游标阻塞；必要时手工 `VACUUM`/调整阈值。

10. 问：逻辑复制与物理复制差异？  
    答：物理复制按 WAL 字节流复制，库级热备；逻辑复制按表/库级变更事件复制，支持跨版本/选择性同步，适合数据分发/近实时 ETL。
