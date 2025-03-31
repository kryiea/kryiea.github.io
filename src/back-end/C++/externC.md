---
title: extern "C"详解
description: 详细介绍extern "C"的作用、原理及使用方法
date: 2024-01-01
category:
  - C++
  - 编程语言
tag:
  - C++
  - extern "C"
  - 混合编程
  - 链接
---


**浅析 extern “C”**

**作用**

extern "C" 能实现c++调用c代码>

**原因**

在linux下测试：
c函数： myFunc(){}，被编译器编译成函数 **myFunc**
c++函数：myFunc(){}，被编译器编译成函数    **\_ Z6myFuncv**

由于c中需要支持函数重载，所以c被编译后的函数名是不一样的，会有**前缀**和**后缀**。

这会导致一个问题，在c中调用一个c语言写的某块中的某个函数时，c是按照c++的名称修饰来查找并链接这个函数，就会来连接错误，找不到c的函数。

以上例子来说，c调用c++模块中的myFunc()，在链接阶段回去会去找 **\_ Z6myFuncv** ，自然是找不到的

如果想要在c这个调用c++的函数怎么办？ **使用extern "C"**
加上 extern "C" 修饰后 能实现c调用c++代码

修饰部分会按照c语言的方式进行编译和链接

**用法**

情景如：text.cpp中导入 "func.h ", 而 "func.h" 是 ”func.c“ 的头文件。属于是c++调用c的代码

text.cpp

```C
#include"func.h"
int main(){
        func1(); // 在下面"func.h"中声明
        return 0;
}
```

func.h

参考：条件编译的用法《关于 宏和条件编译》

```C
#ifndef FUNC\_H
#define FUNC\_H
#inclde<stdio.h>
//#if 条件编译，如果是被c++调用， extern "C"{   以及 } 就会被编译器编译，如果不是则跳过编译
#if \_\_cplusplus  //1
extern "C"{      //2  
#endif           //3     这三行是配对的，条件编译
        extern viod func1();
#if \_\_cplusplus  //1
}                //2
#endif           //3     这三行是配对的，条件编译
#endif           //与第一行 #ifndef FUNC\_H 配对
```

func.c

```C
#include<stdio.h>
#include"func.h"
void func1(){
        pritnf("c编写的func1被调用");
}
```


