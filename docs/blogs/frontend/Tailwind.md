---
theme: channing-cyan
---
# Tailwind

官方地址：https://tailwindui.com/

## 宽高

### 预定义数值类（`w-数值、h-数值`）

```html
<div class="w-20 h-20 bg-blue-500">width and height</div>
```

- `w-1` 的 1 表示 0.25 rem，即 4 px，
- `w-20` 表示 5 rem，即 width: 80px;。
- `h-20` 表示 height: 80px; 。
- `bg-blue-500` background-color 为蓝色，其中 500 表示某种饱和度的蓝色：数值越大颜色越深。

### 手动书写任意值（`w-[]、h-[]`）

```html
<div class="w-[80px] h-20 bg-blue-500">width and height</div>
<div class="w-[5rem] h-20 bg-blue-500">width and height</div>
<div class="w-[5em] h-20 bg-blue-500">width and height</div>
```

以 width 为例，w-20 实际上等价于：w-[80px] 、w-[5rem]、w-[5em]。

### 百分比（`w-分子/分母、h-分子/分母`）

```html
<div class="w-1/2 h-20 bg-blue-300">w-1/2</div>
<div class="w-1/3 h-20 bg-blue-300">w-1/3</div>
<div class="w-1/4 h-20 bg-blue-300">w-1/4</div>
```

百分比的有效范围为：`1/2, 1/3, 2/3, 1/4, 2/4, …, 11/12`，整数不在此范围，例如 2/2, 3/3 等。

- `w-1/2` 👉 width: 50%;
- `w-1/3` 👉 width: 33.333333%;
- `w-1/4` 👉 width: 25%;

### w-full、w-screen

- `w-full` 👉 width: 100%;
- `w-screen` 👉 width: 100vw;
- `w-svw`、
- `w-lvw`、
- `w-dvw`

### h-svh、h-lvh、h-dvh

- `h-svh` 👉 height: 100svh;
- `h-lvh` 👉 height: 100lvh;
- `h-dvh` 👉 height: 100dvh;

### min-w-[]、max-w-[]

### min-h-[]、max-h-[]

### size

```html
<div class="size-20 bg-blue-500">width and height</div>
<!-- 等价于： -->
<div class="w-20 h-20 bg-blue-500">width and height</div>
```

## 边距

### margin

- `mt-*` 👉 margin-top: _;
- `mb-*` 👉 margin-bottom: _;
- `ml-*` 👉 margin-left: _;
- `mx-*` 👉  margin-left: _; margin-right: _;
- `my-*` 👉  margin-top: _; margin-bottom: _;

### padding

padding 部分和 margin 类似。

### space

在容器上，用来控制子元素之间的间距

- `space-x-*` 水平方向排列
- `space-y-*` 垂直方向排列

## 边框

### 线宽 + 颜色

通过 `border-*` 设定线宽，颜色的设置也很简单：`border-颜色-数值`。

如果想要设定某一方向的边框：`border-*-数值`

- `border-t-数值` 👉 border-top-width: _;
- `border-r-数值` 👉 border-right-width: _;
- `border-b-数值` 👉 border-bottom-width: _;
- `border-l-数值` 👉 border-left-width: _;
- `border-x-数值` 👉 border-left-width: _; border-right-width: _;
- `border-y-数值` 👉 border-top-width: _; border-right-width: _;

>注意 ⚠️：如果不加数值（例如：`border-t`），表示特定方向上的线宽为 `1px`。`border-0` 就是 `border-width: 0px`;。

### 线类型

- `border-solid` 👉 border-style: solid;
- `border-dashed` 👉 border-style: dashed;
- `border-dotted` 👉 border-style: dotted;
- `border-double` 👉 border-style: double;

### 弧度

- `rounded` 👉 border-radius: 0.25rem; /* 4px */
- `rounded-md` 👉 border-radius: 0.375rem; /* 6px */
- `rounded-lg` 👉 border-radius: 0.5rem; /* 8px */
- `rounded-full` 👉 border-start-start-radius: 9999px; border-end-start-radius: 9999px;

## 文本

### 字体大小

通过 `text-数值、text-[]` 的方式进行：

