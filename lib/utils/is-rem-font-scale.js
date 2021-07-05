"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isRemFontScale;

//  判断rem页面的字体是否被系统字体大小改变
function isRemFontScale() {
  var element = document.documentElement;
  var computedFontSize = window.getComputedStyle(element, null).getPropertyValue('font-size');
  var htmlFontSize = element.style.fontSize;

  if (!htmlFontSize) {
    return false;
  }

  return computedFontSize !== htmlFontSize;
}