/**
 * 跳转至指定的URL
 */
export default function redirect(url, timeout = 300) {
  // 为了让页面上的 Toaster 消息正确显示出来，不能立即跳转，而应该等待一小段时间
  return new Promise((resolve) => {
    setTimeout(() => {
      window.location.href = url;
      resolve(url);
    }, (timeout));
  });
}
