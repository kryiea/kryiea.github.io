# Kryiea 博客

这是一个基于 VuePress 2.0 和 vuepress-theme-hope 主题构建的个人博客项目。

## 项目介绍

本博客使用 VuePress 2.0 构建，采用了 vuepress-theme-hope 主题，支持丰富的功能和美观的界面，部署在 GitHub Pages 上。

## 环境要求

- Node.js >= 16.0.0
- npm 或 yarn 或 pnpm

## 快速开始

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
```

### 本地开发

启动本地开发服务器：

```bash
# 使用 npm
npm run docs:dev

# 或使用 yarn
yarn docs:dev

# 或使用 pnpm
pnpm docs:dev
```

启动后，访问 `http://localhost:8080/` 即可查看博客。

如需清除缓存并启动：

```bash
npm run docs:clean-dev
```

### 构建静态文件

```bash
# 使用 npm
npm run docs:build

# 或使用 yarn
yarn docs:build

# 或使用 pnpm
pnpm docs:build
```

构建完成后，静态文件将生成在 `src/.vuepress/dist` 目录中。

## 项目结构

```
.
├── .github/workflows/    # GitHub Actions 工作流配置
├── src/                  # 源代码目录
│   ├── .vuepress/        # VuePress 配置目录
│   │   ├── config.ts     # VuePress 配置文件
│   │   ├── navbar.ts     # 导航栏配置
│   │   ├── sidebar.ts    # 侧边栏配置
│   │   ├── theme.ts      # 主题配置
│   │   └── public/       # 静态资源目录
│   ├── README.md         # 首页
│   ├── back-end/         # 后端相关文章
│   ├── front-end/        # 前端相关文章
│   └── devConfig/        # 开发配置相关文章
├── package.json          # 项目依赖配置
└── Dockerfile            # Docker 配置文件
```

## 部署方法

### GitHub Pages 部署

本项目已配置 GitHub Actions 自动部署工作流，当推送到主分支时会自动构建并部署到 GitHub Pages。

工作流配置文件位于 `.github/workflows/deploy-docs.yml`。

### 使用 Docker 部署

本项目提供了 Dockerfile，可以使用 Docker 进行构建和部署：

1. 构建 Docker 镜像：

```bash
docker build -t kryiea-blog .
```

2. 运行 Docker 容器：

```bash
docker run -d -p 8080:8080 --name kryiea-blog-container kryiea-blog
```

访问 `http://localhost:8080` 即可查看博客。

## 自定义配置

### 导航栏配置

编辑 `src/.vuepress/navbar.ts` 文件来自定义导航栏。

### 侧边栏配置

编辑 `src/.vuepress/sidebar.ts` 文件来自定义侧边栏。

### 主题配置

编辑 `src/.vuepress/theme.ts` 文件来自定义主题设置。

## 更新依赖

使用以下命令更新 VuePress 相关依赖：

```bash
npm run docs:update-package
```

## 备案信息

<a href="http://www.beian.miit.gov.cn/" target="_blank">粤ICP备2024164533号</a>

## 许可证

本项目使用 MIT 许可证。