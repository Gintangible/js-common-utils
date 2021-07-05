"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = decode;

/**
 * 对URL编码字符串进行解码。
 *
 * @param {String} str
 *   待解码的URL编码字符串。
 * @return {String}
 *   解码结果。
 * @author gintangible
 */
function decode(str) {
  // 服务端+ 被解释空格
  return decodeURIComponent(str.replace(/\+/g, ' '));
}