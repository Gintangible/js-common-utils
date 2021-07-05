"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = dateFormat;

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function dateFormat(dateTime) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';

  if (!dateTime) {
    return '';
  }

  return (0, _dayjs["default"])(dateTime).format(type);
}