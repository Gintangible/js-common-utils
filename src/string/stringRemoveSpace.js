/**
 * 待去除的空格字符的正则表达式。
 *
 * 目前只包含ASCII空格，以及全角中文空格。
 */
const SPACE_REGEXP = /[ 　]/g;

export default function removeSpace(str) {
  return str ? str.replace(SPACE_REGEXP, '') : '';
}
