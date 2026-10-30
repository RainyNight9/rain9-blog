# Python 后端开发指南

> Python 是 AI 时代的事实标准胶水语言：既能写服务端（FastAPI/Django），又是模型与 Agent 生态（Pydantic、LangChain 等）的第一载体。本文面向有 JS/Go 经验的工程师，按「环境 → 语言 → 框架 → 数据 → AI 生态」主线整理。

---

## 1. 环境与工程化（先把这个理顺）

Python 的「环境地狱」是新手劝退第一关，2024 年后标准答案已收敛到 **uv**：

| 工具 | 定位 | 现状 |
|------|------|------|
| **uv** | Rust 编写的一体化工具：包管理 + 虚拟环境 + Python 版本管理 + 锁文件 | 事实上的新一代标准，极快 |
| venv + pip | 标准库内置 | 仍在广泛使用，理解它有助于理解一切 |
| poetry | 依赖管理老牌方案 | 存量大，新项目多被 uv 替代 |
| pyenv | 多 Python 版本 | uv 已内置该能力 |

```sh
# uv 典型工作流
uv init my-app && cd my-app
uv add fastapi uvicorn        # 加依赖（自动建 venv + 写锁文件）
uv run python main.py         # 在项目环境里执行
uv python install 3.13        # 管理解释器版本
```

**版本现状（2026）**：3.13（2024.10）引入实验性 free-threaded 构建（去除 GIL，PEP 703）与实验性 JIT；3.14（2025.10）起 free-threading 进入官方支持阶段。生产选型写服务建议 3.12/3.13，做 AI 生态跟随框架要求即可。

---

## 2. 语言核心：从 JS/Go 视角快速建立正确的认知

### 2.1 必须吃透的六个点

1. **动态强类型 + 类型注解**：注解（`def f(x: int) -> str`）运行时不强制，但配合 **mypy / pyright** 做静态检查后，工程体验接近 TS。现代项目（尤其 FastAPI）默认全量注解
2. **GIL（全局解释器锁）**：CPython 中同一时刻只有一个线程执行 Python 字节码。因此 **CPU 密集用 multiprocessing/进程池，IO 密集用 asyncio 或线程**；3.13+ 的 free-threading 构建可摆脱 GIL，但生态兼容仍在推进
3. **一切皆对象**：函数是一等公民，装饰器（`@decorator`）就是「接收函数返回函数」的语法糖——理解了它就读懂了 FastAPI/Django 的大部分魔法
4. **鸭子类型 + 魔法方法**：`__len__`、`__enter__/__exit__`（with 语句）、`__iter__` 等协议决定对象行为；类型注解时代用 `Protocol`（结构化类型，类似 TS 的 interface）表达鸭子类型
5. **asyncio**：`async def / await` 与 JS 的 async/await 心智一致；区别是 Python 有独立的事件循环（`asyncio.run()`），CPU 密集任务用 `asyncio.to_thread()` 抛给线程
6. **包管理与导入**：模块 = 文件，包 = 带 `__init__.py` 的目录；相对导入 `. / ..`，命名空间与 JS 的 ESM 有差异，踩坑高发

### 2.2 数据结构速查

```python
# 列表推导式（最常用的 Pythonic 写法）
squares = [x * x for x in range(10) if x % 2 == 0]
# 字典 / 集合推导
heights = {u.name: u.height for u in users}
# 解构与打包
first, *rest = [1, 2, 3, 4]
# 生成器：惰性求值，处理大数据不爆内存
total = sum(len(line) for line in open("big.log"))
# dataclass：结构化数据容器（Pydantic 的「标准库版」）
from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int = 0
```

---

## 3. Web 框架：FastAPI 与 Django 怎么选

| | **FastAPI** | **Django** | **Flask** |
|--|------------|------------|-----------|
| 定位 | 现代 API 服务（ASGI） | 全家桶（ORM/Admin/Auth/迁移） | 微框架，自己组装 |
| 类型与校验 | Pydantic + 注解，自动 OpenAPI 文档 | 表单/序列化器体系 | 手动或插件 |
| 异步 | 原生 async | 3.x 起逐步支持（ORM 异步接口） | 需搭配 ASGI（如 Quart） |
| 适合 | API 服务、AI 服务、微服务 | 内容型/管理后台型全栈应用 | 小服务、原型 |

