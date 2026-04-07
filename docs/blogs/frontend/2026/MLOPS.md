# MLOps 项目深度解析文档

## 1. 什么是 MLOps（业务视角）

- 定义：将机器学习全生命周期（数据→特征→训练→评估→注册→部署→推理→监控→再训练）进行工程化、自动化与治理化，目标是让“模型从实验室稳定、可控地走向生产”。
- 业务价值：
  - 交付速度：自动化流水线缩短“数据变更→模型上线”的周期。
  - 线上效果：A/B 与持续监控保障指标健康（转化率、召回率、响应时延）。
  - 合规与风险：数据/模型/实验可追溯，便于审计与回滚。
- 典型场景：
  - 推荐/搜索/广告排序、风控/反欺诈、智能客服、AIGC 与企业 Agent 工作流。

## 2. 端到端总体架构

```mermaid
flowchart LR
  DS[Data Sources] --> ETL[Ingestion/ETL]
  ETL --> DL[Data Lake/Versioned Data]
  ETL --> FS[Feature Store (Offline/Online)]
  DL --> TR[Training]
  FS --> TR
  TR --> EV[Evaluation]
  EV --> MR[Model Registry]
  MR --> CICD[CI/CD & Model CI]
  CICD --> DEP[Deployment]
  DEP --> INF[Inference (Batch/Online)]
  INF --> MON[Monitoring & A/B]
  MON --> RT[Re-Train Trigger]
  RT --> TR
```

- 数据层：数据摄取与清洗、Schema 管控、数据质量校验。
- 特征层：离线/在线特征统一（Feature Store），避免训练-服务偏差。
- 训练层：实验管理、超参搜索、分布式训练与资源调度。
- 模型层：离线评估、注册与版本管理、依赖与产物归档。
- 部署层：批处理/在线服务化、灰度/影子/金丝雀、自动回滚。
- 观测层：业务指标/技术指标、数据漂移/概念漂移、报警与再训练触发。

## 3. 核心原则与关键能力

- 可复现：代码、数据、特征、环境、超参与随机种子全量版本化与记录。
- 可追溯：每一次预测可追溯到模型版本、特征快照与数据批次。
- 自动化：数据→训练→测试→注册→构建→部署→监控流水化，减少人为差错。
- 一致性：训练-服务特征一致、离线-在线指标口径一致。
- 可观测：覆盖延迟、吞吐、错误率、漂移、稳定性 SLO 与告警。
- 治理与安全：访问控制、PII 脱敏、审计与合规、预算与配额。

## 4. 关键模块与落地实现

### 4.1 数据与特征治理
- 数据版本化：DVC、Lakehouse（Delta/Apache Hudi/Iceberg），数据 Schema 演进与兼容。
- 数据质量：Great Expectations、统计画像、异常分布检测。
- 特征双轨：Offline/Online Feature Store（如 Feast），提供一致的特征计算与物化。
- 训练-服务偏差控制：特征定义共享、同一代码路径或 SQL 复用、线上特征回填校验。

### 4.2 实验管理与训练编排
- 实验管理：MLflow/W&B/SageMaker Experiments，记录参数、指标与产物。
- 调度与编排：Airflow/Argo/Kubeflow，按 DAG 自动执行，支持失败重试与缓存。
- 资源调度：K8s、Ray、Elastic Training，GPU/CPU 弹性与混部策略。

### 4.3 评估、注册与发布
- 评估：离线多指标（AUC、F1、NDCG、Toxicity 等）、线上 A/B 与多臂赌博机。
- 注册：MLflow Registry/SageMaker Model Registry，管理 Staging/Production 流转。
- 发布策略：金丝雀、影子流量、蓝绿发布，回滚与杀手开关。

### 4.4 服务化与推理
- 批处理：定时产出画像/标签，数据仓库沉淀。
- 在线服务：BentoML/Seldon/KServe/FastAPI，GPU/CPU 混合服务，自动扩缩容。
- 缓存与加速：特征缓存、向量索引、模型加载时间优化、KV Cache。

### 4.5 监控与再训练
- 技术指标：QPS、P95 延迟、错误率、资源利用率。
- 业务指标：转化率、CTR、长尾覆盖、用户留存。
- 漂移监控：数据漂移（分布变化）、概念漂移（标签关系变化），触发再训练。
- 观测体系：Prometheus/Grafana/ELK，Trace 关联模型版本与输入输出快照。

