---
# 这是文章的标题
title: Redis内存数据管理详解
# 你可以自定义封面图片
cover: 
# 这是页面的图标
icon: 
# 这是侧边栏的顺序
order: 1
# 设置作者
author: 
# 设置写作时间
date: 2024-01-01
# 一个页面可以有多个分类
category:
  - 数据库
  - Redis
# 一个页面可以有多个标签
tag:
  - Redis
  - 内存管理
  - 数据结构
  - 性能优化
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: 
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息
copyright: 
---

redis 的数据在内存中的组织过程

<!-- more -->
# 前言
本文不对 redis 的数据对象以及底层编码方式作深入展开。
仅是以 **局部到全景** 的思路简单理解 **redis 的数据在内存中的组织过程**。

# 推荐学习
- [小林coding 图解redis](https://xiaolincoding.com/redis/)
- [Redis 源码日志](https://doc.yonyoucloud.com/doc/wiki/project/redis/index.html)

# 一、理解 k-v 在内存中的存储形式
## 1.1 存储形式为 redisObject
redis 是 **键值对** 存储，key 和 value 在 redis 中被抽象为redisObject，即对象。
- `key`： 只能是 string 对象。
- `value`： 支持丰富的对象种类，包括：string、list、set、hash、zset等。

## 1.2 redisObject 结构

重点关注 type 和 encoding 字段。
- `type`：表明是哪种 redis 数据对象。
- `encoding`：表明数据对象的底层编码方式（底层数据结构）。可以看到不同的数据对象，可能采用相同的编码方式。

![2](http://images.kryiea.cn/img/2.png)

## 1.3 实际例子

存一条数据，redis 命令：`set 我是一个key 1000`

redisObject 表现为👇

**`key = "我是一个key" `， Object 的图示（假设用embstr编码）：**

![3](http://images.kryiea.cn/img/3.png)

**`value = 1000 `，Object 的图示（假设用编码int）：**

![4](http://images.kryiea.cn/img/4.png)


## 1.3 redisObject 代码


除了 type 和 encoding 字段外，
- `lru`：记录对象访问信息，用于内存淘汰（lru、lfu 都复用这个字段）
- `refcount`：引用计数，用来描述有几个指针指向该对象
- `ptr`：内容指针，指向实际数据
```go
// redis 6.0.10
struct redisObject {
    unsigned type:4;
    unsigned encoding:4;
    unsigned lru:LRU_BITS; /* LRU time (relative to global lru_clock) or
                            * LFU data (least significant 8 bits frequency
                            * and most significant 16 bits access time). */
    int refcount;
    void *ptr;
};
```

# 二、理解 redisObject 的组织形式
从上面了解到 k-v 在内存里的存储形式为 redisObject，那这些 Object 又是被如何组织管理的呢？

**自然是** `dict`

## 2.1 dict 结构
> 简单视角理解 dict 管理 redisObject

简单来说，**dict 是一张哈希表**，Redis 所有的 key-value 都存储在里面。

![dict](http://images.kryiea.cn/img/dict.png)

> 深入一点理解 dict 管理 redisObject

dict 在 redis 中会有更多层的抽象，以便实现更多功能。

![dict+](http://images.kryiea.cn/img/dict+.png)


## 2.2 dict 代码

```go
// 哈希表（字典）数据结构，Redis 的所有键值对都会存储在这里。其中包含两个哈希表。
struct dict {
    // 哈希表的类型，包括哈希函数，比较函数，键值的内存释放函数
    dictType *type;
    // 存储一些额外的数据
    void *privdata;
    // 两个哈希表，先使用ht[0],扩容时启用ht[1]
    dictht ht[2];
    // 哈希表重置下标，指向的是哈希数组的数组下标，扩容时使用。
    int rehashidx; 
    // 绑定到哈希表的迭代器个数
    int iterators; 
};
```


# 三、 理解 dict 的组织形式
dict 管理存储的 redisObject，那谁来组织 dict 呢？
**自然是再上一层的抽象：`redisDB`**

## 3.1 redisDB 结构

redisDB 的重点字段
- `id`：redis 启动时默认开启 16 个 DB，对应`0-15` 编号。可配置。
- `dict`：指向一个 dict。
- `expires`：指向一个 dict，该 dict 存储`含过期时间的 k-v`。

![redisdb](http://images.kryiea.cn/img/redisdb.png)

## 3.2 redisDb 代码

```go
struct redisDb {
    int id;                     // 数据库ID

    dict *dict;                 // 该数据库的键空间
    dict *expires;              // 设置了超时的键的超时时间
    dict *blocking_keys;        // 有客户端等待数据的键（BLPOP）
    dict *ready_keys;           // 接收到PUSH操作的阻塞键
    dict *watched_keys;         // 用于MULTI/EXEC CAS的监视键
    long long avg_ttl;          // 平均生存时间（TTL），仅用于统计
    unsigned long expires_cursor; // 活跃过期周期的游标。
    list *defrag_later;         // 稍后尝试逐个、逐渐进行碎片整理的键名列表。
}
```
# 四、redis 组织形式全景

经过上面对 redisObject、dict、redisDB 的层层理解，对 redis 有了结构化、层次化的理解。

接下来以全景的视角来看 redis 的组织形式

![redis.drawio](http://images.kryiea.cn/img/redis.drawio.png)

重点结构：
- `redisDB`：默认是有 0-15 编号，共 16 个 DB ，默认是选择 0 号。
- `dict`：对 hashtable 的一层封装，添加 k-v 的地方
- `hashtable`：对 dictEntry 的一层封装，存有 table 的地址
- `dictEntry(bucket)`：存储 key-value 对象。
- `redisObject`：每个 key 和 value 都表现为一个 redisObject 对象

## 4.1 redis 哈希冲突如何解决

redis 依靠 dict 哈希表来组织所有的 k-v 对象。

每次添加 k-v 的时候，需要进行 `hash运算` 以及 `掩码运算` 来找到对应的插入位置，这时可能会发生哈希冲突。

redis 用`变种拉链法`来解决哈希冲突，全景图的 `dictEntry` 结构有一个 `next` 字段，**指向冲突的下一对 k-v**

![hash](http://images.kryiea.cn/img/hash.png)

## 4.2 redisDB 的 expires
在全景图的 `redisDB` 结构中，可以发现 `*dict 、*expires` 都是指向一个dict 结构。

但 expires 所指向的 dict 在组织形式上会有所差异：
- dict 和 expires 中的 key 对象，实际都是存储了 `string 对象的指针`，所以是不会重复占用内存。
- 如果设置了过期时间，key 的指针 在 dict 和 expires 都会存储一份。只是 expires 中 value 指向 timestamp（过期时间），而 dict 的 value 指向实际数据。
  
![expires](http://images.kryiea.cn/img/expires.png)
