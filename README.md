# DDBLOG框架

## 简介

本项目为 MDUI + Express + Mongodb 练习项目，实现了一个简单的博客框架。

使用了前端：MDUI（整体界面） 和 TGeditor（富文本编辑器）项目；后端：NodeJS Express框架及众多其他中间件。

功能：搜索博客，文章内容的展示，注册，评论，后台博客管理界面登录，上传文章，修改文章，查看评论，删除评论

### 实现思路

以下列举了主要使用和比较重要的模块。

**express-session**: 用于设置客户端cookie以验证登录状态和用户权限，对于不同用户只能删除自己发表的评论，只有管理员可以发表文章和操作所有评论。

**ejs**: 用于使用页面模板，以适配各种界面排布，便于每次请求时渲染页面。使用了layout，整体结构为：layout各部分放在 views 目录，各种功能页面放在 views/page 目录，管理员界面放在 views/page/admin 目录。

**mongodb**: 使用mongodb作数据库，需要运行环境已安装相应 mongodb 应用。分三个表，user, articles, reviews，分别储存用户数据，文章数据，评论数据。



## 使用方法

### 安装依赖

在主目录下运行 ` npm install` 即可自动安装所需依赖。

### 数据库配置

先使 mongodb 应用保持运行。

进入主目录。

在 models 目录的 **db-config.js**文件中配置相应数据库选项，配置完成后运行下面命令初始化数据库：

```bash
node models/db-init.js
```

控制台返回成功提示后即完成配置。

### 开始运行

在主目录运行 ` npm start` 命令以运行，然后访问 http://localhost:3000/ 即可。

### 其他配置

在 app.js 文件中修改注释提醒部分的内容以改变博客一些基本内容。



## 开源协议

本项目基于 **MIT LICENSE** 开源。 