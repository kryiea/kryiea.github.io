---
title: Listener学习笔记
description: Java Listener监听器的基础概念、使用方法及应用场景详解
date: 2024-05-20
category:
  - Java
tag:
  - Web开发
  - Listener
  - JavaEE
---

本文详细介绍了Java Listener监听器的核心概念、工作原理、生命周期以及常见应用场景，快速掌握Java Web开发中的监听器技术。

<!-- more -->
::: tip
Listener是Java Web开发中的重要组件，它可以监听Web应用中的各种事件，如应用启动/关闭、会话创建/销毁、属性变更等，是实现诸如资源初始化、统计分析、日志记录等功能的理想选择。
:::

## 1. Listener概述

### 1.1 什么是Listener

Listener（监听器）是Java Servlet规范中定义的组件，它用于监听Web应用中的各种事件，如ServletContext、HttpSession和ServletRequest的创建、销毁和属性变更等。当这些事件发生时，容器会调用相应的Listener进行处理。

与Servlet和Filter相比，Listener具有以下特点：

- **被动触发**：不直接处理请求，而是对特定事件做出响应
- **观察者模式**：基于观察者设计模式实现
- **生命周期管理**：可以监听Web组件的创建和销毁
- **属性变更监控**：可以监听属性的添加、移除和替换

### 1.2 Listener的作用

Listener在Web应用中主要用于以下场景：

1. **应用初始化**：在应用启动时初始化资源，如数据库连接池、配置信息等
2. **应用清理**：在应用关闭时释放资源，如关闭数据库连接、清理临时文件等
3. **会话管理**：跟踪在线用户数量，实现单点登录，防止会话固定攻击等
4. **统计分析**：收集用户访问数据，分析用户行为模式
5. **事件处理**：响应特定事件，如用户登录/注销、购物车更新等
6. **属性监控**：监控重要属性的变化，如用户权限变更、系统状态更新等

## 2. Listener快速入门

### 2.1 环境准备

开发Listener应用需要以下组件：

1. JDK 8或更高版本
2. Servlet容器（如Tomcat、Jetty或Undertow）
3. IDE（如IntelliJ IDEA、Eclipse）
4. Maven或Gradle（用于依赖管理）

### 2.2 Listener的分类

Java Servlet规范定义了多种类型的Listener，按照监听对象和事件类型可以分为以下几类：

#### 2.2.1 ServletContext相关监听器

- **ServletContextListener**：监听ServletContext的创建和销毁
- **ServletContextAttributeListener**：监听ServletContext属性的添加、移除和替换

#### 2.2.2 HttpSession相关监听器

- **HttpSessionListener**：监听HttpSession的创建和销毁
- **HttpSessionAttributeListener**：监听HttpSession属性的添加、移除和替换
- **HttpSessionBindingListener**：监听对象绑定到HttpSession或从HttpSession解除绑定
- **HttpSessionActivationListener**：监听HttpSession的钝化和活化

#### 2.2.3 ServletRequest相关监听器

- **ServletRequestListener**：监听ServletRequest的创建和销毁
- **ServletRequestAttributeListener**：监听ServletRequest属性的添加、移除和替换

### 2.3 创建第一个Listener

#### 2.3.1 添加依赖

在Maven项目的pom.xml中添加Servlet API依赖：

```xml
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>4.0.1</version>
    <scope>provided</scope>
</dependency>
```

::: tip
对于Jakarta EE 9+项目，应使用jakarta.servlet-api依赖。
:::

#### 2.3.2 创建ServletContextListener

```java
package com.example.listener;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class AppInitListener implements ServletContextListener {
    
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // 获取ServletContext对象
        ServletContext context = sce.getServletContext();
        
        // 应用启动时执行的初始化操作
        System.out.println("Web应用启动中...");
        
        // 初始化应用级别的资源
        String dbUrl = context.getInitParameter("dbUrl");
        String dbUser = context.getInitParameter("dbUser");
        
        // 创建数据库连接池或其他资源
        // DatabaseConnectionPool pool = new DatabaseConnectionPool(dbUrl, dbUser);
        
        // 将资源存储在ServletContext中，供全局使用
        // context.setAttribute("connectionPool", pool);
        
        System.out.println("应用初始化完成");
    }
    
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // 获取ServletContext对象
        ServletContext context = sce.getServletContext();
        
        // 应用关闭时执行的清理操作
        System.out.println("Web应用关闭中...");
        
        // 释放资源
        // DatabaseConnectionPool pool = (DatabaseConnectionPool) context.getAttribute("connectionPool");
        // if (pool != null) {
        //     pool.close();
        // }
        
        System.out.println("应用资源已释放");
    }
}
```

