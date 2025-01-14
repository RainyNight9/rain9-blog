---
theme: channing-cyan
---

# 面试官问：了解哪些最新的 ES 新特性？——这样回答更好！

## 目标

1.  **帮助大家答好这个问题，答出能给自己加分的答案。**
2.  **真正帮助大家在实际工作中运用新特性，收获成长。**

## 为什么会有这个问题？

**首先要明白，面试官为什么会问这个问题？**

这背后其实是希望了解：

- 你是否关注技术前沿，跟随行业趋势。
- 你是否能够将新特性运用到实际工作中，为团队和项目带来价值。

具体来说，了解和使用最新的 ECMAScript（ES）特性对前端开发者有以下几个显著好处：

### 1. 提高开发效率

- **语法更简洁**：如 `箭头函数`、`模板字符串`、`解构赋值` 等，大幅减少代码量，提升可读性和可维护性。
- **功能更强大**：例如可选链（`?.`）和空值合并操作符（`??`），简化了对深层对象属性的安全访问，减少冗余代码。

### 2. 提升代码性能

- 新特性通常经过引擎优化，可以更高效地运行。
  - **异步操作**：`Async/Await` 替代回调函数，避免“回调地狱”，更自然地管理异步操作。
  - **迭代器与生成器**：流式处理大规模数据，节省内存。

### 3. 解决复杂场景

- **大规模数据处理**：`Map`、`Set` 和 `WeakMap` 等数据结构在处理复杂数据时效率更高。
- **高级编程模式**：如类的私有字段和方法（`#field`）、动态导入（`import()`）、模块化等特性，提升了代码封装性。

### 4. 更好地支持现代浏览器

- 最新浏览器基本上支持 ES 的大多数新特性，无需额外的 polyfill 或转译，提升了代码的兼容性。
- 比如，使用模块化（`import/export`）可以直接加载模块，无需复杂的脚本管理工具。

### 5. 提高团队协作效率

- 使用最新语言特性可以减少代码风格分歧，让团队更容易理解代码意图。
  - **默认参数**减少无意义的条件判断。
  - `Promise.allSettled` 高效处理多个异步任务的结果。

### 6. 保持行业竞争力

- 前端技术迭代迅速，熟悉最新 ES 特性能够帮助开发者跟上技术趋势，增强行业竞争力。
- 现代开发框架（如 React、Vue、Svelte）和工具链（如 Webpack、Vite、Babel、ESLint）也高度依赖这些特性。

了解这些，希望可以真正的在实际应用中有所积淀，才能在面试回答中，游刃有余。

## 答题思路

在回答面试官关于“**了解哪些最新的 ES 新特性**”这一问题时，以下几个策略可以帮助你展现专业性和实际应用能力：

### 1. 结构清晰，突出重点

先概括性地回答“对 ECMAScript 的更新较为熟悉，特别是从 ES2021 到最近 ES2024 的新特性，并在项目中有实际应用。”  
然后按照**时间倒序**，挑选出一些你熟悉且常用的特性进行介绍。（突显问题的最新字眼）

### 2. 挑选常见且有实际应用价值的特性

下文整理了一些时间倒序排列的 ES 新特性，可以根据你的熟悉程度和实际使用经验选择性回答。可能面试官会拓展，选择某一个的时候，尽量深入一点，自身也尽量围绕可能的扩展来回答。

### 3. 强调实际项目中的应用

不仅仅是列举特性，而是结合项目经验说明这些特性如何帮助解决实际问题。  

以下列举的例子做参考，自己也可以依据自身情况，得出适合自己的回答：

- **“在处理异步接口调用时，我主要使用了 ES2017 的 `async/await`，极大地优化了回调地狱的问题。”**
- **“ES2021 的逻辑赋值运算符在状态管理中非常有用，比如条件赋值 Redux store 的默认值。”**
- ......

### 4. 展示学习态度和广度

如果时间允许，可以提到你学习新特性的方式，比如：

- 关注 TC39 提案进展，了解即将标准化的功能。
- 经常使用 Babel、Vite 等工具测试提案阶段的特性。

### 5. 避免“踩坑”

-  如果不熟悉某个特性，坦诚承认：“对这个特性了解不多，但我愿意快速学习并尝试使用。”
-  不要只背诵特性，而是注重描述实际应用场景。

### 示例回答

我对 ECMAScript 的更新一直有关注，并在项目中应用了许多新特性。

例如：
- ES2021 的逻辑赋值运算符（`&&=`, `||=`, `??=`）简化了 Redux 的状态更新逻辑；
- ES2020 的可选链和空值合并操作符则优化了嵌套属性的访问，减少了手写的空值判断代码。  
- 此外，我也在研究 ES2024 的 JSON 模块特性，可以直接 `import` JSON 文件到代码中，这对管理配置文件非常实用。
- ......

这样的回答不仅展现了对语言特性的了解，还体现了实际开发经验和学习能力。

## ES 特性整理

### ES2024 (ES15) 

1.  **Symbol.prototype.description**  
    新增对符号的描述字段的访问支持，可以更轻松获取 Symbol 的描述信息。
2.  **Array.prototype.toSorted**  
    提供非破坏性排序方法，返回排序后的新数组而不改变原数组。
3.  **RegExp V flag**  
    引入“v”标志来支持 Unicode 正则表达式模式匹配和更复杂的匹配。
4.  **Iterator Helpers**  
    为迭代器对象添加常用工具方法，如 `map`、`filter`、`take` 等，提高对流式数据处理的支持。
