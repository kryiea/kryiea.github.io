---
title: MySQL索引使用指南
description: 详细介绍MySQL索引的创建、使用及优化策略
date: 2024-01-01
category:
  - 数据库
  - MySQL
tag:
  - MySQL
  - 索引
  - SQL优化
  - 性能调优
---

**sql 索引**

**创建索引**

```SQL
#如果只关联一个字段为单列索引，如果关联多个字段即为联合索引或组合索引。
Create [UNIQUE | FULLTEXT] INDEX index\_name ON table\_name(index\_col\_name,...);
 
#创建唯一索引
Create UNIQUE INDEX index\_name ON table\_name(index\_col\_name);
 
#创建联合索引
Create FULLTEXT INDEX index\_name ON table\_name(index\_col\_name,...);
```
**查看索引**

```SQL
SHOW INDEX FROM table\_name;
```
**删除索引**

```SQL
DROP INDEX index\_table on table\_name;
```
**示例**

1. name字段为姓名字段，该字段的值可能会重复，为该字段创建索引。

```SQL
create index idx\_user\_name on tb\_user(name);
```
1. ` `phone手机号字段的值，是非空且唯一的，为该字段创建唯一索引。

```SQL
create unique index idx\_user\_phone on tb\_user(phone);
```
1. ` `为 profession,age,status 创建联合索引。

```SQL
create index idx\_user\_pro\_age-sta on tb\_user(profession,age,status);
```
1. 为 email 建立合适的索引来提升查询效率。

```SQL
creat index idx\_user\_email on tb\_user(email);
```
1. 删除tb\_user表中的email索引

```SQL
drop index idx\_user\_email on tb\_user;
```


