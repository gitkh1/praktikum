import ChangePasswordData from '../types/ChangePasswordData';
import ServerResponse from '../types/ServerResponse';
import UserProfileData from '../types/UserProfileData';
import HTTPTransport from '../utils/HTTPTransport';
import BaseAPI from './base-api';

const UsersAPIInstance = new HTTPTransport('/user');

export class UserAPI extends BaseAPI {
  async updateUser(data: UserProfileData) {
    const response = await UsersAPIInstance.put('/profile', data);
    return this.processResponse(response as ServerResponse);
  }

  async updateAvatar(avatar: FormData) {
    const response = await UsersAPIInstance.putFile('/profile/avatar', avatar);
    return this.processResponse(response as ServerResponse);
  }

  async updatePassword(data: ChangePasswordData) {
    const response = await UsersAPIInstance.put('/password', data);
    return this.processResponse(response as ServerResponse);
  }

  async getUserInfo(userId: string) {
    const response = await UsersAPIInstance.get(`/${userId}`, {});
    return this.processResponse(response as ServerResponse);
  }
}

const userAPI = new UserAPI();

export default userAPI;