5.  **JSON 模块（Import JSON）**  
    可以直接通过 `import` 导入 JSON 文件，无需额外配置工具。  
    *示例*：
    ```js
    import data from './data.json' assert { type: 'json' };
    console.log(data);
    ```
    *应用*：用在配置文件或静态数据加载中，避免手动解析 JSON。
6. **Object.groupBy()**
    
    用于根据回调函数返回的字符串值对可迭代对象（如数组）的对象元素进行分组。它返回一个对象，其中每个组名称作为键，相应的元素数组作为值。返回的对象和原始对象中的元素是相同的。即，如果更改元素的内部结构，它将反映在原始对象和返回的对象中。
    ```js
    const persons = [
      {name:"John", age:70},
      {name:"Kane", age:5},
      {name:"Jack", age:50},
      {name:"Rambo", age:15}
    ];

    function callbackFunc({ age }) {
      if(age >= 60) {
          return "senior";
      } else if(age > 17 && age < 60) {
          return "adult";
      }
      else {
          return "kid";
      }
    }

    const result = Object.groupBy(persons, callbackFunc);

    console.log("Kids: ");
    for (let [x,y] of result.kid.entries()) {
      console.log(y.name + " " + y.age);
    }

    
    const result2 = Map.groupBy(persons, callbackFunc);

    console.log("Kids2: ");
    for (let x of result2.get("kid")) {
      console.log(x.name + " " + x.age);
    }
   ```

7.  **Temporal API**
    
    是一种用于处理日期和时间的现代 API，用于取代原始的 Date API。它提供了一种更全面且用户友好的方式来处理日期和时间操作。
    
    ```js
    Temporal.PlainDate
    Temporal.PlainTime
    Temporal.PlainDateTime
    Temporal.PlainYearMonth
    Temporal.PlainMonthDay
    Temporal.ZonedDateTime
    ```

8. **Promise withResolvers**
   
   是一个静态方法工厂，返回一个包含新 Promise 的对象以及两个函数，一个用于解析，另一个用于拒绝。这两个函数对应于初始代码片段中所示的传递给 Promise() 构造函数的执行器的两个参数。

    ```js
    const { promise, resolve, reject} = Promise.withResolvers();

    setTimeout(() =>  { Math.random() > 0.5 ? resolve("Success") : reject("Error")},1000);
    promise.then(result => console.log(result)).catch(error => console.error(error));
    ```

### ES2023 (ES14) 

1.  **Array.prototype.findLast & Array.prototype.findLastIndex**  
    两个的数组新方法，用于从最后一个元素搜索数组元素。它们的功能与**find()** 和**findIndex()** 类似，但搜索从数组末尾开始。这些方法可在**Array**和**TypedArray**原型上使用。此功能通过消除手动数组反转的过程，为逆序搜索提供了一种有效的方法。
    ```js
    const isOdd = (number) => number % 2 === 1;
    const numbers = [1, 2, 3, 4, 5];

    console.log(numbers.findLast(isOdd)); // 5
    console.log(numbers.findLastIndex(isOdd)); // 4
    ```
2.  **Hashbang 支持**  
    在脚本开头使用 `#!` 来支持直接在脚本中定义解释器。
    （也称为 shebang）语法已支持在可执行脚本的开头使用一系列字符 `(#!)` 来定义要运行的程序的解释器。换句话说，此语法有助于告诉操作系统在执行脚本时使用哪个解释器。
    ```js
    #!/usr/bin/env node
    
    'use strict';
    
    console.log("Hello world from hashbang syntax");
    ```
3.  **Symbol.prototype.isWellKnownSymbol**  
    判断 Symbol 是否为“知名符号”。
4.  **Change Array by Copy**  
    非破坏性数组方法。**toReversed()**  、 **toSorted()**  、 **toSpliced**和**with()** 方法，这些方法返回新的数组副本而不是改变原始数组。
    ```js
     const numbers = [1, 3, 2, 4, 5];

     // toReversed
     const reversedArray = numbers.toReversed();
     console.log(reversedArray); // [5, 4, 2, 3, 1]
     console.log(numbers); // [1, 3, 2, 4, 5]

     // toSorted
     const sortedArray = numbers.toSorted();
     console.log(sortedArray); // [1, 2, 3, 4, 5]
     console.log(numbers); // [1, 3, 2, 4, 5]

     // toSpliced
     const splicedArray = numbers.toSpliced(1, 3);
     console.log(splicedArray); // [1, 5]
     console.log(numbers); // [1, 3, 2, 4, 5]

     // with
     const replaceWithArray = numbers.with(2, 10);
     console.log(replaceWithArray); // [1, 3, 10, 4, 5]
     console.log(numbers); // [1, 3, 2, 4, 5]
    ```
5. **Symbols 作为 weakmap keys**

   在 ES2023 之前，`WeakMap` 仅限于允许对象作为键，因为对象是唯一的且无法重新创建。由于 `Symbols` 是 ECMAScript 中唯一允许唯一值的基元，因此 WeakMap API 已使用符号作为键进行扩展，而不仅仅是使用对象。
   ```js
   const weak = new WeakMap();
   const objKey = { x:10 };

   weak.set(objKey, "ES2023");
   console.log(weak.get(objKey)); //ES2023
   
   const key = Symbol("ref");
   weak.set(key, "ES2023"); 

   console.log(weak.get(key)); //ES2023
   ```

