# node

## 介绍

语言可以分为两类：`编译型`和`解释型`。

| 类型 | 代表 | 特点 |
| ----- | ---- | ---- |
| 编译型 |C、C++、Go、Java、C# |`执行前`：需要将源代码转换为机器语言（二进制代码），并生成可执行文件。`运行时`：计算机无需对源代码进行翻译，而是直接执行可执行文件。|
| 解释型 | Python、PHP、JavaScript | `执行前`：不需要编译，直接执行源代码。`运行时`：解释器将源代码转换为机器语言并执行。|

其中 JavaScript 就是一门解释型语言，因此在运行时需要一个解释器。

在浏览器中，通常使用浏览器自带的解释器来执行 JavaScript 代码，而在服务端中，由于缺少浏览器的支持，所以需要一个特定的运行时环境来承载 JavaScript 代码的执行，这个时候就该 Node.js 登场了。

### node 是什么

>Node.js® 是一个开源、跨平台的 JavaScript 运行时环境。

Node.js 最初是由 Ryan Dahl 基于 `Chrome V8` 引擎开发的一个的 `JavaScript 运行时环境`，在 2009 年被首次发布。

V8 则是谷歌的开源高性能 `JavaScript 和 WebAssembly 引擎`，使用 C++ 编写。

### node 优势

- 高性能：基于事件驱动的非阻塞 I/O 模型，单线程也能够处理大量并发请求；
- 跨平台：可以运行在不同操作系统上；
- 社区完备：Node.js有一个庞大的社区，有丰富的文档和开源项目沉淀；
- 易上手：学习门槛低，环境配置简单，开发&部署迅速。

### 应用场景

- 服务端开发：Express、Koa、Midway、Egg；
- 桌面应用：Electron、NW.js、线上应用 VS Code、飞书、新版 QQ；
- 移动应用：React Native、Weex；
- Web 开发：Vue、React、Svelte 等前端框架
- 构建工具：webpack、Vite、Rollup；
- CLI 工具：前端开发者常用的各种项目脚手架和工具，如：nodemon、whistle、http-server；

### 在线环境

