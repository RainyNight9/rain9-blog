---
title: "04-Deployment: Production Ready Engineering"
date: "2026-03-05"
tags: ["Docker", "CI/CD", "Terraform", "GitHub Actions"]
difficulty: "Advanced"
readingTime: "4 hours"
prev:
  text: "Lab 03: The Brain of the Analyst"
  link: /blogs/2026/AI-Agent-Data-Analyzer/03-project/lab/
next:
  text: "Lab 04: Shipping It!"
  link: /blogs/2026/AI-Agent-Data-Analyzer/04-deployment/lab/
---

# 04-deployment: 生产环境部署与工程化
# 04-deployment: Production Ready Engineering

## 🎯 学习目标 / Learning Objectives

1. **容器化优化**: 编写多阶段构建 Dockerfile，将镜像体积控制在 200MB 以内。
2. **CI/CD 流水线**: 使用 GitHub Actions 实现自动化测试与部署。
3. **基础设施即代码 (IaC)**: 使用 Terraform 管理云资源 (Database, Redis, Storage)。
4. **监控与日志**: 集成 Sentry 与 Prometheus。

## ⏱️ 预计时长 / Estimated Duration
- **阅读**: 2 小时 / 2 Hours
- **实验**: 3-5 小时 / 3-5 Hours

## 📦 交付物清单 / Deliverables Checklist

- [ ] 优化后的 Dockerfile (Multi-stage Build)
- [ ] GitHub Actions Workflow 文件 (`.github/workflows/ci-cd.yml`)
- [ ] Terraform 配置文件 (`main.tf`)
- [ ] 成功部署的生产环境链接 (Vercel + Render/Railway)

## 🧠 核心概念 / Core Concepts

### 1. Docker Multi-stage Build
通过多阶段构建，将构建环境 (Dependencies, TypeScript compiler) 与运行环境 (Dist files, Production node_modules) 分离，显著减小镜像体积。

### 2. CI/CD (Continuous Integration / Continuous Deployment)
- **CI**: 每次提交代码自动运行 Lint, Unit Test, E2E Test。
- **CD**: 测试通过后自动构建镜像并部署到生产服务器。

### 3. Infrastructure as Code (IaC)
使用 Terraform 或 Pulumi 定义云资源，保证环境的一致性与可复现性。避免手动在云控制台点击操作。

## 🛠️ 实验步骤概览 / Lab Steps Overview

1. **Dockerize**: 为 Next.js 和 Nest.js 编写 Dockerfile。
2. **CI Pipeline**: 配置 GitHub Actions，在 PR 时运行测试。
3. **CD Pipeline**: 配置主分支自动部署。
4. **Infrastructure**: 编写 Terraform 脚本创建 PostgreSQL 实例。

## 📚 推荐阅读 / Recommended Reading

- [Docker Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Terraform Get Started](https://developer.hashicorp.com/terraform/intro)

---
[Next Step: Start the Lab ->](./lab/README.md)