### ES2022 (ES13) 

1.  **Top-Level Await**  
    在模块的顶层支持使用 `await`，简化异步操作。
    ```js
     import posts from './posts';

     const getPosts = async() => {
       let posts = await posts();
       return posts;
     }
     
     let posts = await posts();
    ``` 
    **动态依赖路径：**  当您拥有依赖于运行时值的依赖项的动态路径时，await 有助于在运行时加载或导入消息。
    ```js
    const messages = await import(`./messages-${language}.js`);
    ```
    **依赖回退：**  如果导入的模块加载失败，则加载后备模块用于加载依赖项。
    ```js
    let lodash;
     try {
       lodash = await import('https://first.domain.com/lodash');
     } catch {
       lodash = await import('https://second.domain.com/lodash');
     }
    ```
    **资源初始化：**  此功能可用于使用数据库初始化应用程序。
    ```js
    import { dbConnector} from './dbUtils.js'
    //connect to database
    const connection = await dbConnector.connect();
    export default function(){ 
      connection.list()
    }
    ```
    
2.  **RegExp Match Indices**  
    在正则匹配结果中返回每个匹配的索引范围。附加信息包括 RegExp 中匹配的开始和结束索引以及在输入字符串中使用`\d`标志。
    ```js
     const regexPatter = /Jack/g;
     const input = 'Authos: Jack, Alexander and Jacky';
     const result = [...input.matchAll(regexPatter)];
     console.log(result[0]); 
     // ['Jack', index: 8, input: 'Authos: Jack, Alex and Jacky', groups: undefined]
     
     // \d
      const regexPatter = /(Jack)/gd;
      const input = 'Authos: Jack, Alexander and Jacky';
      const result = [...input.matchAll(regexPatter)];
      console.log(result[0]); 
      // ['Jack', 'Jack', index: 8, input: 'Authos: Jack, Alexander and Jacky', groups: undefined, indices: Array(2)]
    ```
    
3.  **`class` 公共实例字段 & 私有字段（`#field`）静态字段（static）**  
    实现类的更强封装性，使用私有字段保护数据。  
    *示例*：
    ```js
    class Person {
      #privateField = 'secret';
      publicField = 'visible';
      
      static #employerName="Github"

      static #getEmployerName() {
        return #employerName
      }
    }
    ```
    *应用*：在模块化开发中保护内部状态。
4. **Array .at()**

    `.at()`方法用于通过传递负索引值来访问数组或字符串元素。即，它允许从数组末尾或字符串访问值。
    ```js
    const array = [1, 2, 3, 4, 5];
    console.log(array.at(-2)); // 4

    const string = '12345';
    console.log(string.at(-2));
    ```
5. **Error Cause**

    `cause`属性作为额外参数添加到 Error() 构造函数中，允许将错误链接起来，类似于错误链中类似 Java 的堆栈跟踪。
    ```js
    function processUserData(arrayData) {
       return arrayData.map(data => {
           try {
             const json = JSON.parse(data);
             return json;
           } catch (err) {
             throw new Error(
               `Data processing failed`,
               {cause: err}
             );
           }
         });
     }
    ```
6. **hasOwn**

    新的`Object.hasOwn()`方法是 `Object.prototype.hasOwnProperty` 的替换或改进版本。它是一个静态方法，如果指定对象将指定的属性作为其自己的属性，则返回 true。如果该属性是继承的或不存在，则该方法返回 false。
    
    **当`hasOwnProperty`被覆盖时：**
    
    在某些情况下，您需要在对象上定义自定义的 `hasOwnProperty` 。当你尝试应用`hasOwnProperty`来确定是否拥有自己的属性时，它会抛出错误，如下例所示。
    
    ```js
    const user = {
      age: 35, 
      hasOwnProperty: ()=> {
        return false;
      }
    };

    user.hasOwnProperty('age') // throws a TypeError
    
    user.hasOwn('age') // true
    ```
    
    **使用 create(null) 函数创建一个对象：**
    
    如果您借助 create(null) 函数创建新对象，则新创建的对象不会继承自 Object.prototype。所以它没有 hasOwnProperty 方法。
    ```js
    const user = Object.create(null);
    user.age = 35;
    user.hasOwnProperty('age'); // throws a TypeError
    
    user.hasOwn('age'); // true
    ```

### ES2021 (ES12)

1.  **String.prototype.replaceAll**  
    提供全局字符串替换功能，避免手动正则表达式。
    
    用于将某个字符串的所有出现位置替换为另一个字符串值。早些时候，如果不使用正则表达式，就不可能替换子字符串的所有实例。
    ```js
    console.log('10101010'.replace(new RegExp('0', 'g'), '1')); // 11111111
    console.log('01010101'.replace(/0/g, '1')); // 11111111
    
    // replaceAll
    console.log('10101010'.replaceAll('0', '1')); // 11111111
    console.log('01010101'.replaceAll('0', '1')); // 11111111
    ```
