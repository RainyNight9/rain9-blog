---
title: "02-Intermediate: Core Infrastructure & Data Pipeline"
date: "2026-03-05"
tags: ["Nest.js", "Prisma", "PostgreSQL", "Next.js", "App Router"]
difficulty: "Intermediate"
readingTime: "4 hours"
prev:
  text: "Lab 01: Environment Setup"
  link: /blogs/2026/AI-Agent-Data-Analyzer/01-fundamentals/lab/
next:
  text: "Lab 02: Building Infrastructure"
  link: /blogs/2026/AI-Agent-Data-Analyzer/02-intermediate/lab/
---

# 02-intermediate: 核心基础设施与数据管道
# 02-intermediate: Core Infrastructure & Data Pipeline

## 🎯 学习目标 / Learning Objectives

1. **Nest.js 后端架构**: 掌握模块化开发 (Module/Controller/Service)，使用 Prisma ORM 操作 PostgreSQL 数据库。
2. **Next.js 前端架构**: 深入理解 App Router，区分 Server Components 与 Client Components，集成 Shadcn UI 组件库。
3. **数据管道搭建**: 实现从 CSV 文件上传、解析到存储的全流程。
4. **API 设计**: 设计 RESTful API 接口规范。

## ⏱️ 预计时长 / Estimated Duration
- **阅读**: 2 小时 / 2 Hours
- **实验**: 2-4 小时 / 2-4 Hours

## 📦 交付物清单 / Deliverables Checklist

- [ ] 配置好的 PostgreSQL 数据库 (Docker 运行)
- [ ] 包含 `User` 和 `DataFile` 模型的 Prisma Schema
- [ ] 后端 `/api/upload` 接口，支持 CSV 文件上传与解析
- [ ] 前端文件上传页面，能展示上传进度并列出已上传文件

## 🧠 核心概念 / Core Concepts

### 1. Nest.js 模块化架构 (Modular Architecture)
- **Module**: 组织代码的基本单元 (e.g., `DataModule`, `UserModule`)。
- **Controller**: 处理 HTTP 请求 (e.g., `POST /upload`)。
- **Service**: 包含业务逻辑 (e.g., 解析 CSV，调用 DB)。
- **DTO (Data Transfer Object)**: 定义数据传输格式与验证 (使用 `class-validator`)。

### 2. Prisma ORM
- **Schema First**: 通过 `schema.prisma` 定义数据模型。
- **Type Safety**: 自动生成 TypeScript 类型定义。
- **Migration**: 数据库版本控制 (`prisma migrate`)。

### 3. Next.js App Router & Server Actions
- **Server Components (RSC)**: 默认组件，服务端渲染，直接访问数据库/文件系统，无客户端 JS Bundle。
- **Client Components**: 使用 `"use client"`，支持交互 (useState, useEffect)。
- **Server Actions**: 在服务端运行的函数，可直接在组件中调用，替代传统 API Route。

## 🛠️ 实验步骤概览 / Lab Steps Overview

1. **Database Setup**: 启动 Postgres 容器，初始化 Prisma。
2. **Backend API**: 实现文件上传接口 (`Multer`) 和数据存储 (`PrismaClient`)。
3. **Frontend UI**: 安装 Shadcn UI，构建文件上传组件 (`Dropzone`)。
4. **Integration**: 前后端联调，实现文件上传与列表展示。

## 📚 推荐阅读 / Recommended Reading

- [Prisma Documentation](https://www.prisma.io/docs)
- [Nest.js File Upload](https://docs.nestjs.com/techniques/file-upload)
- [Shadcn UI Installation](https://ui.shadcn.com/docs/installation/next)

---
[Next Step: Start the Lab ->](./lab/README.md)
