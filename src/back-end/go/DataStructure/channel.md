---
title: Go语言Channel详解
description: 详细介绍Go语言channel的概念、使用方法及并发通信机制
date: 2024-01-01
category:
  - Go
  - 数据结构
  - 并发编程
tag:
  - Go
  - Channel
  - 并发
  - 通信
---

本文详细介绍Go语言Channel的底层实现原理和使用方法。

<!-- more -->

## 1. Channel简介

Channel是Go语言并发编程的核心概念之一：

- Go语言遵循CSP并发编程模式（**Communicating Sequential Process** 通信顺序进程），提倡通过通信来实现内存共享，而不提倡通过共享内存来实现通信
- Channel的存在，使Go的并发变得简单快捷
- Channel和select的搭配使用以及调度器对goroutine的调度，可以高效实现协程的阻塞和唤醒及多路复用

## 2. Channel的分类

Channel根据缓冲区大小可以分为两类：

### 2.1 有缓冲Channel

1. 读写时是阻塞的，向channel写入一条数据，如果这条数据还没被消费掉，再写入新的数据就会阻塞
2. 读取也是，当channel没有可读的数据，再读取就会阻塞

### 2.2 无缓冲Channel

1. 读写是非阻塞的，但是要满足一定条件——队列没满
2. 如果channel队列满了，就会退化成无缓冲channel一样

![...](images\channel.001.png)

## 3. Channel的数据结构

Channel用make创建初始化会在堆上分配一个runtime.hchan类型的数据结构，并返回指针指向堆上这块hchan内存区域，所以channel是一个引用类型。

为什么在堆上创建而不是栈上？因为channel是用来实现goroutine间通信的，其生命周期和作用域很可能不局限于某个具体的函数。

![...](images\channel.002.png)

### 3.1 sendq和recvq字段

存储当前channel由于缓冲区（buf）不足而阻塞的：要读取或者要写入当前的channel的goroutine列表。

这些等待队列使用双向链表waitq表示，waitq是一个对sudog链表进行封装之后的一个结构。

字段为sudog队列的首尾指针，链表中所有元素都是sudog结构。

#### waitq结构

![...](images\channel.003.png)

### 3.2 sudog结构

sudog和goroutine之间存在绑定关系，goroutine是绑定在sudog中这个结构上的：

- recvq可以理解为：读操作阻塞在channel的goroutine列表
- sendq是写操作阻塞在channel的goroutine列表

![...](images\channel.004.png)

![...](images\channel.005.png)

## 4. Channel操作

### 4.1 Channel初始化

用make函数初始化一个channel，而在运行时其实是调用makechan函数来完成初始化工作。

源码分析：

![...](images\channel.006.png)

- makechan有两个参数，第一个代表创建的channel的类型，即是通道可以传递的消息类型，第二个参数代表通道中的元素大小
- 创建的主要逻辑位于switch中，有三种情况：
  1. 没有缓冲区buf，即创建无缓冲区的channel，只分配hchan本身结构体大小的内存
  2. 有缓冲区buf，但元素类型不含指针，一次为当前的hchan结构和buf数组分配一块连续的内存空间
  3. 有缓冲区，且元素包含指针类型，分两次分配内存，先为hchan结构和分配内存，再为buf数组元素分配内存

不同状态的channel，写入时结果如下：

![...](images\channel.007.png)

### 4.2 Channel写入

运行时调用了runtime.chansend函数，源码如下：

![...](images\channel.008.png)

![...](images\channel.009.png)

![...](images\channel.010.png)

向channel发送数据分为三种方式：直接发送、缓冲发送、阻塞发送

1. 直接发送
   - 当前channel有正在阻塞等待接受数据的goroutine，那么直接发送数据，直接从一个goroutine操作另一个goroutine的栈，将待发送数据直接copy到此处
