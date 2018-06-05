# TaskCompetition
![](https://img.shields.io/badge/mpvue-framework-brightgreen.svg)   ![](https://img.shields.io/badge/eslint-standard-green.svg)

> 一个伙伴之间相互监督任务的轻平台

# 目录

* [项目结构图](#项目结构图)
* [开发进展](#开发进展)
* [安装](#安装)
* [体验](#体验)

## 项目结构图
```md
|── README.md
├── src
│   ├── main.js // 源代码的编译入口文件
│   ├── common // Sass目录、引入的js库（暂无）
│   ├── utils // 工具函数
│   ├── components // 组件
│   ├── api // ajax模块及后端接口
│   ├── components // 组件
│   └── pages // 页面
--- mock // mock服务

```
## 开发进展
当前为v1.0.0版

- [x] 项目搭建
- [x] 登录注册模块
- [x] 个人中心模块
- [x] 发现模块
- [x] 新建任务模块
- [x] 分享功能
- [x] 积分模块
- [x] 消息推送（v1.3.0)
- [ ] 评分互动（v1.4.0)
- [ ] 区块链（v2.0.0)

## 安装
### 克隆
```bash
$ git clone https://github.com/GeniusFunny/TaskCom.git
```
### 进入文件目录

```
$ cd TaskCom
```
### 运行

> 在微信开发者工具打开项目时，请选中项目内的`/dist`目录。因为`dist`目录里才是微信能识别的`wxml`和`wxss`。

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev

# build for production with minification
$ npm run build

# build for production and view the bundle analyzer report
$ npm run build --report
```

## 体验
![gh_86f2f6598eb3_860.jpg](https://i.loli.net/2018/06/04/5b14e6af4c572.jpg)


