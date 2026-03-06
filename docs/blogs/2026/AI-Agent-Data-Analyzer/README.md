---
title: "AI Agent Data Analyst: Full Stack Practical Course"
date: "2026-03-05"
tags: ["AI Agent", "Next.js", "Nest.js", "LangChain", "Data Analysis"]
difficulty: "Advanced"
readingTime: "20 hours"
next:
  text: "01-Fundamentals: AI Agent Concepts"
  link: /blogs/2026/AI-Agent-Data-Analyzer/01-fundamentals/
---

# 🚀 AI 数据分析助手：从 0 到 1 全栈实战课程
# AI Data Analysis Assistant: From Zero to Production

本课程旨在通过构建一个完整的“AI 数据分析助手”项目，带领开发者掌握构建现代化 AI Agent 应用的核心技术栈。我们将使用 **Next.js** 构建高性能前端，**Nest.js** 打造可扩展后端，并结合 LLM（大语言模型）实现智能数据分析能力。

This course is designed to guide developers through building a complete "AI Data Analysis Assistant" project, mastering the core technology stack for modern AI Agent applications. We will use **Next.js** for a high-performance frontend, **Nest.js** for a scalable backend, and integrate LLMs to achieve intelligent data analysis capabilities.

## 📚 课程结构 / Course Structure

课程分为四个阶段，层层递进：
The course is divided into four progressive stages:

### [01-fundamentals: 基础篇](./01-fundamentals/README.md)
**目标**: 掌握 AI Agent 核心概念，搭建开发环境。
**Goal**: Master core AI Agent concepts and set up the development environment.
- 理解 AI Agent 架构 (Perception, Brain, Action)
- Next.js + Nest.js Monorepo 环境搭建
- "Hello World"：第一个 LLM 调用

### [02-intermediate: 进阶篇](./02-intermediate/README.md)
**目标**: 构建稳固的前后端基础设施。
**Goal**: Build solid frontend and backend infrastructure.
- Nest.js 后端架构：PostgreSQL, Prisma, RESTful API
- Next.js 前端架构：App Router, Shadcn UI, 状态管理
- 数据摄取与处理管道 (ETL Pipeline)

### [03-project: 实战篇](./03-project/README.md)
**目标**: 实现 AI Agent 核心业务逻辑（这是本课程的核心）。
**Goal**: Implement AI Agent core business logic (The core of this course).
- **意图识别 (NLU)**: 分析用户自然语言指令
- **工具调用 (Tool-use)**: 自动选择工具（SQL 查询、图表生成）
- **记忆系统 (Memory)**: 上下文管理与历史对话
- **数据可视化**: 基于 ECharts 的动态图表渲染

### [04-deployment: 部署篇](./04-deployment/README.md)
**目标**: 生产环境部署与工程化。
**Goal**: Production deployment and engineering.
- Docker 容器化优化 (< 200MB)
- CI/CD 流水线 (GitHub Actions)
- 基础设施即代码 (Terraform)

## 🛠 技术栈 / Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Shadcn/ui, Zustand, ECharts
- **Backend**: Nest.js, TypeScript, GraphQL & REST, Prisma/TypeORM
- **AI/LLM**: OpenAI API / Anthropic / Local LLM, LangChain / Custom Agent Logic
- **Database**: PostgreSQL, Redis
- **DevOps**: Docker, GitHub Actions, Terraform, Vercel, Render

## 🎓 预备知识 / Prerequisites

- 熟悉 TypeScript / JavaScript (ES6+)
- 基本的 React 和 Node.js 开发经验
- 了解基本的 SQL 数据库概念
- 对 AI/LLM 有基本兴趣

---
*开始你的 AI Agent 之旅！/ Start your AI Agent journey!*