### 3.1 FastAPI 最小可用示例（生产骨架）

```python
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field

app = FastAPI(title="demo")
items: dict[int, dict] = {}          # 演示用内存存储

class ItemIn(BaseModel):
    name: str = Field(min_length=1, max_length=50)
    price: float = Field(gt=0)

@app.get("/items/{item_id}")
async def get_item(item_id: int):          # 路径参数自动类型转换与校验
    if item_id not in items:
        raise HTTPException(status_code=404, detail="not found")
    return items[item_id]

@app.post("/items", status_code=201)
async def create_item(item: ItemIn):       # 请求体自动解析 + 校验
    new_id = len(items) + 1
    items[new_id] = item.model_dump()      # model_dump 是 Pydantic v2 API
    return {"id": new_id, **items[new_id]}

# 依赖注入：鉴权、DB 会话等横切关注点的标准位置
async def current_user(token: str = Depends(parse_token)) -> User:
    ...
```

要点：**Pydantic 模型即文档**（自动生成 `/docs` 的 OpenAPI/Swagger）；`Depends` 是 Nest.js 式依赖注入的 Python 版；部署用 `uvicorn`（单 worker 异步）或 `gunicorn -k uvicorn.workers.UvicornWorker` 多进程。

### 3.2 Django 一句话定位

ORM + Admin 后台 + 认证体系开箱即用，DRF（Django REST framework）做 API。适合「有管理后台、以 CRUD 为主体」的业务系统；学习成本高于 FastAPI 但体系完整。

---

## 4. 数据访问与任务队列

| 场景 | 主流方案 | 说明 |
|------|----------|------|
| ORM | **SQLAlchemy 2.0** | 事实标准；2.0 起原生支持 async（`AsyncSession`） |
| 迁移 | Alembic | 配 SQLAlchemy 做版本化迁移 |
| FastAPI 生态 ORM | SQLModel / Tortoise | SQLModel 由 FastAPI 作者维护，Pydantic + SQLAlchemy 合体 |
| 后台任务 | **Celery** / arq / dramatiq | Celery 最成熟（配 Redis/RabbitMQ 作 broker）；async 栈可选 arq |
| 缓存 | redis-py | 客户端自带异步版本 |
| 测试 | **pytest** | fixture 体系 + 参数化是精髓，配 `pytest-asyncio` 测异步 |

---

## 5. Python 在 AI 工程里的位置（呼应本站 AI 主题）

- **Pydantic** 是整个 LLM 应用生态的地基：结构化输出、Agent 参数校验、配置管理都在用它
- 模型侧：PyTorch / transformers / vLLM 全是 Python 生态；推理服务常用 FastAPI 包一层
- Agent 侧：LangChain / LlamaIndex / pydantic-ai 等框架均为 Python 优先
- 因此「全栈 AI Agent 工程师」的合理配置是：**TypeScript 做产品与前端，Python 做 AI 服务与数据处理**，两者经 HTTP/队列协作

---

## 6. 工程规范清单

- [ ] 格式化与 lint 统一到 **ruff**（一个工具替代 black/isort/flake8，快 10-100x）
- [ ] 类型检查：pyright（快）或 mypy（插件多），CI 强制
- [ ] 不用 `requirements.txt` 裸奔：锁文件（`uv.lock` / `poetry.lock`）进版本库
- [ ] 密钥走环境变量（pydantic-settings），绝不进代码
- [ ] 异步服务里不要混用阻塞调用（`requests` 换 `httpx`），否则卡死整个事件循环
- [ ] 测试金字塔：pytest 单测 + FastAPI `TestClient` 集成测

---

## 7. 延伸阅读

- 站内：[后端语言选型对比](./language-selection.md) · [Docker 指南](./docker.md) · [MySQL](./mysql.md) · [Redis](./redis.md)
- 官方：[uv](https://docs.astral.sh/uv/) · [FastAPI](https://fastapi.tiangolo.com/) · [SQLAlchemy 2.0](https://docs.sqlalchemy.org/)
