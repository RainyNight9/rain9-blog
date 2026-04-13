# AI 相关1

## 名词总览（通俗解释 + 原理要点）

- LLM（大语言模型）
  - 解释：基于海量语料训练的生成式模型，能理解和生成自然语言
  - 原理要点：Transformer 编码器/解码器结构，注意力（Attention）选择性关注上下文；自回归按 Token 逐步生成

- Token / Tokenization（分词）
  - 解释：模型处理的最小单位（子词/字节对），不是“字数”
  - 原理要点：BPE/WordPiece 等算法将文本拆成稳定子单位；上下文窗口按 Token 计数

- Context Window（上下文窗口）
  - 解释：一次可“读/记”的最大 Token 数
  - 原理要点：受注意力计算复杂度与位置编码限制；超出需截断或检索增强

- Transformer / Attention（变压器 / 注意力）
  - 解释：当前主流架构；注意力让模型在长文本中“选择性关注”
  - 原理要点：Q/K/V 计算相关性；多头注意力并行学习不同关系

- RoPE（旋转位置编码）
  - 解释：让模型“知道”Token 的位置信息
  - 原理要点：通过复数旋转为注意力引入相对位置信息，支持更长上下文

- KV Cache / FlashAttention
  - 解释：推理阶段缓存注意力的 K/V，加快后续 Token 生成
  - 原理要点：减少重复计算与显存读写；FlashAttention优化 IO 与并行

- MoE（Mixture of Experts，专家混合）
  - 解释：多专家子网络，路由选择少数参与计算
  - 原理要点：稀疏激活提升容量与效率；路由器决定用哪个专家

## 推理与生成（采样与性能）

- Temperature（温度）
  - 解释：控制随机性；高温更发散，低温更保守
  - 原理要点：对 logits 做缩放后再采样

- Top-k / Top-p（Nucleus）
  - 解释：限制候选集合大小（k）或累计概率（p）
  - 原理要点：避免尾部低概率词；Top-p自适应集合

- Repetition Penalty / Frequency Penalty
  - 解释：降低重复 Token 的概率，减少“复读”
  - 原理要点：对已生成历史进行惩罚调整概率分布

- Beam Search
  - 解释：同时探索多条生成路径，取总体最优
  - 原理要点：保留若干最高分的“束”，更偏向确定性总结

- Speculative Decoding（投机解码）
  - 解释：用小模型预取候选，大模型快速确认
  - 原理要点：并行/流水线缩短首字时间（TTFT）

- Streaming（流式输出：SSE/WebSocket）
  - 解释：边生成边传输，降低等待焦虑
  - 原理要点：SSE 单向文本流；WebSocket 双向事件流

## 检索增强（RAG 全流程）

- Embedding（向量表示）
  - 解释：把文本变成向量，表示语义相似度
  - 原理要点：句向量模型；余弦相似/内积检索

- Chunking（分块策略）
  - 解释：把长文档切成小片段以便检索
  - 原理要点：固定长度/语义分段/滑窗；避免知识断裂

- Vector DB（向量数据库）
  - 解释：存储与近似最近邻检索（ANN）的系统
  - 原理要点：HNSW/IVF-PQ 索引，加速高维检索

- Reranking（重排序）
  - 解释：用更强的模型对初检结果二次打分
  - 原理要点：交互式编码器（Cross-Encoder）提升相关性精度

- RAG（Retrieval-Augmented Generation）
  - 解释：先检索相关材料，再让模型基于材料回答
  - 原理要点：检索→重排→拼接上下文→受控生成；降低幻觉

## 训练与对齐（让模型更“像人”）

- SFT（监督微调）
  - 解释：用高质量问答/指令数据拟合期望输出
  - 原理要点：交叉熵最小化；奠定基础能力

- RLHF / RLAIF（人/模型反馈强化学习）
  - 解释：通过偏好（好/坏）信号优化模型行为
  - 原理要点：奖励模型 + 强化学习（PPO 等）或直接偏好优化

- DPO（Direct Preference Optimization）
  - 解释：不训练奖励模型，直接用偏好对比优化
  - 原理要点：构造正/负样本对，优化相对概率

