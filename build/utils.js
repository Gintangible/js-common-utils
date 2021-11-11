const fs = require('fs')

function cloneFile(src, dst) {
  const rs = fs.createReadStream(src);
  const ws = fs.createWriteStream(dst);
  rs.on('data', (chunk) => {
    if (ws.write(chunk) === false) { //ws.write()  判断数据流是否已经写入目标了
      rs.pause();
    }
  });
  rs.on('end', () => {
    ws.end();
  });
  ws.on('drain', () => {
    rs.resume(); //从新启动读取数据流
  });
}

// 清空目录（如果没有目录，则创建）
function createEmptyDir(path) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path);
    files.forEach((file) => {
      const curPath = path + "/" + file;
      if (!fs.statSync(curPath).isDirectory()) {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    console.log("clear tmp success.");
  } else {
    fs.mkdirSync(path);
    console.log("create tmp dir success.");
  }
};

module.exports = {
  cloneFile,
  createEmptyDir,
};
