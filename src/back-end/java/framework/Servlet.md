---
title: Servlet学习笔记
description: Java Servlet技术的基础概念、使用方法及常见问题解析
date: 2024-05-15
category:
  - Java
tag:
  - Web开发
  - Servlet
  - JavaEE
---

本文详细介绍了Java Servlet技术的核心概念、开发流程、生命周期以及常见问题，快速掌握Java Web开发的基础。

<!-- more -->
::: tip
Servlet是Java Web开发的基础，掌握Servlet的核心概念和使用方法对于理解其他Java Web框架（如Spring MVC）非常重要。

随着技术的发展，Java Web开发通常使用更高级的框架，但Servlet作为底层技术，仍然是这些框架的基础。

理解Servlet有助于更深入地理解这些框架的工作原理。
:::
## 1. Servlet概述




### 1.1 什么是Servlet

Servlet（Server Applet）是运行在Web服务器上的Java程序，它是Java Web应用的核心组件，主要用于处理客户端的HTTP请求并生成响应。Servlet充当Web浏览器或其他HTTP客户端与后端数据库或应用程序之间的中间层。

与传统的CGI（Common Gateway Interface）相比，Servlet具有以下优势：

- **性能更高**：Servlet在Web服务器的地址空间内执行，无需创建新进程
- **平台无关性**：基于Java，可在任何支持Java的平台上运行
- **安全性**：继承了Java语言的安全特性
- **可扩展性**：可以访问Java API的完整功能集

### 1.2 Servlet的作用

Servlet在Web应用中主要承担以下职责：

1. 接收和处理来自客户端的请求
2. 访问后端资源（如数据库）
3. 生成动态内容
4. 将响应发送回客户端
5. 维护会话和状态管理

## 2. Servlet快速入门

### 2.1 环境准备

开发Servlet应用需要以下组件：

1. JDK 8或更高版本
2. Servlet容器（如Tomcat、Jetty或Undertow）
3. IDE（如IntelliJ IDEA、Eclipse）
4. Maven或Gradle（用于依赖管理）

### 2.2 创建第一个Servlet

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

#### 2.2.2 创建Servlet类

```java
package com.example.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        // 设置响应内容类型
        response.setContentType("text/html;charset=UTF-8");
        
        // 获取输出流
        PrintWriter out = response.getWriter();
        
        // 输出HTML内容
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("<title>Hello Servlet</title>");
        out.println("</head>");
        out.println("<body>");
        out.println("<h1>Hello, Servlet World!</h1>");
        out.println("<p>当前时间: " + new java.util.Date() + "</p>");
        out.println("</body>");
        out.println("</html>");
    }
}
```

#### 2.2.3 urlPattern配置详解

urlPattern是Servlet映射的核心配置，它定义了哪些URL请求会被特定的Servlet处理。无论是使用注解还是XML配置，都需要理解urlPattern的配置规则。

##### 2.2.3.1 使用@WebServlet注解配置

`@WebServlet`注解提供了多种配置urlPattern的方式：

```java
// 单个URL模式
@WebServlet("/hello")

// 多个URL模式
@WebServlet(urlPatterns = {"/hello", "/greeting"})

// 完整配置
@WebServlet(
    name = "helloServlet",
    urlPatterns = {"/hello", "/greeting"},
    loadOnStartup = 1
)
```

##### 2.2.3.2 URL模式匹配规则

Servlet支持以下几种URL模式匹配规则：

1. **精确匹配**：完全匹配请求路径
   ```java
   @WebServlet("/hello") // 只匹配 /hello
   ```

2. **路径匹配**：以`/`开头，以`/*`结尾
   ```java
   @WebServlet("/user/*") // 匹配 /user/开头的所有路径，如 /user/list, /user/add
   ```

3. **扩展名匹配**：以`*.`开头
   ```java
   @WebServlet("*.do") // 匹配所有以.do结尾的请求，如 /user.do, /product.do
   ```

