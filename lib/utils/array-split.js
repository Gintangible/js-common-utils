"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = arraySplit;

var _clone = _interopRequireDefault(require("./clone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// 将一维数组变成二维数组
function arraySplit(array) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

  if (!Array.isArray(array)) {
    console.error("".concat(array, " is not an array"));
    return;
  }

  var newArray = [];
  var len = Math.ceil(array.length / size);

  for (var i = 0; i < len; i++) {
    var temp = array.slice(i * n, i * n + n);

    if (_typeof(temp) === 'object') {
      temp = (0, _clone["default"])(temp);
    }

    newArray.push(temp);
  }

  return newArray;
}