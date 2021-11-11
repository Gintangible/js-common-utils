/**
 * 判断当前是否处于“我的南京”App中。
 */
export default function isMyNanjingApp() {
  return window.auth !== undefined;
}