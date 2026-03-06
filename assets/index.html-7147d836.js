import{_ as s,o as e,c as a,e as i}from"./app-cb4a12e2.js";const t={};function d(l,n){return e(),a("div",null,[...n[0]||(n[0]=[i(`<h1 id="source-code-structure-for-deployment-module" tabindex="-1"><a class="header-anchor" href="#source-code-structure-for-deployment-module" aria-hidden="true">#</a> Source Code Structure for Deployment Module</h1><p>In this module, you define how the application is built and deployed.</p><h2 id="expected-structure" tabindex="-1"><a class="header-anchor" href="#expected-structure" aria-hidden="true">#</a> Expected Structure</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.github/
└── workflows/
    ├── ci.yml             # Test &amp; Lint
    └── cd.yml             # Build &amp; Deploy
infra/
├── main.tf                # Terraform config
├── variables.tf
└── outputs.tf
apps/
├── api/
│   └── Dockerfile
└── web/
    └── Dockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dockerfile-example-nest-js-optimized" tabindex="-1"><a class="header-anchor" href="#dockerfile-example-nest-js-optimized" aria-hidden="true">#</a> Dockerfile Example (Nest.js Optimized)</h2><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment"># Stage 1: Build</span>
<span class="token instruction"><span class="token keyword">FROM</span> node:20-alpine <span class="token keyword">AS</span> builder</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span>
<span class="token instruction"><span class="token keyword">COPY</span> package*.json ./</span>
<span class="token instruction"><span class="token keyword">RUN</span> npm ci</span>
<span class="token instruction"><span class="token keyword">COPY</span> . .</span>
<span class="token instruction"><span class="token keyword">RUN</span> npm run build</span>

<span class="token comment"># Stage 2: Production</span>
<span class="token instruction"><span class="token keyword">FROM</span> node:20-alpine</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /app/dist ./dist</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /app/node_modules ./node_modules</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;node&quot;</span>, <span class="token string">&quot;dist/main&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)])])}const r=s(t,[["render",d],["__file","index.html.vue"]]);export{r as default};
