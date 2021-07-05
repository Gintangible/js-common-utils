"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = removeSearchParam;

var _queryString = _interopRequireDefault(require("query-string"));

var _getSearch = _interopRequireDefault(require("./get-search"));

var _getHash = _interopRequireDefault(require("./get-hash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 在当前地址的query string中删除一个参数
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://xx.xxx.cn/#/login?params=xxx
 *
 * @param {in} name
 *     待删除的参数名称
 * @param {in} url
 *     字符串或URL对象，可选参数。表示待解析的URL地址。若无此参数则使用 window.location.href。
 * @return
 *     删除了指定参数的新的链接地址，并且被正确正则化。
 * @author gintangible
 */
function removeSearchParam(name, url) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    url = new URL(url);
  }

  var base = url.origin + url.pathname;
  var hash = (0, _getHash["default"])(url);
  var search = (0, _getSearch["default"])(url);

  if (search !== null && search.length > 0) {
    var args = _queryString["default"].parse(search);

    if (args[name] !== undefined) {
      delete args[name];
      search = _queryString["default"].stringify(args);
    }
  }

  return base + (search === null ? '' : "?".concat(search)) + (hash === null ? '' : "#".concat(hash));
}