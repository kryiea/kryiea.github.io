---
# 这是文章的标题
title: Json包的使用
# 你可以自定义封面图片
cover: 
# 这是页面的图标
icon: 
# 这是侧边栏的顺序
order: 1
# 设置作者
author: kryiea
# 设置写作时间
date: 2024-11-27
# 一个页面可以有多个分类
category:
  - Go
# 一个页面可以有多个标签
tag:
  - Go库
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: 
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息
copyright: 
---

json包的用法

<!-- more -->

### json.Marshal（序列化）与json.Unmarshal（反序列化）的基本用法。
```go
type Person struct {
    Name   string
    Age    int64
    Weight float64
}

func main() {
    p1 := Person{
        Name:   "小明",
        Age:    18,
        Weight: 71.5,
    }
    // struct -> json string
    b, err := json.Marshal(p1)
    if err != nil {
        fmt.Printf("json.Marshal failed, err:%v\n", err)
        return
    }
    fmt.Printf("str:%s\n", b)
    // json string -> struct
    var p2 Person
    err = json.Unmarshal(b, &p2)
    if err != nil {
        fmt.Printf("json.Unmarshal failed, err:%v\n", err)
        return
    }
    fmt.Printf("p2:%#v\n", p2)
}
```
输出：
```go
str:{"Name":"小明","Age":18,"Weight":71.5}
p2:main.Person{Name:"小明", Age:18, Weight:71.5}
```
### 结构体tag介绍
Tag是结构体的元信息，可以在运行的时候通过反射的机制读取出来。
Tag在结构体字段的后方定义，由一对反引号包裹起来，具体的格式如下：
```go
`key1:"value1" key2:"value2"`
```
**总结：**

1. 结构体tag由一个或多个键值对组成。键与值使用冒号分隔，值用双引号括起来。
2. 同一个结构体字段可以设置多个键值对tag，不同的键值对之间使用空格分隔。
### 使用json tag指定字段名
序列化与反序列化默认情况下使用结构体的字段名，我们可以通过给结构体字段添加tag来指定json序列化生成的字段名。
```go
// 使用json tag指定序列化与反序列化时的行为
type Person struct {
	Name   string `json:"name"` // 指定json序列化/反序列化时使用小写name
	Age    int64
	Weight float64
}
```
### 忽略某个字段
如果你想在json序列化/反序列化的时候忽略掉结构体中的某个字段，可以按如下方式在tag中添加-。
```go
// 使用json tag指定json序列化与反序列化时的行为
type Person struct {
	Name   string `json:"name"` // 指定json序列化/反序列化时使用小写name
	Age    int64
	Weight float64 `json:"-"` // 指定json序列化/反序列化时忽略此字段
}
```
### 忽略空值字段
当 struct 中的字段没有值时， json.Marshal() 序列化的时候不会忽略这些字段，而是默认输出字段的类型零值（例如int和float类型零值是 0，string类型零值是""，对象类型零值是 nil）。
如果想要在序列化时忽略这些没有值的字段时，可以在对应字段添加omitempty tag。
举个例子：
```go
type User struct {
	Name  string   `json:"name"`
	Email string   `json:"email"`
	Hobby []string `json:"hobby"`
}

func omitemptyDemo() {
	u1 := User{
		Name: "小明",
	}
	// struct -> json string
	b, err := json.Marshal(u1)
	if err != nil {
		fmt.Printf("json.Marshal failed, err:%v\n", err)
		return
	}
	fmt.Printf("str:%s\n", b)
}
```
输出结果：
```go
str:{"name":"小明","email":"","hobby":null}
```
### 如果想要在最终的序列化结果中去掉空值字段，可以像下面这样定义结构体：使用omitempty
```go
// 在tag中添加omitempty忽略空值
// 注意这里 hobby,omitempty 合起来是json tag值，中间用英文逗号分隔
type User struct {
	Name  string   `json:"name"`
	Email string   `json:"email,omitempty"`
	Hobby []string `json:"hobby,omitempty"`
}
```
此时，再执行上述的omitemptyDemo，输出结果如下：
```go
str:{"name":"小明"} // 序列化结果中没有email和hobby字段
```
> 说句题外话，我们使用gorm操作数据库的话，经常会遇到想忽略指定字段修改的问题，比如结构体中的关联实体，只想json展示，form提交时忽略实体，这个问题请关注我的Go语言学习专栏吧。

