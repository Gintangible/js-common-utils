/**
 * 根据 value 获取到数组对象中的 key 对应的下标
 * key 默认为 'key'
 */
export default function arrayFindIndexByValue(array, value, key = 'key') {
  if (!Array.isArray(array)) {
    console.error(`${array} is not an array`);
    return;
  }
  return array.findIndex((item) => item[key] === value);
}
