# Linux 常用命令速查手册

这是一份专为开发者整理的 Linux 常用命令清单，涵盖了文件操作、系统监控、网络管理以及前端开发中常用的命令。

## 1. 📂 文件与目录操作

| 命令 | 说明 | 常用示例 |
| :--- | :--- | :--- |
| **`ls`** | 列出目录内容 | `ls -la` (显示所有文件及详细信息) |
| **`cd`** | 切换目录 | `cd ~` (回主目录), `cd ..` (上一级) |
| **`pwd`** | 显示当前路径 | `pwd` |
| **`mkdir`** | 创建目录 | `mkdir -p a/b/c` (递归创建目录) |
| **`rm`** | 删除 | `rm -rf node_modules` (强制递归删除) |
| **`cp`** | 复制 | `cp -r src dest` (递归复制目录) |
| **`mv`** | 移动或重命名 | `mv old.txt new.txt` |

## 2. 📝 文件内容查看与编辑

*   **`cat`**: 查看整个文件内容
    ```bash
    cat package.json
    ```
*   **`less`**: 分页查看（适合大文件，按 `q` 退出）
    ```bash
    less large-log-file.log
    ```
*   **`head` / `tail`**: 查看开头或结尾
    ```bash
    head -n 10 file.txt  # 前10行
    tail -f access.log   # 实时跟踪日志更新 (非常常用)
    ```
*   **`vim` / `nano`**: 命令行编辑器
    ```bash
    vim nginx.conf
    ```

## 3. 🔐 权限管理

*   **`chmod`**: 修改权限
    ```bash
    chmod +x script.sh  # 添加执行权限
    chmod 777 dist/     # 赋予所有权限
    ```
*   **`chown`**: 修改所有者
    ```bash
    chown user:group file.txt
    ```

## 4. 📊 系统管理与监控

| 命令 | 说明 | 常用示例 |
| :--- | :--- | :--- |
| **`top`** | 实时进程监控 | `top` (按 `q` 退出) |
| **`htop`** | 增强版进程监控 | `htop` (界面更友好，需安装) |
| **`ps`** | 查看进程快照 | `ps aux | grep node` (查找 node 进程) |
| **`kill`** | 终止进程 | `kill -9 <PID>` (强制杀死进程) |
| **`df`** | 磁盘空间 | `df -h` (以易读格式显示) |
| **`free`** | 内存使用 | `free -h` |

## 5. 🌐 网络操作

*   **`ping`**: 测试连通性
    ```bash
    ping google.com
    ```
*   **`curl`**: 发送 HTTP 请求
    ```bash
    curl -I https://example.com          # 只看响应头
    curl -o file.zip https://example.com/file.zip # 下载文件
    ```
*   **`netstat`**: 查看端口占用
    ```bash
    netstat -tuln | grep 8080
    ```
*   **`ssh`**: 远程登录
    ```bash
    ssh user@192.168.1.1
    ```

## 6. 🔍 日志与查找

*   **`grep`**: 强大的文本搜索
    ```bash
    grep "Error" app.log              # 查找包含 Error 的行
    grep -r "TODO" ./src              # 递归查找目录下包含 TODO 的文件
    ps aux | grep nginx               # 查找 nginx 进程
    ```
*   **`find`**: 查找文件
    ```bash
    find . -name "*.json"             # 查找当前目录下所有 json 文件
    ```

## 7. 📦 包管理

### Debian/Ubuntu (apt)
```bash
sudo apt update        # 更新源
sudo apt install nginx # 安装
sudo apt remove nginx  # 卸载
```

### CentOS/RHEL (yum)
```bash
sudo yum update
sudo yum install nginx
```

## 8. 💻 前端开发常用

### Node.js 进程管理
*   **端口占用处理**
    ```bash
    lsof -i :3000           # 查看 3000 端口占用
    kill $(lsof -t -i :3000) # 一键杀掉占用 3000 端口的进程
    ```

*   **PM2 (进程守护)**
    ```bash
    pm2 start app.js --name "my-api"
    pm2 list               # 查看列表
    pm2 logs               # 查看日志
    pm2 restart all        # 重启所有
    ```

## 9. ⏱️ 自动化与调度

*   **`crontab`**: 定时任务
    ```bash
    crontab -e      # 编辑任务
    crontab -l      # 查看任务
    # 格式: * * * * * command (分 时 日 月 周)
    ```

## 10. 🌲 Git 版本控制

```bash
git status              # 查看状态
git log --oneline       # 简洁查看提交历史
git reset --hard HEAD^  # 回退到上一个版本
git checkout -b dev     # 创建并切换分支
git pull origin main    # 拉取最新代码
```
