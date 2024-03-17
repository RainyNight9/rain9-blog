# js 高级程序设计

## 第 1 章

1995 年，JavaScript 问世（为了处理输入验证）。

JS 快速成长为一门用来与网页交互的脚本语言，**完整的 JS 实现包含**：

1. 核心（ECMAScript）
2. 文档对象模型（DOM）
3. 浏览器对象模型（BOM）

### 小结

第 1 章主要介绍了 JS 的起源、发展历程、标准化，以及它在现代 web 开发中的地位。

**起源：** JS 最初由 Netscape 公司的 Brendan Eich 开发，作为一种在浏览器中执行脚本的语言，以使页面具有动态性。

**发展历程：** 代替服务端语言`处理输入验证` ——》设计为一种脚本语言，用于在浏览器中`处理用户交互` ——》逐渐演变为一门强大的通用编程语言，可用于`开发复杂的应用程序`。

**标准化：** ECMAScript 定义了 JavaScript 的核心语法和特性。

**重要性：** web 端、node 服务端、小程序、桌面端、移动端、游戏开发、数据可视化......

## 第 2 章

### script

**`<script>` 元素下有 8 个属性：** 

1. **src：** 可选。表示包含要执行的代码的外部文件。不受同源策略限制。
2. **defer：** 可选。表示脚本立即下载但延迟到文档完全被解析和显示之后再执行。只对外部文件有效。
3. **async：** 可选。表示应该立即开始下载脚本（不能修改 DOM），但不能阻止其他页面动作。只对外部文件有效。（不推荐）
4. **type：** 可选。代替 language。表示代码块中脚本语言的内容类型（MIME 类型）。`如果这个值是 module，则代码会被当成 ES6 模块，而且只有这个时候代码中才能出现 import 和 export 关键字`。
5. **crossorigin：** 可选。配置相关请求的 CORS（跨源资源共享）设置。默认不使用 CORS。
6. **integrity：** 可选。允许比对收到的资源和指定的加密签名以验证子资源完整性（SRI，Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络（CDN，Content Delivery Network）不会提供恶意内容。
7. **charset：** 可选。使用 src 属性指定的代码字符集。（非重点）
8. **language：** 废弃。

```HTML
<srcipt src="demo.js">
function sayScript(){
    console.log('hi, script!')
}
</script>
```

对于上述代码，浏览器只会下载并执行 demo.js 脚本文件，从而忽略行内代码 sayScript 函数。

**动态创建 script 元素**是异步加载的，相当于添加了 async 属性。不过这样做可能有问题，因为浏览器都支持 createElement() 方法，但不是所有浏览器都支持 async 属性。因此要统一动态脚本的加载行为，可以明确设置为同步代码。`script.async = false`。

动态创建 script 获取资源对浏览器预加载是不可见的。严重影响在资源获取队列中的优先级，严重影响性能。解决该问题，需要：

```HTML
<link rel="preload" href="xxxxx.js">
```

[相关兼容性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)可查看。

### 行内代码 vs 外部文件

**推荐使用外部文件：**

- 可维护性。
- 缓存。
- 适应未来。规避一些注释黑科技等。

### 小结

在 script 中，性能优化中推荐使用 defer，尽量不推荐 async（看情况而定）。

`crossorigin` 是 `<script>` 标签的一个属性，而 CORS（跨源资源共享）是一种通过 HTTP 头部来允许或拒绝浏览器在一个源上请求加载的资源来处理跨域请求的机制。虽然它们都涉及到跨域，但它们解决的问题和实际应用场景有一些区别。

```HTML
// 表示脚本请求不包含用户凭据（如 cookie 或 HTTP 认证信息），
// 即使服务器返回了相应的响应头，浏览器也不会将凭据发送给服务器。
<script src="https://example.com/script.js" crossorigin="anonymous"></script>


// 表示脚本请求会包含用户凭据。
// 如果服务器允许使用凭据，它需要在响应中包含正确的 CORS 头部。
<script src="https://example.com/script.js" crossorigin="use-credentials"></script>
```

CORS 通过在服务器端的 HTTP 头部中设置 `Access-Control-Allow-Origin`、`Access-Control-Allow-Methods`、`Access-Control-Allow-Headers` 等来控制允许的源、方法和头部信息。

## 第 3 章 语言基础

### 语法

所谓**标识符**，就是变量、函数、属性或函数参数的名称。
- 第一个字符必须是一个字母、下划线或美元符号
- 剩下的其他字符可以是字母、下划线、美元符号或数字

推荐**驼峰**大小写形式。

JS 使用**分号（;）** 分割语句。推荐加分号。
- 避免输入内容不完整
- 便于开发者通过删除空行来压缩代码
- 有助于在某些情况下提升性能，因为解析器会尝试在合适的位置补上分号来纠正语法错误。

```js
// 不推荐
if(test)
    console.log(test)

// 推荐   
if(test){
    console.log(test)
}
```

### 关键字与保留字

保留的关键字不能用作标识符或属性名。

### 变量

**var**
- 声明作用域（函数作用域）
- 声明提升

**let**
- 块作用域
- 暂时性死区（let 声明的变量不会在作用域中被提升）
- 全局声明（let 声明的变量不会成为 window 对象属性）
- 不允许重复声明
- for 循环中的 let 声明

**const**
- 和 let 的区别就是 const 是常量

推荐使用：const 优先，let 次之，不使用 var

### 数据类型

原始类型：Undefined、Null、Boolean、Number、String、Symbol

引用类型：Object、Array、Date、RegExp、Error

**typeof：**
`typeof value === 'object'`, 则 value 值为对象（非函数）或 null，因为特殊值 null 被认为是一个对空对象的引用。null 值表示一个空对象的引用。

```JS
null == undefined // true
```

**科学计数法**：可以表示非常大或非常小的数值、浮点值。
```js
3.125e7 // 31250000
3e-17 // 0.000 000 000 000 000 03
3e-7 // 0.000 000 7
```

- 最小值：Number.MIN_VALUE
- 最大值：Number.MAX_VALUE
- 无穷大：Infinity
- 无穷小：-Infinity

**NaN 特性：**
- 任何涉及 NaN 的操作始终返回 NaN（如 NaN/10）
- NaN 不等于包括 NaN 在内的任何值（`NaN == NaN // false`）

**isNaN()**

数值转换：Number()、parseInt()、parseFloat()

**Number():**
- 布尔值，true 转换为 1，false 转换为 0
- 数值，直接返回
- null，返回 0
- undefined， 返回 NaN
- 字符串，
    - 包含数值，返回数值
    - 包含浮点值，返回对应的浮点值
    - 包含 16 进制，转换为 10 进制
    - 空字符串，返回 0
    - 其他情况，返回 NaN
- 对象，调用 valueOf() 返回值

**parseInt():** 优先于 Number() 使用。
- 解析字符串，并返回整数。它从字符串的开头开始解析，直到遇到非数字字符为止。
- 第二个参数是基数，表示要解析的数字的进制。如果不提供基数，默认是 10。基数范围是 2 到 36。
- `parseInt()` 返回的是整数部分，忽略小数部分。

**parseFloat()：**
- `parseFloat()` 用于解析字符串，并返回浮点数。它从字符串的开头开始解析，直到遇到非数字字符为止。
- 如果字符串包含多个小数点，只解析第一个小数点。
- `parseFloat()` 会返回小数部分。

**toString()：**
- 几乎所有值都有 toString() 方法。
- null 和 undefined 没有 toString() 方法。

**String():** 优先于 toString()
- 如果有 toString() 方法，则调用该方法返回结果
- 如果是 null，返回 'null'
- 如果是 undefined，返回 'undefined'

**Symbol(符号)：** 是原始值，且实例是唯一、不可变的。
- 用途：确保对象属性使用唯一标识符，不会发生属性冲突的危险。
- Symbol() 函数不能与 new 关键字一起作为构造函数使用。

**Symbol.for()** 对每一个字符串键都执行幂等操作。
```JS
let fooGlobalSymbol = Symbol.for('foo') // 创建新符号
let otherFooGlobalSymbol = Symbol.for('foo') // 重用已有符号

fooGlobalSymbol === otherFooGlobalSymbol // true
```

**Symbol.keyFor():**
```JS
// 创建全局符号
let s = Symbil.for('foo')
Symbol.keyFor(s) // foo

// 创建普通符号
let s2 = Symbol('bar')
Symbol.keyFor(s2) // undefined

Symbol.keyFor(123) // TypeError
```

**object** 实例都有如下属性和方法：
- constructor: 用于创建当前对象的函数
- hasOwnProperty()：用于判断当前对象实例上存在给定的属性。
- isPrototypeOf()：用于判断当前对象是否为另一个对象的原型。
- propertyIsEnumerable()：用于判断给定的属性是否可以使用 for-in 语句枚举。
- toLocaleString()：返回对象的字符串表示，反应对象所在的本地化执行环境。
- toString()：返回对象的字符串表示。
- valueOf()：返回对象对应的字符串、数值、布尔值的表示。

```js
const array = [1, 2, 3]; 
console.log(array.toLocaleString()); // "1, 2, 3" 

const date = new Date(); 
console.log(date.toLocaleString()); // 根据本地化规则格式化日期
```

### 操作符

**按位非：** 波浪符（～）表示，作用是返回数值的一补救。最终效果是对数值取反并减 1。

**按位与：** 和号（&）表示，有两个操作数。

**按位或：** 管道符（｜）表示，同样有两个操作数。

**按位异或：** 拖字符（^）表示，同样有两个操作数。

**左移：** 两个小于号（<<）表示，会按照指定的位数将数值的所有位向左移动。

**有符号右移：** 两个大于号（>>）表示，会将数值的所有 32 位都向右移，同时保留正负。实际上是左移的逆运算。

**无符号右移：** 三个大于号（>>>）表示，会将数值的所有 32 位都向右移。负数操作差异大。

**逻辑非：** 叹号（!）表示。

**逻辑与：** 两个和号（&&）表示，应用到 2 个值。

**逻辑或：** 两个管道符（||）表示。

**乘法：** 星号（`*`）表示。

**除法：** 斜杠（/）表示。

**取模：** 取余数，百分比（%）表示。

**指数操作符：** 两个星号（`**`）表示。等同 Math.pow()。

### 语句

```js
if() {
    // ...
}else if() {
    // ...
}else{
    // ...
}


do{
    // ...
}while()


while(){
    // ...
}


for(let i=0; i<arr.length; i++){
    // ...
}


for(const key in obj){
    // ...
}


for(const item of arr){
    // ...
}


// 不推荐
with(location){
    let qs = search.substring(1)
    let hostName = hostname
    let url = href
}


switch(){
    case value1:
        // ...
        break;
    case value2:
        // ...
        break;
    default:
        // ...
}
```

### 函数

- 函数是JavaScript中的一等公民，可以作为值进行传递。
- 使用 `function` 关键字声明函数，可以有参数和返回值。
- 函数表达式和函数声明的区别。

## 第 4 章 变量、作用域与内存

### 原始值与引用值

JS 变量可以保存两种类型的值：`原始值与引用值`。
- 原始值大小固定，因此保存在`栈内存`上。
- 从一个变量到另一个变量复制原始值会创建该值的第二个副本。
- 引用值是对象，存储在`堆内存`上。
- 包含引用值的变量实际上只包含指向相应对象的一个`指针`，而不是一个对象本身。
- 从一个变量到另一个变量复制引用值只会复制指针，因此结果是两个变量都指向同一个对象。
- typeof 可以确定值的`原始类型`，而 instanceof 用于确保值的`引用类型`。

```js
function setName(obj){
    obj.name = 'zhangsan'
    
    obj = new Object()
    obj.name = 'lisi'
}

let person = new Object()
setName(person)
person.name // 'zhangsan'
```

当 obj 在函数内部被重写时，它变成了一个指向本地对象的指针。而那个本地对象在函数执行结束时就被销毁了。

### 执行上下文与作用域

`执行上下文（作用域）`决定变量的生命周期，以及它们可以访问代码的哪些部分。
- 执行上下文分为`全局上下文、函数上下文、块级上下文`。
- 代码执行流每进入一个新上下文，都会创建一个`作用域链`，用于搜索变量和函数。
- 函数、块的局部上下文不仅可以访问自己作用域内的变量，而且也可以访问任何包含上下文乃至全局上下文中的变量。
- 全局上下文只能访问全局变量和函数，不能直接访问局部上下文的数据。
- 变量的执行上下文用于确定什么时候释放内存。

### 垃圾回收

JS 是使用垃圾回收的编程语言，开发者不需要操心内存分配和回收。
- 离开作用域的值会被自动标记为可回收，然后在垃圾回收期间被删除。
- 主流的垃圾回收算法是`标记清除`，即先给当前不使用的值加上标记，再回来回收它们的内存。
- `引用计数`是另外一种垃圾回收策略，需要记录值被引用了多少次。（被弃用）
- 引用计数在代码中存在循环引用时会出现问题。
- 解除变量的引用不仅可以消除循环引用，而且对垃圾回收也有帮助。（推荐）


## 第 5 章 基本引用类型

### Date

Date 类型提供关于日期和时间的信息，包括当前日期、时间及相关计算。

```js
// 获取当前日期和时间
const currentDateTime = new Date();

// 获取年、月、日、时、分、秒
const year = currentDateTime.getFullYear();
const month = currentDateTime.getMonth(); // 0-11
const day = currentDateTime.getDate();
const hours = currentDateTime.getHours();
const minutes = currentDateTime.getMinutes();
const seconds = currentDateTime.getSeconds();

// 获取毫秒数和星期几
const milliseconds = currentDateTime.getTime();
const dayOfWeek = currentDateTime.getDay(); // 0-6，0 表示星期日

// 设置年、月、日、时、分、秒
currentDateTime.setFullYear(2023);
currentDateTime.setMonth(0); // 0-11
currentDateTime.setDate(1);
currentDateTime.setHours(12);
currentDateTime.setMinutes(30);
currentDateTime.setSeconds(0);

// 使用 `toLocaleString()` 格式化日期
const formattedDate = currentDateTime.toLocaleString();

// 获取当前时间戳
const timestamp = Date.now();
```

### RegExp

`RegExp`（正则表达式）是 JavaScript 中用于处理字符串匹配的对象。正则表达式是一种强大的工具，用于在文本中进行搜索、匹配和替换操作。

```js
// 字面量表示法
const pattern = /abc/;

// 构造函数表示法
const pattern = new RegExp("abc");
```

**正则表达式的模式语法：**

1. **普通字符：** 匹配文本中的普通字符。
2. **元字符：** 具有特殊含义的字符，如 `^`、`$`、`.`、`*`、`+`、`?` 等。
3. **字符类：** 使用 `[]` 表示一组字符，如 `[a-z]` 表示匹配任意小写字母。
4. **转义字符：** 使用 `` 对特殊字符进行转义。

**正则表达式的方法：**

1. **`test()` 方法：**

- 检测字符串是否匹配正则表达式，返回布尔值。

```js
const pattern = /abc/;
const result = pattern.test("abcdef"); // true
```

2. **`exec()` 方法：**

- 在字符串中查找匹配正则表达式的内容，返回匹配结果的信息。

```js
const pattern = /abc/;
const result = pattern.exec("abcdef"); // 返回匹配结果的信息
```

3. **`match()` 方法：**

- 在字符串中查找匹配正则表达式的内容，返回匹配结果的数组。

```js
const pattern = /abc/;
const result = "abcdef".match(pattern); // 返回匹配结果的数组
```

4. **`search()` 方法：**

- 在字符串中查找匹配正则表达式的位置，返回第一个匹配的索引。

```js
const pattern = /abc/;
const resultIndex = "abcdef".search(pattern); // 返回匹配结果的索引
```

5. **`replace()` 方法：**

- 替换字符串中匹配正则表达式的部分。

```js
const pattern = /abc/;
const result = "abcdef".replace(pattern, "123"); // 返回替换后的字符串
```

**正则表达式的修饰符：**

1. **`i` 修饰符：**

- 表示匹配时不区分大小写。

```js
const pattern = /abc/i;
```

2. **`g` 修饰符：**

- 表示匹配所有结果，而不仅仅是第一个。

```js
const pattern = /abc/g;
```

3. **`m` 修饰符：**

- 表示多行匹配。

```js
const pattern = /abc/m;
```

### 原始值包装类型

JavaScript 中的原始值包装类型是一种特殊的对象，用于提供对原始值的一些额外功能和方法。有 3 种原始值包装类型：`Boolean、Number、String`。
- 每种包装类型都映射到同名的原始类型。
- 以读模式访问原始值时，后台会实例化一个原始值包装类型的对象，借助这个对象可以操作相应的数据。
- 涉及原始值的语句执行完毕后，包装对象就会被销毁。

**Boolean：**
```js
const bool = new Boolean(true);

const valueOf = bool.valueOf(); // 获取布尔值的原始值
```

**Number：**
```js
const num = new Number(42);

const toFixed = num.toFixed(2); 
// 将数字转换为字符串，并保留两位小数
const toExponential = num.toExponential(); 
// 将数字转换为科学计数法的字符串表示
```

**String：**
```js
const str = new String("Hello");

const length = str.length; // 获取字符串长度
const charAt = str.charAt(0); // 获取索引为 0 的字符
const toUpperCase = str.toUpperCase(); // 将字符串转换为大写
```

- JS 会在原始值上调用方法时自动创建相应的包装对象，然后调用方法。这被称为`“自动包装”`。
- 原始值是不可变的，而包装对象是可变的。
- 原始值的比较使用 `===` 运算符，而包装对象的比较可能需要使用对象比较的规则。

**虽然可以使用包装对象的方法，但通常更推荐直接在原始值上调用方法，而不是使用包装对象。JavaScript 引擎会在必要时自动进行包装。**

### 单例内置对象

在 JavaScript 中，有一些内置的对象被设计成单例模式，意味着整个程序中只存在一个实例。这些对象提供了一些全局共享的功能，可以在任何地方访问。

当代码开始执行时，全局上下文中会存在两个内置对象：`Global 和 Math`。

**Global 对象**：

- 在浏览器环境中，`global` 对象通常被称为 `window` 对象。
- 在 Node.js 环境中，`global` 对象是一个全局作用域，用于定义全局变量或函数。
- `global` 对象是所有全局变量的容器。
- 如果你在代码中定义一个变量，但没有使用 `var`、`let` 或 `const` 关键字声明它，那么这个变量将被视为 `global` 对象的属性。

**Math 对象**：

Math 对象包含辅助完成复杂计算的属性和方法。
```js
const pi = Math.PI;         // 获取圆周率
const sqrt = Math.sqrt(16); // 4 计算平方根
const random = Math.random(); // 生成一个随机数
const absoluteValue = Math.abs(-5); // 5
const roundedUp = Math.ceil(4.3); // 5
const roundedDown = Math.floor(4.7); // 4
const rounded = Math.round(4.5); // 5
const maxNumber = Math.max(3, 7, 1, 9, 4); // 9
const minNumber = Math.min(3, 7, 1, 9, 4); // 1

const powerResult = Math.pow(2, 3); // 8
// 或者
const powerResultAlt = 2 ** 3; // 8

const sinValue = Math.sin(Math.PI / 2); // 1

const angleInRadians = Math.PI; // 180 度转弧度
const cosValue = Math.cos(angleInRadians); // -1

const angleInRadians = Math.PI / 4; // 45 度转弧度
const tanValue = Math.tan(angleInRadians); // 1
```

