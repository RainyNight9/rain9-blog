# Source Code Structure for Project Module

In this module, you implement the complex business logic of the AI Agent.

## Expected Backend Structure (apps/api)

```
src/
├── agent/
│   ├── agent.service.ts   # Core loop: Thought -> Action -> Observation
│   ├── agent.controller.ts
│   ├── tools/             # Tool definitions
│   │   ├── sql-tool.ts
│   │   ├── chart-tool.ts
│   │   └── web-search.ts
│   └── prompts/           # System prompts
│       └── analyst.prompt.ts
```

## Expected Frontend Structure (apps/web)

```
components/
├── chat/
│   ├── chat-list.tsx
│   ├── chat-input.tsx
│   └── message-bubble.tsx # Supports markdown & components
├── charts/
│   ├── chart-renderer.tsx # ECharts wrapper
│   └── theme.ts
hooks/
└── use-agent.ts           # Custom hook for stream handling
```

## Key Libraries

- **AI Core**: `langchain`, `openai`, `zod` (for schema validation)
- **Visualization**: `echarts`, `echarts-for-react`
- **Streaming**: `ai` (Vercel AI SDK)
