"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getCharLength;

/**
 * 获取字符串的字符长度。
 * @param {str} String
 *     传入的字符串
 * @param {rm} Boolean
 *     是否移除两端的空格。
 * @return
 *     返回字符串的字符长度。
 * @author gintangible
 */
function getCharLength(str) {
  var rm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var string = String(str);

  if (rm) {
    string.trim();
  }

  return string.split('').map(function (s) {
    return s.charCodeAt();
  }).map(function (n) {
    return n < 0 || n > 255 ? 'aa' : 'a';
  }) // 中文占两字符, 其他一字符
  .join('').length;
}

;