## 第 6 章 集合引用类型

### Object

对象是一种无序的集合，使用键值对存储数据。键是字符串或符号，值可以是任意类型的数据。

```js
const myObject = { name: 'John', age: 25, city: 'New York' };
const keysArray = Object.keys(myObject);
// keysArray: ['name', 'age', 'city']

const valuesArray = Object.values(myObject);
// valuesArray: ['John', 25, 'New York']

const entriesArray = Object.entries(myObject);
// entriesArray: [['name', 'John'], ['age', 25], ['city', 'New York']]

const numberOfProperties = Object.keys(myObject).length;
// numberOfProperties: 3

const hasNameProperty = myObject.hasOwnProperty('name'); // true
const hasToStringProperty = myObject.hasOwnProperty('toString'); // false


const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = Object.assign(target, source);
// result: { a: 1, b: 3, c: 4 }

// 冻结对象，使其不可修改。冻结的对象不能添加、删除或修改属性。
const myObject = { name: 'John', age: 25 };
Object.freeze(myObject);
// 之后任何修改操作都会失败，如 myObject.name = 'Jane';

// 封闭对象，使其不能添加新属性，但可以修改或删除现有属性。
const myObject = { name: 'John', age: 25 };
Object.seal(myObject);
// 之后不能添加新属性，但可以修改或删除属性
```

### Array

数组是一种有序的集合，可以存储任意类型的值。通过索引访问数组中的元素，数组的长度是动态可变的。

```js
const arr = [1, 2, 3];
const newLength = arr.push(4, 5);
// arr: [1, 2, 3, 4, 5], newLength: 5

const arr = [1, 2, 3];
const removedElement = arr.pop();
// arr: [1, 2], removedElement: 3

const arr = [2, 3];
const newLength = arr.unshift(0, 1);
// arr: [0, 1, 2, 3], newLength: 4

const arr = [1, 2, 3];
const removedElement = arr.shift();
// arr: [2, 3], removedElement: 1

const arr1 = [1, 2];
const arr2 = [3, 4];
const combinedArray = arr1.concat(arr2);
// combinedArray: [1, 2, 3, 4]

const arr = [1, 2, 3, 4, 5];
const slicedArray = arr.slice(1, 4);
// slicedArray: [2, 3, 4]

const arr = [1, 2, 3, 4, 5];
const removedElements = arr.splice(1, 2, 6, 7);
// arr: [1, 6, 7, 4, 5], removedElements: [2, 3]

const arr = [1, 2, 3, 4, 5];
const index = arr.indexOf(3);
// index: 2

const arr = [1, 2, 3, 4, 3, 5];
const lastIndex = arr.lastIndexOf(3);
// lastIndex: 4

const arr = [1, 2, 3, 4, 5];
const includesElement = arr.includes(3);
// includesElement: true

const arr = ['apple', 'banana', 'orange'];
const result = arr.join(','); // "apple, banana, orange"

const arr = [1, 2, 3, 4];
arr.reverse(); // arr: [4, 3, 2, 1]

const arr = [3, 1, 4, 1, 5, 9, 2];
arr.sort((a, b) => a - b); // arr: [1, 1, 2, 3, 4, 5, 9]

const arr = [1, 2, 3];
arr.forEach((value, index) => {
  console.log(`Element at index ${index}: ${value}`);
});
// 输出：
// Element at index 0: 1
// Element at index 1: 2
// Element at index 2: 3

const arr = [1, 2, 3];
const squaredValues = arr.map(value => value * value);
// squaredValues: [1, 4, 9]

const arr = [1, 2, 3, 4, 5];
const evenNumbers = arr.filter(value => value % 2 === 0);
// evenNumbers: [2, 4]

const arr = [1, 2, 3, 4];
const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// sum: 10

const arr = [2, 4, 6, 8];
const allEven = arr.every(value => value % 2 === 0);
// allEven: true

const arr = [1, 3, 5, 7];
const hasOdd = arr.some(value => value % 2 !== 0);
// hasOdd: true

const arr = [10, 20, 30, 40];
const index = arr.findIndex(value => value > 25);
// index: 2

const arr = [1, 2, 3, 4];
arr.fill(0, 2); // arr: [1, 2, 0, 0]

const arrayLike = { length: 3, 0: 'a', 1: 'b', 2: 'c' };
const newArray = Array.from(arrayLike);
// newArray: ['a', 'b', 'c']

const newArray = Array.of(1, 'two', 3);
// newArray: [1, 'two', 3]

Array.isArray([1, 2, 3]); // true
Array.isArray('not an array'); // false
```

### 定型数组

JavaScript 提供了一种被称为 `"TypedArray"` 的定型数组，它允许直接操作内存，处理二进制数据，以及在底层使用固定大小的数据类型。TypedArray 是 ECMAScript 6 引入的新特性。

下面是一些常见的 TypedArray 类型：

1. **`Int8Array`、`Uint8Array`、`Uint8ClampedArray`：**

- 表示有符号 8 位整数数组、无符号 8 位整数数组、无符号 8 位整数数组（取值范围在 0 到 255 之间，超过边界的值会被截断）。

2. **`Int16Array`、`Uint16Array`：**

- 表示有符号 16 位整数数组、无符号 16 位整数数组。

3. **`Int32Array`、`Uint32Array`：**

- 表示有符号 32 位整数数组、无符号 32 位整数数组。

4. **`Float32Array`：**

- 表示 32 位浮点数数组。

5. **`Float64Array`：**

- 表示 64 位双精度浮点数数组。

```js
// 创建一个 Int32Array，长度为 4
const intArray = new Int32Array(4);

// 设置元素值
intArray[0] = 42;
intArray[1] = 13;
intArray[2] = 7;
intArray[3] = 2023;

// 获取元素值
console.log(intArray[0]); // 42
console.log(intArray[1]); // 13
console.log(intArray[2]); // 7
console.log(intArray[3]); // 2023
```

TypedArray 提供了一些额外的方法，例如 `set`、`subarray` 等，用于更灵活地操作数组的子集和复制。这对于处理二进制数据非常有用，比如处理图像数据、音频数据等。请注意，TypedArray 不同于普通的 JavaScript 数组，因为它们具有固定的长度和元素类型。

### Map

`Map` 是 ES6 引入的集合数据结构，它存储键值对，类似于对象，但键可以是任意数据类型。

与普通的对象相比，`Map` 有一些优势，其中一些主要的特性包括：

1. **键的数据类型：**

- 在 `Map` 中，键可以是任意数据类型，包括原始类型和对象引用。而在普通对象中，键只能是字符串或 Symbol。

2. **键值对的顺序：**

- `Map` 会保持键值对的插入顺序。当迭代 `Map` 时，元素的顺序是按照插入的顺序。

3. **Map 的大小：**

- 通过 `size` 属性可以轻松获取 `Map` 的大小，而对象的属性数量需要手动计算。

4. **内存占用：**

- 固定大小的内存中，Map 大约可以比 Object 多存储 50% 的键值对。

5. **插入性能：**

- Map 插入新键值对会稍微比 Object 快一点。如果代码涉及大量插入操作，那么 Map 性能更好。

6. **查找速度：**

- 如果包含少量键值对，Object 有时候速度更快。如果代码涉及大量查找操作，那么某些情况下选择 Object 更好一些。

7. **删除性能：**

- Map 的 delete() 操作都比插入和查找更快。如果代码涉及大量删除操作，选 Map。

```js
// 创建一个空的 Map
const myMap = new Map();

// 添加键值对
myMap.set('key1', 'value1');
myMap.set('key2', 'value2');
myMap.set('key3', 'value3');

// 获取值
console.log(myMap.get('key1')); // 输出: value1

// 检查是否包含某个键
console.log(myMap.has('key2')); // 输出: true

// 获取 Map 的大小
console.log(myMap.size); // 输出: 3

// 迭代 Map
myMap.forEach((value, key) => {
  console.log(`${key} = ${value}`);
});

// 删除键值对
myMap.delete('key2');
console.log(myMap.size); // 输出: 2
```

`Map` 是一个灵活且强大的数据结构，特别适用于需要使用不同类型的键以及保持插入顺序的场景。

### WeakMap

`WeakMap` 是与 `Map` 类似的集合类型，但它们对于包含的对象是弱引用，这意味着在其他地方没有引用时，这些对象可以被垃圾回收。

与 `Map` 在某些方面有些相似，但有一些关键的区别。

1. **弱引用键：**

- `WeakMap` 的键必须是对象，而且是弱引用。这意味着如果没有其他引用指向键，它可能会被垃圾回收。

2. **不可迭代和无法清空：**

- 与 `Map` 不同，`WeakMap` 不提供像 `forEach` 方法这样的迭代方法，也没有 `clear` 方法。这是因为键是弱引用的，迭代和清空操作可能导致不确定的行为。

3. **没有 size 属性：**

- `WeakMap` 没有类似 `Map` 的 `size` 属性，因为它不提供直接访问所有键值对的方法。

4. **不可遍历：**

-   由于没有类似 `Map` 的 `keys`、`values` 和 `entries` 方法，`WeakMap` 不可被直接遍历。这是为了防止泄漏弱引用对象。

```js
// 创建一个 WeakMap
const myWeakMap = new WeakMap();

// 创建两个对象作为键
const key1 = {};
const key2 = {};

// 向 WeakMap 中添加键值对
myWeakMap.set(key1, 'value1');
myWeakMap.set(key2, 'value2');

// 获取值
console.log(myWeakMap.get(key1)); // 输出: 'value1'

// 检查是否包含某个键
console.log(myWeakMap.has(key2)); // 输出: true

// 删除键值对
myWeakMap.delete(key1);
console.log(myWeakMap.has(key1)); // 输出: false
```

`WeakMap` 在某些场景下很有用，特别是在需要关联数据而不希望阻止垃圾回收的情况下。例如，你可以使用 `WeakMap` 来存储对象的私有数据，而这些数据在对象被销毁时会自动被回收。但请注意，由于 `WeakMap` 的键是弱引用的，需要谨慎使用，以避免出现不可预测的结果。

### Set

`Set` 是 ES6 引入的集合数据结构，它存储唯一的值，不允许重复。

与 `Array` 不同，`Set` 不是按照插入顺序来保存元素的，而是根据元素的值来保持唯一性。

1. **元素的唯一性：**

- `Set` 中的元素必须是唯一的。如果尝试添加已存在的元素，`Set` 不会进行任何操作。

2. **无重复值：**

- `Set` 不允许相同的值存在于集合中。这使得 `Set` 成为存储唯一值的有序列表的好选择。

3. **没有键值对：**

- `Set` 中的元素就是值本身，没有键值对的概念。

```js
// 创建一个空的 Set
const mySet = new Set();

// 添加元素
mySet.add(1);
mySet.add(2);
mySet.add(3);

// 重复添加相同的元素不会生效
mySet.add(1);

// 检查元素是否存在
console.log(mySet.has(2)); // 输出: true

// 获取 Set 的大小
console.log(mySet.size); // 输出: 3

// 删除元素
mySet.delete(2);

// 遍历 Set
mySet.forEach(value => {
  console.log(value);
});

// 清空 Set
mySet.clear();
console.log(mySet.size); // 输出: 0
```

`Set` 是一个非常有用的数据结构，特别适用于需要存储唯一值的场景。在实际应用中，它可以用于去重、存储一组不同的值等。需要注意的是，`Set` 中的元素比较是使用严格相等运算符（`===`）进行的，因此在比较对象时要确保引用相同。

### WeakSet

`WeakSet` 是与 `Set` 类似的集合类型，但它们对于包含的对象是弱引用，这意味着在其他地方没有引用时，这些对象可以被垃圾回收。

1. **只能包含对象：**

- `WeakSet` 只能包含对象，而不能包含原始值或其他类型的值。

2. **弱引用：**

- `WeakSet` 中的对象是弱引用的，不会阻止这些对象被垃圾回收。

3. **无法遍历：**

- 由于弱引用的特性，`WeakSet` 不提供像 `Set` 那样的遍历方法（比如 `forEach`）。因此，你不能列出 `WeakSet` 中的元素。

4. **没有 size 属性：**

- 与 `Set` 不同，`WeakSet` 没有类似 `size` 的属性，因为你不能获取 `WeakSet` 中的元素数量。

5. **没有清空方法：**

- 由于弱引用，`WeakSet` 没有类似 `clear` 的方法。

```js
// 创建一个空的 WeakSet
const myWeakSet = new WeakSet();

// 创建两个对象作为元素
const obj1 = {};
const obj2 = {};

// 添加元素
myWeakSet.add(obj1);
myWeakSet.add(obj2);

// 检查元素是否存在
console.log(myWeakSet.has(obj1)); // 输出: true

// 由于是弱引用，即使将对象赋值为 null，也不会阻止垃圾回收
obj1 = null;

// 检查元素是否存在（由于垃圾回收，应该输出 false）
console.log(myWeakSet.has(obj1)); // 输出: false
```

`WeakSet` 主要用于存储对象的弱引用，例如在一些特定的场景中，你希望在其他地方不再引用某个对象时，该对象能够被垃圾回收。

### 迭代和扩展操作

迭代和扩展操作是 JavaScript 中的一些重要概念，它们涉及到对集合（例如数组、对象、Map、Set 等）的遍历和操作。

```js
// 用于遍历可迭代对象的元素，例如数组、字符串、Map、Set 等。
const array = [1, 2, 3];
for (const element of array) {
  console.log(element);
}

// 用于遍历对象的可枚举属性。不推荐用于遍历数组。
const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  console.log(key, obj[key]);
}

// 展开数组
const array1 = [1, 2, 3];
const array2 = [...array1, 4, 5];

// 展开对象
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };

// 从类数组对象或可迭代对象创建一个新数组。
const arrayLike = { length: 3, 0: 'a', 1: 'b', 2: 'c' };
const newArray = Array.from(arrayLike);
```

## 第 7 章 迭代器与生成器

ES6 规范新增了 2 个高级特性：`迭代器和生成器`。

### 迭代器模式

JavaScript 中的迭代器是一种`设计模式`，它提供了一种遍历容器（如数组、字符串或其他可迭代对象）的方法。

- 迭代器是一个可以`由任意对象实现的接口`，支持连续获取对象产出的每一个值。
- 任何实现 Iterable 接口的对象都有一个 `Symbol.iterator 属性`，这个属性引用默认迭代器。
- 默认迭代器就像一个迭代器工厂，也就是一个函数，调用之后会产生一个实现 Iterator 接口的对象。
- 迭代器必须通过连续调用 `next()` 方法才能连续取的值，这个方法返回一个 IteratorObject。
- 这个对象包含一个 `done 属性`和一个 `value 属性`。
- done 是一个布尔值，表示是否还有更多值可以访问。
- value 包含迭代器返回的当前值。
- 这个接口可以通过手动反复调用 next() 方法来消费，也可以通过原生消费者，比如 for-of 循环来自动消费。

```js
// 迭代器对象
class Iterator {
  constructor(collection) {
    this.collection = collection;
    this.index = 0;
  }

  // 获取下一个元素
  next() {
    if (this.index < this.collection.length) {
      return { value: this.collection[this.index++], done: false };
    } else {
      return { done: true };
    }
  }
}

// 可迭代对象
class Iterable {
  constructor(collection) {
    this.collection = collection;
  }

  // 获取迭代器对象
  getIterator() {
    return new Iterator(this.collection);
  }
}

// 使用迭代器遍历集合
const array = [1, 2, 3, 4, 5];
const iterable = new Iterable(array);
const iterator = iterable.getIterator();

while (true) {
  const { value, done } = iterator.next();
  if (done) break;
  console.log(value);
}
```

- 迭代器在`处理大量数据`时非常有用，可以按需生成数据，而不必一次性加载整个集合。
- 可以通过迭代器`实现自定义数据结构的遍历`。

### 生成器

在 JavaScript 中，生成器（Generator）是一种特殊类型的函数，它允许你在需要时暂停和恢复函数的执行。生成器函数使用 `function*` 关键字进行定义，并包含一个或多个使用 `yield` 语句产生值的区块。生成器提供了一种更灵活的控制流，特别适用于异步编程。

- 生成器是一种`特殊的函数`，调用之后会返回一个`生成器对象`。
- 生成器对象实现了 Iterable 接口，因此可用在任何消费可迭代对象的地方。
- 生成器的独特之处在于支持 `yield` 关键字，这个关键字能暂停执行生成器函数。
- 使用 yield 关键字还可以通过 `next()` 方法接受输入和产生输出。
- 在加上`星号`之后，yield 关键字可以将跟它后边的可迭代对象序列化为一连串值。

```js
// 定义生成器函数
function* myGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

// 调用生成器函数不会执行函数体，而是返回一个生成器对象。
// 可以通过调用生成器对象的 `next()` 方法来启动或恢复生成器的执行。
let gen = myGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// 生成器与 Promise 一起使用，可以实现更具可读性和易维护性的异步代码。
// async/await 就是生成器的语法糖
function* asyncGenerator() {
    try {
        const result = yield fetchData(); // fetchData 返回一个 Promise
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

async function runAsyncGenerator() {
    const gen = asyncGenerator();
    const { value, done } = await gen.next();
    if (!done) {
        // 处理异步结果
    }
}
```

## 第 8 章 对象、类与面向对象编程

### 理解对象

`对象`：一组属性的无序集合。

`Object.defineProperty()` 是 JavaScript 中用于定义或修改对象属性的方法。

通过这个方法，你可以精确地控制属性的行为，包括`可写性、可枚举性、可配置性`等。

该方法接受三个参数：`要定义属性的对象、属性名和属性描述符对象`。

```js
Object.defineProperty(obj, prop, descriptor)
```
- **obj：** 要定义属性的对象。
- **prop：** 要定义或修改的属性名。
- **descriptor：** 包含属性特性的对象，可以设置以下属性：
    -  **value：** 属性的值，默认为 `undefined`。
    -  **writable：** 属性是否可写，布尔值，默认为 `false`。
    -  **enumerable：** 属性是否可枚举，布尔值，默认为 `false`。
    -  **configurable：** 属性是否可配置，布尔值，默认为 `false`。
    -  **get：** 一个获取属性值的函数。
    -  **set：** 一个设置属性值的函数。

#### 数据属性

```js
let obj = {};

Object.defineProperty(obj, 'name', {
    value: 'John',
    writable: true,
    enumerable: true,
    configurable: true
});

console.log(obj.name); // John
```

#### 访问器属性

```js
let obj = {
    _name: 'John',
    get name() {
        console.log('Getting name');
        return this._name;
    },
    set name(value) {
        console.log('Setting name to', value);
        this._name = value;
    }
};

obj.name = 'Alice'; // Setting name to Alice
console.log(obj.name); // Getting name, Alice
```

#### 可配置性

```js
let obj = {
    name: 'John'
};

Object.defineProperty(obj, 'name', {
    configurable: false
});

delete obj.name; // Error: Cannot delete property 'name' of object
```

