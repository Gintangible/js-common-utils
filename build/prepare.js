const path = require('path');
const fs = require('fs');
const os = require('os');
const { cloneFile, createEmptyDir } = require('./utils');
const { refactorImport } = require('./tools');
const ignoreExportFiles = ['buildinPrototype', 'translateConsoleArguments'];

const rootPath = path.resolve(__dirname, '../');
const fromPath = rootPath + '/src';
const toPath = rootPath + '/tmp';
console.log(`rootPath: ${rootPath}`);

// 先清空目录
createEmptyDir(toPath);

// 将src下面的源码，拷贝到/tmp目录，
// index.esm.js
const mainFileName = 'index.esm.js';
const mainEsm = fs.createWriteStream(path.resolve(toPath, mainFileName));
const fileNames = [];

let folderList = fs.readdirSync(path.resolve(rootPath, 'src'));

console.log(`read folderList = ${"\033[32m"} ${folderList} ${"\033[39m"}`);

folderList.forEach((folder, i) => {
  const folderPath = path.resolve(fromPath, folder);
  const statsObj = fs.statSync(folderPath);

  if (statsObj && statsObj.isDirectory()) {
    const subFolder = fs.readdirSync(folderPath);

    subFolder.forEach((file) => {
      const suffixIndex = file.lastIndexOf('.js');
      if ([-1, 0].includes(suffixIndex)) {
        console.log(`${folderPath} 文件夹内 ${file} 文件不是 js 文件`);
        return;
      }
      const filename = file.substring(0, suffixIndex);
      // 文件是否已存在
      if (fileNames.includes(filename)) {
        console.error(`file ${filename} is already exsit`)
      }
      // 忽视文件
      if (ignoreExportFiles.includes(filename)) {
        return;
      }
      fileNames.push(filename)
      mainEsm.write(`import ${filename} from './${filename}.js';${os.EOL}`);
    })
  }

  fs.stat(folderPath, (err, stat) => {
    if (stat && stat.isDirectory()) {
      console.log(`| ${i} ${"\033[36m"} ${folder} ${"\033[39m"}`);
      const subFolder = fs.readdirSync(path.resolve(fromPath, folderPath));
      const subFilenames = [];

      subFolder.forEach((file, j) => {
        console.log(`${"\033[32m"}|  ----  ${j} ${"\033[35m"} ${file} ${"\033[39m"}`);

        const suffixIndex = file.lastIndexOf('.js');
        if ([-1, 0].includes(suffixIndex)) {
          console.log(`${file} 文件不是 js 文件`);
          return;
        }
        const filename = file.substring(0, suffixIndex);
        subFilenames.push(filename);

        // 对 子目录文件里的 import 进行处理，并复制到 tmp 目录中
        refactorImport(path.resolve(fromPath + '/' + folder, file), path.resolve(toPath, file));
      })
    } else {
      console.log(' |' + i + ' \033[32m' + folder + '\033[39m');
      cloneFile(path.resolve(fromPath, folder), path.resolve(toPath, folder));
    }
  });
})

mainEsm.write(`${os.EOL}export {
  ${fileNames.join(',\n  ')}
}${os.EOL}`);

mainEsm.end();