2.  **Promise.any**  
    返回第一个完成的 Promise（无论是否成功），更适合处理多个异步任务。
    ```js
    let promise1 = new Promise((resolve) => setTimeout(resolve, 100, 'Resolves after 100ms'));
    let promise2 = new Promise((resolve) => setTimeout(resolve, 200, 'Resolves after 200ms'));
    let promise3 = new Promise((resolve, reject) => setTimeout(reject, 0) );

    let promises = [promise1, promise2, promise3];

     Promise.any(promises)
         .then( value => console.log(value)); // Resolves after 100ms
    ```
    如果没有任何承诺得到解决，那么它会抛出`AggregateError`异常。
    ```js
    (async () => {
       try {
         const output = await Promise.any([
           Promise.reject('Error 1'),
           Promise.reject('Error 2'),
           Promise.reject('Error 3'),
         ]);
         console.log(`Output: ${output}`);
       } catch (err) {
         console.log(`Error: ${err.errors}`);
       }
     })(); 
     // Error: Error1,Error2,Error3
    ```
3.  **逻辑赋值运算符**  
    引入 `&&=`、`||=` 和 `??=` 运算符，简化常见逻辑操作。
4.  **WeakRefs**  
    引入弱引用和垃圾回收通知机制，提升对资源管理的控制。
    
    **WeakRef** 提供了两项新功能
    - 使用 WeakRef 类创建对对象的弱引用
    - 在对象被垃圾收集后，使用 FinalizationRegistry 类运行用户定义的终结器
    
    WeakRef 对一个对象的引用，如果它是内存中该对象的唯一引用，则不会阻止垃圾回收。当我们不想将对象永远保留在内存中时（例如，WebSocket），它很有用。弱引用的主要用途是实现到大型对象的缓存或映射，对于很少使用的对象，您不需要将其保留在内存中。
    
    在 ES12 之前，WeakMap 和 WeakSet 是 JavaScript 中弱引用对象的唯一方法。而 ES12 中的 WeakRef 提供了实际的弱引用，从而为了解对象的生命周期提供了一个窗口。
    
    ```js
    const myObject = new WeakRef({
      name: ‘Sudheer’,
      age: 34
    });
    
    console.log(myObject.deref()); //output: {name: “Sudheer”, age: 35}
    console.log(myObject.deref().name); //output: Sudheer
    ```
    
5. **FinalizationRegistry**

   允许您在对象被垃圾收集时请求回调。它用作清理回调。
   ```js
   // Create new FinalizationRegistry:
    const reg = new FinalizationRegistry((val) => {
      console.log(val);
    });

    (() => {
    // Create new object:
      const obj = {}

    // Register finalizer for the "obj" as first argument and value for callback function as second argument:
      reg.register(obj, 'obj has been garbage-collected.')
    })();
   ```
   
   **注意：** 完成回调不会在垃圾收集事件侦听器后立即运行，因此不要将其用于重要的逻辑或指标。

5.  **逻辑赋值运算符（`&&=`, `||=`, `??=`）**  
    逻辑赋值运算符将逻辑运算（&&、|| 或 ??）与赋值相结合。它们对于为变量分配默认值非常有用。 
    *示例*：
    ```js
     let x = 10;
     let y = 20;
     x &&= y;
     console.log(x); // 20

    let name = '';
    name ||= 'Default'; // 如果 name 是 false，赋值 'Default'
    
     let x;
     let y = 1;
     x ??= y;
     console.log(x); // 1
    ```

6. **Numeric Separators**

    数字分隔符通过使用下划线 (_) 提供数字之间的分隔，有助于在 JavaScript 中读取大数字（或数字文字）。换句话说，通过在数字组之间创建视觉分隔，数字文字更具可读性。
    ```js
    // 使用 _ 数字分隔符使十亿和一万亿变得更易读
    const billion = 1000_000_000;
    console.log(billion); // 1000000000

    const trillion = 1000_000_000_000n; // BigInt number
    console.log(trillion); // 1000000000000
    
    // 也可用于二进制和十六进制文字
    const binaryLiteral = 0b1010_1010;
    console.log(binaryLiteral);
    const hexLiteral = 0xFF_FF_FF_FF;
    console.log(hexLiteral);
    ```


### ES2020 (ES11) 

1.  **BigInt**  
    
    在早期的 JavaScript 版本中，使用 Number 类型存在限制。即，您无法安全地表示大于 pow(2, 53) 的整数值。
    
    在 ES2020 中，`BigInt`被引入作为**第七种基本类型**来表示大于 pow(2, 53) - 1（或 9007199254740991 或 Number.MAX_SAFE_INTEGER）的整数（任意精度的整数）。
    
    这是通过将`n`附加到整数文字的末尾或通过调用函数 BigInt() 创建的。
    ```js
    // 1. Current number system
    const max = Number.MAX_SAFE_INTEGER;
    console.log(max + 1) // 9007199254740992
    console.log(max + 2) // 9007199254740992

    // 2. BigInt representation
    const bigInt = 9007199254740991n;
    const bigIntConstructorRep = BigInt(9007199254740991); // 9007199254740991n
    const bigIntStringRep = BigInt("9007199254740991"); // 9007199254740991n

    // 3. Typeof usage

    console.log(typeof 1)// number
    console.log(typeof 1n)// bigint
    console.log(typeof BigInt('1'))// bigint

    // 4. Operators

    const previousMaxNum = BigInt(Number.MAX_SAFE_INTEGER);
    console.log(previousMaxNum + 2n); //9007199254740993n (this was not possible before)
    console.log(previousMaxNum -2n); //9007199254740990n
    console.log(previousMaxNum * 2n); //18014398509481982n
    console.log(previousMaxNum % 2n); //1n
    console.log(previousMaxNum / 2n); // 4503599627370495n

    // 5. comparison
    console.log(1n === 1); // false
    console.log(1n === BigInt(1)); // true
    console.log(1n == 1); // true
    ```
