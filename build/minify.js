const { minify } = require("terser");
const path = require('path');
const fs = require('fs');
const rootPath = path.resolve(__dirname, '../');
const mainPath = rootPath + '/tmp';
const minifyFiles = ['index', 'index.fe'];
// const minifyFiles = fs.readdirSync(path.resolve(rootPath, mainPath));

console.log(`minify mainPath: ${mainPath}`);

async function minifyFn(file) {
  console.log(`${"\033[32m"}| -- minify ${"\033[35m"} ${file} ${"\033[39m"}`);
  const filename = `${file}.js`;
  let code = {};

  code[file] = fs.readFileSync(path.resolve(mainPath, filename), "utf8")
  const RESULT = await minify(code, {
    sourceMap: {
      url: file + ".min.js.map"
    }
  });
  // 导出压缩文件
  fs.writeFile(path.resolve(mainPath, `${file}.min.js`), RESULT.code, function(err) {
    if (err) {
      console.log(err);
    }
  });
  // 导出map文件
  fs.writeFile(path.resolve(mainPath, `${file}.min.js`), RESULT.map, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

minifyFiles.forEach(file => {
  minifyFn(file);
});
