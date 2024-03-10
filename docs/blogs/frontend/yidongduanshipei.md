---
theme: channing-cyan
---
# 移动端适配

## 适配方案汇总

1. `媒体查询百分比设置（不推荐）`
2. `rem 单位 + 动态 html 的 font-size（过渡方案）`
3. `viewport，vw 单位适配（推荐）`
4. `flex 的弹性布局`

## 1. 媒体查询百分比设置（不推荐）

早期的移动端适配方案，已经被淘汰了！

**思路：通过媒体查询来设置不同尺寸屏幕下 html 的 font-size**

**缺点：**

- 不同属性的百分比值，相对的可能是不同参照物，所以百分比往往很难统一
- 需要针对不同的屏幕编写大量的媒体查询
- 如果动态改变尺寸，不会实时更新，只是一个个区间

## 2. rem + 动态设置 font-size（不推荐）

rem 单位是相对于 html 元素的 font-size 来设置的，通过在不同屏幕尺寸下，动态的修改 html 元素的 font-size 以此来达到适配效果

在开发中，我们只需要考虑两个问题：
- 针对不同的屏幕，设置 html 不同的 font-size
- 将原来设置的尺寸，转化成 rem 单位

```js
function setRemUnit() {
  // 获取所有的 html 元素
  const htmlEl = document.documentElement
  // 375 -> 16px
  // 320px -> 12px
  // 我们需要动态更改字体大小，因此需要获取网页的宽度
  // 拿到客户端宽度
  const htmlWidth = htmlEl.clientWidth
  // 将宽度分成10份
  const htmlFontSize = htmlWidth / 10
  console.log('htmlFontSize', htmlFontSize);
  // 将值给到html的font-size
  htmlEl.style.fontSize = htmlFontSize + 'px'
}

setRemUnit()
// 给 window 添加监听事件
window.addEventListener('resize', setRemUnit) 
```

### px 与 rem 的单位换算

**手动换算：**

- 根元素 html 的文字大小 = 视口宽度/分成的份数(一般为10份，方便计算)
- rem 值 = 元素的 px 值 / 根元素 html 的文字大小
- 比如有一个在375px屏幕上，100px宽度和高度的盒子
- 我们需要将100px转成对应的rem值
- 100/37.5=2.6667，其他也是相同的方法计算即可

**less/scss函数：**

```js
.pxToRem(@px) {
  result: 1rem * (@px / 37.5);
}

.box {
  width: .pxToRem(100)[result];
  height: .pxToRem(100)[result];
  background-color: orange;
}

p {
  font-size: .pxToRem(14)[result];
}
```

**postcss-pxtorem：**

- 目前在前端的工程化开发中，我们可以借助于webpack的工具来完成自动的转化
- `npm install postcss-pxtorem`

**VSCode插件：**

- `px to rem & rpx & vw (cssrem)` 插件

### lib-flexible（不推荐）

lib-flexible 是淘宝团队出品的一个移动端自适应解决方案，通过动态计算 viewport 设置 font-size 实现不同屏幕宽度下的 UI 自适应缩放。

```js
(function flexible (window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }
  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document)) 
```

**设备像素比 dpr：**
- `dpr（device pixel ratio）表示设备像素比`，设备像素/设备独立像素，代表设备独立像素到设备像素的转换关系，在JS中可以通过 window.devicePixelRatio 获取
- 计算公式为：`DPR = 物理像素/逻辑像素`
- 当设备像素比为 `1:1` 时，使用 1（1×1）个设备像素显示 1 个CSS像素；
- 当设备像素比为 `2:1` 时，使用 4（2×2）个设备像素显示 1 个CSS像素；
- 当设备像素比为 `3:1` 时，使用 9（3×3）个设备像素显示 1 个CSS像素。

## 3. viewport，vw 单位适配（推荐）

- `100vw` 相当于整个视口的宽度 innerWidth
- `1vw` 相当于视口宽度的 `1%`
- 将 px 转换为 vw 即可完成适配

```HTML
<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no;">
```

