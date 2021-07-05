"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = removeSpace;

/**
 * 待去除的空格字符的正则表达式。
 *
 * 目前只包含ASCII空格，以及全角中文空格。
 */
var SPACE_REGEXP = /[ 　]/g;

function removeSpace(str) {
  return str ? str.replace(SPACE_REGEXP, '') : '';
}