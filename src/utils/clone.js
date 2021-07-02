export default function clone(obj, hash = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  let tempobj;
  const constructor = obj.constructor;
  switch (constructor) {
    case RegExp:
      tempobj = new constructor(obj);
      break;
    case Date:
      tempobj = new constructor(obj);
      break;
    case Function:
      tempobj = obj;
      break;
    default:
      tempobj = Array.isArray(obj) ? [] : {};
      hash.set(obj, tempobj);
  }
  for (const key in obj) {
    tempobj[key] = typeof obj[key] === 'object' ? clone((obj[key]), hash) : obj[key];
  }

  return tempobj;
}