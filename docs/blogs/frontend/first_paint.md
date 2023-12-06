# first_paint

## 现象

经过埋点分析页面的 first-paint 数据，接近 7% 的用户 first-paint 数据在 2 秒以上，50% 以上的用户在 500ms 以上。对于一个本身较为简单的页面来说还是非常慢的。

fp 平均耗时在900ms以上

## 方案

1. 所有的 src 引入的 script, 需携带 defer 属性。例如：

```html
<script src="./main.bundle.js?v=1.1.2" defer>
```

2. html 模板中需要有一个 id = "loading" 的元素，loading 的样式应为 inline 形式，如果 loading 需要图片，需要增加图片的 preload：

```html
<link rel="preload" href="./images/loading.png" as="image">
```

3. 所有 css 样式的 link 标签，增加 rel="preload"，并在 onload 后将 rel 属性改为 stylesheet。例如：

```html
<link rel="preload" href="./main.css" as="style" onload="this.rel='stylesheet'">
```

## 效果

FP 平均值为 400ms，提升 100% 以上

接近不到 3% 的用户 first-paint 数据在 2 秒以上，50% 以上的用户在 200ms 以内。