- LoRA / QLoRA（低秩适配）
  - 解释：只训练插入的低秩矩阵，显著降低算力需求
  - 原理要点：冻结原权重，注入可训练“适配层”

- Quantization（量化 8/4-bit）
  - 解释：用更低 bit 存储权重，减少显存占用
  - 原理要点：对权重做缩放/分组量化，兼顾精度与性能

## 安全与治理（风控与合规）

- Hallucination（幻觉）
  - 解释：模型“编故事”，输出看似合理但不正确
  - 原理要点：概率生成与缺乏事实校验；RAG/校验链降低

- Prompt Injection / Jailbreak
  - 解释：恶意提示破坏系统指令或绕过限制
  - 原理要点：输入校验/策略隔离/上下文分区与输出审计

- Guardrails / Moderation（护栏/审核）
  - 解释：在生成前后做安全审查与剥离
  - 原理要点：分类器/规则引擎/Llama Guard 等多层拦截

## 结构化输出与工具调用（让模型“能干活”）

- Function Calling / Tool Use（函数调用/工具使用）
  - 解释：模型根据需求调用外部函数/API
  - 原理要点：在提示中提供可调用签名与 JSON Schema，模型填参→执行→注入结果再继续对话

- JSON Mode / Schema-Constrained Generation
  - 解释：强制模型按照 Schema 输出结构化 JSON
  - 原理要点：解码时约束 token 空间，失败重试/校验修复

- Agent / ReAct / CoT
  - 解释：带推理链（思维链）与行动（工具调用）的智能体框架
  - 原理要点：Reason+Act 交替；Planner/Executor/Memory 组件协作

- Orchestration（编排：LangChain/LlamaIndex）
  - 解释：把检索、工具、工作流串起来的中间层
  - 原理要点：节点/链式执行；状态与上下文传递

## 评测与指标（如何判断好坏）

- MMLU / MT-Bench / HumanEval
  - 解释：学科知识、对话质量、代码生成等标准评测
  - 原理要点：统一题库与打分；便于横向对比

- TTFT / TPS / 总延迟
  - 解释：首字时间（TTFT）、每秒 Token（TPS）、端到端延迟
  - 原理要点：流式传输 + KV Cache + 推理优化提升体验

## 多模态（文本 + 图像/语音）

- VLM（Vision-Language Model）
  - 解释：能“看图说话”的模型（OCR/图理解）
  - 原理要点：视觉编码器 + 语言解码器对齐

- Diffusion / Stable Diffusion / ControlNet
  - 解释：图像生成的扩散模型系列；ControlNet可控生成（姿态/边缘）
  - 原理要点：从噪声逆扩散复原；条件控制引导生成

- ASR / TTS / Whisper
  - 解释：语音识别（ASR）、语音合成（TTS），Whisper 是通用多语 ASR
  - 原理要点：声学特征编码 + 序列到序列解码

## 前端/端侧工程（落地与优化）

- SSE/WebSocket 流式渲染
  - 要点：边消费边渲染，避免白屏；弱网下做防抖与骨架占位

- WebWorker / WASM / WebGPU
  - 要点：重计算下沉 Worker；端侧推理用 Transformers.js/onnx + WebGPU；WASM 统一跨平台加速

- Prompt Template / 变量插值
  - 要点：模板化指令；JSON Schema 驱动前端表单生成与变量校验

- Markdown 安全渲染
  - 要点：Shiki/Prism 高亮；XSS 防护；代码块/图片撑开防抖

- 观测与治理
  - 要点：埋点 TTFT/TPS/错误率；对话审计与追踪；限流与熔断

## MCP 与 Skills（统一接入与能力编排）

- MCP（Model Context Protocol）
  - 解释：将模型与外部世界（工具、数据源、文件系统、网络）连接的标准协议
  - 原理要点：Client 连接多个 Server；Server 暴露 Tools（可调用函数）与 Resources（可读资源）；调用契约通过 JSON Schema 描述，结果以结构化数据返回，Client 将结果注入模型上下文继续推理
  - 常见组件：Server/Client/Tool/Resource/Session/Events

