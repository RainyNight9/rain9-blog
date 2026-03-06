---
title: "Lab 02: Building the Foundation"
date: "2026-03-05"
prev:
  text: "02-Intermediate: Infrastructure"
  link: /blogs/2026/AI-Agent-Data-Analyzer/02-intermediate/
next:
  text: "03-Project: Agent Core"
  link: /blogs/2026/AI-Agent-Data-Analyzer/03-project/
---

# Lab 02: Building the Foundation
# 实验 02: 构建基础设施

## 🧪 实验任务 / Tasks

### Task 1: Database & Prisma Setup (数据库与 Prisma 配置)

**Steps:**
1. 在根目录创建 `docker-compose.yml`，定义 PostgreSQL 服务。
2. 在 `apps/api` 安装 Prisma: `pnpm add -D prisma` & `pnpm add @prisma/client`。
3. 初始化 Prisma: `npx prisma init`。
4. 定义 `schema.prisma`:
   ```prisma
   model DataFile {
     id        String   @id @default(uuid())
     filename  String
     url       String   // 本地路径或 S3 URL
     content   Json?    // 简单的 JSON 存储解析后的数据 (为了简化，生产环境应分表)
     createdAt DateTime @default(now())
   }
   ```
5. 运行迁移: `npx prisma migrate dev --name init`。

**验证标准 / Acceptance Criteria:**
- 数据库容器正常运行。
- `DataFile` 表成功创建。
- Prisma Client 生成成功。

### Task 2: Backend File Upload API (后端文件上传 API)

**Steps:**
1. 在 `apps/api` 创建 `DataModule`。
2. 实现 `DataController` 的 POST `/data/upload` 接口。
3. 使用 `FileInterceptor` 处理 `multipart/form-data`。
4. 在 `DataService` 中：
   - 保存文件到本地 `uploads/` 目录。
   - 使用 `csv-parser` 解析 CSV 内容。
   - 将文件名和内容存入数据库。

**代码参考 / Code Snippet:**
```typescript
@Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  return this.dataService.processFile(file);
}
```

**验证标准 / Acceptance Criteria:**
- 使用 Postman 发送 CSV 文件，返回 201 Created。
- 数据库中新增一条记录，包含文件名和解析后的 JSON 内容。

### Task 3: Frontend UI with Shadcn (前端 UI 与 Shadcn)

**Steps:**
1. 在 `apps/web` 初始化 Shadcn UI: `npx shadcn-ui@latest init`。
2. 添加组件: `npx shadcn-ui@latest add button card input table`。
3. 创建 `components/file-upload.tsx`:
   - 使用 `react-dropzone` 或简单 `<input type="file">`。
   - 调用后端 API 上传文件。
4. 创建 `app/page.tsx`:
   - 展示上传组件。
   - 展示已上传文件列表 (Server Component 获取数据)。

**验证标准 / Acceptance Criteria:**
- 页面美观，符合 Shadcn 风格。
- 点击上传，文件成功发送到后端。
- 上传成功后，列表自动刷新 (使用 `revalidatePath` 或 `router.refresh()`)。

## ✅ 自动评分脚本 / Grading Script

我们提供了一个 Playwright 测试脚本来验证前端交互。
请在 `02-intermediate/lab` 目录下运行 `npm test`。

*(注：实际测试脚本代码请查看 `lab/test/lab02.test.js`)*

---
[Back to Module 02](../README.md)
