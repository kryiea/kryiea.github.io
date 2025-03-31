---
title: Go语言字符串详解
description: 详细介绍Go语言string的实现原理、使用方法及性能优化
date: 2024-01-01
category:
  - Go
  - 数据结构
tag:
  - Go
  - String
  - 字符串
  - Unicode
---

本文详细介绍Go语言字符串的实现原理和使用方法。

<!-- more -->

## 1. 字符串基本概念

### 1.1 源代码定义

在sec/builtin/builtin.go中，Go对字符串的定义如下：

![...](images\string.001.png)

翻译：

- 字符串是所有8bit字节的集合，但不一定是UTF-8编码的文本
- 字符串可以是empty但不能是nil，空字符串就是""没有任何字符
- 字符串不可以被修改，所有字符串类型的值都是不可变的

### 1.2 字符串本质

字符串本质是一串字符数组，每个字符在存储时都对应一个整数，也有可能对应多个整数，具体要看字符串的编码方式。

![...](images\string.002.png)

## 2. 字符串数据结构

字符串在Go语言中由两部分组成：指向底层字节数组的指针和长度。

![...](images\string.003.png)

- 本例中，len = 5，表示word这个字符串所占的字节数。
- len字段存储的是实际的字节数，而不是字符数，对于非单字节编码的字符，可能len>字符个数

### 2.1 stringStruct的使用

既然runtime里stirng的定义有stringStruct结构，但是平常并没有用到这个结构体，它在哪里被使用了？

![...](images\string.004.png)

## 3. 字符串操作

### 3.1 string和[]byte的相互转换

string可以被重新赋值，但是不能被修改：

![...](images\string.005.png)

为什么不能以下标的形式修改字符串？

![...](images\string.006.png)

可以把字符串转化为字节数组，通过下标修改字节数组，再转化回字符串（实际原来字符串没有变化，而是发生了拷贝）：

![...](images\string.007.png)

### 3.2 转换原理

string与[]byte转化会发生一次内存拷贝，或申请一块新的切片内存空间。

#### byte切片转化为string

![...](images\string.008.png)

#### string转化为byte切片

![...](images\string.009.png)

#### 转化是否一定发生内存拷贝

很多场景会用到这个转化，但不是每一次转化都发生上面的内存拷贝。转化为字符串被用于临时场景：

![...](images\string.010.png)

## 4. 字符串表示方式

Go语言中使用字面量来表示字符串有两种方式，双引号和反引号：

![...](images\string.011.png)

## 5. 字符串拼接

Go语言提供了多种字符串拼接方式，包括+运算符和fmt.Sprintf等：

![...](images\string.012.png)

### 5.1 性能分析

不同的字符串拼接方式在性能上有所差异：

![...](images\string.013.png)


