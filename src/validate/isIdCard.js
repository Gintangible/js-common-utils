const IDCARD_REGEXP = /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

/**
 * 身份证正则
 */
export default function isIdCard(idCard) {
  return IDCARD_REGEXP.test(idCard);
}
