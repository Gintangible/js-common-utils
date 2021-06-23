import queryString from 'query-string';
import getSearch from './get-search';

/**
 * 获取当前地址的query string
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://xx.xxx.cn/#/login?params=xxx
 *
 * @param {in} name
 *     参数名称
 * @param {in} url
 *     字符串或URL对象，可选参数。表示待解析的URL地址。若无此参数则使用 window.location.href。
 * @return
 *     URL地址中的query string所包含的指定名称的参数值。若不存在则返回null.
 * @author gintangible
 */
export default function getSearchParam(name, url) {
  const search = getSearch(url);
  const args = queryString.parse(search);
  return args[name] ? args[name] : null;
}
