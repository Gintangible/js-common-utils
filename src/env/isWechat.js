/**
 * 是否在微信App中
 */
export default function isWechat() {
  const agent = window.navigator.userAgent.toLowerCase();
  const result = agent.match(/MicroMessenger/i);
  return result && (result[0] === 'micromessenger');
}
