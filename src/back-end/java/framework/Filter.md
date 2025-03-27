---
title: Filter学习笔记
description: Java Filter过滤器的基础概念、使用方法及应用场景详解
date: 2024-05-20
category:
  - Java
tag:
  - Web开发
  - Filter
  - JavaEE
---

本文详细介绍了Java Filter过滤器的核心概念、工作原理、生命周期以及常见应用场景，快速掌握Java Web开发中的过滤器技术。

<!-- more -->
::: tip
Filter是Java Web开发中的重要组件，它可以对请求和响应进行预处理和后处理，是实现诸如权限验证、日志记录、编码转换等功能的理想选择。
:::

## 1. Filter概述

### 1.1 什么是Filter

Filter（过滤器）是Java Servlet规范中定义的组件，它可以拦截和处理对Web资源（如Servlet、JSP页面或HTML文件）的请求和响应。Filter不是一个标准的Servlet，它不能直接处理用户请求生成响应，但它可以修改请求和响应，或者根据特定条件阻止请求的继续处理。

与Servlet相比，Filter具有以下特点：

- **拦截能力**：可以拦截进入Web应用的请求和离开Web应用的响应
- **链式处理**：多个Filter可以组成一个过滤器链（Filter Chain）
- **非终端处理**：通常不直接生成响应，而是修改或增强请求/响应
- **可配置性**：可以通过注解或XML配置应用于特定的URL模式

### 1.2 Filter的作用

Filter在Web应用中主要用于以下场景：

1. **身份验证和授权**：验证用户身份，控制资源访问权限
2. **日志记录**：记录请求信息，如IP地址、访问时间、请求参数等
3. **数据转换**：如请求参数的编码转换、响应内容的压缩等
4. **响应内容修改**：添加或修改HTTP头信息，修改响应内容
5. **性能监控**：记录请求处理时间，监控应用性能
6. **缓存控制**：实现简单的页面缓存机制
7. **会话管理**：处理会话相关的操作，如会话验证、会话劫持防护等

## 2. Filter快速入门

### 2.1 环境准备

开发Filter应用需要以下组件：

1. JDK 8或更高版本
2. Servlet容器（如Tomcat、Jetty或Undertow）
3. IDE（如IntelliJ IDEA、Eclipse）
4. Maven或Gradle（用于依赖管理）

### 2.2 创建第一个Filter

#### 2.2.1 添加依赖

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

#### 2.2.2 创建Filter类

```java
package com.example.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter("/api/*")
public class LoggingFilter implements Filter {
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // 过滤器初始化时调用
        System.out.println("LoggingFilter 初始化中...");
    }
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        // 转换为HTTP请求以获取更多信息
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        
        // 记录请求信息
        String requestURI = httpRequest.getRequestURI();
        String method = httpRequest.getMethod();
        String remoteAddr = request.getRemoteAddr();
        
        System.out.println("收到请求: " + method + " " + requestURI + " 来自 " + remoteAddr);
        
        // 记录请求处理时间
        long startTime = System.currentTimeMillis();
        
        // 继续处理请求（传递给下一个过滤器或目标资源）
        chain.doFilter(request, response);
        
        // 请求处理完成后的操作
        long endTime = System.currentTimeMillis();
        System.out.println("请求处理完成，耗时: " + (endTime - startTime) + "ms");
    }
    
    @Override
    public void destroy() {
        // 过滤器销毁时调用
        System.out.println("LoggingFilter 销毁中...");
    }
}
```

#### 2.2.3 urlPattern配置详解

与Servlet类似，Filter也使用urlPattern来定义哪些请求会被过滤。可以通过`@WebFilter`注解或web.xml配置。

##### 2.2.3.1 使用@WebFilter注解配置

```java
// 单个URL模式
@WebFilter("/api/*")

// 多个URL模式
@WebFilter(urlPatterns = {"/api/*", "/services/*"})

// 完整配置
@WebFilter(
    filterName = "loggingFilter",
    urlPatterns = {"/api/*", "/services/*"},
    initParams = {
        @WebInitParam(name = "logLevel", value = "INFO")
    }
)
```

##### 2.2.3.2 URL模式匹配规则

Filter的URL模式匹配规则与Servlet相同，支持以下几种模式：

1. **精确匹配**：完全匹配请求路径
   ```java
   @WebFilter("/login") // 只匹配 /login
   ```

2. **路径匹配**：以`/`开头，以`/*`结尾
   ```java
   @WebFilter("/admin/*") // 匹配 /admin/开头的所有路径
   ```

3. **扩展名匹配**：以`*.`开头
   ```java
   @WebFilter("*.jsp") // 匹配所有以.jsp结尾的请求
   ```

