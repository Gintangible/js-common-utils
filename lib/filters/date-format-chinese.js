"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = dateFormatChinese;

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DATETIME_FORMAT_SECOND = 'YYYY年M月D日H点m分s秒';
var DATETIME_FORMAT_MINUTE = 'YYYY年M月D日H点m分';
var DATETIME_FORMAT_HOUR = 'YYYY年M月D日H点';

function dateFormatChinese(dateTime) {
  if (!dateTime) {
    return '';
  }

  var time = (0, _dayjs["default"])(dateTime);
  var farmatType = DATETIME_FORMAT_HOUR;

  if (time.second() !== 0) {
    farmatType = DATETIME_FORMAT_SECOND;
  } else if (time.minute() !== 0) {
    farmatType = DATETIME_FORMAT_MINUTE;
  }

  return time.format(farmatType);
}