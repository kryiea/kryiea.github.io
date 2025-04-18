---
title: Linux常用命令详解
description: 详细介绍Linux系统常用命令、系统管理及运维操作
date: 2024-01-01
category:
  - Linux
  - 系统管理
tag:
  - Linux
  - 命令行
  - 系统管理
  - Shell
---

# Linux常用命令详解

本文详细介绍了Linux系统中常用的命令及其用法，帮助您高效地进行系统管理和日常操作。

<!-- more -->

## 1. 系统监控命令

### 1.1 查看CPU占用率和进程PID

- `top` - 动态显示系统进程
- `ps` - 显示当前进程状态

### 1.2 查看进程的线程

先找到进程的PID，然后：

- `ps -T -p <pid>`

### 1.3 查看端口被哪个进程占用

- `netstat -napt | grep <端口号>`
- `lsof -i:<端口号>`

### 1.4 查看进程占用的端口

- `netstat -tulnp | grep <PID>`

### 1.5 查看TCP状态

- `netstat -napt | grep <端口号>`
- `ss -t`

## 2. 目录和文件操作命令

### 2.1 目录操作

- `ls`（list files）: 列出目录及文件名
  - `-a`：显示全部文件，包括隐藏文件（开头为.的文件）
  - `-d`：仅列出目录本身，不列出目录内的文件数据
  - `-l`：长格式列出，包含文件的属性与权限等数据
- `cd`（change directory）：切换目录
- `pwd`（print work directory）：显示当前目录
- `mkdir`（make directory）：创建一个新的目录
- `rmdir`（remove directory）：删除一个空的目录

### 2.2 文件操作

- `cp`（copy file）: 复制文件或目录
- `rm`（remove）: 删除文件或目录
  - `-f`：强制删除，忽略不存在的文件，不提示警告
  - `-i`：互动模式，删除前会询问用户是否确认
  - `-r`：递归删除，用于删除目录及其内容（危险选项！）
- `mv`（move file）: 移动文件与目录，或修改文件与目录的名称

## 3. 系统管理命令

### 3.1 关机重启命令

关闭和重启系统前应先运行`sync`命令，将内存数据同步到磁盘（现代系统中`shutdown`/`reboot`/`halt`等命令会自动执行`sync`）

- `sync` - 将内存数据同步到磁盘
- `shutdown -h now` - 立即关机
- `shutdown -h 1` - 一分钟后关机
- `shutdown -r now` - 立即重启
- `halt` - 关机
- `reboot` - 立即重启计算机

### 3.2 用户登录、注销和切换

- `su - 用户名` - 切换账号（高权限到低权限无需密码）
- `logout` - 注销当前登录用户

## 4. 用户和用户组管理

### 4.1 用户管理

添加用户后会自动创建和用户同名的home目录（/home/用户名）

- `useradd 用户名` - 添加用户
- `useradd -d 指定目录 新的用户名` - 添加用户并指定home目录
- `passwd 用户名` - 更改用户密码（不指定用户名则更改当前账户）
- `userdel 用户名` - 删除用户但保留家目录
- `userdel -r 用户名` - 删除用户和家目录
- `whoami` - 查看当前用户

### 4.2 用户组管理

- `groupadd 组名` - 新增组
- `groupdel 组名` - 删除组
- `useradd -g 用户组 用户名` - 新增用户同时加入指定组
- `usermod -g 用户组 用户名` - 修改用户的组

## 5. 文件目录操作指令

- `touch 文件名+后缀` - 创建一个空文件
- `cp 文件名 目标路径` - 复制文件
- `/cp 文件名 目标路径` - 强制覆盖复制
- `rm [选项] 要删除的文件或目录`
  - `-r`：递归删除整个文件夹
  - `-f`：强制删除不提醒
- `mv 旧文件名 新文件名` - 重命名文件
- `mv 旧路径 新路径` - 移动文件
- `more`和`less` - 查看文件内容（less是按需加载，对大文件效率更高）
- `echo [选项] 输出内容` - 输出内容到控制台（如：`echo $PATH`）
- `echo 内容 > 目标文档` - 输出内容到文档
- `cat 文件名` - 查看文件内容
- `ln -s [原文件或目录] [软链接目录+文件名]` - 创建软链接（如：`ln -s /root /home/myroot`）

## 6. 时间日期命令

- `date` - 显示当前时间
- `date +%Y` - 显示年份
- `date +%m` - 显示月份
- `date -s "2022-11-03 20:02:11"` - 设置系统时间

## 7. 搜索查找命令

- `find [路径] [选项]` - 查找文件
  - `-name` - 按名字查找
  - `-user` - 按用户名查找
  - `-size` - 按文件大小查找
  - 示例：`find /aaa/ -name 1.cpp`
- `which 指令名字` - 查找指令所在的目录（如：`which ls`）
- `grep` - 与管道符 `|` 一起使用进行文本搜索
  - 示例：`cat /home/hello.txt | grep "搜索的字符串"`


