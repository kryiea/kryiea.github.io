---
# 这是文章的标题
title: Sync.Map 源码学习
# 你可以自定义封面图片
cover: 
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 1
# 设置作者
author: 
# 设置写作时间
date: 2024-10-29
# 一个页面可以有多个分类
category:
  - Go
# 一个页面可以有多个标签
tag:
  - 
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: 
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息
copyright: 
---


<!-- more -->

# Sync.Map

## 一、map 与 sync.Map

- map 不支持并发的读写操作，否则会出现 `fatal error` 导致程序直接被终止。无法用 `defer + recover` 捕获。
- Go 官方提供了一个并发安全的 sync.Map。

### 1. 模拟 map 的并发读写 fatal

**报错：fatal**

```go
package main

func main() {
    // 初始化一个 map
    m := make(map[int]int)

    // 并发写操作
    go func() {
        for i := 0; i < 1000000; i++ {
            m[i] = i
        }
    }()

    // 并发读操作
    go func() {
        for i := 0; i < 1000000; i++ {
            _ = m[i]
        }
    }()

    // 阻塞主线程
    select {}
}

result：fatal error: concurrent map read and map write
```

### 2. 盲点：加上打印却可以避免 fatal

给每个协程加上一行打印语句，fatal 就不会发生：

```go
package main

import "fmt"

func main() {
    // 初始化一个 map
    m := make(map[int]int)

    // 并发写操作
    go func() {
        for i := 0; i < 1000000; i++ {
            m[i] = i
            fmt.Println("写:", m[i])
        }
    }()

    // 并发读操作
    go func() {
        for i := 0; i < 1000000; i++ {
            _ = m[i]
            fmt.Println("读:", m[i])
        }
    }()

    // 阻塞主线程
    select {}
}
```

