/**
 * 根据 value 获取到数组中对应的下标
 *
 * @param {Array} array
 *   待遍历的数组
 * @param { String | Number} value
 *   需要查找的值
 * @param { String | Number } key
 *   数组是对象时，需要匹配的 key
 * @return 
 *   如果有返回对应的下标，反之，返回-1
 */
export default function getIndexByValue(array, value, key) {
  let i = array.length;
  while (i--) {
    const curAry = !key ? array[i] : array[i][key];
    if (curAry === value) {
        return i;
    }
  }
  return -1;
}
