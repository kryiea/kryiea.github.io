---
title: Go语言defer机制详解
description: 详细介绍Go语言defer的工作原理、使用场景及注意事项
date: 2024-01-01
category:
  - Go
  - 语言特性
tag:
  - Go
  - defer
  - 延迟调用
  - 资源管理
---

本文详细介绍Go语言defer机制的底层实现原理和执行过程。

<!-- more -->

## 1. defer底层数据结构

defer在Go语言运行时由特定的数据结构支持：

![...](images\defer.001.png)

![...](images\defer.002.png)

## 2. defer执行过程

defer语句执行过程涉及注册和实际调用两个阶段：

![...](images\defer.003.png)

![...](images\defer.004.png)

## 3. defer内存分配方式

### 3.1 _defer结构体的分配

_defer结构体在不同场景下有不同的分配策略：

![...](images\defer.005.png)

### 3.2 堆上分配

当defer无法在栈上分配时，会在堆上分配内存：

![...](images\defer.006.png)

![...](images\defer.007.png)

### 3.3 栈上分配

在特定条件下，defer可以直接在栈上分配，避免堆分配的开销：

![...](images\defer.008.png)

## 4. defer的优化 - 开放编码

开放编码是Go语言对defer实现的一种重要优化方式：

![...](images\defer.009.png)

![...](images\defer.010.png)

![...](images\defer.011.png)

![...](images\defer.012.png)

## 5. defer函数的执行机制

defer函数的实际调用发生在包含它的函数返回前：

![...](images\defer.013.png)

![...](images\defer.014.png)