2. 缓冲发送
   - 会判定缓冲区的剩余空间，如果有剩余空间，将数据拷贝到channel中，sendx索引自增1（若sendx等于dataqsiz，则将sendx置0，原因是buf是一个环形数组）自增完成后，队列总数自增1
3. 阻塞发送
   - 当前channel没有正在阻塞等待接受数据的goroutine，并且channel的缓冲区满了之后，发送goroutine就会阻塞，首先获取sudog，将发送的goroutine绑定到sudog上，加入到当前channel的发送阻塞队列，调用gopark方法挂起当前goroutine，等待被唤醒

![...](images\channel.011.png)

流程图：

![...](images\channel.012.png)

![...](images\channel.013.png)

![...](images\channel.014.png)

![...](images\channel.015.png)

### 4.3 Channel读取

读取都是调用chanrecv函数做数据接收，下面是chanrecv源码：

```go
func chanrecv(c *hchan, ep unsafe.Pointer, block bool) (selected, received bool) {
 // 特殊场景：非阻塞模式，并且没有元素的场景直接就可以返回了，这个分支是快速分支，下面的代码都是在锁内的；
 if !block && (c.dataqsiz == 0 && c.sendq.first == nil ||
  c.dataqsiz > 0 && atomic.Loaduint(&c.qcount) == 0) &&
  atomic.Load(&c.closed) == 0 {
  return
 }
 // 以下所有的逻辑都在锁内；
 lock(&c.lock)
 if c.closed != 0 && c.qcount == 0 {
  if raceenabled {
   raceacquire(c.raceaddr())
  }
  unlock(&c.lock)
  if ep != nil {
   typedmemclr(c.elemtype, ep)
  }
  return true, false
 }
 // 场景：如果发现有个人（sender）正在等着别人接收，那么刚刚好，直接把它的元素给到我们这里就好了；
 if sg := c.sendq.dequeue(); sg != nil {
  recv(c, sg, ep, func() { unlock(&c.lock) }, 3)
  return true, true
 }
 // 场景：ringbuffer 还有空间存元素，那么下面就可以把元素放到 ringbuffer 放好，递增索引，就可以返回了；
 if c.qcount > 0 {
  // 存元素
  qp := chanbuf(c, c.recvx)
  if ep != nil {
   typedmemmove(c.elemtype, ep, qp)
  }
  typedmemclr(c.elemtype, qp)
  // 递增索引
  c.recvx++
  if c.recvx == c.dataqsiz {
   c.recvx = 0
  }
  c.qcount--
  unlock(&c.lock)
  return true, true
 }
 // 代码到这说明 ringbuffer 空间是不够的，后面要做两个事情，是否需要阻塞？
 // 如果 block 为 false ，那么直接就退出了，返回对应的返回值；
 if !block {
  unlock(&c.lock)
  return false, false
 }
 // 到这就说明要阻塞等待了，下面唯一要做的就是给阻塞做准备（准备好唤醒的条件）
 gp := getg()
 mysg := acquireSudog()
 mysg.releasetime = 0
 mysg.elem = ep
 mysg.waitlink = nil
 gp.waiting = mysg
 mysg.g = gp
 mysg.isSelect = false
 mysg.c = c
 gp.param = nil
 // goroutine 作为一个 waiter 入队列，等待条件满足之后，从这个队列里取出来唤醒；
 c.recvq.enqueue(mysg)
 // goroutine 切走，交出 cpu 执行权限
 goparkunlock(&c.lock, waitReasonChanReceive, traceEvGoBlockRecv, 3)
 // 这里是被唤醒的开始的地方；
 if mysg != gp.waiting {
  throw("G waiting list is corrupted")
 }
 // 下面做一些资源的清理
 gp.waiting = nil
 closed := gp.param == nil
 gp.param = nil
 mysg.c = nil
}
```

## 5. 参考资料

- [Golang Channel 最详细的源码剖析](https://zhuanlan.zhihu.com/p/297053654)


