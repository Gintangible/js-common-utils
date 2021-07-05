"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isMyNanjingApp;

// 判断当前是否处于“我的南京”App中。
function isMyNanjingApp() {
  return window.auth !== undefined;
}