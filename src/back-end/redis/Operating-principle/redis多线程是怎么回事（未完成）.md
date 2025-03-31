---
title: Redis多线程机制详解
description: 深入分析Redis多线程的实现原理、应用场景及性能影响
date: 2024-01-01
category:
  - 数据库
  - Redis
tag:
  - Redis
  - 多线程
  - 性能优化
  - 系统架构
---

**redis 多线程是怎么回事（未完成）**

**redis 多线程模型**

- 随着业务发展，很多业务请求量都达到了一个曾经难以现象的高度，IO 操作确实成为了瓶颈，之前的 redis 处理流程中读取请求，发送回包都属于 IO 操作
- redis 多线程也不是将整个逻辑都多线程化，而是将网络 io 多线程化

redis 多线程设计思路

![...](images\redis%20多线程是怎么回事（未完成）.001.png)

再详细一点

![...](images\redis%20多线程是怎么回事（未完成）.002.png)

![...](images\redis%20多线程是怎么回事（未完成）.003.png)

**分开看**

什么时候启动多线程

1. 服务初始化的时候，会调用 initThreadedIO来初始化多线程
2. 根据server.io\_thread来配置，如果为 1，表示只有一个主线程，那就不会再创建其他线程
3. 如果大于 1 并且不超过 128，就会进入多线程模式

进入多线程模式后

1. 为多线程模式创建资源

![...](images\redis%20多线程是怎么回事（未完成）.004.png)

1. 这里为所有线程，在 io\_threads\_list 中创建对象
2. 提前锁定了 pthread\_mutex\_lock 互斥锁资源（单纯的加锁操作，锁住这个 io 线程对应的 mutex，类似不允许这个 io 线程创建多次）
3. pthread\_create就创建了多线程，子线程运行 IOThreadMain 操作，它是一个无限循环函数，也就是说子线程会一直处于运行状态，直到进程结束

redis 多线程默认是关闭的，需要主动开启

用户可以在redis.conf配置文件中开启

![...](images\redis%20多线程是怎么回事（未完成）.005.png)

**主线程视角**

**事件循环**

主线程和 6.0 版本之前一样，还是用 aeMain 来处理事件循环

![...](images\redis%20多线程是怎么回事（未完成）.006.png)

- aeMain 是 redis 的主线程入口，再 eventloop 一直循环
- 当有客户端连接到来，acceptTcpHandeler 被调用，主线程使用 AE 的 API 将 readQueryFromClient命令读取处理器与新连接对应的文件描述符关联起来，并初始化一个 client 绑定到这个客户端连接
- 当 client 的读写请求过来，会调用readQueryFromClient这个方法
- 老版本实在readQueryFromClient函数中同步完成读取、解析、执行、将回包放入客户端输出缓冲区
- 多线程模式下：只会调用postponeClientRead将 client 加入到clients\_pending\_read任务队列中，后面主线程再分配 IO 线程去读取客户端请求命令

![...](images\redis%20多线程是怎么回事（未完成）.007.png)

- 放进队列之后，主线程会在事件循环 beforeSleep 函数中，调用


