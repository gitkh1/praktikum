import isPlainObject from './isPlainObject';

type Indexed<T = unknown> = {
  [key: string]: T;
};

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

merge({ a: { b: { a: 2 } }, d: 5 }, { a: { b: { c: 1 } } });
/*
{
	a: {
		b: {
			a: 2,
			c: 1,
		}
	},
	d: 5,
}
*/
