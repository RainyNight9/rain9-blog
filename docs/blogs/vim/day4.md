---
prev:
  text: day3
  link: ./day3.html

next:
  text: day5
  link: ./day5.html
---

# day4

## 目标：更有效率的处理单字符 & undo/redo

## 新的知识点

    1、删除光标所在的字符 ——> x
    2、删除光标前的字符 ——> X
    3、删除当前光标的字符并进入 insert 模式 ——> s
    4、删除当前光标缩在⾏并进⼊ insert 模式 ——> S
    5、替换一个字符 ——> r
    6、替换多个字符 ——> R

### undo/redo

可撤销块 进⼊插⼊模式开始，直到返回普通模式为⽌，在此期间输⼊或删除的任何内容都被当成⼀次修改

    undo ——> u
    redo ——> C-r
