/**
 * 异步sleep函数。用下面语句调用可让当前异步线程暂停指定的时间：
 */
 export default function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
