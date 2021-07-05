"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fixScroll;

var _isIos = _interopRequireDefault(require("./is-ios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 修复在iOS下的页面切换滚动定位问题。
 */
function fixScroll() {
  if ((0, _isIos["default"])()) {
    setTimeout(function () {
      window.scrollTo(0, document.body.scrollTop + 1);

      if (document.body.scrollTop >= 1) {
        window.scrollTo(0, document.body.scrollTop - 1);
      }
    }, 50);
  }
}