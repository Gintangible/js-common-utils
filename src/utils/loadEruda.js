// 点击 n 次显示 eruda 日志
export default function loadEruda(count = 10, ele = document) {
  let clickCount = 0;
  ele.addEventListener('click', () => {
    clickCount++;
    if (clickCount === count) {
      const script = document.createElement('script');
      script.src = '//cdn.jsdelivr.net/npm/eruda';
      document.body.appendChild(script);
      script.onload = () => {
        /* eslint-disable */
        eruda.init();
        /* eslint-enable */
      };
    }
  });
}
