# Nest.js

## 一、核心概念与架构

- 设计哲学：面向模块化的服务端框架，受 Angular 启发，强调 DI（依赖注入）、装饰器与元数据
- 关键构件：
  - Module：功能边界与提供者集合
  - Controller：请求入口（REST/GraphQL/WebSocket）
  - Provider：可注入的服务（Service/Repository/Factory）
  - Pipe/Guard/Interceptor/Filter：入参校验、鉴权、AOP、错误处理
  - Middleware：路由前置处理
- 生命周期：onModuleInit/onApplicationBootstrap/onModuleDestroy/beforeApplicationShutdown
- 作用域与请求范围：默认单例；可设置 `scope: Scope.REQUEST` 处理每请求隔离

## 二、装饰器与 DI 机制

- 常用装饰器：@Module/@Injectable/@Controller/@Get/@Post/@Param/@Body/@Query
- 自定义装饰器：基于 `createParamDecorator` 提取上下文信息（如 userId）
- DI 解析规则：
  - 基于 Token（类/字符串/值）查找 Provider
  - `useClass/useValue/useFactory` 三种提供者模式
  - `@Inject(TOKEN)` 指定注入目标，避免循环依赖
- 循环依赖处理：`forwardRef(() => ServiceA)` 与解耦接口抽象

## 三、请求处理链与横切能力

- Pipe（入参校验/转换）：结合 class-validator/class-transformer 与 `ValidationPipe`
- Guard（鉴权/权限）：`CanActivate` 返回真/假；结合角色/策略
- Interceptor（AOP/响应包装/缓存）：`CallHandler` 可修改流、度量耗时
- Exception Filter（统一错误结构）：`@Catch(HttpException)` 输出统一响应体
- Middleware（如日志/跨域/限流）：在 `configure(consumer)` 中挂载

## 四、数据访问与事务

- TypeORM/Prisma 选型：
  - TypeORM：装饰器模型，迁移命令内置，Active Record/Repository
  - Prisma：Schema 驱动，生成类型安全 Client，迁移明确
- 事务与一致性：
  - TypeORM：`queryRunner` 或 `manager.transaction`
  - Prisma：`prisma.$transaction([op1, op2])`
- 多租户/读写分离：基于请求上下文选择连接/Schema

## 五、消息与微服务

- Transport 支持：TCP/Redis/NATS/Kafka/RMQ
- Pattern：`ClientProxy` 请求-响应 / 事件驱动（emit）
- Saga/CQRS：使用 `@nestjs/cqrs` 指令分离 Command/Query/Event/Handler
- WebSocket：`@WebSocketGateway` + `@SubscribeMessage`

## 六、配置与安全

- ConfigModule：集中化配置管理，支持 `.env` 与校验（zod/joi）
- 认证授权：
  - JWT：Passport + `@UseGuards(AuthGuard('jwt'))`
  - RBAC：角色守卫 + `@SetMetadata('roles', ['admin'])`
- 输入/输出安全：
  - 统一使用 `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })`
  - 响应序列化：`ClassSerializerInterceptor` 与 `@Exclude/@Expose`
- CORS/Helmet/RateLimit：中间件增强安全

## 七、测试（Unit/E2E）

- 单元测试：
  - `Test.createTestingModule({ providers: [...] })` 注入依赖
  - 使用 `jest.fn()`/`useValue` 模拟外部服务
- E2E 测试：
  - `supertest` 结合 `app.getHttpServer()` 调用真实路由
  - 使用 `ValidationPipe` 与全局拦截器确保与生产一致

```ts
import { Test } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './app.module'

describe('E2E', () => {
  let app: INestApplication
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile()
    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init()
  })
  it('GET /health', async () => {
    await request(app.getHttpServer()).get('/health').expect(200)
  })
})
```

## 八、调试与定位问题

- VS Code 断点调试（推荐）：
  - 新建 `.vscode/launch.json`，启用 Node Inspector 与 ts-node/register

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Nest Debug",
      "runtimeExecutable": "node",
      "runtimeArgs": ["--inspect-brk", "-r", "ts-node/register"],
      "args": ["src/main.ts"],
      "cwd": "${workspaceFolder}",
      "env": { "NODE_ENV": "development" },
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

- CLI 调试：
  - `nest start --debug --watch`
  - 或 `node --inspect-brk -r ts-node/register src/main.ts`
- 日志与追踪：
  - 使用 `Logger` 设置上下文：`new Logger('UserService').log('...')`
  - Interceptor 统计响应耗时；结合 APM（如 OpenTelemetry）
- 常见问题定位：
  - 依赖未注入：检查 Module imports/providers/exports
  - 循环依赖：使用 `forwardRef` 或拆分接口
  - DTO 校验未生效：确认启用全局 `ValidationPipe`

## 九、部署与运维

- 直接运行（PM2）：

```bash
pm2 start dist/main.js --name nest-app
pm2 logs nest-app
pm2 restart nest-app
```

- Docker 部署（多阶段构建）：

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

- docker-compose（示例含 Postgres）：

```yaml
version: '3.8'
services:
  api:
    build: .
    ports: ["3000:3000"]
    env_file: .env
    depends_on: ["db"]
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: example
      POSTGRES_DB: app
    ports: ["5432:5432"]
```

- 反向代理（Nginx）与 TLS：

```nginx
server {
  listen 443 ssl;
  server_name api.example.com;
  ssl_certificate /etc/ssl/cert.pem;
  ssl_certificate_key /etc/ssl/key.pem;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

- 迁移与健康检查：
  - Prisma：`prisma migrate deploy`
  - TypeORM：`typeorm migration:run`
  - 健康检查：`/health` + readiness/liveness（K8s）

- CI/CD（GitHub Actions 示例）：

```yaml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint && npm run test
      - run: npm run build
      - uses: docker/build-push-action@v6
        with:
          push: false
          tags: ghcr.io/owner/nest-app:latest
```

## 十、面试回答模板（可直接背诵）

- 架构与职责：
  - “我基于 Nest 的模块化/DI 体系，划分功能边界；用 Guard/Interceptor/Pipe/Filter 实现鉴权、校验、AOP 与统一错误输出。”
- 性能与稳定性：
  - “通过缓存拦截器与数据库索引优化接口性能；用事务与幂等保证一致性；引入健康检查与灰度发布确保稳定性。”
- 部署与工程化：
  - “多阶段 Docker 构建 + Nginx 反代；CI 统一 lint/test/build；PM2/K8s 保证服务可用与滚动更新。”
