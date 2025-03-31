---
title: Linux Shell用户和组管理详解
description: 详细介绍Linux系统中用户和组的管理、权限设置及Shell操作
date: 2024-01-01
category:
  - Linux
  - 系统管理
tag:
  - Linux
  - Shell
  - 用户管理
  - 权限管理
---

**Shell、用户和组**

**Shell**

shell 是一种具有特殊用途的程序，主要用于读取用户输入的命令，并执行相应的程序以响应命令。有时，人们也称之为命令解释器。

对 UNIX 系统而言，shell 只是一个用户进程。

纵观 UNIX 历史，出现过以下几种重要的 shell。

- Bourne shell（sh）

由 Steve Bourne 编写的 shell 历史最为悠久，且应用广泛，曾是第七版 UNIX 的标配 shell。Bourne shell 包含了在其他 shell 中常见的许多特性，I/O 重定向、管道、文件名生成（通配符）、变量、环境变量处理、命令替换、后台命令执行以及函数。

- Bourne again shell（bash）

这款 shell 是 GNU 项目对 Bourne shell 的重新实现。Bash 提供了与 C shell 和 Korn shel 所类似的交互式特性。Brian Fox 和 Chet Ramey 是 bash的主要作者。bash 或许是 Linux 上应用最为广泛的 shell 了。在 Linux 上，Bourne shell （sh）其实正是由 bash 仿真提供的。

- C shell（csh）
- Korn shell（ksh）

**用户和组**

系统会对每个用户的身份做唯一标识，用户可隶属于多个组。

**用户**

系统的每个用户都拥有唯一的登录名（用户名）和与之相对应的整数型用户ID（UID）。

存储在系统密码文件：/etc/passwd

一个典型的 /etc/passwd 文件中的一行示例：

```Bash
username:x:1001:1001:User Name,,,:/home/username:/bin/bash
```
每一行代表一个用户账户，字段之间用冒号（:）分隔。典型的字段包括：

1. 用户名
2. 密码占位符（通常是一个 "x" 或 "\*"，实际密码存储在 /etc/shadow 文件中）
3. 用户ID（UID）
4. 组ID（GID）
5. 用户的描述信息（例如全名）
6. 用户的主目录路径
7. 用户的默认shell

![...](images\Shell、用户和组.001.png)

**组**

一个用户可以同时属于多个组。

/etc/group 文件用于存储系统上所有用户组的信息。每一行代表一个用户组，字段之间用冒号（:）分隔。典型的字段包括：

1. 组名
2. 密码占位符（通常是一个 "x" 或 "\*"，实际密码如果有的话存储在 /etc/gshadow 文件中）
3. 组ID（GID）
4. 组成员列表（以逗号分隔的用户名）

以下是一个典型的 /etc/group 文件中的一行示例：

```Bash
groupname:x:1001:user1,user2,user3
```
- groupname 是组名。
- x 是密码占位符。
- 1001 是组ID（GID）。
- user1,user2,user3 是属于该组的用户列表。

![...](images\Shell、用户和组.002.png)

**超级用户 root**

超级用户在系统中享有特权。超级用户账号的用户 ID 为 0，通常登录名为 root。

超级用户都可以访问系统中的任何文件，也能发送信号干预系统运行的所有用户进程。

系统管理员可以使用超级用户账号来执行各种系统管理任务。