1. **width=device-width**：
    - 这意味着页面的宽度应该等于设备的屏幕宽度。这是响应式设计的基础，因为它确保了页面内容会根据设备的屏幕大小进行适当调整。

2. **initial-scale=1**：
    - 当页面首次加载时，缩放级别应设为1，既不放大也不缩小。

3.  **maximum-scale=1 和 minimum-scale=1**：
    - 这限制了用户可以缩放页面的最大和最小级别。在这里，它们都被设置为1，意味着用户不能放大或缩小页面。

4.  **user-scalable=no**：
    - 这表示用户不能通过手势（如双指捏合或放大）来缩放页面。这与 `maximum-scale=1` 和 `minimum-scale=1` 的效果相似，但更直接地禁止了缩放功能。

**vw 相比于 rem 的优势：**

- 不需要去计算 html 的 font-size 大小，也不需要去给 html 设置 font-size
- 不会因为设置 html 的 font-size 大小，而必须再给 body 设置一个 font-size 防止继承
- 因为不依赖 font-size 的尺寸，所以不用担心某些原因的 html 的 font-size 尺寸被篡改，导致页面尺寸混乱
- vw 更加语义话，1vw 相当于 1/100 viewport 的大小
- rem 事实上作为一种过渡的方案，它利用的也是 vw 的思想

### px 与 vw 的单位转换：

**手动换算：**

- 比如屏幕尺寸为 375px，元素大小为 150px，我们需要将 150px 转换成对应的 vw 值：150 / 3.75= 40

**less/scss 函数：**

```js
@vwUnit: 3.75;
.pxToVw(@px) {
  result: (@px / @vw) * 1vw
}
.box {
  width: .pxToVw(100)[result];
  height: .pxToVw(100)[result];
} 
```

**postcss-px-to-viewport-8-plugin：**

- 和 rem 一样，在前端的工程化开发中，我们可以借助于 webpack 的工具来完成自动的转化
- `npm install postcss-px-to-viewport-8-plugin`

```js
// postcss.config.js
module.exports = {
    plugins: {
        'postcss-px-to-viewport-8-plugin': {
            unitToConvert: 'px', // 需要转换的单位，默认为"px"
            viewportWidth: 375, // 设计稿的视口宽度
            exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, //  是否直接更换属性值，而不添加备用属性
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: 'vw', // 横屏时使用的单位
            landscapeWidth: 1125 // 横屏时使用的视口宽度
        }
    }
}
```

**vs Code 插件：**

- `px to vw & rem (cssrem)` 插件

## 扩展

### 1px 问题

**由于屏幕的物理像素与CSS像素（逻辑像素）之间的比例问题，导致设计师预期的1物理像素边框在屏幕上显示得过粗或过细的问题**。

这个问题的根源在于，早期没有逻辑像素的概念时，1px 的 CSS 像素直接对应 1 物理像素。但随着响应式设计和 Retina 屏幕的出现，为了适配不同设备，引入了逻辑像素比（Device Pixel Ratio, DPR），使得 1px 的 CSS 像素对应的物理像素由 DPR 决定。

**解决方案：**
1.  **使用媒体查询调整**：针对不同 DPR 的设备编写不同的样式规则，确保 1px 边框在不同设备上具有相同的视觉效果。这种方法的缺点是需要写多套 CSS 代码，维护成本较高。（不推荐）
2.  **使用`transform: scale(0.5)`** ：通过缩放元素大小的方式来保证 1px 边框的精细度。但这种方法可能会影响布局和定位。
3.  **使用伪类和阴影**：利用伪元素和 box-shadow 属性来模拟边框，可以实现较细的边框效果，但会增加代码复杂度和性能消耗。
4.  **使用 SVG 或图标字体**：SVG 和图标字体可以保证在不同设备上的清晰度和一致性，但可能会导致文件大小增加。
5.  **使用 postcss 插件自动处理**：自动化工具可以根据设备的 DPR 自动生成对应宽度的边框，简化了开发流程。
6.  **使用 flexible 方案**：例如使用 lib-flexible 等库，根据屏幕的实际像素密度动态调整 CSS 像素和物理像素之间的映射关系。



