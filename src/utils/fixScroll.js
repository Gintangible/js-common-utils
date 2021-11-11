import isIos from '../env/isIos';

/**
 * 修复在iOS下的页面切换滚动定位问题。
 */
export default function fixScroll() {
  if (isIos()) {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollTop + 1);
      if (document.body.scrollTop >= 1) {
        window.scrollTo(0, document.body.scrollTop - 1);
      }
    }, 50);
  }
}
