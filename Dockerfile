# 第一步：使用官方的 Node.js 运行时作为基础镜像
FROM node:22-alpine

# 第二步：在容器中设置工作目录
WORKDIR /usr/src/app

# 第三步：将 package.json 和 package-lock.json 复制到工作目录
COPY package.json package-lock.json ./

# 第四步：安装项目依赖
RUN npm install

# 第五步：将应用程序代码复制到容器中
COPY . .

# 第六步：构建 VuePress 项目以生成静态文件
RUN npm run docs:build

# 第七步：安装一个简单的 HTTP 服务器来提供静态文件服务
RUN npm install -g http-server

# 第八步：暴露应用程序运行的端口
EXPOSE 8080

# 第九步：定义运行应用程序的命令
CMD ["http-server", "src/.vuepress/dist"]
