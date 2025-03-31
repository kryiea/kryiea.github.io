---
title: Redis String类型详解
description: 详细介绍Redis String类型的实现原理、使用方法及应用场景
date: 2024-01-01
category:
  - 数据库
  - Redis
tag:
  - Redis
  - 数据类型
  - String
  - 数据结构
---

**string**

**string**

string 是最基本的 k-v 结构，key 是唯一表示，value 是具体的值。

- value 可以是字符串或数字（整数、浮点数）
- value 最多可以容纳的数据长度是 512M
- 可以通过配置项修改proto-max-bulk-len

**常用操作**

常用操作聚集在 创建、查询、更新、删除

![...](images\string.001.png)

**set**

语法：set key value

扩展参数：

1. EX
2. PX
3. NX
4. XX

**setnx**

语法：setnx key value

功能：用于在指定的 key 不存在时，为 key 设置指定的的值，返回值 0 表示存在，1 表示设置成功

![...](images\string.002.png)

**del**

语法：del key

返回值：成功删除了几行

**内部实现**

底层数据结构主要是 int 和 SDS（简单动态字符串）

**SDS**

- SDS 不仅可以保存文本数据，还可以保存二进制数据。
- SDS使用len属性的值，而不是空字符来判断字符串是否结束，并且 SDS 的所有 API 都会以处理二进制的方式来处理 SDS 存放在buf[]数组里的数据。
- 因此 SDS 可以处理文本数据，保存图片，音频、视频、压缩文件等二进制数据
- SDS 获取字符长度的时间复杂度是 O1。因为有 len
- reids 的 SDS API 是安全的，拼接字符串不会造成缓冲区溢出。因为再拼接时会检查 SDS 空间是否满足要求，如果不够会自动扩容，不会导致溢出问题

sds 种类

- redis 中 sds 分为：sdshdr8、sdshdr16、sdshdr32、sdshdr64，他们的字段属性是一样的，区别在于对应不同大小的字符串。
- 8、16、32、64 是指字段 len 的位数

以 sdshdr8 为例 

![...](images\string.003.png)

- len：表示用了多少
- alloc：表示一共分配了多少内存
- alloc - len ：两个字段差就是预留空间的大小。
- flags：标记是哪个分类，比如 sdshdr8 就是 #define\_SDS\_TYPE\_8 1
- buf：数据

SDS 对 c 字符串的改进

1. ` `增加长度字段 len，快速返回长度
2. 增加空余空间（alloc-len），为后续追加数据留余地
3. 不再以'\0'作为结束判断标准，二进制安全

SDS 可以预留空间，那么预留的空间有多大呢。

1. len 小于 1M 的情况下，则会额外预留1 倍 len 的空间
2. len 大于 1M 的情况下，则会额外预留1MB的空间
3. 简单来说范围 min（len，1M）

**字符串对象的内部编码**

有 3 种：int、raw、embstr

保存一个 int，内部：

![...](images\string.004.png)

保存一个字符串，分 2 种情况：字符串是否大于 32 字节（不同的 redis 版本不一样）

- 小于等于 32 字节，encoding 使用 embstr

![...](images\string.005.png)

- 大于 32 字节，encoding 使用 raw

![...](images\string.006.png)

raw 和 embstr 的边界

- redis 2.+ 是 32 字节
- redis 3.0-4.0 是 39 字节
- redis 5.0 是 44 字节

raw 和 embstr 的区别

1. embstr 会通过一次内存分配来分配一块连续的内存空间来保存redisObject和SDS

embstr编码将创建字符串对象所需的内存分配次数从 raw 编码的两次降低为一次；

释放 embstr编码的字符串对象同样只需要调用一次内存释放函数；

因为embstr编码的字符串对象的所有数据都保存在一块连续的内存里面可以更好的利用 CPU 缓存提升性能。

缺点：如果字符串的长度增加需要重新分别内存，整个 redisObject 和 sds 需要重新分配空间，所以 embstr 编码的字符串对象实际上时只读的

1. 当我们要对 embstr 编码的字符串执行任何修改指令，redis 会先将对象的编码从 embstr 转换成 raw，再执行修改

注意

1. embstr 中只会使用 sdshdr8，原因考虑阈值，并且字段 alloc 会被显式设置为 0
2. raw 中会出现 sdshdr8-64，都有可能

**为什么需要 SDS**

c 语言中，"hello" 即"hello\0"

不好的地方

1. 计算字符串长度为 On
2. 追加字符串需要重新分配内存
3. 非二进制安全：这里是指能兼容'\0'这种特殊字符，公平对待每一个字符，不特殊处理任何一个字符，包括特殊字符

**应用场景**

**缓存对象**

- 直接缓存整个 json
- 采用将 key 进行分离为 user:ID:属性，采用 MSET 存储，用 MGET 获取各属性值，命令例子： MSET user:1:name xiaolin user:1:age 18 user:2:name xiaomei user:2:age 20

**常规计数**

redis 处理命令是单线程的，所以执行命令的过程是原子的。

因此 string 适合计数场景

