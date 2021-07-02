import arrayFindByValue from './utils/array-find-by-value';
import arrayFindIndexByValue from './utils/array-findIndex-by-value';
import arraySplit from './utils/array-split';

import clone from './utils/clone';
import cloneVue from './utils/clone-vue';

import emptyFieldsToNull from './utils/empty-fields-to-null';

import fixScroll from './utils/fix-scroll';

import getCharLength from './utils/get-char-length';

import logger from './utils/logger';

import redirectAsync from './utils/redirect-async';

import isInIframe from './utils/is-in-iframe';
import isIos from './utils/is-ios';
import isMyNanjingApp from './utils/is-my-nanjing-app';
import isObjectEqual from './utils/is-object-equal';
import isRemFontScale from './utils/is-rem-font-scale';
import isUndefinedOrNull from './utils/is-undefined-or-null';
import isWechat from './utils/is-wechat';

import removeEmptyFields from './utils/remove-empty-fields';

import sleep from './utils/sleep';
import stringTrim from './utils/string-trim';
import stringTrimUppercase from './utils/string-trim-uppercase';
import stringUppercase from './utils/string-uppercase';

import uriDecode from './utils/uri-decode';
import uriEncode from './utils/uri-encode';

export * as urlUtils from './url-utils';

export { addSearchParams, getHash, getParsedSearch, getSearchParam, getSearch, normalizeUrl, removeSearchParam } from './url-utils';

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
