# Flutter

## 基础

### 环境搭建

FlutterSDK 的下载与安装：https://docs.flutter.dev/install/archive

- VScode (Flutter 插件: Flutter + Dart + Awesome Flutter Snippets) 
- Xcode 
- Simulator
- Android Studio  

### Dart 基础语法介绍

#### 一、基础数据类型

1. 数字类型

```dart
// 整型(整数) int 和浮点型(小数) double
void main(){
  // 整型 age，表示年龄的数值
  int age = 2;
  // 浮点型 weight，表示体重的数值
  double weight = 4.5;
}
```

2. 字符串类型

```dart
// 字符串 String
void main(){
  // 字符串 name，表示姓名
  String name = '张三';
}
```

3. 布尔型 bool

```dart
// 布尔型 bool
void main(){
  // 布尔型 isTrue，表示是否为真
  bool isTrue = true;
}
```

#### 二、运算符

1. 算数运算符

```dart
void main() {
  print(1 + 2);//3    加
  print(1 - 2);//-1   减
  print(1 * 2);//2    乘
  print(1 / 2);//0.5  除
  print(10 % 3);//1   余
  print(10 ~/ 3);//3  商
}
```

2.比较运算符

```dart
void main() {
  print(1 == 2);//false 等于
  print(1 != 2);//true 不等于
  print(1 > 2);//false 大于
  print(1 < 2);//true 小于
  print(1 >= 2);//false 大于等于
  print(1 <= 2);//true 小于等于
}
```

3.逻辑运算符

```dart
void main() {
  print(true && false);//false 与
  print(true || false);//true 或
  print(!true);//false 非
}
```

#### 三、流程控制

1. if...else 语句

```dart
void main() {
  int age = 18;
  if (age >= 18) {
    print('成年');
  } else {
    print('未成年');
  }
}
```

2. switch...case 语句

```dart
void main() {
  int age = 18;
  switch (age) {
    case 18:
      print('成年');
      break;
    default:
      print('未成年');
  }
}
```

3. for 循环语句

```dart
void main() {
  for (int i = 0; i < 10; i++) {
    print(i);
  }
}
```

4. while 循环语句

```dart
void main() {
  int i = 0;
  while (i < 10) {
    print(i);
    i++;
  }
}
```

5. do...while 循环语句

```dart
void main() {
  int i = 0;
  do {
    print(i);
    i++;
  } while (i < 10);
}
```

6. break 语句

```dart
void main() {
  for (int i = 0; i < 10; i++) {
    if (i == 5) {
      break;
    }
    print(i);
  }
}
```

7. continue 语句

```dart
void main() {
  for (int i = 0; i < 10; i++) {
    if (i == 5) {
      continue;
    }
    print(i);
  }
}
```

8. return 语句

```dart
void main() {
  for (int i = 0; i < 10; i++) {
    if (i == 5) {
      return;
    }
    print(i);
  }
}
```

9. 异常处理

```dart
void main() {
  try {
    int a = 10;
    int b = 0;
    print(a / b);
  } catch (e) {
    print(e);
  }
}
```

10. 断言

```dart
void main() {
  int age = 18;
  assert(age > 18);
}
```

11. 泛型

```dart
void main() {
  List<int> list = [1, 2, 3];
  print(list[0]);
}
```

12. 类

```dart
class Person {
  String name;
  int age;
  Person(this.name, this.age);
}
```

13. 枚举

```dart
enum Color { red, green, blue }
```

14. 常量

```dart
const PI = 3.14;
```

15. 抽象类

```dart
abstract class Animal {
  void eat();
}
```

16. 接口

```dart
abstract class Animal {
  void eat();
}
```

#### 四、函数

1. 函数的简单定义

```dart
void main() {
  print('hello world');
}
```

2. 命名参数

```dart
double bmi({
  required double height,
  double weight = 65,
}) {
  // 具体算法
  double result = weight / (height * height);
  return result;
}
```

3. 位置参数

```dart
double bmi([double height = 1.79, double weight = 65]) {
  // 具体算法
  double result = weight / (height * height);
  return result;
}
```

#### 五、面向对象

1. 自定义数据类型

```dart
class Person {
  String name;
  int age;
  Person(this.name, this.age);
}
```

2. 构造函数

```dart
class Human {
  String name = '';
  double weight = 0;
  double height = 0;

  Human(String name,double weight,double height){
    this.name = name;
    this.weight = weight;
    this.height = height;
  }
}


void main(){
  Human toly = Human("捷特",70,180);
  print("Human: name{${toly.name},weight:${toly.weight}kg,height:${toly.height}cm}");
}
```

