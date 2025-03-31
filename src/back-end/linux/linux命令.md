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

**linux命令 面试**

**1. 查看 cpu 占用率和进程 pid**

- top
- ps

**2. 查看进程的线程**

先找到进程的 pid，然后：

- ps -T -p <pid>

**3. 查看端口被哪个进程占用**

- netstat -napt | grep <端口号>
- lsof -i : <端口号>

**4. 查看进程占用的端口**

netstat -tulnp | grep <PID>

**5. 查看 tcp 状态**

- netstat -napt | grep <端口号>
- ss -t 

**处理目录的常用命令**

- ` `ls（英文全拼：list files）: 列出目录及文件名 
- -a ：全部的文件，连同隐藏文件( 开头为 . 的文件) 一起列出来(常用)
- -d ：仅列出目录本身，而不是列出目录内的文件数据(常用)
- -l ：长数据串列出，包含文件的属性与权限等等数据；(常用)
- ` `cd（英文全拼：change directory）：切换目录 
- ` `pwd（英文全拼：print work directory）：显示目前的目录 
- ` `mkdir（英文全拼：make directory）：创建一个新的目录 
- ` `rmdir（英文全拼：remove directory）：删除一个空的目录 
- ` `cp（英文全拼：copy file）: 复制文件或目录 
- ` `rm（英文全拼：remove）: 删除文件或目录 
- -f ：就是 force 的意思，忽略不存在的文件，不会出现警告信息；
- -i ：互动模式，在删除前会询问使用者是否动作
- -r ：递归删除啊！最常用在目录的删除了！这是非常危险的选项！！！
- ` `mv（英文全拼：move file）: 移动文件与目录，或修改文件与目录的名称 


**一、关机重启命令**

关闭和重启系统都要先运行sync命令，把内存数据同步到磁盘

虽然

目前shutdown/reboot/halt等命令哦都会在关机前进行sync

sync 把内存数据同步到磁盘

shutdown -h now 立即进行关机

shutdown -h 1   一分钟后就会关机

shutdown -r now  立即重启

halt 关机

reboot 现在重启计算机

**二、用户登录注销切换**

高权限到低权限无需密码

su - 用户名 切换账号

logout 注销当前登录用户

**三、用户管理**

添加一个用户后会自动创建和用户同名的home目录

home/用户名

useradd 用户名

useradd -d 指定目录 新的用户名

passwd 用户名     更改用户密码，忽略用户名则默认更改当前账户

userdel 用户名   删除用户保留家目录，但是无法再登录

userdel -r 用户名      删除用户和家目录

whoami   查看当前指用户

**四、用户组**

groupadd 组名  新增组

groupdel 组名   删除组

useradd -g 用户组 用户名     新增用户同时上组

usermod -g 用户组 用户名 修改用户的组

**五、文件目录指令**

touch 文件名+后缀      创建一个空文件

cp 文件名 目标路径      复制

/cp 文件名 目标路径      强制覆盖，复制

rm [ ] 要删除的文件或者目录             # -r:递归删除整个文件夹     -f：强制删除不提醒 

mv 移动文件与目录或重命名

mv 旧文件名 新文件名   

mv 旧路径 新路径

more和less查看文件内容，less是按需加载，对大文件有较高的效率

echo [] 输出内容           echo输出内容到控制台 如： echo $PATH

ehco 内容 > 目标文档       echo输出内容到文档里

cat 文件名  查看文件内容

ln -s [原文件或目录] [软链接目录+文件名]             给原文件创建一个软连接 ： ln -s /root /home/myroot

**六、时间日期**

date 显示当前时间

date +%Y 年

date +%m 月

date -s "2022-11-03 20:02:11"  设置时间

**七、搜索查找类**

find [路径] [选项]     选项：  -name 按名字查找   -user 按用户名  -size 按文件大小

find /aaa/ -name 1.cpp

which 指令名字      查找指令所在的目录        which ls

grep指令和管道符 " | " 如：cat /home/hello.txt | grep " 搜索的字符串"


