"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = emptyFieldsToNull;

var _kindOf = _interopRequireDefault(require("kind-of"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function emptyFieldsToNull(obj) {
  var type = (0, _kindOf["default"])(obj);

  switch (type) {
    case 'undefined':
    case 'null':
      return obj;

    case 'string':
      return obj === '' ? null : obj;
    // 递归终止点

    case 'boolean':
    case 'number':
    case 'bigint':
    case 'symbol':
    case 'function':
    case 'generatorfunction':
    case 'generator':
    case 'error':
    case 'regexp':
    case 'buffer':
    case 'promise':
    case 'date':
    case 'int8array':
    case 'uint8array':
    case 'uint8clampedarray':
    case 'int16array':
    case 'uint16array':
    case 'int32array':
    case 'uint32array':
    case 'float32array':
    case 'float64array':
    case 'mapiterator':
    case 'setiterator':
    case 'stringiterator':
    case 'arrayiterator':
      return obj;
    // 递归终止点

    case 'array':
      return obj.map(function (e) {
        return emptyFieldsToNull(e);
      });
    // 递归处理每个元素

    case 'map':
    case 'weakmap':
      {
        var result = new Map();

        var _iterator = _createForOfIteratorHelper(obj.keys()),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var key = _step.value;
            var value = obj.get(key);
            var newValue = emptyFieldsToNull(value); // 递归处理每个元素

            result.set(key, newValue);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return result;
      }

    case 'set':
    case 'weakset':
      {
        var _result = new Set();

        var _iterator2 = _createForOfIteratorHelper(obj.values()),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _value = _step2.value;

            var _newValue = emptyFieldsToNull(_value); // 递归处理每个元素


            _result.add(_newValue);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return _result;
      }

    case 'object':
    default:
      {
        var _result2 = new obj.constructor(); // 创建同类型对象，注意不能用Object.create()


        Object.keys(obj).forEach(function (key) {
          _result2[key] = emptyFieldsToNull(obj[key]); // 递归处理每个属性
        });
        return _result2;
      }
  }
}