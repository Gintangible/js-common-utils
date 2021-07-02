/**
 * 对URL编码字符串进行解码。
 *
 * @param {String} str
 *   待解码的URL编码字符串。
 * @return {String}
 *   解码结果。
 * @author gintangible
 */
export default function decode(str) {
  // 服务端+ 被解释空格
  return decodeURIComponent(str.replace(/\+/g, ' '));
}
