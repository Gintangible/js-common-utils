const path = require('path');
const fs = require('fs');
const { createEmptyDir } = require('./utils.js');

const rootPath = path.resolve(__dirname, '../');
const fromPath = rootPath + '/tmp';
const toPath = rootPath + '/lib';

createEmptyDir(toPath);

// 以下代码的作用：将tmp下面的源码，拷贝到/lib 目录
const folderList = fs.readdirSync(path.resolve(rootPath, 'tmp'));

folderList.forEach((file, i) => {
  fs.stat(path.resolve(fromPath, file), function (err, stat) {
    console.log(` ${i} ${"\033[32m"} ${file} ${"\033[39m"}`);
    // cloneFile(path.resolve(fromPath, file), path.resolve(toPath, file));
    fs.copyFileSync(`${fromPath}/${file}`, `${toPath}/${file}`);
  })
})

// 用gxw-util.esm.js 生成index.js
// cloneFile(path.resolve(fromPath, 'guxw-util.esm.js'), path.resolve(toPath, 'index.js'));
fs.copyFileSync(`${fromPath}/guxw-util.esm.js`, `${toPath}/index.js`);