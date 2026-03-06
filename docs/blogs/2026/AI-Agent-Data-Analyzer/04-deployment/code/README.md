# Source Code Structure for Deployment Module

In this module, you define how the application is built and deployed.

## Expected Structure

```
.github/
└── workflows/
    ├── ci.yml             # Test & Lint
    └── cd.yml             # Build & Deploy
infra/
├── main.tf                # Terraform config
├── variables.tf
└── outputs.tf
apps/
├── api/
│   └── Dockerfile
└── web/
    └── Dockerfile
```

## Dockerfile Example (Nest.js Optimized)

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/main"]
```