4. **默认Servlet**：仅使用`/`
   ```java
   @WebServlet("/") // 匹配所有未被其他Servlet匹配的请求
   ```

##### 2.2.3.3 匹配优先级

当一个请求可能匹配多个Servlet时，容器会按照以下优先级选择：

1. 精确匹配（如`/hello`）
2. 路径匹配（如`/user/*`）
3. 扩展名匹配（如`*.do`）
4. 默认Servlet（`/`）

::: tip 示例
对于请求`/user/profile.jsp`：
- 如果有`/user/profile.jsp`的精确匹配，则使用它
- 否则，如果有`/user/*`的路径匹配，则使用它
- 否则，如果有`*.jsp`的扩展名匹配，则使用它
- 否则，使用默认Servlet（`/`）
:::

##### 2.2.3.4 注意事项

- URL模式必须以`/`或`*.`开头
- 路径匹配中的`/*`只能出现在末尾
- 不同的Servlet不应配置相同的URL模式
- 在大型应用中，建议使用有意义的URL模式，便于维护

#### 2.2.4 配置web.xml（可选）

如果使用`@WebServlet`注解，则不需要在web.xml中配置。但如果需要使用XML配置，可以在`WEB-INF/web.xml`中添加：

```xml
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee 
                             http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    
    <servlet>
        <servlet-name>helloServlet</servlet-name>
        <servlet-class>com.example.servlet.HelloServlet</servlet-class>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>helloServlet</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
    
</web-app>
```

### 2.3 部署和访问

1. 将应用打包为WAR文件
2. 部署到Servlet容器（如Tomcat）
3. 启动容器
4. 访问URL：`http://localhost:8080/your-app/hello`

## 3. Servlet执行流程与生命周期

### 3.1 执行流程

Servlet的执行流程如下：

1. 客户端（浏览器）发送HTTP请求到Web服务器
2. Web服务器接收请求并将其转发给Servlet容器
3. Servlet容器根据URL找到对应的Servlet
4. 如果Servlet尚未加载，容器会：
   - 加载Servlet类
   - 创建Servlet实例
   - 调用`init()`方法初始化Servlet
5. 容器创建请求和响应对象
6. 容器调用Servlet的`service()`方法，根据请求类型调用`doGet()`、`doPost()`等方法
7. Servlet处理请求并生成响应
8. 容器将响应发送回客户端

### 3.2 生命周期

Servlet的生命周期包含以下阶段：

1. **加载和实例化**：容器加载Servlet类并创建实例
2. **初始化**：容器调用`init()`方法，只执行一次
3. **请求处理**：容器调用`service()`方法处理客户端请求，可多次执行
4. **销毁**：容器调用`destroy()`方法，只执行一次

```java
public class LifecycleServlet extends HttpServlet {
    
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        System.out.println("Servlet初始化中...");
        // 执行初始化操作，如建立数据库连接
    }
    
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        System.out.println("Servlet处理请求中...");
        super.service(req, resp); // 调用doGet或doPost等方法
    }
    
    @Override
    public void destroy() {
        System.out.println("Servlet销毁中...");
        // 执行清理操作，如关闭数据库连接
        super.destroy();
    }
}
```

::: warning
Servlet实例在容器中通常是单例的，因此需要注意线程安全问题。避免在Servlet中使用实例变量存储请求特定的数据。
:::

## 4. Servlet方法介绍与体系结构

### 4.1 Servlet接口

Servlet接口是所有Servlet必须直接或间接实现的接口，定义了以下核心方法：

- `init(ServletConfig config)`：初始化Servlet
- `service(ServletRequest req, ServletResponse res)`：处理客户端请求
- `destroy()`：销毁Servlet
- `getServletConfig()`：返回ServletConfig对象
- `getServletInfo()`：返回Servlet信息

### 4.2 GenericServlet抽象类

