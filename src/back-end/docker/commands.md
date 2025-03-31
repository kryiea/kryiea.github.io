---
# 这是文章的标题
title: Docker常用命令详解
# 你可以自定义封面图片
cover: 
# 这是页面的图标
icon: 
# 这是侧边栏的顺序
order: 1
# 设置作者
author: 
# 设置写作时间
date: 2024-01-01
# 一个页面可以有多个分类
category:
  - Docker
  - 容器技术
# 一个页面可以有多个标签
tag:
  - Docker
  - 命令行
  - 容器管理
  - DevOps
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: 
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息
copyright: 

headerDepth: 5
---

description: 详细介绍Docker的常用命令、容器操作及实用技巧

<!-- more -->

## Docker 的常用命令

### 1 帮助命令

```bash
docker version        # 显示docker的版本信息
docker info              # 显示docker的系统信息，包括镜像和容器的数量
docker 命令 --help         # 帮助命令
```

### 2 镜像命令

#### 2.1 docker images

images 列表标签说明：

1. `REPOSITORY 镜像的仓库源`
2. `TAG 镜像的标签`
3. `IMAGE ID 镜像的id`
4. `CREATED 镜像的创建时间`
5. `SIZE 镜像的大小`

#### 2.2 docker search（搜索镜像）

```bash
docker search redis
```

#### 2.3 docker pull（下载镜像）

```bash
# 下载镜像：docker pull 镜像名[:tag]
# 两个命令是等价的
docker pull mysql
docker pull docker.io/library/mysql:latest
```

#### 2.4 docker rmi（删除镜像）

```bash
[root@kryiea //]：docker rmi -f 镜像id                    # 删除指定的镜像
[root@kryiea //]：docker rmi -f 镜像id 镜像id 镜像id    # 删除多个镜像（空格分隔）
[root@kryiea //]：docker rmi -f $(docker images -aq)    # 删除全部的镜像
```

### 3. 容器命令

说明：我们有了镜像才可以创建容器， linux ，下载一个 centos 镜像来测试学习。

```
docker pull centos
```

#### 3.1 新建容器并启动

```bash
docker run [可选参数] image
# 参数说明
--name="name"        容器名字：用来区分容器
-d                    后台方式运行：相当于nohup
-it                    使用交互式运行：进入容器查看内容
-p                    指定容器的端口（四种方式）小写字母p
    -p ip:主机端口：容器端口
    -p 主机端口：容器端口
    -p 容器端口
    容器端口
-P                     随机指定端口（大写字母P）
```

#### 3.2 列出所有运行的容器

```
docker ps    # 列出当前正在运行的容器
            # 命令参数可选项
            -a        # 列出当前正在运行的容器+历史运行过的容器
            -n=?    # 显示最近创建的容器（可以指定显示几条，比如-n=1）
            -q        # 只显示容器的编号
```

#### 3.3 退出容器

```
exit        # 容器直接停止，并退出
ctrl+P+Q    # 容器不停止，退出

[root@kryiea //]# docker run -it centos /bin/bash  //交互式进入
```

#### 3.4 删除容器

```bash
docker rm 容器id                    # 删除容器（不能删除正在运行的容器）如果要强制删除：docker rm -f 容器id
docker rm -f $(docker ps -aq)        # 删除全部容器
docker ps -a -q|xargs docker rm        # 删除所有容器
```

#### 3.5 启动和停止容器的操作

```bash
docker start 容器id        # 启动容器
docker restart 容器id    # 重启容器
docker stop 容器id        # 停止当前正在运行的容器
docker kill 容器id        # 强制停止当前容器
```

### 4 常用其他命令

#### 4.1 后台启动容器


> 常见的坑：docker 容器使用后台运行，就必须要有要一个前台进程，docker 发现没有应用，就会自动停止。
比如：nginx，容器启动后，发现自己没有提供服务，就会立刻停止，就是没有程序了

```bash
# 命令docker run -d 镜像名
[root@kryiea //] docker run -d centos

5b06d0d14b3312e589a411dd9ae15589dc9321f771e5615b7ae26e85017de080
# 问题：docker ps发现centos停止了
```

#### 4.2 查看日志

```bash
docker logs -tf --tail 容器id


# 显示日志
-tf                        # 显示日志
--tail number    # 要显示的日志条数
```

#### 4.3 查看容器中进程的信息

```bash
# 命令 docker top 容器id 

[root@kryiea ~] docker top 25eb9d70b2b4
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
systemd+            181442              181422              0                   09:47               ?                   00:00:00            redis-server *:6379
```

#### 4.4 查看镜像的元数据

```bash
docker inspect 容器id
```

#### 4.5 进入当前正在运行的容器

```bash
# 方式一
docker exec -it 容器id /bin/bash
# 方式二
docker attach 容器id

 docker exec        # 进入容器后开启一个新的终端，可以再里面操作（常用）
 docker attach        # 进入容器正在执行的终端，不会启动新的进程。
```

#### 4.6 从容器内拷贝文件到主机

```bash
docker cp 容器id:容器内路径 目的主机的路径
```
