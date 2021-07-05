"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isObjectEqual;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// 判断两个对象是否一样
function isObjectEqual() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!a || !b) {
    return a === b;
  }

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key]; // check nested equality

    if (_typeof(aVal) === 'object' && _typeof(bVal) === 'object') {
      return isObjectEqual(aVal, bVal);
    }

    return String(aVal) === String(bVal);
  });
}