`text-base、text-md、text-[16px]` 都是一样的，取浏览器的字体默认值 16px。

### 文本对齐方式

- `text-left`
- `text-center`
- `text-right`
- `text-justify`

### 字体斜体与加粗

```html
<p class="italic">Lorem ipsum! -- italic</p>
<p class="font-thin">Lorem ipsum! -- font-weight: 100;</p>
<p class="font-light">Lorem ipsum! -- font-weight: 300;</p>
<p class="font-normal">Lorem ipsum! -- font-weight: 400;</p>
<p class="font-bold">Lorem ipsum! -- font-weight: 700;</p>
<p class="font-black">Lorem ipsum! -- font-weight: 900;</p>
```

## 颜色

```html
<p class="text-red-500">Lorem ipsum! -- 文本颜色</p>
<p class="border-2 border-sky-500">Lorem ipsum! -- 边框颜色</p>
<p class="bg-orange-500">Lorem ipsum! -- 背景颜色</p>
<p class="bg-orange-500/75">Lorem ipsum! -- 背景颜色（75% 透明度）</p>
<p class="bg-orange-500/50">Lorem ipsum! -- 背景颜色（50% 透明度）</p>
<div class="bg-gradient-to-r from-purple-500 to-pink-500">
  向右渐变（purple-500 👉 pink-500）
</div>
<div class="bg-gradient-to-l from-transparent to-sky-500">
  向左渐变（sky-500 👈 transparent）
</div>
<div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
  向右渐变（indigo-500 👉 purple-500 👉 pink-500）
</div>
```

>渐变色，这里需要用 `from-颜色A`、`via-颜色B`、`to-颜色C` 来表示从颜色 A 经过 B，最后过渡到 C 的颜色变化。

## 伪类

### :hover

```html
<button className="border-2 bg-black text-white hover:bg-white hover:text-black">
  button
</button>
```

### :focus

```html
<input
  type="text"
  className="px-2 outline focus:outline-2 focus:outline-sky-500"
  placeholder="请聚焦这里..."
/>
```

### :active

```html
<button className="bg-sky-500 active:bg-pink-500">button</button>
```

## 伪元素

### ::before, ::after

```html
<label className="block">
  <span className="before:content-['⭐️'] before:mr-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
    Email
  </span>
  <input
    type="email"
    name="email"
    className="mt-1 px-3 py-2 bg-white border placeholder-slate-400 rounded-md"
    placeholder="请输入你的邮箱..."
  />
</label>
```

### placeholder

```html
<input
  className="placeholder:italic placeholder:text-yellow-200 text-white bg-neutral-700 border rounded-md py-2 px-3"
  placeholder="请输入搜索内容..."
  type="text"
  name="search"
/>
```

### file input

```html
<input
  type="file"
  className="block w-full text-sm text-neutral-700
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-cyan-50 file:text-cyan-700
              hover:file:bg-cyan-100
            "
/>
```

- `file:mr-4 file:py-2 file:px-4` 👉 设置边距
- `file:rounded-full file:border-0` 👉 设置边框
- `file:text-sm file:font-semibold` 👉 设置字体
- `file:bg-cyan-50 file:text-cyan-700` 👉 设置颜色
- `hover:file:bg-cyan-100` 👉 设置悬浮效果

### selection

```html
<div className="selection:bg-amber-300 selection:text-amber-900">
  <p>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni fugit
    distinctio accusamus? Aliquid minus eaque, nostrum id perferendis
    autem labore architecto quasi quidem, neque recusandae voluptates quam
    nisi. Dolor, repellendus.
  </p>
</div>
```

- `selection:bg-amber-300` 👉 设置选中时的背景颜色
- `selection:text-amber-900` 👉 设置选中时的字体颜色

## flex

### **两栏布局**

```html
<div className="flex h-screen">
  <div className="bg-red-200 w-48">left</div>
  <div className="bg-blue-200 flex-1">right</div>
</div>
```

### **水平垂直方向居中**

```html
<div className="flex justify-center items-center h-screen">
  <div className="bg-red-200 w-48 h-48">center</div>
</div>
```

### **两端对齐导航栏**

