"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Logger = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _translateConsoleArguments = _interopRequireDefault(require("./impl/translate-console-arguments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// 日期时间格式。
var TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';
/**
 * 日志类
 *
 * @author gintangible
 */

var Logger = /*#__PURE__*/function () {
  function Logger() {
    _classCallCheck(this, Logger);

    this.log = this._log;
    this.debug = this._debug;
    this.info = this._info;
    this.warn = this._warn;
    this.error = this._error;
  }

  _createClass(Logger, [{
    key: "_log",
    value: function _log(level, msg, args) {
      var parameters = (0, _translateConsoleArguments["default"])(msg, args);
      var timestamp = (0, _dayjs["default"])().format(TIMESTAMP_FORMAT);

      var output = this._getOutput(level);

      output.apply(void 0, ["[".concat(level, "] ").concat(timestamp)].concat(_toConsumableArray(parameters)));
    } // 获取指定日志级别对应的 console 的输出函数

  }, {
    key: "_getOutput",
    value: function _getOutput(level) {
      switch (level) {
        case 'DEBUG':
          return console.debug;

        case 'INFO':
          return console.info;

        case 'WARN':
          return console.warn;

        case 'ERROR':
          return console.error;

        default:
          return function () {};
      }
    }
  }, {
    key: "_debug",
    value: function _debug(msg) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this._log('DEBUG', msg, args);
    }
  }, {
    key: "_info",
    value: function _info(msg) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      this._log('INFO', msg, args);
    }
  }, {
    key: "_warn",
    value: function _warn(msg) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      this._log('WARN', msg, args);
    }
  }, {
    key: "_error",
    value: function _error(msg) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      this._log('ERROR', msg, args);
    }
  }]);

  return Logger;
}();

exports.Logger = Logger;
var logger = new Logger();
exports["default"] = logger;