- MCP Tool（工具）签名示例
  ```json
  {
    "name": "web_fetch",
    "description": "抓取指定 URL 的内容（HTML -> Markdown）",
    "input_schema": {
      "type": "object",
      "properties": {
        "url": { "type": "string", "format": "uri" }
      },
      "required": ["url"]
    }
  }
  ```
  - 调用流程：模型通过 Function Calling 生成参数 → Client 校验 Schema → Server 执行 → 返回 JSON 结果 → 结果进入上下文继续推理或呈现

- Skills（技能/能力模块）
  - 解释：在应用层对“工具 + 提示模板 + 状态机”的封装，形成可复用的业务能力（如“抓取网页并抽取摘要”、“读 PDF 并答题”）
  - 原理要点：明确输入/输出契约与副作用；可组合编排；版本化与能力检查；安全策略（白名单、超时、预算）
  - 调度路径：用户意图 → 路由器（Router）选择技能 → 技能内部可能调用多个 MCP Tools → 汇总结果 → 反思与重试

- Tool vs Skill vs Function Calling（关系）
  - Function Calling：模型层面的“调用指令”与参数填充
  - Tool：具体可执行的原子能力，由 MCP Server 暴露
  - Skill：应用层的组合能力，编排多个 Tool 与提示模板

- Agent Memory（智能体记忆）
  - 解释：让 Agent 在多轮对话/多任务中具备“持续记忆”
  - 原理要点：短期记忆（会话窗口/摘要）、长期记忆（向量库）、程序性记忆（规则/偏好）；读写策略与过期清理
  - 前端实现：IndexedDB 持久化、端侧 Embedding（隐私数据不出端）、按租户隔离与加密

- Observability & Governance（可观测与治理）
  - 解释：对每次推理与工具调用进行可追踪、可审计、可回放
  - 原理要点：Trace/Span 切分（Prompt、Model Call、Tool Call）、参数与输出脱敏、PII 剥离、RBAC 对工具授权、熔断与退化策略

- 常见落地场景
  - Filesystem：读写本地/云端文件
  - WebFetch：拉取网页与 API
  - Database：结构化数据查询与变更（强审计）
  - Codebase：检索与编辑代码（需严格权限）
  - Workflow：任务编排（定时/事件驱动）

## 面试话术模板（MCP/Skills）

- 30 秒陈述：
  - “我们通过 MCP 将模型与外部世界解耦：工具以 JSON Schema 描述输入输出，Server 负责执行，Client 负责注入结果与会话管理。业务侧以 Skills 封装工具与提示模板，形成可复用的能力模块，既能组合编排，又能做权限与预算治理。”
- 深挖要点：
  - 安全：工具白名单、沙箱/超时、参数校验与输出审计
  - 性能：KV Cache/Streaming 降延迟；Speculative Decoding 提升 TTFT
  - 可靠：失败重试/反思链；可观测 Trace；灰度与回滚

## LangChain

- 定位：LLM 应用开发框架，提供从数据加载、向量检索到提示与工具调用的全套抽象
- 核心抽象：
  - PromptTemplate / ChatPrompt：结构化提示
  - LLM / ChatModel：模型适配层
  - DocumentLoader / TextSplitter：数据加载与切片
  - VectorStore / Retriever：向量库与检索器
  - Tool / Agent / Runnable（LCEL）：工具与智能体、可组合的可运行链路
- 原理要点：
  - 以“可组合的有向管线”为核心（LCEL），将检索、生成、工具调用串联为可调试的执行图
  - 回调/可观测（Callbacks/Tracing）贯穿执行，便于度量与复现
  - 通过 Memory 与 Checkpoint 提供会话态与任务态的持续化
- 典型用法：
  - RAG：Loader → Splitter → Embedding → VectorStore → Retriever → Prompt → LLM
  - Tool Use：Agent 根据任务路由调用 Tool，结果回注上下文再生成