### 忽略嵌套结构体空值字段
首先来看几种结构体嵌套的示例：
```go
type User struct {
    Name  string   `json:"name"`
    Email string   `json:"email,omitempty"`
    Hobby []string `json:"hobby,omitempty"`
    Profile
}

type Profile struct {
    Website string `json:"site"`
    Slogan  string `json:"slogan"`
}

func nestedStructDemo() {
    u1 := User{
        Name:  "小明",
        Hobby: []string{"足球", "篮球"},
    }
    b, err := json.Marshal(u1)
    if err != nil {
        fmt.Printf("json.Marshal failed, err:%v\n", err)
        return
    }
    fmt.Printf("str:%s\n", b)
}
```
匿名嵌套Profile时序列化后的json串为单层的：
```go
str:{"name":"小明","hobby":["足球","蓝球"],"site":"","slogan":""}
```
想要变成嵌套的json串，需要改为具名嵌套或定义字段tag：
```go
type User struct {
	Name    string   `json:"name"`
	Email   string   `json:"email,omitempty"`
	Hobby   []string `json:"hobby,omitempty"`
	Profile `json:"profile"`
}
// str:{"name":"小明","hobby":["足球","篮球"],"profile":{"site":"","slogan":""}}
```
**想要在嵌套的结构体为空值时，忽略该字段，仅添加omitempty是不够的**
```go
type User struct {
	Name     string   `json:"name"`
	Email    string   `json:"email,omitempty"`
	Hobby    []string `json:"hobby,omitempty"`
	Profile `json:"profile,omitempty"`
}
// str:{"name":"小明","hobby":["足球","篮球"],"profile":{"site":"","slogan":""}}
```
**还需要使用嵌套的结构体指针**
```go
type User struct {
	Name     string   `json:"name"`
	Email    string   `json:"email,omitempty"`
	Hobby    []string `json:"hobby,omitempty"`
	*Profile `json:"profile,omitempty"`  //这里是重点
}
// str:{"name":"小明","hobby":["足球","篮球"]}
```
### 不修改原结构体忽略空值字段
我们需要json序列化User，但是不想把密码也序列化，又不想修改User结构体，这个时候我们就可以使用创建另外一个结构体PublicUser匿名嵌套原User，同时指定Password字段为匿名结构体指针类型，并添加omitemptytag，示例代码如下：
```go
type User struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

type PublicUser struct {
	*User             // 匿名嵌套
	Password *struct{} `json:"password,omitempty"`
}

func omitPasswordDemo() {
	u1 := User{
		Name:     "小明",
		Password: "123456",
	}
	b, err := json.Marshal(PublicUser{User: &u1})
	if err != nil {
		fmt.Printf("json.Marshal u1 failed, err:%v\n", err)
		return
	}
	fmt.Printf("str:%s\n", b)  // str:{"name":"小明"}
}
```
### 优雅处理字符串格式的数字
有时候，前端在传递来的json数据中可能会使用字符串类型的数字，这个时候可以在结构体tag中添加string来告诉json包从字符串中解析相应字段的数据：
```go
type Card struct {
	ID    int64   `json:"id,string"`    // 添加string tag
	Score float64 `json:"score,string"` // 添加string tag
}

func intAndStringDemo() {
	jsonStr1 := `{"id": "1234567","score": "88.50"}`
	var c1 Card
	if err := json.Unmarshal([]byte(jsonStr1), &c1); err != nil {
		fmt.Printf("json.Unmarsha jsonStr1 failed, err:%v\n", err)
		return
	}
	fmt.Printf("c1:%#v\n", c1) // c1:main.Card{ID:1234567, Score:88.5}
}
```


![20240202223921](http://images.kryiea.cn/img/20240202223921.png)
![20240202224434](http://images.kryiea.cn/img/20240202224434.png)