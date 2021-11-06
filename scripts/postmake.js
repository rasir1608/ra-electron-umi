fs = require('fs');
path = require('path');
const destDir = path.join(__dirname, '..', 'out');
const srcDir = path.join(__dirname, '..', 'dist', 'out');
// 删除目录
function clearDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  fs.rmSync(dirPath, { recursive: true, force: true });
}
// 拷贝并删除源文件
function copyDir(srcPath, destPath) {
  if (!fs.existsSync(srcPath)) return;
  if (fs.statSync(srcPath).isDirectory()) {
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath);
    }
    const fileNames = fs.readdirSync(srcPath);
    if (Array.isArray(fileNames) && fileNames.length > 0) {
      fileNames.forEach((file) =>
        copyDir(path.join(srcPath, file), path.join(destPath, file)),
      );
    }
  } else {
    fs.copyFileSync(srcPath, destPath);
  }
}

// 其次拷贝源头 out 目录下的所有文件，并删除源文件
copyDir(srcDir, destDir);
clearDir(srcDir);
