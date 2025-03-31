---
title: Redis List类型详解
description: 详细介绍Redis List类型的实现原理、使用方法及应用场景
date: 2024-01-01
category:
  - 数据库
  - Redis
tag:
  - Redis
  - 数据类型
  - List
  - 数据结构
---

**list**

**是什么**

redis list 是一组连接起来的字符串集合

list 最大元素个数是 2^32-1，新版是 2^64-1

**适合场景**

作为一个列表存储，属于比较底层的数据结构，可以使用的场景非常多。

存储一批任务数据，一批消息等

**常用操作**

![...](images\list.001.png)

**写**

**1. LPUSH**

![...](images\list.002.png)

**2. RPUSH**

![...](images\list.003.png)

**3. LPOP**

![...](images\list.004.png)

**4. RPOP**

![...](images\list.005.png)

**5. LREM**

![...](images\list.006.png)

**6. DEL**

![...](images\list.007.png)

**7. UNLINK**

![...](images\list.008.png)

**读**

**8. LLEN**

![...](images\list.009.png)

**9. LRANGE**

![...](images\list.010.png)

**底层实现**

**编码方式**

3.2 之前，list 对象有两种编码方式

![...](images\list.011.png)

3.2 之后

![...](images\list.012.png)

**编码选择**

**ZIPLIST**

条件

1. 列对象保存的所有字符串对象长度小于 64 字节
2. 列表对象元素个数少于 512 个，注意，这是 list 的限制，不是 ziplist 的限制

ziplist 底层

1. ziplist 底层用压缩列表实现，是一个偏向数组的结构
2. ` `整个 ziplist 是一起分配内存的，当插入元素时候，需要为整个 ziplist 重新分配内存，会造成内存的复制，是会消耗性能的

比如列表中有三个元素：hello、niuniu、smart

![...](images\list.013.png)

可以看到三个元素都挨在一起，正如 zip 的名字一样，ziplist 内存排列得很紧凑，可以有效节约内存空间

**LINKEDLIST**

条件

当列表个数或节点数据比较大会使用。

ziplist 可以自动转换成 linkedlist

底层

linkedlist 是双向链表

![...](images\list.014.png)

可以看到，内存不够紧凑，但是删除更为灵活，能加快处理性能，空间换时间

**QUICKLIST**

- ziplist 是为了在数据少的时候节约内存，linkedlist 是为了数据多的时候提高更新效率
- ziplist 数据稍多（不一定是个数多）时，插入数据会导致很多内存复制
- linkedlist 节点非常多的时候，会占用不少内存

怎么办？

/quicklist 来了/

底层

1. quicklist 是 ziplist 和 linkedlist 的结合结构
2. 原来 linkedlist 是单个节点，只能存一个数据。现在单个节点存一个 ziplist，即多个数据

![...](images\list.015.png)

ziplist 的优化

zipslist 本身存在一个连锁更新的问题，7.0 后使用 LISTPACK 的编码模式取代了 ZIPLIST，他们本质都是一种压缩的列表