`GenericServlet`是一个抽象类，实现了Servlet接口，提供了基本实现，但仍然是协议无关的。它简化了Servlet的开发，开发者只需要重写`service()`方法。

### 4.3 HttpServlet抽象类

`HttpServlet`扩展了`GenericServlet`，专门用于处理HTTP请求。它重写了`service()`方法，根据HTTP请求类型调用以下方法：

- `doGet()`：处理GET请求
- `doPost()`：处理POST请求
- `doPut()`：处理PUT请求
- `doDelete()`：处理DELETE请求
- `doHead()`：处理HEAD请求
- `doOptions()`：处理OPTIONS请求
- `doTrace()`：处理TRACE请求

在实际开发中，通常只需要继承`HttpServlet`并重写需要的方法。

### 4.4 Servlet体系结构

```
Servlet接口
    |
    +-- GenericServlet抽象类
            |
            +-- HttpServlet抽象类
                    |
                    +-- 自定义Servlet类
```

## 5. 请求和响应对象

### 5.1 HttpServletRequest

`HttpServletRequest`接口表示客户端的HTTP请求，提供了访问请求信息的方法：

#### 5.1.1 获取请求参数

```java
// 获取单个参数值
String username = request.getParameter("username");

// 获取同名参数的多个值（如复选框）
String[] hobbies = request.getParameterValues("hobby");

// 获取所有参数名
Enumeration<String> paramNames = request.getParameterNames();

// 获取参数Map
Map<String, String[]> paramMap = request.getParameterMap();
```

#### 5.1.2 获取请求头

```java
// 获取单个请求头
String userAgent = request.getHeader("User-Agent");

// 获取所有请求头名称
Enumeration<String> headerNames = request.getHeaderNames();
```

#### 5.1.3 获取请求路径

```java
// 获取请求URL
StringBuffer url = request.getRequestURL();

// 获取请求URI（不包含域名）
String uri = request.getRequestURI();

// 获取上下文路径
String contextPath = request.getContextPath();

// 获取Servlet路径
String servletPath = request.getServletPath();
```

#### 5.1.4 获取会话和Cookie

```java
// 获取会话
HttpSession session = request.getSession();

// 获取所有Cookie
Cookie[] cookies = request.getCookies();
```

### 5.2 HttpServletResponse

`HttpServletResponse`接口表示服务器的HTTP响应，提供了设置响应信息的方法：

#### 5.2.1 设置响应头

```java
// 设置内容类型
response.setContentType("text/html;charset=UTF-8");

// 设置响应头
response.setHeader("Cache-Control", "no-cache");
```

#### 5.2.2 设置响应状态

```java
// 设置状态码
response.setStatus(HttpServletResponse.SC_OK); // 200

// 发送错误状态
response.sendError(HttpServletResponse.SC_NOT_FOUND, "资源不存在"); // 404
```

#### 5.2.3 输出响应内容

```java
// 获取字符输出流
PrintWriter writer = response.getWriter();
writer.println("Hello, World!");

// 获取二进制输出流（用于输出图片等二进制数据）
ServletOutputStream outputStream = response.getOutputStream();
```

#### 5.2.4 重定向

```java
// 重定向到另一个URL
response.sendRedirect("/another-page");
```

## 6. Servlet高级特性

### 6.1 请求转发与重定向

#### 6.1.1 请求转发

请求转发是服务器内部的跳转，客户端感知不到：

```java
// 获取RequestDispatcher
RequestDispatcher dispatcher = request.getRequestDispatcher("/target-servlet");

// 转发请求
dispatcher.forward(request, response);

// 包含其他资源的输出
// dispatcher.include(request, response);
```

#### 6.1.2 重定向

重定向是客户端的跳转，会改变浏览器地址栏：

```java
response.sendRedirect("/target-servlet");
```

**转发与重定向的区别**：