4. **全局过滤器**：使用`/*`
   ```java
   @WebFilter("/*") // 匹配所有请求
   ```

#### 2.2.4 配置web.xml（可选）

如果使用`@WebFilter`注解，则不需要在web.xml中配置。但如果需要使用XML配置，可以在`WEB-INF/web.xml`中添加：

```xml
<filter>
    <filter-name>loggingFilter</filter-name>
    <filter-class>com.example.filter.LoggingFilter</filter-class>
    <init-param>
        <param-name>logLevel</param-name>
        <param-value>INFO</param-value>
    </init-param>
</filter>

<filter-mapping>
    <filter-name>loggingFilter</filter-name>
    <url-pattern>/api/*</url-pattern>
</filter-mapping>
```

## 3. Filter生命周期

Filter的生命周期由Servlet容器管理，包含三个主要阶段：

### 3.1 初始化阶段

当Web应用启动时，Servlet容器会为每个Filter创建一个实例，并调用其`init()`方法进行初始化。初始化过程中，Filter可以通过FilterConfig获取配置参数。

```java
@Override
public void init(FilterConfig filterConfig) throws ServletException {
    // 获取初始化参数
    String logLevel = filterConfig.getInitParameter("logLevel");
    System.out.println("LoggingFilter 初始化中，日志级别: " + logLevel);
    
    // 获取Servlet上下文
    ServletContext context = filterConfig.getServletContext();
    // 可以在这里进行其他初始化操作
}
```

### 3.2 过滤阶段

当请求到达Web应用并匹配Filter的URL模式时，Servlet容器会调用Filter的`doFilter()`方法。在这个方法中，Filter可以：

- 检查请求参数和头信息
- 修改请求对象（如添加属性）
- 修改响应对象（如添加头信息）
- 拦截请求（不调用chain.doFilter()）
- 在请求处理前后执行操作

```java
@Override
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
    // 请求处理前的操作
    System.out.println("请求处理前...");
    
    // 继续处理请求
    chain.doFilter(request, response);
    
    // 请求处理后的操作
    System.out.println("请求处理后...");
}
```

::: warning 注意
如果不调用`chain.doFilter()`方法，请求将被拦截，不会传递给下一个Filter或目标资源。这在实现身份验证等功能时非常有用。
:::

### 3.3 销毁阶段

当Web应用关闭或重新加载时，Servlet容器会调用Filter的`destroy()`方法进行清理操作。

```java
@Override
public void destroy() {
    System.out.println("LoggingFilter 销毁中...");
    // 释放资源，关闭连接等
}
```

## 4. Filter链

### 4.1 Filter链的概念

Filter链是指多个Filter按照特定顺序依次处理请求和响应的机制。当一个请求到达Web应用时，它会依次经过Filter链中的每个Filter，然后到达目标资源（如Servlet）；响应则按照相反的顺序经过这些Filter返回客户端。

