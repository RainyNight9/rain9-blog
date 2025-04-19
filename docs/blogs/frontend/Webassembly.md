# Webassembly

## 概念

​WebAssembly（简称 WASM）是`一种新的二进制代码格式`，旨在为现代 Web 浏览器提供一种高效的方式来运行编译过的代码。WASM 是一种`与平台无关的虚拟机`，它能通过现代浏览器直接运行，从而提升 Web 应用程序的性能。WebAssembly 使得开发者能够`将低级语言（如 C/C++、Rust、Go）编译成 Web 可执行文件`，进而在浏览器中运行。这种方式大大`提高了 Web 应用的计算能力，尤其适用于复杂的计算、图形处理和多媒体编辑等场景`。​

## 官方介绍

​根据 WebAssembly 的官方网站，WebAssembly 是`一种高效、体积小且可在浏览器中运行的二进制格式`。它的目标是`为 Web 应用提供与原生应用相媲美的性能，同时保持 Web 的开放性和可移植性`。WebAssembly 运行在`沙箱环境中`，具有`内存安全性和模块化特性`，使其成为 Web 开发中强有力的补充。

## 使用场景​

**1.复杂计算：** WebAssembly 主要`解决 JavaScript 在计算密集型任务中的性能瓶颈`。通过将这些计算任务交给 WebAssembly 执行，可以大大提高处理效率。
  举个例子，某些科学计算、数据处理、机器学习任务等，可以通过 Rust 或 C++ 编写，然后编译成 WASM 进行浏览器端执行。

**​2.图形绘制：** 在图形渲染领域，WebAssembly 能够`加速基于 WebGL 或其他图形渲染库的任务`。
  例如，使用 Rust 编写高效的图形绘制库，如 skia，并将其编译为 WebAssembly，从而在浏览器中实现高性能的图形渲染。
  
**​3.音视频编辑：** WebAssembly 适用于`音视频编辑、处理和转换等高性能应用`。与 JavaScript 相比，WebAssembly 提供了更强的性能，能够实时处理音视频流，进行高质量的编辑和渲染。

**​4.高性能渲染库：** `使用 Rust 或类似语言编写的高性能渲染库`可以通过 WebAssembly 在浏览器中运行，提供比 JavaScript 更高效的渲染能力。
  例如，Rust 与 skia（一个高效的 2D 图形渲染库）结合，能够在浏览器中提供极快的渲染性能，适用于图形密集型应用如游戏或 UI 动画。

## 和 TypeScript 配合使用：基于 AssemblyScript 实现

​AssemblyScript 是一个将 TypeScript 编译为 WebAssembly 的工具，它能够让开发者在熟悉的 JavaScript/TypeScript 环境中，快速开发出高性能的 WebAssembly 模块。

​下面是一个最简单的示例，展示了如何使用 AssemblyScript 实现一个基本的 WebAssembly 模块：

​index.ts（WebAssembly 模块入口文件）

```ts
// The entry file of your WebAssembly module.
export function add(a: i32, b: i32): i32 {
  let res = 0;
  for (let i = 0; i < 100000000; i++) {
    res = 0;
    // do nothing
  }
  // 100000000 iterations of the loop will take about 1 second to run on a modern computer
  return a + b;
}
```

​​在这个示例中，add 函数计算两个整数的和，但在计算过程中加入了一个消耗时间的循环，以模拟复杂计算任务。通过这种方式，可以测试 WebAssembly 在高负载计算时的性能。

## 编译命令

```json
{
  "scripts": {
    "asbuild:debug": "asc assembly/index.ts --target debug",
    "asbuild:release": "asc assembly/index.ts --target release",
    "asbuild": "npm run asbuild:debug && npm run asbuild:release"
  }
}
```

以上命令通过 asc 编译器将 TypeScript 文件编译为 WebAssembly 模块，debug 版本用于开发调试，release 版本用于生产环境。

### ​实现的过程

​1.安装 AssemblyScript： 首先需要安装 AssemblyScript 开发工具链：

```bash
npm install --save-dev assemblyscript​
```

​2.编写 TypeScript 代码： 编写上述 index.ts 文件，定义需要通过 WebAssembly 执行的函数。

​3.编译成 WebAssembly： 使用 asc 编译命令将 TypeScript 文件编译成 WebAssembly 模块。

​4.在 Web 应用中使用： 将生成的 .wasm 文件导入到前端应用中，使用 JavaScript 调用 WebAssembly 模块中的函数。​

### 完整代码示例

