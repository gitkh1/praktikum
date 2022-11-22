import Data from '../types/Data';
import queryStringify from './queryString';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const HEADERS = [
  ['Content-Type', 'application/json'],
  ['Access-Control-Allow-Origin', '*'],
  [
    'Content-Security-Policy',
    'default-src https: unsafe-eval unsafe-inline; object-src none',
  ],
];

const HOST_URL = 'https://ya-praktikum.tech/api/v2';
export const HOST_RESOURCES = HOST_URL + '/resources';

const DEFAULT_TIMEOUT = 5000;

type CRUDMethod = (extraUrl: string, data: Data) => Promise<unknown>;

export default class HTTPTransport {
  private url: string;
  constructor(url: string) {
    this.url = HOST_URL + url;
  }

  get: CRUDMethod = (extraUrl, data) => {
    const newUrl = this.url + extraUrl + queryStringify(data);
    return this.request(newUrl, METHODS.GET, {});
  };

  put: CRUDMethod = (extraUrl, data) => {
    return this.request(this.url + extraUrl, METHODS.PUT, data);
  };

  post: CRUDMethod = (extraUrl, data) => {
    return this.request(this.url + extraUrl, METHODS.POST, data);
  };

  delete: CRUDMethod = (extraUrl, data) => {
    return this.request(this.url + extraUrl, METHODS.DELETE, data);
  };

  putFile = (extraUrl: string, data: FormData) => {
    return this.requestFile(this.url + extraUrl, METHODS.PUT, data);
  };

  request = (url: string, method: string, data: Data) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      HEADERS.forEach((header) => {
        const [key, value] = header;
        xhr.setRequestHeader(key, value);
      });
      xhr.withCredentials = true;
      xhr.timeout = DEFAULT_TIMEOUT;

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
  };

  requestFile = (url: string, method: string, data: FormData) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.withCredentials = true;
      xhr.timeout = DEFAULT_TIMEOUT;

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.send(data);
    });
  };
}
