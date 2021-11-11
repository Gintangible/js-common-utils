/**
 * 动态载入JavaScript脚本。
 */
export default function loadScript(src, attrs = {}, parentNode = document.head) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    for (const [k, v] of Object.entries(attrs)) {
      script.setAttribute(k, v);
    }
    script.onload = () => {
      script.onerror = null;
      script.onload = null;
      resolve(script);
    };
    script.onerror = () => {
      script.onerror = null;
      script.onload = null;
      reject(new Error(`Failed to load ${src}`));
    };
    const node = parentNode || document.getElementsByTagName('head')[0];
    node.appendChild(script);
  });
}
