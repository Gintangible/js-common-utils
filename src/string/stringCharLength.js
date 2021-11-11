/**
 * 获取字符串的字符长度。
 */

export default function stringCharLength(str, rm = true) {
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