`Object.defineProperty()` 允许你更细致地控制对象属性的行为，特别是在创建或修改对象的属性时非常有用。

Vue2 的数据响应式的原理就是借用了 `Object.defineProperty()`

#### 定义多个属性

`Object.defineProperties()` 是 JavaScript 中用于定义或修改多个对象属性的方法。

与 `Object.defineProperty()` 不同，`Object.defineProperties()` 接受两个参数：要定义属性的对象和一个包含多个属性描述符的对象。

```js
Object.defineProperties(obj, descriptors)
```

- **obj：** 要定义属性的对象。
- **descriptors：** 包含多个属性特性的对象，其中每个键值对的键是属性名，值是属性描述符对象，描述符对象的结构与 `Object.defineProperty()` 中的描述符相同。

```js
let obj = {};

Object.defineProperties(obj, {
    name: {
        value: 'John',
        writable: true,
        enumerable: true,
        configurable: true
    },
    age: {
        value: 30,
        writable: false,
        enumerable: true,
        configurable: true
    },
    sayHello: {
        value: function() {
            console.log('Hello!');
        },
        enumerable: false,
        configurable: true
    }
});

console.log(obj.name); // John
console.log(obj.age); // 30
obj.sayHello(); // Hello!
```

#### 读取属性的特性

`Object.getOwnPropertyDescriptor()` 是 JavaScript 中用于获取对象属性描述符的方法。它接受两个参数：要获取属性描述符的对象和属性名，然后返回一个包含该属性特性的对象。

```js
Object.getOwnPropertyDescriptor(obj, prop)
```

- **obj：** 要获取属性描述符的对象。
- **prop：** 要获取的属性名。

```js
let obj = {
    name: 'John',
    age: 30
};

let descriptor = Object.getOwnPropertyDescriptor(obj, 'name');

console.log(descriptor);
// Output:
// {
//    value: 'John',
//    writable: true,
//    enumerable: true,
//    configurable: true
// }
```

这个方法常用于检查属性的特性，特别是在进行属性的复杂操作或者在使用 `Object.defineProperty()` 时需要了解已有特性的情况。

#### 合并对象

`Object.assign()` 是 JavaScript 中用于将一个或多个源对象的属性复制到目标对象的方法。它是一个浅拷贝操作，只复制对象的属性值，不复制对象的引用。如果目标对象已经有相同属性名的属性，它们将被后面的源对象覆盖。

```js
Object.assign(target, ...sources)
```

- **target：** 目标对象，将源对象的属性复制到这个对象。
- **sources：** 一个或多个源对象，它们的属性将被复制到目标对象。

```js
let target = { a: 1, b: 2 };
let source1 = { b: 3, c: 4 };
let source2 = { d: 5 };

Object.assign(target, source1, source2);

console.log(target);
// Output: { a: 1, b: 3, c: 4, d: 5 }
```

>`Object.assign()` 不会递归复制对象内部的对象，而是复制对象的引用。如果源对象的属性值是对象，它们仍然会被视为同一对象。

```js
let obj = { a: 1, b: { c: 2 } };

// 使用 Object.assign() 克隆对象
let clone = Object.assign({}, obj);

console.log(clone);
// Output: { a: 1, b: { c: 2 } }

console.log(obj === clone); // false
console.log(obj.b === clone.b); // true，因为是浅拷贝
```

#### 对象标识与相等判定

`对象标识`指的是对象在内存中的唯一标识符。两个不同的对象具有不同的标识。可以使用 `===` 操作符来比较对象的标识。

```js
let obj1 = { name: 'John' };
let obj2 = { name: 'John' };

console.log(obj1 === obj2); // false，不同的对象标识
```

`相等判定`是指比较对象的值是否相等。可以使用 `==` 或 `===` 进行相等判定。相等判定的结果取决于比较操作符的类型。

```js
let obj1 = { name: 'John' };
let obj2 = { name: 'John' };

console.log(obj1 == obj2); // false，因为对象标识不同
console.log(obj1.name == obj2.name); // true，比较对象属性值
```

`Object.is()` 是 JavaScript 中用于比较两个值是否严格相等的方法。它的行为与 `===` 运算符相似，但有一些区别。主要的区别在于 `Object.is()` 对于特殊值（+0、-0、NaN）的处理以及对对象的处理。

```js
console.log(Object.is(5, 5)); // true
console.log(Object.is(5, '5')); // false
console.log(Object.is(-0, 0)); // false
console.log(Object.is(NaN, NaN)); // true

console.log(Object.is(+0, -0)); // false
console.log(Object.is(+0, 0)); // true
console.log(Object.is(-0, 0)); // false
```

#### 增强的对象语法

```js
// 属性值的简写
let name = "John";
let age = 30;

let person = { name, age };

// 方法的简写
let person = {
    name: "John",
    sayHello() {
        console.log("Hello!");
    }
};

// 计算属性名
let prop = "name";

let person = {
    [prop]: "John"
};
```

#### 对象解构

```js
// 对象的解构
let person = { name: "John", age: 30 };

let { name, age } = person;

console.log(name); // "John"
console.log(age);  // 30

// 别名
let person = { name: "John", age: 30 };

// 使用对象解构，同时给变量取别名
let { name: fullName, age: years } = person;

console.log(fullName); // "John"
console.log(years);     // 30

// 默认值
let person = { name: "John" };
// 使用对象解构，设置默认值
let { name, age = 25 } = person;

console.log(name); // "John"
console.log(age);  // 25，age 没有在 person 对象中定义，使用了默认值

// 嵌套解构
let person = { name: "John", address: { city: "New York", zip: "10001" } };

// 嵌套对象解构
let { name, address: { city, zip } } = person;

console.log(name); // "John"
console.log(city); // "New York"
console.log(zip);  // "10001"

// 剩余属性
let person = { name: "John", age: 30, city: "New York" };

let { name, ...rest } = person;

console.log(name); // "John"
console.log(rest); // { age: 30, city: "New York" }

// 扩展运算符
let person = { name: "John", age: 30 };
let additionalInfo = { city: "New York", occupation: "Developer" };

let combined = { ...person, ...additionalInfo };
```

### 创建对象

#### 工厂模式

使用工厂函数来创建对象，工厂函数实际上是一个返回新对象的函数。

```js
function createPerson(name, age, gender) {
    return {
        name: name,
        age: age,
        gender: gender
    };
}

let person = createPerson("John", 30, "Male");
```

**工厂模式虽然可以解决创建多个类似对象的问题，但是没有解决对象标识问题（即新创建对象是什么类型）**

#### 构造函数模式

构造函数模式是一种使用构造函数来创建对象的方式。通过使用 `new` 关键字调用构造函数，可以创建一个新的对象，并且构造函数中的 `this` 关键字引用了这个新创建的对象。

`构造函数名称的首字母都是要大写的。`

```js
// 构造函数
function Person(name, age, gender) {
    // 使用 this 关键字引用新创建的对象
    this.name = name;
    this.age = age;
    this.gender = gender;

    // 如果需要添加方法，也可以在构造函数内部定义
    this.sayHello = function() {
        console.log("Hello, my name is " + this.name);
    };
}

// 使用构造函数创建对象
let person1 = new Person("John", 30, "Male");
let person2 = new Person("Alice", 25, "Female");

// 访问属性
console.log(person1.name); // John
console.log(person2.age);  // 25

// 调用方法
person1.sayHello(); // Hello, my name is John
person2.sayHello(); // Hello, my name is Alice

person1 instanceof Object // true
person1 instanceof Person // true
```

**定义自定义构造函数可以确保实例被标识为特定类型，相比工厂模式，这是一个很大的好处。但是也有一个弊端，就是导致自定义类型引用的代码不能很好的聚集在一起。**

#### 原型模式

对象的原型模式是 JavaScript 中的一种`创建和继承对象的方式`。

每个对象都有一个`原型（prototype）属性`，原型是一个对象，它包含可以被共享的属性和方法。

当试图访问一个对象的属性或方法时，如果对象本身没有定义这个属性或方法，JavaScript 会从对象的`原型链`中寻找。

对象的原型链指的是从对象自身开始，一直到达原型链的顶端。可以通过对象的 `__proto__` 属性访问其原型。

```js
let person = { name: "John" };
console.log(person.__proto__ === Object.prototype); // true
```

>需要注意的是，如果在构造函数中定义方法，每次创建对象时都会为该方法分配新的内存空间。如果有多个实例共享相同的方法，推荐将方法定义在构造函数的原型上，以避免每次创建对象都复制一份方法。

```JS
function Person(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}

// 在构造函数的原型上定义方法
Person.prototype.sayHello = function() {
    console.log("Hello, my name is " + this.name);
};

let person1 = new Person("John", 30, "Male");
let person2 = new Person("Alice", 25, "Female");

person1.sayHello(); // Hello, my name is John
person2.sayHello(); // Hello, my name is Alice

person1 instanceof Object // true
person1 instanceof Person // true
```

`isPrototypeOf()` 是 JavaScript 中 `Object` 对象的一个方法，用于检测一个对象是否是另一个对象的原型。该方法返回一个布尔值，如果调用该方法的对象是传入的对象的原型，返回 `true`，否则返回 `false`。

```js
// 定义一个原型对象
let personPrototype = {
    sayHello: function() {
        console.log("Hello!");
    }
};

// 创建一个对象，并将 personPrototype 设置为其原型
let person = Object.create(personPrototype);

// 使用 isPrototypeOf() 判断原型关系
console.log(personPrototype.isPrototypeOf(person)); // true

// 使用 Object.getPrototypeOf() 获取对象的原型 
let prototypeOfPerson = Object.getPrototypeOf(person); 
console.log(prototypeOfPerson === personPrototype); // true
```

`Object.setPrototypeOf()`可能会严重影响代码性能。不推荐。

为了避免使用 Object.setPrototypeOf() 可能造成的性能下降，可以通过 Object.create() 来创建一个新对象，同时为其指定原型：

```js
let biped = {
    numLength: 2
}
let person = Object.create(biped)
person.name = 'Matt'

person.name // Matt
person.numLength // 2
Object.getPrototypeOf(person) === biped // true
```

- **Object.keys(obj):** 返回一个包含对象所有可枚举属性的数组。
- **Object.values(obj):** 返回一个包含对象所有可枚举属性值的数组。
- **Object.entries(obj):** 返回一个包含对象所有可枚举属性键值对的数组。
- **Object.hasOwnProperty(prop):** 检查对象是否包含指定属性，不会检查原型链。

`for-in` 循环和 `Object.assign()` 的枚举顺序是不确定的，取决于 js 引擎，可能因浏览器而异。

`Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()、Object.assgin()` 的枚举顺序是确定性的。先以升序枚举数值键，然后以插入顺序枚举字符串和符号键。

### 继承

很多面向对象语言都支持两种继承：`接口继承和实现继承`。

`实现继承`是 ECMAScript 唯一支持的继承方式，而这主要是通过`原型链实现`的。

#### 原型链继承

原型链继承方式的基本思想：`通过原型继承多个引用类型的属性和方法。`

构造函数、原型和实例的关系：`每个构造函数都有一个原型对象，原型有一个属性指向构造函数，而实例有一个内部指针指向原型`。

`原型链`是 JavaScript 中用于实现对象继承的一种机制。每个对象都有一个原型对象，而原型对象也可以有自己的原型，形成一个链式结构。

通过原型链，JavaScript 实现了对象之间的继承关系。子对象可以访问父对象的属性和方法，形成了一种基于原型的继承。

```js
// 父构造函数
function Animal(name) {
    this.name = name;
}

// 在父构造函数的原型上添加方法
Animal.prototype.makeSound = function() {
    console.log("Generic animal sound");
};

// 子构造函数
function Dog(name, breed) {
    // 实现对父构造函数的属性继承
    Animal.call(this, name);
    this.breed = breed;
}

// 通过原型链继承
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

// 创建子对象实例
let myDog = new Dog("Buddy", "Golden Retriever");

// 调用继承的方法
myDog.makeSound(); // Generic animal sound
```

**原型链继承的问题**

1. 共享问题

原型链继承导致子对象实例共享父对象原型上的属性和方法。如果在子对象实例上修改原型上的属性，会影响到所有子对象实例。

```js
let dog1 = new Dog("Buddy", "Golden Retriever");
let dog2 = new Dog("Max", "Labrador");

dog1.makeSound(); // Generic animal sound
dog2.makeSound(); // Generic animal sound

// 修改原型上的属性，会影响所有子对象实例
Dog.prototype.makeSound = function() {
    console.log("Woof! Woof!");
};

dog1.makeSound(); // Woof! Woof!
dog2.makeSound(); // Woof! Woof!
```

2. 构造函数参数传递问题

在原型链继承中，子构造函数调用父构造函数时传递的参数存在一定的限制，可能不够灵活。无法在创建子对象实例时向父构造函数传递参数，因为父构造函数的调用发生在子对象实例创建之前。

```js
function Animal(name) {
    this.name = name;
}

function Dog(breed) {
    Animal.call(this, "DefaultName"); // 无法传递具体的名字参数
    this.breed = breed;
}

let myDog = new Dog("Golden Retriever");
console.log(myDog.name); // DefaultName
```

3. 原型链深层次的问题

在原型链继承中，可能会存在多层嵌套的原型链，导致属性查找的性能问题。在查找属性时，如果找不到，JavaScript 引擎会沿着原型链向上查找，直到找到或者到达链的顶端。

```js
function Animal() {}

function Dog() {}

Dog.prototype = new Animal();

let myDog = new Dog();

// 原型链深度过大可能影响性能
```

#### 盗用构造函数

盗用构造函数（Constructor Stealing）是一种通过`在子构造函数中调用父构造函数来实现继承的技术`。它是继承的一种形式，旨在解决原型链继承的一些问题，如共享属性和构造函数参数传递的限制。

在盗用构造函数的模式中，子构造函数使用父构造函数的实例作为自己的实例，从而达到复用父构造函数的属性的目的。这样，父构造函数的属性不再被共享，而且可以向父构造函数传递参数。

```js
// 父构造函数
function Animal(name) {
    this.name = name;
    this.sound = "Generic animal sound";
}

// 子构造函数
function Dog(name, breed) {
    // 盗用构造函数
    Animal.call(this, name);
    
    this.breed = breed;
}

// 创建子对象实例
let myDog = new Dog("Buddy", "Golden Retriever");

console.log(myDog.name);   // Buddy
console.log(myDog.sound);  // Generic animal sound
console.log(myDog.breed);  // Golden Retriever
```

**盗用构造函数的问题：**

1. **方法不共享：** 由于方法都在构造函数内部定义，它们不会被共享。每个实例都有自己的方法副本，可能导致内存浪费。
2. **无法继承原型链上的方法：** 通过盗用构造函数，无法继承父构造函数原型链上的方法，这减少了代码的复用性。

#### 组合继承

组合继承是一种在 JavaScript 中实现继承的模式，`结合了构造函数继承和原型链继承的优点`，避免了它们各自的缺点。在组合继承中，`使用构造函数来继承属性，同时通过原型链来继承方法`，以实现更有效的继承。

```js
// 父构造函数
function Animal(name) {
    this.name = name;
}

// 在父构造函数的原型上添加方法
Animal.prototype.makeSound = function() {
    console.log("Generic animal sound");
};

// 子构造函数
function Dog(name, breed) {
    // 继承属性（通过构造函数调用）
    Animal.call(this, name);
    
    this.breed = breed;
}

// 继承方法（通过原型链）
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

// 子对象实例
let myDog = new Dog("Buddy", "Golden Retriever");

// 调用继承的方法
myDog.makeSound(); // Generic animal sound
```

组合继承的问题：

1. **原型链上多余的实例属性：** 子构造函数通过 `new Animal()` 创建了一个实例，这个实例包含了一些不必要的属性，可能会影响性能。
2. **构造函数调用两次：** 子构造函数调用了两次父构造函数，一次是通过 `Animal.call(this, name)`，一次是通过 `new Animal()`，可能导致一些不必要的计算和内存浪费。

#### 寄生式继承

寄生式继承的思路：`类似于寄生构造函数和工厂模式，创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象`。

```js
// 原始对象
function createAnimal(name) {
    let animal = {
        name: name,
        makeSound: function() {
            console.log("Generic animal sound");
        }
    };

    // 在原始对象基础上增强
    animal.makeCustomSound = function(customSound) {
        console.log(customSound);
    };

    return animal;
}

// 创建继承对象
function createDog(name, breed) {
    let dog = createAnimal(name);

    // 在继承对象基础上增强
    dog.breed = breed;

    // 重写方法
    let originalMakeSound = dog.makeSound;
    dog.makeSound = function() {
        originalMakeSound.call(this); // 调用原始方法
        console.log("Woof! Woof!");
    };

    return dog;
}

// 使用寄生式继承创建对象
let myDog = createDog("Buddy", "Golden Retriever");

// 调用继承对象的方法
myDog.makeSound(); // Generic animal sound \n Woof! Woof!
myDog.makeCustomSound("Custom sound!"); // Custom sound!
```

**寄生式继承问题：**

1. **不同实例之间的方法不共享：** 寄生式继承中，每个对象的方法都是独立复制的，不会共享，可能导致一定的内存浪费。
2. **构造函数不能传递参数：** 与寄生构造函数继承类似，寄生式继承无法传递参数给构造函数，因为并没有使用 `new` 操作符来调用构造函数。

#### 寄生式组合继承

寄生式组合继承是一种`结合构造函数继承和寄生式继承的继承模式`，旨在避免组合继承的缺点。组合继承的问题在于它会调用两次父构造函数，而寄生式组合继承通过寄生式继承来继承父类的原型，避免了不必要的构造函数调用。

```js
// 父构造函数
function Animal(name) {
    this.name = name;
}

// 在父构造函数的原型上添加方法
Animal.prototype.makeSound = function() {
    console.log("Generic animal sound");
};

// 子构造函数
function Dog(name, breed) {
    // 继承属性（通过构造函数调用）
    Animal.call(this, name);

    this.breed = breed;
}

// 寄生式继承父构造函数的原型
function inheritPrototype(child, parent) {
    // 创建一个空的对象，该对象的原型指向父构造函数的原型
    let prototype = Object.create(parent.prototype);
    // 将子构造函数的原型指向该空对象
    child.prototype = prototype;
    // 修复子构造函数的构造器
    child.prototype.constructor = child;
}

// 使用寄生式组合继承
inheritPrototype(Dog, Animal);

// 在子构造函数的原型上添加方法
Dog.prototype.makeSound = function() {
    // 调用父构造函数原型上的方法
    Animal.prototype.makeSound.call(this);
    console.log("Woof! Woof!");
};

// 创建子对象实例
let myDog = new Dog("Buddy", "Golden Retriever");

// 调用继承的方法
myDog.makeSound(); // Generic animal sound \n Woof! Woof!

// 检查构造器
console.log(myDog.constructor); // Dog
```

### 类

定义类也有两种主要方式：`类声明和类表达式`。

与函数表达式类似，类表达式在它们被求值前也不能引用。不过，与函数定义不同的是，虽然`函数声明可以提升，但类定义不能`。