```ts
async function instantiate(module, imports = {}) {
  const { exports } = await WebAssembly.instantiate(module, imports);
  const memory = exports.memory || imports.env.memory;
  // 适配导出的模块
  const adaptedExports = Object.setPrototypeOf({
    offset: {
      // assembly/draw/offset: usize
      valueOf() { return this.value; },
      get value() {
        return exports.offset.value >>> 0;
      }
    },
  }, exports);
  return adaptedExports;
}

export const {
  memory,
  add,
  offset,
  update,
  resize,
} = await (async url => instantiate(
  await (async () => {
    const isNodeOrBun = typeof process !== "undefined" && process.versions != null && (process.versions.node != null || process.versions.bun != null);
    if (isNodeOrBun) {
      // 在 Node.js 或 Bun 环境中读取 WASM 文件
      return globalThis.WebAssembly.compile(await (await import("node:fs/promises")).readFile(url));
    } else {
      // 在浏览器中通过 fetch 加载 WASM 文件
      return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url));
    }
  })(), {}
))(new URL("release.wasm", import.meta.url));
```

**代码说明**​

1.instantiate 函数：该函数负责加载和实例化 WebAssembly 模块。它还通过 Object.setPrototypeOf 将导出的模块调整为带有 offset 属性的对象，这样可以更方便地进行访问。

​2.判断 Node.js 或 Bun 环境：isNodeOrBun 判断当前环境是否为 Node.js 或 Bun。对于 Node.js 环境，使用 node:fs/promises 读取 WASM 文件，对于浏览器环境，使用 fetch API 加载 WASM 文件。

​3.WASM 模块加载：instantiate 函数会异步加载并实例化 WASM 模块，并返回一个适配后的模块对象。对于浏览器环境，compileStreaming 方法可以直接通过 fetch 加载和编译 WASM 文件；而在 Node.js 或 Bun 环境中，使用 readFile 方法来读取文件并进行编译。​

## 项目实践​

在我的项目中，我曾经使用 WebAssembly 来优化图像处理和音视频编辑功能。例如，在处理复杂的图像滤镜或进行高效的音视频数据转换时，WebAssembly 提供了明显优于 JavaScript 的性能，特别是在大量数据处理时。​在实际应用中，我们使用了 Rust 语言编写高效的图像处理库，并将其编译成 WebAssembly。这样，图像渲染和转换的速度得到了大幅提升，浏览器端的响应时间显著减少，从而提供了更加流畅的用户体验。​​

## 总体介绍

​WebAssembly（简称 WASM）是一种二进制格式的代码执行方式，它使得浏览器可以运行高效的低级语言（如 C/C++、Rust、Go 等）编译过来的代码。WebAssembly 的出现解决了传统 JavaScript 性能瓶颈的问题，特别适用于计算密集型任务、图形渲染、音视频处理等场景。它可以在现代浏览器中运行，具有跨平台、性能高、内存安全等优点。

​WebAssembly 的应用场景非常广泛，包括但不限于：

​- 高性能计算：适用于复杂的数学运算和数据处理。​
- 图形渲染：能够高效处理图形绘制任务。​
- 音视频处理：在浏览器中实现音视频的编辑、转码等任务。​
- 游戏开发：借助 WebAssembly 提供的高性能支持，可以在浏览器中运行复杂的游戏逻辑。

## 在三个场景下的应用

### ​​基于 AssemblyScript 的图形绘制

​AssemblyScript 是一种将 TypeScript 编译为 WebAssembly 的工具，它使得开发者能够使用熟悉的 JavaScript/TypeScript 语法编写 WebAssembly 模块。在图形绘制领域，AssemblyScript 可以用来编写高效的图像处理和渲染代码。

以下是一个简单的图形绘制示例：​​AssemblyScript 图形绘制代码示例

