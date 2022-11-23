import ServerResponse from '../types/ServerResponse';
import SignInData from '../types/SignInData';
import SignUpData from '../types/SignUpData';
import HTTPTransport from '../utils/HTTPTransport';
import BaseAPI from './base-api';

const AuthAPIInstance = new HTTPTransport('/auth');

export default class AuthAPI extends BaseAPI {
  async signIn(data: SignInData) {
    const response = await AuthAPIInstance.post('/signin', data);
    return this.processResponse(response as ServerResponse);
  }

  async signUp(data: SignUpData) {
    const response = await AuthAPIInstance.post('/signup', data);
    return this.processResponse(response as ServerResponse);
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
