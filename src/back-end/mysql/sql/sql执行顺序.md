---
title: MySQL SQL执行顺序详解
description: 深入分析MySQL SQL语句的执行顺序和查询优化原理
date: 2024-01-01
category:
  - 数据库
  - MySQL
tag:
  - MySQL
  - SQL优化
  - 查询执行
  - 性能优化
---

**sql 执行顺序**

执行顺序

![...](images\sql%20执行顺序.001.png)

1. 先执行 from、join 来确定表之间的连接关系，得到初步数据
2. where 对数据进行初步的筛选
3. group by 分组
4. 各组分别执行 having 中的普通筛选或聚合函数的筛选
5. 再把根据我们要的的数据进行 select，可以是普通字段查询也可以是获取聚合函数的查询结果。
   如果是聚合函数，select 的查询结果会增加一条字段
6. 将查询结果去重 distinct
7. 最后合并各组的查询结果，按照 order by 的条件进行排序

![...](images\sql%20执行顺序.002.png)


