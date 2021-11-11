import dayjs from 'dayjs';
import translateConsoleArguments from '../impl/translateConsoleArguments';

// 日期时间格式。
const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * 日志类
 *
 * @author gintangible
 */
class Logger {
  constructor() {
    this.log = this._log;
    this.debug = this._debug;
    this.info = this._info;
    this.warn = this._warn;
    this.error = this._error;
  }

  _log(level, msg, args) {
    const parameters = translateConsoleArguments(msg, args);
    const timestamp = dayjs().format(TIMESTAMP_FORMAT);
    const output = this._getOutput(level);
    output(`[${level}] ${timestamp}`, ...parameters);
  }

  // 获取指定日志级别对应的 console 的输出函数
  _getOutput(level) {
    switch(level) {
      case 'DEBUG':
        return console.debug;
      case 'INFO':
        return console.info;
      case 'WARN':
        return console.warn;
      case 'ERROR':
        return console.error;
      default:
        return () => {};
    }
  }

  _debug(msg, ...args) {
    this._log('DEBUG', msg, args);
  }

  _info(msg, ...args) {
    this._log('INFO', msg, args);
  }

  _warn(msg, ...args) {
    this._log('WARN', msg, args);
  }

  _error(msg, ...args) {
    this._log('ERROR', msg, args);
  }
}

const logger = new Logger();

export {
  Logger,
  logger as default,
}