const fs = require('fs');
const path = require('path');
const rootPath = path.resolve(__dirname, '../');
const toPath = rootPath + '/lib';
const COPY_FILES = ['README.md'];
const npmMain = ['main'];

// 将pkg.json、readem等npm包需要的信息 导入到lib中
function pkgExport() {
  const pkg = fs.readFileSync(`${rootPath}/package.json`).toString('utf-8');
  const pkgObj = JSON.parse(pkg);
  pkgObj.scripts = {};
  pkgObj.devDependencies = {};
  npmMain.forEach((m) => {
    if (pkgObj[m].startsWith('lib/')) {
      pkgObj[m] = pkgObj[m].slice(4);
    }
  })
  fs.writeFileSync(`${toPath}/package.json`, Buffer.from(JSON.stringify(pkgObj, null, 2), 'utf-8'));
}

function fileExport() {
  COPY_FILES.forEach((file) => {
    fs.copyFileSync(`${rootPath}/${file}`, `${toPath}/${file}`);
  })
}

function npmExport() {
  pkgExport();
  fileExport();
}

npmExport();