2.  **Dynamic Import**  
    动态加载模块，通过 `import()` 实现异步模块加载。
    
    `dynamic import`以有条件或按需加载模块。由于它返回所请求模块的模块命名空间对象的承诺，因此现在可以使用 async/await 将模块解析或导入分配给变量，如下所示
    ```js
    <script>
    const moduleSpecifier = './message.js';
    import(moduleSpecifier)
      .then((module) => {
        module.default(); // Hello, default export
        module.sayGoodBye(); //Bye, named export
      })
      .catch(err => console.log('loading error'));
    </script>
    ```
    
    ```js
    <script>
    (async function() {
      const moduleSpecifier = './message.js';
      const messageModule = await import(moduleSpecifier);
      messageModule.default(); // Hello, default export
      messageModule.sayGoodBye(); //Bye, named export
    })();
    </script>
    ```
    导入的模块同时显示默认导出和命名导出
    ```js
    export default () => {
      return "Hello, default export";
    }
    export const sayGoodBye = () => {
      return "Bye, named export"
    }
    ```
    **注意：** 动态导入不需要`type="module"`的脚本
    
3.  **Nullish Coalescing Operator (??)**  
    提供更安全的空值判断操作符。
    
    **空值合并运算符**（ **`??`** ）是一个逻辑运算符，当左侧的操作数为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 或者 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 时，返回其右侧操作数，否则返回左侧操作数。
    ```js
    const foo = null ?? 'default string';
    console.log(foo);
    // Expected output: "default string"

    const baz = 0 ?? 42;
    console.log(baz);
    // Expected output: 0
    ```
    
4.  **Optional Chaining (?.)**  
    优化深层属性访问，避免手动检查每个层级。
    
    **可选链运算符（`?.`）**  用于访问对象的属性或调用函数。如果使用此运算符访问的对象或调用的函数是 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 或 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)，则表达式会短路并计算为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，而不是抛出错误。
    ```js
    const adventurer = {
      name: 'Alice',
      cat: {
        name: 'Dinah',
      },
    };

    const dogName = adventurer.dog?.name;
    console.log(dogName);
    // Expected output: undefined

    console.log(adventurer.someNonExistentMethod?.());
    // Expected output: undefined
    ```
    
5.  **Promise.allSettled**  
    等待所有 Promise 结果（成功或失败）完成后返回。
    
    静态方法将一个 Promise 可迭代对象作为输入，并返回一个单独的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。当所有输入的 Promise 都已敲定时（包括传入空的可迭代对象时），返回的 Promise 将被兑现，并带有描述每个 Promise 结果的对象数组。
    ```js
    const promise1 = Promise.resolve(3);
    const promise2 = new Promise((resolve, reject) =>
      setTimeout(reject, 100, 'foo'),
    );
    const promises = [promise1, promise2];

    Promise.allSettled(promises).then((results) =>
      results.forEach((result) => console.log(result.status)),
    );

    // Expected output:
    // "fulfilled"
    // "rejected"
    ```
    
6.  **可选链（`?.`）**  
    访问嵌套对象属性时避免 `undefined` 或 `null` 错误。  
    *示例*：
    ```js
    const user = { profile: { name: 'Alice' } };
    console.log(user?.profile?.name);
    ```
7. **String matchAll**

    **`matchAll()`**  方法返回一个迭代器，该迭代器包含了检索字符串与[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions)进行匹配的所有结果（包括[捕获组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences)）。
    ```js
    const regexp = /t(e)(st(\d?))/g;
    const str = 'test1test2';

    const array = [...str.matchAll(regexp)];

    console.log(array[0]);
    // Expected output: Array ["test1", "e", "st1", "1"]

    console.log(array[1]);
    // Expected output: Array ["test2", "e", "st2", "2"]
    ```
8. **globalThis**

    在 ES2020 之前，仅仅为了访问全局对象就需要在不同的JavaScript环境（跨平台）中编写不同的语法。对于开发人员来说这确实是一个困难时期，因为你需要在浏览器端使用`window, self, or frames` ，在 Nodejs 上使用`global` ，在 Web Workers 端`self` 。
    
    另一方面， `this`关键字可以在非严格模式的函数内部使用，但在严格模式下它会给出 undefined 。如果您将`Function('return this')()`视为上述环境的解决方案，那么对于启用 CSP 的环境（其中 eval() 被禁用），它将失败。
    
    ```js
    var getGlobal = function () {
      if (typeof self !== 'undefined') { return self; }
      if (typeof window !== 'undefined') { return window; }
      if (typeof global !== 'undefined') { return global; }
      throw new Error('unable to locate global object');
    };

    var globals = getGlobal();

    if (typeof globals.setTimeout !== 'function') {
      console.log('no setTimeout in this environment or runtime');
    }
    
    // globalThis
    if (typeof globalThis.setTimeout !== 'function') {
      console.log('no setTimeout in this environment or runtime');
    }
    ```

    全局属性 `globalThis` 包含全局的 `this` 值，类似于全局对象（global object）。
    ```js
    function canMakeHTTPRequest() {
      return typeof globalThis.XMLHttpRequest === 'function';
    }

    console.log(canMakeHTTPRequest());
    // Expected output (in a browser): true
    ```

