---
title: Redis Set类型详解
description: 详细介绍Redis Set类型的实现原理、使用方法及应用场景
date: 2024-01-01
category:
  - 数据库
  - Redis
tag:
  - Redis
  - 数据类型
  - Set
  - 数据结构
---

**set**

**是什么**

是一个不重复、无序的字符串集合

如果是 intset 编码时，其实是有序的，整体看成无序的就行

**适合场景**

适合无序集合场景，如某个用户关注了哪些公众号

set 还提供了查交集，并集的功能

**常用操作**

![...](images\set.001.png)

**写**

**1. SADD**

![...](images\set.002.png)

**2. SREM**

![...](images\set.003.png)

**读**

**3. SISMEMBER**

![...](images\set.004.png)

**4. SCARD**

![...](images\set.005.png)

**5. SMEMBERS**

![...](images\set.006.png)

**6. SSCAN**

[redis使用scan count 返回数量不准确 - 二娃的园子 - 博客园](https://www.cnblogs.com/zhaoyongjie-z/p/14311711.html)

每次使用游标，都会使用上次使用后返回的游标作为本次游标参数，来延续之前的迭代过程

![...](images\set.007.png)

**7. SINTER**

![...](images\set.008.png)

![...](images\set.009.png)

**8. SUNION**

![...](images\set.010.png)

**9. SDIFF**

![...](images\set.011.png)

**底层实现**

**编码方式**

![...](images\set.012.png)

**INTSET**

- 如果集群元素都是整数，且元素数量不超过 512 个，可以使用 INTSET 编码
- INTSET 排列比较紧凑，内存占用少
- 查找时需要 二分查找

![...](images\set.013.png)

**HASHTABLE**

- 不满足 INTSET 条件，就使用 HASHTABLE
- 查询一个元素的性能很高，O1

比如 set（1，2，3）在 hashtable 中以键值对形式存在就是{1：null，2：null，3：null}

![...](images\set.014.png)


