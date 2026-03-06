# Source Code Structure for Intermediate Module

In this module, you build the core data ingestion pipeline.

## Expected Backend Structure (apps/api)

```
src/
├── app.module.ts
├── main.ts
├── prisma/
│   └── prisma.service.ts  # Database connection
└── data/
    ├── data.module.ts
    ├── data.controller.ts # Endpoints: upload, list
    ├── data.service.ts    # Logic: parse CSV, save to DB
    └── dto/
        └── upload-file.dto.ts
```

## Expected Frontend Structure (apps/web)

```
app/
├── layout.tsx             # Root layout with fonts/providers
├── page.tsx               # Dashboard home
└── api/                   # (Optional) Next.js API routes if not using Nest directly
components/
├── ui/                    # Shadcn components (Button, Card...)
└── file-upload.tsx        # Upload logic
lib/
└── utils.ts               # cn() helper
```

## Key Libraries

- **Backend**: `@nestjs/platform-express` (Multer), `csv-parser`, `@prisma/client`
- **Frontend**: `lucide-react`, `clsx`, `tailwind-merge`
