"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isUndefinedOrNull;

/**
 * 判定某个值是否是undefined或null.
 */
function isUndefinedOrNull(value) {
  return value === undefined || value === null;
}