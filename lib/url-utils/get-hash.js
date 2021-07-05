"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getHash;

/**
 * 获取当前地址的hash.
 *
 * 因为Vue.js的地址都是hash形式做路由，所以可能存在形如下面的hash和search组合：
 * http://xx.xxx.cn/#/login?params=xxx
 *
 * @param {in} url
 *     字符串或URL对象，可选参数。表示待解析的URL地址。若无此参数则使用 window.location.href。
 * @return
 *     URL地址中的hash，不包含#，也不解析其中的参数，也不对URL编码的参数进行解
 *     码。若不存在hash（即不存在#），则返回null. 注意返回的hash可能为空字符串。
 * @author gintangible
 */
function getHash(url) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    url = new URL(url);
  }

  var hash = url.hash;

  if (hash.length === 0) {
    var href = url.href;

    if (href.length > 0 && href.charAt(href.length - 1) === '#') {
      return '';
    }

    return null;
  } // 去除开头的 #


  hash = hash.substring(1); // 去除hash中的?后面的query string参数

  var pos = hash.indexOf('?');

  if (pos >= 0) {
    hash = hash.substring(0, pos);
  }

  return hash;
}