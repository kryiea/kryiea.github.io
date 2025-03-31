---
title: CMake详解
description: 详细介绍CMake的环境配置、基本使用方法及构建项目案例
date: 2024-01-01
category:
  - C++
  - 工具
  - 构建系统
tag:
  - CMake
  - 编译工具
  - C++
  - 项目构建
---


` `**CMake**

**一、 环境配置**

**1、 安装必要的软件**

Windows

1. CMake ：[Download | CMake](https://cmake.org/download/)

Linux

百度

**2、 CMake？**

1. "CMake"这个名字是"cross platform make"的缩写，CMake是一个跨平台的编译(Build)工具，可以用简单的语句来描述所有平台的编译过程。
2. 官方文档： [CMake Reference Documentation — CMake 3.26.1 Documentation](https://cmake.org/cmake/help/latest/)

**3、 安装好后，设置bin路径 到 系统环境变量**

![...](images\CMake.001.png)

![...](images\CMake.002.png)

**二、 配置和使用CMake 构建简单的可执行文件和库**

**1、 将单个文件编译为可执行文件**

1. 创建新文件夹 cmakeTest
2. 新建一个 test.cpp 源文件
3. 配置CMakeLists.txt
1. 同级目录下新建一个文本文件，且必须命名为：*CMakeLists.txt ，CMake*才能够解析
2. 打开该文件，写入CMake指令
3. 第一行，设置CMake所需的最低版本。如果使用的CMake版本低于该版本，会发出错误：     cmake\_minimum\_required(VERSION 3.5 FATAL\_ERROR)
4. 第二行，声明了项目的名称( proj-01 )和支持的编程语言(CXX代表C++)：
   project(proj-01 LANGUAGES CXX)
5. 第三行，指示CMake创建一个新目标：可执行文件 test.exe 
   这个可执行文件是通过编译和链接源文件 test.cpp 生成的。CMake将为编译器使用默认设置，并自动选择生成工具
   add\_executable(test test.cpp)
4. 在cmakeTest目录下新建创建 build 目录：
5. 进入build目录，打开命令行，生成项目配置文件：cmake ..
1. 其中 .. 表示在上一级目录中找 *CMakeLists.txt，相当于制定了它的位置*
2. 出现类似命令，即成功生成该项目的配置文件

![...](images\CMake.003.png)

6. 编译可执行文件，打开命令行：cmake --build .
1. --build 表示构建
2. 后面的 .  表示在当前目录中生成，也可以指定到其他目录中
   文件树/文件目录层级**类似**如下：

![...](images\CMake.004.png)

7. 执行生成的test.exe

在与 *CMakeLists.txt* 相同的目录中执行 *cmake .* ，原则上足以配置一个项目。

然而， *CMake*会将所有生成的文件写到项目的根目录中。这将是一个源代码内构建，通常是不推荐的，因为这会混合源代码和项目的目录树。

我们首选的是**源外构建**。

**2、 切换生成器（是多么简单**

1. 找到已安装生成器列表
1. cmd命令 cmake --help
2. 往下拉，看到一大堆生成器

![...](images\CMake.005.png)

2. 更换生成器：在生成项目配置的时候显示使用命令 -G 指定生成器，如：
   cmake -G "MinGW Makefiles" ..
3. 构建目录
   cmake --build .

与前一个配置相比，每一步的输出没什么变化。

但是每个生成器都有自己的**文件集**，所以编译步骤的输出和构建目录的内容是不同的： 

![...](images\CMake.006.png)

即 cmake --build . 将 MinGW 命令封装在一个跨平台的接口中。

**3、 构建和链接静态库和动态库**

项目中会有单个源文件构建的多个可执行文件的可能。

项目中有多个源文件，通常分布在不同子目录中。这有助于建立项目的源代码结构，而且支持模块化、代码重用和关注点分离。

同时，这种分离可以简化并加速项目的重新编译。

文件

1. 文件树

![...](images\CMake.007.png)

1. 目的：引入一个类，用来包装要打印到屏幕上的消息
2. 说明：Message 类包装了一个字符串，并提供重载过的 << 操作，并且包括两个源码文件： Message.hpp 头文件与 Message.cpp 源文件

```C++
#include "Message.hpp"
#include <cstdlib>
#include <iostream>
int main() {
    Message say\_hello("Hello, CMake World!");
    std::cout << say\_hello << std::endl;
    Message say\_goodbye("Goodbye, CMake World");
    std::cout << say\_goodbye << std::endl;
    return EXIT\_SUCCESS;
}
```


```C++
#pragma once
#include <iosfwd>
#include <string>
class Message {
public:
    Message(const std::string &m) : message\_(m) {}
    friend std::ostream &operator<<(std::ostream &os, Message &obj) {
        return obj.printObject(os);
    }
private:
    std::string message\_;
    std::ostream &printObject(std::ostream &os);
}
```


```C++
#include "Message.hpp"
#include <iostream>
#include <string>
std::ostream &Message::printObject(std::ostream &os) {
    os << "This is my very nice message: " << std::endl;
    os << message\_;
    return os;
}
```
具体操作

1. 配置CMakeLists.txt  
1. 设定CMake最低版本，项目名称，支持的语言 👉 [跳转](https://www.yuque.com/kryiea/agsr1g/bu0cz0g2t5pgr3t8?inner=ub761d79f)
2. 创建目标——静态库。库的名称和源码文件名相同

![...](images\CMake.008.png)

1. 创建 hello-world
   add\_executable(hello-world hello-world.cpp)
2. 将目标库链接到可执行目标：
   target\_link\_libraries(hello-world message)
3. 对项目进行配置和构建

![...](images\CMake.009.png)

1. 运行可执行文件

引入了两个新命令： 

- add\_library(message STATIC Message.hpp Message.cpp) ：生成必要的构建指令，将指定的源码编译到库中。 add\_library 的第一个参数是目标名。整个 CMakeLists.txt 中，可使用相同的名称来引用库。生成的库的实际名称将由CMake通过在前面添加前缀 lib 和适当的扩展名作为后缀来形成。生成库是根据第二个参数( STATIC 或 SHARED )和操作系统确定的。 
- target\_link\_libraries(hello-world message) : 将库链接到可执行文件。此命令还确保 hello-world 可执行文件可以正确地依赖于消息库。因此，在消息库链接到 hello-world 可执行文件之前，需要完成消息库的构建。 

编译成功后，构建目录包含 libmessage.a 一个静态库(在GNU/Linux上)和 hello-world 可执行 

文件。

CMake接受其他值作为 add\_library 的第二个参数的有效值，会用到的值： 

- **STATIC**：用于创建静态库，即编译文件的打包存档，以便在链接其他目标时使用，例如：可执行 文件。 
- **SHARED**：用于创建动态库，即可以动态链接，并在运行时加载的库。可以在 CMakeLists.txt 中使用 add\_library(message SHARED Message.hpp Message.cpp) 从静态库切换到动态共享对象(DSO)。 
- **OBJECT**：可将给定 add\_library 的列表中的源码编译到目标文件，不将它们归档到静态库中，也不能将它们链接到共享对象中。如果需要一次性创建静态库和动态库，那么使用对象库尤其有用。我们将在本示例中演示。 
- **MODULE**：又为DSO组。与 SHARED 库不同，它们不链接到项目中的任何目标，不过可以进行动态加载。该参数可以用于构建运行时插件。

**4、 用条件句控制编译**

目前为止，示例比较简单，CMake执行流是线性的：从一组源文件到单个可执行文件，也可以生 

成静态库或动态库。

为了确保完全控制构建项目、配置、编译和链接所涉及的所有步骤的执行流，CMake提供了自己的语言。

继续探索条件结构 if-else- else-endif 的使用。

从上一个示例的的源代码开始，现在希望能够在不同的**两种**行为之间进行切换： 

2. 将 Message.hpp 和 Message.cpp 构建成一个库(静态或动态)，然后将生成库链接到 hello-world可执行文件中。 
3. 将 Message.hpp ， Message.cpp 和 hello-world.cpp 构建成一个可执行文件，但不生成任何一个库。 

具体操作

1. 首先，定义最低CMake版本、项目名称和支持的语言
2. 我们引入了一个新变量 USE\_LIBRARY ，这是一个逻辑变量，值为 OFF 。顺便打印了它的值：

![...](images\CMake.010.png)

1. CMake中定义 BUILD\_SHARED\_LIBS 全局变量，并设置为 OFF 。调用 add\_library 并省略第二个参数，将构建一个静态库：
   set(BUILD\_SHARED\_LIBS OFF)
2. 然后，引入一个变量 \_sources ，包括 Message.hpp 和 Message.cpp 
   list(APPEND \_sources Message.hpp Message.cpp)

\1. **然后，引入一个基于 USE\_LIBRARY 值的 if-else 语句。如果逻辑为真，则 Message.hpp 和 Message.cpp 将打包成一个库：
if(USE\_LIBRARY)
`        `add\_library will create a static library
`        `since BUILD\_SHARED\_LIBS is OFF
`        `add\_library(message ${\_sources})
`        `add\_executable(hello-world hello-world.cpp)
`        `target\_link\_libraries(hello-world message)
else()
`        `add\_executable(hello-world hello-world.cpp ${\_sources})
endif()**

1. 我们可以再次使用相同的命令集进行构建。由于 USE\_LIBRARY 为 OFF , hello-world 可执行文件将使用所有源文件来编译

使用了两个变量： USE\_LIBRARY 和 BUILD\_SHARED\_LIBS 。这两个变量都设置为 OFF 。如 CMake语言文档中描述，逻辑真或假可以用多种方式表示： 

- 如果将逻辑变量设置为以下任意一种： 1 、 ON 、 YES 、 true 、 Y 或非零数，则逻辑变量为 **true** 。 
- 如果将逻辑变量设置为以下任意一种： 0 、 OFF 、 NO 、false 、N 、IGNORE、NOTFOUND 、空字符串，或者以 -NOTFOUND 为后缀，则逻辑变量为 **false** 。 

USE\_LIBRARY 变量将在第一个和第二个行为之间切换。

BUILD\_SHARED\_LIBS 是CMake的一个全局标志。因为CMake内部要查询 BUILD\_SHARED\_LIBS 全局变量，所以 add\_library 命令可以在不传递 STATIC/SHARED/OBJECT 参数的情况下调用；如果 false 或未定义，将生成一个静态库。 

这个例子说明，可以引入条件来控制CMake中的执行流。但是，当前的设置不允许从外部切换，不需要手动修改 CMakeLists.txt 。

原则上，我们希望能够向用户开放所有设置，这样就可以在不修改构建代码的情况下调整配置，稍后将展示如何做到这一点。

**5、 指定编译器**

CMake可以根据平台和生成器选择编译器，还能将编译器标志设置为默认值

CMake将语言的编译器存储在 CMAKE\_<LANG>\_COMPILER 变量中，其中 <LANG> 是受支持的任何一种语言

具体操作

1. 使用CLI中的 -D 选项，例如：**建议使用** 
   cmake -D CMAKE\_CXX\_COMPILER=clang++ .. 
2. 通过导出环境变量 CXX (C++编译器)。例如， 使用这个命令使用 clang++ 作为 C++ 编译器：
   env CXX=clang++ cmake ..  

配置时，CMake会进行一系列平台测试，以确定哪些编译器可用，以及它们是否适合当前的项目。一个合适的编译器不仅取决于我们所使用的平台，还取决于我们想要使用的生成器。

**6、 切换构建类型**

CMake可以配置构建类型，例如：Debug、Release等。

配置时，可以为Debug或Release构建设置相关的选项或属性，例如：编译器和链接器标志。

控制生成构建系统使用的配置变量是CMAKE\_BUILD\_TYPE 。

该变量默认为空，CMake识别的值为: 

\1. **Debug**：用于在没有优化的情况下，使用带有调试符号构建库或可执行文件。 

\2. **Release**：用于构建的优化的库或可执行文件，不包含调试符号。 

\3. **RelWithDebInfo**：用于构建较少的优化库或可执行文件，包含调试符号。 

\4. **MinSizeRel**：用于不增加目标代码大小的优化方式，来构建库或可执行文件。

具体操作

1. 定义最低CMake版本、项目名称和支持的语言
2. 设置一个默认的构建类型(本例中是Release)，并打印一条消息。要注意的是，该变量被设置为缓存变量，可以通过缓存进行编辑

![...](images\CMake.011.png)

1. 切换构建类型：切换成 Debug
   cmake -D CMAKE\_BUILD\_TYPE=Debug ..  

**7、 设定语言标准**

CMake引入了一个独立 于平台和编译器的机制，用于为 C++ 和 C 设置语言标准：为目标设置 <LANG>\_STANDARD 属性。

具体操作

set(CXX\_STANDARD 14)  

**三、创建和运行测试**

**1、 创建一个简单的单元测试**

CTest是CMake的测试工具，使用CTest进行单元测试。

```C++
#include "sum\_integers.hpp"
#include <vector>
int sum\_integers(const std::vector<int> integers) {
    auto sum = 0;
    for (auto i : integers) {
        sum += i;
    }
    return sum;
}
```


```C++
#pragma once
#include <vector>
int sum\_integers(const std::vector<int> integers);
```


```C++
#include "sum\_integers.hpp"
#include <iostream>
#include <string>
#include <vector>
// we assume all arguments are integers and we sum them up
// for simplicity we do not verify the type of arguments
int main(int argc, char \*argv[]) {
    std::vector<int> integers;
    for (auto i = 1; i < argc; i++) {
        integers.push\_back(std::stoi(argv[i]));
    }
    auto sum = sum\_integers(integers);
    std::cout << sum << std::endl;
}
```


```C++
#include "sum\_integers.hpp"
#include <vector>
int main() {
    auto integers = {1, 2, 3, 4, 5};
    if (sum\_integers(integers) == 15) {
        return 0;
    } else {
        return 1;
    }
}
```
**cmake\_minimum\_required(VERSION 3.5 FATAL\_ERROR)
project(recipe-01 LANGUAGES CXX)
#对于这个例子，我们需要C++11支持:
set(CMAKE\_CXX\_STANDARD 11)
set(CMAKE\_CXX\_EXTENSIONS OFF)
set(CMAKE\_CXX\_STANDARD\_REQUIRED ON)
#然后，定义库及主要可执行文件的依赖关系，以及测试可执行文件：
#example library
add\_library(sum\_integers sum\_integers.cpp)
main code
add\_executable(sum\_up main.cpp)
target\_link\_libraries(sum\_up sum\_integers)
testing binary
add\_executable(cpp\_test test.cpp)
target\_link\_libraries(cpp\_test sum\_integers)
#最后，打开测试功能并定义测试
enable\_testing()
add\_test(
`        `NAME cpp\_test
`        `COMMAND $<TARGET\_FILE:cpp\_test>
)**

具体操作

1. CMakelists
2. 先手动测试

![...](images\CMake.012.png)

1. 用 ctest 运行测试集

![...](images\CMake.013.png)

两个关键命令： 

1. enable\_testing() ，测试这个目录和所有子文件夹(因为我们把它放在主 CMakeLists.txt )。 
2. add\_test() ，定义了一个新的测试，并设置测试名称和运行命令。

![...](images\CMake.014.png)

上面的例子中，使用了生成器表达式: $<TARGET\_FILE:cpp\_test> 。

生成器表达式，是在生成构建系统生成时的表达式，此时，我们可以声明 $<TARGET\_FILE:cpp\_test> 变量，将使用 cpp\_test 可执行目标的完整路径进行替换。

生成器表达式在测试时非常方便，因为不必显式地将可执行程序的位置和名称，可以硬编码到测试中。 以一种可移植的方式实现这一点非常麻烦，因为可执行文件和可执行后缀(例如，Windows上是 .exe 后缀)的位置在不同的操作系统、构建类型和生成器之间可能有所不同。使用生成器表达式，我们不必显式地了解位置和名称。

如果我们想了解更多，可以查看文件 test/Temporary/lasttestsfailure.log 。这个文件包含测试命令的完整输出，并且在分析阶段，要查看的第一个地方。使用以下CLI开关，可以从CTest获得更详细的测试输出： 

--output-on-failure :将测试程序生成的任何内容打印到屏幕上，以免测试失败。 

-v :将启用测试的详细输出。 

-vv :启用更详细的输出。 

CTest提供了一个非常方快捷的方式，可以重新运行以前失败的测试；

要使用的CLI开关是 --rerun-failed ，在调试期间非常有用。

**2、 使用Catch2库进行单元测试**

前面的配置中，使用返回码来表示 test.cpp 测试的成功或失败。

对于简单功能没问题，但是通常情况下，我们想要使用一个测试框架，它提供了相关基础设施来运行更复杂的测试，包括固定方式进行测试，与数值公差的比较，以及在测试失败时输出更好的错误报告。

这里，我们用目前比较流行的测试库Catch2来进行演示。

这个测试框架有个很好的特性，它可以通过单个头库包含在项目中进行测试，这使得编译和更新框架特别容易。我们将CMake和Catch2结合使用，来测试上一个求和代码。

我们需要 catch.hpp 头文件，可以从 [github开源](https://github.com/catchorg/Catch2) 下载，并将它与 test.cpp 一起放在项目的根目录下。

```C++
#include "sum\_integers.hpp'
// this tells catch to provide a main()
// only do this in one cpp file
#define CATCH\_CONFIG\_MAIN
#include "catch.hpp"
#include <vector>
TEST\_CASE("Sum of integers for a short vector","[short]")
{
    auto integers = [1,2,3,4,5];
    REQUIRE(sum integers(integers) == 15);
}
TEST\_CASE("Sum of integers for a longer vector"，"[long]")
{
    std::vector<int> integers;
    for (int i = 1; i < 1001; ++i){
        integers.push\_back(i);
    }
    REQUIRE(sum\_integers(integers) == 500500);
}
```
**set minimum cmake version
cmake\_minimum\_required(VERSION 3.5 FATAL\_ERROR)
project name and language
project(recipe-02 LANGUAGES CXX)
require C++11
set(CMAKE\_CXX\_STANDARD 11)
set(CMAKE\_CXX\_EXTENSIONS OFF)
set(CMAKE\_CXX\_STANDARD\_REQUIRED ON)
example library
add\_library(sum\_integers sum\_integers.cpp)
main code
add\_executable(sum\_up main.cpp)
target\_link\_libraries(sum\_up sum\_integers)
testing binary
add\_executable(cpp\_test test.cpp)
target\_link\_libraries(cpp\_test sum\_integers)
对于上一个示例的配置，需要保留一个测试，并重命名它。
注意， --success 选项可传递给单元测试的可执行文件。这是一个Catch2选项，测试成功时，也会有输出:
enable\_testing()
add\_test(
`  `NAME catch\_test
`  `COMMAND $<TARGET\_FILE:cpp\_test> --success
)**

具体操作

1. 改写 test.cpp 和 CMakeList.txt
2. 配置、构建
3. CTest中，使用 -V 选项运行测试，以获得单元测试可执行文件的输出:
   ctest -V

![...](images\CMake.015.png)



