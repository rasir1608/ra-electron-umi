// 拷贝并删除源文件
exports.copyDir = function copyDir(srcPath, destPath) {
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
};

// 删除目录
exports.clearDir = function clearDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  fs.rmSync(dirPath, { recursive: true, force: true });
};
