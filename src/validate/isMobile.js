// 手机号正则
const MOBILE_REGEXP = /^(0|86|17951)?(13[0-9]|14[5-9]|15[0-35-9]|16[5-6]|17[0-8]|18[0-9]|19[89])[0-9]{8}$/;

// 手机号验证
export default function isMobile(mobile) {
  return MOBILE_REGEXP.test(mobile);
}
