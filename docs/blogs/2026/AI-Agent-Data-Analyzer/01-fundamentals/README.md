---
title: "01-Fundamentals: AI Agent Concepts & Environment Setup"
date: "2026-03-05"
tags: ["AI Agent", "Environment", "Monorepo"]
difficulty: "Beginner"
readingTime: "2 hours"
prev:
  text: "Course Overview"
  link: /blogs/2026/AI-Agent-Data-Analyzer/
next:
  text: "Lab 01: Environment Setup"
  link: /blogs/2026/AI-Agent-Data-Analyzer/01-fundamentals/lab/
---

# 01-fundamentals: AI Agent 基础与环境搭建
# 01-fundamentals: AI Agent Basics & Environment Setup

## 🎯 学习目标 / Learning Objectives

1. **理解 AI Agent 核心架构**: 掌握 Perception (感知), Brain (大脑/决策), Action (行动) 三要素。
2. **掌握 Monorepo 工程化**: 使用 Turborepo 管理 Next.js + Nest.js 全栈项目。
3. **完成环境准备**: 配置 Node.js, Docker, PNPM, 以及 LLM API Key。
4. **Hello AI World**: 编写第一个简单的脚本调用 LLM API。

## ⏱️ 预计时长 / Estimated Duration
- **阅读**: 1 小时 / 1 Hour
- **实验**: 1-2 小时 / 1-2 Hours

## 📦 交付物清单 / Deliverables Checklist

- [ ] 一个初始化的 Monorepo 仓库 (包含 `apps/web` 和 `apps/api`)
- [ ] 成功运行的 Next.js 前端页面 (localhost:3000)
- [ ] 成功运行的 Nest.js 后端服务 (localhost:3001)
- [ ] 一个可运行的 `hello-llm.ts` 脚本，能通过 API 获取 AI 回复

## 🧠 核心概念 / Core Concepts

### 1. 什么是 AI Agent? (What is an AI Agent?)
AI Agent 不仅仅是一个聊天机器人 (Chatbot)。它是一个拥有**自主性 (Autonomy)** 的系统，能够：
- **感知 (Perceive)**: 接收用户输入、读取文件、获取系统状态。
- **思考 (Reason)**: 基于 LLM 进行逻辑推理，规划任务步骤。
- **行动 (Act)**: 调用外部工具 (Tools/APIs) 执行操作。
- **反思 (Reflect)**: 根据执行结果调整策略。

### 2. 为什么选择 Next.js + Nest.js?
- **Next.js**: React 生态最强框架，服务端渲染 (SSR) 对 SEO 友好，App Router 架构适合构建复杂的交互式仪表盘。
- **Nest.js**: Node.js 领域的 Spring Boot，提供模块化 (Module)、依赖注入 (DI) 等企业级架构，适合构建稳健的后端服务。
- **TypeScript**: 前后端统一语言，类型安全，代码可维护性高。

## 🛠️ 环境准备 / Environment Setup

请确保你的开发环境满足以下要求：
- **Node.js**: v20.10.0+ (LTS)
- **PNPM**: v9.0.0+ (`npm install -g pnpm`)
- **Docker**: Desktop v4.20+ (用于运行数据库)
- **Git**: v2.40+
- **Code Editor**: VS Code (推荐安装 ESLint, Prettier, Tailwind CSS 插件)

## 📚 推荐阅读 / Recommended Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [Nest.js Documentation](https://docs.nestjs.com/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)

---
[Next Step: Start the Lab ->](./lab/README.md)
