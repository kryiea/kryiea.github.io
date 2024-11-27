---
# 这是文章的标题
title: Vscode 插件&配置
# 你可以自定义封面图片
cover: 
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 1
# 设置作者
author: 
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

好用好看好玩的vscode插件。

<!-- more -->

## 一、Vscode 设置

- **可以在vsc的设置里面搜索，也可以直接改 settings.json**
- **settings.json**：平滑效果smooth开启后，光标异常丝滑。

```jsonc
{
  // 设置在一段延迟后自动保存文件
  "files.autoSave": "afterDelay",

  // 启用工作台列表的平滑滚动效果
  "workbench.list.smoothScrolling": true,

  // 光标移动时的平滑动画效果
  "editor.cursorSmoothCaretAnimation": "on",

  // 编辑器中的平滑滚动效果
  "editor.smoothScrolling": true,

  // 光标闪烁效果设为平滑
  "editor.cursorBlinking": "smooth",

  // 允许使用鼠标滚轮进行编辑器字体缩放
  "editor.mouseWheelZoom": true,

  // 使代码建议不会被片段补全中断
  "editor.suggest.snippetsPreventQuickSuggestions": false,
}
```

## 二、UI 类

### 1.1 主题

- **Dracula Official**：目前使用ing
  ![20240115164009](http://images.kryiea.cn/img/20240115164009.png)
- **Material Icon Theme** ：也是不错的，蛮多人用，是一个主题包，能切换多种主题
  ![20240115164021](http://images.kryiea.cn/img/20240115164021.png)
### 1.2 图标包

- **Emoji File Icons**： 好看好看好看好看
  ![20240115164028](http://images.kryiea.cn/img/20240115164028.png)
- **vscode-icons** ：官方的图标包

## 三、编程类

### 2.1 代码视觉优化

- **Indent-Rainbow**：缩进着色
  ![20240115164041](http://images.kryiea.cn/img/20240115164041.png)
- **Indent Rainbow Palettes**：搭配 Indent-Rainbow 使用
  ![20240115164047](http://images.kryiea.cn/img/20240115164047.png)

### 2.2 项目管理

- **Project Manager**：Easily switch between projects
  ![20240115164103](http://images.kryiea.cn/img/20240115164103.png)

### 2.3 开发实用

- **Todo Tree**：打标签，方便定位、备忘、备注
  ![20240115164111](http://images.kryiea.cn/img/20240115164111.png)
- **Thunder Client**：类似 postman
  ![20240115164118](http://images.kryiea.cn/img/20240115164118.png)
- **Path Intellisense**：写文件路径时，有类似语法提示的效果
  ![1705083156-Path-Intellisense](http://images.kryiea.cn/img/1705083156-Path-Intellisense.gif)

### 2.4 Git可视化

- **GitLens**：Supercharge Git in VS Code
  ![20240115164229](http://images.kryiea.cn/img/20240115164229.png)

## 四、AI 类

- **百度**： [Comate](https://marketplace.visualstudio.com/items?itemName=BaiduComate.comate) 
- **GitHub**：[Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

Comate：响应速度快，现在可以免费用，官方申请。（目前首选，体验蛮好还）
Copilot：比Comate处理能力强，学生认证可免费使用。

## 五、没啥用But安装了类

- **vscode-pets**：电子宠物
  ![20240115164242](http://images.kryiea.cn/img/20240115164242.png)
- **CodeSnap**：代码选择截图，带个框好看点
  ![20240115164247](http://images.kryiea.cn/img/20240115164247.png)