#### 2.3.3 创建HttpSessionListener

```java
package com.example.listener;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.util.concurrent.atomic.AtomicInteger;

@WebListener
public class SessionCountListener implements HttpSessionListener {
    
    // 使用AtomicInteger保证线程安全
    private static final AtomicInteger activeSessions = new AtomicInteger(0);
    
    @Override
    public void sessionCreated(HttpSessionEvent se) {
        // 会话创建时，活跃会话数加1
        int currentActiveSessions = activeSessions.incrementAndGet();
        
        // 获取当前会话
        HttpSession session = se.getSession();
        
        System.out.println("会话创建: " + session.getId());
        System.out.println("当前活跃会话数: " + currentActiveSessions);
        
        // 可以在这里设置会话属性，如创建时间
        session.setAttribute("creationTime", System.currentTimeMillis());
    }
    
    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        // 会话销毁时，活跃会话数减1
        int currentActiveSessions = activeSessions.decrementAndGet();
        
        // 获取当前会话
        HttpSession session = se.getSession();
        
        System.out.println("会话销毁: " + session.getId());
        System.out.println("当前活跃会话数: " + currentActiveSessions);
    }
    
    // 提供一个静态方法，用于获取当前活跃会话数
    public static int getActiveSessionCount() {
        return activeSessions.get();
    }
}
```

#### 2.3.4 创建ServletRequestListener

```java
package com.example.listener;

import javax.servlet.ServletRequest;
import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpServletRequest;

@WebListener
public class RequestLogListener implements ServletRequestListener {
    
    @Override
    public void requestInitialized(ServletRequestEvent sre) {
        // 获取请求对象
        ServletRequest request = sre.getServletRequest();
        
        // 如果是HTTP请求，可以获取更多信息
        if (request instanceof HttpServletRequest) {
            HttpServletRequest httpRequest = (HttpServletRequest) request;
            
            // 记录请求信息
            String requestURI = httpRequest.getRequestURI();
            String method = httpRequest.getMethod();
            String remoteAddr = request.getRemoteAddr();
            
            System.out.println("请求开始: " + method + " " + requestURI + " 来自 " + remoteAddr);
            
            // 记录请求开始时间，用于计算请求处理时间
            request.setAttribute("requestStartTime", System.currentTimeMillis());
        }
    }
    
    @Override
    public void requestDestroyed(ServletRequestEvent sre) {
        // 获取请求对象
        ServletRequest request = sre.getServletRequest();
        
        // 如果是HTTP请求，可以获取更多信息
        if (request instanceof HttpServletRequest) {
            HttpServletRequest httpRequest = (HttpServletRequest) request;
            
            // 获取请求开始时间
            Long startTime = (Long) request.getAttribute("requestStartTime");
            
            if (startTime != null) {
                // 计算请求处理时间
                long endTime = System.currentTimeMillis();
                long processingTime = endTime - startTime;
                
                String requestURI = httpRequest.getRequestURI();
                System.out.println("请求结束: " + requestURI + " 处理时间: " + processingTime + "ms");
            }
        }
    }
}
```

#### 2.3.5 配置web.xml（可选）

如果使用`@WebListener`注解，则不需要在web.xml中配置。但如果需要使用XML配置，可以在`WEB-INF/web.xml`中添加：

```xml
<listener>
    <listener-class>com.example.listener.AppInitListener</listener-class>
</listener>

<listener>
    <listener-class>com.example.listener.SessionCountListener</listener-class>
</listener>

<listener>
    <listener-class>com.example.listener.RequestLogListener</listener-class>
</listener>
```

## 3. Listener生命周期

### 3.1 ServletContextListener生命周期

ServletContextListener的生命周期与Web应用的生命周期紧密相关：