| 特性 | 转发 | 重定向 |
| --- | --- | --- |
| URL变化 | 不变 | 变化 |
| 请求次数 | 1次 | 2次 |
| 数据共享 | 可共享request域 | 不可共享 |
| 跳转限制 | 只能在同一应用内 | 可跳转到任意URL |

### 6.2 过滤器（Filter）

过滤器用于拦截请求和响应，可以在Servlet处理前后执行操作：

```java
@WebFilter("/*")
public class LogFilter implements Filter {
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // 初始化操作
    }
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) 
            throws IOException, ServletException {
        // 请求处理前的操作
        System.out.println("请求处理前...");
        
        // 传递给下一个过滤器或Servlet
        chain.doFilter(request, response);
        
        // 响应处理后的操作
        System.out.println("响应处理后...");
    }
    
    @Override
    public void destroy() {
        // 清理操作
    }
}
```

### 6.3 监听器（Listener）

监听器用于监听Servlet上下文、会话和请求的事件：

```java
@WebListener
public class AppContextListener implements ServletContextListener {
    
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("应用启动...");
    }
    
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("应用关闭...");
    }
}
```

## 7. 常见问题与解决方案

### 7.1 中文乱码问题

#### 7.1.1 请求乱码

```java
// GET请求参数乱码（Tomcat 8.0以下）
String name = new String(request.getParameter("name").getBytes("ISO-8859-1"), "UTF-8");

// POST请求参数乱码
request.setCharacterEncoding("UTF-8");
```

#### 7.1.2 响应乱码

```java
// 设置响应编码
response.setCharacterEncoding("UTF-8");
response.setContentType("text/html;charset=UTF-8");
```

### 7.2 线程安全问题

Servlet是单例多线程的，需要注意线程安全：

::: warning
避免在Servlet中使用实例变量存储请求特定的数据。如果必须使用，确保进行适当的同步处理。
:::

```java
// 错误示例
public class UnsafeServlet extends HttpServlet {
    private String sharedState; // 实例变量，多线程共享
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        sharedState = request.getParameter("state"); // 线程不安全
        // 处理逻辑...
    }
}

// 正确示例
public class SafeServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        String localState = request.getParameter("state"); // 局部变量，线程安全
        // 处理逻辑...
    }
}
```

### 7.3 会话管理问题

#### 7.3.1 会话超时

```java
// 设置会话超时时间（秒）
request.getSession().setMaxInactiveInterval(1800); // 30分钟

// 在web.xml中设置全局会话超时
<session-config>
    <session-timeout>30</session-timeout> <!-- 分钟 -->
</session-config>
```

#### 7.3.2 会话安全

```java
// 防止会话固定攻击
request.getSession().invalidate(); // 使当前会话失效
HttpSession newSession = request.getSession(true); // 创建新会话

// 设置Cookie为HttpOnly和Secure
response.setHeader("Set-Cookie", "JSESSIONID=" + request.getSession().getId() + "; HttpOnly; Secure");
```

### 7.4 文件上传问题

使用Apache Commons FileUpload或Servlet 3.0+的文件上传功能：

```java
@WebServlet("/upload")
@MultipartConfig(fileSizeThreshold = 1024 * 1024, // 1 MB
                 maxFileSize = 1024 * 1024 * 10,  // 10 MB
                 maxRequestSize = 1024 * 1024 * 50) // 50 MB
public class FileUploadServlet extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        // 获取上传的文件部分
        Part filePart = request.getPart("file");
        String fileName = getFileName(filePart);
        
        // 保存文件
        filePart.write("C:/uploads/" + fileName);
        
        response.getWriter().println("文件上传成功");
    }
    
    private String getFileName(Part part) {
        String contentDisp = part.getHeader("content-disposition");
        String[] items = contentDisp.split(";");
        for (String item : items) {
            if (item.trim().startsWith("filename")) {
                return item.substring(item.indexOf("=") + 2, item.length() - 1);
            }
        }
        return "";
    }
}
```