"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cloneVue;

var _buildinPrototype = require("./impl/buildin-prototype");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * 将源对象的属性复制到目标对象。
 *
 * 注意，为了支持Vue.js对对象的响应式监控，我们只能复制对象的enumerable属性，并且
 * 不考虑对象的getter/setter，而是直接把源对象的属性值取出来（可能是调用了源对象
 * 对应属性的getter），递归地深度克隆后复制到目标对象中（可能是调用了目标对象对
 * 应属性的setter）。因此参数options的includeAccessor和
 * includeNonEnumerable应该不设置或者设置为false.
 *
 * 关于Vue.js的响应式原理，请参见：https://cn.vuejs.org/v2/guide/reactivity.html
 *
 * @param {Object} source
 *     源对象。
 * @param {Object} result
 *     目标对象。
 * @param {Object} options
 *     克隆算法的参数。
 * @param {Map} cache
 *     对象缓存，用于防止出现循环引用对象。
 */
function mirror(source, result, options, cache) {
  var keys = Reflect.ownKeys(source);

  var _iterator = _createForOfIteratorHelper(keys),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      var descriptor = Object.getOwnPropertyDescriptor(source, key);

      if (!descriptor.configurable) {
        continue; // ignore non-configurable properties, such as string[0]
      }

      if (!options.includeNonEnumerable && !descriptor.enumerable) {
        continue; // ignore non-enumerable properties
      }

      if (descriptor.writable !== undefined && !descriptor.writable) {
        continue; // ignore readonly properties, FIXME: shall we ignore it？
      }

      if (options.includeAccessor && (descriptor.get || descriptor.set)) {
        Object.defineProperty(result, key, descriptor);
        continue;
      } // use [] to get property value instead of descriptor.value, since if
      // the property has getter/setter, descriptor.value do not exist, and
      // use [] will invoke the getter, which is just what we want.


      var value = source[key];
      var clonedValue = cloneImpl(value, options, cache); // eslint-disable-line no-use-before-define

      result[key] = clonedValue;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
/**
 * Clone函数的具体实现。
 *
 * @param {Object} source
 *     待克隆的对象。
 * @param {Object} options
 *     克隆算法的参数。
 * @param {Map} cache
 *     对象缓存，用于防止出现循环引用对象。
 */


function cloneImpl(source, options, cache) {
  // Return primitive and Function values directly
  if (_typeof(source) !== 'object' || source === null) {
    return source;
  } // return early on cache hit


  if (cache.has(source)) {
    return cache.get(source);
  }

  var prototype = Object.getPrototypeOf(source);

  switch (prototype) {
    default:
      {
        // Likely a user-defined type
        var result = Object.create(prototype);
        cache.set(source, result);
        mirror(source, result, options, cache);
        return result;
      }
    // Some types must be handled specially
    // (For instance if they have any internal slots)
    // I've taken this list from the list of well-known intrinsic objects:
    //   https://tc39.es/ecma262/#sec-well-known-intrinsic-objects
    // This may be overkill, but it will probably most needed cases

    case Array.prototype:
      {
        var _result = [];
        cache.set(source, _result);
        var keys = Reflect.ownKeys(source); // We'll assume the array is well-behaved (dense and not monkeypatched)
        // If that turns out to be false, we'll fallback to generic code

        wellBehaved: {
          // eslint-disable-line no-labels
          var i;

          for (i = 0; i < source.length; i++) {
            if (i in source) {
              _result.push(cloneImpl(source[i], options, cache));
            } else {
              // Array is sparse
              break wellBehaved; // eslint-disable-line no-labels
            }
          }

          if (i !== keys.length - 1) {
            // Array is monkeypatched
            break wellBehaved; // eslint-disable-line no-labels
          }

          return _result;
        } // Generic fallback


        _result.length = 0;
        mirror(source, _result, options, cache);
        return _result;
      }

    case Boolean.prototype:
      {
        // We must get the primitive value of a Boolean object, since if
        // it is monkey patched, directly convertion by new Boolean(source)
        // will always get a true value. For example,
        //
        // const b = new Boolean(false);
        // b.monkeypatched = 'hello';
        // const c = new Boolean(b);
        // consloe.log(c); // c will always be true
        //
        var _result2 = new Boolean(source.valueOf());

        mirror(source, _result2, options, cache);
        return _result2;
      }

    case Date.prototype:
      {
        var _result3 = new Date(source.getFullYear(), source.getMonth(), source.getDate(), source.getHours(), source.getMinutes(), source.getSeconds(), source.getMilliseconds());

        mirror(source, _result3, options, cache);
        return _result3;
      }

    case _buildinPrototype.MapPrototype:
      {
        var _result4 = new Map(); // eslint-disable-line no-undef


        cache.set(source, _result4);
        mirror(source, _result4, options, cache);

        var _iterator2 = _createForOfIteratorHelper(source.entries()),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _step2$value = _slicedToArray(_step2.value, 2),
                key = _step2$value[0],
                val = _step2$value[1];

            _result4.set(cloneImpl(key, options, cache), cloneImpl(val, options, cache));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return _result4;
      }

    case Number.prototype:
      {
        var _result5 = new Number(source);

        mirror(source, _result5, options, cache);
        return _result5;
      }

    case Object.prototype:
      {
        var _result6 = {};
        cache.set(source, _result6);
        mirror(source, _result6, options, cache);
        return _result6;
      }

    case null:
      {
        var _result7 = Object.create(null);

        cache.set(source, _result7);
        mirror(source, _result7, options, cache);
        return _result7;
      }

    case _buildinPrototype.PromisePrototype:
      {
        var _result8 = new Promise(source.then.bind(source)); // eslint-disable-line no-undef


        mirror(source, _result8, options, cache);
        return _result8;
      }

    case RegExp.prototype:
      {
        var _result9 = new RegExp(source);

        mirror(source, _result9, options, cache);
        return _result9;
      }

    case _buildinPrototype.SetPrototype:
      {
        var _result10 = new Set(); // eslint-disable-line no-undef


        cache.set(source, _result10);
        mirror(source, _result10, options, cache);

        var _iterator3 = _createForOfIteratorHelper(source),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _val = _step3.value;

            _result10.add(cloneImpl(_val, options, cache));
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        return _result10;
      }

    case String.prototype:
      {
        var _result11 = new String(source);

        mirror(source, _result11, options, cache);
        return _result11;
      }

    case _buildinPrototype.WeakMapPrototype:
      {
        // WeakMaps cannot be cloned :(
        return source;
      }

    case _buildinPrototype.WeakSetPrototype:
      {
        // WeakSets cannot be cloned :(
        return source;
      }

    case Function.prototype:
      {
        // Functions cannot be cloned :(
        return source;
      }

    case _buildinPrototype.BigIntPrototype:
      {
        return new BigInt(source); // eslint-disable-line no-undef
      }

    case _buildinPrototype.ArrayBufferPrototype:
      {
        var _result12 = source.slice();

        mirror(source, _result12, options, cache);
        return _result12;
      }

    case _buildinPrototype.SharedArrayBufferPrototype:
      {
        var _result13 = source.slice();

        mirror(source, _result13, options, cache);
        return _result13;
      }

    case _buildinPrototype.DataViewPrototype:
      {
        var buffer = cloneImpl(source.buffer, options, cache);

        var _result14 = new DataView(buffer, source.byteOffset, source.byteLength); // eslint-disable-line no-undef


        mirror(source, _result14, options, cache);
        return _result14;
      }

    case _buildinPrototype.BigInt64ArrayPrototype:
      {
        var _result15 = new BigInt64Array(source); // eslint-disable-line no-undef


        mirror(source, _result15, options, cache);
        return _result15;
      }

    case _buildinPrototype.BigUint64ArrayPrototype:
      {
        var _result16 = new BigUint64Array(source); // eslint-disable-line no-undef


        mirror(source, _result16, options, cache);
        return _result16;
      }

    case _buildinPrototype.Float32ArrayPrototype:
      {
        var _result17 = new Float32Array(source); // eslint-disable-line no-undef


        mirror(source, _result17, options, cache);
        return _result17;
      }

    case _buildinPrototype.Float64ArrayPrototype:
      {
        var _result18 = new Float64Array(source); // eslint-disable-line no-undef


        mirror(source, _result18, options, cache);
        return _result18;
      }

    case _buildinPrototype.Int8ArrayPrototype:
      {
        var _result19 = new Int8Array(source); // eslint-disable-line no-undef


        mirror(source, _result19, options, cache);
        return _result19;
      }

    case _buildinPrototype.Int16ArrayPrototype:
      {
        var _result20 = new Int16Array(source); // eslint-disable-line no-undef


        mirror(source, _result20, options, cache);
        return _result20;
      }

    case _buildinPrototype.Int32ArrayPrototype:
      {
        var _result21 = new Int32Array(source); // eslint-disable-line no-undef


        mirror(source, _result21, options, cache);
        return _result21;
      }

    case _buildinPrototype.Uint8ArrayPrototype:
      {
        var _result22 = new Uint8Array(source); // eslint-disable-line no-undef


        mirror(source, _result22, options, cache);
        return _result22;
      }

    case _buildinPrototype.Uint8ClampedArrayPrototype:
      {
        var _result23 = new Uint8ClampedArray(source); // eslint-disable-line no-undef


        mirror(source, _result23, options, cache);
        return _result23;
      }

    case _buildinPrototype.Uint16ArrayPrototype:
      {
        var _result24 = new Uint16Array(source); // eslint-disable-line no-undef


        mirror(source, _result24, options, cache);
        return _result24;
      }

    case _buildinPrototype.Uint32ArrayPrototype:
      {
        var _result25 = new Uint32Array(source); // eslint-disable-line no-undef


        mirror(source, _result25, options, cache);
        return _result25;
      }
    // == ERRORS == //

    case Error.prototype:
      {
        var _result26 = new Error(source.message, source.fileName, source.lineNumber);

        mirror(source, _result26, options, cache);
        return _result26;
      }

    case EvalError.prototype:
      {
        var _result27 = new EvalError(source.message, source.fileName, source.lineNumber);

        mirror(source, _result27, options, cache);
        return _result27;
      }

    case RangeError.prototype:
      {
        var _result28 = new RangeError(source.message, source.fileName, source.lineNumber);

        mirror(source, _result28, options, cache);
        return _result28;
      }

    case ReferenceError.prototype:
      {
        var _result29 = new ReferenceError(source.message, source.fileName, source.lineNumber);

        mirror(source, _result29, options, cache);
        return _result29;
      }

    case SyntaxError.prototype:
      {
        var _result30 = new SyntaxError(source.message, source.fileName, source.lineNumber);

        mirror(source, _result30, options, cache);
        return _result30;
      }

    case TypeError.prototype:
      {
        var _result31 = new TypeError(source.message, source.fileName, source.lineNumber);

        mirror(source, _result31, options, cache);
        return _result31;
      }

    case URIError.prototype:
      {
        var _result32 = new URIError(source.message, source.fileName, source.lineNumber);

        mirror(source, _result32, options, cache);
        return _result32;
      }
  }
}
/**
 * 深度克隆一个值或对象。
 *
 * 注意，为了支持Vue.js对对象的响应式监控，我们只复制对象的enumerable属性，并且
 * 不考虑对象的getter/setter，而是直接把源对象的属性值取出来（可能是调用了源对象
 * 对应属性的getter），递归地深度克隆后复制到目标对象中（可能是调用了目标对象对
 * 应属性的setter）。
 *
 * @param {any} source
 *     待克隆的值或对象。
 * @param {Object} options
 *     可选，克隆算法的参数。默认值为空对象。目前可选的参数有：
 *     includeAccessor - 此参数为true表示克隆对象属性的Accessor(即getter和
 *     setter)，默认值为false；
 *     includeNonEnumerable - 此参数为true表示克隆对象的non-enumerable属性，默认
 *     值为false；
 * @return {any}
 *     指定的值或对象的深度克隆。
 */


function cloneVue(source) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // We want to preserve correct structure in objects with tricky references,
  // e.g. cyclic structures or structures with two references to the same object.
  // To do this, we'll cache the results of this function during this invokation,
  // and return from this cache when possible.
  // Note that we only store certiain values, like Arrays or plain object
  var cache = new WeakMap();
  return cloneImpl(source, options, cache);
}