"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = clone;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function clone(obj) {
  var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();

  if (_typeof(obj) !== 'object' || obj === null) {
    return obj;
  }

  if (hash.has(obj)) {
    return hash.get(obj);
  }

  var tempobj;
  var constructor = obj.constructor;

  switch (constructor) {
    case RegExp:
      tempobj = new constructor(obj);
      break;

    case Date:
      tempobj = new constructor(obj);
      break;

    case Function:
      tempobj = obj;
      break;

    default:
      tempobj = Array.isArray(obj) ? [] : {};
      hash.set(obj, tempobj);
  }

  for (var key in obj) {
    tempobj[key] = _typeof(obj[key]) === 'object' ? clone(obj[key], hash) : obj[key];
  }

  return tempobj;
}