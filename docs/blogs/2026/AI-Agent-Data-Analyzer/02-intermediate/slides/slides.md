---
marp: true
theme: default
paginate: true
header: "AI Agent Data Analyst: Module 02"
footer: "2026 Course"
---

# Module 02: Core Infrastructure
## Building the Pipeline

---

# Agenda

1. Backend: Nest.js + Prisma
2. Database: PostgreSQL Schema
3. Frontend: Next.js App Router
4. Data Ingestion: CSV Upload

---

# Nest.js Architecture

- **Controller**: Handle HTTP Requests
- **Service**: Business Logic
- **Module**: Organize Code
- **DTO**: Data Validation

<!--
Explain how Dependency Injection works in Nest.js.
-->

---

# Data Pipeline

1. **Upload**: User uploads CSV via Frontend.
2. **Parse**: Backend parses CSV to JSON.
3. **Store**: Save parsed data to Postgres.
4. **List**: User sees uploaded files.

---

# Lab Overview

- **Goal**: Build a file upload system.
- **Stack**: Nest.js (Multer), Shadcn UI (Upload Component).

<!--
This lab is crucial because AI needs data. Without data, the Agent is useless.
-->
