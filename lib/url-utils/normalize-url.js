"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = normalizeUrl;

var _getSearch = _interopRequireDefault(require("./get-search"));

var _getHash = _interopRequireDefault(require("./get-hash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 重构指定的URL为标准形式。
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://dev.njzhyl.cn/insurance/#/finish?params=xxx
 *
 * @param {String|URL} url
 *     字符串或URL对象，可选参数。表示待解析的URL地址。若无此参数则使用
 *     window.location.href。
 * @return {String}
 *     加上了参数的新的链接地址。
 */
function normalizeUrl(url) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    url = new URL(url);
  }

  var base = url.origin + url.pathname;
  var search = (0, _getSearch["default"])(url);
  var hash = (0, _getHash["default"])(url);
  return base + (search === null ? '' : "?".concat(search)) + (hash === null ? '' : "#".concat(hash));
}