```ts
var width: i32 = 320;
var height: i32 = 200;
var offset: i32 = 0;

function set(x: i32, y: i32, v: i32): void {
  let vi = <i32>v;
  store<i32>(offset + ((width * y + x) << 2), ~vi << 24 | vi << 8);
}

/** 计算两个像素之间的距离 */
function distance(x1: i32, y1: i32, x2: f32, y2: f32): f32 {
  let dx = <f32>x1 - x2;
  let dy = <f32>y1 - y2;
  return Mathf.sqrt(dx * dx + dy * dy);
}

/** 每一帧的更新 */
export function update(tick: f32): void {
  let w = <f32>width;
  let h = <f32>height;
  let hw = w * 0.5,
      hh = h * 0.5;
  let cx1 = (Mathf.sin(tick * 2) + Mathf.sin(tick)) * hw * 0.3 + hw,
      cy1 = (Mathf.cos(tick)) * hh * 0.3 + hh,
      cx2 = (Mathf.sin(tick * 4) + Mathf.sin(tick + 1.2)) * hw * 0.3 + hw,
      cy2 = (Mathf.sin(tick * 3) + Mathf.cos(tick + 0.1)) * hh * 0.3 + hh;
  let res = <f32>48 / Mathf.max(w, h);
  let y = 0;
  do {
    let x = 0;
    do {
      set(x, y, Mathf.abs(
        Mathf.sin(distance(x, y, cx1, cy1) * res) +
        Mathf.sin(distance(x, y, cx2, cy2) * res)
      ) * 120);
    } while (++x != width)
  } while (++y != height)
}

/** 调整屏幕大小时重新计算内存 */
export function resize(w: i32, h: i32): void {
  width = w;
  height = h;
  let needed = <i32>((offset + (w * h * sizeof<i32>() + 0xffff)) & ~0xffff) >>> 16;
  let actual = memory.size();
  if (needed > actual) memory.grow(needed - actual);
}
```

HTML 和 JavaScript 代码（浏览器端）

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <canvas
      id="canvas"
      style="width: 100%; height: 100%; background: #aff"
    ></canvas>
    <script type="module">
      import * as exports from "./build/release.js";
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      const step = 0.012;
      // 放大计算以加速图像生成
      const upscaleFactor = 4;
      var width, height, image;
      // 处理屏幕大小变化
      function onresize() {
        width = (canvas.offsetWidth / upscaleFactor) | 0;
        height = (canvas.offsetHeight / upscaleFactor) | 0;
        canvas.width = width;
        canvas.height = height;
        image = context.createImageData(width, height);
        exports.resize(width, height);
      }
      onresize();
      new ResizeObserver(onresize).observe(canvas);
      // 更新图像
      var tick = 0.0;
      (function update() {
        requestAnimationFrame(update);
        exports.update((tick += step));
        new Uint32Array(image.data.buffer).set(
          new Uint32Array(
            exports.memory.buffer,
            exports.offset.value,
            width * height
          )
        );
        context.putImageData(image, 0, 0);
      })();
    </script>
  </body>
</html>
```

在该示例中，AssemblyScript 被用来进行图形渲染，每一帧图像通过 WebAssembly 更新并显示在 HTML5 的 `<canvas>` 元素上。

### ​​基于 FFmpeg WebAssembly 的视频转码应用

​FFmpeg 是一个强大的开源多媒体框架，可以用来处理视频、音频、字幕等数据。在 WebAssembly 环境下，FFmpeg 可以被编译为 WebAssembly 模块，从而在浏览器中进行视频处理。​​

简单的 FFmpeg 视频转码命令

```bash
./ffmpeg -i ffmpeg.mp4 -vf drawtext=fontfile=/usr/share/fonts/arial.ttf:text='简单的 FFmpeg 视频转码命令':x=100:y=100:fontsize=46:fontcolor=red output.mp4
```

WebAssembly 使用示例：React 中的 FFmpeg 转码应用

```tsx
import { useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

function App() {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(null);
  const videoRef = useRef(null);
  const messageRef = useRef(null);
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";

  const load = async () => {
    const ffmpeg = new FFmpeg();
    ffmpegRef.current = ffmpeg;
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });
    setLoaded(true);
  };

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile(
      "input.webm",
      await fetchFile("https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm")
    );
    await ffmpeg.writeFile(
      "arial.ttf",
      await fetchFile("https://raw.githubusercontent.com/ffmpegwasm/testdata/master/arial.ttf")
    );
    await ffmpeg.exec([
      "-i",
      "input.webm",
      "-vf",
      "drawtext=text='heyi@miaoma':fontfile=/arial.ttf:y=200:x=w-mod(max(t,0)*(w+tw)/20,(w+tw)):fontcolor=ffcc00:fontsize=40:shadowx=2:shadowy=2",
      "output.mp4",
    ]);
    const data = await ffmpeg.readFile("output.mp4");
    if (!videoRef.current) return;
    videoRef.current.src = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));
  };

  return loaded ? (
    <>
      <video ref={videoRef} controls></video>
      <br />
      <button onClick={transcode}>Transcode webm to mp4 with text</button>
      <p ref={messageRef}></p>
      <p>Open Developer Tools (Ctrl+Shift+I) to View Logs</p>
    </>
  ) : (
    <button onClick={load}>Load ffmpeg-core (~31 MB)</button>
  );
}

