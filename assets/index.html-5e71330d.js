import{_ as i,o as d,c as n,e as a}from"./app-cb4a12e2.js";const s={};function r(t,e){return d(),n("div",null,[...e[0]||(e[0]=[a(`<h1 id="source-code-structure-for-intermediate-module" tabindex="-1"><a class="header-anchor" href="#source-code-structure-for-intermediate-module" aria-hidden="true">#</a> Source Code Structure for Intermediate Module</h1><p>In this module, you build the core data ingestion pipeline.</p><h2 id="expected-backend-structure-apps-api" tabindex="-1"><a class="header-anchor" href="#expected-backend-structure-apps-api" aria-hidden="true">#</a> Expected Backend Structure (apps/api)</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>src/
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="expected-frontend-structure-apps-web" tabindex="-1"><a class="header-anchor" href="#expected-frontend-structure-apps-web" aria-hidden="true">#</a> Expected Frontend Structure (apps/web)</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app/
├── layout.tsx             # Root layout with fonts/providers
├── page.tsx               # Dashboard home
└── api/                   # (Optional) Next.js API routes if not using Nest directly
components/
├── ui/                    # Shadcn components (Button, Card...)
└── file-upload.tsx        # Upload logic
lib/
└── utils.ts               # cn() helper
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="key-libraries" tabindex="-1"><a class="header-anchor" href="#key-libraries" aria-hidden="true">#</a> Key Libraries</h2><ul><li><strong>Backend</strong>: <code>@nestjs/platform-express</code> (Multer), <code>csv-parser</code>, <code>@prisma/client</code></li><li><strong>Frontend</strong>: <code>lucide-react</code>, <code>clsx</code>, <code>tailwind-merge</code></li></ul>`,8)])])}const c=i(s,[["render",r],["__file","index.html.vue"]]);export{c as default};
