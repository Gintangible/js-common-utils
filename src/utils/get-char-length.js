/**
 * 获取字符串的字符长度。
 * @param {str} String
 *     传入的字符串
 * @param {rm} Boolean
 *     是否移除两端的空格。
 * @return
 *     返回字符串的字符长度。
 * @author gintangible
 */

export default function getCharLength(str, rm = true) {
    let string = String(str);

    if (rm) {
        string.trim();
    }
    return string.split('')
        .map(s => s.charCodeAt())
        .map(n => (n < 0 || n > 255) ? 'aa' : 'a') // 中文占两字符, 其他一字符
        .join('')
        .length;
};