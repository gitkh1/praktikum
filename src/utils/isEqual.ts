function isEqual(obj1: unknown, obj2: unknown): boolean {
  function getType(obj: unknown): string {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  }

  function areArraysEqual() {
    if (!(Array.isArray(obj1) && Array.isArray(obj2))) {
      return false;
    }

    if (obj1.length !== obj2.length) return false;

    for (let i = 0; i < obj1.length; i++) {
      if (!isEqual(obj1[i], obj2[i])) return false;
    }

    return true;
  }

  function areObjectsEqual() {
    type obj = {
      [key: string]: unknown;
    };
    const objA = obj1 as obj;
    const objB = obj2 as obj;

    if (Object.keys(objA).length !== Object.keys(objB).length) return false;

    for (const key in objA) {
      if (Object.prototype.hasOwnProperty.call(objA, key)) {
        if (!isEqual(objA[key], objB[key])) return false;
      }
    }

    return true;
  }

  function areFunctionsEqual() {
    const objA = obj1 as object;
    const objB = obj2 as object;
    return objA.toString() === objB.toString();
  }

  function arePrimativesEqual() {
    if (Number.isNaN(obj1) && Number.isNaN(obj2)) return true;
    return obj1 === obj2;
  }

  const type = getType(obj1);

  if (type !== getType(obj2)) return false;

  if (type === 'array') return areArraysEqual();
  if (type === 'object') return areObjectsEqual();
  if (type === 'function') return areFunctionsEqual();
  return arePrimativesEqual();
}

export default isEqual;
