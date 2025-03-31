---
title: Protocol Buffers详解
description: 详细介绍Protocol Buffers的概念、使用方法及在微服务中的应用
date: 2024-01-01
category:
  - 微服务
  - 协议
tag:
  - Protobuf
  - 微服务
  - 序列化
  - RPC
---

**Protobuf**

[protocol buffers使用指南 - 李文周的博客](https://www.liwenzhou.com/posts/Go/protobuf/)

[Go是如何实现protobuf的编解码的(1)：原理](https://lessisbetter.site/2019/08/26/protobuf-in-go/)

**Protobuf 对比 Json**

假设要描述一个人，他拥有name、age和sex三个属性，可以怎么表示呢？

Json可以很清晰的描述

```JSON
{"name":"Taylor","age":18,"sex":"female"}
```
ProtoBuf

但是像"name"、"age和"sex"这样的key占用了将近一半的内存，这是无法忍受的。

能不能通过定义一种消息格式，**例如用1表示name，2表示age，3表示sex呢?**

这当然是可以的，ProtoBuf通过定义 .proto 文件，提供一种与语言、平台无关的机制来实现对数据的序列化，并且比Json更快，占用的内存更小。

**数据被序列化为一种紧凑、向前和向后兼容、但不可自我描述的二进制线性格式（binary wire format）**

**.proto 文件**

**ProtoBuf将协议保存在.proto文件中，编译器在运行的时候会调用该文件，生成各种编程语言的代码。**

对于上面例子中的person，用protoBuf描述如下：

- 第一行，指定了ProtoBuf的版本，也就是proto3，如果没有指定，则默认是proto2。
- 接下来定义了一个message类型的Person（可以理解为C#中的类），里面包含几个字段，在使用编译器编译后，message会变成对应语言的对象，比如C#中的Class。
- 这些字段都是以 **type fieldName = fieldNumbe**r 格式定义的，

```ProtoBuf
syntax = "proto3"   //定义proto版本，不显示表明，默认是 proto2
message Person{
    string name = 1;
    int32 age = 2;
    enum Sex
    {
       male = 0;
       female = 1;
    }
    Sex sex = 3;
}
```

**支持的数据类型**

**repeated表示一个字段可以包含零个或多个值，类似于数组或列表的概念**

**1.  标量值类型 - Scalar value type**

**默认值不能设置为null**

![...](images\Protobuf.001.jpeg)

**点击图片可查看完整电子表格**

**2. 枚举 - Enum**

```ProtoBuf
message Student {
  string name = 1;
  enum Gender {
    FEMALE = 0;
    MALE = 1;
}
  Gender gender = 2;
  repeated int32 scores = 3;
}
```
- 枚举类型的**第一个选项的标识符必须是0**，这也是枚举类型的默认值。
- 别名（Alias），允许为不同的枚举值赋予相同的标识符，称之为别名，需要打开allow\_alias选项。

```ProtoBuf
message EnumAllowAlias {
  enum Status {
    option allow\_alias = true;
    UNKOWN = 0;
    STARTED = 1;
    RUNNING = 1;
}
}
```
**3. 任意类型 - Any**

Any 可以表示不在 .proto 中定义任意的内置类型。

```ProtoBuf
import "google/protobuf/any.proto";
message ErrorStatus {
  string message = 1;
  repeated google.protobuf.Any details = 2;
}
```
**4. oneof**

```ProtoBuf
message SampleMessage {
  oneof test\_oneof {
    string name = 4;
    SubMessage sub\_message = 9;
}
}
```
**5. map**

```ProtoBuf
message MapRequest {
  map<string, int32> points = 1;
}
```
**6. 其他消息类型**

Result是另一个消息类型，在 SearchReponse 作为一个消息字段类型使用。

```ProtoBuf
message SearchResponse {
  repeated Result results = 1; 
}
message Result {
  string url = 1;
  string title = 2;
  repeated string snippets = 3;
}
```
可以嵌套使用

```ProtoBuf
message SearchResponse {
  message Result {
    string url = 1;
    string title = 2;
    repeated string snippets = 3;
}
  repeated Result results = 1;
}
```

**Protobuf 语法**

**packages**

**对于Go，包可以被用做Go包名称，除非你显式的提供一个option go\_package在你的.proto文件中。**

可以向 .proto 文件添加一个可选package说明符，以防止协议消息类型之间的名称冲突。

```ProtoBuf
package foo.bar;
message Open { ... }
```
然后，你可以在定义消息类型的字段时使用package说明符:

```ProtoBuf
message Foo {
  ...
  foo.bar.Open open = 1;
  ...
}
```
**定义服务**

如果消息类型是用来远程通信的(Remote Procedure Call, RPC)，可以在 .proto 文件中定义 RPC 服务接口。

例如我们定义了一个名为 SearchService 的 RPC 服务，提供了 Search 接口，入参是 SearchRequest 类型，返回类型是 SearchResponse

```ProtoBuf
service SearchService {
rpc Search (SearchRequest) returns (SearchResponse);
}
```
官方仓库也提供了一个[插件列表](https://github.com/protocolbuffers/protobuf/blob/master/docs/third_party.md)，帮助开发基于 Protocol Buffer 的 RPC 服务。

**生产 go 代码**

**编译器调用**

**protocol buffer 编译器需要借助一个插件来根据提供的 proto 文件生成 Go 代码**

Go1.16+请使用下面的命令安装插件。

```Go
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
```
- 这个命令将在 $GOBIN 中安装一个 protocol-gen-go 的二进制文件。
- 我们需要确保 $GOBIN 在你的环境变量中，protocol buffer编译器才能找到它（可以通过go env命令查看$GOPATH）。

- 当使用go\_out标志调用 protoc 时，protocol buffer编译器将生成 Go 代码。
- protocol buffer编译器会将生成的Go代码输出到命令行参数go\_out指定的位置。
- go\_out标志的参数是你希望编译器编写 Go 输出的目录。
- 编译器为每个.proto 文件输入创建一个源文件。
- 输出文件的名称是通过将.proto 扩展名替换为.pb.go而创建的。

生成的.pb.go文件放置的目录取决于编译器标志。

- **有以下几种输出模式:**
- paths=import：输出文件放在以 Go 包的导入路径命名的目录中。
- 例如：protos/buzz.proto文件中带有example.com/project/protos/fizz的导入路径，则输出的生成文件会保存在example.com/project/protos/fizz/buzz.pb.go。
- 如果未指定路径标志，这就是默认输出模式。
- module=$PREFIX：输出文件放在以 Go 包的导入路径命名的目录中，但是从输出文件名中删除了指定的目录前缀。
- 例如，输入文件 pros/buzz.proto，其导入路径为 example.com/project/protos/fizz 并指定example.com/project为module前缀，结果会产生一个名为 pros/fizz/buzz.pb.go 的输出文件。
- 在module路径之外生成任何 Go 包都会导致错误。此模式对于将生成的文件直接输出到 Go 模块非常有用。
- paths=source\_relative：输出文件与输入文件放在相同的相对目录中。
- 例如，一个protos/buzz.proto输入文件会产生一个位于protos/buzz.pb.go的输出文件。

go\_opt标志位参数

在调用protoc时，通过传递 go\_opt标志来提供特定于 protocol-gen-go 的标志位参数。可以传递多个go\_opt标志位参数。

例如，当执行下面的命令时：

```Bash
protoc --proto\_path=src --go\_out=out --go\_opt=paths=source\_relative foo.proto bar/baz.proto
```
编译器将从 src 目录中读取输入文件 foo.proto 和 bar/baz.proto，并将输出文件 foo.pb.go 和 bar/baz.pb.go 写入 out 目录。如果需要，编译器会自动创建嵌套的输出子目录，但不会创建输出目录本身。

**package**

为了生成 Go 代码，必须为每个.proto 文件（包括那些被生成的 .proto 文件传递依赖的文件）提供 Go 包的导入路径。

有两种方法可以指定 Go 导入路径：

1. ` `通过在 .proto 文件中声明它。
2. ` `通过在调用 protoc 时在命令行上声明它。

建议在 .proto 文件中声明它，以便 .proto 文件的 Go 包可以与 .proto 文件本身集中标识，并简化调用 protoc 时传递的标志集。 

如果给定 .proto 文件的 Go 导入路径由 .proto 文件本身和命令行提供，则后者优先于前者。

Go 导入路径是在 .proto 文件中指定的，通过声明带有 Go 包的完整导入路径的 go\_package 选项来创建 proto 文件。用法示例：

```Bash
option go\_package = "example.com/project/protos/fizz";
```
调用编译器时，可以在命令行上指定 Go 导入路径，方法是传递一个或多个 M${PROTO\_FILE}=${GO\_IMPORT\_PATH} 标志位。

用法示例：

```Bash
protoc --proto\_path=src \
  --go\_opt=Mprotos/buzz.proto=example.com/project/protos/fizz \
  --go\_opt=Mprotos/bar.proto=example.com/project/protos/foo \
  protos/buzz.proto protos/bar.proto
```
由于所有 .proto 文件到其 Go 导入路径的映射可能非常大，这种指定 Go 导入路径的模式通常由控制整个依赖树的某些构建工具（例如 Bazel）执行。 如果给定的 .proto 文件有重复条目，则指定的最后一个条目优先。

导入路径用于确定一个 .proto 文件导入另一个 .proto 文件时必须生成哪些导入语句。

` `例如，如果 a.proto 导入 b.proto，则生成的 a.pb.go 文件需要导入包含生成的 b.pb.go 文件的 Go 包（除非两个文件在同一个包中）。 导入路径也用于构造输出文件名。

Go 导入路径和 .proto 文件中的package说明符之间没有关联。 

后者仅与 protobuf 命名空间相关，而前者仅与 Go 命名空间相关。 此外，Go 导入路径和 .proto 导入路径之间没有关联。

