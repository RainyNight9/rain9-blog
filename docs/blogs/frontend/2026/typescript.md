# TypeScript

## 一、核心概念与类型收窄

- any / unknown / never / void 的区别与使用场景
  - any：放弃类型检查，传染性强
  - unknown：需先收窄后使用，更安全
  - never：不可达或不会返回的类型
  - void：函数无返回值

```ts
function f1(x: any) { x.trim() }
function f2(x: unknown) { if (typeof x === "string") x.trim() }
function f3(): never { throw new Error("boom") }
function f4(): void {}
```

- 类型收窄与可辨识联合（discriminated union）
  - 通过 typeof / instanceof / in / 字面量标签进行收窄

```ts
type Shape =
  | { kind: "circle"; r: number }
  | { kind: "rect"; w: number; h: number }

function area(s: Shape) {
  switch (s.kind) {
    case "circle": return Math.PI * s.r * s.r
    case "rect": return s.w * s.h
  }
}
```

- 可选、非空与空值处理：?. / ?? / !

```ts
type User = { profile?: { name?: string } }
const u: User = {}
const n1 = u.profile?.name ?? "anonymous"
const n2 = (u.profile!.name as string)
```

- keyof 与 typeof 的配合

```ts
const config = { host: "a", port: 80 }
type Config = typeof config
type Keys = keyof Config
```

- 交叉类型与联合类型的差异
  - 联合：A | B，取并集
  - 交叉：A & B，需同时满足

```ts
type A = { a: number }
type B = { b: string }
type U = A | B
type I = A & B
```

## 二、泛型与高级类型

- 泛型约束与默认参数

```ts
type IdOf<T extends { id: string } = { id: string }> = T["id"]
```

- 条件类型与分布式条件类型

```ts
type Nullable<T> = T | null | undefined
type NonNullable<T> = T extends null | undefined ? never : T
type Dist<T> = T extends any ? T[] : never
type R = Dist<string | number>
```

- infer 的典型使用

```ts
type Awaited<T> = T extends Promise<infer U> ? U : T
type Return<T> = T extends (...args: any) => infer R ? R : never
type Params<T> = T extends (...args: infer P) => any ? P : never
```

- 映射类型与键重映射

```ts
type Readonly<T> = { readonly [K in keyof T]: T[K] }
type Optional<T> = { [K in keyof T]?: T[K] }
type Rename<T> = { [K in keyof T as `new_${Extract<K, string>}`]: T[K] }
```

- 索引签名与记录类型

```ts
type Dict = { [k: string]: number }
type Rcd = Record<string, number>
```

- 函数类型的协变/逆变与 strictFunctionTypes

```ts
class Animal {}
class Dog extends Animal {}
type FnA = (a: Animal) => void
type FnD = (d: Dog) => void
let fa: FnA
let fd: FnD
fa = fd
```

## 三、工程实践与模块化

- 类型空间与值空间分离，import type

```ts
import type { Config } from "./types"
```

- 声明合并与模块增强

```ts
declare global {
  interface Window { appVersion: string }
}
```

- tsconfig 严格模式关键项
  - strict / noImplicitAny / strictNullChecks / exactOptionalPropertyTypes

- API 类型建模与错误处理

```ts
type Result<T, E = string> = { ok: true; data: T } | { ok: false; error: E }
```

- React 专项
  - Props 类型、children、事件类型

```tsx
type ButtonProps = { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; children?: React.ReactNode }
const Button = (p: ButtonProps) => <button onClick={p.onClick}>{p.children}</button>
```

## 四、手写 Utility Types

- DeepReadonly / DeepPartial

```ts
type DeepReadonly<T> =
  T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T

type DeepPartial<T> =
  T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T
```

- Mutable

```ts
type Mutable<T> = { -readonly [K in keyof T]: T[K] }
```

- PickByValue

```ts
type PickByValue<T, V> = { [K in keyof T as T[K] extends V ? K : never]: T[K] }
```

- UnionToIntersection

```ts
type UnionToIntersection<U> =
  (U extends any ? (x: U) => any : never) extends (x: infer I) => any ? I : never
```

## 五、模板字面量类型技巧

- 路径拼接与受限路由

```ts
type Route = "/home" | "/user" | "/search"
type WithId<R extends string> = `${R}/${string}`
type UserDetail = WithId<"/user">
```

- 类型级字符串转换（驼峰/短横线）

```ts
type Kebab<S extends string> =
  S extends `${infer H}${infer T}`
    ? `${Lowercase<H>}${T extends Capitalize<T> ? `-${Lowercase<T>}` : T}`
    : S
```

## 六、常见陷阱与最佳实践

- enum vs const enum 的编译差异与性能影响
- 数字枚举的反向映射导致的可枚举性问题
- any 污染链，应优先 unknown 并收窄
- as const 的使用与不可变数据建模
- Date 与字符串时间的建模选择

```ts
const a = { x: 1, y: 2 } as const
type A = typeof a
```

## 七、综合题（思路与实现）

- 题：实现一个类型 SafeGet<T, P>，从对象类型 T 中按路径 P 提取类型

```ts
type Split<S extends string> =
  S extends `${infer H}.${infer T}` ? [H, ...Split<T>] : [S]

type SafeGet<T, P extends string> =
  Split<P> extends [infer H extends keyof T, ...infer R]
    ? R["length"] extends 0
      ? T[H]
      : SafeGet<T[H], Extract<R, string[]>[number]>
    : never
```

- 题：将联合类型转换为并集对象键

```ts
type UnionKeys<T> = T extends any ? keyof T : never
type U = { a: number } | { b: string } | { c: boolean }
type K = UnionKeys<U>
```

---

面试使用建议：
- 先讲场景与痛点，再用两到三个高级类型题展示深度
- 结合真实工程实践（tsconfig、声明增强、SDK 类型建模）证明落地能力
- 适当写出 Utility Types 与模板字面量题，体现类型编程思维
