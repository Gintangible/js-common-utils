/**
 * 对字符串进行URL编码，遵循 RFC 3986 的严格标准。
 */
export default function encode(str) {
  return encodeURIComponent(str)
    .replace(/[!'()*]/g, (x) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);
}
