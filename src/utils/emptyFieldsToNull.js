import kindOf from 'kind-of';

export default function emptyFieldsToNull(obj) {
  const type = kindOf(obj);
  switch (type) {
    case 'undefined':
    case 'null':
      return obj;
    case 'string':
      return (obj === '' ? null : obj);               // 递归终止点
    case 'boolean':
    case 'number':
    case 'bigint':
    case 'symbol':
    case 'function':
    case 'generatorfunction':
    case 'generator':
    case 'error':
    case 'regexp':
    case 'buffer':
    case 'promise':
    case 'date':
    case 'int8array':
    case 'uint8array':
    case 'uint8clampedarray':
    case 'int16array':
    case 'uint16array':
    case 'int32array':
    case 'uint32array':
    case 'float32array':
    case 'float64array':
    case 'mapiterator':
    case 'setiterator':
    case 'stringiterator':
    case 'arrayiterator':
      return obj;                                     // 递归终止点
    case 'array':
      return obj.map((e) => emptyFieldsToNull(e));      // 递归处理每个元素
    case 'map':
    case 'weakmap': {
      const result = new Map();
      for (const key of obj.keys()) {
        const value = obj.get(key);
        const newValue = emptyFieldsToNull(value);      // 递归处理每个元素
        result.set(key, newValue);
      }
      return result;
    }
    case 'set':
    case 'weakset': {
      const result = new Set();
      for (const value of obj.values()) {
        const newValue = emptyFieldsToNull(value);      // 递归处理每个元素
        result.add(newValue);
      }
      return result;
    }
    case 'object':
    default: {
      const result = new obj.constructor();             // 创建同类型对象，注意不能用Object.create()
      Object.keys(obj).forEach((key) => {
        result[key] = emptyFieldsToNull(obj[key]);      // 递归处理每个属性
      });
      return result;
    }
  }
}
