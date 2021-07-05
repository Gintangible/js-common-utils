"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = redirectAsync;
var DEFAULT_TIMEOUT = 300;
/**
 * 跳转至指定的URL
 *
 * @param {String} url
 *     待跳转至的URL
 * @param {Number} timeout
 *     可选参数，表示跳转延时，单位为毫秒。如未指定则使用配置中的默认延时。
 */

function redirectAsync(url, timeout) {
  // 为了让页面上的 Toaster 消息正确显示出来，不能立即跳转，而应该等待一小段时间
  return new Promise(function (resolve) {
    setTimeout(function () {
      window.location.href = url;
      resolve(url);
    }, timeout === undefined ? DEFAULT_TIMEOUT : timeout);
  });
}