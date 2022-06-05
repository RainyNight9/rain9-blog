---
next:
  text: day2
  link: ./day2.html
---

# day1

## 1. vscode 插件

- [Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vimvscodevim.vim)

## 2. 模式

> 这里先写常用的两种模式，还存在一个 `--VISUAL--` 模式，后文将会介绍

- `--NORMAL--`: 移动模式 通过 `i（insert）` 或 `a（append）` 切换到 `--INSERT--` 模式，区别在于 `i` 是在当前光标前插入，`a` 是在光标后插入
- `--INSERT--`: 插入模式 通过 `esc`、`control + c`、`control + [` 切换到 `--NORMAL--` 模式

在插入结束后，应回到移动模式下

## 3. 移动

> 所有移动应在 `--NORMAL--` 模式下执行，且是英文输入法下

- `h`: 向左移动
- `j`: 向下移动
- `k`: 向上移动
- `l`: 向右移动

## 4. 在终端中使用 vim

若使用的是 unix 系统，直接安装 `vim` 即可。若你使用的是 `windows`，推荐你安装 `wsl`。

安装完成后，可以在 terminal 中输入 `vim` 即可。

退出使用 `esc + :wq/:q` 即可退出

- `wq`: write quit
- `q`: quit
- `q!`: quit without saving

## 5. 修改键盘布局

让 caps lock 修改为：

- 单独按时是 `esc`
- 组合按时时 `ctrl`
- 并将 `ctrl` 键改为 `caps lock`

- [`windows`](https://docs.microsoft.com/zh-cn/windows/powertoys/keyboard-manager)
- [`mac`](https://blog.csdn.net/xjc2998310890/article/details/116356978)

## 6. 反复练习

```js
const aaaaaaaaaaaaa = 1111111111111
const bbbbbbbbbbbbb = 22222222222222
```