![![](staticVPhXbjMisovVoyxm6lKcNMmnnCe.png)](http://images.kryiea.cn/img/![](staticVPhXbjMisovVoyxm6lKcNMmnnCe.png).png)


**原因：fmt.Println 内部使用了锁**

- 每次调用 `fmt.Println` 时，它会获取一个锁，以确保多个 goroutine 并发调用 `fmt.Println` 时，输出不会混乱。
- 这种锁机制会导致其他 goroutine 在等待锁释放时被阻塞，从而改变 goroutine 的执行顺序。从而在某些情况下掩盖数据竞争的问题。


## 二、sync.Map 简介

- sync.Map 是 Go 官方提供的一个并发安全的一个 Map
- 它本质是采用**空间换时间**的思想，使用两个 map(read map 和 dirty map)，这两个 map 互相配合来提供一个拥有并发读写能力，并且会权衡整体操作性能的并发安全 map。
- readmap 通过无锁的 cas 操作揽下大部分操作，减少 dirtymap 锁的使用。

**请求流程：**

![![](staticWnfIbOCLXozS0hx9Sp5cqfN1ned.png)](http://images.kryiea.cn/img/![](staticWnfIbOCLXozS0hx9Sp5cqfN1ned.png).png)

- 当请求访问 sync.map，会让请求在 readmap 上解决，如果无法解决再交给 dirtymap 来兜底完成。
- dirtymap 会拥有全量的数据，因为它有兜底完成 readmap 无法处理的请求的责任。
- 写指的是新增数据，更新指的是更新已有数据。
- 对于 **读、删、更新** 会尽量在 readmap 中处理，实在处理不了再去拿锁，找 dirtymap 处理。
- 对于 **写** 会通过锁找到 dirtymap 处理。
- readmap 是通过无锁的 cas 去完成对变量的操作，而 dirtymap 是通过加锁来做了限流保护的。

**关于 entry：**

![![](staticJOyWbE2hGo1owsxWVT6cn9tqnEf.png)](http://images.kryiea.cn/img/![](staticJOyWbE2hGo1owsxWVT6cn9tqnEf.png).png)

- 最下面的 `entry` 被 read 和 dirty 同时指向，代表的是：两个 map 中相同的 key 对应同一块 value 内存，而 value 就是 sync.map 的 entry。这里会涉及到数据的双向流转机制，后面会解读。

## 三、sync.map 的使用

### 1. 基本的 crud

```go
// 添加元素
m.Store("key1", "value1")
m.Store("key2", "value2")

// 更新元素
m.Store("key1", "newValue1")

// 查询元素
if value, ok := m.Load("key1"); ok {
    fmt.Println("key1:", value)
} else {
    fmt.Println("key1 not found")
}

// 删除元素
m.Delete("key2")

// 遍历所有元素
m.Range(func(key, value interface{}) bool {
    fmt.Printf("%s: %s\n", key, value)
    return true
})
```

### 2. 验证并发安全

```go
package main

import (
        "fmt"
        "sync"
        "time"
)

func main() {
        var m sync.Map
        var wg sync.WaitGroup

        // 启动多个并发写操作
        for i := 0; i < 10; i++ {
                wg.Add(1)
                go func(i int) {
                        defer wg.Done()
                        for j := 0; j < 1000; j++ {
                                key := fmt.Sprintf("key-%d-%d", i, j)
                                m.Store(key, j)
                        }
                }(i)
        }

        // 启动多个并发读操作
        for i := 0; i < 10; i++ {
                wg.Add(1)
                go func(i int) {
                        defer wg.Done()
                        for j := 0; j < 1000; j++ {
                                key := fmt.Sprintf("key-%d-%d", i, j)
                                if value, ok := m.Load(key); ok {
                                        fmt.Printf("Read key: %s, value: %d\n", key, value)
                                }
                        }
                }(i)
        }

        // 启动多个并发删除操作
        for i := 0; i < 10; i++ {
                wg.Add(1)
                go func(i int) {
                        defer wg.Done()
                        for j := 0; j < 1000; j++ {
                                key := fmt.Sprintf("key-%d-%d", i, j)
                                m.Delete(key)
                        }
                }(i)
        }

        // 启动一个 goroutine 遍历所有元素
        wg.Add(1)
        go func() {
                defer wg.Done()
                time.Sleep(1 * time.Second) // 等待部分写操作完成
                m.Range(func(key, value interface{}) bool {
                        fmt.Printf("Range key: %s, value: %d\n", key, value)
                        return true
                })
        }()

        // 等待所有 goroutine 完成
        wg.Wait()
        fmt.Println("All operations completed.")
}
```

## 四、sync.map 的结构

关注这三个结构体：

- **Map：** sync.map 的顶层封装
- **readOnly：** readmap 的封装，里面有一个 amended 字段，true 就是标记 有数据在 read 没有，而 dirty 有。
- **Entry：** 就是 value 的封装

```go
//********************************************************************************
type Map struct {
    // 互斥锁，保护对映射数据的并发访问
    mu Mutex

    // read map： 用cas操作，无锁
    read atomic.Pointer[readOnly]

    // dirty map：需要配合互斥锁使用
    dirty map[any]*entry

    // misses 记录有多少次请求打到了 dirty 去处理
    // 当 misses 的次数足够多时，dirty map将被提升为 read map 
    misses int
}

//********************************************************************************
type readOnly struct {
    // read map 存放 k-v的实体，底层还是使用的 map
    m map[any]*entry
    
    // 标记 是否数据缺失
    // 即 dirtymap 有，readmap没有的 key，此时 amended 为 true
    amended bool 
}

//********************************************************************************
type entry struct {
    // p 字段是一个原子指针，使用 atomic.Pointer[any] 类型，用于存储条目的值。
    // 这个指针可以安全地在不同的 goroutine 之间共享和访问，并且支持原子性的读写操作。
    p atomic.Pointer[any]
}
```

## 五、两个 map 的数据双向流转机制

### 1. Dirty map --> Read map

read 可以为 dirty 尽量的挡住 读、删、更新的操作流量，但是如果 read 很多次没有挡住请求，让这些请求到了 dirty 中，就意味着：

这个流转的可以理解为：将 readmap 指针指向 dirtymap，然后 dirtymap 置为 nil。

![![](staticYRaBb19T5oupivx983jcPheqnZf.png)](http://images.kryiea.cn/img/![](staticYRaBb19T5oupivx983jcPheqnZf.png).png)

![![](staticEYkSbxi8BoJt4nxXheicTTPZnAe.png)](http://images.kryiea.cn/img/![](staticEYkSbxi8BoJt4nxXheicTTPZnAe.png).png)

### 2. Read map --> Dirty map

从上面可以知道 Dirty map --> Read map 后，dirty 是 nil。

如果这时候来了一个写（新增）请求，写请求是要通过**加锁**到 dirty 中操作的，dirty 需要保证自己的数据是全量的，就会从 readmap 中复制一份逻辑上存在（能通过 key 查询到的）的数据过来。

![](http://images.kryiea.cn/img/![](staticG3jVbmBf2oFgt8xqF02cu8fznBg.png).png)

### 3. 为什么要双向流转

为什么要把**数据集**当成皮球一样踢来踢去呢？

1. **dirty 把数据全给 read ，为什么自己要置为 nil?**

- **数据隔离：** 如果 dirty 不重置为 nil，就会出现 dirty 和 read  使用同一个底层 map。这样就无法做到数据隔离的。go 语言希望 read map 和 dirty map 依赖的是不同的 map，但 entry 是可以共享的。

1. **dirty 能不能 copy 一份全量数据给 read，不把自己置 nil?**

- **并发冲突**：在复制的过程中，整个 `sync.Map` 将会处于一种不稳定的状态。如果在这个过程中有并发访问，可能会导致数据不一致或崩溃。
- **性能问题**：复制大数据量的 `dirty` 到 `read` 是一个耗时的操作，会降低性能。直接切换引用可以避免这些性能问题。

## 六、Enrty 的状态解读

首先 Entry 是 value 的实体。

### 1. entry 的结构

```go
type entry struct {
    // p 字段是一个原子指针，使用 atomic.Pointer[any] 类型，用于存储条目的值。
    // 这个指针可以安全地在不同的 goroutine 之间共享和访问，并且支持原子性的读写操作。
    p atomic.Pointer[any]
}
```

### 2. entry 的三个状态

1. **正常值：**正常的 k-v 实体，数据存在。
2. **nil 状态**：表示软删除状态，代表 k-v 数据在逻辑上不存在（不能通过 k 获取到 v），但是在内存仍然存在这个 key。
3. **expunged 状态：**表示硬删除状态，代表逻辑和内存里都不存在这个 k 和 v

**画个图理解一下：**

![T2drbiFNcoottKxEw4HcnCPVnhd](http://images.kryiea.cn/img/T2drbiFNcoottKxEw4HcnCPVnhd.png)
### 3. Nil 状态

**先说结论**：

- nil 状态是为了优化 “对用一个 key 先删后写的场景优化”，让这个 key 能直接在 readmap 中无锁完成写，不需要加锁到 dirty 中操作。
- 可以说是让原本的 去 dirty 中加锁写  --> cas 无锁更新
- 同时 read 是可以挡住删除的流量的，通过 cas 操作在 readmap 中将 key 的值变成 nil，表示当前 key 在逻辑上已经删除了。

**现在来模拟一下读、写两个操作：**

- 读：读到 key 的值为 nil，直接返回 nil，读不到，用户可以认为改 key 被删除了。
- 写：当 key 存在，但是值为 nil，代表 key 在 read 和 dirty 都存着，可以再次通过 cas 操作，将 nil 改为对于的 value 值，完成了更新操作，避免了加锁访问 dirty。

### 4. Expunged 状态

在 `Read map --> Dirty map` 过程中，read 只会将逻辑上存在的数据 copy 给 dirty。

**那么问题是：**

- read 中 nil 的数据，不会 copy 给 dirty，也就是会导致两个 map 的数据不一致。在下一次更新/写操作到来，在 read 层就读到了该 key 为 nil 值，但是 dirty 中是没有这个 key 的。
- 这个时候就需要在 copy 完之后，将原本为 nil 的 key 设置为 expunged。表示硬删除

**简而言之：** expunged 状态是由 nil 状态 流转来的，在发生 `Read map --> Dirty map` 过程后，需要把 readmap 的 nil 状态 修改为 expunged

## 七、回顾 sync.Map 的底层原理

1. **空间换时间：** read map 尽量用 cas 操作无锁完成 `读、删、更新` 的操作，dirty map 加锁完成写操作。
2. **数据的双向流转：** read <-----> dirty
3. **Entry 的nil 和 expunged状态设计：** 优化的先删后写场景和无锁完成删操作。

## 八、sync.Map  的不足

1. 不适合多写的场景，当写多的时候 `sync.Map` 就相当于 `map + Mutex` 性能没那么好。
2. sync.Map 存在 read ----> dirty 的数据流转过程，这是一个线性时间复杂度 O(n)的过程，当 k-v 数量较多的时候，容易导致程序性能抖动。比如需要访问 sync.Map 拿锁去操作的协程需要一直等待这个线性时间复杂度的过程完成。

## 九、sync.Map 源码走读

### 1. Load() - 读

```go
// Load 方法根据 key 加载相应的 value，如果 key 存在且value有效，返回存储的值和一个布尔值，表示查找成功。
func (m *Map) Load(key any) (value any, ok bool) {
    // 首先读取 readOnly 结构体，加载 read map
    read := m.loadReadOnly()
    // 尝试从 read 中获取 k-v
    e, ok := read.m[key]
    // 若 read 中没有，并且 read 的数据不全，加锁访问 dirty 获取
    if !ok && read.amended {
        // 加锁以操作 dirty 
        m.mu.Lock()
        // double_check：检查自上次加载 read 以来，dirty 字段是否已经被提升为 read。
        // 目的是避免有其他 goroutine 更新了 read。 dirtymap -----> readmap
        read = m.loadReadOnly()
        // 再次尝试从 read中获取 k-v
        e, ok = read.m[key]
        // 若 read 中没有，并且 read 的数据不全，到 dirty 获取
        if !ok && read.amended {
            // 若在 dirty 字段中找到条目
            e, ok = m.dirty[key]
            // 记录一次 miss，这将加速提升 dirty 到 read 的过程，相当于dirty的压力++
            m.missLocked()
        }
        // 操作结束，解锁
        m.mu.Unlock()
    }
    // 若连 dirty 中都没有
    if !ok {
        // 返回 nil 和 false
        return nil, false
    }

    // 若找到 k-v，调用其 load 方法得到 v
    return e.load()
}
```

### 2. missLocked() - missssss

包含：自增 miss，判断是否将 dirty 晋升

```go
// missLocked 处理 read 未命中的情况
func (m *Map) missLocked() {
    // 每次未命中时增加 misses 计数
    m.misses++
    // 如果 misses 计数小于脏数据的数量，则不需要采取进一步的操作
    if m.misses < len(m.dirty) {
        return
    }
    // 发生数据流转： dirty -----> read
    // 创建一个新的只读缓存，并将 misses 计数重置为 0
    m.read.Store(&readOnly{m: m.dirty})
    m.dirty = nil
    m.misses = 0
}
```

### 3. Store() - 写

```go
// Store 整合了写和更新操作，底层调用 Swap()
func (m *Map) Store(key, value any) {
    _, _ = m.Swap(key, value)
}

func (m *Map) Swap(key, value any) (previous any, loaded bool) {
    // 加载 read
    read := m.loadReadOnly()
    
    // 如果 key 已经存在于 read 中，尝试在 read 中更新 key
    if e, ok := read.m[key]; ok {
        // 尝试用 cas在 read 更新 key，避免加锁访问 dirty
        if v, ok := e.trySwap(&value); ok {
            if v == nil {
                // 返回 nil 和 false，表示没有加载任何值
                return nil, false
            }
            // 返回旧值和 true，表示已经加载
            return *v, true
        }
    }

    // 加锁操作 dirty
    m.mu.Lock()
    // double_check 
    read = m.loadReadOnly()
    
    // 如果key存在于read中
    if e, ok := read.m[key]; ok {
        // 将 key 修改为非 expunged 状态 ----> nil
        if e.unexpungeLocked() {
            //entry是共享的，expunged状态下的entry，只有read有它的指针，这一步就是让dirty也能有这个key和entry。
            //同时unexpungeLocked() 就是通过cas将expunged态的entry变成nil态，这就代表read和dirty都有个nil的entry。
            //上面的两个过程一起完成这个enrty“复活”，以便后面完成真正的更新操作 
            m.dirty[key] = e
        }
        
        // cas交换值
        if v := e.swapLocked(&value); v!= nil {
            // 设置加载标志为 true，表示加载了新值
            loaded = true
            previous = *v
        }
       // 如果 k 不存在于 read 中，但存在于 dirty 中
    } else if e, ok := m.dirty[key]; ok {
        // cas交换值
        if v := e.swapLocked(&value); v!= nil {
            // 设置加载标志为 true，表示加载了新值
            loaded = true
            previous = *v
        // 如果 k 既不存在于 raed 中，也不存在于 dirty 中
        } else {
        // 如果 dirty 未被修改
        if!read.amended {
                // 为 dirty 分配空间并标记 read 为不完整
                m.dirtyLocked()
                m.read.Store(&readOnly{m: read.m, amended: true})
        }
        // 将新的 kv 对添加到 dirty 中
        m.dirty[key] = newEntry(value)
    }
    // 释放互斥锁
    m.mu.Unlock()
    // 返回
    return previous, loaded
}


func (e *entry) trySwap(i *any) (*any, bool) {
    // 无限循环，直到交换成功或者entry被移除。
    for {
        // 加载当前 entry 指针。
        p := e.p.Load()
        // 如果entry被移除（指针为 expunged，代表硬删除），则返回 nil 和 false。
        if p == expunged {
            return nil, false
        }
        // 尝试使用原子操作 CompareAndSwap 将新值交换到 entry。
        if e.p.CompareAndSwap(p, i) {
            // 如果操作成功，返回 p 和 true。
            return p, true
        }
    }
}
```

### 4. Range() - 读

注意：

1. Range 方法不保证遍历期间 map 内容的一致性。Range 方法不会阻塞其他方法的执行。
2. 遍历期间，键不会被重复访问，但键的值可能会因为并发操作而发生变化。

```go
func (m *Map) Range(f func(key, value any) bool) {
    read := m.loadReadOnly()
    if read.amended {
        m.mu.Lock()
        read = m.loadReadOnly()
        if read.amended {
            read = readOnly{m: m.dirty}
            m.read.Store(&read)
            m.dirty = nil
            m.misses = 0
        }
        m.mu.Unlock()
    }

    for k, e := range read.m {
        v, ok := e.load()
        if !ok {
            continue
        }
        if !f(k, v) {
            break
        }
    }
}
```
