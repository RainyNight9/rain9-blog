---
marp: true
theme: default
paginate: true
header: "AI Agent Data Analyst: Module 04"
footer: "2026 Course"
---

# Module 04: Production Deployment
## Shipping It!

---

# Agenda

1. Docker Optimization
2. CI/CD with GitHub Actions
3. Infrastructure as Code (Terraform)
4. Monitoring (Sentry / Prometheus)

---

# Docker Multi-stage Build

- **Stage 1 (Builder)**: Install all deps, build TypeScript.
- **Stage 2 (Runner)**: Only copy `dist` and `node_modules`.
- **Result**: < 200MB Image vs 1GB+.

<!--
This is critical for fast deployments and lower costs.
-->

---

# CI/CD Pipeline

- **Push -> Lint -> Test -> Build -> Deploy**
- Automate everything.
- Don't deploy manually.

---

# Lab Overview

- **Goal**: Deploy your Agent to the cloud.
- **Tools**: Docker, GitHub Actions, Vercel/Render.

<!--
This is the final step. Congratulations on making it this far!
-->
