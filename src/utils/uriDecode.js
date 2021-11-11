/**
 * 对URL编码字符串进行解码。
 */
export default function decode(str) {
  // 服务端+ 被解释空格
  return decodeURIComponent(str.replace(/\+/g, ' '));
}
