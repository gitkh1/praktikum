import isPlainObject from './isPlainObject';

type Indexed<T = unknown> = {
  [key: string]: T;
};

function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }
  if (!isPlainObject(object)) {
    return object;
  }
  const pathArr = path.split('.');
  let i = 0;
  let cursor = object as Indexed;
  while (i < pathArr.length - 1) {
    const key = pathArr[i];
    if (key in cursor) {
      cursor = cursor[key] as Indexed;
    } else {
      cursor[key] = {};
      cursor = cursor[key] as Indexed;
    }
    i++;
  }
  const key = pathArr[i];
  cursor[key] = value as Indexed;

  return object;
}

export default set;

set({ foo: 5 }, 'bar.baz', 10); // { foo: 5, bar: { baz: 10 } }
set(3, 'foo.bar', 'baz'); // 3