## 5. 最小可行技术栈（参考）

- 代码与数据：Git + DVC + MinIO/S3
- 实验与注册：MLflow（Tracking + Registry）
- 编排：Airflow 或 Argo Workflows
- 特征：Feast（离线/在线特征一致）
- 服务：BentoML/KServe + K8s + Istio
- 观测：Prometheus + Grafana + Loki/ELK

## 6. 示例片段（可直接落地）

### 6.1 MLflow 记录实验与产物
```python
import mlflow, mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(max_depth=3)
with mlflow.start_run():
    mlflow.log_params({"max_depth": 3})
    model.fit(X_train, y_train)
    mlflow.sklearn.log_model(model, "model")
    mlflow.log_metrics({"auc": 0.92, "f1": 0.78})
```

### 6.2 DVC 流水线
```yaml
stages:
  preprocess:
    cmd: python preprocess.py data/raw data/clean
    deps:
      - data/raw
      - preprocess.py
    outs:
      - data/clean
  train:
    cmd: python train.py data/clean model/artifacts
    deps:
      - data/clean
      - train.py
    outs:
      - model/artifacts
```

### 6.3 CI/CD（构建镜像并部署到 K8s）
```yaml
name: mlops-ci-cd
on:
  push:
    paths:
      - model/**
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
      - run: pytest -q
      - run: docker build -t org/recsys:latest .
      - run: echo "${{ secrets.REGISTRY_PASS }}" | docker login -u "${{ secrets.REGISTRY_USER }}" --password-stdin
      - run: docker push org/recsys:latest
      - uses: azure/k8s-deploy@v4
        with:
          manifests: |
            k8s/deployment.yaml
```

### 6.4 BentoML 推理服务
```python
import bentoml
from bentoml.io import JSON
model_ref = bentoml.sklearn.get("recsys:latest")
runner = model_ref.to_runner()
svc = bentoml.Service("recsys", runners=[runner])
@svc.api(input=JSON(), output=JSON())
def predict(payload):
    x = preprocess(payload)
    y = runner.run(x)
    return {"score": float(y)}
```

## 7. 前端/AI 产品如何接入 MLOps

- BFF 协议：定义稳定的 JSON Schema 与版本策略，前端/移动端稳定接入。
- 流式交互：SSE/WebSocket 输出 token 流，降低首字时间与等待焦虑。
- 开关与灰度：前端接 Feature Flag 与金丝雀策略，可视化回滚与兜底。
- 观测：埋点 TTFT/TPS/错误率，指标对齐模型监控系统，形成端到端追踪。
- 隐私与合规：端侧缓存/IndexedDB 加密，敏感字段脱敏与访问审计。

## 8. 常见问题与排障方法

- 线上效果不稳：检查训练-服务特征是否一致，回放线上样本离线复现。
- 漂移告警频发：核对上游数据口径与采样策略，灰度扩大监控窗口。
- 延迟飙升：排查模型加载、向量检索、外部特征拉取，分层缓存与预加载。
- 难以回滚：确保模型与特征快照一对一登记，注册中心推进/回退有据可依。

## 9. 面试高频问题与参考答案

- 问：MLOps 与 DevOps 的区别与联系
  - 答：都强调自动化与可观测，MLOps 额外关注数据/特征/模型的版本与漂移，包含实验管理、评估与再训练闭环。

- 问：如何保证训练-服务一致性
  - 答：统一特征定义与代码路径，离线/在线同一逻辑；Feature Store 物化一致；线上样本回填比对。

- 问：数据/模型可复现如何实现
  - 答：DVC 管数据与产物，MLflow 记录参数与模型，容器化与环境锁定，固定随机种子。

- 问：新模型上线采用什么策略
  - 答：影子流量验证正确性，金丝雀小流量观测，A/B 验证业务收益，指标与阈值清晰且可回滚。

- 问：如何监控与处理数据漂移与概念漂移
  - 答：统计分布、PSI/KL、特征重要性变化监控，阈值触发再训练与人工审核。

- 问：线上延迟如何优化
  - 答：模型裁剪/量化、批量并发、KV Cache、向量索引预热、CPU/GPU 分层与弹性扩缩。

- 问：如何在 AIGC/Agent 场景落地 MLOps
  - 答：引入 Prompt 与工具调用的版本管理与审计，将日志与上下文纳入观测，TTFT 与 TPS 作为核心 SLI，结合 RAG 的数据质量治理与再训练闭环。