1. **初始化阶段**：当Web应用启动时，Servlet容器会创建ServletContext，然后调用所有ServletContextListener的`contextInitialized()`方法。这个阶段通常用于初始化应用级别的资源。

2. **销毁阶段**：当Web应用关闭时，Servlet容器会调用所有ServletContextListener的`contextDestroyed()`方法，然后销毁ServletContext。这个阶段通常用于释放应用级别的资源。

### 3.2 HttpSessionListener生命周期

HttpSessionListener的生命周期与HttpSession的生命周期相关：

1. **创建阶段**：当用户首次访问Web应用并且需要创建会话时，Servlet容器会创建HttpSession，然后调用所有HttpSessionListener的`sessionCreated()`方法。

2. **销毁阶段**：当会话超时或被显式销毁时，Servlet容器会调用所有HttpSessionListener的`sessionDestroyed()`方法，然后销毁HttpSession。

### 3.3 ServletRequestListener生命周期

ServletRequestListener的生命周期与ServletRequest的生命周期相关：

1. **初始化阶段**：当请求到达Web应用时，Servlet容器会创建ServletRequest，然后调用所有ServletRequestListener的`requestInitialized()`方法。

2. **销毁阶段**：当请求处理完成时，Servlet容器会调用所有ServletRequestListener的`requestDestroyed()`方法，然后销毁ServletRequest。

## 4. 属性监听器

### 4.1 ServletContextAttributeListener

```java
package com.example.listener;

import javax.servlet.ServletContextAttributeEvent;
import javax.servlet.ServletContextAttributeListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class ContextAttributeListener implements ServletContextAttributeListener {
    
    @Override
    public void attributeAdded(ServletContextAttributeEvent event) {
        String name = event.getName();
        Object value = event.getValue();
        System.out.println("ServletContext属性添加: " + name + " = " + value);
    }
    
    @Override
    public void attributeRemoved(ServletContextAttributeEvent event) {
        String name = event.getName();
        Object value = event.getValue();
        System.out.println("ServletContext属性移除: " + name + " = " + value);
    }
    
    @Override
    public void attributeReplaced(ServletContextAttributeEvent event) {
        String name = event.getName();
        Object value = event.getValue(); // 获取的是旧值
        Object newValue = event.getServletContext().getAttribute(name); // 获取新值
        System.out.println("ServletContext属性替换: " + name + " 旧值 = " + value + ", 新值 = " + newValue);
    }
}
```

### 4.2 HttpSessionAttributeListener

```java
package com.example.listener;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;

@WebListener
public class SessionAttributeListener implements HttpSessionAttributeListener {
    
    @Override
    public void attributeAdded(HttpSessionBindingEvent event) {
        String name = event.getName();
        Object value = event.getValue();
        String sessionId = event.getSession().getId();
        System.out.println("会话[" + sessionId + "]属性添加: " + name + " = " + value);
    }
    
    @Override
    public void attributeRemoved(HttpSessionBindingEvent event) {
        String name = event.getName();
        Object value = event.getValue();
        String sessionId = event.getSession().getId();
        System.out.println("会话[" + sessionId + "]属性移除: " + name + " = " + value);
    }
    
    @Override
    public void attributeReplaced(HttpSessionBindingEvent event) {
        String name = event.getName();
        Object value = event.getValue(); // 获取的是旧值
        Object newValue = event.getSession().getAttribute(name); // 获取新值
        String sessionId = event.getSession().getId();
        System.out.println("会话[" + sessionId + "]属性替换: " + name + " 旧值 = " + value + ", 新值 = " + newValue);
    }
}
```

### 4.3 ServletRequestAttributeListener

