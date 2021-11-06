# electron-umi
#### author:rasir
渲染端（ `renderer` ）采用 `umijs` `ts` 框架
`yarn create @umijs/umi-app`
主程端（ `main` ）采用 `ts`
`使用 tsc 打包`
#### 开发
开发时使用 `npm run start` 命令
使用 `typescript` 的 `watch` 功能监控 `main` 文件中的文件，有修改就自动打包到 `dist/main` 中
使用 `nodemon` 监控 `dist/main` 中文件有变化时，重启 `electron`
渲染端是 `umi` 不用管热更新问题

#### 打包
使用 `cd dist && electron-forge make` 打包
先切换目录到 `dist` 再 `electron-forge make` 打包可以只将 `webpack` 打包后的文件打到应用中，否则它会把整个应用包括 `node_module` 全打包起来，当然如果要这个配置生效，`dist` 目录下面必须要有`package.json`文件。
执行命令 `npm run build` 即可
在执行 `npm run make` 的打包命令时，会先执行 `scripts` 文件夹下的 `premake.js` 这里可以将 `main` 线程中使用到的npm依赖配置到 `needLib` 数组中，这样打包的时候会先在 `dist` 文件夹中安装相关依赖，再打包会大幅度降低打包后的大小。

打包后会执行 `scripts/postmake.js` 文件，将 `dist` 下的 `out` 目录迁移到最外层。
`out` 目录中会有两个目录，其中 `make` 目录下的才是分发版本它的大小是精简过的。

#### 注意
1、`.umirc` 配置 `outputPath:renderer,publicPath:"./",history:{type:hash}` 
2、前端路由必须使用hash模式