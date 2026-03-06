---
title: "Lab 01: Environment Setup & Hello AI"
date: "2026-03-05"
prev:
  text: "01-Fundamentals: Concepts"
  link: /blogs/2026/AI-Agent-Data-Analyzer/01-fundamentals/
next:
  text: "02-Intermediate: Infrastructure"
  link: /blogs/2026/AI-Agent-Data-Analyzer/02-intermediate/
---

# Lab 01: Environment Setup & Hello AI
# 实验 01: 环境搭建与 Hello AI

## 🧪 实验任务 / Tasks

### Task 1: Initialize Monorepo (初始化 Monorepo)

我们需要创建一个包含前端和后端的单一代码仓库 (Monorepo)。

**Steps:**
1. 使用 Turborepo 初始化项目：
   ```bash
   pnpm dlx create-turbo@latest ai-agent-data-analyzer
   ```
2. 清理默认的示例应用，创建我们需要目录结构：
   - `apps/web`: Next.js 前端
   - `apps/api`: Nest.js 后端

**验证标准 / Acceptance Criteria:**
- 根目录下有 `pnpm-workspace.yaml`。
- `apps/web` 包含 `package.json` (Next.js)。
- `apps/api` 包含 `package.json` (Nest.js)。
- 运行 `pnpm dev` 能同时启动前后端。

### Task 2: Hello LLM Script (Hello LLM 脚本)

在 `apps/api` 中编写一个简单的脚本，测试 LLM 连接。

**Steps:**
1. 安装依赖：`pnpm add openai dotenv`
2. 创建 `.env` 文件填入 API Key。
3. 创建 `src/scripts/hello-llm.ts`：
   - 连接 OpenAI/DeepSeek API。
   - 发送 "Hello, who are you?"。
   - 打印回复。

**代码参考 / Code Snippet:**
```typescript
import OpenAI from 'openai';
import 'dotenv/config';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL // Optional for other providers
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: 'Hello, are you an AI Agent?' }],
    model: 'gpt-3.5-turbo',
  });
  console.log(chatCompletion.choices[0].message.content);
}

main();
```

**验证标准 / Acceptance Criteria:**
- 运行 `npx ts-node src/scripts/hello-llm.ts` 能在控制台输出 AI 的回复。

## ✅ 自动评分脚本 / Grading Script

我们提供了一个 Jest 测试脚本来验证你的环境配置。
请在 `01-fundamentals/lab` 目录下运行 `npm test`。

*(注：实际测试脚本代码请查看 `lab/test/lab01.test.js`)*

---
[Back to Module 01](../README.md)
