---
title: Redis ZSet类型详解
description: 详细介绍Redis ZSet类型的实现原理、使用方法及应用场景
date: 2024-01-01
category:
  - 数据库
  - Redis
tag:
  - Redis
  - 数据类型
  - ZSet
  - 数据结构
---

**zset**

**是什么**

- zset 就是有序集合，可以叫 sorted set。
- 是一组按关联积分有序的字符串集合，这个分数是给抽象概念，任何指标都可以抽象成分数
- 积分相同的情况下，按字典序排序

**使用场景**

游戏排行榜。

**常用操作**

![...](images\zset.001.png)

**写**

**1. ZADD**

![...](images\zset.002.png)

![...](images\zset.003.png)

**2. ZREM**

![...](images\zset.004.png)

**读**

**3. ZCARD**

![...](images\zset.005.png)

**4. ZRANGE**

![...](images\zset.006.png)

**5. ZREVRANGE**

![...](images\zset.007.png)

**6. ZCOUNT**

![...](images\zset.008.png)

**7. ZRANK**

![...](images\zset.009.png)

- 排名由低到高，从 0 开始

**8. ZSCORE**

![...](images\zset.010.png)

**底层实现**

**编码方式**

![...](images\zset.011.png)

**ZIPLIST**

[list](https://www.yuque.com/kryiea/spring/ksfl49l9a9owattm)

结构

![...](images\zset.012.png)

条件

1. 列表对象保存的所有字符串对象长度小于 64 字节
2. 列表对象元素个数少于 128 个

**SKIPLIST**

结构

SKIPLIST 是一种可以快速查找的多级链表结构，通过 skiplist 可以快速定位到数据所在，排名操作、范围查询性能高

![...](images\zset.013.png)

**HT**

就是 hashtable，配合查询可以在 O1 时机复杂度找到

![...](images\zset.014.png)



