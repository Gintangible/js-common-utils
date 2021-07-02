/**
 * 将指定的字符串转化为标准形式。
 *
 * @param {String} str
 *     待转换的字符串，可以是undefined或null，或非字符串对象。
 * @return {String}
 *     对于非字符串的，返回''
 * @author gintangible
 */
export default function stringTrimUppercase(str) {
  return typeof str !== 'string' ? '' : str.trim().toUpperCase();
}
