import{_ as n,o as s,c as i,e as r}from"./app-cb4a12e2.js";const t={};function a(d,e){return s(),i("div",null,[...e[0]||(e[0]=[r(`<h1 id="source-code-structure-for-project-module" tabindex="-1"><a class="header-anchor" href="#source-code-structure-for-project-module" aria-hidden="true">#</a> Source Code Structure for Project Module</h1><p>In this module, you implement the complex business logic of the AI Agent.</p><h2 id="expected-backend-structure-apps-api" tabindex="-1"><a class="header-anchor" href="#expected-backend-structure-apps-api" aria-hidden="true">#</a> Expected Backend Structure (apps/api)</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>src/
├── agent/
│   ├── agent.service.ts   # Core loop: Thought -&gt; Action -&gt; Observation
│   ├── agent.controller.ts
│   ├── tools/             # Tool definitions
│   │   ├── sql-tool.ts
│   │   ├── chart-tool.ts
│   │   └── web-search.ts
│   └── prompts/           # System prompts
│       └── analyst.prompt.ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="expected-frontend-structure-apps-web" tabindex="-1"><a class="header-anchor" href="#expected-frontend-structure-apps-web" aria-hidden="true">#</a> Expected Frontend Structure (apps/web)</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>components/
├── chat/
│   ├── chat-list.tsx
│   ├── chat-input.tsx
│   └── message-bubble.tsx # Supports markdown &amp; components
├── charts/
│   ├── chart-renderer.tsx # ECharts wrapper
│   └── theme.ts
hooks/
└── use-agent.ts           # Custom hook for stream handling
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="key-libraries" tabindex="-1"><a class="header-anchor" href="#key-libraries" aria-hidden="true">#</a> Key Libraries</h2><ul><li><strong>AI Core</strong>: <code>langchain</code>, <code>openai</code>, <code>zod</code> (for schema validation)</li><li><strong>Visualization</strong>: <code>echarts</code>, <code>echarts-for-react</code></li><li><strong>Streaming</strong>: <code>ai</code> (Vercel AI SDK)</li></ul>`,8)])])}const o=n(t,[["render",a],["__file","index.html.vue"]]);export{o as default};