另一个跟函数声明不同的地方是，`函数受函数作用域限制，而类受块作用域限制`。

```js
// 类声明
class Person {}

// 类表达式
const Animal = class {}
```

**使用 new 调用类的构造函数会执行如下操作：**
1. 在内存中创建一个新对象
2. 在这个新对象内部的 [[Prototype]] 指针被赋值为构造函数的 prototype 属性。
3. 构造函数内部的 this 被赋值为这个新对象。
4. 执行构造函数内部的代码（给新对象添加属性）。
5. 如果构造函数返回非空对象，则返回该对象，否则返回刚创建的新对象。

在 ES6 中，使用 `class` 和 `extends` 语法糖，继承关系更加清晰，而不需要手动操作原型链。 `super` 关键字用于在子类的构造函数中调用父类的构造函数，实现对父类属性的继承。

```js
// 父类
class Animal {
    constructor(name) {
        this.name = name;
    }

    makeSound() {
        console.log("Generic animal sound");
    }
}

// 子类继承父类
class Dog extends Animal {
    constructor(name, breed) {
        // 调用父类构造函数，实现属性继承
        super(name);

        this.breed = breed;
    }

    // 子类添加自己的方法
    bark() {
        console.log("Woof! Woof!");
    }
}

// 创建子类实例
let myDog = new Dog("Buddy", "Golden Retriever");

// 调用继承的方法
myDog.makeSound(); // Generic animal sound
// 调用子类自己的方法
myDog.bark(); // Woof! Woof!
```

**super 使用的几个注意问题：**
- super 只能在派生类构造函数和静态方法中使用。
- 不能单独引用 super，要么用它调用构造函数，要么用它引用静态方法。
- 调用 super() 会调用父类构造函数，并将返回实例赋值给 this。
- super 行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入。
- 如果没有定义类构造函数，在实例化派生类会调用 super()，而且会传入所有传给派生类的参数。
- 在类构造函数中，不能在调用 super() 之前引用 this。
- 如果派生类中显示定义了构造函数，则要么必须在其中调用 super()，要么必须在其中返回一个对象。

## 第 9 章 代理与反射

代理（Proxy）和反射（Reflect）是 ECMAScript 6（ES6）引入的两个新特性，用于操作和拦截 JavaScript 对象的行为。

### 概念

**代理（Proxy）：**

代理是一个用于定义基本操作行为的对象，它允许你在对象上创建一个代理层，以拦截和定制对象的操作。代理对象可以用来`拦截对目标对象的访问、修改、添加、删除等操作`。

**反射（Reflect）：**

反射是一组新的内置对象和方法，它提供了对对象的底层操作，可以被 Proxy 拦截器调用。Reflect 对象的方法和 Proxy 拦截器的方法是一一对应的。

```js
// 创建一个简单的代理
let target = { value: 42 };

let handler = {
  get: function (target, prop, receiver) {
    console.log(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set: function (target, prop, value, receiver) {
    console.log(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  },
};

let proxy = new Proxy(target, handler);

proxy.value; // 获取 value，输出: Getting value
proxy.value = 100; // 设置 value 为 100，输出: Setting value to 100
```

### 应用

#### Vue3

在 Vue 3 中，Proxy 是一个关键的特性，用于实现响应式系统。Vue 3 的响应式系统在设计上使用了 Proxy 来劫持对象的访问和修改操作，从而实现了数据的响应式更新。

1. **数据劫持：** Vue 3 中通过使用 Proxy 对象，可以劫持数据对象的读取和修改操作。这允许 Vue 追踪对响应式对象的访问，并在数据发生变化时自动触发相应的更新。
2. **依赖追踪：** Vue 3 利用 Proxy 捕获数据的读取操作，从而建立起一个依赖图。每个数据的读取操作都会被记录为一个依赖，当数据发生变化时，依赖会被通知，触发更新。
3. **观察者模式：** Vue 3 的响应式系统中使用了观察者模式，Proxy 对象被用作观察者，负责观察被劫持的数据对象。当数据变化时，观察者会通知相关的订阅者执行更新操作。

**设计原理**

1. **Proxy 代理：** Vue 3 中使用 Proxy 对象来代理数据对象。Proxy 对象允许拦截对象的底层操作，例如读取和修改属性。
2. **Reflect 反射：** Vue 3 在 Proxy 拦截器中广泛使用了 Reflect 对象。Reflect 对象提供了一个与 Proxy 拦截器一一对应的方法，用于执行默认操作。
3. **依赖追踪：** Vue 3 使用了一个全局的响应式状态管理对象，称为 `ReactiveEffect`，用于跟踪正在执行的响应式函数以及当前正在访问的依赖项。
4. **响应式函数：** 当访问一个响应式对象的属性时，Vue 3 会创建一个响应式函数，并将该函数与正在执行的响应式函数进行关联。这样就建立了一个依赖关系，当数据变化时，相关的响应式函数会被触发。
5. **批量更新：** 为了提高性能，Vue 3 中引入了批量更新的概念。即使数据发生多次变化，Vue 3 会在下一个微任务中批量执行更新，以减少不必要的计算和渲染操作。

```TS
// packages/reactivity/src/reactive.ts#L241-L278
function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>,
) {
    // 判断目标对象是否为对象
    // 确保只有对象才能被转换成响应式对象。
  if (!isObject(target)) {
    if (__DEV__) {
      console.warn(`value cannot be made reactive: ${String(target)}`)
    }
    return target
  }
  // target is already a Proxy, return it.
  // exception: calling readonly() on a reactive object
  // 如果目标对象已经具有代理对象，并且不是只读的响应式对象，直接返回目标对象。
  // 这是为了避免重复创建代理对象。
  if (
    target[ReactiveFlags.RAW] &&
    !(isReadonly && target[ReactiveFlags.IS_REACTIVE])
  ) {
    return target
  }
  // target already has corresponding Proxy
  // 如果 `proxyMap` 中已经有了目标对象到代理对象的映射关系，直接返回已有的代理对象。
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  // only specific value types can be observed.
  // 使用 `getTargetType` 函数判断目标对象的类型，
  // 如果是无效类型，直接返回目标对象。
  // 这里的类型判断主要用于确定使用哪种代理处理器。
  const targetType = getTargetType(target)
  if (targetType === TargetType.INVALID) {
    return target
  }
  // 使用 `Proxy` 构造函数创建代理对象，
  // 根据目标对象的类型选择相应的代理处理器。
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers,
  )
  // 将目标对象与创建的代理对象进行映射，以便后续直接返回已有的代理对象。
  proxyMap.set(target, proxy)
  // 返回创建的代理对象。
  return proxy
}
```

```TS
// packages/reactivity/src/baseHandlers.ts#L89-L237
class BaseReactiveHandler implements ProxyHandler<Target> {
  constructor(
    protected readonly _isReadonly = false,
    protected readonly _shallow = false,
  ) {}
  // `get` 方法用于拦截目标对象的属性访问操作。
  // 根据属性名和当前的代理对象，进行不同的处理，
  // 包括标识是否是只读、是否是浅层、是否是数组等情况。
  // 还涉及到对属性值的追踪（`track`）和返回新的代理对象。
  get(target: Target, key: string | symbol, receiver: object) {
    const isReadonly = this._isReadonly,
      shallow = this._shallow
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    } else if (key === ReactiveFlags.IS_SHALLOW) {
      return shallow
    } else if (key === ReactiveFlags.RAW) {
      if (
        receiver ===
          (isReadonly
            ? shallow
              ? shallowReadonlyMap
              : readonlyMap
            : shallow
              ? shallowReactiveMap
              : reactiveMap
          ).get(target) ||
        // receiver is not the reactive proxy, but has the same prototype
        // this means the reciever is a user proxy of the reactive proxy
        Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)
      ) {
        return target
      }
      // early return undefined
      return
    }

    const targetIsArray = isArray(target)

    if (!isReadonly) {
        // 如果目标对象是数组并且 `key` 是数组相关的内置方法，
        // 则使用 `Reflect.get` 获取相应的内置方法。
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver)
      }
      if (key === 'hasOwnProperty') {
        return hasOwnProperty
      }
    }

    const res = Reflect.get(target, key, receiver)
    
    // 如果 `key` 是特定的 Symbol 或不可追踪的键，
    // 则直接返回目标对象上的属性值。
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res
    }

   
    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key)
    }

    if (shallow) {
      return res
    }

    if (isRef(res)) {
      // ref unwrapping - skip unwrap for Array + integer key.
      return targetIsArray && isIntegerKey(key) ? res : res.value
    }

    // 如果 `key` 对应的值是对象，将其转换为相应的响应式对象（只读或可变），然后返回。
    if (isObject(res)) {
      // Convert returned value into a proxy as well. we do the isObject check
      // here to avoid invalid value warning. Also need to lazy access readonly
      // and reactive here to avoid circular dependency.
      return isReadonly ? readonly(res) : reactive(res)
    }

    return res
  }
}

class MutableReactiveHandler extends BaseReactiveHandler {
   // 构造函数接收一个可选参数 `shallow`，用于标识是否是浅层响应式对象。
   // 调用父类 `BaseReactiveHandler` 的构造函数，
   // 并将 `_isReadonly` 设置为 `false`，
   // `_shallow` 设置为传入的 `shallow` 值。
  constructor(shallow = false) {
    super(false, shallow)
  }

  set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object,
  ): boolean {
      // 获取目标对象上 `key` 对应的旧值 `oldValue`。
    let oldValue = (target as any)[key]
    // 如果不是浅层响应式且新旧值都不是只读对象，并且值有变化，
    // 将新旧值都转换为原始值（去除响应式包装）。
    if (!this._shallow) {
      const isOldValueReadonly = isReadonly(oldValue)
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue)
        value = toRaw(value)
      }
      // 如果目标对象不是数组且 `key` 对应的旧值是 Ref 对象而新值不是 Ref 对象，
      // 将 Ref 对象的值修改为新值。
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false
        } else {
          oldValue.value = value
          return true
        }
      }
    } else {
      // in shallow mode, objects are set as-is regardless of reactive or not
    }

    const hadKey =
      isArray(target) && isIntegerKey(key)
        ? Number(key) < target.length
        : hasOwn(target, key)
    const result = Reflect.set(target, key, value, receiver)
    // don't trigger if target is something up in the prototype chain of original
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, TriggerOpTypes.ADD, key, value)
      } else if (hasChanged(value, oldValue)) {
        trigger(target, TriggerOpTypes.SET, key, value, oldValue)
      }
    }
    return result
  }

    // `deleteProperty` 方法用于拦截目标对象的属性删除操作
  deleteProperty(target: object, key: string | symbol): boolean {
    const hadKey = hasOwn(target, key)
    const oldValue = (target as any)[key]
    const result = Reflect.deleteProperty(target, key)
    if (result && hadKey) {
      trigger(target, TriggerOpTypes.DELETE, key, undefined, oldValue)
    }
    return result
  }
    
    // `has` 方法用于拦截目标对象的 `in` 操作符。
  has(target: object, key: string | symbol): boolean {
    const result = Reflect.has(target, key)
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, TrackOpTypes.HAS, key)
    }
    return result
  }
  
  // `ownKeys` 方法用于拦截目标对象的 `Object.keys`、`Object.getOwnPropertyNames` 等操作。
  ownKeys(target: object): (string | symbol)[] {
    track(
      target,
      TrackOpTypes.ITERATE,
      isArray(target) ? 'length' : ITERATE_KEY,
    )
    return Reflect.ownKeys(target)
  }
}
```

#### 其他

**1. 访问控制**

通过代理，你可以实现对对象属性的访问控制，例如只读或只写属性：

```js
let person = { name: 'John', age: 30 };

let readOnlyPerson = new Proxy(person, {
  get: function (target, prop) {
    console.log(`Accessing ${prop}`);
    return Reflect.get(target, prop);
  },
  set: function (target, prop, value) {
    console.log(`Setting ${prop} is not allowed`);
    return false; // 不允许设置属性值
  },
});

readOnlyPerson.name; // 访问 name 属性，输出: Accessing name
readOnlyPerson.age = 31; // 尝试设置 age 属性，输出: Setting age is not allowed
```

**2. 数据验证**

使用代理来实现数据验证，确保只有符合条件的数据可以被设置：

```js
let user = { username: 'john_doe', password: 'secret123' };

let secureUser = new Proxy(user, {
  set: function (target, prop, value) {
    if (prop === 'password' && typeof value !== 'string') {
      console.log('Invalid password format');
      return false;
    }
    return Reflect.set(target, prop, value);
  },
});

secureUser.password = 'newPassword'; // 设置密码，有效
secureUser.password = 123; // 设置无效，输出: Invalid password format
```

**3. 缓存代理**

通过代理实现缓存，可以在访问某个值时检查缓存是否已有该值，避免重复计算：

```js
function expensiveOperation() {
  // 模拟耗时计算
  console.log('Performing expensive operation');
  return Math.random();
}

let cachedValue = null;

let cachedProxy = new Proxy({}, {
  get: function (target, prop) {
    if (prop === 'value') {
      if (!cachedValue) {
        cachedValue = expensiveOperation();
      }
      return cachedValue;
    }
  },
});

console.log(cachedProxy.value); // 第一次调用，输出: Performing expensive operation
console.log(cachedProxy.value); // 第二次调用，直接使用缓存值
```

**4. 日志记录**

使用代理记录对象属性的访问和修改操作，用于调试或日志记录：

```js
let loggedObject = new Proxy({}, {
  get: function (target, prop) {
    console.log(`Getting property ${prop}`);
    return Reflect.get(target, prop);
  },
  set: function (target, prop, value) {
    console.log(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  },
});

loggedObject.name = 'John'; // 设置属性，输出: Setting property name to John
console.log(loggedObject.name); // 获取属性，输出: Getting property name
```

## 第 10 章 函数

### 基本概念

- **函数定义：** 使用关键字（例如 `function`）定义函数。
- **参数：** 函数可以接受输入参数，这些参数是在调用函数时传递给函数的值。
- **返回值：** 函数可以产生输出，即返回值，通过 `return` 语句定义。

### 函数的类型

在不同的上下文中，函数可以分为几种不同的类型，其中包括但不限于：

- **全局函数（Global Functions）：** 在整个程序中都可访问的函数。
- **局部函数（Local Functions）：** 在其他函数内部定义的函数，只能在包含它的函数内部访问。
- **匿名函数（Anonymous Functions）：** 没有名称的函数，通常作为参数传递给其他函数，或者作为立即执行的函数表达式（IIFE）使用。
- **箭头函数（Arrow Functions）：** ES6 引入的一种简写语法，具有更短的语法和改变 `this` 行为的特点。
- **高阶函数（Higher-Order Functions）：** 接受函数作为参数或返回一个函数的函数，常用于函数式编程。
- **构造函数（Constructor Functions）：** 可以通过 `new` 关键字调用的函数，用于创建对象的实例。

### 函数的调用模式

函数的调用方式有四种主要模式：

- **函数调用模式（Function Invocation Pattern）：** 直接调用函数，例如 `func()`。
- **方法调用模式（Method Invocation Pattern）：** 通过对象调用的函数，例如 `object.method()`。
- **构造函数调用模式（Constructor Invocation Pattern）：** 使用 `new` 关键字调用的函数，创建对象实例。
- **间接调用模式（Indirect Invocation Pattern）：** 使用 `call` 或 `apply` 方法调用函数，可以改变函数的上下文。

### 箭头函数

箭头函数没有自己的 `this`，它继承自外围作用域（即定义时所在的作用域）的 `this`。这与传统的函数（函数表达式或函数声明）不同，它们的 `this` 值会在运行时动态确定。

- 不适用于构造函数：箭头函数不能被用作构造函数，不能使用 `new` 关键字调用。
- 没有 `arguments` 对象：箭头函数没有自己的 `arguments` 对象，它继承自外围作用域的 `arguments`。
- 不能用作 generator 函数：箭头函数不能使用 `yield` 关键字创建迭代器。
- 没有 `this`、`arguments`、`super` 和 `new.target` 绑定。
- 不能通过 `call()`、`apply()`、`bind()` 方法修改 `this`。
- 没有原型 prototype 属性。

### 函数声明和函数表达式

`函数声明`是一种定义函数的方式，使用 `function` 关键字后跟函数名。函数声明提升至作用域的顶部，因此可以在声明之前调用函数。

```js
function greet() {
  console.log('Hello, World!');
}

greet(); // 调用函数
```

`函数表达式`是将函数赋值给变量的一种方式，函数表达式的函数名是可选的。这种方式的函数通常是匿名函数，但也可以有名字。

函数表达式的变量不会提升，只有在赋值语句执行时才会创建。

```js
// 匿名函数表达式
const greet = function() {
  console.log('Hello, World!');
};

// 有名字的函数表达式
const sayHello = function greet() {
  console.log('Hello, World!');
};
```

**函数声明 vs 函数表达式：**

- **提升（Hoisting）：** 函数声明会被提升到当前作用域的顶部，可以在声明之前调用。而函数表达式只有在赋值语句执行时才会创建，不会提升。
- **调用时间：** 函数声明可以在定义之前和之后调用，而函数表达式只能在定义之后调用。
- **命名：** 函数声明必须有名称，而函数表达式可以是匿名的，也可以有名字。
- **赋值给变量：** 函数声明不能被赋值给变量，而函数表达式通常是赋值给变量的。

在函数表达式中，可以为函数指定一个名字，这被称为命名函数表达式。命名函数表达式的主要用途是在函数内部引用自身，方便递归调用。

```js
const factorial = function self(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * self(n - 1);
  }
};

console.log(factorial(5)); // 输出: 120
```

IIFE 是一种立即调用的匿名函数表达式，通常用于创建私有作用域，防止变量污染全局作用域。

```js
(function() {
  // 这里是一个私有作用域
  const localVar = 'IIFE Example';
  console.log(localVar);
})();
// localVar 在此处不可访问
```

### `call`、`apply` 和 `bind`

`call`、`apply` 和 `bind` 都是 JavaScript 中用于改变函数执行上下文（`this` 值）的方法，它们在用法和效果上有一些区别。

```js
function greet(name) {
  console.log(`Hello, ${name}! My age is ${this.age}.`);
}

const person = { age: 25 };

greet.call(person, 'John');
// 输出: Hello, John! My age is 25.
```

`apply` 方法与 `call` 类似，也是在函数执行时立即调用。区别在于它接收一个数组或类数组对象作为参数，其中数组的每个元素都会作为参数传递给函数。

```js
function greet(name, city) {
  console.log(`Hello, ${name}! I live in ${city}. My age is ${this.age}.`);
}

const person = { age: 25 };

greet.apply(person, ['John', 'New York']);
// 输出: Hello, John! I live in New York. My age is 25.
```

`bind` 方法也是用于改变函数执行上下文，但它不会立即调用函数，而是返回一个新的函数。新函数在调用时将具有绑定的 `this` 值和可选的参数。

```js
function greet(name) {
  console.log(`Hello, ${name}! My age is ${this.age}.`);
}

const person = { age: 25 };
const boundGreet = greet.bind(person, 'John');

boundGreet();
// 输出: Hello, John! My age is 25.
```

