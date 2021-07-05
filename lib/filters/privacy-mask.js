"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = privacyMask;

// 信息脱敏
function privacyMask(str) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$maskLength = _ref.maskLength,
      maskLength = _ref$maskLength === void 0 ? 0 : _ref$maskLength,
      _ref$mask = _ref.mask,
      mask = _ref$mask === void 0 ? '*' : _ref$mask;

  if (!str) {
    return '';
  }

  var l = str.length;

  if (l === 1) {
    return str;
  } // m - 开始显示长度，n - 结束显示的长度


  var m = Math.trunc(l / 2);
  var n = Math.trunc((l - m + 1) / 2);
  var reg = new RegExp("^(.{".concat(n, "})(.+)(.{").concat(l - m - n, "})"), 'g');
  return str.replace(reg, function (mat, s, m, e) {
    mask = mask.repeat(maskLength || m.length);
    return "".concat(s).concat(mask).concat(e);
  });
}