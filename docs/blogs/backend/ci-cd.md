# CI/CD：GitHub Actions 从提交到上线

> 代码推上去，剩下的交给流水线。本文以 GitHub Actions 为载体讲清 CI/CD 的完整形态：检查 → 测试 → 构建 → 发布 → 部署，是 [Docker](./docker.md) 与 [Kubernetes](./k8s.md) 的天然续篇。

---

## 1. 概念对齐

- **CI（持续集成）**：每次提交自动跑 lint + test + build，尽早暴露问题
- **CD**：持续**交付**（产物随时可发布，需人工点按钮）与持续**部署**（通过即自动上线）
- 一条流水线的标准阶段：`lint → test → build → 打包镜像 → 推送仓库 → 部署 → 冒烟验证`

GitHub Actions 的三层数量关系：**Workflow（.github/workflows/*.yml）→ Job（默认并行）→ Step（串行）**。

---

## 2. 一个真实可用的 Node 项目 Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:

concurrency:                       # 同一分支新提交来了，取消还在跑的旧构建
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm              # 自动缓存 pnpm store
      - run: corepack enable
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test --coverage
      - run: pnpm build
```

要点：**lockfile 进仓库 + `--frozen-lockfile`**（构建可复现）；`cache: pnpm` 省掉大部分安装时间；`concurrency` 省机器时间也省免费额度。

---

## 3. 多平台/多版本矩阵

```yaml
jobs:
  test:
    strategy:
      fail-fast: false             # 一个挂了不影响其他组合跑完
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        node: [20, 22]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/setup-node@v4
        with: { node-version: "${{ matrix.node }}" }
```

桌面端项目（[Electron](/blogs/desktop/electron.md)/Tauri）发三平台安装包，靠的就是矩阵 + 平台专属签名步骤。

---

## 4. 构建并推送 Docker 镜像

```yaml
jobs:
  image:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write              # 允许推送 GHCR
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: |
            ghcr.io/${{ github.repository }}:latest
            ghcr.io/${{ github.repository }}:${{ github.sha }}
```

经验法则：**latest 之外永远再打一个不可变 tag**（commit SHA 或语义化版本），回滚和审计全靠它。镜像安全扫描（trivy / docker scout）也建议加在此处。

---

## 5. 部署：三种典型形态

| 形态 | 做法 | 适用 |
|------|------|------|
| **服务器 SSH** | `appleboy/ssh-action` 连上去拉新镜像重启 | 单机/轻量，见 [Docker](./docker.md) |
| **Kubernetes** | `kubectl set image` 或改 Git 清单触发 | 集群交付，见 [K8s](./k8s.md) |
| **平台托管** | Vercel/Netlify/云托管，push 即部署 | 前端与 Serverless |

```yaml
  deploy:
    needs: [test, image]           # 全绿才部署
    runs-on: ubuntu-latest
    environment: production        # 可配「必须人工审批」
    steps:
      - uses: actions/checkout@v4
      - uses: azure/setup-kubectl@v4
      - run: |
          kubectl set image deploy/api \
            api=ghcr.io/${{ github.repository }}:${{ github.sha }}
```

- **environment**：在仓库 Settings 里给 `production` 配置 required reviewers —— 部署前卡一道人工审批，这就是「持续交付」与「持续部署」的开关
- 云厂商密钥放 **Secrets**（如 `KUBE_CONFIG`），绝不写进 yml； OIDC 短时凭证（如 `aws-actions/configure-aws-credentials`）优于长期静态密钥

---

## 6. Monorepo 与提效

- **按路径触发**：`on.push.paths: ['packages/web/**']` 只跑受影响的部分；更精细的用 `turbo run build --filter=...[origin/main]` 这类变更感知构建
- **缓存一切**：依赖 store（pnpm）、构建产物（actions/cache）、Docker layer（buildx 的 `cache-from/cache-to: type=gha`）
- **合并队列/分支保护**：main 只接受「CI 全绿」的 PR 合并，这是 CI 价值的制度保障
- **坏信号自检**：CI 比本地慢很多（缓存没配）、flaky 测试被无脑重试掩盖（该修就修）、只有部署没有回滚预案

---

## 7. 检查清单

- [ ] PR 必须过 CI 才能合并（分支保护）
- [ ] lint + typecheck + test + build 四件套齐全
- [ ] 镜像双 tag（latest + SHA），扫描进流水线
- [ ] 生产环境有人工审批 + 一键回滚
- [ ] 密钥全部走 Secrets/OIDC，日志里不打敏感信息
- [ ] concurrency 取消过期构建，缓存命中率定期看

> 延伸：[Docker](./docker.md) · [Kubernetes](./k8s.md) · [Nginx](./Nginx.md) · [认证与鉴权](./auth.md)