### 尾调用优化

尾调用优化（Tail Call Optimization，TCO）是一种`编译器优化技术，用于优化尾递归函数的性能`。

尾调用是指`函数的最后一个操作是调用另一个函数`。

尾调用优化的`目标是减少调用栈的大小`，提高程序的性能和内存利用率。

```js
// 尾递归函数，计算阶乘
function factorial(n, result = 1) {
  if (n <= 1) {
    return result;
  }
  return factorial(n - 1, n * result);
}

console.log(factorial(5)); // 输出: 120
```

ES6 尾调用优化的关键：`如果函数的逻辑允许基于尾调用将其销毁，则引擎就会那么做。`

**尾调用优化的条件：**

尾调用优化的条件就是`确定外部栈帧真的没有必要存在了`：
- 代码在严格模式下执行。
- 外部函数的返回值是对尾调用函数的调用。
- 尾调用函数返回后不需要执行额外的逻辑。
- 尾调用函数不是引用外部函数作用域中自由变量的闭包。

```js
"use strict"

// 基础框架
function fib(n){
    return fibImp1(0, 1, n)
}

// 执行递归
function fibImp1(a, b, n){
    if(n===0){
        return a
    }
    return fibImp1(b, a+b, n-1)
}
```

### 闭包

闭包指的是那些`引用了另一个函数作用域中变量的函数，通常是在嵌套函数中实现的`。

```js
function outerFunction() {
  let outerVariable = 'I am from outer function';

  function innerFunction() {
    console.log(outerVariable);
  }

  return innerFunction;
}

const closure = outerFunction();
closure(); // 输出: I am from outer function
```

- **访问外部变量：** 闭包可以访问包含它的外部函数的变量，即使外部函数已经执行完毕。
- **保持状态：** 由于闭包内部可以访问外部变量，可以用闭包来保持一些状态信息，形成类似私有变量的效果。
- **数据隐藏和封装：** 通过闭包可以创建私有变量，实现数据的隐藏和封装。
- **实现模块化：** 使用闭包可以创建模块，将相关的功能和变量封装在一起。
- **异步编程：** 在回调函数和事件处理函数中经常使用闭包，以便访问外部的变量。
- **内存管理：** 闭包可能导致内存泄漏，因为它会保持对外部变量的引用，使得这些变量不能被垃圾回收。
- **性能：** 过度使用闭包可能导致性能问题，因为每个闭包都会创建一个新的作用域链。

### this 对象

如果要判断一个运行中函数的 this 绑定，就需要找到这个函数的直接调用位置。找到之后就可以按照顺序应用下边的规则来判断 this 的绑定对象。

1. `箭头函数`会继承外层函数调用的 this 绑定。
2. 由 `new` 调用？绑定到新创建的对象。
3. 由 `call 或 apply 或 bind` 调用？绑定到指定的对象。
4. 由`上下文对象`调用？绑定到那个上下文对象。
5. 默认：严格模式下帮点个到 `undefined`，否则绑定到`全局对象`。

## 第 11 章 期约与异步函数

ES6 新增期约。ES8 新增异步函数。ES 的异步编程特性有了长足的进步。

通过期约 Promise 和异步函数 async/await，不仅可以实现之前难以实现或不可能实现的任务，而且也能写出更清晰、简洁，并且容易理解、调试的代码。

### 期约

在 JavaScript 中，**期约（Promise）** 是一种用于处理异步操作的对象。期约提供了一种更结构化的方式来处理异步代码，避免了回调地狱（Callback Hell）的问题。

期约的主要功能是为异步代码提供了清晰的抽象。可以用期约表示`异步执行的代码块`，也可以用期约表示`异步计算的值`。

在需要`串行异步代码时`，期约的价值最为突出。

作为可塑性极强的一种结构，期约可以被`序列化、连锁使用、复合、扩展和重组`。

#### 期约基础

- 期约是一种用于处理异步操作的对象，具有三个状态：`pending`（等待中）、`fulfilled`（已成功）和`rejected`（已拒绝）。
- 通过`new Promise(executor)`构造函数创建期约，`executor`函数包含异步操作的代码，并接受`resolve`和`reject`两个参数。
- 使用`.then()`处理成功状态，`.catch()`处理拒绝状态，`.finally()`处理期约结束时的逻辑。

#### 期约链式调用

- `.then()`返回一个新的期约，可以通过链式调用`.then()`和`.catch()`形成期约链。
- 在链式调用中，每个`.then()`都可以返回一个值或期约，传递给下一个`.then()`。

#### .all() 和 .race() 和 .allSettled()

- `Promise.all(iterable)`用于处理多个期约，只有所有期约都成功才算成功，任何一个期约失败都将导致整体失败。
- `Promise.race(iterable)`在第一个期约完成时返回其结果，无论成功还是拒绝。
- `Promise.allSettled(iterable)`：静态方法，返回一个期约，等到所有期约都已解决或拒绝后才解决，结果是一个数组，每个元素都包含一个对象，表示对应的期约是解决还是拒绝。

#### .resolve() 和 .reject()

- `Promise.resolve(value)`创建一个已解决的期约，将`value`作为期约的结果。
- `Promise.reject(reason)`创建一个已拒绝的期约，将`reason`作为期约的拒因。

#### 错误处理

- 使用`.catch()`或`try/catch`语句捕获期约的拒绝。
- 可以通过在`.then()`链中使用第二个参数处理错误。

#### 手写 Promise

```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function myPromise(fn) {
  const self = this

  this.state = PENDING
  this.value = null
  this.resolvedCallbacks = []
  this.rejectedCallbacks = []

  function resolve(value) {
    if(value instanceof myPromise) {
      return value.then(resolve, reject)
    }

    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = RESOLVED
        self.value = value
        self.resolvedCallbacks.forEach((callback) => {
          callback(value)
        })
      }
    }, 0)
  }

  function reject(value){
    setTimeout(()=> {
      if (self.state === PENDING) {
        self.state = REJECTED
        self.value = value
        self.rejectedCallbacks.forEach((callback) => {
          callback(value)
        })
      }
    }, 0)
  }

  try{
    fn(resolve, reject)
  }catch(err){
    reject(err)
  }
}

myPromise.prototype.then = (onResolve, onReject) => {
  onResolve = typeof onResolve === 'function' ? onResolve : function(value) { return value }

  onReject = typeof onReject === 'function' ? onReject : function(error) { throw new Error('错误') }

  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onResolve)
    this.rejectedCallbacks.push(onReject)
  }

  if (this.state === RESOLVED) {
    onResolve(this.value)
  }
  if(this.state === REJECTED) {
    onReject(this.value)
  }
}
```

#### 手写Promise.then

```js
function then(onResolve, onReject) {
  const self = this

  return new Promise((resolve, reject) => {
    let fulfilled = () => {
      try{
        const res = onResolve(self.value)
        return res instanceof myPromise ? res.then(resolve, reject) : resolve(res)
      }catch(err){
        reject(err)
      }
    }

    let rejected = () => {
      try{
        const res = onReject(self.reason)
        return res instanceof myPromise ? res.then(resolve, reject) : reject(res)
      }catch(err){
        reject(err)
      }
    }

    switch(self.status){
      case PENDING:
        self.resolvedCallbacks.push(fulfilled)
        self.rejectedCallbacks.push(rejected)
        break;
      case RESOLVED:
        fulfilled()
        break;
      case REJECT:
        rejected()
        break;
    }
  })
}
```

#### 手写Promise.all

```js
function promiseAll(promises){
  if(!Array.isArray(promises)){
    throw new Error('must be an array')
  }
  return new Promise((resolve, reject) => {
    const count = promises.length
    let num = 0
    const res = []

    for(let i=0; i<count; i++){
      Promise.resolve(promises[i]).then((value)=>{
        num++
        res[i] = value
        if(res.length === count){
          resolve(res)
        }
      }).catch(error => {
        reject(error);
      });
    }
  })
}
```

#### 手写Promise.race

```js
function promiseRace(promises){
  if(!Array.isArray(promises)){
    throw new Error('must be an array')
  }
  return new Promise((resolve, reject)=>{
    for(let i=0; i<promises.length; i++){
      promises[i].then(value => {
          resolve(value);
        })
        .catch(error => {
          reject(error);
        });
    }
  })
}
```

#### 手写Promise.any

```js
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError('promises must be an array'));
    }

    const errors = [];

    promises.forEach(promise => {
      Promise.resolve(promise)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          errors.push(error);
          if (errors.length === promises.length) {
            reject(new AggregateError('All promises were rejected', errors));
          }
        });
    });
  });
}
```

#### 手写Promise.allSettled

```js
function promiseAllSettled(promises) {
  return new Promise(resolve => {
    if (!Array.isArray(promises)) {
      reject(new TypeError('promises must be an array'));
    }

    const results = [];
    let completedPromises = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(result => {
          results[index] = { status: 'fulfilled', value: result };
        })
        .catch(reason => {
          results[index] = { status: 'rejected', reason: reason };
        })
        .finally(() => {
          completedPromises++;
          if (completedPromises === promises.length) {
            resolve(results);
          }
        });
    });
  });
}
```

#### 手写Promise.finally

```js
Promise.prototype.finally = (cb) => {
  return this.then(
    value => Promise.resolve(cb()).then(()=>value),
    err => Promise.reject(cb()).then(()=> throw new Error(err))
  )
}
```

### 异步函数

异步函数通常是指使用`async/await`语法糖来处理异步操作的函数。

异步函数可`暂停执行，而不阻塞主线程`。

#### async 函数

- `async` 关键字用于定义一个异步函数。异步函数返回一个期约（Promise）。
-  异步函数内部可以包含`await`表达式，它会暂停函数执行，等待期约解决，并返回期约的结果。

#### await 表达式

- `await` 表达式只能在异步函数内部使用，用于等待期约的解决。
- `await`后面可以是一个期约对象，也可以是返回期约的函数调用或任何返回值为期约的表达式。

#### 错误处理

- 使用 `try/catch` 语句来捕获异步函数内的错误。
- 如果期约被拒绝，将会抛出一个异常，可以通过`catch`捕获。

```js
async function example() {
  try {
    const result = await someAsyncFunction();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

#### 多个异步操作的串行执行

- 使用 `await` 可以实现多个异步操作的串行执行，确保一个操作完成后再执行下一个。

```js
async function serialAsyncOperations() {
  const result1 = await operation1();
  const result2 = await operation2(result1);
  const result3 = await operation3(result2);
  return result3;
}
```

## 第 12 章 BOM

### window 对象

BOM 的核心是 window 对象。

- `window` 对象是浏览器环境中的全局对象，它包含了全局作用域中定义的所有变量和函数。
- 在浏览器中，`window` 对象也是 `global` 对象的引用。
- `window` 对象提供了访问和操作浏览器窗口的接口，称为 BOM。
- BOM 提供了一系列属性和方法，例如 `window.location`、`window.navigator`、`window.document` 等，用于操作浏览器的窗口、导航和文档。
- 在浏览器中，全局作用域中声明的变量和函数都会成为 `window` 对象的属性和方法。
- 全局变量可以通过 `window` 对象直接访问，例如 `window.myVariable`。
- `window` 对象提供了一些用于弹窗和对话框的方法，如 `alert()`、`confirm()`、`prompt()` 等。
- `window` 对象提供了定时器函数，如 `setTimeout()` 和 `setInterval()`，用于在一定时间后执行函数或定时重复执行函数。
- `window` 对象还提供了其他一些功能，如打开新窗口或标签页的 `window.open()` 方法，关闭当前窗口的 `window.close()` 方法等。

#### 窗口关系

- `顶层窗口`是窗口层次结构中的最顶层窗口，不包含在任何其他窗口中。可以通过 `window.top` 属性来引用顶层窗口。
- 当一个窗口包含另一个窗口时，被包含的窗口被认为是`父窗口`。可以通过 `window.parent` 属性来引用包含它的窗口。
- `window.self` 属性指向`当前窗口`自身。这通常用于与 `window` 对象进行比较，以确定代码是否在期望的窗口中执行。

#### 窗口位置

```js
window.screenLeft // 窗口相对于屏幕左侧的位置
window.screenTop // 窗口相对于屏幕顶部的位置

window.moveTo(x, y) // 将窗口移动到指定位置
window.moveBy(x, y) // 按指定的像素调整窗口大小
```

#### 像素比

像素比（Pixel Ratio）是一个用于处理高分辨率屏幕的概念，通常表示一个逻辑像素（在CSS中使用的像素）对应于多少个物理像素。这个比率可以帮助开发者在高分辨率屏幕上提供更清晰的图像和文本。

在 Web 开发中，像素比主要通过 `window.devicePixelRatio` 属性来获取。这个属性返回一个数字，表示一个逻辑像素对应的物理像素的比率。通常，这个值为 1，表示一对一的映射。在高分辨率屏幕（例如 Retina 屏幕）上，这个值可能大于 1。

```css
img {
  width: 100px;
  height: 100px;
}

@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  img {
    width: 200px;
    height: 200px;
  }
}
```

#### 窗口大小

在浏览器环境中，可以使用 `window.innerWidth` 和 `window.innerHeight` 属性来获取浏览器窗口的内部宽度和高度，即视口的宽度和高度（不包括浏览器工具栏和滚动条）。

```js
window.innerWidth;  // 浏览器窗口中页面视口的宽度（不包含边框和工具栏）
window.innerHeight; // 浏览器窗口中页面视口的高度（不包含边框和工具栏）

window.outerWidth // 浏览器窗口自身的宽度
window.outerHeight // 浏览器窗口自身的高度

document.documentElement.clientWidth // 页面视口的宽度
document.documentElement.clientHeight // 页面视口的高度
```

浏览器窗口自身的精确尺寸不好确定，但可以确定页面视口的大小：

```js
let pageWidth = window.innerWidth
let pageHeight = window.innerHeight

if(typeof pageWidth != 'number'){
    // 检查页面是否是标准模式
    if(document.compatMode == 'CSS1Compat'){
        pageWidth = document.documentElement.clientWidth
        pageHeight = document.documentElement.clientHeight
    }else{
        pageWidth = document.body.clientWidth
        pageHeight = document.body.clientHeight
    }
}
```

```js
window.resizeTo() // 接收新的宽度和高度值
window.resizeBy() // 接收宽度和高度各要缩放多少

window.resizeTo(100, 100) // 缩放到 100 * 100

window.resizeBy(100， 50) // 缩放到 200 * 50

window.resizeTo(300, 300) // 缩放到 300 * 300
```

#### 视口位置

```js
window.pageXoffset/window.scrollX
window.pageYoffset/window.scrollY

// 相当于当前视口向下滚动 100 像素
window.scrollBy(0, 100)
// 相当于当前视口向右滚动 40 像素
window.scrollBy(40, 0)

// 滚动到页面左上角
window.scrollTo(0, 0)

window.scroll()

// 将窗口滚动到左侧偏移量为 200，顶部偏移量为 300 的位置
window.scrollTo({
  top: 300,
  left: 200,
  behavior: 'smooth' // 可选，表示滚动的行为，可以是 'auto'、'smooth' 等
});
```

#### 导航与打开新窗口

`window.open()`方法可以用于导航到指定 URL，也可以用于打开新浏览器窗口。

`window.open()` 方法可以接受四个参数：

1. **URL（字符串）** ：要加载的 URL 地址。可以是绝对或相对路径，也可以是其他网址。
2. **目标窗口（字符串）** ：新窗口的名称，如果已经存在具有相同名称的窗口，则会在该窗口中加载新的URL。
3. **窗口特性（字符串）** ：包含各种特性的字符串，如窗口的大小、位置、菜单栏、工具栏等。这是一个可选参数。
4. **是否替换（布尔值）** ：如果设置为 true，新打开的窗口将替换浏览器历史记录中的当前页面。如果设置为 false（默认值），则在浏览器历史中添加一个新的条目。

```js
// 打开一个新窗口，指定窗口的大小和位置
let wroxWin = window.open('https://www.example.com', '_blank', 'width=600,height=400,top=100,left=100,fullscreen=yes');

wroxWin.resizeTo(500, 500) // 缩放
wroxWin.moveTo(100, 100) // 移动

// 只能用于 window.open() 创建的弹出窗口
wroxWin.close()

// 新创建窗口的 window 对象有一个属性 opener，指向打开它的窗口。
wroxWin.opener === window // true

// 表示新打开的标签页不需要与打开它的标签页通信。可以运行在独立的进程中。
// 这个连接一旦切断，就无法恢复了
wroxWin.opener = null
```

**安全方面：** 在网页加载过程中调用 `window.open()` 没有效果，而且还可能导致向用户显示错误。弹窗通常可能在鼠标点击或按下键盘中某个键的情况下才能打开。

```js
// 判断调用 window.open() 的弹窗是否被屏蔽了
let blocked = false

try{
    let wroxWin = window.open('http://www.wrox.com', '_blank')
    if(wroxWin == null){
        blocked = true
    }
}catch(err){
    blocked = true
}
if(blocked){
    alert('The popup was blocked')
}
```

#### 定时器

```js
// 设置超时任务
let timeoutId = setTimeout(()=> alert('hello world'), 1000)

// 取消超时任务
clearTimeout(timeoutId)

// 定时任务，会有误差，谨慎使用
let intervalId = setInterval(()=> alert('hello world'), 1000)
clearInterval(intervalId)
```

#### 系统对话框

系统对话框的外观由操作系统或者浏览器决定，无法使用 css 设置。

**警告框（Alert）：** 显示一条消息和一个确定按钮。常用于向用户显示一些信息或警告。

```js
alert('This is an alert message!');
```

**确认框（Confirm）：** 显示一条消息、一个确定按钮和一个取消按钮。用于获取用户的确认或取消选择。

```js
const result = confirm('Do you want to proceed?');
if (result) {
  // 用户点击了确定按钮
  console.log('User clicked OK.');
} else {
  // 用户点击了取消按钮
  console.log('User clicked Cancel.');
}
```

**提示框（Prompt）：** 显示一条消息、一个文本输入框、确定按钮和取消按钮。用于获取用户输入的文本。

```js
const userInput = prompt('Please enter your name:', 'John Doe');
if (userInput !== null) {
  // 用户点击了确定按钮，并输入了文本
  console.log('User entered: ' + userInput);
} else {
  // 用户点击了取消按钮或直接关闭了对话框
  console.log('User canceled the prompt.');
}
```

**打印框：** `print()` 是 JavaScript 中用于触发浏览器打印操作的方法。当调用 `print()` 方法时，浏览器会弹出打印对话框，允许用户选择打印设置并执行打印操作。

```js
// 触发打印操作
window.print();
```

### location 对象

```js
location.href // 完整的 URL 地址
location.protocol // URL 协议部分（例如 "http:"）
location.host // 主机名和端口号（如果有）
location.hostname // 主机名
location.port // 端口号
location.pathname // URL 路径部分和文件名
location.search // URL 查询字符串部分（从问号开始的部分）
location.hash // URL 锚点部分（从井号开始的部分）
```

#### 查询字符串

**`URLSearchParams`** 接口定义了一些实用的方法来处理 URL 的查询字符串。 

```js
var paramsString = "q=URLUtils.searchParams&topic=api";
var searchParams = new URLSearchParams(paramsString);

