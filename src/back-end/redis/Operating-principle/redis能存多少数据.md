---
title: Redis数据存储容量分析
description: 详细分析Redis的数据存储容量限制及优化方案
date: 2024-01-01
category:
  - 数据库
  - Redis
tag:
  - Redis
  - 存储容量
  - 性能优化
  - 内存管理
---

**redis 能存多少数据**

**使用 maxmemory 配置**

- 默认是注释的，也就是默认值为 0
- 32 位操作系统中，maxmemory 是 3G，因为最大支持 4GB 内存，系统本身需要一旦内存资源
- 64 位操作系统中，不会限制内存使用，也可以主动配置

![...](images\redis%20能存多少数据.001.png)

**淘汰**

支持 "多久淘汰" 策略

![...](images\redis%20能存多少数据.002.png)

当达到最大内存时，Redis如何选择要删除的内容。您可以从以下行为中选择一个：

1. volatile-lru -> 使用近似LRU进行驱逐，只针对带有过期时间的键。
2. allkeys-lru -> 使用近似LRU对任何键进行驱逐。
3. volatile-lfu -> 使用近似LFU进行驱逐，只针对带有过期时间的键。
4. allkeys-lfu -> 使用近似LFU对任何键进行驱逐。
5. volatile-random -> 移除具有过期时间的随机键。
6. allkeys-random -> 移除任意键。
7. volatile-ttl -> 移除最接近的过期时间(次级TTL)的键。
8. noeviction -> 不驱逐任何东西，只是在写操作时返回错误。

共 8 种策略

![...](images\redis%20能存多少数据.003.png)

- 默认是 noeviction：如果内存到达 maxmemory，则写入操作都会失败，不会淘汰已有数据
- 第二是多种淘汰策略

![...](images\redis%20能存多少数据.004.png)

这四种策略，可以选择时 volatile，也就是设置了过期时间的 key，或者是 allkeys，即全部 key，所以一共有 8 种淘汰方式

**怎么选择淘汰算法**

由业务需求决定

缓存场景：LRU、LFU

数据重要：不淘汰

**淘汰时机**

每次运行读写命令都会调用processCommand函数，里面又会调用freeMemoryIfNeeded，这时候去尝试释放一些内存


