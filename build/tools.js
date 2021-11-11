const fs = require('fs');
const { cloneFile } = require('./utils');

/**
 * 对import进行处理，
 * 将import aaa from '../string/aaa'，
 * 转换成 import aaa from './aaa'
 */
function refactorImport(inPath, outPath) {
  var code = fs.readFileSync(inPath, 'utf8')
  var regex = /from \'\.\.\/.+\'/g;

  var result = regex.exec(code);
  var match = [];
  while (result != null) {
    match.push(result[0])
    result = regex.exec(code);
  }

  if (match.length < 1) {
    cloneFile(inPath, outPath);
    return;
  }

  for (var i = 0; i < match.length; i++) {
    var ss = match[i];
    var p = ss.lastIndexOf('/');
    code = code.replace(new RegExp(ss), "from '." + ss.slice(p));
  }

  fs.writeFile(outPath, code, function (err) {
    if (err) {
      console.log(err);
    }
  });

}

module.exports = {
  refactorImport,
}