for (let p of searchParams) {
  console.log(p);
}

searchParams.has("topic") === true; // true
searchParams.get("topic") === "api"; // true
searchParams.getAll("topic"); // ["api"]
searchParams.get("foo") === null; // true
searchParams.append("topic", "webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
searchParams.set("topic", "More webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
searchParams.delete("topic");
searchParams.toString(); // "q=URLUtils.searchParams"
```

#### 操作地址

```js
location.assign("https://www.mozilla.org"); // 或
location = "https://www.mozilla.org"; // 或
location.href = "https://www.mozilla.org";
```

使用 `window.location.replace()` 方法可以替换当前页面的 URL，并在浏览历史中不留下记录：

```js
// 替换当前页面的 URL
window.location.replace('https://www.example.com/new-url');
```

```js
location.reload(); // 重新加载，可能从缓存加载
location.reload(true); // 重新加载，从服务器加载
```

### navigator 对象

`Navigator` 接口表示用户代理的状态和标识。它允许脚本查询它和注册自己进行一些活动。

#### 检测插件

检测浏览器是否安装了某个插件是开发中常见的需求。检测插件就是遍历浏览器中可用的插件，并逐个比较插件的名称。

```js
// IE10 及更低版本无效
let hasPlugin = function(name){
    name = name.toLowerCase()
    for(let plugin of window.navigator.plugins){
        if(plugin.name.toLowerCase().indexOf(name)>-1){
            return true
        }
    }
    
    return false
}

// 检测 flash
hasPlugin('Flash')
```

#### 注册处理程序

**[`Navigator`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator)** 的方法 **`registerProtocolHandler()`**  让 web 站点为自身注册用于打开或处理特定 URL 方案（又名协议）的能力。

这通常用于与外部应用程序或协议进行集成，例如电子邮件客户端、在线日历等。举个例子，此 API 允许 Web 邮件站点打开 `mailto:` URL，或让 VoIP 站点打开 `tel:` URL。

```js
// 处理的协议（如'mailto'、'ftp'）
// 处理该协议的 url
// 应用名称
navigator.registerProtocolHandler(scheme, url, title);
```

### screen 对象

`screen` 对象是浏览器环境中的一个全局对象，表示用户的屏幕。它包含了一些属性，提供了关于用户屏幕的信息，例如屏幕的宽度、高度、像素深度等。

```js
screen.width; // 屏幕的宽度（以像素为单位）
screen.height; // 屏幕的高度（以像素为单位）
screen.availWidth; // 屏幕的可用宽度，即去除任务栏或其他用户界面元素占用的宽度后的宽度
screen.availHeight; // 屏幕的可用高度，即去除任务栏或其他用户界面元素占用的高度后的高度
screen.colorDepth; // 屏幕的颜色深度，即每个像素的位数
screen.pixelDepth; // 屏幕的颜色深度
```

### history 对象

**`History`** 接口允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录。

```js
history.back();

history.forward();

// 向前导航两步
history.go(2);

// 向后导航一步
history.go(-1);


const stateData = { page: 1 };
const pageTitle = 'New Page Title';
const newURL = '/new-url';

// 向浏览器会话历史中添加一个新的状态
history.pushState(stateData, pageTitle, newURL);


const newStateData = { page: 2 };
const newTitle = 'Updated Page Title';
const updatedURL = '/updated-url';

// 用新的状态替换当前的历史记录条目
history.replaceState(newStateData, newTitle, updatedURL);

history.length; // 当前会话历史中的历史记录条目数
```

## 第 13 章 客户端检测

> 本章节感觉需要做个了解即可，在开发中知道这个流程就可以了，具体操作可以查资料操作。

客户端检测是 JS 中争议最多的话题。因为不同浏览器之间存在差异，所以`经常需要根据浏览器的能力来编写不同的代码`。优先选择`能力检测`。

### 能力检测

`在使用之前先测试浏览器的能力`。

脚本可以在调用某个函数之前先检查它是否存在。

这样的方式开发者不用考虑特定的浏览器或者版本，而只需要关注某些能力是否存在。

### 用户代理检测

`通过用户代理字符串确定浏览器`。

用户代理字符串包含关于浏览器很多信息，浏览器、平台、操作系统、版本、渲染引擎等。

### 软件与硬件检测

`浏览器提供了一些软件和硬件的信息`。

通过 screen 和 navigator 暴露出来。利用这些 API，可以获取操作系统、浏览器、硬件、设备位置、电池状态等信息。

## 第 14 章 DOM

### 节点层级

#### Node 类型

在DOM中，`Node` 是一个表示文档中的节点的基本接口，它是所有节点类型的基类。`Node` 接口定义了一些通用的属性和方法，这些属性和方法被所有节点类型所继承。

1. **`Node.nodeName`：** 返回节点的名称。

2. **`Node.nodeType`：** 返回节点的类型，以数字表示。

    -   `1` 表示元素节点
    -   `2` 表示属性节点
    -   `3` 表示文本节点
    -   `8` 表示注释节点
    -   等等...

3. **`Node.nodeValue`：** 返回或设置节点的值，具体的含义和用法取决于节点的类型。

4. **`Node.parentNode`：** 返回节点的父节点。

5. **`Node.childNodes`：** 返回一个包含节点所有子节点的 NodeList。

6. **`Node.firstChild`：** 返回节点的第一个子节点。

7. **`Node.lastChild`：** 返回节点的最后一个子节点。

8. **`Node.previousSibling`：** 返回节点的前一个同级节点。

9. **`Node.nextSibling`：** 返回节点的后一个同级节点。

```js
// 添加元素节点到父元素
const parentElement = document.getElementById('parentElementId');
parentElement.appendChild(newElement);

// 在父元素的特定位置插入元素节点
const referenceElement = document.getElementById('referenceElementId');
parentElement.insertBefore(newElement, referenceElement);

// 替换节点
const parentElement = document.getElementById('parentElementId');
const oldChild = document.getElementById('oldChildId');
const newChild = document.createElement('div');

parentElement.replaceChild(newChild, oldChild);

// 删除节点
const elementToRemove = document.getElementById('elementToRemove');
elementToRemove.parentNode.removeChild(elementToRemove);

// 复制节点
const originalElement = document.getElementById('originalElementId');
const clonedElement = originalElement.cloneNode(true);
```

#### Document 类型

Document 类型是 JS 中表示**文档节点的类型**。

在浏览器中，document 是 HTMLDocument 的实例，表示整个 HTML 页面。

**Document 类型的节点有以下特征：**
- `nodeType` 等于 9
- `nodeName` 值为 '#document'
- `nodeValue` 值为 null
- `parentNode` 值为 null
- `ownerDocument` 值为 null
- `子节点`可以是 DocumentType(最多一个)、Element（最多一个）、ProcessingInstruction 或 Comment 类型。

document 对象可用于`获取关于页面的信息以及操纵其外观和底层结构`。

```js
document.documentElement // 取得对<html>的引用
document.childNodes[0] // 取得对<html>的引用
document.firstChild // 取得对<html>的引用

document.body // 取的对<body>的引用
document.doctype // 取的对<!doctype>的引用
```

所有主流浏览器都支持 document.documentElement、document.body。

**文档信息：**
```JS
document.title // 文档标题，可设置
document.URL // 完整 URL
document.domain // 域名，可设置（限制）
document.referrer // 来源
```

**可以通过设置合法的 document.domain 让两个页面之间通信。**

**定位元素：**
```js
document.getElementById()
document.getElementsByTagName()
document.getElementsByName()
```

#### Element 类型

Element 表示 XML 或 HTML 元素，对外暴露出访问元素标签名，子节点和属性的能力。

**Element 类型的节点具有以下特征：**
- `nodeType` 等于 1
- `nodeName` 值为元素的标签名
- `nodeValue` 值为 null
- `parentNode` 值为 Document 或 Element 对象
- `子节点`可以是 Element、Text、Comment、ProcessingInstruction、CDATASection、EntityReference 类型。

**操作属性：**
```js
// 获取元素属性值
var linkUrl = document.getElementById("myLink")

linkUrl.getAttribute("href");

// 设置元素属性值
linkUrl.setAttribute("href", "https://www.newexample.com");

// 移除元素属性
linkUrl.removeAttribute("attributeName");
```

**attributes:**

**Element 类型是唯一使用 attributes 属性的 DOM 节点类型。**

```js
var element = document.getElementById("myElement");
var allAttributes = element.attributes;

// 遍历所有属性
for (var i = 0; i < allAttributes.length; i++) {
    console.log(allAttributes[i].name + ": " + allAttributes[i].value);
}
```

#### Text 类型

Text 类型包含按字面解释的纯文本，也可能包含转义后的 HTML 字符，但不含 HTML 代码。

**Text 类型特征：**
- `nodeType` 等于 3
- `nodeName` 值为 '#text'
- `nodeValue` 值为节点中包含的文本
- `parentNode` 值为 Element 对象
- `不支持子节点`

#### Comment 类型

DOM 中的注释通过 Comment 类型表示。

**Comment 类型的特征：**
- `nodeType` 等于 8
- `nodeName` 值为 '#comment'
- `nodeValue` 值为注释的内容
- `parentNode` 值为 Document 或 Element 对象
- `不支持子节点`

#### DocumentType 类型

DocumentType 类型的节点包含文档的文档类型信息。

**DocumentType 特征：**
- `nodeType` 等于 10
- `nodeName` 值为 文档类型的名称
- `nodeValue` 值为 null
- `parentNode` 值为 Document 对象
- `不支持子节点`

#### DocumentFragment 类型

DocumentFragment 类型是唯一一个在标记中没有对应表示的类型。

**DocumentFragment 特征：**
- `nodeType` 等于 11
- `nodeName` 值为 '#document-fragment'
- `nodeValue` 值为 null
- `parentNode` 值为 null
- 子节点可以是 Element、Text、Comment、ProcessingInstruction、CDATASection、EntityReference 类型。

### DOM 编程

#### 动态脚本

```js
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // 处理脚本加载完成的事件
    script.onload = function () {
        console.log('Script loaded: ' + url);

        // 执行回调函数（可选）
        if (typeof callback === 'function') {
            callback();
        }
    };

    // 将脚本添加到文档头部
    document.head.appendChild(script);
}

// 使用示例
loadScript('path/to/your/script.js', function() {
    // 在脚本加载完成后执行的操作
    console.log('Callback function executed.');
});
```

### MutationObserver 接口

`MutationObserver` 是 JavaScript 中的一个接口，它提供了一种异步观察DOM（文档对象模型）树变化的能力。使用 `MutationObserver` 可以监测对DOM的更改，例如元素的添加、删除、属性的修改等。

#### 基本用法

```JS
function observeChanges(targetNode, config, callback) {
  var observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
  return observer;
}

function stopObserving(observer) {
  observer.disconnect();
}

// 示例1
var targetNode1 = document.getElementById('element1');
var config1 = { attributes: true, childList: true, subtree: true };
var observer1 = observeChanges(targetNode1, config1, myCallback1);

// 示例2
var targetNode2 = document.getElementById('element2');
var config2 = { attributes: true };
var observer2 = observeChanges(targetNode2, config2, myCallback2);

// 停止观察
stopObserving(observer1);
stopObserving(observer2);
```

```js
let observer = new MutationObserver(() => console.log('<body> attributes 
changed')); 

observer.observe(document.body, { attributes: true }); 

// 这行代码会触发变化事件
document.body.setAttribute('foo', 'bar'); 

setTimeout(() => { 
 observer.disconnect(); 
 // 这行代码不会触发变化事件
 document.body.setAttribute('bar', 'baz'); 
}, 0); 

setTimeout(() => { 
 // Reattach 
 observer.observe(document.body, { attributes: true }); 
 // 这行代码会触发变化事件
 document.body.setAttribute('baz', 'qux'); 
}, 0); 

// <body> attributes changed 
// <body> attributes changed 
```

## 第 17 章 事件

### 事件流

`事件流`描述了页面接收事件的顺序。结果非常有意思，IE 和 Netscape 开发团队提出了几乎完全相反的事件流方案。`IE 将支持事件冒泡流，而 Netscape Communicator 将支持事件捕获流`。

IE 事件流被称为`事件冒泡`，这是因为事件被定义为从最具体的元素（文档树中最深的节点）开始触发，然后向上传播至没有那么具体的元素（文档）。

所有现代浏览器都支持事件冒泡，只是在实现方式上会有一些变化。现代浏览器中的事件会一直冒泡到 window 对象。

`事件捕获`的意思是最不具体的节点应该最先收到事件，而最具体的节点应该最后收到事件。事件捕获实际上是为了在事件到达最终目标前拦截事件。

`事件捕获`得到了所有现代浏览器的支持。实际上，所有浏览器都是从 window 对象开始捕获事件，而 DOM2 Events规范规定的是从 document 开始。

DOM2 Events 规范规定事件流分为 3 个阶段：`事件捕获、到达目标和事件冒泡`。事件捕获最先发生，为提前拦截事件提供了可能。然后，实际的目标元素接收到事件。最后一个阶段是冒泡，最迟要在这个阶段响应事件。

### 事件处理程序

为响应事件而调用的函数被称为`事件处理程序`（或事件监听器）。事件处理程序的名字以"on"开头，因此 click 事件的处理程序叫作 onclick，而 load 事件的处理程序叫作 onload。有很多方式可以指定事件处理程序。

```js
let btn = document.getElementById("myBtn"); 
btn.onclick = function() { 
 console.log(this.id); // "myBtn" 
};
// 在事件处理程序里通过 this 可以访问元素的任何属性和方法。

btn.onclick = null; // 移除事件处理程序
```

```js
// 事件名、事件处理函数和一个布尔值，
// true 表示在捕获阶段调用事件处理程序，
// false（默认值）表示在冒泡阶段调用事件处理程序。
let btn = document.getElementById("myBtn"); 
let handler = function() { 
    console.log(this.id); 
}; 
btn.addEventListener("click", handler, false); 
// 其他代码
btn.removeEventListener("click", handler, false); // 有效果！
```

### 事件对象

在 DOM 中发生事件时，所有相关信息都会被收集并存储在一个名为 `event 的对象中`。这个对象包
含了一些基本信息，比如导致事件的元素、发生的事件类型，以及可能与特定事件相关的任何其他数据。
`所有浏览器都支持这个 event 对象`，尽管支持方式不同。

```js
// preventDefault()方法用于阻止特定事件的默认动作。
// 比如，链接的默认行为就是在被单击时导航到 href 属性指定的 URL。
// 如果想阻止这个导航行为，可以在 onclick 事件处理程序中取消

let link = document.getElementById("myLink"); 
link.onclick = function(event) { 
 event.preventDefault(); 
}; 
```

```js
// stopPropagation()方法用于立即阻止事件流在 DOM 结构中传播，取消后续的事件捕获或冒泡。
// 例如，直接添加到按钮的事件处理程序中调用 stopPropagation()，
// 可以阻止 document.body 上注册的事件处理程序执行。
let btn = document.getElementById("myBtn"); 
btn.onclick = function(event) { 
 console.log("Clicked"); 
 event.stopPropagation(); 
}; 
document.body.onclick = function(event) { 
 console.log("Body clicked"); 
}; 
```

```js
// eventPhase 属性可用于确定事件流当前所处的阶段。
// 如果在捕获阶段被调用，则eventPhase 等于 1；
// 如果在目标上被调用，则 eventPhase 等于 2；
// 如果在冒泡阶段被调用，则 eventPhase 等于 3。
let btn = document.getElementById("myBtn"); 
btn.onclick = function(event) { 
 console.log(event.eventPhase); // 2 
}; 

document.body.addEventListener("click", (event) => { 
 console.log(event.eventPhase); // 1 
}, true); 

document.body.onclick = (event) => { 
 console.log(event.eventPhase); // 3 
}; 
```

### 事件类型

**DOM3 Events 定义了如下事件类型：**
- `用户界面事件`（UIEvent）：涉及与 BOM 交互的通用浏览器事件。
- `焦点事件`（FocusEvent）：在元素获得和失去焦点时触发。
- `鼠标事件`（MouseEvent）：使用鼠标在页面上执行某些操作时触发。
- `滚轮事件`（WheelEvent）：使用鼠标滚轮（或类似设备）时触发。
- `输入事件`（InputEvent）：向文档中输入文本时触发。
- `键盘事件`（KeyboardEvent）：使用键盘在页面上执行某些操作时触发。
- `合成事件`（CompositionEvent）：在使用某种 IME（Input Method Editor，输入法编辑器）输入
字符时触发。

#### 用户界面事件

- `load`：在 window 上当页面加载完成后触发，在窗套（`<frameset>`）上当所有窗格（`<frame>`）都加载完成后触发，在`<img>`元素上当图片加载完成后触发，在`<object>`元素上当相应对象加载完成后触发。
- `unload`：在 window 上当页面完全卸载后触发，在窗套上当所有窗格都卸载完成后触发，在
`<object>`元素上当相应对象卸载完成后触发。
- `abort`：在`<object>`元素上当相应对象加载完成前被用户提前终止下载时触发。
- `error`：在 window 上当 JavaScript 报错时触发，在`<img>`元素上当无法加载指定图片时触发，在`<object>`元素上当无法加载相应对象时触发，在窗套上当一个或多个窗格无法完成加载时触发。
- `select`：在文本框（`<input>`或 `textarea`）上当用户选择了一个或多个字符时触发。
- `resize`：在 window 或窗格上当窗口或窗格被缩放时触发。
- `scroll`：当用户滚动包含滚动条的元素时在元素上触发。`<body>`元素包含已加载页面的滚动条。

#### 焦点事件

- `blur`：当元素失去焦点时触发。这个事件不冒泡，所有浏览器都支持。
- `focus`：当元素获得焦点时触发。这个事件不冒泡，所有浏览器都支持。
- `focusin`：当元素获得焦点时触发。这个事件是 focus 的冒泡版。
- `focusout`：当元素失去焦点时触发。这个事件是 blur 的通用版。

#### 鼠标和滚轮事件

- `click`：在用户单击鼠标主键（通常是左键）或按键盘回车键时触发。这主要是基于无障碍的考
虑，让键盘和鼠标都可以触发 onclick 事件处理程序。
- `dblclick`：在用户双击鼠标主键（通常是左键）时触发。
- `mousedown`：在用户按下任意鼠标键时触发。这个事件不能通过键盘触发。
- `mouseenter`：在用户把鼠标光标从元素外部移到元素内部时触发。这个事件不冒泡，也不会在
光标经过后代元素时触发。
- `mouseleave`：在用户把鼠标光标从元素内部移到元素外部时触发。这个事件不冒泡，也不会在
光标经过后代元素时触发。
- `mousemove`：在鼠标光标在元素上移动时反复触发。这个事件不能通过键盘触发。
- `mouseout`：在用户把鼠标光标从一个元素移到另一个元素上时触发。移到的元素可以是原始元
素的外部元素，也可以是原始元素的子元素。这个事件不能通过键盘触发。
- `mouseover`：在用户把鼠标光标从元素外部移到元素内部时触发。这个事件不能通过键盘触发。
- `mouseup`：在用户释放鼠标键时触发。这个事件不能通过键盘触发。

- 当鼠标滚轮`向前滚动`时，`wheelDelta` 每次都是`+120`；
- 而当鼠标滚轮`向后滚动`时，`wheelDelta` 每次都是`–120`

```js
document.addEventListener("mousewheel", (event) => { 
 console.log(event.wheelDelta); 
}); 
```

#### 键盘与输入事件

- `keydown`，用户按下键盘上某个键时触发，而且持续按住会重复触发。
- `keyup`，用户释放键盘上某个键时触发。

- **keyCode 和 key：** `keyCode` 属性返回一个表示按下键的键码，而 `key` 属性返回一个表示按下的是哪个键的字符串。注意，`keyCode` 属性已经逐渐被 `key` 属性替代，因为 `key` 提供了更多的信息。
- **shiftKey、ctrlKey、altKey、metaKey：** 这些属性表示是否同时按下了 Shift、Ctrl、Alt 和 Meta（Command）键。

```js
document.addEventListener('keydown', function(event) {
    console.log('Key pressed:', event.key);
    console.log('Key code:', event.keyCode);
    console.log('Shift key pressed:', event.shiftKey);
    console.log('Ctrl key pressed:', event.ctrlKey);
    console.log('Alt key pressed:', event.altKey);
});
```

```js
let textbox = document.getElementById("myText"); 
textbox.addEventListener("textInput", (event) => { 
    console.log(event.data); 
    console.log(event.inputMethod); 
}); 
```
**event.inputMethod值：**
- 0，表示浏览器不能确定是什么输入手段；
- 1，表示键盘；
- 2，表示粘贴；
- 3，表示拖放操作；
- 4，表示 IME；
- 5，表示表单选项；
- 6，表示手写（如使用手写笔）；
- 7，表示语音；
- 8，表示组合方式；
- 9，表示脚本。

#### 合成事件

```js
let textbox = document.getElementById("myText"); 
textbox.addEventListener("compositionstart", (event) => { 
    console.log(event.data); 
}); 
textbox.addEventListener("compositionupdate", (event) => { 
    console.log(event.data); 
}); 
textbox.addEventListener("compositionend", (event) => { 
    console.log(event.data); 
}); 
```

#### HTML5 事件

**contextmenu 事件**：是在用户右键点击页面元素时触发的事件。当用户右键点击页面的某个元素时，浏览器会触发 `contextmenu` 事件，通常会显示浏览器的上下文菜单（context menu）。开发者可以通过监听这个事件来执行特定的操作或者自定义右键菜单。

```js
window.addEventListener("load", (event) => { 
    let div = document.getElementById("myDiv"); 
    div.addEventListener("contextmenu", (event) => { 
        event.preventDefault(); 
        let menu = document.getElementById("myMenu"); 
        menu.style.left = event.clientX + "px"; 
        menu.style.top = event.clientY + "px"; 
        menu.style.visibility = "visible"; 
    }); 
    document.addEventListener("click", (event) => { 
        document.getElementById("myMenu").style.visibility = "hidden"; 
    }); 
}); 
```

**beforeunload 事件**：是在用户准备离开页面之前触发的事件。这个事件通常用于提示用户保存未保存的修改或执行其他清理操作，因为用户关闭页面时可能会丢失一些数据。

当用户关闭标签、关闭浏览器、输入新的 URL 或进行其他导致页面卸载的操作时，`beforeunload` 事件会被触发。在这个事件中，你可以显示一个确认消息，询问用户是否确定要离开页面。

```js
window.addEventListener("beforeunload", (event) => { 
    let message = "I'm really going to miss you if you go."; 
    event.returnValue = message; 
    return message; 
}); 
```

**DOMContentLoaded 事件**：是在 HTML 文档解析完成并且所有的 DOM 树构建完成后触发的事件。这一时刻是在浏览器加载页面的过程中相对较早的阶段。

`DOMContentLoaded` 不等待样式表、图像以及其他资源的加载完成，而是在 DOM 可以被操作和访问之时触发。

```js
document.addEventListener('DOMContentLoaded', function() {
    // 在DOM准备就绪后执行的代码
    console.log('DOMContentLoaded event fired');

    // 在这里可以执行需要在页面加载后立即进行的操作
});
```

**为什么使用 `DOMContentLoaded` 事件？**
1. **提早执行 JavaScript：** 使用 `DOMContentLoaded` 允许在页面的 DOM 结构完全构建之后立即执行 JavaScript 代码。这有助于避免在 DOM 不完全构建时尝试访问或修改 DOM 元素，从而提高代码的可靠性。
2. **不等待资源加载：** 相较于 `load` 事件，`DOMContentLoaded` 不需要等待页面上所有的资源（如图像、样式表）加载完成。这使得它更早触发，有助于提高页面加载性能。
3. **交互性能：** 在 `DOMContentLoaded` 时执行一些初始化脚本，可以提高页面的初始交互性能，因为用户不需要等待所有资源加载完成。

**readystatechange 事件：** 是在 `Document` 对象的 `readyState` 属性发生变化时触发的事件。`readyState` 表示文档加载的当前状态，而 `readystatechange` 事件则在这个状态发生变化时提供通知。

**`readyState` 属性的可能值：**
- uninitialized：对象存在并尚未初始化。
- loading：对象正在加载数据。
- loaded：对象已经加载完数据。
- interactive：对象可以交互，但尚未加载完成。
- complete：对象加载完成。

```js
 document.onreadystatechange = function() {
    console.log('Ready state changed:', document.readyState);

    if (document.readyState === 'complete') {
        // 在文档完全加载后执行的代码
        console.log('Document is fully loaded');
    }
};
```

**`pageshow` 和 `pagehide` 事件**：是 HTML Living Standard 规范中定义的事件，用于通知开发者有关页面显示和隐藏的状态。

`pageshow` 事件在页面显示时触发。这可能发生在页面初次加载、前进/后退导致的页面重新显示，或者在浏览器中重新加载页面时。这个事件提供了一种方式来检测页面是否从浏览器的缓存中加载，以及是否是新加载的页面。

```js
window.addEventListener('pageshow', function(event) {
    console.log('Page is shown');
    console.log('Persisted: ', event.persisted); // 是否从缓存加载
});
```

`pagehide` 事件在页面即将被隐藏时触发。这可能发生在页面被关闭、导航离开当前页面或刷新页面时。与 `pageshow` 事件一样，`pagehide` 事件也提供了一个属性来检测页面是否将被缓存。

```js
window.addEventListener('pagehide', function(event) {
    console.log('Page is about to be hidden');
    console.log('Persisted: ', event.persisted); // 是否被缓存
});
```

**`hashchange` 事件**：是在 URL 中的片段标识符（hash，即 URL 中的 `#` 及其后的部分）发生变化时触发的事件。这个事件通常与使用锚点链接或前端路由时相关。

```js
window.addEventListener('hashchange', function() {
    console.log('Hash changed:', window.location.hash);
});
```

**为什么使用 `hashchange` 事件？**
1. **前端路由：** 在单页面应用程序（SPA）中，常常使用锚点链接或者路由库实现前端路由。`hashchange` 事件是实现这一机制的关键。
2. **历史记录管理：** 通过监听 `hashchange` 事件，你可以实现对页面历史记录的管理，包括前进和后退操作。
3. **深链接：** 使用片段标识符作为状态的一部分可以创建具有深链接的 Web 应用程序，使用户可以通过书签或直接输入 URL 来访问特定的应用程序状态。

### 内存与性能

#### 事件委托

“过多事件处理程序”的解决方案是使用`事件委托`。事件委托利用事件冒泡，可以只使用一个事件处理程序来管理一种类型的事件。

**事件委托具有如下优点：**
- document 对象随时可用，任何时候都可以给它添加事件处理程序（不用等待 DOMContentLoaded
或 load 事件）。这意味着只要页面渲染出可点击的元素，就可以无延迟地起作用。
- 节省花在设置页面事件处理程序上的时间。只指定一个事件处理程序既可以节省 DOM 引用，也
可以节省时间。
- 减少整个页面所需的内存，提升整体性能。

**最适合使用事件委托的事件包括：** 
click、mousedown、mouseup、keydown 和 keypress。

mouseover 和 mouseout 事件冒泡，但很难适当处理，且经常需要计算元素位置（因为 mouseout 会在光标从一个元素移动到它的一个后代节点以及移出元素之外时触发）。

#### 删除事件处理程序

应该及时删除不用的事件处理程序。

onload 事件处理程序中做了什么，最好在 onunload 事件处理程序中恢复。

**通过属性赋值添加的事件处理程序：**
```js
// 通过属性赋值添加事件处理程序
function myEventHandler() {
    console.log('Event handled!');
}

// 添加事件处理程序
document.getElementById('myElement').onclick = myEventHandler;

// 删除事件处理程序
document.getElementById('myElement').onclick = null;
```

**使用 `addEventListener` 添加的事件处理程序：**
```js
// 使用 addEventListener 添加事件处理程序
function myEventHandler() {
    console.log('Event handled!');
}

// 添加事件处理程序
document.getElementById('myElement').addEventListener('click', myEventHandler);

// 删除事件处理程序
document.getElementById('myElement').removeEventListener('click', myEventHandler);
```

**围绕着使用事件，需要考虑内存与性能问题。例如：**
- 最好限制一个页面中事件处理程序的数量，因为它们会占用过多内存，导致页面响应缓慢；
- 利用事件冒泡，事件委托可以解决限制事件处理程序数量的问题；
- 最好在页面卸载之前删除所有事件处理程序。


### 模拟事件

模拟事件的方法可以通过 `Event` 对象和 `dispatchEvent` 方法来实现。

```js
// 获取按钮元素
var myButton = document.getElementById('myButton');

// 创建事件对象
var clickEvent = new Event('click');

// 添加事件监听器
myButton.addEventListener('click', function(event) {
    console.log('Button clicked!');
});

// 模拟触发点击事件
myButton.dispatchEvent(clickEvent);
```

## 第 18 章 动画与 Canvas 图形

### 使用 requestAnimationFrame

一般计算机显示器的屏幕刷新率都是 `60Hz`，基本上意味着每秒需要重绘 `60 次`。大多数浏览器会限制重绘频率，使其不超出屏幕的刷新率，这是因为超过刷新率，用户也感知不到。

因此，实现平滑动画最佳的重绘间隔为 `1000 毫秒/60`，大约 `17 毫秒`。以这个速度重绘可以实现最平滑的动画，因为这已经是浏览器的极限了。如果同时运行多个动画，可能需要加以限流，以免 17 毫秒的重绘间隔过快，导致动画过早运行完。

`requestAnimationFrame()` 用以通知浏览器某些 JS 代码要执行动画了。这样浏览器就可以在运行某些代码后进行适当的优化。目前所有浏览器都支持这个方法。

```js
let requestID = null
let enabled = true;

function expensiveOperation() { 
    console.log('Invoked at', Date.now()); 
}

// 节流
window.addEventListener('scroll', () => { 
    if (enabled) { 
        enabled = false; 
        requestID = window.requestAnimationFrame(expensiveOperation); 
        window.setTimeout(() => enabled = true, 50); 
    } 
}); 

// 返回一个请求 ID，可以用于来取消重绘任务
window.cancelAnimationFrame(requestID); 
```

### 基本的画布功能

```js
let drawing = document.getElementById("drawing"); 

// 确保浏览器支持<canvas> 
if (drawing.getContext) {
    let context = drawing.getContext("2d");
    
    // 取得图像的数据 URI 
    let imgURI = drawing.toDataURL("image/png"); 
    // 显示图片
    let image = document.createElement("img"); 
    image.src = imgURI; 
    document.body.appendChild(image); 
}
```

### 2D 绘图上下文

`2D 绘图上下文`提供了绘制 2D 图形的方法，包括矩形、弧形和路径。

2D 上下文的`坐标原点(0, 0)`在 `<canvas>` 元素的左上角。所有坐标值都相对于该点计算，`因此 x 坐标向右增长，y 坐标向下增长`。
    
默认情况下，width 和 height 表示两个方向上像素的最大值。

#### 填充和描边

`填充 fillStyle`以指定样式（颜色、渐变或图像）自动填充形状，而`描边 strokeStyle`只为图形边界着色。

```js
let drawing = document.getElementById("drawing"); 
// 确保浏览器支持<canvas> 
if (drawing.getContext) { 
    let context = drawing.getContext("2d"); 
    context.strokeStyle = "red"; 
    context.fillStyle = "#0000ff"; 
} 
```

#### 绘制矩形

`矩形`是唯一一个可以直接在 2D 绘图上下文中绘制的形状。

与绘制矩形相关的方法有 3 个：`fillRect()、strokeRect()和 clearRect()`。这些方法都接收 4 个参数：`矩形 x 坐标、矩形 y 坐标、矩形宽度和矩形高度`。这几个参数的单位都是像素。

```js
let drawing = document.getElementById("drawing"); 
// 确保浏览器支持<canvas> 
if (drawing.getContext) { 
    let context = drawing.getContext("2d"); 
    // 绘制红色矩形
    context.fillStyle = "#ff0000"; 
    context.fillRect(10, 10, 50, 50); 
    // 绘制半透明蓝色矩形
    context.fillStyle = "rgba(0,0,255,0.5)"; 
    context.fillRect(30, 30, 50, 50); 
    
    // 在前两个矩形重叠的区域擦除一个矩形区域
    context.clearRect(40, 40, 10, 10); 
    
    
    // 绘制红色轮廓的矩形
    context.strokeStyle = "#ff0000"; 
    context.strokeRect(10, 10, 50, 50); 
    // 绘制半透明蓝色轮廓的矩形
    context.strokeStyle = "rgba(0,0,255,0.5)"; 
    context.strokeRect(30, 30, 50, 50); 
} 
```

#### 绘制路径

```js
// 开始绘制新路径
beginPath()

// 以(x, y)为圆心，以 radius 为半径绘制一条弧线，
// 起始角度 startAngle，结束角度为 endAngle（都是弧度）。
// counterclockwise 表示是否逆时针计算起始角度和结束角度（默认为顺时针）。
arc(x, y, radius, startAngle, endAngle, counterclockwise)

// 以给定半径 radius，经由(x1, y1)绘制一条从上一点到(x2, y2)的弧线。
arcTo(x1, y1, x2, y2, radius)

// 以(c1x, c1y)和(c2x, c2y)为控制点，绘制一条从上一点到(x, y)的弧线（三次贝塞尔曲线）。
bezierCurveTo(c1x, c1y, c2x, c2y, x, y)

// 绘制一条从上一点到(x, y)的直线。
lineTo(x, y)

// 不绘制线条，只把绘制光标移动到(x, y)
moveTo(x, y)

// 以(cx, cy)为控制点，绘制一条从上一点到(x, y)的弧线（二次贝塞尔曲线）。
quadraticCurveTo(cx, cy, x, y)

// 以给定宽度和高度在坐标点(x, y)绘制一个矩形。
// 这个方法与 strokeRect()和 fillRect()的区别在于，
// 它创建的是一条路径，而不是独立的图形。
rect(x, y, width, height)
```

#### 绘制文本


- `font`：以 CSS 语法指定的字体样式、大小、字体族等，比如"10px Arial"。
- `textAlign`：指定文本的对齐方式，可能的值包括"start"、"end"、"left"、"right"和 "center"。推荐使用`"start"和"end"`，不使用"left"和"right"，因为前者无论在从左到右书写的语言还是从右到左书写的语言中含义都更明确。
- `textBaseLine` ：指定文本的基线，可能的值包括`"top"、"hanging"、"middle"、"alphabetic"、"ideographic"和"bottom"`。

#### 变换

```js
// 围绕原点把图像旋转 angle 弧度
rotate(angle)

// 通过在 x 轴乘以 scaleX、在 y 轴乘以 scaleY 来缩放图像。
// scaleX 和 scaleY 的默认值都是 1.0。
scale(scaleX, scaleY)

// 把原点移动到(x, y)。执行这个操作后，坐标(0, 0)就会变成(x, y)。
translate(x, y)

// 像下面这样通过矩阵乘法直接修改矩阵。
// m1_1 m1_2 dx 
// m2_1 m2_2 dy 
// 0 0 1 
transform(m1_1, m1_2, m2_1, m2_2, dx, dy) 

// 把矩阵重置为默认值，再以传入的参数调用 transform()。
setTransform(m1_1, m1_2, m2_1, m2_2, dx, dy)：
```


```js
let drawing = document.getElementById("drawing"); 
// 确保浏览器支持<canvas> 
if (drawing.getContext) { 
    let context = drawing.getContext("2d"); 
    // 创建路径
    context.beginPath(); 
    // 绘制外圆
    context.arc(100, 100, 99, 0, 2 * Math.PI, false);
    // 绘制内圆
    context.moveTo(194, 100); 
    context.arc(100, 100, 94, 0, 2 * Math.PI, false); 
    
    // 1号方法
    // 绘制分针
    // context.moveTo(100, 100); 
    // context.lineTo(100, 15); 
    // 绘制时针
    // context.moveTo(100, 100); 
    // context.lineTo(35, 100);  
    
    // 2号方法
    // 移动原点到表盘中心
    context.translate(100, 100);
    // 旋转表针
    context.rotate(1); 
    // 绘制分针
    context.moveTo(0, 0); 
    context.lineTo(0, -85); 
    // 绘制时针
    context.moveTo(0, 0); 
    context.lineTo(-65, 0); 
    
    
    // 描画路径
    context.stroke();
    
    context.font = "bold 14px Arial"; 
    context.textAlign = "center"; 
    context.textBaseline = "middle"; 
    context.fillText("12", 100, 20); 
} 
```

#### 绘制图像

```js
// 要绘制的图像、源图像 x 坐标、源图像 y 坐标、源图像宽度、源图像高度
// 目标区域 x 坐标、目标区域 y 坐标、目标区域宽度和目标区域高度
context.drawImage(image, 0, 10, 50, 50, 0, 100, 40, 60); 
```

#### 阴影

- `shadowColor`：CSS 颜色值，表示要绘制的阴影颜色，默认为黑色。
- `shadowOffsetX`：阴影相对于形状或路径的 x 坐标的偏移量，默认为 0。
- `shadowOffsetY`：阴影相对于形状或路径的 y 坐标的偏移量，默认为 0。
- `shadowBlur`：像素，表示阴影的模糊量。默认值为 0，表示不模糊。

#### 渐变

```js
// 创建线性渐变对象 (x0, y0, x1, y1)
let gradient = context.createLinearGradient(30, 30, 70, 70); 
gradient.addColorStop(0, "white"); 
gradient.addColorStop(1, "black"); 



// 径向渐变 (x0, y0, r0, x1, y1, r1)
let gradient = context.createRadialGradient(55, 55, 10, 55, 55, 30); 

gradient.addColorStop(0, "white"); 
gradient.addColorStop(1, "black"); 

// 绘制红色矩形
context.fillStyle = "#ff0000"; 
context.fillRect(10, 10, 50, 50); 

// 绘制渐变矩形
context.fillStyle = gradient; 
context.fillRect(30, 30, 50, 50); 
```

#### 图案

```js
// 获取 Canvas 元素
var canvas = document.getElementById('imagePatternCanvas');
var ctx = canvas.getContext('2d');

// 创建图像对象
var img = new Image();
img.src = 'path/to/your/image.jpg';

// 图像加载完成后创建图像图案
img.onload = function() {
    // 'repeat', 'repeat-x', 'repeat-y', 'no-repeat'
    var pattern = ctx.createPattern(img, 'repeat'); 

    // 使用图案填充矩形
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 400, 200);
};
```

#### 图像数据

```js
let drawing = document.getElementById("drawing"); 
// 确保浏览器支持<canvas> 
if (drawing.getContext) { 
    let context = drawing.getContext("2d"), 
        image = document.images[0], 
        imageData, data, 
        i, len, average, 
        red, green, blue, alpha; 
    // 绘制图像
    context.drawImage(image, 0, 0);
    
    // 取得图像数据
    imageData = context.getImageData(0, 0, image.width, image.height); 
    data = imageData.data; 
    for (i=0, len=data.length; i < len; i+=4) { 
        red = data[i]; 
        green = data[i+1]; 
        blue = data[i+2]; 
        alpha = data[i+3];
        
        // 取得 RGB 平均值
        average = Math.floor((red + green + blue) / 3); 
        
        // 设置颜色，不管透明度
        data[i] = average; 
        data[i+1] = average; 
        data[i+2] = average; 
    }
 
    // 将修改后的数据写回 ImageData 并应用到画布上显示出来
    imageData.data = data; 
    context.putImageData(imageData, 0, 0); 
} 
```

#### 合成

在 Canvas 中，你可以使用`合成操作`来控制绘制的图形之间的混合方式。`合成操作`允许你通过不同的合成模式来控制图形的显示效果。

```js
// 获取 Canvas 元素
var canvas = document.getElementById('globalCompositeModeCanvas');
var ctx = canvas.getContext('2d');

// 绘制一个红色矩形
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);

// 设置全局合成模式
ctx.globalCompositeOperation = 'destination-over';

// 绘制一个蓝色矩形，根据合成模式绘制在前一个矩形的后面
ctx.fillStyle = 'blue';
ctx.fillRect(50, 50, 100, 100);
```

上述代码，首先绘制了一个红色的矩形，然后设置了全局合成模式为 `'destination-over'`，接着绘制了一个蓝色的矩形，根据合成模式，蓝色矩形被绘制在前一个红色矩形的后面。

```js
// 获取 Canvas 元素
var canvas = document.getElementById('compositeOperationsCanvas');
var ctx = canvas.getContext('2d');

// 绘制一个红色矩形
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);

// 设置透明度
ctx.globalAlpha = 0.5;

// 绘制一个蓝色矩形，根据透明度产生混合效果
ctx.fillStyle = 'blue';
ctx.fillRect(50, 50, 100, 100);
```

上述代码，使用 `globalAlpha` 设置了透明度，然后绘制了一个蓝色的矩形，产生了透明度混合的效果。


### WebGL 上下文

WebGL 是画布的 3D 上下文。

WebGL 是以 OpenGL ES 2.0 为基础的。要使用 WebGL 最好熟悉 OpenGL ES 2.0，因为很多概念可以照搬过来。

https://learnopengl-cn.github.io/
https://learnwebgl.brown37.net/

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebGL Simple Example</title>
</head>

<body>
  <canvas id="myCanvas" width="400" height="400" style="border: 1px solid #000;"></canvas>

  <script>
    document.addEventListener("DOMContentLoaded", function () {
      // 获取 Canvas 元素
      var canvas = document.getElementById('myCanvas');
      // 获取 webgl
      var gl = canvas.getContext('webgl')

      if (!gl) {
        console.log('Unable to initialize WebGL. Your browser may not support it.');
        return;
      }

      const vertexShaderSrc = `
        attribute vec4 a_Position;
        void main() {
          gl_Position = a_Position;
        }
        `;

      const fragmentShaderSrc = `
        void main() {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
        `;

      // 渲染器生成处理
      // 创建顶点渲染器
      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, vertexShaderSrc);
      gl.compileShader(vertexShader);

      // 创建片元渲染器
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fragmentShaderSrc);
      gl.compileShader(fragmentShader);

      // 创建程序对象
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.useProgram(program);
      gl.program = program;

      // 顶点数据
      // prettier-ignore
      const vertices = new Float32Array([
        0, 0.5, // 第一个点
        -0.5, -0.5, // 第二个点
        0.5, -0.5, // 第三个点
      ]);

      // 创建缓存对象
      const vertexBuffer = gl.createBuffer();
      // 绑定缓存对象到上下文
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      // 向缓存区写入数据
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      // 获取 a_Position 变量地址
      const a_Position = gl.getAttribLocation(gl.program, "a_Position");
      // 将缓冲区对象分配给 a_Position 变量
      gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

      // 允许访问缓存区
      gl.enableVertexAttribArray(a_Position);

      // 绘制
      // 清空画布，并指定颜色
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // 绘制三角形
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
  </script>
</body>
</html>
```

效果图：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da384e0623c04dbd9f5dd565121e7007~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1088&h=1024&s=32120&e=png&b=000000)

## 第 25 章 客户端存储

### cookie

`Cookies` 是存储在用户计算机上的小型文本文件，由网站使用以存储有关用户的信息。

它们通常包含有关用户和网站之间状态的信息，用于跟踪用户、记录登录状态、存储购物车内容等。

Cookies 是 HTTP 的一部分，由浏览器自动处理，每个 Cookie 都与一个特定的域相关联。

```js
// 创建一个 Cookie
document.cookie = "username=John Doe; expires=Thu, 18 Dec 2022 12:00:00 UTC; path=/";

// 读取所有 Cookie
var allCookies = document.cookie;

// 读取特定的 Cookie
var usernameCookie = getCookie("username");

function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}
```

**一些常见的 Cookies 限制：**
1. **同源策略：** 浏览器遵循同源策略，即一个网站下设置的 Cookie 一般不会被其他网站访问。这是为了保护用户的隐私和防止跨站点请求伪造（CSRF）攻击。
2. **域限制：** Cookie 受同源策略的限制，但可以通过设置 `domain` 属性来使 Cookie 在主域和其子域之间共享。然而，该域名必须包含在当前页面的域名中，而不是其他域名。
3. **路径限制：** Cookie 可以通过设置 `path` 属性指定其有效路径。只有在该路径及其子路径下的页面才能访问该 Cookie。
4. **安全限制：** 设置 `Secure` 属性的 Cookie 只能通过 HTTPS 连接传输。这是为了保护敏感信息，确保它在传输过程中不容易被窃听。
5. **Cookie 数量和大小限制：** 不同浏览器对于每个域名下可以存储的 Cookie 数量和总大小有限制。超过这些限制可能会导致一些 Cookie 被丢弃。大约限制为 4KB。
6. **过期时间限制：** 如果不设置过期时间，Cookie 默认是会话级别的，将在用户关闭浏览器时失效。可以通过设置 `expires` 属性或 `max-age` 属性来指定 Cookie 的过期时间。
7. **第三方 Cookie：** 浏览器通常会限制第三方 Cookie 的存储和访问，以减少跟踪用户的能力。一些浏览器对第三方 Cookie 的处理方式可能有所不同。

**Cookie 属性：**
- **Name-Value Pair（名称-值对）：** 每个 Cookie 都有一个名称和一个相应的值。
- **Expires（过期时间）：** Cookie 的过期时间，过了这个时间后，浏览器会自动删除该 Cookie。
- **Domain（域）：** Cookie 关联的域。只有在该域及其子域下才能访问该 Cookie。
- **Path（路径）：** Cookie 的有效路径。只有在指定路径下的页面才能访问该 Cookie。
- **Secure：** 表示此 Cookie 只能通过 HTTPS 连接传输。
- **HttpOnly：** 如果设置了 `HttpOnly` 属性，那么该 Cookie 将无法通过 JavaScript 访问。这有助于防止一些跨站脚本攻击。
- **SameSite：** 用于防止跨站点请求伪造攻击。`SameSite` 属性可以设置为 `"Strict"`、`"Lax"` 或 `null`。

```js
class CookieUtil { 
    static get(name) { 
        let cookieName = `${encodeURIComponent(name)}=`, 
            cookieStart = document.cookie.indexOf(cookieName), 
            cookieValue = null; 
        if (cookieStart > -1){ 
            let cookieEnd = document.cookie.indexOf(";", cookieStart); 
            if (cookieEnd == -1){ 
                cookieEnd = document.cookie.length; 
            } 
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart 
        + cookieName.length, cookieEnd)); 
        } 
        return cookieValue; 
    } 
    static set(name, value, expires, path, domain, secure) { 
        let cookieText = 
        `${encodeURIComponent(name)}=${encodeURIComponent(value)}` 
        if (expires instanceof Date) { 
            cookieText += `; expires=${expires.toGMTString()}`; 
        } 
        if (path) { 
            cookieText += `; path=${path}`; 
        } 
        if (domain) { 
            cookieText += `; domain=${domain}`; 
        } 
        if (secure) { 
            cookieText += "; secure"; 
        } 
        document.cookie = cookieText; 
    } 
    static unset(name, path, domain, secure) { 
        CookieUtil.set(name, "", new Date(0), path, domain, secure); 
    } 
}; 