```html
<nav className="flex justify-between">
  <div className="cursor-pointer text-center bg-red-500 flex-1">Home</div>
  <div className="cursor-pointer text-center bg-green-500 flex-1">
    About
  </div>
  <div className="cursor-pointer text-center bg-blue-500 flex-1">
    Contact
  </div>
</nav>
```

### **垂直方向菜单栏**

```html
<ul className="flex flex-col h-screen">
  <li className="border mb-2 py-4 px-2">#item1</li>
  <li className="border mb-2 py-4 px-2">#item2</li>
  <li className="border mb-2 py-4 px-2">#item3</li>
  <li className="border mb-2 py-4 px-2">#item4</li>
  <li className="border mb-2 py-4 px-2">#item5</li>
  <li className="border mb-2 py-4 px-2">#item6</li>
</ul>
```

## grid

### **两栏布局**

```html
<div className="grid grid-cols-2 h-screen">
  <div className="bg-red-200">left</div>
  <div className="bg-blue-200">right</div>
</div>
```

- grid 👉 `display: grid;`
- grid-cols-2 👉 `grid-template-columns: repeat(2, minmax(0, 1fr));`

### **水平垂直方向居中**

```html
<div className="grid place-items-center h-screen">
  <div className="bg-red-200 w-48 h-48">center</div>
</div>
```

- grid 👉 `display: grid;`
- place-items-center 👉 `place-items: center;`

### **导航栏**

```html
<nav className="grid grid-cols-3">
  <div className="cursor-pointer text-center bg-red-500">Home</div>
  <div className="cursor-pointer text-center bg-green-500">About</div>
  <div className="cursor-pointer text-center bg-blue-500">Contact</div>
</nav>
```

- grid 👉 `display: grid;`
- grid-cols-3 👉 `grid-template-columns: repeat(3, minmax(0, 1fr));`

### **图片画廊**

```html
<div className="grid grid-cols-3 gap-4">
  <img src="/next.svg" alt="image 1" className="w-full object-scale-down h-64" />
  <img
    src="/vercel.svg"
    alt="image 2"
    className="w-full object-contain h-64"
  />
  <img src="/next.svg" alt="image 3" className="w-full object-cover h-64" />
  <img
    src="/vercel.svg"
    alt="image 3"
    className="w-full object-fill h-64"
  />
</div>
```

- grid 👉 `display: grid;`
- grid-cols-3 👉 `grid-template-columns: repeat(3, minmax(0, 1fr));`
- gap-4 👉 `gap: 1rem; /* 16px */`
- object-scale-down: `object-fit: scale-down;`
- object-contain: `object-fit: contain;`
- object-cover: `object-fit: cover;`
- object-fill: `object-fit: fill;`

## 定位

### **relative + absolute**

```html
<div className="relative h-40 border-2 bg-sky-200">
  <p>父容器</p>
  <div className="absolute top-10 left-10 size-48 bg-red-300">
    子元素A
  </div>
  <div className="absolute top-16 left-16 size-48 bg-green-300">
    子元素B
  </div>
  <div className="absolute top-24 left-24 size-48 bg-blue-300">
    子元素C
  </div>
</div>
```

- relative 👉 `position: relative;`
- absolute 👉 `position: absolute;`
- top-10 👉 `top: 2.5rem; /* 40px */`
- left-10 👉 `left: 2.5rem; /* 40px */`
- bottom-* 👉 `bottom: _;`
- right-* 👉 `right: _;`

### **z-index**

```html
<div className="absolute top-16 left-16 size-48 bg-green-300 z-10">
  子元素B
</div>
```

### **fixed**

```html
<button className="fixed bottom-10 right-10 size-10 text-white text-xl bg-purple-500 rounded-full">
  +
</button>
```

### **sticky**

粘性定位，一般把导航栏贴在顶端：

```html
<ul className="h-40 border-2 overflow-auto">
  <nav className="sticky top-0 bg-teal-500">navigation</nav>
  <li>#item1</li>
  <li>#item2</li>
  <li>#item3</li>
  <li>#item4</li>
  <li>#item5</li>
  <li>#item6</li>
  <li>#item7</li>
  <li>#item8</li>
  <li>#item9</li>
  <li>#item10</li>
</ul>
```