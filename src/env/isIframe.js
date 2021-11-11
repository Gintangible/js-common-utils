/**
 * 是否在 iframe中
 */
export default function isIframe() {
  return window.self !== window.top;
}
