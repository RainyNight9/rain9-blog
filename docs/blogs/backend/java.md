# Java

## 目录

<!-- toc -->

- [核心学习路径 (路线图)](#%E6%A0%B8%E5%BF%83%E5%AD%A6%E4%B9%A0%E8%B7%AF%E5%BE%84-%E8%B7%AF%E7%BA%BF%E5%9B%BE)
- [常见高频面试题精选](#%E5%B8%B8%E8%A7%81%E9%AB%98%E9%A2%91%E9%9D%A2%E8%AF%95%E9%A2%98%E7%B2%BE%E9%80%89)
  * [基础篇](#%E5%9F%BA%E7%A1%80%E7%AF%87)
    + [1. `String`、`StringBuffer` 和 `StringBuilder` 的区别？](#1-stringstringbuffer-%E5%92%8C-stringbuilder-%E7%9A%84%E5%8C%BA%E5%88%AB)
    + [2. `==` 和 `equals()` 的区别？](#2--%E5%92%8C-equals-%E7%9A%84%E5%8C%BA%E5%88%AB)
    + [3. 接口 (Interface) 和 抽象类 (Abstract Class) 的区别？](#3-%E6%8E%A5%E5%8F%A3-interface-%E5%92%8C-%E6%8A%BD%E8%B1%A1%E7%B1%BB-abstract-class-%E7%9A%84%E5%8C%BA%E5%88%AB)
  * [集合篇](#%E9%9B%86%E5%90%88%E7%AF%87)
    + [4. `HashMap` 的底层实现原理是什么？](#4-hashmap-%E7%9A%84%E5%BA%95%E5%B1%82%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88)
    + [5. `ConcurrentHashMap` 是如何保证线程安全的？](#5-concurrenthashmap-%E6%98%AF%E5%A6%82%E4%BD%95%E4%BF%9D%E8%AF%81%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E7%9A%84)
  * [并发篇](#%E5%B9%B6%E5%8F%91%E7%AF%87)
    + [6. 线程池的创建方式及核心参数？](#6-%E7%BA%BF%E7%A8%8B%E6%B1%A0%E7%9A%84%E5%88%9B%E5%BB%BA%E6%96%B9%E5%BC%8F%E5%8F%8A%E6%A0%B8%E5%BF%83%E5%8F%82%E6%95%B0)
    + [7. 什么是 `ThreadLocal`？存在什么问题？](#7-%E4%BB%80%E4%B9%88%E6%98%AF-threadlocal%E5%AD%98%E5%9C%A8%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98)
  * [JVM 与框架篇](#jvm-%E4%B8%8E%E6%A1%86%E6%9E%B6%E7%AF%87)
    + [8. JVM 内存区域是怎么划分的？](#8-jvm-%E5%86%85%E5%AD%98%E5%8C%BA%E5%9F%9F%E6%98%AF%E6%80%8E%E4%B9%88%E5%88%92%E5%88%86%E7%9A%84)
    + [9. Spring 的 IoC 和 AOP 是什么？](#9-spring-%E7%9A%84-ioc-%E5%92%8C-aop-%E6%98%AF%E4%BB%80%E4%B9%88)
    + [10. Spring Boot 自动装配原理？](#10-spring-boot-%E8%87%AA%E5%8A%A8%E8%A3%85%E9%85%8D%E5%8E%9F%E7%90%86)

<!-- tocstop -->

## 核心学习路径 (路线图)

作为一个合格的 Java 开发，或者想要转/了解后端的同学，可以按照以下路线进行体系化学习：

1. **Java SE 基础**
   - 面向对象三大特性（封装、继承、多态）
   - 基本数据类型、包装类、自动装箱/拆箱
   - 异常处理机制（Exception vs Error）
   - 反射与注解（AOP 的基础）
2. **集合框架 (Collections)**
   - `List`: `ArrayList`, `LinkedList` 的底层结构与适用场景
   - `Set`: `HashSet`, `TreeSet` 及其去重原理
   - `Map`: `HashMap` (JDK 1.7 vs 1.8), `ConcurrentHashMap` 的线程安全实现
3. **并发编程 (JUC)**
   - 线程与进程、线程的生命周期
   - 线程池（`ThreadPoolExecutor` 的 7 大核心参数及工作原理）
   - 锁机制：`synchronized` 的锁升级过程、`ReentrantLock` (AQS 原理)、CAS 乐观锁
   - `ThreadLocal` 内存泄漏问题及应用场景
4. **JVM (Java 虚拟机)**
   - 内存模型（堆、栈、方法区/元空间、程序计数器）
   - 垃圾回收机制（GC 算法：标记清除、复制、标记整理；GC 收集器：CMS, G1）
   - 类加载机制（双亲委派模型及打破双亲委派）
5. **主流框架生态**
   - **Spring**: IoC（控制反转）与 AOP（面向切面编程）的实现原理
   - **Spring Boot**: 自动装配原理、Starter 机制
   - **MyBatis**: ORM 映射、缓存机制（一级/二级缓存）、动态 SQL

---

## 常见高频面试题精选

### 基础篇

#### 1. `String`、`StringBuffer` 和 `StringBuilder` 的区别？
- **`String`**：不可变类（底层由 `final byte[]` 或 `char[]` 修饰），每次修改都会产生新的对象，适合少量字符串操作。
- **`StringBuffer`**：可变类，线程安全（方法上加了 `synchronized` 锁），性能较差，适合多线程环境下的字符串拼接。
- **`StringBuilder`**：可变类，线程不安全，性能最高，适合单线程下大量字符串拼接。

#### 2. `==` 和 `equals()` 的区别？
- `==`：对于基本数据类型，比较的是**值**；对于引用类型，比较的是**内存地址**。
- `equals()`：默认情况下（继承自 `Object`）与 `==` 一样比较地址；但大多数类（如 `String`、`Integer`）都重写了该方法，用于比较**对象的内容是否相等**。

#### 3. 接口 (Interface) 和 抽象类 (Abstract Class) 的区别？
- **设计理念**：接口是对“行为”的抽象（像是一个契约）；抽象类是对“本质”的抽象（是一种模板）。
- **实现机制**：一个类可以实现多个接口（`implements`），但只能继承一个抽象类（`extends`）。
- **成员变量**：接口中的变量默认都是 `public static final` 的常量；抽象类中可以有普通成员变量。

---

### 集合篇

#### 4. `HashMap` 的底层实现原理是什么？
- **JDK 1.7**：数组 + 链表。使用头插法，在多线程并发扩容时容易产生死循环（环形链表）。
- **JDK 1.8**：数组 + 链表 + 红黑树。当链表长度大于 8 且数组长度大于 64 时，链表会转化为红黑树，将查询时间复杂度从 O(n) 降低到 O(log n)；同时改用尾插法解决了死循环问题。

#### 5. `ConcurrentHashMap` 是如何保证线程安全的？
- **JDK 1.7**：采用 **分段锁 (Segment)** 机制，将整个 Map 分成多个 Segment，每次只锁住一个 Segment，默认支持 16 的并发度。
- **JDK 1.8**：抛弃了 Segment，改用 **Node 数组 + 链表 + 红黑树**。采用 `CAS + synchronized` 锁住数组的头节点（粒度更细，锁住了桶的头部），大大提升了并发性能。

---

### 并发篇

#### 6. 线程池的创建方式及核心参数？
**不推荐使用 `Executors` 创建线程池**（因为容易导致 OOM），推荐直接使用 `ThreadPoolExecutor`。
它的 7 大核心参数为：
1. `corePoolSize`：核心线程数。
2. `maximumPoolSize`：最大线程数。
3. `keepAliveTime`：空闲线程的存活时间。
4. `unit`：存活时间的单位。
5. `workQueue`：任务阻塞队列（如 `ArrayBlockingQueue`、`LinkedBlockingQueue`）。
6. `threadFactory`：线程工厂，用于定制线程（如设置名称）。
7. `handler`：拒绝策略（如 `AbortPolicy` 直接抛异常，`CallerRunsPolicy` 交给调用者执行等）。

**工作流程**：任务来了先看核心线程是否已满 -> 未满则创建 -> 满了则放入队列 -> 队列满了则看最大线程数是否已满 -> 未满则创建非核心线程 -> 满了则执行拒绝策略。

#### 7. 什么是 `ThreadLocal`？存在什么问题？
- **概念**：提供线程局部变量，让每个线程都有自己专属的变量副本，解决多线程下变量并发访问的安全问题（空间换时间）。
- **内存泄漏问题**：`ThreadLocalMap` 中的 Key 是弱引用，Value 是强引用。当垃圾回收时 Key 会被回收，但 Value 还在，导致 `null: Value` 的脏数据。
- **解决**：每次用完 `ThreadLocal` 后，务必手动调用 `remove()` 方法清理。

---

### JVM 与框架篇

#### 8. JVM 内存区域是怎么划分的？
- **线程私有**：
  - **程序计数器**：记录当前线程执行的字节码行号。
  - **虚拟机栈**：存储局部变量表、操作数栈等，也就是常说的“栈内存”。
  - **本地方法栈**：为执行 Native 方法服务。
- **线程共享**：
  - **堆 (Heap)**：存放对象实例，是垃圾回收（GC）的主要区域。
  - **方法区 (元空间 MetaSpace)**：存放已被加载的类信息、常量、静态变量等。

#### 9. Spring 的 IoC 和 AOP 是什么？
- **IoC (控制反转)**：将对象的创建和依赖注入的权力交给了 Spring 容器管理，降低了代码的耦合度。核心是 DI（依赖注入）。
- **AOP (面向切面编程)**：在不修改原代码的情况下，对现有方法进行增强（如统一日志打印、事务管理、权限校验）。底层原理是动态代理（JDK 动态代理或 CGLIB 代理）。

#### 10. Spring Boot 自动装配原理？
核心注解 `@SpringBootApplication` 包含三个关键注解：
1. `@SpringBootConfiguration`：标识这是一个配置类。
2. `@ComponentScan`：自动扫描并加载符合条件的组件（如 `@Service`、`@Controller`）。
3. **`@EnableAutoConfiguration`**：核心！它通过 `@Import` 导入 `AutoConfigurationImportSelector`，去读取 `META-INF/spring.factories`（或 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`）文件中的配置类，并根据 `@Conditional` 条件注解判断是否需要将其加载到 Spring 容器中，从而实现开箱即用。