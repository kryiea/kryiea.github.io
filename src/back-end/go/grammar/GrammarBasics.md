---
# 这是文章的标题
title: 基础语法
# 你可以自定义封面图片
cover: 
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 3
# 设置作者
author: kryiea
# 设置写作时间
date: 2024-11-27
# 一个页面可以有多个分类
category:
  - vscode
# 一个页面可以有多个标签
tag:
  - 插件
  - vscode 配置
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: 
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息
copyright: 
---

Go 语言的基础语法

<!-- more -->

好文章

[【一文Go起来】快速上手篇](https://mp.weixin.qq.com/s?__biz=Mzg5ODU2ODczMQ==&mid=2247484132&idx=1&sn=ea8e3fd37b9d351e6aca8054f5e87c40&chksm=c061c590f7164c86628664f1009b088a3f4ea703765b49ee3939856870dc8b6f1db661d54174&token=1386439580&lang=zh_CN#rd)

# Go version
语法的特性符合 Go 1.22 以前版本

# 一、语言结构
## 1.1 标识符大小写

- 标识符：常量、变量、类型、函数名、结构字段...
- 以大写字母开头：这种形式的标识符对象可以被外部包的代码所使用
- 以小写字母开头：对包外不可见，但在整个本包内是可见而且是可用的（类似protected）
## 1.2 文件结构

- **文件名与包名：** 没有直接关系，不一定要将文件名与包名定成一个名称
- **文件夹名与包名：** 没有直接关系，也不一定要一致
- 同一个文件夹下的文件只能有一个包名
# 二、语言变量

## 2.1 基本规范
- 变量命名：首个字符不能是数字
- 声明变量格式：var Name type

## 2.2 单变量声明
1. 声明变量，没有显示初始化，变量默认为`零值`，不同类型零值不一样：
   1. bool类型：`false`
   2. 数值类型：`0`
   3. 字符串类型：`“” 空字符串`
   4. 指针、chan、切片 类型：`nil`
2. 根据值自行判断变量类型
   1. `var v_name = value`
   2. `:=`
## 2.3 多变量声明

1. 声明格式：`var v_name1 v_name2 v_name3 type`
2. `var()`： 一般用于声明全局变量
    ```go
    var(
        v_name1 int
        v_name2 string
    )
    ```
## 2.4 `:=` 注意
`:=` 只能在函数体内使用，不可以用于全局变量的声明和赋值
```go
    // g,h := 123, "hello"  不行

    func main(){
        //这里可行
        g,h := 123, "hello"
    }
```

## 2.5 变量的生命周期

- **全局变量：** 生命周期是程序存活时间
- **局部变量：** 在不发生内存逃逸的情况下，局部变量周期是函数存活时间

## 2.6 常量

- 不可被修改
- 常量数据类型只能是：布尔型、数字型（整数型、浮点型、复数型）、字符串型
- 定义方式：`const identifier [type] = value`
- [type] 可以省略，编译器可以根据变量的值来推断类型
  
```go
const b string = "abc"
	👇等价👇
const b = "abc"

// := 错误
const a := 111
```

## 2.7 常量用作枚举
go没有专门的枚举类型，枚举一般用常量表示

```go
package main

import "unsafe"

const(
    a = "abc"
    b = len(a) // 必须是内置函数
    c = unsafe.Sizeof(a)
)

func main(){
    println(a,b,c)
}

// result：abc 3 16
```
> 注意：字符串的 unsafe.Sizeof() 的返回值一直都是16！

**解释：**

字符串类型对应一个16字节大小的结构体，该结构体有两个域：
```go
type StringHeader srtuct{
    Data uintptr    // 8字节
    Len int         // 8字节
}
```
`sizeof(stringType)` 只是获取string顶层结构体的大小，并不会深入到实际数据


**结论：**

`sizeof(stringType)` 的返回值始终是 16

## 2.8 iota

- iota 是一个特殊的常量，可认为是一个计数器
- iota 在 `const` 关键字出现时将被重置为 0 （const 内部的第一行之前），const中每新增加一行常量声明将使iota计数一次
```go
const(
    a = iota // 第一次声明 iota为 0
    b = iota // 第二次声明 iota为 1
    c = iota // 第三次声明 iota为 2
)

const(
    a = iota // 第一次声明 iota为 0
    b // 1 
    c // 2
)
```

```go

func main(){
    const(
        a = iota	// 0
        b			// 1
        c			// 2
        d = "ha"	// d是字符串"ha"，但是iota = 3
        e			// e是字符串"ha"，但是iota = 4
        f = 100		// iota = 5
        g			// 6
        h = iota	// 7 并且恢复默认记数
        i 			// 8
    )
}
```
# 三、运算符
go语言跟其他语言一样，运算符大体上也分为以下几种：
- 算术运算符
- 关系运算符
- 逻辑运算符
- 位运算符
- 赋值运算符
- 其他运算符
- 
## 3.1 逻辑运算符
![20240424155614](http://images.kryiea.cn/img/20240424155614.png)
## 3.2 位运算符
位运算符是对内存中的二进制数进行按位运算，包括 `& ，| ，^ ，<<，>>`

![20240424155622](http://images.kryiea.cn/img/20240424155622.png)

## 3.3 运算符优先级
有些运算符拥有较高的优先级，二元运算待的运算方向均是从左至右。
由上至下代表优先级由高到低：
![20240424155629](http://images.kryiea.cn/img/20240424155629.png)

## 3.3 特殊运算符
`&^`：位清除，先 & 再 ^ 就全变成 0 了
`a &^ b`：清零a中，ab都为1的位

# 四、结构体初始化
## 4.1 键值对初始化

在初始化时以`属性：值`的方式完成，如果有的属性不写，则为默认值
```go
type student struct{
    ID int
    Name string
    Age int
    Score int
}

 func main(){
     st := student{
         ID :100,
         Name : "kryiea",
     }
 }
```
## 4.2 值列表初始化

直接按照 `属性顺序` 来初始化
⚠️值列表的个数必须 = 结构体属性个数，且按顺序，允许后空缺，不允许中间跳开
```go
st := student{
    101,
    "ddd"
    2,
    33,
}
```

# 五、条件判断技巧
## 5.1 if
处理map的时候可以用多重赋值写法，表达性强
```go
if num, ok := dic["apple"]; ok{
    ...
}
```
## 5.2 switch - case 

`case` 默认有`break` 跳出条件选择。
若希望从某个`case`开始按顺序往下执行，可以使用`fallthrough`。

# 六、循环
只有 for 一种循环方式
## 6.1 理解 for 的结构
- `init`: 一般为赋值表达式，给控制变量赋初值，执行一次；
- `condition`: 关系表达式或逻辑表达式，循环控制条件；
- `post`: 一般为赋值表达式，给控制变量增量或减量。
```go
// 1
for init; condition; post{
    
}
// 2
for condition{
    
}
// 3
for{
    
}
```
## 6.2 for range
- `go version 1.22.2 之后`
  每次迭代都是一个新变量。

- `go version 1.22.2 之前`
  - for range 格式可以对 slice、map、数组、字符串继续迭代读取
  - 但是属于副本读，每次迭代都共享一个底层变量 temp，覆盖写入 temp 返回给 value！
  - 详细分析看 6.3 部分。


示例代码：
```go
// range 返回值
for key/index, value := range Map{
    
}

// 或者
for key :=range Map{
    
}

//或者
for _,value :=range Map{
    
}
```

## 6.3 for range 陷阱
以下分析适合 `go version 1.22.2 之前`，之后的版本已经更改。
> 坑 1： for range 取不到所有元素的地址

```go
func main(){
    arr := [2]int{1,2}
    res := []*int{}
    for _, v := range arr{
        res = append(res, &v)
    }

    fmt.println(*res[0], *res[1])
}
    // except: 1, 2
    // result: 2, 2
```
分析：
- res 中最终所有的元素都是一个地址，这一个地址最终指向的是 v 最后遍历得到的值，也就是 2。
- 说明遍历 arr 元素的时候，只是将元素赋值一个临时变量 temp，整个循环都是用这一个 temp变量。

希望得到 1 和 2 怎么实现：
- 方式 1：用局部变量 v1 拷贝 v
    ```go
    for _, v := range arr{
        v1 := v   
        res = append(res, &v1)
    }
    ```
- 方式 2：直接使用索引获取原来的元素
    ```go
    for k, _ := range arr{
        res = append(res, &arr[k])
    
    ```

> 坑 2：循环终止问题

- 在 for-range 中向切片追加元素时，循环会在完成遍历原本切片长度后停止。因为 for-range 循环在开始前就已经确定了切片的长度。
- 循环迭代的是切片在迭代开始时的状态，后续追加的元素不会影响当前的迭代过程。
```go
v := []int{1, 2, 3}
for i := range v {
    fmt.Println(i) // 这里打印的是切片v的索引
    v = append(v, i)
}
// result: 1, 2, 3
```

# 七、函数参数
## 7.1 参数传递
go中参数传递都是值传递，不存在引用传递（区别于c++）

- 值传递时，可以改变形参的值，但不会改变实参值
- 传递地址也是值传递，会拷贝原地址，指向同一块区域

## 7.2 基本类型
> int、float、bool、string ...

对于基础数据类型，值传递意味着每次函数调用时都会 **创建变量的一个新副本**。
这些副本是独立的，对副本的任何修改都不会影响原始变量。

## 7.3 引用类型和指针
> 引用类型如：切片、映射、通道

对于引用类型和指针，虽然参数传递仍然是按值传递，但传递的是一个 **引用的副本或指针的副本**

例子：
内存位置 `0xfff0 叫 v1`，传到到函教参数 `v2`，`v2` 的内存位置可能是 `0xffe8`，里面再保存 `0xfff0`。

## 7.4 结构体和数组
结构体和数组也是按值传递的。
当你传递一个结构体或数组给函数时，会 **创建这个结构体或数组的一个完整副本。** 函数内部对副本的修改不会影响原始的结构体或数组。
## 7.5 可变参数

- 在 Go 语言中，可变参数（variadic parameter）允许函数接受数量可变的参数。
- 可变参数使用省略号（...）表示。

简单的示例
```go
package main

import "fmt"

func sum(nums ...int) int {
	total := 0
	for _, num := range nums {
		total += num
	}
	return total
}

func main() {
	fmt.Println(sum(1, 2))         // 输出: 3
	fmt.Println(sum(1, 2, 3, 4, 5)) // 输出: 15
}
```
在上面的示例中，sum 函数使用了可变参数语法，其中 `nums ...int` 表示 sum 函数接受任意数量的 int 类型参数。
在 main 函数中，我们可以调用 sum 函数并传入任意数量的 int 参数，而不需要提前指定参数的个数。

> 可变参数原理

- 在函数内部，可变参数会被当作一个切片（slice）来处理
- `nums ...int` 会被当做 `nums []int`
  
# 八、指针
## 8.1 Go 普通指针特性

1.  **类型安全**：Go 语言的指针是类型安全的。这意味着，如果你有一个指向 `int` 的指针，你只能将它指向 `int` 类型的变量。类型安全可以防止许多常见的编程错误。 
2.  **限制**：Go 不允许指针算术。这是一个故意的设计选择，用来简化内存管理并减少与指针相关的错误。 
3.  **用途**：普通指针常用于引用变量，以便在函数之间共享和修改数据，或者在结构体中嵌入指向其他结构体的指针。 
4.  **零值**：未初始化的指针的零值是 `nil`。

## 8.2 unsafe 包中的 uintptr 和 Pointer

1.  **类型不安全**：`unsafe` 包允许你绕过 Go 的类型系统，进行任意类型的转换。这带来了更高的灵活性，但也带来了更高的风险，因为错误的类型转换可能会导致程序崩溃。 
2. `uintptr`  **指针算术**：使用 `unsafe` 包中的 `uintptr` 类型，你可以对指针进行算术运算。`uintptr`是一个可变长的整数类型，它用于表示一个无类型的指针或将一个 unsafe.Pointer 转换成一个可以比较的整数。在32位系统上是32位的。在64位系统上是64位的。
3.  `unsafe.Pointer`：这是 `unsafe` 包中定义的一个特殊类型，可以被用来转换任何类型的指针。它提供了一种方式来暂时存储指针值，然后可能将其转换回原来的类型或不同的类型。 
   
# 九、方法
**方法是绑定在某种类型的变量上的函数**

> 某种类型不限于结构体，基本数据类型也可以

- 变量类型不仅仅局限于结构体类型，可以是任意类型。
- 比如：不可以直接对 int 自定义方法，但可以通过起别名来实现绑定
```go
package main

import "fmt"

// MyInt 是 int 的一个类型别名
type MyInt int

// Double 是 MyInt 类型的一个方法，它返回值的两倍
func (m MyInt) Double() MyInt {
    return m * 2
}

func main() {
    var a MyInt = 10
    fmt.Println(a.Double()) // 输出: 20
}
```
## 9.1 自定义方法的位置
⚠️ 必须在同一个包下：类型的定义和绑定在它上面的方法的定义可以不放置在同一个文件中，可以存在不同的源文件

# 十、继承

- 在 Go 中，并没有传统面向对象语言中的继承概念，但可以通过组合和接口来达到类似的效果。
- 因为 Go 没有类这个概念，没有c++和java一样的显式继承关系，自然就不存在父类子类一说
  
## 10.1 组合实现继承
嵌入 \ 组合 差不多意思

- 通过在一个结构体中嵌入另一个匿名结构体，可以实现类似继承的效果。
- 内部结构体的字段和方法会被**提升**到外部结构体中，使得外部结构体可以直接访问这些字段和方法
```go
// Person
type Person struct {
    Name string
}

func (p Person) SayHello() {
    fmt.Println("Hello, my name is", p.Name)
}

// Employee
type Employee struct {
    Title  string
    Person // 嵌入 Person 结构体,相当于：
    /*
       type Person struct {
        	Name string
		}
    */
}

func main() {
    emp := Employee{
        Person: Person{Name: "John"},
        Title:  "Developer",
    }

    emp.SayHello() // 可以直接调用内部结构体 Person 的方法
}
```

> 这个“提升 ”Go 怎么实现

编译器在生成代码时会进行以下操作：

1. 对于内部结构体的字段，编译器会在外部结构体中创建相同名字的字段，并且这些字段会被初始化为内部结构体的实例。
2. 对于内部结构体的方法，编译器会在外部结构体中创建同名的方法，并且将内部结构体实例作为方法的接收者。

这样，外部结构体就可以直接访问内部结构体的字段和方法，而不需要通过内部结构体的实例来访问。
## 10.2 接口
通过定义接口和实现接口的方式，可以实现多态的效果。
一个结构体只要实现了某个接口定义的所有方法，就被视为实现了该接口。
```go
type Shape interface {
    Area() float64
}

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return 3.14 * c.Radius * c.Radius
}
```
## 10.3 方法重写
在 Go 中，匿名字段的方法可以被外部结构体重写，从而实现类似于继承中方法的覆盖。
```go
type Animal struct {
    Name string
}

func (a Animal) Speak() {
    fmt.Println("Animal speaks")
}

type Dog struct {
    Animal
}

// 重写Animal的Speal()
func (d Dog) Speak() {
    fmt.Println("Dog speaks")
}
```

# 十一、接口

- 接口用来抽象一系列行为，不推荐把字段定义在接口中
- 当某一种类型实现了所有这些声明的方法，那么就称这种类型为该接口的一种实现
## 11.1 接口定义
```go
type interfaceName interface{
    methodName1([parameter_list])[return_type_list]
    methodName2([parameter_list])[return_type_list]
    methodName3([parameter_list])[return_type_list]
    .....
}
```

例子：
![20240424170234](http://images.kryiea.cn/img/20240424170234.png)

## 11.2 实现多个接口
- 在 Go 中，一个类型可以实现多个接口。
- 这种灵活性允许一个类型定义多种行为，并且可以根据需要实现不同的接口。

> 一个简单的例子

```go
package main

import "fmt"

// 定义接口A
type A interface {
    MethodA()
}

// 定义接口B
type B interface {
    MethodB()
}

// 定义一个结构体，实现接口A和接口B
type MyStruct struct {
}

// 实现接口A的方法
func (m MyStruct) MethodA() {
    fmt.Println("MethodA called")
}

// 实现接口B的方法
func (m MyStruct) MethodB() {
    fmt.Println("MethodB called")
}

func main() {
    var s MyStruct
    var a A
    var b B

    a = s
    b = s

    a.MethodA() // 输出: MethodA called
    b.MethodB() // 输出: MethodB called
}
```
## 11.3 空接口

- 没有任何方法声明的接口称之为空接口
- 所有类型都实现了空接口，所以空接口可以存储任意类型的数值
- Goland很多库的源代码都会以空接口作为参数，表示接受任何类型的参数，`fmt`包下的`Print`系列
```go
func Println(a ...interface{})(n int, err error)
```
## 11.4 断言陷阱
例子：不能把`interface{}`类型的变量`i`赋值给整形变量`b`

```go
func main(){
    var a int = 1
    var i interface{} = a
    var b int = i
}
// result:
// cannot use i (variable of type interface{}) as int value 
// in variable declaration: need type assertion
```
## 11.5 断言原理
要实现 11.4 的操作，就要用断言。（**更深的理解：接口的数据结构有关。** 先不展开。）

类型断言接口操作：用来检查接口变量的值是否实现了某个接口，或者是否是某个具体的类型。
格式：`value, ok := x.(T)`，  `x` 为接口类型，ok 为 `bool` 类型

```go
package main

import "fmt"

func main(){
    var x interface{}
    x = 8
    val, ok := x.(int)
    fmt.Printf("val is %d, ok is %t \n", val, ok)
}

//result: val is 8, ok is true
```
> ⚠️注意
- 无论 `T`是什么类型，如果`x`是`nil`接口值，类型断言都会失败
- 如果`ok`这个返回值不接受，没问题就没问题，有问题就报`panic`
## 11.6 接口作为函数参数
```go
package main

import "fmt"

// 定义一个接口
type Shape interface {
    Area() float64
}

// 定义一个函数，接受实现了 Shape 接口的类型作为参数
func PrintArea(s Shape) {
    fmt.Println("Area:", s.Area())
}

// 定义一个结构体，实现了 Shape 接口
type Circle struct {
    Radius float64
}

// 实现 Shape 接口的方法
func (c Circle) Area() float64 {
    return 3.14 * c.Radius * c.Radius
}

// 定义一个结构体，实现了 Shape 接口
type Rectangle struct {
    Width  float64
    Height float64
}

// 实现 Shape 接口的方法
func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func main() {
    c := Circle{Radius: 3}
    r := Rectangle{Width: 4, Height: 5}

    PrintArea(c) // 输出: Area: 28.26
    PrintArea(r) // 输出: Area: 20
}

```
## 11.7 接口嵌套
一个接口中包含了其他接口，要实现外部接口，就需要实现内部嵌套的接口对应的所有方法。

```go
package main

import "fmt"

// 定义两个简单的接口
type Reader interface {
    Read()
}

type Writer interface {
    Write()
}

// 嵌套接口
type ReadWriter interface {
    Reader
    Writer
}

// 实现接口
type MyStruct struct {
}

func (m MyStruct) Read() {
    fmt.Println("Reading data...")
}

func (m MyStruct) Write() {
    fmt.Println("Writing data...")
}

func main() {
    var rw ReadWriter
    rw = MyStruct{}
    rw.Read()  // 输出: Reading data...
    rw.Write() // 输出: Writing data...
}
```
# 十二、 error
## 12.1 error 接口类型
`error`是 go 的一个普通的接口，并且不携带任何堆栈信息。
```go
type error interfce{
    Error() string
}
```

> 生成一个 error 对象

常用`errors.New()`或者 `fmt.Errorf()` 来返回一个`error`对象

这两种方式返回的 `error` 是不可以直接进行比较的，以为`errors.New()`返回的其实是一个地址，不用用来做等值判断.
# 十三、 defer
## 13.1 需要思考的 3 个问题

1. defer 调用栈
2. 执行到 defer 关键字时会发生什么
3. defer 的栈什么时机会执行，与 return 的关系

## 13.2 使用场景 1: 资源的释放
延迟调用，优雅解决资源回收问题，避免遗漏资源回收。
如：网络连接、数据库连接、文件句柄的资源释放。

## 13.3 使用场景 2：配合 recover 处理 panic
用`panic`抛出异常，用 `defer + recover`捕获异常

## 13.4 defer 的快照读
```go
func derferRun() {
    var num = 1
    derfer fmt.Printf("num is %d",num)
    num = 2
    return
}
func main(){
    derfer()
}
// result： num is 1
```

> 为什么是 1 不是 2 ：

![20240424171313](http://images.kryiea.cn/img/20240424171313.png)
就算 defer 中参数是`地址`，也会相当于快照一样保存那个地址，但是如果地址所指向的内容被修改了，也会跟着一起变化。

# 十四、 return
## 14.1 return 的非原子性
return并非一个原子操作，可被分解成以下3步：
1. 设置返回值
2. 执行defer 栈
3. 将返回值结果返回
   
思考下面 3 个例子

> 例子1
```go
package main

import "fmt"

func main(){
    res := deferRun()
    fmt.Println(res)
}

func deferRun()(res int){
    num := 1
    defer func(){
        res++
    }()
    return num
}

// result: 2
```
> 例子2
```go
package main

import "fmt"

func main(){
    res := deferRun()
    fmt.Println(res)
}

func deferRun() int {
    num := 1
    defer func(){
        num++
    }()
    return num
}

// result: 1
```
> 例子3

```go
package main

import "fmt"

func main(){
    res := deferRun()
    fmt.Println(res)
}

func deferRun() int {
    var num int
    defer func(){
        num++
    }()
    return 1
}

// result: 1
```
# 十五、panic 异常捕获
## 15.1 painc 捕获方式
- 异常：程序运行过程发生的 panic，注意 fatal 这种致命错误是会导致程序直接崩溃，无法捕获。
- 捕获：不让程序core，在程序中加入recover机制，捕获异常，打印

> 例子

![20240424173111](http://images.kryiea.cn/img/20240424173111.png)
> 注意

有了`recover`之后，程序不会在`panic`出中断，在执行完`panic`之后，接下来会执行`defer`函数，但是当前函数`panic`后面的代码不会被执行，但是**调用该函数的代码可以接着执行(理解panic的传递)**。
## 15.2 panic的传递

- 当一个函数发生`panic`后当前函数体的剩余代码不再执行
- 若在当前的函数体没有`recover`，该`panic`会一直向外层传递，往外传递 `panic` 过程中也不会执行上层的剩余代码，直到某层被`recover`后，该层剩下的代码才会恢复执行。
- 如果一直到主函数，迟迟没有`recover`，`main`就会终止。
- 如果在过程中遇到了最近的`recover`，就会被捕获，捕获后当前函数体的剩余代码不再执行，但是再上一层的还可以可以继续执行

> 例子

![20240424174004](http://images.kryiea.cn/img/20240424174004.png)
![20240424174010](http://images.kryiea.cn/img/20240424174010.png)

> 解析

**func  调用链**：`main --> testpanic1 --> testpanic2 --> testpanic3`
**panic 传递链**：`testpanic3 --> testpanic2 --> revocer() --> painc 传递结束。`

1. 在 `testpanic3` 中发现了一个 `panic`，由于 `testpanic3` 没有 `recover`，`panic` 向上传递。
2. 在 `testpanic2` 中找到了 `recover`，`panic` 被捕获了，程序接着运行。
3. 由于 `testpanic3` 发生了 `panic`，所以不再继续运行，函数跳出返回到 `testpanic2`。
4. `testpanic2` 也不会再继续执行，跳出函数 `testpanic2`。
5. 到了 `testpanic1` 接着运行。

所以 `recover` 和 `panic` 可以总结为以下 2 点：
1. `recover` 只能恢复当前函数级或以当前函数为首的调用链中的函数中的 `panic`，恢复后调用当数结束，但是调用此函数的函数继续执行。
2. 函数发生了 `panic` 之后会 一直向上传递，如果直至 `main` 函数都没有 `recover`，程序将终止，如果是碰见了 `recover`，将被 `recover` 捕获。