9. **import.meta**

    `import.meta`对象是由 ECMAScript 实现使用 null 原型创建的，用于获取有关 JavaScript 模块的上下文特定元数据。假设您正在尝试从脚本加载`my-module` ，
    ```js
    <script type="module" src="my-module.js"></script>
    
    console.log(import.meta); // { url: "file:///home/user/my-module.js" }
    ```
    
    **注意：** 记住`import`并不是真正的对象，但`import.meta`是作为可扩展的对象提供的，并且其属性是可写的、可配置的和可枚举的。
    
10. **for..in order**

    在 ES2020 之前，规范没有指定 (a in b) 的运行顺序。尽管大多数 javascript 引擎/浏览器按照定义的顺序循环访问对象的属性，但并非所有情况都是如此。这已在 ES2020 中正式标准化。
    ```js
    var object = {
      'a': 2,
      'b': 3,
      'c': 4
    }


    for(let key in object) {
      console.log(key); // a b c
    }
    ```

### ES2019 (ES10)

1.  **Array.prototype.flat & flatMap**  
    提供数组扁平化操作及映射后扁平化的功能。
    
    `flat()`方法，将嵌套数组“展平”到顶层数组中。该方法的功能类似于Lodash的`_.flattenDepth()`函数。此方法接受一个可选参数，该参数指定嵌套数组应展平的级别数，默认嵌套级别为 1。 
    
    **注意：** 如果数组中有任何空槽，它们将被丢弃。
    
    ```js
     const numberArray = [[1, 2], [[3], 4], [5, 6]];
     const charArray = ['a', , 'b', , , ['c', 'd'], 'e'];
     const flattenedArrOneLevel = numberArray.flat(1);
     const flattenedArrTwoLevel = numberArray.flat(2);
     const flattenedCharArrOneLevel = charArray.flat(1);

     console.log(flattenedArrOneLevel); // [1, 2, [3], 4, 5, 6]
     console.log(flattenedArrTwoLevel); // [1, 2, 3, 4, 5, 6]
     console.log(flattenedCharArrOneLevel); // ['a', 'b', 'c', 'd', 'e']
    ```
    
    而**flatMap()** 方法将`map()`和`flat()`合并为一个方法。它首先使用给定函数的返回值创建一个新数组，然后连接该数组的所有子数组元素。
    
    ```js
    const numberArray1 = [[1], [2], [3], [4], [5]];

    console.log(numberArray1.flatMap(value => [value * 10])); 
    // [10, 20, 30, 40, 50]
    ```
    
    
2.  **Object.fromEntries**  
    将键值对列表转换为对象的快捷方法。
    
    ```js
    // Object to Array: 
     const obj = {'a': '1', 'b': '2', 'c': '3' };
     const arr = Object.entries(obj);
     console.log(arr); // [ ['a', '1'], ['b', '2'], ['c', '3'] ]
    ```
    
    ```js
    // Array to Object: 
    const arr = [ ['a', '1'], ['b', '2'], ['c', '3'] ];
    let obj = {}
    for (let [key, val] of arr) {
        obj[key] = val;
    }
    console.log(obj);
    
     const arr = [ ['a', '1'], ['b', '2'], ['c', '3'] ];
     const obj = Object.fromEntries(arr);
     console.log(obj); // { a: "1", b: "2", c: "3" }
    ```
    
    此方法使用的常见情况之一是使用 URL 的查询参数，
    
    ```js
     const paramsString = 'param1=foo&param2=baz';
     const searchParams = new URLSearchParams(paramsString);

     Object.fromEntries(searchParams);    
     // => {param1: "foo", param2: "baz"}
    ```
    
3.  **String.trimStart & trimEnd**  
    去除字符串两端多余空格的便捷方法。
    
    为了与padStart/padEnd保持一致，ES2019提供了标准函数`trimStart`和`trimEnd`来修剪字符串开头和结尾的空格。然而，为了网络兼容性（避免任何损坏）， `trimLeft`和`trimRight`将分别是`trimStart`和`trimEnd`的别名。
    ```js
     //Prior ES2019
     let messageOne = "   Hello World!!    ";
     console.log(messageOne.trimLeft()); //Hello World!!
     console.log(messageOne.trimRight()); //   Hello World!!

     //With ES2019
     let messageTwo = "   Hello World!!    ";
     console.log(messageTwo.trimStart()); //Hello World!!
     console.log(messageTwo.trimEnd()); //   Hello World!!
    ```
4.  **Optional Catch Binding**  
    `catch` 块中捕获变量为可选项，允许忽略错误对象。
    ```js
     // With binding parameter(<ES9)
     try {
       ···
     } catch (error) {
       ···
     }
     // Without binding parameter(ES9)
     try {
       ···
     } catch {
       ···
     }
    ```
5.  **Symbol description** 

    ES2019 引入了只读描述属性来检索包含符号描述的字符串。
    ```js
    console.log(Symbol('one').description); // one

    console.log(Symbol.for('one').description); // "one"

    console.log(Symbol('').description); // ''

    console.log(Symbol().description); // unefined

    console.log(Symbol.iterator.description); // "Symbol.iterator"
    ```

