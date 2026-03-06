---
title: "03-Project: Building the Intelligent Agent Core"
date: "2026-03-05"
tags: ["AI Agent", "LangChain", "Tool Use", "RAG", "ECharts"]
difficulty: "Advanced"
readingTime: "6 hours"
prev:
  text: "Lab 02: Building Infrastructure"
  link: /blogs/2026/AI-Agent-Data-Analyzer/02-intermediate/lab/
next:
  text: "Lab 03: The Brain of the Analyst"
  link: /blogs/2026/AI-Agent-Data-Analyzer/03-project/lab/
---

# 03-project: 构建智能数据分析核心
# 03-project: Building the Intelligent Agent Core

## 🎯 学习目标 / Learning Objectives

1. **Agent 核心模块实现**: 动手实现 NLU (意图识别)、Tool-use (工具调用)、Memory (记忆)、Reflection (反思)。
2. **构建 RAG 增强检索**: 结合向量数据库 (pgvector) 实现知识库问答。
3. **数据可视化生成**: 让 AI 自动生成 ECharts 配置并在前端渲染。
4. **端到端智能分析**: 实现从“自然语言提问”到“图表展示”的完整闭环。

## ⏱️ 预计时长 / Estimated Duration
- **阅读**: 3 小时 / 3 Hours
- **实验**: 4-8 小时 / 4-8 Hours

## 📦 交付物清单 / Deliverables Checklist

- [ ] 一个具备“思考”能力的 AI Agent 后端服务
- [ ] 支持 SQL 查询与图表生成的工具集 (Tools)
- [ ] 前端流式对话界面 (Streaming Chat UI)
- [ ] 能够根据指令自动渲染 ECharts 图表的组件

## 🧠 核心概念 / Core Concepts

### 1. ReAct 模式 (Reasoning + Acting)
Agent 的核心循环：
1. **Thought**: 思考用户意图，拆解任务。
2. **Action**: 选择并调用工具 (API, SQL, Search)。
3. **Observation**: 观察工具返回的结果。
4. **Reflection**: 反思结果是否满足需求，决定下一步行动或输出最终答案。

### 2. 工具调用 (Function Calling / Tool Use)
LLM 不直接操作数据库，而是通过定义清晰的工具接口 (JSON Schema) 来与外部世界交互。
- `query_database(sql: string)`: 执行 SQL 查询。
- `generate_chart(config: json)`: 生成图表配置。

### 3. 结构化输出 (Structured Output)
强制 LLM 输出 JSON 格式，以便程序解析。例如，前端需要的 ECharts 配置必须是合法的 JSON 对象。

### 4. 记忆管理 (Memory Management)
- **Short-term Memory**: 当前对话上下文。
- **Long-term Memory**: 历史对话摘要，向量存储。

## 🛠️ 实验步骤概览 / Lab Steps Overview

1. **Tool Definition**: 定义 `QueryTool` 和 `ChartTool`。
2. **Agent Implementation**: 使用 LangChain 或原生 API 实现 ReAct 循环。
3. **Frontend Integration**: 使用 `ai/rsc` (Vercel AI SDK) 实现流式 UI。
4. **Visualization**: 创建 `ChartRenderer` 组件，动态渲染 AI 生成的图表。

## 📚 推荐阅读 / Recommended Reading

- [LangChain JS/TS Docs](https://js.langchain.com/docs/)
- [Vercel AI SDK Core](https://sdk.vercel.ai/docs)
- [ECharts Examples](https://echarts.apache.org/examples/en/index.html)

---
[Next Step: Start the Lab ->](./lab/README.md)
