---
title: Java并发编程
order: 1
# 这是页面的图标
icon: 
---

# Java并发编程

## 线程基础

在Java中创建线程有两种方式：

1. 继承Thread类
2. 实现Runnable接口

```java
// 方式1：继承Thread类
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread is running...");
    }
}

// 方式2：实现Runnable接口
class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Runnable is running...");
    }
}
```

## 线程同步

Java提供了多种线程同步机制：

1. synchronized关键字
2. Lock接口
3. volatile关键字
4. 原子类

## 线程池

Java提供了Executor框架来创建和管理线程池：

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadPoolExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(5);
        
        for (int i = 0; i < 10; i++) {
            Runnable worker = new WorkerThread("Task " + i);
            executor.execute(worker);
        }
        
        executor.shutdown();
    }
}
```