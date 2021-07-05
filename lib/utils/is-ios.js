"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isIos;

// 判断当前是否处于iOS操作系统中。
function isIos() {
  var agent = navigator.userAgent.toLowerCase();

  if (agent.indexOf('iphone') !== -1 || agent.indexOf('ipad') !== -1) {
    return true;
  } else {
    return false;
  }
}

;