---
title: Redis内存存储结构详解
description: 深入分析Redis的内存存储模型及数据组织方式
date: 2024-01-01
category:
  - 数据库
  - Redis
tag:
  - Redis
  - 内存管理
---


**redis 在内存中是怎么存储的**

- redis 是内存存储，放在 redis 的数据都是以键值对形式存在内存中

**数据库结构**

reidsDb 代表 redis 数据库结构

![...](images\redis%20在内存中是怎么存储的.001.png)

重点关注 dict 结构

![...](images\redis%20在内存中是怎么存储的.002.png)

- 代表了我们存入的 key-value 数据
- 平常添加数据就是往 dict 里面加

结构图

![...](images\redis%20在内存中是怎么存储的.003.png)

- reidsDb 是数据库对象，指向数据字典，字典包含平常我存储的 k-v 数据
- k 是字符串对象
- v 支持任意 redis 对象

**过期键**

- reids 可以设置过期键，那么过期键存在哪里？

存在 expires 字典上

![...](images\redis%20在内存中是怎么存储的.004.png)

如果设置了过期时间，那么存储结构如下

![...](images\redis%20在内存中是怎么存储的.005.png)

- dict 和 expires 中的 key 对象，时机都是存储了 string 对象指针，所以是不会重复占用内容
- 而且设置了过期时间，key 在 dict 和 expires 都会有一份。只是 expires 中指向 timestamp（过期时间）


