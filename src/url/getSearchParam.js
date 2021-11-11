import queryString from 'query-string';
import getSearch from './getSearch';

/**
 * 获取当前地址的query string
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://xx.xxx.cn/#/login?params=xxx
 *
 */
export default function getSearchParam(name, url) {
  const search = getSearch(url);
  const args = queryString.parse(search);
  return args[name] ? args[name] : null;
}
