"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isWechat;

// 是否在微信App中
function isWechat() {
  var agent = window.navigator.userAgent.toLowerCase();
  var result = agent.match(/MicroMessenger/i);
  return result && result[0] === 'micromessenger';
}