![Filter链工作原理](https://example.com/filter-chain.png)

### 4.2 Filter链的执行顺序

Filter链的执行顺序由以下因素决定：

1. **使用web.xml配置时**：按照`<filter-mapping>`元素在web.xml中的出现顺序
2. **使用@WebFilter注解时**：
   - 如果指定了`filterName`属性，则按照filterName的字母顺序
   - 如果没有指定`filterName`属性，则按照Filter类名的字母顺序

::: tip
如果需要精确控制Filter的执行顺序，建议使用web.xml配置而不是注解。
:::

### 4.3 Filter链示例

```java
// 第一个Filter
@WebFilter(filterName = "authenticationFilter", urlPatterns = "/*")
public class AuthenticationFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        System.out.println("AuthenticationFilter: 验证用户身份");
        // 验证逻辑...
        chain.doFilter(request, response);
        System.out.println("AuthenticationFilter: 请求处理完成");
    }
    // 其他方法省略...
}

// 第二个Filter
@WebFilter(filterName = "loggingFilter", urlPatterns = "/*")
public class LoggingFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        System.out.println("LoggingFilter: 记录请求信息");
        chain.doFilter(request, response);
        System.out.println("LoggingFilter: 记录响应信息");
    }
    // 其他方法省略...
}
```

执行顺序（按字母顺序）：
1. AuthenticationFilter（请求阶段）
2. LoggingFilter（请求阶段）
3. 目标资源（如Servlet）
4. LoggingFilter（响应阶段）
5. AuthenticationFilter（响应阶段）

## 5. 常见应用场景

### 5.1 身份验证Filter

```java
@WebFilter("/*")
public class AuthenticationFilter implements Filter {
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        // 获取当前会话
        HttpSession session = httpRequest.getSession(false);
        
        // 检查用户是否已登录
        boolean isLoggedIn = (session != null && session.getAttribute("user") != null);
        
        // 获取请求的URI
        String requestURI = httpRequest.getRequestURI();
        
        // 允许访问登录页面和静态资源
        boolean isLoginPage = requestURI.endsWith("login.jsp") || requestURI.endsWith("/login");
        boolean isStaticResource = requestURI.endsWith(".css") || requestURI.endsWith(".js") || 
                                  requestURI.endsWith(".png") || requestURI.endsWith(".jpg");
        
        if (isLoggedIn || isLoginPage || isStaticResource) {
            // 用户已登录或访问登录页面或静态资源，继续处理
            chain.doFilter(request, response);
        } else {
            // 用户未登录，重定向到登录页面
            httpResponse.sendRedirect(httpRequest.getContextPath() + "/login.jsp");
        }
    }
    
    // 其他方法省略...
}
```

### 5.2 字符编码Filter

```java
@WebFilter("/*")
public class CharacterEncodingFilter implements Filter {
    
    private String encoding = "UTF-8";
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        String encodingParam = filterConfig.getInitParameter("encoding");
        if (encodingParam != null && !encodingParam.isEmpty()) {
            encoding = encodingParam;
        }
    }
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        // 设置请求编码
        request.setCharacterEncoding(encoding);
        
        // 设置响应编码
        response.setCharacterEncoding(encoding);
        response.setContentType("text/html;charset=" + encoding);
        
        // 继续处理
        chain.doFilter(request, response);
    }
    
    // 其他方法省略...
}
```

### 5.3 性能监控Filter

```java
@WebFilter("/*")
public class PerformanceMonitorFilter implements Filter {
    
    private static final Logger logger = Logger.getLogger(PerformanceMonitorFilter.class.getName());
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        
        // 记录开始时间
        long startTime = System.currentTimeMillis();
        
        // 记录请求信息
        String requestURI = httpRequest.getRequestURI();
        String method = httpRequest.getMethod();
        
        try {
            // 继续处理请求
            chain.doFilter(request, response);
        } finally {
            // 计算处理时间
            long endTime = System.currentTimeMillis();
            long processingTime = endTime - startTime;
            
            // 记录性能信息
            logger.info(String.format("%s %s - 处理时间: %d ms", method, requestURI, processingTime));
            
            // 如果处理时间超过阈值，记录警告
            if (processingTime > 1000) {
                logger.warning(String.format("性能警告: %s %s 处理时间超过1秒 (%d ms)", 
                                            method, requestURI, processingTime));
            }
        }
    }
    
    // 其他方法省略...
}
```

### 5.4 CORS Filter

```java
@WebFilter("/*")
public class CORSFilter implements Filter {
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        // 设置CORS头信息
        httpResponse.setHeader("Access-Control-Allow-Origin", "*");
        httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        httpResponse.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        httpResponse.setHeader("Access-Control-Max-Age", "3600");
        
        // 继续处理
        chain.doFilter(request, response);
    }
    
    // 其他方法省略...
}
```

## 6. 最佳实践

### 6.1 性能考虑

- **避免重复操作**：如果多个Filter需要执行相同的操作，考虑合并或使用共享组件
- **减少阻塞操作**：在Filter中避免长时间运行的操作，如复杂的数据库查询
- **使用缓存**：对于频繁访问的资源，考虑实现缓存机制

### 6.2 安全考虑

- **输入验证**：验证所有用户输入，防止注入攻击
- **输出编码**：对输出内容进行适当编码，防止XSS攻击
- **敏感信息处理**：不要在日志中记录敏感信息，如密码、信用卡号等

### 6.3 可维护性考虑

- **单一职责原则**：每个Filter只负责一种功能，避免创建"超级Filter"
- **配置外部化**：使用初始化参数或外部配置文件，避免硬编码
- **适当的日志记录**：记录关键操作和异常情况，便于问题排查

## 7. 常见问题与解决方案

### 7.1 Filter不生效

可能的原因：
- URL模式配置错误
- Filter类路径错误
- web.xml配置错误

解决方案：
- 检查URL模式是否正确匹配目标请求
- 确保Filter类在正确的包中
- 验证web.xml中的配置是否正确

### 7.2 Filter执行顺序问题

可能的原因：
- 多个Filter的执行顺序不符合预期

解决方案：
- 使用web.xml配置而不是注解，按照所需顺序定义`<filter-mapping>`
- 使用注解时，通过命名约定控制顺序（如使用数字前缀：`01AuthFilter`、`02LogFilter`）

### 7.3 请求参数读取问题

可能的原因：
- 请求参数被多次读取导致流关闭

解决方案：
- 使用包装器类（Wrapper）包装请求对象，允许多次读取
- 在Filter中读取参数后，将其作为请求属性传递给后续组件