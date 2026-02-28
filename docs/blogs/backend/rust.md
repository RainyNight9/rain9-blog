# Rust

## 1. Rust 基础知识

官网：：https://www.rust-lang.org/

### 1.1 安装 && 更新

安装文档：：https://www.rust-lang.org/tools/install

打开文档，它会检测出你电脑系统，会推荐你安装的方式及版本。

**推荐使用 Rustup 安装方式**

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

rustup update

rustc --version

rustup self uninstall
```

### 1.2 编译器与包管理工具以及开发环境搭建

Rust 编程语言的编译器 rustc

- 查看版本
- 编译生成二进制文件
- 编译生成库文件

```bash
rustc --version

rustc -o output_filename filename.rs

rustc --crate-type lib filename.rs
```

```bash
# 初始化项目
cargo init

# 新建项目（会创建新文件夹）
cargo new rust-demo

# 运行项目
cargo run

# 构建
cargo build

# 新增依赖
cargo add

# rustc 编译
rustc xxx
```

### 1.3 获取 Rust 的库、自内涵以及 Windows 与 Linux 和 Mac 的不同

## 2. 变量与常见数据类型
### 2.1 变量与不可变性
### 2.2 变量 const 与 静态变量 static
### 2.3 Rust基础数据类型
### 2.4 元组与数组

## 3. Ownership 与 结构体、枚举
### 3.1 Rust的内存管理模型
### 3.2 String 与 &str
### 3.3 枚举与匹配模式
### 3.4 结构体、方法、关联函数、关联变量
### 3.5 Ownership与结构体
### 3.6 拷贝与转、Copy与Move

## 4. 流程控制与函数
### 4.1 if 流程控制 与 match 模式匹配
### 4.2 循环 与 break continue 以及与迭代的区别
### 4.3 函数基础与Copy值参数传递
### 4.4 函数值参数传递、不可变借用参数传递、可变借用参数传递
### 4.5 函数返回值与所有权机制
### 4.6 高阶函数 函数作为参数与返回值

## 5. Error 错误处理
### 5.1 错误处理之：Result、Option以及panic宏
### 5.2 错误处理之：unwrap()与'?'
### 5.3 自定义一个Error类型

## 6. Borrowing借用 && Lifetime 生命周期
### 6.1 Borrowing && Borrow Checker && Lifetime
### 6.2 Lifetime 与 函数
### 6.3 Lifetime 与 Struct

## 7. 泛型
### 7.1 Generic Structures
### 7.2 Generic Function

## 8. 特质
### 8.1 Trait 特质
### 8.2 Trait Object 与 Box
### 8.3 Trait Object 与 泛型
### 8.4 重载操作符(Operator)
### 8.5 Trait与多态和继承
### 8.6 常见的Trait

## 9. 迭代器
### 9.1 迭代与循环
### 9.2 IntoIterator、Iterator 和 Iter 之间的关系
### 9.3 获取迭代器的三种方法iter()、iter_mut() 和into_iter()
### 9.4 自定义类型实现Iter()、iter_mut()和into_iter()

## 10. 闭包
### 10.1 闭包基础概念
### 10.2 闭包获取参数 by reference 与 by value
### 10.3 闭包是怎么工作的
### 10.4 闭包类型FnOnce、FnMut和Fn做函数参数的实例