import qs from 'query-string';
import getSearch from './getSearch';
import getHash from './getHash';

/**
 * 在当前地址的query string中添加一个参数，注意添加的参数会被URL编码。
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://dev.njzhyl.cn/insurance/#/finish?params=xxx
 */
export default function addSearchParams(params, url) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    url = new URL(url);
  }
  const base = url.origin + url.pathname;
  let hash = getHash(url);
  if (hash == null) {
    hash = '';
  } else {
    hash = `#${hash}`;
  }
  const kv = qs.stringify(params);
  let search = getSearch(url);
  if (search !== null && search.length > 0) {
    search = `${search}&${kv}`;
  } else {
    search = kv;
  }
  return `${base}?${search}${hash}`;
}
