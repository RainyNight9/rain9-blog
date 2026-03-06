---
title: "Lab 03: The Brain of the Analyst"
date: "2026-03-05"
prev:
  text: "03-Project: Agent Core"
  link: /blogs/2026/AI-Agent-Data-Analyzer/03-project/
next:
  text: "04-Deployment: Production"
  link: /blogs/2026/AI-Agent-Data-Analyzer/04-deployment/
---

# Lab 03: The Brain of the Analyst
# 实验 03: 分析师的大脑

## 🧪 实验任务 / Tasks

### Task 1: Define Tools (定义工具)

在 `apps/api` 中定义两个核心工具：

1. **SQL Query Tool**:
   - 输入: `sql_query` (string)
   - 功能: 在数据库中执行 SQL，返回 JSON 数据。
   - 安全: 仅限 SELECT 权限 (只读)。

2. **Chart Config Tool**:
   - 输入: `chart_type` (bar/line/pie), `x_axis` (field), `y_axis` (field), `title` (string)
   - 功能: 生成 ECharts 的 `option` 对象。

**验证标准 / Acceptance Criteria:**
- 单元测试覆盖工具逻辑。
- 模拟调用工具能返回预期结果。

### Task 2: Implement Agent Logic (实现 Agent 逻辑)

使用 OpenAI Function Calling API 或 LangChain：

1. 接收用户输入 (e.g., "分析上个月的销售趋势")。
2. LLM 决定调用 `SQL Query Tool`。
3. 执行 SQL，获取数据。
4. LLM 观察数据，决定调用 `Chart Config Tool`。
5. 返回最终结果：文本解释 + 图表配置。

**代码参考 / Code Snippet (Conceptual):**
```typescript
async function runAgent(query: string) {
  const messages = [{ role: 'user', content: query }];
  
  while (true) {
    const response = await llm.chat({ messages, tools: [sqlTool, chartTool] });
    const message = response.choices[0].message;

    if (message.tool_calls) {
      // Execute tool
      const toolResult = await executeTool(message.tool_calls[0]);
      messages.push(message);
      messages.push({ role: 'tool', content: toolResult });
    } else {
      return message.content; // Final answer
    }
  }
}
```

### Task 3: Frontend Streaming Chat (前端流式对话)

在 `apps/web` 中实现：

1. 使用 `useChat` hook (Vercel AI SDK)。
2. 自定义 `Message` 组件，支持渲染 Markdown 和 图表。
3. 当消息包含 `chart_config` 时，渲染 ECharts 组件。

**验证标准 / Acceptance Criteria:**
- 对话流畅，打字机效果。
- 提问 "画一个饼图"，能正确显示饼图组件。

### Task 4: Integration Test (集成测试)

编写一个 E2E 测试 (Playwright)：
1. 打开页面。
2. 输入 "统计各产品类别的销售额"。
3. 验证页面出现了一个柱状图 (Bar Chart)。
4. 验证图表数据与数据库一致。

## ✅ 自动评分脚本 / Grading Script

我们提供了一个 Jest 脚本来模拟 Agent 对话流程并验证输出结构。
请在 `03-project/lab` 目录下运行 `npm test`。

---
[Back to Module 03](../README.md)
