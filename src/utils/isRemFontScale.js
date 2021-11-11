/**
 * 判断rem页面的字体是否被系统字体大小改变
 */
export default function isRemFontScale() {
  const element = document.documentElement;
  const computedFontSize = window.getComputedStyle(element, null).getPropertyValue('font-size');
  const htmlFontSize = element.style.fontSize;

  if (!htmlFontSize) {
    return false;
  }

  return computedFontSize !== htmlFontSize;
}