export default App;
```

在这个示例中，使用 FFmpeg WebAssembly 实现了一个简单的转码应用，将视频格式从 webm 转换为 mp4 并添加文本水印。​

### ​Rust + WebAssembly 通过 wasm-pack 构建示例

​Rust 提供了高性能的系统编程能力，并且可以通过 wasm-pack 工具将 Rust 代码编译成 WebAssembly 模块。使用 WebAssembly 可以让开发者利用 Rust 的优势，在浏览器端实现高效的功能。

​简要介绍 Rust 与 WebAssembly 的结合：

​- 使用 wasm-pack 工具将 Rust 编译成 WebAssembly 文件。
​- 将生成的 .wasm 文件加载到浏览器中并与 JavaScript 交互。​

构建步骤：

​1.安装 Rust 和 wasm-pack。
​2.使用 wasm-pack build 构建 Rust 项目并生成 WebAssembly 文件。​
3.在前端应用中使用 wasm-bindgen 将 Rust 模块暴露给 JavaScript。

## 架构设计

Rust + WebAssembly + React 架构，其中主要优势在于：​​

1. 性能优势：Rust 编译为 WASM 后，在复杂 3D/WebGL/大数据渲染场景比纯 JS 快 5-10 倍
​2. 内存安全：Rust 的所有权系统避免内存泄漏
​3. 跨平台：同一套代码可运行在 Web 和原生环境

### 从零开始完整流程

**环境安装 (MacOS)**

```bash
# 安装 Rust 工具链​
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh​

# 安装 wasm-pack​
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh​

# 安装 Node.js (推荐使用 nvm)​
brew install nvm​
nvm install 18
```

**创建 Rust WASM** 

项目​​也可以使用 wasm-pack 来进行初始化【推荐】，完整流程：

1. 使用 rustup 安装 rust。​
2. 安装 wasm-pack。
​3. 运行 wasm-pack new rust-renderer。
​4. CD rust-renderer
​5. 运行 wasm-pack build --target web。
​6. 此工具在 pkg 目录中生成文件
​7. 导入它：import init， { greet } from “./pkg/rust-renderer.js”，初始化它：await init（），然后使用它：greet（）

```bash
# 在项目目录中​
cd /Users/rust-renderer-demo

​cargo new --lib rust-renderer​
```

**配置 Cargo.toml**

```toml
[package]
name = "rust-renderer"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib", "rlib"]

[dependencies]
wasm-bindgen = "0.2"
web-sys = { version = "0.3", features = [
    "Document",
    "Element",
    "HtmlElement",
    "Window",
    "HtmlCanvasElement",
    "CanvasRenderingContext2d"
]}
```

**实现核心渲染逻辑**

```rs
use wasm_bindgen::prelude::*;
use web_sys::{CanvasRenderingContext2d, HtmlCanvasElement};

pub fn draw_mandelbrot(canvas_id: &str, width: u32, height: u32, max_iter: u32) {
    let document = web_sys::window().unwrap().document().unwrap();
    let canvas = document.get_element_by_id(canvas_id).unwrap();
    let canvas: HtmlCanvasElement = canvas.dyn_into().unwrap();
    
    canvas.set_width(width);
    canvas.set_height(height);
    
    let ctx = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<CanvasRenderingContext2d>()
        .unwrap();
    
    // 高性能分形渲染算法
    for x in 0..width {
        for y in 0..height {
            let mut zx = 0.0;
            let mut zy = 0.0;
            let cx = (x as f64 / width as f64) * 3.5 - 2.5;
            let cy = (y as f64 / height as f64) * 2.0 - 1.0;
            let mut i = 0;
            
            while zx * zx + zy * zy < 4.0 && i < max_iter {
                let tmp = zx * zx - zy * zy + cx;
                zy = 2.0 * zx * zy + cy;
                zx = tmp;
                i += 1;
            }

            let color = if i == max_iter {
                "#000"
            } else {
                &format!("#{:02x}{:02x}{:02x}", i*8%256, i*6%256, i*4%256)
            };

            ctx.set_fill_style(&JsValue::from_str(color));
            ctx.fill_rect(x as f64, y as f64, 1.0, 1.0);
        }
    }
}
```

**构建 WASM 包**

```bash
cd rust-renderer​

wasm-pack build --target web --release
```

**前端集成**

​在前端应用中集成以上 pack，只需要导入对应产物文件，调用方法即可

这个架构已在千万级数据可视化项目中验证，相比纯 JavaScript 实现，性能提升显著，特别是在复杂计算和渲染场景下。可以根据具体需求扩展 WebGL 支持或添加更多并行计算功能。

### 十亿行数据表渲染优化终极方案


