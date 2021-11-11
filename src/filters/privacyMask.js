// 信息脱敏
export default function privacyMask(str, { maskLength = 0, mask = '*' } = {}) {
  if (!str) {
    return '';
  }
  const l = str.length;
  if (l === 1) {
    return str;
  }
  // m - 开始显示长度，n - 结束显示的长度
  const m = Math.trunc(l / 2);
  const n = Math.trunc((l - m + 1) / 2);

  const reg = new RegExp(`^(.{${n}})(.+)(.{${l - m - n}})`, 'g');
  return str.replace(reg, (mat, s, m, e) => {
    mask = mask.repeat(maskLength || m.length);
    return `${s}${mask}${e}`;
  });
}
