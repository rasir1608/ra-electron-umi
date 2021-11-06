fs = require('fs');
path = require('path');
const { copyDir, clearDir } = require('./tools');
const destDir = path.join(__dirname, '..', 'out');
const srcDir = path.join(__dirname, '..', 'dist', 'out');

// 其次拷贝源头 out 目录下的所有文件，并删除源文件
copyDir(srcDir, destDir);
clearDir(srcDir);
