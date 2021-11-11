import queryString from 'query-string';
import getSearch from './getSearch';
import getHash from './getHash';

/**
 * 在当前地址的query string中删除一个参数
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://xx.xxx.cn/#/login?params=xxx
 *
 */
export default function removeSearchParam(name, url) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    url = new URL(url);
  }
  const base = url.origin + url.pathname;
  const hash = getHash(url);
  let search = getSearch(url);
  if (search !== null && search.length > 0) {
    const args = queryString.parse(search);
    if (args[name] !== undefined) {
      delete args[name];
      search = queryString.stringify(args);
    }
  }
  return base
    + (search === null ? '' : `?${search}`)
    + (hash === null ? '' : `#${hash}`);
}
