import clone from '../utils/clone';

// 将一维数组变成二维数组
export default function arraySplit(array, size = 3) {
  if (!Array.isArray(array)) {
    console.error(`${array} is not an array`);
    return;
  }
  let newArray = [];
  const len = Math.ceil(array.length / size);
  for (let i = 0; i < len; i++) {
    let temp = array.slice(i * n, i * n + n);
    if (typeof temp === 'object') {
      temp = clone(temp);
    }
    newArray.push(temp);
  }

  return newArray;
}
