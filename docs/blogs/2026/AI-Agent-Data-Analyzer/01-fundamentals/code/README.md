# Source Code Placeholder

In this module, you are expected to initialize the project structure.
We do not provide the full source code here to encourage you to build it yourself.

## Directory Structure to Create

```
ai-agent-data-analyzer/
├── apps/
│   ├── web/          # Next.js Frontend
│   │   ├── app/
│   │   ├── public/
│   │   └── package.json
│   └── api/          # Nest.js Backend
│       ├── src/
│       │   ├── app.module.ts
│       │   └── main.ts
│       └── package.json
├── packages/         # Shared libraries (Optional)
│   ├── ui/
│   └── ts-config/
├── package.json      # Root package.json (Turborepo)
└── pnpm-workspace.yaml
```

## Commands Reference

- **Init Turbo**: `pnpm dlx create-turbo@latest`
- **Init Nest**: `nest new api` (inside apps/)
- **Init Next**: `npx create-next-app@latest web` (inside apps/)