#### RAG 流程解释
- Loader：把原始数据读入并标准化，记录元信息（source/path/author/tenant/ACL），来源可为本地文件、Git、Notion、S3、SQL 等。
- Splitter：将长文档切成可检索片段，常用固定长度 + 重叠或语义分段 + 滑窗，重叠 10–20% 保证跨段语义连续。
- Embedding：为每个片段生成向量并持久化，关联 chunk_id/doc_id/元数据，注意租户隔离与索引版本化。
- VectorStore：向量库（Milvus/PGVector/ES Dense Vector）建立 ANN 索引（HNSW/IVF‑PQ）；保留倒排或结构化字段用于精确过滤（权限/类型/时间）。
- Retriever：将问题向量化后做语义检索（可与关键词混合），Top‑K 结果用 Cross‑Encoder 重排；按窗口预算与来源多样性拼接上下文并生成引用。
- Prompt：将上下文与问题按模板组装（system/fewshot/context/user），控制窗口与格式，插入 Citation；可用 JSON Mode 输出结构化结果以降低注入风险。
- LLM：模型根据 Prompt 生成答案；前端用 SSE/WebSocket 流式渲染增量内容与引用，必要时触发二次检索或工具调用补齐证据。

补充要点
- 前端职责：构造查询 DSL（语义 + 过滤）、展示 Citation 与来源、多源公平性与慢源熔断、流式 UI 与占位。
- 后端职责：摄取/切片/Embedding/索引、混合检索与重排、上下文拼接与模板化、权限与租户隔离、可观测与评测。
- 常见坑：切片过长/无重叠导致断句；仅向量检索无重排相关性差；未做 ACL 越权；上下文过多超窗口；未提供引用易幻觉。
- 评测指标：Recall@K/Precision、正确性/依据充分度、窗口使用率与费用、检索/重排耗时、分来源覆盖度。

## langgraph

- 定位：构建“状态化智能体图”的框架，强调可控、可恢复、可审计的多节点工作流
- 核心概念：
  - Graph / Node / Edge：以图描述推理与行动节点及其数据流
  - State / Reducer：每个节点读写共享状态，支持冲突合并与事务
  - Checkpointer：持久化中间态，支持中断/恢复/回放
  - Interrupt / Human-in-the-loop：人机协作插拔点
- 原理要点：
  - 有向图 + 状态存储的执行模型，替代“黑盒对话”式的不可控代理
  - 多代理协作通过显式边与事件驱动完成，易于审计与治理
- 适用场景：复杂多步研究、检索‑评审‑行动闭环、需要可恢复/可回放的企业级编排

## openClaw

- 定位：面向企业治理的 Agent 能力编排思路（同类框架的共性），强调工具注册、策略与可观测
- 核心模块（通用范式）：
  - Capability Registry：工具/数据源能力注册中心，签名与版本管理
  - Policy Engine：权限/预算/速率/隔离策略执行
  - Orchestrator：任务编排与路由，支持并行/回退/重试
  - Observability：Trace/Log/Metric 统一采集与审计
- 原理要点：
  - 以“能力中心 + 策略层 + 编排层”三层架构治理智能体的外部副作用
  - 输入输出使用 Schema 约束，结合事件总线实现跨组件通信
- 适用场景：需要强审计/强合规的 ToB 场景，工具白名单与成本控制

## OpenManus

- 定位：以“文档/知识工作流”为中心的多模态/检索编排思路（同类系统的共性）
- 核心流程（通用范式）：
  - 文档摄取 → 解析/清洗 → 分块/索引 → 检索/重排 → 语义生成 → 审核/发布
  - 支持结构化（表格/代码）与非结构化（PDF/图片/OCR）混合处理
- 原理要点：
  - 以任务图描述文档处理与检索生成链路，结合引用溯源确保结果可追踪
  - 前端提供可视化工作台以配置管线、查看效果与指标
- 适用场景：知识库问答、文档摘要与基于证据的合成报告

- 自我介绍
- 字符串 第一个不重复
- 列表 转 树
- react 渲染组件
- 输出结果 
- 树节点拖拽转换的函数
- react 防抖的组件
- 业务理解、发起的原因、技术难点，解决问题的能力
- 技术深度 react
- AI 相关