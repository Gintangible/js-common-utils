"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = addSearchParams;

var _queryString = _interopRequireDefault(require("query-string"));

var _getSearch = _interopRequireDefault(require("./get-search"));

var _getHash = _interopRequireDefault(require("./get-hash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 在当前地址的query string中添加一个参数，注意添加的参数会被URL编码。
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://dev.njzhyl.cn/insurance/#/finish?params=xxx
 *
 * @param {Object}
 *     待添加的参数对象
 * @param {String|URL} url
 *     字符串或URL对象，可选参数。表示待解析的URL地址。若无此参数则使用 window.location.href。
 * @return
 *     添加了指定参数的新的链接地址，并且被正确正则化。
 * @author gintangible
 */
function addSearchParams(params, url) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    url = new URL(url);
  }

  var base = url.origin + url.pathname;
  var hash = (0, _getHash["default"])(url);

  if (hash == null) {
    hash = '';
  } else {
    hash = "#".concat(hash);
  }

  var kv = _queryString["default"].stringify(params);

  var search = (0, _getSearch["default"])(url);

  if (search !== null && search.length > 0) {
    search = "".concat(search, "&").concat(kv);
  } else {
    search = kv;
  }

  return "".concat(base, "?").concat(search).concat(hash);
}