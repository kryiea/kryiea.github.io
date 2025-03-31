---
title: Go语言Map详解
description: 详细介绍Go语言map的实现原理、使用方法及性能优化
date: 2024-01-01
category:
  - Go
  - 数据结构
tag:
  - Go
  - Map
  - 哈希表
  - 键值对
---

本文详细介绍Go语言map的底层实现原理和使用方法。

<!-- more -->

## 1. Map概念基础

Go语言中的map是一种哈希表实现，用于存储键值对数据。Go中map底层采用哈希表，用变种拉链法来解决哈希冲突问题。

### 1.1 哈希冲突

哈希冲突是指不同的键计算出相同的哈希值：

![...](images\map.001.png)

### 1.2 解决哈希冲突的方法

#### 拉链法

拉链法通过链表结构来解决哈希冲突：

![...](images\map.002.png)

#### 开放地址法

开放地址法通过探测空闲位置来解决哈希冲突：

![...](images\map.003.png)

## 2. Map底层数据结构

### 2.1 整体结构

- map是一个指向hmap的指针，该指针占用8个字节
- hmap是一个结构体，包含多个bucket数组（但并不是只有bucket）
- bucket数组的元素为bmap结构体，通过链表结构把bmap结构体连接起来
- 一个bmap结构体能存放8个键值对，而不是一个

![...](images\map.004.png)

### 2.2 hmap结构体

hmap是map的主要数据结构：

![...](images\map.005.png)

字段含义：

![...](images\map.006.png)

### 2.3 mapextra结构体

mapextra包含了一些额外的字段：

![...](images\map.007.png)

字段含义：

![...](images\map.008.png)

### 2.4 bmap结构体

hmap真正存储数据的是buckets指向的bmap（桶）数组：

![...](images\map.009.png)

字段含义：

![...](images\map.010.png)

## 3. Map工作原理

### 3.1 tophash机制

1. map会根据每一个key算出一个hash值
2. hash值是一分为二使用的，分成：高位、低位

![...](images\map.011.png)

tophash就存放高8位。

在上面的map底层结构图可以看到，bmap显示存储了8个tophash值，然后存储了8个键值对。

注意：
- 这8个键值对不是按照key + value这样key和value一起存储的。而是先存完连续的8个key，再存连续的8个value
- 当键值对不够8个时，对应位置留空，这样子存储的好处是可以消除字节对齐带来的空间浪费

### 3.2 Map访问原理

Map提供两种访问方式：

![...](images\map.012.png)

访问步骤：

![...](images\map.013.png)

### 3.3 Map赋值原理

Map赋值操作：

![...](images\map.014.png)

赋值流程：

![...](images\map.015.png)

![...](images\map.016.png)

## 4. 参考资料

- [Go Map底层实现原理](https://zhuanlan.zhihu.com/p/495998623)
- [为什么 Go map 和 slice 是非线程安全的？](https://segmentfault.com/a/1190000040716956)


