/**
 * 根据 value 获取到数组对象中的 key 对应数组
 * key 默认为 'key'
 */
export default function arrayFindByValue(array, value, key = 'key') {
  if (!Array.isArray(array)) {
    console.error(`${array} is not an array`);
    return;
  }
  return array.find((item) => item[key] === value);
}
