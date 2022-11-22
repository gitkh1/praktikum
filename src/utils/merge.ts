import isPlainObject from './isPlainObject';

export type Indexed<T = unknown> = {
  [key: string]: T;
};

export function mergeDeep(target: Indexed, source: Indexed): Indexed {
  if (isPlainObject(target) && isPlainObject(source)) {
    for (const key in source) {
      if (isPlainObject(source[key])) {
        if (!target[key]) target[key] = {};
        mergeDeep(target[key] as Indexed, source[key] as Indexed);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  function mergeDeep(target: Indexed, ...sources: Indexed[]): Indexed {
    if (!sources.length) return target;
    const source = sources.shift();
    if (isPlainObject(target) && isPlainObject(source)) {
      for (const key in source) {
        if (isPlainObject(source[key])) {
          if (!target[key])
            Object.assign(target, {
              [key]: {},
            });
          mergeDeep(target[key] as Indexed, source[key] as Indexed);
        } else {
          Object.assign(target, {
            [key]: source[key],
          });
        }
      }
    }
    return mergeDeep(target, ...sources);
  }

  return mergeDeep({}, lhs, rhs);
}

export default merge;
