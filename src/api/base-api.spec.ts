import chai from 'chai';
import chaiDom from 'chai-dom';

import PlainObject from '../types/PlainObject';
import ServerResponse from '../types/ServerResponse';
import HTTPTransport from '../utils/HTTPTransport';
import BaseAPI from './base-api';

chai.should();
chai.use(chaiDom);

const TestTransport = new HTTPTransport('/fake');

class TestAPI extends BaseAPI {
  async testGet(data: PlainObject) {
    const response = await TestTransport.get('/', data);
    return this.processResponse(response as ServerResponse);
  }
  async testPost(data: PlainObject) {
    const response = await TestTransport.post('/', data);
    return this.processResponse(response as ServerResponse);
  }
  async testPut(data: PlainObject) {
    const response = await TestTransport.put('/', data);
    return this.processResponse(response as ServerResponse);
  }
  async testDelete(data: PlainObject) {
    const response = await TestTransport.delete('/', data);
    return this.processResponse(response as ServerResponse);
  }
}

const testAPI = new TestAPI();

describe('HTTPTransport', () => {
  describe('Запросы отправляются на сервер', async () => {
    it('Отправляется get запрос', async () => {
      const [, body] = await testAPI.testGet({});
      chai
        .expect(JSON.stringify(body))
        .to.be.equal(JSON.stringify({ reason: 'Not found' }));
    });
    it('Отправляется post запрос', async () => {
      const [, body] = await testAPI.testPost({});
      chai
        .expect(JSON.stringify(body))
        .to.be.equal(JSON.stringify({ reason: 'Not found' }));
    });
    it('Отправляется put запрос', async () => {
      const [, body] = await testAPI.testPut({});
      chai
        .expect(JSON.stringify(body))
        .to.be.equal(JSON.stringify({ reason: 'Not found' }));
    });
    it('Отправляется delete запрос', async () => {
      const [, body] = await testAPI.testDelete({});
      chai
        .expect(JSON.stringify(body))
        .to.be.equal(JSON.stringify({ reason: 'Not found' }));
    });
  });
});
