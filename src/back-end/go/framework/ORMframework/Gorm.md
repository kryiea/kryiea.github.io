---
title: Gorm
description: Go 第三方 ORM 框架之 Gorm 使用指南
date: 2024-01-01
category:
  - Go
  - ORM框架
tag:
  - Go
  - Gorm
  - ORM
  - 框架
---

# Gorm

Gorm 是 Go 语言中最受欢迎的 ORM 框架之一，它提供了强大的对象关系映射功能，使开发者能够更加便捷地操作数据库。本文将介绍 Gorm 的基本使用方法和一些高级特性。

<!-- more -->

## 1. Gorm简介

官网: [gorm.cn](https://gorm.cn)

## 2. 数据库连接

使用Gorm需要先下载 mysql 驱动、gorm框架。

```go
// go <--- mysql_driver <--- gorm
go get gorm.io/driver/mysql 
go get gorm.io/gorm       
```

### 2.1 建立数据库连接

```go
username := "root"  //账号
password := "root"  //密码
host := "127.0.0.1" //数据库地址，可以是Ip或者域名
port := 3306        //数据库端口
Dbname := "gorm"   //数据库名
timeout := "10s"    //连接超时，10秒

// root:root@tcp(127.0.0.1:3306)/gorm?
dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local&timeout=%s", username, password, host, port, Dbname, timeout)
//连接MYSQL, 获得DB类型实例，用于后面的数据库读写操作。
db, err := gorm.Open(mysql.Open(dsn))
if err != nil {
  panic("连接数据库失败, error=" + err.Error())
}
// 连接成功
fmt.Println(db)
```

### 2.2 配置连接选项

#### 2.2.1 事务配置

在连接的时候带上&gorm.Config{}

```go
db, err := gorm.Open(mysql.Open("gorm.db"), &gorm.Config{
  SkipDefaultTransaction: true, // true 为不开启事物
})
```

#### 2.2.2 命名策略

**默认：**表名是蛇形复数，字段名是蛇形单数。
如：Student ----> students

```go
type Student struct {
  Name      string
  Age       int
  MyStudent string
}
```

相当于：

```sql
CREATE TABLE students (name longtext,age bigint,my_student longtext)
```

修改这些策略：

```go
db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
  NamingStrategy: schema.NamingStrategy{
    TablePrefix:   "f_",  // 表名前缀
    SingularTable: false, // 单数表名
    NoLowerCase:   false, // 关闭小写转换
  },
})
```

#### 2.2.3 日志配置

gorm 的默认日志是打印：错误、慢sql。可以自己设置。

```go
var mysqlLogger logger.Interface
// 要显示的日志等级
mysqlLogger = logger.Default.LogMode(logger.Info)
db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
  Logger: mysqlLogger,
})
```

自定义日志配置：

```go
newLogger := logger.New(
  log.New(os.Stdout, "\r\n", log.LstdFlags), // （日志输出的目标，前缀和日志包含的内容）
  logger.Config{
    SlowThreshold:             time.Second, // 慢 SQL 阈值
    LogLevel:                  logger.Info, // 日志级别
    IgnoreRecordNotFoundError: true,        // 忽略ErrRecordNotFound（记录未找到）错误
    Colorful:                  true,        // 使用彩色打印
  },
)

db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
  Logger: newLogger,
})
```

如果只想某些语句显示日志：

```go
DB.Debug().First(&model)
```

## 3. 模型定义

### 3.1 自动生成表结构

AutoMigrate的逻辑是只新增，不删除，不修改（大小会修改）

例如将 Name 修改为 Name1，进行AutoMigrate，会多出一个 name1 的字段

```go
type Student struct {
  ID    uint   // 默认使用ID作为主键
  Name  string
  Email *string // 使用指针是为了存空值，指针类型的go可以传nil，如果不是，会有一个默认值
}

// 可以放多个
DB.AutoMigrate(&Student{})
```

### 3.2 字段属性配置

使用gorm的标签进行修改

```go
Name  string  gorm:"type:varchar(12)"
Name  string  gorm:"size:2"
```

复杂示例：

```go
type StudentInfo struct {
  Email  *string gorm:"size:32" // 使用指针是为了存空值
  Addr   string  gorm:"column:y_addr;size:16"
  Gender bool    gorm:"default:true"
}

type Student struct {
  Name string      gorm:"type:varchar(12);not null;comment:用户名"
  UUID string      gorm:"primaryKey;unique;comment:主键"
  Info StudentInfo gorm:"embedded;embeddedPrefix:s_"
}

// 建表语句
CREATE TABLE students (
    name varchar(12) NOT NULL COMMENT '用户名',
    uuid varchar(191) UNIQUE COMMENT '主键',
    s_email varchar(32),
    s_y_addr varchar(16),
    s_gender boolean DEFAULT true,
    PRIMARY KEY (uuid)
)
```

常用标签：

- type 定义字段类型
- size 定义字段大小
- column 自定义列名
- primaryKey 将列定义为主键
- unique 将列定义为唯一键
- default 定义列的默认值
- not null 不可为空
- embedded 嵌套字段
- embeddedPrefix 嵌套字段前缀
- comment 注释
- 多个标签之前用 ; 连接

## 4. 单表操作

### 4.1 添加记录

增加一条记录：

```go
email := "xxx@qq.com"
// 创建记录
student := Student{
  Name:   "qqh",
  Age:    21,
  Gender: true,
  Email:  &email,
}

// Create接收的是一个指针，而不是值
DB.Create(&student)
```

由于我们传递的是一个指针，调用完Create之后，student这个对象上面就有该记录的信息了，如创建的id。

### 4.2 批量插入

```go
var studentList []Student
for i := 0; i < 100; i++ {
  studentList = append(studentList, Student{
    Name:   fmt.Sprintf("机器人%d号", i+1),
    Age:    21,
    Gender: true,
    Email:  &email,
  })
}
DB.Create(&studentList)
```

### 4.3 查询单条记录

#### 4.3.1 基本查询函数

```go
DB = DB.Session(&gorm.Session{Logger: Log})
var student Student
DB.Take(&student)   
// SELECT * FROM students LIMIT 1
DB.First(&student) 
// SELECT * FROM students ORDER BY students.id LIMIT 1
DB.Last(&student)  
// SELECT * FROM students ORDER BY students.id DESC LIMIT 1
```

#### 4.3.2 主键查询

Take的第二个参数，默认会根据主键查询，可以是字符串，可以是数字

```go
var student Student
DB.Take(&student, 2)
fmt.Println(student)

student = Student{} // 重新赋值
DB.Take(&student, "4")
fmt.Println(student)
```

#### 4.3.3 条件查询

使用？作为占位符，将查询的内容放入?

```go
var student Student
DB.Take(&student, "name = ?", "机器人27号")
fmt.Println(student)
```

防sql注入，将参数全部转义

```go
DB.Take(&student, "name = ?", "机器人27号' or 1=1;#")

// SELECT * FROM students WHERE name = '机器人27号\' or 1=1;#' LIMIT 1
```

#### 4.3.4 结构体查询

```go
var student Student
// 只能有一个主要值
student.ID = 2
//student.Name = "qqh"
DB.Take(&student)
fmt.Println(student)
```

#### 4.3.5 查询结果处理

获取查询的返回的记录数

```go
count := DB.Find(&studentList).RowsAffected
```

是否查询失败

```go
err := DB.Find(&studentList).Error
```

查询失败有查询为空，查询条件错误，sql语法错误。可以使用判断：

```go
var student Student
err := DB.Take(&student, "xx").Error
switch err {
case gorm.ErrRecordNotFound:
  fmt.Println("没有找到")
default:
  fmt.Println("sql错误")
}
```

### 4.4 查询多条记录

```go
var studentList []Student
DB.Find(&studentList)
for _, student := range studentList {
  fmt.Println(student)
}

// 由于email是指针类型，所以看不到实际的内容
// 但是序列化之后，会转换为我们可以看得懂的方式
var studentList []Student
DB.Find(&studentList)
for _, student := range studentList {
  data, _ := json.Marshal(student)
  fmt.Println(string(data))
}
```

#### 4.4.1 主键列表查询

```go
var studentList []Student
DB.Find(&studentList, []int{1, 3, 5, 7})
DB.Find(&studentList, 1, 3, 5, 7)  // 一样的
fmt.Println(studentList)
```

#### 4.4.2 条件列表查询

```go
DB.Find(&studentList, "name in ?", []string{"qqh", "zhangsan"})
```

### 4.5 更新记录

能查询到的记录才能删除

#### 4.5.1 Save保存所有字段

用于单个记录的全字段更新，它会保存所有字段，即使零值也会保存。

```go
var student Student
DB.Take(&student) // 查询第一条记录
student.Age = 22  // 修改第一条记录的年龄
DB.Save(&student) // 保存修改
```

#### 4.5.2 更新指定字段

可以使用select选择要更新的字段

```go
var student Student
DB.Take(&student) // 查询第一条记录

/*
    Update：只更新指定的单个字段。
    Save（带Select）：可以选择更新多个字段，但在这里通过Select只更新一个字段。
*/
DB.Model(&student).Update("age", 23) // 更新年龄
DB.Select("age").Save(&student)
```

#### 4.5.3 批量删除

```go
var student Student
DB.Take(&student, 10) //    查询主键为 10 的记录
DB.Delete(&student)   // 删除记录 10

DB.Delete(&Student{}, []int{11, 12, 13}) // 删除主键为 11,12,13 的记录
```

## 5. 高级查询

### 5.1 Where条件查询

等价于sql语句中的where

```go
var users []Student
// 查询用户名是qqh的
DB.Where("name = ?", "qqh").Find(&users)
fmt.Println(users)
// 查询用户名不是qqh的
DB.Where("name <> ?", "qqh").Find(&users)
fmt.Println(users)
// 查询用户名包含 如燕，李元芳的
DB.Where("name in ?", []string{"如燕", "李元芳"}).Find(&users)
fmt.Println(users)
// 查询姓李的
DB.Where("name like ?", "李%").Find(&users)
fmt.Println(users)
// 查询年龄大于23，是qq邮箱的
DB.Where("age > ? and email like ?", "23", "%@qq.com").Find(&users)
fmt.Println(users)
// 查询是qq邮箱的，或者是女的
DB.Where("gender = ? or email like ?", false, "%@qq.com").Find(&users)
fmt.Println(users)
```

#### 5.1.1 结构体查询

使用结构体查询，会过滤零值，并且结构体中的条件都是and关系

```go
// 会过滤零值 Age: 0 会被忽略
DB.Where(&Student{Name: "李元芳", Age: 0}).Find(&users)
fmt.Println(users)
```

#### 5.1.2 Map查询

不会过滤零值

```go
DB.Where(map[string]any{"name": "李元芳", "age": 0}).Find(&users)
// SELECT * FROM students WHERE age = 0 AND name = '李元芳'
fmt.Println(users)
```

#### 5.1.3 Not条件

和where中的not等价

```go
// 排除年龄大于23的
DB.Not("age > 23").Find(&users)
fmt.Println(users)
```

#### 5.1.4 Or条件

和where中的or等价

```go
DB.Or("gender = ?", false).Or(" email like ?", "%@qq.com").Find(&users)
fmt.Println(users)
```

### 5.2 Select选择字段

```go
DB.Select("name", "age").Find(&student)
fmt.Println(student)
// id列 没有被选中，会被赋零值
```

### 5.3 排序

根据年龄倒序

```go
var users []Student
DB.Order("age desc").Find(&users)
fmt.Println(users)
// desc    降序
// asc     升序
```

### 5.4 分页查询

```go
var student []Student
// 一页多少条
limit := 2
// 目标第几页
page := 4
// offset 是下一次查询的起始位置， 这里是 (4-1)*2 = 6 ,所以从 7 开始
offset := (page - 1) * limit
DB.Limit(limit).Offset(offset).Find(&student)
fmt.Println(student)

// SELECT * FROM students LIMIT 2 OFFSET 6
```

### 5.5 去重查询

Distinct用法

```go
var ageList []int
DB.Table("students").Select("age").Distinct("age").Scan(&ageList)
fmt.Println(ageList)
```

### 5.6 分组查询

```go
// 查询男生的个数和女生的个数
type AggeGroup struct {
    Gender int
    Count  int
}

var agge []AggeGroup

DB.Table("students").Select("count(id) as Count", "gender").Group("gender").Scan(&agge)
fmt.Println(agge)
```

### 5.7 原生SQL执行

```go
var student []Student
DB.Raw("SELECT * FROM students").Scan(&student)
fmt.Println(student)
```

### 5.8 子查询

查询大于平均年龄的用户

原生sql：
```sql
select * from students where age > (select avg(age) from students);
```

使用gorm

```go
var users []Student
DB.Model(Student{}).Where("age > (?)", DB.Model(Student{}).Select("avg(age)")).Find(&users)
fmt.Println(users)
```

## 6. 事务管理

有如下表：

```go
type User struct {
  ID    uint   `json:"id"`
  Name  string `json:"name"`
  Money int    `json:"money"`
}

// InnoDB引擎才支持事务，MyISAM不支持事务
// DB.Set("gorm:table_options", "ENGINE=InnoDB").AutoMigrate(&User{})
```

### 6.1 自动事务

```go
var zhangsan, lisi User
DB.Take(&zhangsan, "name = ?", "张三")
DB.Take(&lisi, "name = ?", "李四")

// 张三给李四转账100元
DB.Transaction(func(tx *gorm.DB) error {

  // 先给张三-100
  zhangsan.Money -= 100
  err := tx.Model(&zhangsan).Update("money", zhangsan.Money).Error
  if err != nil {
    fmt.Println(err)
    return err
  }

  // 再给李四+100
  lisi.Money += 100
  err = tx.Model(&lisi).Update("money", lisi.Money).Error
  if err != nil {
    fmt.Println(err)
    return err
  }
  // 提交事务
  return nil
})
```

### 6.2 手动事务

手动开启、关闭、回滚事务

```go
// 开始事务
tx := db.Begin()

// 在事务中执行一些 db 操作（从这里开始，您应该使用 'tx' 而不是 'db'）
tx.Create(...)

// ...

// 遇到错误时回滚事务
tx.Rollback()

// 否则，提交事务
tx.Commit()
```

上面的转账示例也可以这样写：

```go
var zhangsan, lisi User
DB.Take(&zhangsan, "name = ?", "张三")
DB.Take(&lisi, "name = ?", "李四")

// 张三给李四转账100元
tx := DB.Begin()

// 先给张三-100
zhangsan.Money -= 100
err := tx.Model(&zhangsan).Update("money", zhangsan.Money).Error
if err != nil {
  tx.Rollback()
}

// 再给李四+100
lisi.Money += 100
err = tx.Model(&lisi).Update("money", lisi.Money).Error
if err != nil {
  tx.Rollback()
}
// 提交事务
tx.Commit()
```