// 设置 cookie 
CookieUtil.set("name", "Nicholas"); 
CookieUtil.set("book", "Professional JavaScript"); 
// 读取 cookie 
alert(CookieUtil.get("name")); // "Nicholas" 
alert(CookieUtil.get("book")); // "Professional JavaScript" 
// 删除 cookie 
CookieUtil.unset("name"); 
CookieUtil.unset("book"); 
// 设置有路径、域和过期时间的 cookie 
CookieUtil.set("name", "Nicholas", "/books/projs/", "www.wrox.com", new Date("January 1, 2010")); 
// 删除刚刚设置的 cookie 
CookieUtil.unset("name", "/books/projs/", "www.wrox.com"); 
// 设置安全 cookie 
CookieUtil.set("name", "Nicholas", null, null, null, true); 
```

**子 cookies：**
```js
class SubCookieUtil {
    // 取得一个子 cookie 的值
    static get(name, subName) { 
        let subCookies = SubCookieUtil.getAll(name); 
        return subCookies ? subCookies[subName] : null; 
    }
    // 取得所有子 cookie
    static getAll(name) { 
        let cookieName = encodeURIComponent(name) + "=", 
            cookieStart = document.cookie.indexOf(cookieName), 
            cookieValue = null, 
            cookieEnd, 
            subCookies, 
            parts, 
            result = {};
            
        if (cookieStart > -1) { 
            cookieEnd = document.cookie.indexOf(";", cookieStart); 
            if (cookieEnd == -1) { 
                cookieEnd = document.cookie.length; 
            } 
            cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
            
            if (cookieValue.length > 0) { 
                subCookies = cookieValue.split("&"); 
                for (let i = 0, len = subCookies.length; i < len; i++) { 
                    parts = subCookies[i].split("="); 
                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]); 
                } 
                return result; 
            } 
        } 
        return null; 
    }
    
    static set(name, subName, value, expires, path, domain, secure) { 
        let subcookies = SubCookieUtil.getAll(name) || {}; 
        subcookies[subName] = value; 
        SubCookieUtil.setAll(name, subcookies, expires, path, domain, secure); 
    } 
    static setAll(name, subcookies, expires, path, domain, secure) { 
        let cookieText = encodeURIComponent(name) + "=", 
            subcookieParts = new Array(), 
            subName; 
        
        for (subName in subcookies){ 
            if (subName.length > 0 && subcookies.hasOwnProperty(subName)){
    subcookieParts.push('${encodeURIComponent(subName)}=${encodeURIComponent(subcookies[subName])}'); 
            } 
        } 
        if (cookieParts.length > 0) { 
            cookieText += subcookieParts.join("&"); 
            if (expires instanceof Date) { 
                cookieText += `; expires=${expires.toGMTString()}`; 
            } 
            if (path) { 
                cookieText += `; path=${path}`; 
            } 
            if (domain) { 
                cookieText += `; domain=${domain}`; 
            } 
            if (secure) { 
                cookieText += "; secure"; 
            } 
        } else { 
            cookieText += `; expires=${(new Date(0)).toGMTString()}`; 
        } 
        document.cookie = cookieText; 
    }
    
    static unset(name, subName, path, domain, secure) { 
        let subcookies = SubCookieUtil.getAll(name); 
        if (subcookies){ 
            delete subcookies[subName]; // 删除
            SubCookieUtil.setAll(name, subcookies, null, path, domain, secure); 
        } 
     }
     
    static unsetAll(name, path, domain, secure) { 
        SubCookieUtil.setAll(name, null, new Date(0), path, domain, secure); 
    } 
}; 
```

### Web Storage

Web Storage 的第 2 版定义了两个对象：`localStorage 和 sessionStorage`。

`localStorage 是永久存储机制，sessionStorage 是跨会话的存储机制`。

这两种浏览器存储 API 提供了在浏览器中不受页面刷新影响而存储数据的两种方式。

#### localStorage：

- **长期存储：** `localStorage` 中的数据是永久性的，除非用户手动清除浏览器缓存或网站清除自己的数据，否则数据将一直保存在本地。
- **大小限制：** 通常允许存储的数据大小为 5MB。
- **作用域：** 存储在 `localStorage` 中的数据对于相同域名的所有页面都是共享的。

```js
// 存储数据
localStorage.setItem('key', 'value');