| 平台 | Node版本 | 访问速度 | IDE环境 | 支持分享 |
| --- | -------- | ------- | ------- | ------ |
|[码上掘金](https://code.juejin.cn/)|16|⭐️⭐️⭐️|❌|✅|
|[RunKit](https://runkit.com/home)|多版本(14/16/18 etc.)|⭐️⭐️⭐️|❌|✅|
|[Repl.it](https://replit.com/languages/nodejs)|12|⭐️⭐️|✅|✅|
|[CodeSandBox](https://codesandbox.io/)|16|⭐️|✅|✅|
|[StackBlitz](https://stackblitz.com/)|16|⭐️⭐️|✅|✅|

### Node.js 的版本管理工具

- [nvm](https://github.com/nvm-sh/nvm#intro)：基于 Shell 脚本实现，老牌的 Node.js 包管理工具；
- [fnm](https://github.com/Schniz/fnm)：快速简便的 Node.js 版本管理器，使用 Rust 编写；
- [volta](https://github.com/volta-cli/volta)：快速无缝地安装和运行任何 JS 工具！Volta 是在 Rust 中构建的，并作为一个快速的静态二进制运行。

***推荐 volta***

一键安装脚本。

```shell
curl https://get.volta.sh | bash
```

① 安装目标版本

```shell
volta install node@18.16.0
```

② 查看已安装版本

```shell
volta list node
```

③ 切换版本

```shell
volta install node@[version]
```

## 相关 npm

>NPM (Node.js Package Manager) 是 Node.js 的包管理工具，它可以方便地安装、更新、卸载和管理开发中需要用到的各种包和模块。

### npm 镜像源配置

我个人推荐 [nrm](https://github.com/Pana/nrm)

```shell
npm install -g nrm
```

```shell
$ nrm ls

* npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
```

```shell
$ nrm use cnpm  //switch registry to cnpm

    Registry has been set to: http://r.cnpmjs.org/
```

## 相关 npx

>npx 是随 Node.js 安装附带的另一个指令，可以更方便的调用 Node.js 生态中的包 (通常是一些 Node CLI 工具)，

使用 npx，可以在不全局安装一个命令行工具的情况下直接运行它，同时也不会污染全局环境。

比如 nodemon 这个 CLI 工具，可以在开发时替代 node 指令执行 js 文件，文件修改后自动重新执行。

```sh
# 直接通过npx 调用执行
npx nodemon test.js

# 等价于
# ① 全局安装CLI工具
npm i -g nodemon
# ② 调用执行
nodemon test.js
```

## 模块系统

>模块系统是指代码组织结构的一种模式，通过模块化的方式将代码分为独立的模块，以提高代码`复用性和可维护性`。模块系统使得大型应用程序可以被分解成小的、独立的部分，每个部分解决一个特定的问题这样做既有助于协同开发大型应用，也能够使得交付的应用程序体积更加小巧。

`CommonJS、AMD、CMD、UMD、ESM` 等模块化标准。

### CommonJS

>CommonJS 是一种 JavaScript 环境中模块化编程的规范。它定义了一套模块化导入和导出的语法和机制，旨在解决 JavaScript 在模块化方面的缺陷。

CJS 模块使用 `require 和 module.exports` 实现导入和导出。

在 Node.js 中，`module.exports 和 exports` 都可用于导出 Node.js 模块中的代码的对象。

通常情况下，我们只会使用 `module.exports 或 exports` 其中的一个导出模块代码，它们之间有一些微妙的区别。

`exports` 实际上是 `module.exports` 的一个引用，当我们使用 `exports` 导出模块代码时，实际上是在向 `module.exports` 添加属性，如下所示：

```js
// 导出一个名为 "hello" 的函数到 "exports" 对象中
// 函数中会将 "Hello World!" 的信息输出到控制台中
exports.hello = function() {
  console.log("Hello World!");
};
```

这等价于：

```js
// 导出一个名为 "hello" 的函数到 "exports" 对象中
// 函数中会将 "Hello World!" 的信息输出到控制台中
module.exports.hello = function() {
  console.log("Hello World!");
};
```

但是，如果我们对 exports 进行重新赋值，就会打破这个关系，如下所示：

```js
// 定义一个名为 "exports" 的函数 
// 函数中将 "Hello World!" 的信息输出到控制台中 
exports = function() { 
  console.log("Hello World!"); 
};
```

这时 exports 就不再指向 module.exports，而是指向了一个新的对象，原来的 module.exports 对象将会被忽略，因此该模块将不会导出任何内容。

因此，建议在写 Node.js 模块时，只使用 `module.exports` 导出模块代码，而不要使用 `exports`。如果你需要向外部导出多个函数或对象，可以将它们作为 `module.exports` 的属性导出。

### ES Modules

是在 ECMAScript 6 (ES2015/ES6) 中引入的一项重要特性，旨在取代 CommonJS 和 AMD 规范，成为 JavaScript 模块化的主要标准。

ESM 模块的导入使用 `import` 关键字，导出使用 `export` 关键字。

默认情况下 Node.js 会将 `.js` 后缀文件识别为 `CJS 模块`。

要让 Node.js 正确识别，主要有两种方式：

- 使用 `.mjs` 作为文件后缀名 (例如 hello.mjs)；
- package.json 中 `type` 字段设置为 `module`。

ES Modules 中的导入导出有多种用法，主要介绍了以下 4 种使用场景：

- 默认导入导出 (`export default，import xx from 'module'`)；
- 具名导入导出 (`export xx，import { xx } from 'module'`)；
- 导入导出所有 (`export *，import * as xx from 'module'`)；
- 重新导出 (`export { xx } from 'module'，export * from 'module'`)。

将 ESM 模块转换为 CJS 模块的工具，`tsup 和 ncc`。

### CJS 和 ESM 区别

#### 模块加载时机

- CJS 支持动态加载模块 (require 语句可以出现在任意位置)；
- ESM 会在所有模块都加载完毕后才执行代码 (通常会将 import 导入语句放在模块的顶部)；
  - ESM 是静态解析的，它会在编译时首先解析模块中的导入语句，虽然通常会将导入语句放在模块的顶部，但并不是要求所有的 import 语句必须在文件顶部，只要在使用导入的内容之前进行导入即可。

因此 ESM 可以在代码执行前进行静态分析和优化，从而提高性能 (比如自动移除无用的死代码)。

而 CJS 需要等到代码运行时才能确定依赖关系和加载模块。

#### 导出内容的区别

在 ESM 中，当我们导入一个变量时，实际上是导入了该变量的引用。这意味着，如果导出的变量在导入模块中发生了改变，导入的变量也会随之改变。

而在 CommonJS 中，导入的是导出模块的值的拷贝，而不是引用。这意味着，即使导出模块中的值发生了改变，导入模块中导入的变量不会受到影响。

简而言之，`ESM 导入的是值的引用，而 CJS 导入的是值的拷贝。`

#### 文件命名

通常情况下模块一般都以 `.js` 结尾，通过 `package.json` 中 `"type":"module"` 区分模块类型，

实际上还可以通过文件命名来区分 `.cjs` 表明是 `CJS` 规范的模块，`.mjs` 表明是 `ESM` 规范的模块。

## 常用的内置模块

### global 全局对象

JavaScript 中存在一个特殊的全局对象，可以在任意位置被访问，通常用 `globalThis` 指代。

在浏览器中，指向 `window` 这个全局对象，而 Node.js 中指向 `global`。

特殊的全局变量：

- `__filename` 表示当前正在执行的脚本文件的绝对路径。
- `__dirname` 表示当前执行脚本所在目录的绝对路径。

这 2 个变量，只在 `CJS` 模块下存在，如果是 `ESM` 将会出现以下的报错信息。

```js
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
```

#### process

`process.argv` 返回一个数组，包含启动 Node.js 进程时传递的命令行参数。

`process.cwd()` 获取当前工作目录的绝对路径。

`process.env` 获取当前执行环境的环境变量 (对象形式)。

`process.version` 获取当前 Node 版本。

`process.exit([code])`：终止 Node.js 进程，如果指定了 code 参数，则使用该参数作为退出状态码。

`process.pid`：返回进程的 PID (进程 ID)；

`process.platform`：返回运行 Node.js 的操作系统平台；

`process.arch`：获取 CPU 架构信息。

`process.stdout`：标准输出流，常用 `process.stdout.write` 进行数据写入。

`process.stdin`：用于从标准输入流 (stdin) 读取数据。

#### Buffer

Buffer 用于处理二进制数据。类似于数组，并提供了一些方便的方法来操作二进制数据。

① 创建 Buffer 对象

```js
const buf = Buffer.alloc(10); // 创建一个大小为 10 的 Buffer 对象，默认会用 0 填充
const buf2 = Buffer.from('Hello, world!'); // 创建一个包含字符串 'Hello, world!' 的 Buffer 对象
const buf3 = Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]); // 内容为hello构成的16进制数组 Buffer 对象 
```

② 转换内容格式

```js
const buf = Buffer.from('Hello, world!');
// 转为字符串输出
console.log(buf.toString()); // 输出 'Hello, world!'

// 转为16进制字符串输出
console.log(buf.toString('hex')); // 输出 '48656c6c6f2c20776f726c6421'（对应的是 'Hello, world!' 的 ASCII 码）

// 转为数组输出
console.log(Array.from(buf)); // 输出 [
//    72, 101, 108, 108, 111,
//    44,  32, 119, 111, 114,
//   108, 100,  33
// ]

// 转为base64格式输出
console.log(buf.toString('base64')); // 输出 'SGVsbG8sIHdvcmxkIQ=='
```

③ 写入内容

```js
// 创建一个长度为 10 的 Buffer 实例并将它填充为 0
const buf = Buffer.alloc(10);

// 将字符串 'Hello' 写入 Buffer 实例的前 5 个字节
buf.write('Hello');

// 将字符串 'world' 写入 Buffer 实例的第 6 个字节开始的位置，由于 'world' 的长度为 5，所以不会覆盖掉之前写入的 'Hello'
buf.write('world', 5); 

// 将 Buffer 实例转换为字符串并输出 'Hello world'
console.log(buf.toString()); 
```

④ 合并多个 Buffer 对象

```js
const buf1 = Buffer.from('Hello');
const buf2 = Buffer.from('World');
const buf3 = Buffer.concat([buf1, buf2]);
console.log(buf3.toString()); // 输出 'HelloWorld'
```

⑤ 截取 Buffer 对象

```js
const buf = Buffer.from('Hello, world!');
const buf2 = buf.slice(0, 5);
console.log(buf2.toString()); // 输出 'Hello'
```

### path 路径处理

`path.join` 将多个路径拼接成一个相对路径 (或绝对路径，取决于第一个路径是否为根路径)。

`path.resolve` 将多个路径拼接成一个绝对路径，返回一个解析后的绝对路径。即如果传入相对路径，会以当前工作目录为基准，计算出绝对路径，如果传入了绝对路径，则以传入的绝对路径为基准。

`path.dirname` 返回路径中的目录名。

`path.basename` 返回路径中的文件名，并可选地去除给定的文件扩展名。

`path.extname` 获取路径中的文件扩展名。

`path.normalize` 主要用于规范化路径，将路径中的不规范部分调整为标准格式，可以用于处理以下问题：

- 路径中的斜杠数量过多的情况。
- 路径中存在的 ./ 或 ../，即相对路径的情况。

`path.parse` 用于解析文件路径，将其拆分为一个对象。

`path.sep` 返回当前系统文件路径使用的分隔符。

- 例如在 Windows 操作系统上，path.sep 的值为反斜杠 \，而在 Unix 操作系统上则为正斜杠 /。

### fs 文件系统

fs (File system) 是文件系统模块，用于操作文件和目录。

支持同步 (sync) 或者异步 (async/callback) 调用，其中同步调用会阻塞主线程，异步调用不会阻塞。

`fs.readFileSync` 读取文件。基础用法如下：

- 参数 1：设置要读取的文件路径 (相对或者绝对)；
- 参数 2：设置读取的编码格式。

`fs.writeFileSync`：写入文件

- 参数 1：输出文件路径；
- 参数 2：输出内容；
- 参数 3 (可选)：编码格式。

`fs.statSync` 获取文件或者目录的基本信息。

`fs.appendFileSync` 向文件末尾追加写入内容。

`fs.renameSync` 方法用于文件移动，当然也可以是重命名文件。

`fs.unlinkSync 和 fs.rmSync` 都可用于单文件删除。

`fs.readdirSync` 获取目录下的文件信息。可通过指定第二个参数 `withFileTypes:true` 使返回结果包含类型。

`fs.mkdirSync` 创建目录，可通过设置 `recursive:true` 来递归创建多级目录。

`fs.rmdirSync` 删除目标目录，`recursive: true` 表明删除包含其子目录。

`fs.watch` 监听目录变更。

`fs.readdirSync 和 path.resolve` 获取指定目录下所有文件的绝对路径。

### util 工具

util 模块是一个工具模块，提供了一些常用的辅助函数。

`util.inspect(object, [options])`，常与 console.log 搭配使用，可以友好的将对象转为字符串，打印更加友好。

`util.inspect`，可以看到深层的数组和对象被展开了。其中 `depth` 用于控制展开的层级。

`util.format(format[, ...args])` 类似于 C 语言中的使用 printf 方法的传参，

- 该方法支持占位符 (%s、%d、%j 等) 来表示不同类型的变量，支持传入多个参数。

```js
import util from 'util'

console.log(util.format('%s:%s', 'foo', 'bar')) // 'foo:bar'
console.log(util.format('%d + %d = %d', 1, 2, 3)) // '1 + 2 = 3'
```

`util.callbackify` 可以将一个返回 promise 的函数转为回调形式的函数。

`util.promisify(original)` 用于将常规带有回调函数的方法转为返回 Promise 对象的方法。

### http / https

http / https 模块可用于创建 HTTP 服务器，也可用于向已有服务发起请求并获取响应。

`http.get` 用于快速发起 GET 请求

`https.request` 用于 get、post、put、delete 等请求

`http.createServer` 即可创建一个简单的 Web 服务。

`http.request 和 http.response` 对象上常用的方法和属性的获取方式：

- request：`url` (请求路径)、`method` (请求方法)、`headers` (请求头部)、`body` (请求体)、`query` (url 携带查询参数)；
- response：`statusCode` (响应状态码)、`setHeader` (设置响应头)、`write/end` (设置响应内容)。

### child_process

child_process 是 Node.js 的一个核心模块，可以用于创建子进程，

因此虽然 js 是单线程的，但通过创建子进程也能实现多任务并行处理，也可通过其调用系统的功能指令完成复杂的任务。

主要提供了 4 个方法：`spawn、exec、execFile 和 fork`。

- `spawn` 启动一个子进程来执行指定的命令，并且可以通过流式数据通信与子进程进行交互；
- `exec` 启动一个 shell，并在 shell 中执行指定命令，执行完毕后插入 stdout/stderr 中，适用于一些命令行工具；
- `execFile` 与 exec 类似，但是可以直接执行某个文件，而无需通过 shell 执行；
- `fork` 专门用于在 Node.js 中衍生新的进程来执行 JavaScript 文件，并且建立一个与子进程的 IPC 通信管道。

### url

`url.parse` 解析 URL 字符串，返回一个解析后的对象。

`url.URL` 和全局的 URL 一样，创建一个 URL 实例，提供许多开箱即用的操作。

### Timers

`setTimeout(callback, delay[, ...args])` 在 delay 毫秒之后执行一次 callback

`setInterval(callback, delay[, ...args])` 每隔 delay 毫秒执行一次 callback

`setImmediate(callback[, ...args])` 在当前事件循环的下一个阶段执行 callback

`process.nextTick(callback[, ...args])` 在当前事件循环结束后立即执行 callback

### Readline

在 Node.js 中，readline 模块提供了一个接口，用于从可读流 (例如 process.stdin) 读取数据，并支持逐行读取数据。

① 使用 question() 方法向用户询问姓名并显示。

```js
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('What is your name? ', (name) => {
  console.log(`Hello, ${name}!`)
  rl.close()
})
```

② 使用 write() 方法向标准输出发送数据。

```js
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.write('Hello, World!\n')
rl.close()
```

③ 实现一个可多轮对话的命令行

```js
const rl = readline.createInterface({
  input: process.stdin, // 从标准输入流中读取数据
  output: process.stdout // 输出数据到标准输出流中
})

rl.setPrompt('node> ') // 设置提示符
rl.prompt() // 显示提示符

rl.on('line', (line) => {
  // 监听行事件
  switch (
    line.trim() // 去除收尾空白字符，进行简单的命令选择判断
  ) {
    case 'hello':
      console.log('world') // 输出 'world'
      break
    case 'exit':
      rl.close() // 关闭 readline 接口
      break
    default:
      console.log(`Say what? I might have heard '${line.trim()}'`) // 输出收到的指令
      break
  }
  rl.prompt() // 显示提示符
})

rl.on('close', () => {
  // 监听关闭事件
  console.log('Goodbye!') // 输出 'Goodbye!'
  process.exit(0) // 退出 Node.js 进程
})
```

### crypto

crypto 模块主要用于加密和解密数据，内置了一些常用的算法。

`crypto.createHash(algorithm)`：创建一个新的`哈希算法`实例，其中 algorithm 是一个支持的哈希算法名称，例如 sha256 和 md5 等

- `hash.update(data[, inputEncoding])`：更新哈希运算所使用的数据
- `hash.digest([encoding])`：计算并返回哈希值。如果提供了 encoding 参数，则返回字符串形式的哈希值；否则返回一个 Buffer 对象

`crypto.createCipheriv` 方法用于创建一个使用指定算法和密钥进行加密的 Cipher 对象，并指定初始化向量 iv。

`crypto.randomBytes(size[, callback])`：生成具有给定大小的随机数据 (Buffer 类型)。

## node 中的 Event Loop

### 6 个阶段

![nodeeventloop](/images/backend/nodeeventloop.png)

- `timers (定时器)`：执行 `setTimeout` 和 `setInterval` 回调；
- `pending callbacks (挂起的回调)`：执行推迟到下一个循环迭代的 I/O 回调，比如 fs/http 模块执行的回调；
- `idle，prepare (空闲/准备)`：内部使用；
- `poll`：检索新的 I/O 事件；执行 I/O 相关的回调 (几乎是除关闭回调、定时器回调和 setImmediate 以外的回调)；在适当的时候节点将阻塞在这里；
- `check`：执行 setImmediate 回调 (Node.js 专有方法)；
- `close callbacks`：一些事件的关闭回调，例如 socket.on('close', ...)。

### 2 个微任务队列

`nextTick 队列`：存储与 process.nextTick 函数相关的回调函数；

`Promise 队列`：存储与 JavaScript 中的原生 Promise 相关的回调函数。

## ts 支持

TypeScript 是当下最流行的变成语言之一，本节内容分类介绍了多种通过 Node.js 运行 TS 的方法：

- 编译 TS 为 JS：tsc，ncc，tsup，bun；
- Node.js 加载自定义文件支持：自定义 module.Module._extensions 支持；
- 支持运行 TS 的 Node CLI 工具：ts-node，tsx，swno；
- 其它的 TS 运行时：Deno，Bun。
