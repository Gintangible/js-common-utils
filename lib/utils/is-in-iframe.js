"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isInIframe;

/**
 * 是否在 iframe中
 * @return
 *     若处于iframe中，返回{@code true}；否则返回{@code false}。
 * @author gintangible
 */
function isInIframe() {
  return window.self !== window.top;
}

;