import{_ as s,o as a,c as e,e as i}from"./app-83da4608.js";const t={};function c(p,n){return a(),e("div",null,[...n[0]||(n[0]=[i(`<h1 id="nginx-核心配置与面试指南" tabindex="-1"><a class="header-anchor" href="#nginx-核心配置与面试指南" aria-hidden="true">#</a> Nginx 核心配置与面试指南</h1><p>Nginx 是一个高性能的 HTTP 和反向代理 web 服务器，也是目前后端和运维日常工作中最常用的组件之一。本文总结了工作中最常用的 Nginx 配置场景以及面试中常被问到的核心问题。</p><hr><h2 id="🛠-一、-工作中常用的-nginx-配置场景" tabindex="-1"><a class="header-anchor" href="#🛠-一、-工作中常用的-nginx-配置场景" aria-hidden="true">#</a> 🛠 一、 工作中常用的 Nginx 配置场景</h2><h3 id="_1-静态资源托管" tabindex="-1"><a class="header-anchor" href="#_1-静态资源托管" aria-hidden="true">#</a> 1. 静态资源托管</h3><p>前端项目（如 Vue/React 打包后的 dist 目录）最常见的部署方式。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> www.example.com</span><span class="token punctuation">;</span>

    <span class="token comment"># 开启 gzip 压缩，提升加载速度</span>
    <span class="token directive"><span class="token keyword">gzip</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">gzip_types</span> text/plain application/javascript text/css application/json</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">gzip_min_length</span> <span class="token number">1k</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html/dist</span><span class="token punctuation">;</span> <span class="token comment"># 前端打包文件目录</span>
        <span class="token directive"><span class="token keyword">index</span> index.html index.htm</span><span class="token punctuation">;</span>
        
        <span class="token comment"># 单页应用 (SPA) 路由 fallback，防止刷新 404</span>
        <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span>

    <span class="token comment"># 静态资源缓存设置</span>
    <span class="token directive"><span class="token keyword">location</span> ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg)$</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html/dist</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">expires</span> <span class="token number">30d</span></span><span class="token punctuation">;</span> <span class="token comment"># 缓存 30 天</span>
        <span class="token directive"><span class="token keyword">add_header</span> Cache-Control <span class="token string">&quot;public, no-transform&quot;</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-反向代理-reverse-proxy-与跨域解决" tabindex="-1"><a class="header-anchor" href="#_2-反向代理-reverse-proxy-与跨域解决" aria-hidden="true">#</a> 2. 反向代理 (Reverse Proxy) 与跨域解决</h3><p>将客户端的请求转发给后端的真实服务器（如 Node.js, Java, Python 服务），常用于解决前后端分离时的跨域问题。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> api.example.com</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /api/</span> <span class="token punctuation">{</span>
        <span class="token comment"># 代理到后端真实地址</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:3000/</span><span class="token punctuation">;</span>
        
        <span class="token comment"># 传递客户端真实 IP 和请求头</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-Proto <span class="token variable">$scheme</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-负载均衡-load-balancing" tabindex="-1"><a class="header-anchor" href="#_3-负载均衡-load-balancing" aria-hidden="true">#</a> 3. 负载均衡 (Load Balancing)</h3><p>将流量分发到多台上游服务器，提高系统的可用性和吞吐量。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 定义上游服务器集群</span>
<span class="token directive"><span class="token keyword">upstream</span> backend_servers</span> <span class="token punctuation">{</span>
    <span class="token comment"># 默认轮询算法</span>
    <span class="token directive"><span class="token keyword">server</span> 192.168.1.10:8080 weight=3</span><span class="token punctuation">;</span> <span class="token comment"># 权重更高，分配的请求更多</span>
    <span class="token directive"><span class="token keyword">server</span> 192.168.1.11:8080 weight=1</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 192.168.1.12:8080 backup</span><span class="token punctuation">;</span>   <span class="token comment"># 备用节点，主节点全挂时才启用</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> app.example.com</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://backend_servers</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-https-配置-ssl-证书" tabindex="-1"><a class="header-anchor" href="#_4-https-配置-ssl-证书" aria-hidden="true">#</a> 4. HTTPS 配置 (SSL 证书)</h3><p>将 HTTP 请求重定向到 HTTPS，并配置 SSL 证书。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># HTTP 自动重定向到 HTTPS</span>
<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> secure.example.com</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">return</span> <span class="token number">301</span> https://<span class="token variable">$host</span><span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">443</span> ssl</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> secure.example.com</span><span class="token punctuation">;</span>

    <span class="token comment"># 证书文件路径</span>
    <span class="token directive"><span class="token keyword">ssl_certificate</span> /etc/nginx/ssl/secure.example.com.pem</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">ssl_certificate_key</span> /etc/nginx/ssl/secure.example.com.key</span><span class="token punctuation">;</span>

    <span class="token comment"># SSL 优化配置</span>
    <span class="token directive"><span class="token keyword">ssl_protocols</span> TLSv1.2 TLSv1.3</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">ssl_ciphers</span> HIGH:!aNULL:!MD5</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">ssl_prefer_server_ciphers</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:8080</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-websocket-代理" tabindex="-1"><a class="header-anchor" href="#_5-websocket-代理" aria-hidden="true">#</a> 5. WebSocket 代理</h3><p>如果后端使用了 Socket.io 或原生 WebSocket，Nginx 需要特殊配置来支持协议升级。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> /socket.io/</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:3000</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_http_version</span> 1.1</span><span class="token punctuation">;</span>
    <span class="token comment"># 必须设置以下两个 Header，实现 HTTP 到 WebSocket 的协议升级</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span> Upgrade <span class="token variable">$http_upgrade</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span> Connection <span class="token string">&quot;upgrade&quot;</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="💡-二、-nginx-高频面试题" tabindex="-1"><a class="header-anchor" href="#💡-二、-nginx-高频面试题" aria-hidden="true">#</a> 💡 二、 Nginx 高频面试题</h2><h3 id="_1-正向代理和反向代理的区别是什么" tabindex="-1"><a class="header-anchor" href="#_1-正向代理和反向代理的区别是什么" aria-hidden="true">#</a> 1. 正向代理和反向代理的区别是什么？</h3><ul><li><strong>正向代理 (Forward Proxy)</strong>：代理的是<strong>客户端</strong>。客户端通过代理服务器去访问外网（例如 VPN、翻墙软件）。服务器不知道真实的客户端是谁。</li><li><strong>反向代理 (Reverse Proxy)</strong>：代理的是<strong>服务端</strong>。客户端直接访问代理服务器，代理服务器再把请求转发给内部的真实服务器。客户端不知道真实的服务器是哪台（Nginx 最常用的场景）。</li></ul><h3 id="_2-nginx-为什么性能这么高-nginx-的架构模型" tabindex="-1"><a class="header-anchor" href="#_2-nginx-为什么性能这么高-nginx-的架构模型" aria-hidden="true">#</a> 2. Nginx 为什么性能这么高？（Nginx 的架构模型）</h3><p>Nginx 采用了<strong>多进程 + 异步非阻塞 I/O (epoll)</strong> 模型：</p><ul><li><strong>Master-Worker 模型</strong>：一个 Master 进程负责管理配置和 Worker 进程，多个 Worker 进程负责处理实际的连接。</li><li><strong>事件驱动 (epoll)</strong>：一个 Worker 进程在一个线程中可以同时处理数以万计的并发连接，而不需要为每个连接创建新线程，极大地减少了内存占用和上下文切换的开销。</li></ul><h3 id="_3-nginx-的负载均衡策略有哪些" tabindex="-1"><a class="header-anchor" href="#_3-nginx-的负载均衡策略有哪些" aria-hidden="true">#</a> 3. Nginx 的负载均衡策略有哪些？</h3><p>Nginx 内置了多种负载均衡算法：</p><ol><li><strong>轮询 (Round Robin)</strong>：默认策略，按时间顺序逐一分配。</li><li><strong>权重 (Weight)</strong>：给不同服务器设置不同权重，性能好的机器分配更多请求。</li><li><strong>IP Hash (<code>ip_hash</code>)</strong>：根据客户端 IP 计算 Hash 值分配服务器，<strong>常用于解决 Session 保持问题</strong>。</li><li><strong>最少连接 (<code>least_conn</code>)</strong>：将请求分配给当前连接数最少的服务器。</li><li><strong>URL Hash (<code>hash $request_uri</code>)</strong>：根据请求的 URL 进行 Hash 分配，常用于后端是缓存服务器的场景。</li></ol><h3 id="_4-nginx-如何解决前端-vue-react-刷新后-404-的问题" tabindex="-1"><a class="header-anchor" href="#_4-nginx-如何解决前端-vue-react-刷新后-404-的问题" aria-hidden="true">#</a> 4. Nginx 如何解决前端 Vue/React 刷新后 404 的问题？</h3><p>单页应用 (SPA) 只有 <code>index.html</code> 一个真实文件，路由是前端通过 History API 模拟的。刷新时，Nginx 会去硬盘找对应的物理路径，找不到就会 404。 <strong>解决办法</strong>：在 <code>location /</code> 中使用 <code>try_files</code> 指令，将所有找不到的文件请求重定向到 <code>index.html</code>。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-nginx-中的-location-匹配优先级是怎样的" tabindex="-1"><a class="header-anchor" href="#_5-nginx-中的-location-匹配优先级是怎样的" aria-hidden="true">#</a> 5. Nginx 中的 <code>location</code> 匹配优先级是怎样的？</h3><p><code>location</code> 的匹配规则有严格的优先级顺序（从高到低）：</p><ol><li><code>=</code>：精确匹配（优先级最高）</li><li><code>^~</code>：普通字符串的前缀匹配（一旦匹配成功，不再进行正则匹配）</li><li><code>~</code> 和 <code>~*</code>：正则表达式匹配（<code>~</code> 区分大小写，<code>~*</code> 不区分大小写）</li><li><code>/</code>：普通前缀匹配（匹配所有请求，兜底）</li></ol><h3 id="_6-如何限制某个-ip-的访问频率-防刷-限流" tabindex="-1"><a class="header-anchor" href="#_6-如何限制某个-ip-的访问频率-防刷-限流" aria-hidden="true">#</a> 6. 如何限制某个 IP 的访问频率？（防刷/限流）</h3><p>使用 <code>limit_req_zone</code> 和 <code>limit_req</code> 指令可以实现基于漏桶算法的限流。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 在 http 块定义：限制每个 IP 每秒只能请求 10 次</span>
<span class="token directive"><span class="token keyword">limit_req_zone</span> <span class="token variable">$binary_remote_addr</span> zone=mylimit:10m rate=10r/s</span><span class="token punctuation">;</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">location</span> /login/</span> <span class="token punctuation">{</span>
        <span class="token comment"># 在 location 块应用：burst=20 表示允许突发 20 个请求，nodelay 表示不延迟处理</span>
        <span class="token directive"><span class="token keyword">limit_req</span> zone=mylimit burst=20 nodelay</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,38)])])}const o=s(t,[["render",c],["__file","Nginx.html.vue"]]);export{o as default};