6. **JSON Improvements**

    **JSON Superset**
    
    在 ES2019 之前，ECMAScript 声称 JSON 是 JSON.parse 的子集，但事实并非如此。因为与 JSON 字符串不同，ECMAScript 字符串文字不能包含字符`U+2028` （行分隔符）和`U+2029` （段落分隔符）。如果您仍然使用这些字符，则会出现语法错误。作为解决方法，您必须使用转义序列将它们放入字符串中。
    ```js
    eval('"\u2028"'); // SyntaxError
    ```
    
    而 JSON 字符串可以同时包含 U+2028 和 U+2029 而不会产生错误。
    ```js
    console.log(JSON.parse('"\u2028"')); // ''
    ```
    
    ES2019 中取消了此限制。这简化了规范，无需针对 ECMAScript 字符串文字和 JSON 字符串文字制定单独的规则。
    
    **格式良好的 JSON.Stringify()：**  在 ES2019 之前，如果输入中存在任何单独代理，则使用 JSON.stringify 方法返回未形成的 Unicode 字符串（格式错误的 Unicode 字符串）。
    
    ```js
    console.log(JSON.stringify("\uD800")); // '"�"'
    ```
    
    而在 ES2019 中，JSON.stringify 输出单独代理的转义序列，使其输出有效的 Unicode 并可以用 UTF-8 表示。
    ```js
    console.log(JSON.stringify("\uD800")); // '"\ud800"'
    ```
    
7. **Function.toString()**

    函数有一个名为`toString()`的实例方法，它返回一个字符串来表示函数代码。以前版本的 ECMAScript 删除了函数代码中的空格、换行和注释，但在 ES2020 中保留了原始源代码。
    ```js
    function sayHello(message) {
        let msg = message;
        //Print message
        console.log(`Hello, ${msg}`);
    }

    console.log(sayHello.toString());
    // function sayHello(message) {
    //       let msg = message;
    //       //Print message
    //       console.log(`Hello, ${msg}`);
    //   }
    ```

### ES2018 (ES9) 

1.  **Asynchronous Iteration**  
    支持异步迭代协议，用于处理异步数据流。
2.  **Promise.prototype.finally**  
    为 Promise 增加 `finally` 方法，便于清理操作。
    ```js
    let isLoading = true;
    
      fetch('http://somesite.com/users')
         .then(data => data.json())
         .catch(err => console.error(err))
         .finally(() => {
           isLoading = false;
           console.log('Finished loading!!');
         })
    ```
3.  **Rest/Spread Properties**  
    支持对象的解构与扩展操作符。
    ```js
     function myfunc1({ a, ...x }) {
       console.log(a, x); // 1, { b: 2, c: 3, d:4 }
     }
     myfunc1({
       a: 1,
       b: 2,
       c: 3,
       d: 4
     });
     
    const myObject = { a: 1, b: 2, c: 3, d:4 };
    const myNewObject = { ...myObject, e: 5 }; // { a: 1, b: 2, c: 3, d: 4, e: 5 }
    ```
4.  **RegExp 的增强**
    -  新增 `s` 修饰符（dotAll 模式）。
    -  支持命名捕获组和反向引用。
    -  支持后行断言。

### ES2017 (ES8) 

1.  **SharedArrayBuffer 和 Atomics**  
    增强对共享内存和多线程操作的支持。
    
    Atomics 是一个全局对象，它提供作为静态方法执行的原子操作。它们与 SharedArrayBuffer（固定长度二进制数据缓冲区）对象一起使用。这些方法的主要用例是，

    **原子操作：** 当内存共享时，多个线程可以在内存中读写相同的数据。因此存在数据丢失的可能性。但原子操作可确保写入和读取可预测的值、操作在下一个操作开始之前完成并且操作不会中断。
    
    它提供了静态方法，例如 add、or、and、xor、load、store、isLockFree 等
    ```js
    const sharedMemory = new SharedArrayBuffer(1024);
    const sharedArray = new Uint8Array(sharedMemory);
    sharedArray[0] = 10;

    Atomics.add(sharedArray, 0, 20);
    console.log(Atomics.load(sharedArray, 0)); // 30

    Atomics.sub(sharedArray, 0, 10);
    console.log(Atomics.load(sharedArray, 0)); // 20

    Atomics.and(sharedArray, 0, 5);
    console.log(Atomics.load(sharedArray, 0));  // 4

    Atomics.or(sharedArray, 0, 1);
    console.log(Atomics.load(sharedArray, 0));  // 5

    Atomics.xor(sharedArray, 0, 1);
    console.log(Atomics.load(sharedArray, 0)); // 4

    Atomics.store(sharedArray, 0, 10); // 10

    Atomics.compareExchange(sharedArray, 0, 5, 10);
    console.log(Atomics.load(sharedArray, 0)); // 10

    Atomics.exchange(sharedArray, 0, 10);
    console.log(Atomics.load(sharedArray, 0)); //10

    Atomics.isLockFree(1); // true
    ```
    
    **等待通知：**  `wait()`和`notify()`方法都提供了等待直到某个条件变为真的方法，并且通常用作阻塞结构。
    
    ```js
    // 定义共享内存和数组
    const sharedMemory = new SharedArrayBuffer(1024);
    const sharedArray = new Int32Array(sharedMemory);
    
    // 读取线程正在睡眠并等待位置 0，该位置预计为 10。
    // 在该值被写入线程覆盖后，您可以观察到不同的值。
    Atomics.wait(sharedArray, 0, 10);
    console.log(sharedArray[0]); // 100
    
    // 现在写入线程存储一个新值（例如，100）并通知等待线程，
    Atomics.store(sharedArray, 0, 100);
    Atomics.notify(sharedArray, 0, 1);
    ```
    
