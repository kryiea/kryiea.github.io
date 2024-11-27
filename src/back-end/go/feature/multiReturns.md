---
# 这是文章的标题
title: 函数调用过程&多值返回实现
# 你可以自定义封面图片
cover: 
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 3
# 设置作者
author: kryiea
# 设置写作时间
date: 2024-11-27
# 一个页面可以有多个分类
category:
  - Go
# 一个页面可以有多个标签
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: 
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息
copyright: 
---

go语言函数调用过程、多返回值实现原理

<!-- more -->
## 几个问题
1. Go的函数调用时参数是通过栈传递还是寄存器传递？
2. Go的函数调用过程？
3. GO的多值返回如何实现？

下面内容会详细分析

## 一、Go的函数调用

### 1.1 Go 函数调用基本概念
- **调用者caller**：如果一个函数调用另外一个函数，那么该函数被称为调用者函数
- **被调用者callee**：被调用函数就是 callee
- **函数栈**：函数执行时供它存放局部变量、参数等数据的空间，对应到虚拟地址空间的栈，即函数栈。栈的增长方向是从高位地址到地位地址向下进行增长。
- **函数栈帧**：分配给一个个函数的栈空间被称为函数栈帧

### 1.2 程序运行时在内存中的布局
![ace8fbfdc7ab04f9e7f20bae079cd91](http://images.kryiea.cn/img/ace8fbfdc7ab04f9e7f20bae079cd91.png)

### 1.3 Go 的函数栈帧布局
> 函数栈帧(上图栈部分)从高到低的布局
- 调用者caller栈基地址
- 调用者函数caller的局部变量
- 被调用函数callee的返回值和参数
- 被调用者callee的栈帧


Go1.17以前的版本，函数栈空间布局如下：
![20240208140932](http://images.kryiea.cn/img/20240208140932.png)

> 注意，栈和栈帧是不一样的

在一个函数调用链中，比如函数A调用B，B调用C，则在函数栈上，A的栈帧在上面，下面依次是B、C的函数栈帧。

### 1.4 Go1.15 的函数调用过程

> 先理解几条规则
1. 函数参数完全通过栈传递，参数列表**从右至左**依次压栈。
2. Go1.17.1之前版本，callee函数返回值通过caller的栈传递。
3. Go中，函数栈空间从**高地址向低地址**使用，通过 **栈指针SP + 偏移量OFFSET** 寻址。
4. Go 编译器有4个伪寄存器
    1. **FP/BP 栈底寄存器**，指向一个函数栈的顶部
    2. **PC 程序计数器**，指向下一条执行指令
    3. **SB** 指向静态数据的基指针，全局符号
    4. **SP** 栈顶寄存器


> 示例代码 main.go

```go
package main

func main() {
    var r1, r2, r3, r4, r5, r6, r7 int64 = 1, 2, 3, 4, 5, 6, 7
    A(r1, r2, r3, r4, r5, r6, r7)
}

func A(p1, p2, p3, p4, p5, p6, p7 int64) int64 {
    return p1 + p2 + p3 + p4 + p5 + p6 + p7
}
```

> 打印出main.go汇编
```shell
GOOS=linux GOARCH=amd64 go tool compile -S -N -l main.go
```

> 查看汇编代码
```go
"".main STEXT size=190 args=0x0 locals=0x80
        0x0000 00000 (main.go:3)        TEXT    "".main(SB), ABIInternal, $128-0  #main函数定义, $128-0：128表示将分配的main函数的栈帧大小；0指定了调用方传入的参数，由于main是最上层函数，这里没有入参
        0x0000 00000 (main.go:3)        MOVQ    (TLS), CX          # 将本地线程存储信息保存到CX寄存器中
        0x0009 00009 (main.go:3)        CMPQ    SP, 16(CX)         # 栈溢出检测：比较当前栈顶地址(SP寄存器存放的)与本地线程存储的栈顶地址
        0x000d 00013 (main.go:3)        PCDATA  $0, $-2            # PCDATA，FUNCDATA用于Go汇编额外信息，不必关注
        0x000d 00013 (main.go:3)        JLS     180                # 如果当前栈顶地址(SP寄存器存放的)小于本地线程存储的栈顶地址，则跳到180处代码处进行栈分裂扩容操作
        0x0013 00019 (main.go:3)        PCDATA  $0, $-1
        0x0013 00019 (main.go:3)        ADDQ    $-128, SP          # 为main函数栈帧分配了128字节的空间，注意此时的SP寄存器指向，会往下移动128个字节
        0x0017 00023 (main.go:3)        MOVQ    BP, 120(SP)        # BP寄存器存放的是main函数caller的基址，movq这条指令是将main函数caller的基址入栈。
        0x001c 00028 (main.go:3)        LEAQ    120(SP), BP        # 将main函数的基址存放到到BP寄存器
        0x0021 00033 (main.go:3)        FUNCDATA        $0, gclocals·33cdeccccebe80329f1fdbee7f5874cb(SB)
        0x0021 00033 (main.go:3)        FUNCDATA        $1, gclocals·33cdeccccebe80329f1fdbee7f5874cb(SB)
        0x0021 00033 (main.go:4)        MOVQ    $1, "".r1+112(SP)  # main函数局部变量r1入栈
        0x002a 00042 (main.go:4)        MOVQ    $2, "".r2+104(SP)  # main函数局部变量r2入栈
        0x0033 00051 (main.go:4)        MOVQ    $3, "".r3+96(SP)   # main函数局部变量r3入栈
        0x003c 00060 (main.go:4)        MOVQ    $4, "".r4+88(SP)   # main函数局部变量r4入栈
        0x0045 00069 (main.go:4)        MOVQ    $5, "".r5+80(SP)   # main函数局部变量r5入栈
        0x004e 00078 (main.go:4)        MOVQ    $6, "".r6+72(SP)   # main函数局部变量r6入栈
        0x0057 00087 (main.go:4)        MOVQ    $7, "".r7+64(SP)   # main函数局部变量r7入栈
        0x0060 00096 (main.go:5)        MOVQ    "".r1+112(SP), AX  # 将局部变量r1传给寄存器AX
        0x0065 00101 (main.go:5)        MOVQ    AX, (SP)           # 寄存器AX将局部变量r1加入栈头SP指向的位置
        0x0069 00105 (main.go:5)        MOVQ    "".r2+104(SP), AX  # 将局部变量r2传给寄存器AX
        0x006e 00110 (main.go:5)        MOVQ    AX, 8(SP)          # 寄存器AX将局部变量r2加入栈头SP+8指向的位置
        0x0073 00115 (main.go:5)        MOVQ    "".r3+96(SP), AX   # 将局部变量r3传给寄存器AX
        0x0078 00120 (main.go:5)        MOVQ    AX, 16(SP)         # 寄存器AX将局部变量r3加入栈头SP+16指向的位置
        0x007d 00125 (main.go:5)        MOVQ    "".r4+88(SP), AX   # 将局部变量r4传给寄存器AX 
        0x0082 00130 (main.go:5)        MOVQ    AX, 24(SP)         # 寄存器AX将局部变量r4加入栈头SP+24指向的位置
        0x0087 00135 (main.go:5)        MOVQ    "".r5+80(SP), AX   # 将局部变量r5传给寄存器AX 
        0x008c 00140 (main.go:5)        MOVQ    AX, 32(SP)         # 寄存器AX将局部变量r4加入栈头SP+32指向的位置
        0x0091 00145 (main.go:5)        MOVQ    "".r6+72(SP), AX   # 将局部变量r6传给寄存器AX 
        0x0096 00150 (main.go:5)        MOVQ    AX, 40(SP)         # 寄存器AX将局部变量r6加入栈头SP+40指向的位置
        0x009b 00155 (main.go:5)        MOVQ    "".r7+64(SP), AX   # 将局部变量r7传给寄存器AX 
        0x00a0 00160 (main.go:5)        MOVQ    AX, 48(SP)         # 寄存器AX将局部变量r7加入栈头SP+48指向的位置
        0x00a5 00165 (main.go:5)        PCDATA  $1, $0
        0x00a5 00165 (main.go:5)        CALL    "".A(SB)           # 调用 A函数
        0x00aa 00170 (main.go:6)        MOVQ    120(SP), BP        # 将栈上存储的main函数的调用方的基地址恢复到BP  
        0x00af 00175 (main.go:6)        SUBQ    $-128, SP          # 增加SP的值，栈收缩，收回分配给main函数栈帧的128字节空间
        0x00b3 00179 (main.go:6)        RET
```

> 画图表示
    
- **SP+64~SP+112** 指向的56个栈空间，存储的是r1~r7这7个main函数的局部变量；
- **SP+56** 该地址接收函数A的返回值；
- **SP~SP+48**  指向的56个字节空间，用来存放A函数的 7 个入参。

![20240208155716](http://images.kryiea.cn/img/20240208155716.png)

- 当程序准备好函数的入参之后，会调用汇编指令`CALL "".A(SB)`
- 这个指令首先会将 `main` 的返回地址 (8 bytes) 存入栈中，然后改变当前的栈指针 `SP` 并执行 `A` 函数的汇编指令。(A 函数没有占用栈空间而已)

**栈空间变为：**
![20240208155745](http://images.kryiea.cn/img/20240208155745.png)


## 二、Go的多值返回