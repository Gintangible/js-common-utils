"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _logger = _interopRequireDefault(require("./logger"));

var _urlUtils = require("./url-utils");

var _redirectAsync = _interopRequireDefault(require("./redirect-async"));

var _loadScript = _interopRequireDefault(require("./load-script"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * TalkingData 的 H5 SDK 的 URL。
 */
var SDK_URL = 'https://jic.talkingdata.com/app/h5/v1';
/**
 * 封装了 TalkingData 应用跟踪的 API 函数。
 *
 * @author gintangible
 */

var TalkingData = /*#__PURE__*/function () {
  function TalkingData() {
    _classCallCheck(this, TalkingData);

    this.source = ''; // 记录当前渠道代码
  }
  /**
   * 初始化 TalkingData 的SDK.
   *
   * @param {Object} options
   *     配置参数对象，必须包含以下属性：default_source，表示应用默认的渠道编码；
   *     app_name，表示应用名称；app_version，表示应用版本号；talking_data_app_id，
   *     表示TalkingData的APP ID；
   */


  _createClass(TalkingData, [{
    key: "init",
    value: function init(options) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _logger["default"].info('Initializing the TalkingData SDK ...');

        var args = (0, _urlUtils.getParsedSearch)();

        if (!args.source) {
          var url = (0, _urlUtils.addSearchParams)({
            source: options.default_source,
            td_channelid: options.default_source
          });
          (0, _redirectAsync["default"])(url, 0).then(function () {
            return resolve(null);
          });
        } else if (!args.td_channelid) {
          var _url = (0, _urlUtils.addSearchParams)({
            td_channelid: args.source
          });

          (0, _redirectAsync["default"])(_url, 0).then(function () {
            return resolve(null);
          });
        } else {
          _this.source = args.source; //  记录渠道代码

          var _url2 = "".concat(SDK_URL, "?appid=").concat(options.talking_data_app_id, "&vn=").concat(options.app_name, "&vc=").concat(options.app_version);

          _logger["default"].info('Loading Talking Data SDK script: {0}', _url2);

          (0, _loadScript["default"])(_url2).then(function (script) {
            _logger["default"].info('Successfully loading the Talking Data SDK script.');

            resolve(script);
          })["catch"](function (error) {
            _logger["default"].error('Failed to load the Talking Data SDK script: {0}', error);

            reject(error);
          });
        }
      });
    }
    /**
     * 触发 Talking Data 应用使用统计跟踪事件。
     *
     * 尽量不要直接调用此函数，推荐使用{@link enter}和{@link perform}函数。
     *
     * @param {String} event
     *    事件名称。
     * @param {String} label
     */

  }, {
    key: "trace",
    value: function trace(event, label) {
      if (window.TDAPP) {
        if (label) {
          _logger["default"].info("[TalkingData] ".concat(event, " - ").concat(label));

          window.TDAPP.onEvent(event, label);
        } else {
          _logger["default"].info("[TalkingData] ".concat(event));

          window.TDAPP.onEvent(event);
        }
      } else if (label) {
        _logger["default"].error("[TalkingData] ".concat(event, " - ").concat(label, ": TalkingData SKD was not loaded."));
      } else {
        _logger["default"].error("[TalkingData] ".concat(event, ": TalkingData SKD was not loaded."));
      }
    }
    /**
     * 进入一个页面时，触发 Talking Data 应用使用统计跟踪事件。
     *
     * @param {String} page
     *     进入的页面的名称。
     * @param {String} source
     *     可选，指定的渠道代码；如果不提供此参数，则使用初始化时从URL中获取的渠道码。
     */

  }, {
    key: "enter",
    value: function enter(page, source) {
      this.trace("".concat(page, "\u2014\u2014\u8FDB\u5165"), source || this.source);
    }
    /**
     * 在某个页面上进行某种操作时，触发 Talking Data 应用使用统计跟踪事件。
     *
     * @param {String} page
     *     页面的名称。
     * @param {String} action
     *     操作的名称。
     * @param {String} source
     *     可选，指定的渠道代码；如果不提供此参数，则使用初始化时从URL中获取的渠道码。
     */

  }, {
    key: "perform",
    value: function perform(page, action, source) {
      this.trace("".concat(page, "\u2014\u2014\u64CD\u4F5C\u2014\u2014").concat(action), source || this.source);
    }
  }]);

  return TalkingData;
}();

var talkingData = new TalkingData();
var _default = talkingData;
exports["default"] = _default;