function queryStringify(data: object) {
  return `?` + Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&');
}

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};
const defaultTimeOut = 5000;
type dataObject = {
  headers: object,
  data: object,
  timeout?: number,
}
const defaultData: dataObject = {
  headers: {},
  data: {},
  timeout: defaultTimeOut,
}
type requestObject = {
  headers: object,
  data: object,
  method: string,
  timeout?: number,
  retries?: number,
}

export class HTTPTransport {
  get = (url: string, options: dataObject = defaultData) => {
    let newUrl = url;
    newUrl += queryStringify(options.data);
    return this.request(newUrl, { headers: options.headers, method: METHODS.GET, data: {} }, options.timeout);
  };
  put = (url: string, options: dataObject = defaultData) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };
  post = (url: string, options: dataObject = defaultData) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };
  delete = (url: string, options: dataObject = defaultData) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = ((url: string, options: requestObject, timeout = defaultTimeOut) => {
    const { method, headers, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      if (headers) {
        const [key, value] = Object.entries(headers)[0];
        xhr.setRequestHeader(key, value);
      }
      xhr.timeout = timeout;

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  });
}

export function fetchWithRetry(url: string, options: requestObject) {
  const max = options.retries || 1;
  let i = 0;

  function makeReq():unknown {
    const req = new HTTPTransport().request(url, options);
    if (i < max) {
      i++;
      return req.catch(makeReq);
    }
    throw new Error('лимит');
  }

  return makeReq();
}
