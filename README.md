# electron-umi
#### author:rasir
渲染端（renderer）采用 umijs ts框架
`yarn create @umijs/umi-app`
主程端（main）采用 ts
`使用 tsc 打包`
#### 开发
开发时使用 `npm run start` 命令
使用 `typescript` 的 `watch` 功能监控 `main` 文件中的文件，有修改就自动打包到 `dist/main` 中
使用 `nodemon` 监控 `dist/main` 中文件有变化时，重启 `electron`
渲染端是 `umi` 不用管热更新问题

#### 打包
使用 `electron-forge` 打包
执行命令 `npm run build` 即可
#### 注意
1、`.umirc` 配置 `outputPath:renderer,publicPath:"./",history:{type:hash}` 
2、前端路由必须使用hash模式