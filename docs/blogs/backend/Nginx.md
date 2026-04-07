# Nginx 核心配置与面试指南

Nginx 是一个高性能的 HTTP 和反向代理 web 服务器，也是目前后端和运维日常工作中最常用的组件之一。本文总结了工作中最常用的 Nginx 配置场景以及面试中常被问到的核心问题。

---

## 🛠 一、 工作中常用的 Nginx 配置场景

### 1. 静态资源托管
前端项目（如 Vue/React 打包后的 dist 目录）最常见的部署方式。

```nginx
server {
    listen 80;
    server_name www.example.com;

    # 开启 gzip 压缩，提升加载速度
    gzip on;
    gzip_types text/plain application/javascript text/css application/json;
    gzip_min_length 1k;

    location / {
        root /usr/share/nginx/html/dist; # 前端打包文件目录
        index index.html index.htm;
        
        # 单页应用 (SPA) 路由 fallback，防止刷新 404
        try_files $uri $uri/ /index.html; 
    }

    # 静态资源缓存设置
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        root /usr/share/nginx/html/dist;
        expires 30d; # 缓存 30 天
        add_header Cache-Control "public, no-transform";
    }
}
```

### 2. 反向代理 (Reverse Proxy) 与跨域解决
将客户端的请求转发给后端的真实服务器（如 Node.js, Java, Python 服务），常用于解决前后端分离时的跨域问题。

```nginx
server {
    listen 80;
    server_name api.example.com;

    location /api/ {
        # 代理到后端真实地址
        proxy_pass http://127.0.0.1:3000/;
        
        # 传递客户端真实 IP 和请求头
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3. 负载均衡 (Load Balancing)
将流量分发到多台上游服务器，提高系统的可用性和吞吐量。

```nginx
# 定义上游服务器集群
upstream backend_servers {
    # 默认轮询算法
    server 192.168.1.10:8080 weight=3; # 权重更高，分配的请求更多
    server 192.168.1.11:8080 weight=1;
    server 192.168.1.12:8080 backup;   # 备用节点，主节点全挂时才启用
}

server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://backend_servers;
    }
}
```

### 4. HTTPS 配置 (SSL 证书)
将 HTTP 请求重定向到 HTTPS，并配置 SSL 证书。

```nginx
# HTTP 自动重定向到 HTTPS
server {
    listen 80;
    server_name secure.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name secure.example.com;

    # 证书文件路径
    ssl_certificate /etc/nginx/ssl/secure.example.com.pem;
    ssl_certificate_key /etc/nginx/ssl/secure.example.com.key;

    # SSL 优化配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://127.0.0.1:8080;
    }
}
```

### 5. WebSocket 代理
如果后端使用了 Socket.io 或原生 WebSocket，Nginx 需要特殊配置来支持协议升级。

```nginx
location /socket.io/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    # 必须设置以下两个 Header，实现 HTTP 到 WebSocket 的协议升级
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
}
```

---

## 💡 二、 Nginx 高频面试题

### 1. 正向代理和反向代理的区别是什么？
- **正向代理 (Forward Proxy)**：代理的是**客户端**。客户端通过代理服务器去访问外网（例如 VPN、翻墙软件）。服务器不知道真实的客户端是谁。
- **反向代理 (Reverse Proxy)**：代理的是**服务端**。客户端直接访问代理服务器，代理服务器再把请求转发给内部的真实服务器。客户端不知道真实的服务器是哪台（Nginx 最常用的场景）。

### 2. Nginx 为什么性能这么高？（Nginx 的架构模型）
Nginx 采用了**多进程 + 异步非阻塞 I/O (epoll)** 模型：
- **Master-Worker 模型**：一个 Master 进程负责管理配置和 Worker 进程，多个 Worker 进程负责处理实际的连接。
- **事件驱动 (epoll)**：一个 Worker 进程在一个线程中可以同时处理数以万计的并发连接，而不需要为每个连接创建新线程，极大地减少了内存占用和上下文切换的开销。

### 3. Nginx 的负载均衡策略有哪些？
Nginx 内置了多种负载均衡算法：
1. **轮询 (Round Robin)**：默认策略，按时间顺序逐一分配。
2. **权重 (Weight)**：给不同服务器设置不同权重，性能好的机器分配更多请求。
3. **IP Hash (`ip_hash`)**：根据客户端 IP 计算 Hash 值分配服务器，**常用于解决 Session 保持问题**。
4. **最少连接 (`least_conn`)**：将请求分配给当前连接数最少的服务器。
5. **URL Hash (`hash $request_uri`)**：根据请求的 URL 进行 Hash 分配，常用于后端是缓存服务器的场景。

### 4. Nginx 如何解决前端 Vue/React 刷新后 404 的问题？
单页应用 (SPA) 只有 `index.html` 一个真实文件，路由是前端通过 History API 模拟的。刷新时，Nginx 会去硬盘找对应的物理路径，找不到就会 404。
**解决办法**：在 `location /` 中使用 `try_files` 指令，将所有找不到的文件请求重定向到 `index.html`。
```nginx
try_files $uri $uri/ /index.html;
```

### 5. Nginx 中的 `location` 匹配优先级是怎样的？
`location` 的匹配规则有严格的优先级顺序（从高到低）：
1. `=`：精确匹配（优先级最高）
2. `^~`：普通字符串的前缀匹配（一旦匹配成功，不再进行正则匹配）
3. `~` 和 `~*`：正则表达式匹配（`~` 区分大小写，`~*` 不区分大小写）
4. `/`：普通前缀匹配（匹配所有请求，兜底）

### 6. 如何限制某个 IP 的访问频率？（防刷/限流）
使用 `limit_req_zone` 和 `limit_req` 指令可以实现基于漏桶算法的限流。
```nginx
# 在 http 块定义：限制每个 IP 每秒只能请求 10 次
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

server {
    location /login/ {
        # 在 location 块应用：burst=20 表示允许突发 20 个请求，nodelay 表示不延迟处理
        limit_req zone=mylimit burst=20 nodelay;
    }
}
```


