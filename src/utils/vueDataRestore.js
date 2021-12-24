function toArray(vueArray) {
  const array = [];
  for (let index in vueArray) {
    const item = vueDataRestore(vueArray[index]);
    array.push(item);
  }
  return array;
}

function toObject(vueObject) {
  const obj = new Object();

  for (let index in vueObject) {
    const item = vueDataRestore(vueObject[index]);
    obj[index] = item;
  }

  return obj;
}

export default function vueDataRestore(vueObject) {
  let result = null;
  const type = Object.prototype.toString.call(vueObject);

  switch (type) {
    case '[object Array]':
      result = toArray(vueObject);
      break;
    case '[object Object]':
      result = toObject(vueObject);
      break;
    default:
      result = vueObject;
      break;
  }

  return result;
};
