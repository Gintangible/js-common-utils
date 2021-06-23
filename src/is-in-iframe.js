/**
 * 是否在 iframe中
 * @return
 *     若处于iframe中，返回{@code true}；否则返回{@code false}。
 * @author gintangible
 */

export default function isInIframe() {
    return window.self !== window.top;
};