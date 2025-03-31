---
title: Go语言bcrypt加密详解
description: 详细介绍Go语言中bcrypt加密的原理、使用方法及最佳实践
date: 2024-01-01
category:
  - Go
  - 加密
tag:
  - Go
  - bcrypt
  - 密码加密
  - 安全
---

本文详细介绍Go语言中bcrypt加密的原理及实现方法。

<!-- more -->

## 1. 密码安全概述

### 1.1 攻击密码的主要方法

1. **字典攻击**：使用包含常见密码的字典尝试破解密码
2. **暴力攻击**：通过尝试所有可能的字符组合来破解密码

### 1.2 彩虹表

彩虹表是一个用于加密散列函数逆运算的预先计算好的表（就是在网上搜集的各种字符组合的Hash加密结果）。

## 2. 密码加密策略

### 2.1 加密与加盐

- **加密**：Hash加密，即使两层md5算法加密，还是可能通过彩虹表的方式破译
- **加盐**：人为的通过一组随机字符与用户原密码的组合形成一个新的字符，从而增加破译的难度

### 2.2 加盐的安全性

密码使用了盐，但没有为每个密码使用唯一的盐，那么攻击者要做的就是手动生成彩虹表，对每个组合使用盐，然后进行查找。

如果你对每个密码使用唯一的盐，则攻击者需要针对每个密码为每个组合生成一个列表再去查找。这是另外一种类型的攻击，即暴力攻击。

### 2.3 暴力破解

暴力攻击通过反复尝试猜测密码来破解密码。

### 2.4 传统加密算法的局限

MD5或SHA-1（或SHA-256，SHA-512等）是消息摘要算法，旨在快速验证给定消息是否未被篡改。

与慢速哈希（例如bcrypt，scrypt和pbkdf2）不同，MD5、SHA-x不是为密码设计的算法。

## 3. bcrypt加密原理

### 3.1 bcrypt哈希字符串的组成

bcrypt哈希由多个部分组成。这些部分用于确定创建哈希的设置，从而可以在不需要任何其他信息的情况下对其进行验证。

![bcrypt哈希组成](./images/bcrypt%20加密.001.png)

上图是一个bcrypt哈希的示例图，其由四部分组成：

- **Prefix**：说明了使用的bcrypt的版本
- **Cost**：是进行哈希的次数 - 数字越大生成bcrypt的速度越慢，成本越大。同样也意味着如果密码库被盗，攻击者想通过暴力破解的方法猜测出用户密码的成本变得越昂贵
- **Salt**：是添加到要进行哈希的字符串中的随机字符（21.25个字符），所以使用bcrypt时不需要我们在表里单独存储Salt
- **Hashed Text**：是明文字符串最终被bcrypt应用这些设置哈希后的哈希文本

如果用户使用非常简单的密码例如password或123456，另外无论什么方法：每个密码加单独的盐进行哈希，使用bcrypt进行哈希等等，还是能被猜测出来的，所以在用户设置密码时应该禁止他们输入简单的密码。

## 4. Go语言中使用bcrypt

### 4.1 bcrypt包介绍

通过`golang.org/x/crypto/bcrypt`包提供使用bcrypt函数。

bcrypt包只提供了三个函数：

- **bcrypt.CompareHashAndPassword()**：用于比对bcrypt哈希字符串和提供的密码明文文本是否匹配
- **bcrypt.GenerateFromPassword()**：以给定的Cost返回密码的bcrypt哈希。如果给定的成本小于MinCost，则将成本设置为DefaultCost（10）
- **bcrypt.Cost()**：返回用于创建给定bcrypt哈希的哈希成本。将来密码系统为了应对更大的计算能力而增加哈希成本时，该功能可以用于确定哪些密码需要更新

### 4.2 使用示例

```go
// ./handler/password_hashing.go
package handler

import (
    "fmt"
    "golang.org/x/crypto/bcrypt"
    "net/http"
)

func HashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
    return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}

func GetHashingCost(hashedPassword []byte) int {
    cost, _ := bcrypt.Cost(hashedPassword) // 为了简单忽略错误处理
    return cost
}

func PassWordHashingHandler(w http.ResponseWriter, r *http.Request) {
    password := "secret"
    hash, _ := HashPassword(password) // 为了简单忽略错误处理
    fmt.Fprintln(w, "Password:", password)
    fmt.Fprintln(w, "Hash:    ", hash)
    match := CheckPasswordHash(password, hash)
    fmt.Fprintln(w, "Match:   ", match)
    cost := GetHashingCost([]byte(hash))
    fmt.Fprintln(w, "Cost:    ", cost)
}
```

输出结果：
```text
Password: secret
Hash:     $2a$14$Ael8nW7UF/En/iI7LGdyBuaIO8VREbL2CAShRN0EUQHqtmOHXh.XK
Match:    true
Cost:     14
```


