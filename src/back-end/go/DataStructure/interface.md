---
title: Go语言接口详解
description: 详细介绍Go语言interface的概念、使用方法及实现原理
date: 2024-01-01
category:
  - Go
  - 数据结构
tag:
  - Go
  - interface
  - 接口
  - 多态
---

本文详细介绍Go语言接口的底层实现原理和使用方法。

<!-- more -->

## 1. 接口基础概念

Go语言中的接口是一种特殊的类型，定义了一组方法的集合，但没有具体实现。

## 2. 空接口 interface{}

### 2.1 概念与用途

- 没有任何方法的接口为空接口
- 空接口可以接受任意数据类型：可以将任意类型的数据赋值给一个空接口

### 2.2 空接口的结构

空接口在运行时由以下结构表示：

![...](images\interface.001.png)

### 2.3 _type字段解析

_type 是什么：
- _type 是 Go 里面所有类型的一个抽象，包含了：类型大小，哈希，对齐，以及k类型编号等，决定了data字段如何解析和操作
- Go 中几乎所有的数据结构都可以抽象成_type

![...](images\interface.002.png)

### 2.4 动态类型和动态值

空接口的动态类型和动态值示例：

![...](images\interface.003.png)

![...](images\interface.004.png)

## 3. 非空接口

### 3.1 概念

- 包含方法列表的接口就是非空接口

![...](images\interface.005.png)

### 3.2 非空接口结构

非空接口在运行时由以下结构表示：

![...](images\interface.006.png)

### 3.3 itab结构详解

itab结构是非空接口实现的核心：

![...](images\interface.007.png)

![...](images\interface.008.png)

itab字段含义：

- **inter：**指向 interfacetype 结构的指针，interfacetype 结构记录了这个接口的方法列表。
- **_type：**实际类型的指针，指向 _type 结构，_type 结构保存了接口的动态类型信息，与空接口的_type 一样，即赋值给这个接口的具体类型信息的元数据
- **hash：**该类型的hash值，itab 中的 hash 和 itab.type 中的 hash 相等，其实是从 itab._type 中拷贝出来的，目的是用于快速判断类型是否相等。
- **fun：**fun 是一个指针数组，里面保存了实现了该接口的实际类型的方法地址（只包含该接口方法）。
  - 这些方法地址实际上是从interfacetype结构中的mhdr 拷贝出来的，用的时候快速定位到方法。
  - 如果该接口对应的动态类型没有实现接口的所有方法，那么itab.fun[0] == 0,表示断言失败，该类型不能赋值给该接口

### 3.4 interfacetype结构

接口类型在运行时由interfacetype结构表示：

![...](images\interface.009.png)

## 4. 接口赋值过程

### 4.1 接口赋值示例

下面是一个非空接口赋值的例子：

![...](images\interface.010.png)

### 4.2 赋值前后的结构变化

在程序第28行，赋值之前，ifc的结构如下：

![...](images\interface.011.png)

在第29行，给ifc赋值一个包含方法的结构体a之后，ifc的结构如下图：

![...](images\interface.012.png)

![...](images\interface.013.png)

## 5. itab缓存机制

### 5.1 itab复用

为了提高性能，Go运行时会复用itab结构体：

![...](images\interface.014.png)

### 5.2 itabTable实现

itabTable是Go运行时管理itab的数据结构：

![...](images\interface.015.png)

![...](images\interface.016.png)

![...](images\interface.017.png)

![...](images\interface.018.png)

## 6. 参考资料

- [类型断言究竟咋"断言"？_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1iZ4y1T7zF/?p=3&spm_id_from=888.80997.embed_other.whitelist)


