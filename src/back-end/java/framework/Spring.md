---
title: Spring框架
order: 1
# 这是页面的分类
category:
  - Java
  - 框架
# 这是页面的标签
tag:
  - Spring
  - 依赖注入
  - AOP
---

# Spring框架

## 简介

Spring是Java平台的一个开源应用框架，提供了一个简易的开发方式，通过依赖注入和面向切面编程。

## 核心特性

- 依赖注入（DI）
- 面向切面编程（AOP）
- 事务管理
- MVC框架
- 安全框架

## 依赖注入示例

```java
// 定义接口
public interface MessageService {
    String getMessage();
}

// 实现类
public class MessageServiceImpl implements MessageService {
    public String getMessage() {
        return "Hello, Spring!";
    }
}

// 使用依赖注入
public class MessagePrinter {
    private MessageService service;
    
    // 构造函数注入
    public MessagePrinter(MessageService service) {
        this.service = service;
    }
    
    public void printMessage() {
        System.out.println(service.getMessage());
    }
}
```

## Spring Boot

Spring Boot是Spring框架的扩展，简化了Spring应用的初始搭建和开发过程。它采用了特定的方式来进行配置，使开发人员不再需要定义样板化的配置。

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```