import PlainObject from '../types/PlainObject';
import isPlainObject from './isPlainObject';

function set(
  object: PlainObject | unknown,
  path: string,
  value: unknown
): PlainObject | unknown {
  if (typeof path !== 'string') {
    console.log('path must be string');
  }
  if (!isPlainObject(object)) {
    return object;
  }
  const pathArr = path.split('.');
  let i = 0;
  let cursor = object as PlainObject;
  while (i < pathArr.length - 1) {
    const key = pathArr[i];
    if (key in cursor) {
      cursor = cursor[key] as PlainObject;
    } else {
      cursor[key] = {};
      cursor = cursor[key] as PlainObject;
    }
    i++;
  }
  const key = pathArr[i];
  cursor[key] = value as PlainObject;

  return object;
}

export default set;
