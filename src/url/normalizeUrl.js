import getSearch from './getSearch';
import getHash from './getHash';

/**
 * 重构指定的URL为标准形式。
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://dev.njzhyl.cn/insurance/#/finish?params=xxx
 *
 */
export default function normalizeUrl(url) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    url = new URL(url);
  }
  const base = url.origin + url.pathname;
  const search = getSearch(url);
  const hash = getHash(url);
  return base + (search === null ? '' : `?${search}`) + (hash === null ? '' : `#${hash}`);
}
