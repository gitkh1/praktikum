function queryStringify(data: object) {
  return `?` + Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&');
}

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};
const DEFAULT_TIMEOUT = 5000;
type DataObject = {
  headers: object,
  data: object,
  timeout?: number,
}
const DEFAULT_DATA: DataObject = {
  headers: {},
  data: {},
  timeout: DEFAULT_TIMEOUT,
}
type requestObject = {
  headers: object,
  data: object,
  method: string,
  timeout?: number,
  retries?: number,
}

export class HTTPTransport {
  get = (url: string, options: DataObject = DEFAULT_DATA) => {
    let newUrl = url;
    newUrl += queryStringify(options.data);
    return this.request(newUrl, { headers: options.headers, method: METHODS.GET, data: {} });
  };
  put = (url: string, options: DataObject = DEFAULT_DATA) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };
  post = (url: string, options: DataObject = DEFAULT_DATA) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };
  delete = (url: string, options: DataObject = DEFAULT_DATA) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = ((url: string, options: requestObject) => {
    const { method, headers, data, timeout = DEFAULT_TIMEOUT } = options;

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

  function makeReq(): unknown {
    const req = new HTTPTransport().request(url, options);
    if (i < max) {
      i++;
      return req.catch(makeReq);
    }
    throw new Error('лимит');
  }

  return makeReq();
}
