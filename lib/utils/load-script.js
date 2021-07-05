"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadScript;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * 动态载入JavaScript脚本。
 *
 * @param {String} src
 *     待载入的脚本的URL。
 * @param {Object} attrs
 *     可选，需要加在新建的script标签上的属性。
 * @param {Node} parentNode
 *     可选，新建的script标签的父节点。
 * @return {Promise}
 *     一个异步执行的{@link Promise}对象。
 */
function loadScript(src) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var parentNode = arguments.length > 2 ? arguments[2] : undefined;
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.src = src;

    for (var _i = 0, _Object$entries = Object.entries(attrs); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          k = _Object$entries$_i[0],
          v = _Object$entries$_i[1];

      script.setAttribute(k, v);
    }

    script.onload = function () {
      script.onerror = null;
      script.onload = null;
      resolve(script);
    };

    script.onerror = function () {
      script.onerror = null;
      script.onload = null;
      reject(new Error("Failed to load ".concat(src)));
    };

    var node = parentNode || document.head || document.getElementsByTagName('head')[0];
    node.appendChild(script);
  });
}