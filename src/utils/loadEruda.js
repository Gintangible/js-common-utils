// 点击 n 次显示 eruda 日志
export default function loadEruda(count = 10, element) {
  let clickCount = 0
  const ele = element || document;
  ele.addEventListener('click', function () {
    clickCount++;
    if (clickCount === count) {
      const script = document.createElement('script');
      script.src = "//cdn.jsdelivr.net/npm/eruda";
      document.body.appendChild(script);
      script.onload = function () {
        eruda.init()
      }
    }
  })
};