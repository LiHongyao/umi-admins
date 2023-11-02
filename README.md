# 前言

在公司做项目，如果不是toB，或者对布局排版有特殊要求的，基本上后台管理系统都是拉框架，自由发挥，保证功能实现。因为自己在做后台管理系统的时候，基本上都是用的React + Ant Design 这一套，所以为了方便后期直接复用，这里基于常见业务需求，搭了一套框架，基于Umijs + TypeScript + axios + ProCompoents 构建后台管理系统模板。

这里值得注意的是，我并没有去拉 ProCompoents 的整套模板来做二次封装（_因为全量代码太重，很多功能都用不到，显得太鸡肋_），而是基于 [Umijs](https://umijs.org/) 的Simple模板实现，并根据业务场景，安装必要的依赖。

**环境**：

- node：v18.17.1
- pnpm：v8.9.2

# 目录结构

```
umi-admins
.
├── .husky                    # git提交规范
├── .config                   # 配置文件
│   ├── config.development.ts # 开发环境
│   ├── config.production.ts  # 生产环境
│   ├── config.qa.ts          # 测试环境
│   ├── config.ts             # 统一配置
│   ├── defaultSettings.ts    # 默认配置
│	  └── routes.ts             # 路由配置
├── mock
│	  └── apis.ts               # 数据mock，前期开发时模拟后端数据结构
├── public                    # 该文件下的目录打包时将直接拷贝至根目录
├── src                       # 源码文件
│   ├── api                   # 前后端交互
│   │   ├── apiConfig         # axios 封装，请求拦截、响应拦截，统一异常处理
│   │   └── apiServer         # 业务接口定义，命名格式：apiXXX，在index.ts中统一导出
│   │   │   ├── typings.d.ts  # 统一接口TS类型定义
│   │   │   └── ....
│   ├── assets                # 静态资源
│   ├── components            # 全局组件
│   │   ├── @lgs              # 自己封装的常用组件
│   │   └── ....              # 项目内通用组件
│   ├── constants             # 全局常量定义
│   ├── hooks                 # Hooks
│   ├── models                # 状态管理
│   ├── pages                 # 业务页面
│   ├── utils                 # 工具类
│   ├── access.ts             # 权限管理
│   ├── app.tsx               # 全局配置：Layout...
│   ├── global.less           # 全局样式
│   ├── global.tsx            # 全局脚本
│   ├── .env                  # 环境变量，主要配置PORT/HOST（本地启动域名）
│   └── .env.d.ts             # 环境变量，类型定义，主要针对于 config.xxx.ts 中定义的变量做类型声明
└── ...                       # 杂项配置文件
```

# 指南

1. 克隆项目 & 下载到本地
2. 在编辑器中打开项目
3. 安装依赖
4. 在 **`configs/config.development.ts`** 文件中修改 **后台A** 的IP 地址为本机地址
5. 终端输入指令 `pnpm dev` 预览效果

# 提示

有任何问题欢迎留言，或+微信：17398888669

# 异常处理

## 1. git commit 规范

在macOS系统中，当你执行 git commit 时并不会去校验提交规范，控制台抛出如下提示：

```shell
hint: The '.husky/pre-commit' hook was ignored because it's not set as executable.
hint: You can disable this warning with `git config advice.ignoredHook false`.
hint: The '.husky/commit-msg' hook was ignored because it's not set as executable.
hint: You can disable this warning with `git config advice.ignoredHook false`.
```

解决方案 → 控制台输入如下指令：

```shell
$ chmod 777 .husky/*
```

再次提交时，将会触发git提交规范校验。
