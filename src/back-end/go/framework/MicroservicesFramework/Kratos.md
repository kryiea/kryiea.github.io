---
title: Kratos微服务框架详解
description: 详细介绍Go语言Kratos微服务框架的架构、使用方法及最佳实践
date: 2024-01-01
category:
  - Go
  - 微服务
  - 框架
tag:
  - Kratos
  - Go
  - 微服务框架
  - 服务架构
---

本文详细介绍Go语言Kratos微服务框架的架构和使用方法。

<!-- more -->

## 1. Kratos项目结构

Kratos使用[kratos-layout](https://github.com/go-kratos/kratos-layout)作为项目模板，可以通过以下命令创建新项目：

```bash
kratos new <project-name>
```

### 1.1 目录结构

```
.
├── Dockerfile  
├── LICENSE
├── Makefile  
├── README.md
├── api // 下面维护了微服务使用的proto文件以及根据它们所生成的go文件
│   └── helloworld
│       └── v1
│           ├── error_reason.pb.go
│           ├── error_reason.proto
│           ├── error_reason.swagger.json
│           ├── greeter.pb.go
│           ├── greeter.proto
│           ├── greeter.swagger.json
│           ├── greeter_grpc.pb.go
│           └── greeter_http.pb.go
├── cmd  // 整个项目启动的入口文件
│   └── server
│       ├── main.go
│       ├── wire.go  // 我们使用wire来维护依赖注入
│       └── wire_gen.go
├── configs  // 这里通常维护一些本地调试用的样例配置文件
│   └── config.yaml
├── generate.go
├── go.mod
├── go.sum
├── internal  // 该服务所有不对外暴露的代码，通常的业务逻辑都在这下面，使用internal避免错误引用
│   ├── biz   // 业务逻辑的组装层，类似 DDD 的 domain 层，data 类似 DDD 的 repo，而 repo 接口在这里定义，使用依赖倒置的原则。
│   │   ├── README.md
│   │   ├── biz.go
│   │   └── greeter.go
│   ├── conf  // 内部使用的config的结构定义，使用proto格式生成
│   │   ├── conf.pb.go
│   │   └── conf.proto
│   ├── data  // 业务数据访问，包含 cache、db 等封装，实现了 biz 的 repo 接口。我们可能会把 data 与 dao 混淆在一起，data 偏重业务的含义，它所要做的是将领域对象重新拿出来，我们去掉了 DDD 的 infra层。
│   │   ├── README.md
│   │   ├── data.go
│   │   └── greeter.go
│   ├── server  // http和grpc实例的创建和配置
│   │   ├── grpc.go
│   │   ├── http.go
│   │   └── server.go
│   └── service  // 实现了 api 定义的服务层，类似 DDD 的 application 层，处理 DTO 到 biz 领域实体的转换(DTO -> DO)，同时协同各类 biz 交互，但是不应处理复杂逻辑
│       ├── README.md
│       ├── greeter.go
│       └── service.go
└── third_party  // api 依赖的第三方proto
    ├── README.md
    ├── google
    │   └── api
    │       ├── annotations.proto
    │       ├── http.proto
    │       └── httpbody.proto
    └── validate
        ├── README.md
        └── validate.proto
```

## 2. Kratos项目初始化运行

### 2.1 创建项目

```bash
kratos new <project-name>
```

### 2.2 代码生成

```bash
# 生成所有proto源码、wire等等
go generate ./...
```

### 2.3 运行项目

```bash
# 运行项目
kratos run

# 输出
INFO msg=config loaded: config.yaml format: yaml # 默认载入 configs/config.yaml 配置文件
INFO msg=[gRPC] server listening on: [::]:9000 # gRPC服务监听 9000 端口
INFO msg=[HTTP] server listening on: [::]:8000 # HTTP服务监听 8000 端口
```

## 3. Kratos CLI工具使用

### 3.1 安装与升级

```bash
# 安装Kratos CLI
go install github.com/go-kratos/kratos/cmd/kratos/v2@latest

# 升级Kratos
kratos upgrade 
```

### 3.2 Proto文件操作

Kratos-layout项目中对proto文件进行了版本划分，放在了v1子目录下：

```bash
# 添加proto文件
kratos proto add api/helloworld/v1/demo.proto

# 生成proto代码（在proto文件同目录下生成）
# 可以直接通过make命令生成
make api

# 或使用kratos cli进行生成
kratos proto client api/helloworld/v1/demo.proto

# 生成service代码，-t指定生成目录
kratos proto server api/helloworld/v1/demo.proto -t internal/service
```

### 3.3 常用命令

```bash
# 运行项目
kratos run

# Kratos版本升级
kratos upgrade

# 查看帮助信息
kratos -h
```