```java
package com.example.listener;

import javax.servlet.ServletRequestAttributeEvent;
import javax.servlet.ServletRequestAttributeListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpServletRequest;

@WebListener
public class RequestAttributeListener implements ServletRequestAttributeListener {
    
    @Override
    public void attributeAdded(ServletRequestAttributeEvent event) {
        String name = event.getName();
        Object value = event.getValue();
        
        // 如果是HTTP请求，可以获取更多信息
        if (event.getServletRequest() instanceof HttpServletRequest) {
            HttpServletRequest request = (HttpServletRequest) event.getServletRequest();
            String requestURI = request.getRequestURI();
            System.out.println("请求[" + requestURI + "]属性添加: " + name + " = " + value);
        } else {
            System.out.println("请求属性添加: " + name + " = " + value);
        }
    }
    
    @Override
    public void attributeRemoved(ServletRequestAttributeEvent event) {
        String name = event.getName();
        Object value = event.getValue();
        
        // 如果是HTTP请求，可以获取更多信息
        if (event.getServletRequest() instanceof HttpServletRequest) {
            HttpServletRequest request = (HttpServletRequest) event.getServletRequest();
            String requestURI = request.getRequestURI();
            System.out.println("请求[" + requestURI + "]属性移除: " + name + " = " + value);
        } else {
            System.out.println("请求属性移除: " + name + " = " + value);
        }
    }
    
    @Override
    public void attributeReplaced(ServletRequestAttributeEvent event) {
        String name = event.getName();
        Object value = event.getValue(); // 获取的是旧值
        Object newValue = event.getServletRequest().getAttribute(name); // 获取新值
        
        // 如果是HTTP请求，可以获取更多信息
        if (event.getServletRequest() instanceof HttpServletRequest) {
            HttpServletRequest request = (HttpServletRequest) event.getServletRequest();
            String requestURI = request.getRequestURI();
            System.out.println("请求[" + requestURI + "]属性替换: " + name + " 旧值 = " + value + ", 新值 = " + newValue);
        } else {
            System.out.println("请求属性替换: " + name + " 旧值 = " + value + ", 新值 = " + newValue);
        }
    }
}
```

## 5. 特殊监听器

### 5.1 HttpSessionBindingListener

HttpSessionBindingListener不需要在web.xml中配置，也不需要使用@WebListener注解。它是由实现该接口的对象自身负责监听其绑定到会话或从会话解除绑定的事件。

```java
package com.example.listener;

import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;
import java.io.Serializable;

public class User implements HttpSessionBindingListener, Serializable {
    
    private static final long serialVersionUID = 1L;
    
    private String username;
    private String email;
    
    public User(String username, String email) {
        this.username = username;
        this.email = email;
    }
    
    // Getters and setters...
    
    @Override
    public void valueBound(HttpSessionBindingEvent event) {
        String attributeName = event.getName();
        String sessionId = event.getSession().getId();
        System.out.println("用户[" + username + "]对象被绑定到会话[" + sessionId + "]的属性[" + attributeName + "]");
    }
    
    @Override
    public void valueUnbound(HttpSessionBindingEvent event) {
        String attributeName = event.getName();
        String sessionId = event.getSession().getId();
        System.out.println("用户[" + username + "]对象从会话[" + sessionId + "]的属性[" + attributeName + "]解除绑定");
    }
}
```

使用示例：

```java
// 在Servlet中
User user = new User("john", "john@example.com");
session.setAttribute("currentUser", user); // 触发valueBound方法

// 稍后
session.removeAttribute("currentUser"); // 触发valueUnbound方法
// 或者会话超时/失效时也会触发valueUnbound方法
```

### 5.2 HttpSessionActivationListener

HttpSessionActivationListener用于监听会话的钝化（序列化到磁盘）和活化（从磁盘反序列化）事件。在分布式环境或内存不足时，容器可能会将不活跃的会话序列化到磁盘以释放内存。

```java
package com.example.listener;

import javax.servlet.http.HttpSessionActivationListener;
import javax.servlet.http.HttpSessionEvent;
import java.io.Serializable;

public class ShoppingCart implements HttpSessionActivationListener, Serializable {
    
    private static final long serialVersionUID = 1L;
    
    private List<Product> items = new ArrayList<>();
    private double total = 0.0;
    
    // 添加商品、计算总价等方法...
    
    @Override
    public void sessionWillPassivate(HttpSessionEvent se) {
        String sessionId = se.getSession().getId();
        System.out.println("购物车对象即将随会话[" + sessionId + "]钝化到磁盘");
        // 可以在这里进行一些清理工作，如关闭资源等
    }
    
    @Override
    public void sessionDidActivate(HttpSessionEvent se) {
        String sessionId = se.getSession().getId();
        System.out.println("购物车对象随会话[" + sessionId + "]从磁盘活化");
        // 可以在这里进行一些初始化工作，如重新建立连接等
    }
}
```

