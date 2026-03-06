---
marp: true
theme: default
paginate: true
header: "AI Agent Data Analyst: Module 03"
footer: "2026 Course"
---

# Module 03: Building the Agent Core
## The "Brain" of the Analyst

---

# Agenda

1. The ReAct Pattern
2. NLU (Natural Language Understanding)
3. Tool Use (Function Calling)
4. Streaming UI

---

# ReAct Loop

- **Reason**: Think about the user's question.
- **Act**: Choose a tool (SQL, Web Search).
- **Observe**: See the tool's result.
- **Answer**: Formulate the final response.

<!--
This loop is what makes the Agent autonomous.
-->

---

# Tool Definition

```typescript
{
  name: "query_sql",
  description: "Execute a SQL query",
  parameters: {
    type: "object",
    properties: {
      sql: { type: "string" }
    }
  }
}
```

---

# Lab Overview

- **Goal**: Implement the "Analyst Agent".
- **Stack**: LangChain / OpenAI API, ECharts.

<!--
This is the most exciting part. You will see the AI write SQL and draw charts.
-->
