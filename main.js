import arrayFindByValue from './src/array-find-by-value';
import arrayFindIndexByValue from './src/array-findIndex-by-value';
import arraySplit from './src/array-split';

import clone from './src/clone';
import cloneVue from './src/clone-vue';

import emptyFieldsToNull from './src/empty-fields-to-null';

import fixScroll from './src/fix-scroll';

import getCharLength from './src/get-char-length';

import logger from './src/logger';

import redirectAsync from './src/redirect-async';

import isInIframe from './src/is-in-iframe';
import isIos from './src/is-ios';
import isMyNanjingApp from './src/is-my-nanjing-app';
import isObjectEqual from './src/is-object-equal';
import isRemFontScale from './src/is-rem-font-scale';
import isUndefinedOrNull from './src/is-undefined-or-null';
import isWechat from './src/is-wechat';

import removeEmptyFields from './src/remove-empty-fields';

import sleep from './src/sleep';
import stringTrim from './src/string-trim';
import stringTrimUppercase from './src/string-trim-uppercase';
import stringUppercase from './src/string-uppercase';

import uriDecode from './src/uri-decode';
import uriEncode from './src/uri-encode';

export * as urlUtils from './src/url-utils';

export { addSearchParams, getHash, getParsedSearch, getSearchParam, getSearch, normalizeUrl, removeSearchParam } from './src/url-utils';

export {
  arrayFindByValue,
  arrayFindIndexByValue,
  arraySplit,

  clone,
  cloneVue,

  emptyFieldsToNull,

  fixScroll,

  getCharLength,

  isInIframe,
  isIos,
  isMyNanjingApp,
  isObjectEqual,
  isRemFontScale,
  isUndefinedOrNull,
  isWechat,

  logger,

  redirectAsync,

  removeEmptyFields,

  sleep,
  stringTrimUppercase,
  stringTrim,
  stringUppercase,

  uriDecode,
  uriEncode,
};
