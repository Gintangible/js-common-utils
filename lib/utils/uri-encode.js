"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = encode;

/**
 * 对字符串进行URL编码，遵循 RFC 3986 的严格标准。
 *
 * @param {String} str
 *   待编码的字符串。
 * @return {String}
 *   该字符串的URL编码结果，
 * @author gintangible
 * @see https://github.com/kevva/strict-uri-encode
 */
function encode(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (x) {
    return "%".concat(x.charCodeAt(0).toString(16).toUpperCase());
  });
}