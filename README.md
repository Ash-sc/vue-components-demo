# Vue项目模板
vue2.x项目模板，使用webpack编译，不包括Node.js服务端部分。


# 安装与使用

```
$ npm install
$ npm start
```


# 打包编译
```
$ npm run build
```


# 目录结构
```
project
│   README.md
│   package.json
│   .eslintrc
│   ...
└───build  // webpack配置
│
└───src // source文件夹，主要代码
│   │   index.html // html入口
│   │   app.js // js入口 
│   └───assets // css、font、image等
│   └───components // 公共组件
│   └───filter // 过滤器
│   └───routers // 路由
│   └───services // 数据请求
│   └───store // vuex
│   └───validate // 校验器
│   └───views // 页面模块
│
└───static // 静态资源（moment、bootstrap等）
│
```


