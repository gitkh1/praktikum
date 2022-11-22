import PlainObject from '../types/PlainObject';
import isPlainObject from './isPlainObject';

function queryStringify(data: PlainObject): string | never {
  const values: string[] = [];

  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  } else {
    dispatchStringify(data, '');
  }

  function pushValue(key: string, value: string): void {
    values.push(`${key}=${value}`);
  }

  function arrayStringify(arr: Array<unknown>, substr: string): void {
    arr.forEach((elem, index) => {
      const str = `${substr}[${index}]`;
      dispatchStringify(elem, str);
    });
  }

  function objectStringify(data: PlainObject, substr: string): void {
    Object.keys(data).forEach((key) => {
      let str = '';
      if (substr === '') {
        str = `${key}`;
      } else {
        str = `${substr}[${key}]`;
      }
      dispatchStringify(data[key], str);
    });
  }

  function dispatchStringify(data: unknown, substr: string): void {
    if (Array.isArray(data)) {
      arrayStringify(data, substr);
    } else if (
      Object.prototype.toString.call(data).slice(8, -1).toLowerCase() ===
      'object'
    ) {
      objectStringify(data as PlainObject, substr);
    } else {
      pushValue(substr, `${data}`);
    }
  }

  return values.join('&');
}

export default queryStringify;