2.  **String.prototype.padStart & padEnd**  
    增加字符串补全功能。
    
    **padStart()：** 使用此方法，填充应用于字符串的左侧或开头。
    ```js
    // 例如，出于安全原因，您可能只想显示信用卡号的最后四位数字，
    const cardNumber = '01234567891234';
    const lastFourDigits = cardNumber.slice(-4);
    const maskedCardNumber = lastFourDigits.padStart(cardNumber.length, '*');
    console.log(maskedCardNumber); // expected output: "**********1234"
    ```
    **padEnd()：** 使用此方法，填充应用于字符串的右侧或结尾侧。
    ```js
    const label1 = "Name";
    const label2 = "Phone Number";
    const value1 = "John"
    const value2 = "(222)-333-3456";

    console.log((label1 + ': ').padEnd(20, ' ') + value1); 
    // Name:                     John
    console.log(label2 + ": " + value2); 
    // Phone Number: (222)-333-3456
    ```
    
3.  **`Async/Await`**  
    使异步操作写法更像同步代码，提升代码可读性。  
    *示例*：
    ```js
    async function fetchData() {
      const response = await fetch('/api');
      return response.json();
    }
    ```
4. **Object values**

    ```js
    const countries = {
       IN: 'India',
       SG: 'Singapore',
     }
     Object.values(countries) // ['India', 'Singapore']
     
    console.log(Object.values(['India', 'Singapore'])); // ['India', 'Singapore']
    console.log(Object.values('India')); // ['I', 'n', 'd', 'i', 'a']
    ```
5. **Object entries**

    ```js
    const countries = {
     IN: 'India',
     SG: 'Singapore',
   }
   Object.entries(countries) 
   // [["IN", "India"], ["SG", "Singapore"]]
   
   
   const countriesArr = ['India', 'Singapore'];
   console.log(Object.entries(countriesArr)); 
   // [ ['0', 'India'], ['1', 'Singapore']]

   const country = 'India';
   console.log(Object.entries(country)); 
   // [["0", "I"], ["1", "n"], ["2", "d"], ["3", "i"], ["4", "a"]]

   console.log(Object.entries(100)); 
   // [], an empty array for any primitive type because it won't have any own properties
    ```
    
6. **Object property descriptors**

    `Object.getOwnPropertyDescriptors()` 方法返回给定对象的所有自己的属性描述符。
    - **value：** 与属性关联的值（仅限数据描述符）。
    - **writable:**  true 当且仅当与属性关联的值可以更改时
    - **get：** 充当属性的 getter 的函数。
    - **set：** 充当属性设置器的函数。
    - **configurable：** 当且仅当该属性描述符的类型可以更改或删除时为 true。
    - **enumerable:** 当且仅当该属性在属性枚举期间出现时才为 true。
    
    ```js
    const profile = {
       age: 42
     };

     const descriptors = Object.getOwnPropertyDescriptors(profile);
     console.log(descriptors); //  {age: {configurable: true, enumerable: true, writable: true }}
    ```
    
7. **尾随逗号**

    ```js
    // 参数定义和函数调用中允许使用尾随逗号
     function func(a,b,) { // declaration
       console.log(a, b);
     }
    func(1,2,); // invocation
    
    // 但如果函数参数定义或函数调用只包含逗号，则会抛出语法错误
     function func1(,) {  // SyntaxError: missing formal parameter
       console.log('no args');
     };
    func1(,); // SyntaxError: expected expression, got ','
    ```
    
    **注意：**  Rest 参数和 JSON 中不允许使用尾随逗号。
    
### ES2016 (ES7)

1.  **Array.prototype.includes**  
    数组中支持更直观的元素存在性检查。
    ```js
    const array = [1,2,3,4,5,6];
    if(array.includes(5)){
      console.log("Found an element");
    }
    ```
    
    `Array.prototype.includes()`比`Array.prototype.indexOf()`方法更好地处理 NaN 和 Undefined 值。即，如果数组包含 NaN 和 Undefined 值，则在搜索 NaN 和 Undefined 时， `indexOf()`不会返回正确的索引。
    
    ```js
    let numbers = [1, 2, 3, 4, NaN, ,];
    console.log(numbers.indexOf(NaN)); // -1
    console.log(numbers.indexOf(undefined)); // -1
    ```
    
    另一方面， `includes`方法能够找到这些元素
    
    ```js
    let numbers = [1, 2, 3, 4, NaN, ,];
    console.log(numbers.includes(NaN)); // true
    console.log(numbers.includes(undefined)); // true
    ```
2.  **指数操作符（** ）**  
    使用 `**` 代替 `Math.pow`，提高数学操作的可读性。
    ```js
    //Prior ES7
    const cube = x => Math.pow(x, 3);
    console.log(cube(3)); // 27

    //Using ES7
    const cube1 = x => x ** 3;
    console.log(cube1(3)); // 27
    ```

### ES2015 (ES6) 

1.  **Let & Const**  
    新增块级作用域变量声明方式。
2.  **Arrow Functions**  
    引入箭头函数，简化函数表达式语法。
3.  **Template Literals**  
    提供模板字符串
4.  **Classes**

    同时可以使用 `extend` 关键字来使用继承

5.  **对象解构**

6.  **扩展运算符**

7.  **Modules**

8.  **Set**

    Set 是一个内置对象，用于存储任何类型的唯一值的集合。

9.  **Weakset**

10. **Map**

11. **Weakmap**

12. **Symbols**

13. **Proxies**

14. **Promises**

15. **Reflect**

16. **Array.find()和Array.findIndex()**



