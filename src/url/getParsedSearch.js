import queryString from 'query-string';
import getSearch from './getSearch';

/**
 * 获取当前地址的query string，并将其解析为对象返回。
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://xx.xxx.cn/#/finish?params=xxx
 *
 */
export default function getParsedSearch(url) {
  const search = getSearch(url);
  if (search === null) {
    return null;
  }
  return queryString.parse(search);
}
