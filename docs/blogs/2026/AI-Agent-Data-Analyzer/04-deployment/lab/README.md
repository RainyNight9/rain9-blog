---
title: "Lab 04: Shipping It!"
date: "2026-03-05"
prev:
  text: "04-Deployment: Production"
  link: /blogs/2026/AI-Agent-Data-Analyzer/04-deployment/
next:
  text: "Course Overview"
  link: /blogs/2026/AI-Agent-Data-Analyzer/
---

# Lab 04: Shipping It!
# 实验 04: 发布上线！

## 🧪 实验任务 / Tasks

### Task 1: Optimized Dockerfile (编写 Dockerfile)

在 `apps/api` 和 `apps/web` 分别编写 Dockerfile。

**Backend Dockerfile Strategy:**
1. **Base**: `node:20-alpine`
2. **Builder**: Install dependencies, build Nest.js app.
3. **Runner**: Copy `dist/` and `node_modules/` (production only).
4. **CMD**: `node dist/main`

**Frontend Dockerfile Strategy:**
1. **Base**: `node:20-alpine`
2. **Builder**: Build Next.js app (`next build`).
3. **Runner**: Copy `.next/standalone` (Next.js Output Trace).
4. **CMD**: `node server.js`

**验证标准 / Acceptance Criteria:**
- `docker build` 成功。
- 镜像大小 < 200MB (`docker images` 查看)。
- 容器启动后功能正常。

### Task 2: GitHub Actions CI/CD (配置 CI/CD)

创建 `.github/workflows/main.yml`：

1. **Trigger**: `push` on `main`, `pull_request`.
2. **Jobs**:
   - `lint`: 运行 ESLint。
   - `test`: 运行 Jest。
   - `build`: 运行 Docker build。
   - `deploy`: (仅 main 分支) 推送镜像到 Docker Hub / GHCR，触发 Render Deploy Hook。

**验证标准 / Acceptance Criteria:**
- 提交代码后，GitHub Actions tab 显示绿色对勾。
- 自动部署成功。

### Task 3: Terraform Infrastructure (IaC 实战)

在 `infra/` 目录编写 `main.tf`：

1. Provider: AWS / Google Cloud / Local Docker.
2. Resource:
   - `docker_container`: PostgreSQL DB.
   - `docker_container`: Redis.
3. Output: 打印数据库连接字符串。

*(注：为简化实验，可使用 Local Docker provider)*

**验证标准 / Acceptance Criteria:**
- `terraform apply` 成功创建容器。
- `terraform destroy` 成功销毁容器。

## ✅ 自动评分脚本 / Grading Script

我们提供了一个脚本检查 Dockerfile 及其构建产物的大小。
请在 `04-deployment/lab` 目录下运行 `npm test`。

---
[Back to Module 04](../README.md)
