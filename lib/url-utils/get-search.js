"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getSearch;

/**
 * 获取当前地址的query string
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://dev.njzhyl.cn/insurance/#/finish?params=xxx
 *
 * @param {in} url
 *     字符串或URL对象，可选参数。表示待解析的URL地址。若无此参数则使用 window.location.href。
 * @return
 *     URL地址中的query string，不包含?，也不解析其中的参数，也不对URL编码的参数
 *     进行解码。若不存在query string参数，则返回null.
 * @author gintangible
 */
function getSearch(url) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    url = new URL(url);
  }

  var search = url.search;
  var result = null;

  if (search) {
    // 去除开头的 ?
    result = search.substring(1);
  } // 从 hash 中获取参数


  var hash = url.hash;
  var pos = hash.indexOf('?');

  if (pos > -1) {
    result = (result ? "".concat(result, "&") : '') + hash.substring(pos + 1);
  }

  return result;
}