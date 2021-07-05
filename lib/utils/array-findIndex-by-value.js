"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = arrayFindIndexByValue;

/**
 * 根据 value 获取到数组对象中的 key 对应的下标
 * key 默认为 'key'
 */
function arrayFindIndexByValue(array, value) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'key';

  if (!Array.isArray(array)) {
    console.error("".concat(array, " is not an array"));
    return;
  }

  return array.findIndex(function (item) {
    return item[key] === value;
  });
}