使用示例：

```java
// 在Servlet中
ShoppingCart cart = new ShoppingCart();
cart.addItem(new Product("手机", 3999.0));
session.setAttribute("cart", cart);

// 当会话钝化时，sessionWillPassivate方法会被调用
// 当会话活化时，sessionDidActivate方法会被调用
```

## 6. 常见应用场景

### 6.1 应用初始化和资源管理

```java
@WebListener
public class ApplicationResourceManager implements ServletContextListener {
    
    private DataSource dataSource;
    
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ServletContext context = sce.getServletContext();
        
        // 读取配置参数
        String dbUrl = context.getInitParameter("dbUrl");
        String dbUser = context.getInitParameter("dbUser");
        String dbPassword = context.getInitParameter("dbPassword");
        
        try {
            // 初始化数据库连接池
            ComboPooledDataSource cpds = new ComboPooledDataSource();
            cpds.setDriverClass("com.mysql.cj.jdbc.Driver");
            cpds.setJdbcUrl(dbUrl);
            cpds.setUser(dbUser);
            cpds.setPassword(dbPassword);
            
            // 配置连接池参数
            cpds.setMinPoolSize(5);
            cpds.setMaxPoolSize(50);
            
            dataSource = cpds;
            
            // 将数据源存储在ServletContext中
            context.setAttribute("dataSource", dataSource);
            
            System.out.println("数据库连接池初始化成功");
            
            // 加载其他应用资源...
            
        } catch (Exception e) {
            System.err.println("初始化数据库连接池失败: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // 关闭数据库连接池
        if (dataSource instanceof ComboPooledDataSource) {
            ComboPooledDataSource cpds = (ComboPooledDataSource) dataSource;
            cpds.close();
            System.out.println("数据库连接池已关闭");
        }
        
        // 释放其他资源...
    }
}
```

### 6.2 在线用户统计

```java
@WebListener
public class OnlineUserManager implements HttpSessionListener, HttpSessionAttributeListener {
    
    private static final Set<String> onlineUsers = Collections.synchronizedSet(new HashSet<>());
    
    @Override
    public void sessionCreated(HttpSessionEvent se) {
        // 会话创建时不做处理，等用户登录后再添加到在线用户列表
    }
    
    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        HttpSession session = se.getSession();
        String username = (String) session.getAttribute("username");
        
        // 如果用户已登录，从在线用户列表中移除
        if (username != null) {
            onlineUsers.remove(username);
            System.out.println("用户[" + username + "]已离线，当前在线用户数: " + onlineUsers.size());
        }
    }
    
    @Override
    public void attributeAdded(HttpSessionBindingEvent event) {
        // 当用户登录成功时，会在会话中添加username属性
        if ("username".equals(event.getName())) {
            String username = (String) event.getValue();
            onlineUsers.add(username);
            System.out.println("用户[" + username + "]已上线，当前在线用户数: " + onlineUsers.size());
        }
    }
    
    @Override
    public void attributeRemoved(HttpSessionBindingEvent event) {
        // 当用户注销时，会从会话中移除username属性
        if ("username".equals(event.getName())) {
            String username = (String) event.getValue();
            onlineUsers.remove(username);
            System.out.println("用户[" + username + "]已离线，当前在线用户数: " + onlineUsers.size());
        }
    }
    
    @Override
    public void attributeReplaced(HttpSessionBindingEvent event) {
        // 处理用户切换账号的情况
        if ("username".equals(event.getName())) {
            String oldUsername = (String) event.getValue();
            String newUsername = (String) event.getSession().getAttribute("username");
            
            onlineUsers.remove(oldUsername);
            onlineUsers.add(newUsername);
            
            System.out.println("用户从[" + oldUsername + "]切换到[" + newUsername + "]，当前在线用户数: " + onlineUsers.size());
        }
    }
    
    // 提供一个静态方法，用于获取当前在线用户列表
    public static Set<String> getOnlineUsers() {
        return Collections.unmodifiableSet(onlineUsers);
    }
    
    // 提供一个静态方法，用于获取当前在线用户数
    public static int getOnlineUserCount() {
        return onlineUsers.size();