3. 成员函数(方法)

```dart
void main(){
  Human toly = Human("捷特",70,180);
  print("Human: name{${toly.name},weight:${toly.weight}kg,height:${toly.height}cm}");

  Human ls = Human("龙少",65,179);
  print("Human: name{${ls.name},weight:${ls.weight}kg,height:${ls.height}cm}");

  Human wy = Human("巫缨",65,179);
  print("Human: name{${wy.name},weight:${wy.weight}kg,height:${wy.height}cm}");
}
```

4. 类的继承


```dart
class Student extends Human {
  final String school;

  Student(
    super.name,
    super.weight,
    super.height, {
    required this.school,
  });
}
```

5. 子类覆写父类方法

```dart
class Student extends Human {

  // 略同...
  
  @override
  String info() {
    String info = super.info() + "school: $school ";
    return info;
  }

}

void main() {
  Student toly = Student("捷特", 70, 180,school: "安徽建筑大学");
  print(toly.bmi());
  print(toly.info());
}

```

#### 六、聚合类型

1. 列表 List

```dart
List<int> numList = [1,9,9,4,3,2,8];
int second = numList[1];
print(second);
numList[3] = 6;
print(numList);

---->[控制台输出]----
9
[1, 9, 9, 6, 3, 2, 8]



List<int> numList = [1,9,9,4,3,2,8];
numList.add(10);
numList.insert(0,49);
print(numList);

---->[控制台输出]----
[49, 1, 9, 9, 4, 3, 2, 8, 10]


List<int> numList = [1,9,9,4,3,2,8];
numList.removeAt(2);
numList.remove(3);
numList.removeLast();
print(numList);

---->[控制台输出]----
[1, 9, 4, 2]


List<int> numList = [1, 9, 9, 4];
for (int i = 0; i < numList.length; i++) {
  int value = numList[i];
  print("索引:$i, 元素值:$value");
}

---->[控制台输出]----
索引:0, 元素值:1
索引:1, 元素值:9
索引:2, 元素值:9
索引:3, 元素值:4


for(int value in numList){
  print("元素值:$value");
}

---->[控制台输出]----
元素值:1
元素值:9
元素值:9
元素值:4
```

2. 集合 Set

```dart
Set<int> numSet = {1, 9, 9, 4};
print(numSet);

---->[控制台输出]----
{1, 9, 4}



Set<int> numSet = {1, 9, 4};
numSet.add(10);
print(numSet);

---->[控制台输出]----
{1, 4, 10}



Set<int> a = {1, 9, 4};
Set<int> b = {1, 9, 3};
print(a.difference(b));// 差集
print(a.union(b)); // 并集
print(a.intersection(b)); // 交集

---->[控制台输出]----
{4}
{1, 9, 4, 3}
{1, 9}



Set<int> numSet = {1, 9, 4};
for(int value in numSet){
  print("元素值:$value");
}

---->[控制台输出]----
元素值:1
元素值:9
元素值:4
```

3. 映射 Map

```dart
Map<int, String> numMap = {
  0: 'zero',
  1: 'one',
  2: 'two',
};
print(numMap);
numMap.remove(1);
print(numMap);

---->[控制台输出]----
{0: zero, 1: one, 2: two}
{0: zero, 2: two}


Map<int, String> numMap = {
  0: 'zero',
  1: 'one',
  2: 'two',
};
numMap[3] = 'three';
numMap[4] = 'four';
print(numMap);

---->[控制台输出]----
{0: zero, 1: one, 2: two, 3: three, 4: four}


Map<int, String> numMap = {
  0: 'zero',
  1: 'one',
  2: 'two',
};
numMap.forEach((key, value) {
  print("${key} = $value");
});

---->[控制台输出]----
0 = zero
1 = one
2 = two
```

#### 七、 语言特性

1. 空安全

Dart 是一个空安全的语言，也就是说，你无法将一个非空类型对象值设为 null :

2. 异步任务

```dart
Future<void> test2() async{
  String path = r'E:\Projects\Flutter\flutter_first_station\pubspec.yaml';
  File file = File(path);
  print("开始读取");
  String content = await file.readAsString();
  print("===读取完毕: 文字内容长度 = ${content.length}====");
  print("做些其他的事");
}
```

## 项目

### 计数器项目