// 读取数据
var value = localStorage.getItem('key');

// 删除数据
localStorage.removeItem('key');

// 清空所有数据
localStorage.clear();
```

#### sessionStorage：

- **临时存储：** `sessionStorage` 中的数据在用户会话结束时被清除，关闭浏览器窗口或标签页会终止用户会话。
- **大小限制：** 通常允许存储的数据大小也为 5MB。
- **作用域：** 存储在 `sessionStorage` 中的数据仅对于打开的窗口或标签页是有效的，不同窗口之间不共享数据。

```js
// 存储数据
sessionStorage.setItem('key', 'value');

// 读取数据
var value = sessionStorage.getItem('key');

// 删除数据
sessionStorage.removeItem('key');

// 清空所有数据
sessionStorage.clear();
```

### IndexedDB

`IndexedDB`（Indexed Database）是一个在浏览器中提供的低级别的客户端存储数据库，用于存储大量结构化数据。IndexedDB 是一个 `NoSQL 数据库`，它使用`对象存储空间来存储和检索数据`。相较于 Web Storage，IndexedDB 更适用于`存储大量数据和需要进行复杂查询的场景`。

IndexedDB 的设计几乎完全是`异步的`。为此，大多数操作以请求的形式执行，这些请求会异步执行，产生成功的结果或错误。绝大多数 IndexedDB 操作要求添加 onerror 和 onsuccess 事件处理程序来确定输出。

#### 数据库

IndexedDB 是类似于 MySQL 或 Web SQL Database 的数据库。与传统数据库最大的区别在于，IndexedDB `使用对象存储而不是表格保存数据`。IndexedDB 数据库就是在一个公共命名空间下的一组对象存储，类似于 NoSQL 风格的实现。

#### 对象存储

建立了数据库连接之后，下一步就是使用对象存储。

#### 事务

创建了对象存储之后，剩下的所有操作都是通过事务完成的。事务要通过调用数据库对象的transaction()方法创建。任何时候，只要想要读取或修改数据，都要通过事务把所有修改操作组织起来。

#### 插入对象

拿到了对象存储的引用后，就可以使用 add()或 put()写入数据了。

这两个方法都接收一个参数，即要存储的对象，并把对象保存到对象存储。

这两个方法只在对象存储中已存在同名的键时有区别。这种情况下，add()会导致错误，而 put()会简单地重写该对象。更简单地说，可以把 add()想象成插入新值，而把 put()想象为更新值。

#### 通过游标查询

使用事务可以通过一个已知键取得一条记录。如果想取得多条数据，则需要在事务中创建一个`游标`。

`游标`是一个指向结果集的指针。与传统数据库查询不同，游标不会事先收集所有结果。相反，游标指向第一个结果，并在接到指令前不会主动查找下一条数据。

需要在对象存储上调用 openCursor()方法创建游标。

#### 键范围

使用游标会给人一种不太理想的感觉，因为获取数据的方式受到了限制。使用`键范围`（key range）可以让游标更容易管理。键范围对应 IDBKeyRange 的实例。

#### 并发问题

IndexedDB 虽然是网页中的异步 API，但仍存在并发问题。如果两个不同的浏览器标签页同时打开了同一个网页，则有可能出现一个网页尝试升级数据库而另一个尚未就绪的情形。有问题的操作是设置数据库为新版本，`而版本变化只能在浏览器只有一个标签页使用数据库时才能完成`。

第一次打开数据库时，添加 onversionchange 事件处理程序非常重要。另一个同源标签页将数据库打开到新版本时，将执行此回调。对这个事件最好的回应是立即关闭数据库，以便完成版本升级。例如：

```js
let request, database; 
request = indexedDB.open("admin", 1); 

request.onsuccess = (event) => { 
    database = event.target.result; 
    database.onversionchange = () => database.close(); 
}; 
```

应该在每次成功打开数据库后都指定 onversionchange 事件处理程序。记住，onversionchange 有可能会被其他标签页触发。

通过始终都指定这些事件处理程序，可以保证 Web 应用程序能够更好地处理与 IndexedDB 相关的并发问题。

```js
// 打开数据库
var request = indexedDB.open('myDatabase', 1);

// 数据库升级事件
request.onupgradeneeded = function(event) {
    var db = event.target.result;

    // 创建对象存储空间
    var objectStore = db.createObjectStore('myObjectStore', { keyPath: 'id' });

    // 添加索引
    objectStore.createIndex('nameIndex', 'name', { unique: false });
};

// 打开数据库成功事件
request.onsuccess = function(event) {
    var db = event.target.result;
    console.log('Database opened successfully');

    // 添加数据
    var transaction = db.transaction(['myObjectStore'], 'readwrite');
    var objectStore = transaction.objectStore('myObjectStore');

    var data = { id: 1, name: 'John Doe', age: 25 };
    var addRequest = objectStore.add(data);

    addRequest.onsuccess = function(event) {
        console.log('Data added successfully');

        // 读取数据
        var getTransaction = db.transaction(['myObjectStore'], 'readonly');
        var getObjectStore = getTransaction.objectStore('myObjectStore');

        var getRequest = getObjectStore.get(1);

        getRequest.onsuccess = function(event) {
            var retrievedData = event.target.result;
            console.log('Retrieved data:', retrievedData);

            // 删除数据
            var deleteTransaction = db.transaction(['myObjectStore'], 'readwrite');
            var deleteObjectStore = deleteTransaction.objectStore('myObjectStore');

            var deleteRequest = deleteObjectStore.delete(1);

            deleteRequest.onsuccess = function(event) {
                console.log('Data deleted successfully');
            };
        };
    };
};

// 打开数据库失败事件
request.onerror = function(event) {
    console.log('Database error: ' + event.target.errorCode);
};
```