fs = require('fs');
path = require('path');
const destPath = path.join(__dirname, '..', 'dist', 'package.json');
const npmrcPath = path.join(__dirname, '..', 'dist', '.npmrc');
const srcPath = path.join(__dirname, '..', 'package.json');
const {
  name,
  version,
  description,
  config,
  devDependencies = {},
  dependencies = {},
} = require(srcPath);

const needLibs = ['electron'];
const devLib = {};
const dep = { ...devDependencies, ...dependencies };
needLibs.forEach((key) => {
  if (dep[key]) devLib[key] = dep[key];
});

const outPutPkg = {
  main: './main/index.js',
  name,
  version,
  description,
  config,
  devDependencies: devLib,
};

fs.writeFileSync(destPath, JSON.stringify(outPutPkg, null, ' '));

const npmrc = `
disturl=https://npm.taobao.org/dist
electron_mirror=https://npm.taobao.org/mirrors/electron/
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
registry=https://registry.npm.taobao.org
`;

fs.writeFileSync(npmrcPath, npmrc);

// 删除目录
function clearDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  fs.rmSync(dirPath, { recursive: true, force: true });
}
// 首先删除目标 out 目录下的所有文件
const destDir = path.join(__dirname, '..', 'out');
clearDir(destDir);
