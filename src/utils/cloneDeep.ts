function cloneDeep<T extends object = object>(obj: T) {
  type cloneType =
    | T
    | Date
    | Set<unknown>
    | Map<unknown, unknown>
    | object
    | T[];
  function _cloneDeep(item: T): cloneType {
    if (item === null || typeof item !== 'object') {
      return item;
    }

    if (item instanceof Date) {
      return new Date(item.valueOf());
    }

    if (item instanceof Array) {
      return item.map(_cloneDeep);
    }

    if (item instanceof Set) {
      const copy = new Set();
      item.forEach((elem) => copy.add(_cloneDeep(elem)));
      return copy;
    }

    if (item instanceof Map) {
      const copy = new Map();
      item.forEach((value, key) => copy.set(key, _cloneDeep(value)));
      return copy;
    }

    if (item instanceof Object) {
      type objType = {
        [index: string | symbol]: unknown;
      };
      const copy: objType = {};
      const itemCopy = item as objType;
      Object.getOwnPropertySymbols(item).forEach(
        (s) => (copy[s] = _cloneDeep(itemCopy[s] as T))
      );
      Object.keys(item).forEach(
        (k) => (copy[k] = _cloneDeep(itemCopy[k] as T))
      );
      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  }

  return _cloneDeep(obj);
}

export default cloneDeep;

const objects = [1, 2, { a: null }];
const deep = cloneDeep(objects);

console.log(deep === objects); // => false
console.log(deep);
