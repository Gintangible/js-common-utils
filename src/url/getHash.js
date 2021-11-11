/**
 * 获取当前地址的hash.
 *
 * 因为Vue.js的地址都是hash形式做路由，所以可能存在形如下面的hash和search组合：
 * http://xx.xxx.cn/#/login?params=xxx
 */
export default function getHash(url) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    url = new URL(url);
  }
  let { hash } = url;
  if (hash.length === 0) {
    const { href } = url;
    if (href.length > 0 && href.charAt(href.length - 1) === '#') {
      return '';
    }
    return null;
  }
  // 去除开头的 #
  hash = hash.substring(1);
  // 去除hash中的?后面的query string参数
  const pos = hash.indexOf('?');
  if (pos >= 0) {
    hash = hash.substring(0, pos);
  }
  return hash;
}
