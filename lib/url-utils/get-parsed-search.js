"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getParsedSearch;

var _queryString = _interopRequireDefault(require("query-string"));

var _getSearch = _interopRequireDefault(require("./get-search"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 获取当前地址的query string，并将其解析为对象返回。
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://xx.xxx.cn/#/finish?params=xxx
 *
 * @param {String|URL} url
 *     可选，表示待解析的URL地址。若无此参数则使用 window.location.href。
 * @return {Object}
 *     URL地址中的query string所解析的对象。若不存在query string参数，则返回null。
 * @author gintangible
 */
function getParsedSearch(url) {
  var search = (0, _getSearch["default"])(url);

  if (search === null) {
    return null;
  }

  return _queryString["default"].parse(search);
}