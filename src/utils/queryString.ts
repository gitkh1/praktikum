import isPlainObject from './isPlainObject';
import { PlainObject } from './isPlainObject';

type StringIndexed = Record<string, unknown>;

const obj: StringIndexed = {
  key: 1,
  key2: 'test',
  key3: false,
  key4: true,
  key5: [1, 2, 3],
  key6: { a: 1 },
  key7: { b: { d: 2 } },
};

function queryStringify(data: StringIndexed): string | never {
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

const obj1 = { a: [1, 2, 3], c: 2 };
queryStringify(obj1);

export default queryStringify;

queryStringify(obj); // 'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2'
