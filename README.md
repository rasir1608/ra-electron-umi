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


#### 更改程序桌面图标
在package.json的 config.forge.packagerConfig 中添加 icon 属性，路径最后图标不要写后缀。因为打包程序会自己根据环境来选择文件后缀。比如打 mac 程序的包就会使用 .icns 图标；打 windows 程序，就会选.ico图标。

#### icns 图标生成方法
*  准备最大尺寸 1024x1024 图片一张，重命名为icon.png
*  通过鼠标右键或者命令，创建一个名为icons.iconset的文件夹
*  通过”终端“来快速创建各种不同尺寸要求的图片文件
```
sips -z 16 16 icon.png -o icons.iconset/icon_16x16.png
sips -z 32 32 icon.png -o icons.iconset/icon_16x16@2x.png
sips -z 32 32 icon.png -o icons.iconset/icon_32x32.png
sips -z 64 64 icon.png -o icons.iconset/icon_32x32@2x.png
sips -z 128 128 icon.png -o icons.iconset/icon_128x128.png
sips -z 256 256 icon.png -o icons.iconset/icon_128x128@2x.png
sips -z 256 256 icon.png -o icons.iconset/icon_256x256.png
sips -z 512 512 icon.png -o icons.iconset/icon_256x256@2x.png
sips -z 512 512 icon.png -o icons.iconset/icon_512x512.png
sips -z 1024 1024 icon.png -o icons.iconset/icon_512x512@2x.png
```
* ”终端“中运行下面的命令，就可以获得名为icon.icns的图标文件了
`iconutil -c icns icons.iconset -o icon.icns`
注意：icon.png图片文件和icons.iconset文件夹要保存在同一级目录下，”终端“启动后切换到相同目录。另外，icons.iconset 目录名称 可以是 xxxx.iconset，但是目录中生成的图片必须是上文中的名称，不能变更。生成的 icon.icns 图标也可以进行重命名
