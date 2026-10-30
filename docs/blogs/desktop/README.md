# 桌面端开发

> 用 Web 技术栈构建跨平台桌面应用。两大主流方案：**Electron**（Chromium + Node.js，生态最成熟）与 **Tauri**（系统 WebView + Rust，体积与内存优势明显，2.0 起支持移动端）。

## 目录

1. [Electron：架构、进程模型与安全实践](./electron.md) —— 主/渲染/预加载进程、IPC、打包与自动更新
2. [Tauri 实战系列](./tauri.md) —— 从入门到托盘、快捷键、多窗口通信、插件开发（掘金系列）

## 怎么选

| 维度 | Electron | Tauri（2.x） |
|------|----------|--------------|
| 渲染引擎 | 自带 Chromium（行为最一致） | 系统 WebView（WKWebView / WebView2） |
| 后端语言 | Node.js（JS 生态无缝） | Rust（性能与安全，也可 sidecar 调其他语言） |
| 安装包体积 | 通常 80–150MB 起 | 通常 5–20MB |
| 运行时内存 | 较高（每个窗口一个渲染进程） | 较低 |
| 移动端 | 不支持 | 支持 iOS / Android |
| 生态与资料 | 最丰富（VS Code、Slack 等都在用） | 快速成长中，核心插件已齐 |
| 安全模型 | contextIsolation + preload 白名单 | 默认最小权限，capability/ACL 显式授权 |

经验法则：**团队是纯前端 / 需要最一致的多平台渲染 / 依赖庞大 npm 生态 → Electron；在意体积内存、愿意写一点 Rust、要出移动端 → Tauri**。两边共同的关键词都是「进程隔离 + 显式 IPC 白名单 + 最小权限」。
