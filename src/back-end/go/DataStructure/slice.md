---
title: Go语言切片详解
description: 详细介绍Go语言slice的实现原理、使用方法及性能优化
date: 2024-01-01
category:
  - Go
  - 数据结构
tag:
  - Go
  - Slice
  - 切片
  - 数组
---

本文详细介绍Go语言切片(slice)的实现原理和使用方法。

<!-- more -->

## 1. 切片基本概念

切片(slice)可以理解为动态数组，追加元素时，如果切片容量不足，会自动扩容。

![...](images\slice.001.png)

## 2. 切片的数据结构

切片在Go语言中由三部分组成：指向底层数组的指针、长度(len)和容量(cap)。

![...](images\slice.002.png)

## 3. 切片操作

### 3.1 切片初始化

切片可以通过多种方式进行初始化，包括从数组切片、通过make函数等。

![...](images\slice.003.png)

### 3.2 切片截取

切片截取遵循左闭右开原则，即包含开始索引但不包含结束索引。

![...](images\slice.004.png)

### 3.3 切片复制

当我们对切片进行赋值操作时，只复制切片结构，不复制底层数组。

![...](images\slice.005.png)

![...](images\slice.006.png)

## 4. 切片扩容机制

### 4.1 扩容示例

下面是一个有趣的切片扩容示例：

![...](images\slice.007.png)

解析：
```
arr1 slice struct{
    array ->////
    len = 1
    cap = 4
}
[ ] -> [1]

arr2 slice struct{
    array ->////
    len = 2
    cap = 4
}
[1] -> [1,2] -> [1,3]

arr3 slice struct{
    array ->////
    len = 2
    cap = 4
}
[1,2] -> [1,3]
```

![...](images\slice.008.png)

### 4.2 扩容规则

Go语言中切片的扩容规则如下：

![...](images\slice.009.png)

## 5. 切片完全复制

要完全复制一个切片，不仅复制slice结构体，还要复制底层数组，应使用copy函数。

注意：copy函数复制的数据数量取决于两个切片的len的最小值。

![...](images\slice.010.png)


