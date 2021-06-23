/**
 * 异步sleep函数。用下面语句调用可让当前异步线程暂停指定的时间：
 *
 * @param {Number} milliseconds
 *     带休眠的时间，单位为毫秒。
 * @return {Promise}
 *     一个{@link Promise}对象，用于异步等待。
 */
 export default function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
