"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = removeEmptyFields;

var _kindOf = _interopRequireDefault(require("kind-of"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * 根据某个对象，创建一个新的对象，但将其所有为空字符串，或为null的属性值全部移除
 *
 * @param {any} obj
 *    待转换的对象或值。
 * @return {any}
 *    若obj为undefined，返回undefined；
 *    若obj为null，返回undefined；
 *    若obj为字符串，对于空字符串返回undefined，对于其他返回obj；
 *    若obj为数字、布尔，或符号，返回obj；
 *    若obj为{@link Array}, {@link Set}, 或{@link Map}，则返回obj的浅拷贝；
 *    否则，返回obj的一份拷贝，但将其所有为空字符串的属性值全部修改为undefined。
 * @author gintangible
 */
function removeEmptyFields(obj) {
  var type = (0, _kindOf["default"])(obj);

  switch (type) {
    case 'undefined':
    case 'null':
      return undefined;

    case 'string':
      return obj === '' ? undefined : obj;
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
      {
        var result = [];

        var _iterator = _createForOfIteratorHelper(obj),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var value = _step.value;
            var newValue = removeEmptyFields(value); // 递归处理每个元素

            if (newValue !== undefined) {
              result.push(newValue);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return result;
      }

    case 'map':
    case 'weakmap':
      {
        var _result = new Map();

        var _iterator2 = _createForOfIteratorHelper(obj.keys()),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var key = _step2.value;

            var _value = obj.get(key);

            var _newValue = removeEmptyFields(_value); // 递归处理每个元素


            if (_newValue !== undefined) {
              _result.set(key, _newValue);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return _result;
      }

    case 'set':
    case 'weakset':
      {
        var _result2 = new Set();

        var _iterator3 = _createForOfIteratorHelper(obj.values()),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _value2 = _step3.value;

            var _newValue2 = removeEmptyFields(_value2); // 递归处理每个元素


            if (_newValue2 !== undefined) {
              _result2.add(_newValue2);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        return _result2;
      }

    case 'object':
    default:
      {
        var _result3 = new obj.constructor(); // 创建同类型对象，注意不能用Object.create()


        Object.keys(obj).forEach(function (key) {
          var value = removeEmptyFields(obj[key]); // 递归处理每个属性

          if (value !== undefined) {
            _result3[key] = value;
          } else {
            delete _result3[key];
          }
        });
        return _result3;
      }
  }
}