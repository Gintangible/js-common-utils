/**
 * 获取当前地址的query string
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://dev.njzhyl.cn/insurance/#/finish?params=xxx
 *
 */
export default function getSearch(url) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    url = new URL(url);
  }
  const { search } = url;
  let result = null;
  if (search) {
    // 去除开头的 ?
    result = search.substring(1);
  }
  // 从 hash 中获取参数
  const { hash } = url;
  const pos = hash.indexOf('?');
  if (pos > -1) {
    result = (result ? `${result}&` : '') + hash.substring(pos + 1);
  }
  return result;
}
