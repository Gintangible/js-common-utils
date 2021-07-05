"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = arrayFindByValue;

/**
 * 根据 value 获取到数组对象中的 key 对应数组
 * key 默认为 'key'
 */
function arrayFindByValue(array, value) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'key';

  if (!Array.isArray(array)) {
    console.error("".concat(array, " is not an array"));
    return;
  }

  return array.find(function (item) {
    return item[key] === value;
  });
}