---
title: Java异常机制
description: 详细介绍Java异常机制的原理、使用方法和实践
date: 2024-01-01
category:
  - Java
tag:
  - 异常处理
  - 高级特性
---

本文详细介绍Java异常机制的基本概念、原理、使用方法以及实践。

<!-- more -->

## 1. 异常基础

异常是程序运行过程中出现的非正常情况，Java的异常处理机制提供了一种结构化和受控的方式来处理程序中的错误。

### 1.1 异常的概念

在Java中，异常是一个事件，它发生在程序运行期间，干扰了程序的正常指令流。当方法中发生错误时，方法会创建一个异常对象并交给运行时系统处理。

### 1.2 异常的分类

Java中的异常主要分为三类：

1. **检查型异常（Checked Exception）**：必须在代码中显式处理的异常
2. **非检查型异常（Unchecked Exception）**：运行时异常，不强制处理
3. **错误（Error）**：表示严重问题，通常不应该被捕获

```java
// Java异常层次结构
Throwable
├── Error                 // 严重错误，不应捕获
│   ├── OutOfMemoryError
│   ├── StackOverflowError
│   └── ...
└── Exception             // 异常基类
    ├── IOException       // 检查型异常
    ├── SQLException      // 检查型异常
    └── RuntimeException  // 非检查型异常
        ├── NullPointerException
        ├── ArrayIndexOutOfBoundsException
        └── ...
```

## 2. 异常处理机制

### 2.1 try-catch-finally

最基本的异常处理结构：

```java
public class ExceptionHandlingDemo {
    public static void main(String[] args) {
        try {
            // 可能抛出异常的代码
            int result = divide(10, 0);
            System.out.println("结果: " + result);
        } catch (ArithmeticException e) {
            // 处理特定类型的异常
            System.out.println("算术异常: " + e.getMessage());
        } catch (Exception e) {
            // 处理其他类型的异常
            System.out.println("其他异常: " + e.getMessage());
        } finally {
            // 无论是否发生异常都会执行的代码
            System.out.println("finally块总是执行");
        }
    }
    
    public static int divide(int a, int b) {
        return a / b; // 当b为0时抛出ArithmeticException
    }
}
```

### 2.2 try-with-resources

Java 7引入的自动资源管理：

```java
public class ResourceManagementDemo {
    public static void readFile(String path) {
        // 自动关闭资源
        try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("读取文件异常: " + e.getMessage());
        }
        // 不需要finally块来关闭资源
    }
}
```

### 2.3 throws声明

方法声明可能抛出的检查型异常：

```java
public class ThrowsDemo {
    // 声明方法可能抛出IOException
    public static void readFile(String path) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(path));
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
        reader.close();
    }
    
    public static void main(String[] args) {
        try {
            readFile("example.txt");
        } catch (IOException e) {
            System.out.println("IO异常: " + e.getMessage());
        }
    }
}
```

### 2.4 throw关键字

手动抛出异常：

```java
public class ThrowDemo {
    public static void validateAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("年龄不能为负数");
        }
        if (age > 150) {
            throw new IllegalArgumentException("年龄不合理");
        }
        System.out.println("年龄有效: " + age);
    }
    
    public static void main(String[] args) {
        try {
            validateAge(-5);
        } catch (IllegalArgumentException e) {
            System.out.println("参数异常: " + e.getMessage());
        }
    }
}
```

## 3. 自定义异常

### 3.1 创建自定义异常

```java
// 自定义检查型异常
public class InvalidUserException extends Exception {
    public InvalidUserException() {
        super();
    }
    
    public InvalidUserException(String message) {
        super(message);
    }
    
    public InvalidUserException(String message, Throwable cause) {
        super(message, cause);
    }
}

// 自定义运行时异常
public class BusinessException extends RuntimeException {
    public BusinessException() {
        super();
    }
    
    public BusinessException(String message) {
        super(message);
    }
    
    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

### 3.2 使用自定义异常

```java
public class UserService {
    public User findUser(String username) throws InvalidUserException {
        if (username == null || username.isEmpty()) {
            throw new InvalidUserException("用户名不能为空");
        }
        
        // 模拟数据库查询
        if ("admin".equals(username)) {
            return new User("admin", "Admin User");
        } else {
            throw new InvalidUserException("用户不存在: " + username);
        }
    }
    
    public void processBusinessLogic(String data) {
        if (data == null) {
            throw new BusinessException("数据不能为空");
        }
        // 处理业务逻辑
    }
}
```
