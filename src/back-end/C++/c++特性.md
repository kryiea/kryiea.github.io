---
title: C++特性详解
description: 详细介绍C++语言特性、引用、函数重载等C++独有的语言特性
date: 2024-01-01
category:
  - C++
  - 编程语言
tag:
  - C++
  - 引用
  - 语言特性
  - 面向对象
---

**c++特性**

**cpp的拓展**

- 结构体声明变量省去struct

```C
struct stu{
        int a;
        char b;
}
//C的风格
struct stu s1 = {1，’x‘};
//C++风格
stu s1 = {1，’x‘};
```

**引用**

C语言和C均使用& 符号表示变量的地址。
而C赋予了&一个引用含义，即起别名
引用必须初始化
系统不会为引用 开辟空间

1. 基本数据类型引用

```C
int a = 10;
int &b = a;
// b只是a的一个别名，指向同一片内存单元（地址一样），代表同一值，不会为b单独开辟一个内存空间
//操作a等于操作b
```
1. 数组的引用

```C
int arr[5] = {1,2,3,4,5}
int (&myarr)[5] = arr;
```
1. 指针变量的引用

```C
int num = 10;
int \*p = #
int\* &myp = p; //p 和myp一样
```
1. 函数的引用

```C
void func1(void){
        cout<<"fun1"<<endl;        
};
void (&myfunc1)(void) = func1;
```
1. 作为函数的参数

```C
void swap1(int \*a, int \*b){
        int temp = \*a;
        \*a = \*b;
        \*b = temp;
}
void swap2(int &a, int &b){
        int temp = a;
        a = b;
        b = temp;
}
int main(){
        int a = 10
        int b = 20;
        swap1(&a,&b);//得传地址，麻烦死了
        swap2(a,b);// 直接代表引用类型！牛逼
}
```

1. 引用作为函数返回值类型

不要返回普通局部变量的引用

```C
int& getData(void){
        int num = 10; //是局部变量
        return num;
}
int main(){
        int &b = getData(); //getData()返回一个num的引用，故用&b去接收它的返回值，b就是num的别名
}
但是num是局部变量，会被释放掉，会造成空指针错误
```

返回值类型是引用类型，可以完成链式操作

```C
struct stu{
        stu& printStu(Stu &ob, int value){
                cout<<value<<" ";
                return ob;

        }
};
int  main(){
        stu ob1;
        ob1.printStu(ob1,100).printStu(ob1,200).printStu(ob1,300);
}
//调用ob1的函数返回了一个结构体类型的变量，又可以继续调用函数
```

给常量取别名，不能通过常引用 修改 内容

```C
int &a = 10; //错误，因为10 是const int
const int &a = 10;//a是10的别名，不可以修改
```

常引用 作为函数的参数：防止函数内部修改外部的值

```C
void printInt(const int &a){ // 加了const可以只读令引用梦类型
        cout<<"a = "<<a<<endl;
}
int main(){
        int num = 100;
        printInt(num);//打印100
}
```


