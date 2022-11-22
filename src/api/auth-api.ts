import ServerResponse from '../types/ServerResponse';
import SignInData from '../types/SignInData';
import SignUpData from '../types/SignUpData';
import HTTPTransport from '../utils/HTTPTransport';
import BaseAPI from './base-api';

const AuthAPIInstance = new HTTPTransport('/auth');

const NEED_TO_LOGOUT = 'User already in system';

export default class AuthAPI extends BaseAPI {
  async signIn(data: SignInData) {
    const response = await AuthAPIInstance.post('/signin', data);
    const [isOk, body] = this.processResponse(response as ServerResponse);
    if (!isOk && body?.reason === NEED_TO_LOGOUT) {
      await this.logOut();
      alert('Попробуйте еще раз');
    }
    return [isOk, body];
  }

  async signUp(data: SignUpData) {
    const response = await AuthAPIInstance.post('/signup', data);
    const [isOk, body] = this.processResponse(response as ServerResponse);
    if (isOk) {
      return [isOk, body];
    }
    if (body?.reason === NEED_TO_LOGOUT) {
      await this.logOut();
      alert('Попробуйте еще раз');
    } else {
      alert(`${body.reason}`);
    }
    return [isOk, body];
  }

  async getUser() {
    const response = await AuthAPIInstance.get('/user', {});
    return this.processResponse(response as ServerResponse);
  }

  async logOut() {
    const response = await AuthAPIInstance.post('/logout', {});
    return this.processResponse(response as ServerResponse);
  }
}
