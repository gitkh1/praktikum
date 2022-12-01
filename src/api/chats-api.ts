import AddUserToChatData from '../types/AddUserToChatData';
import { DeleteChatData, NewChatData } from '../types/ChatListData';
import ServerResponse from '../types/ServerResponse';
import HTTPTransport from '../utils/HTTPTransport';
import BaseAPI from './base-api';

const ChatsAPIInstance = new HTTPTransport('/chats');

export class ChatListAPI extends BaseAPI {
  async read() {
    const response = await ChatsAPIInstance.get('', {});
    return this.processResponse(response as ServerResponse);
  }

  async create(data: NewChatData) {
    const response = await ChatsAPIInstance.post('', data);
    return this.processResponse(response as ServerResponse);
  }

  async delete(data: DeleteChatData) {
    const response = await ChatsAPIInstance.delete('', data);
    return this.processResponse(response as ServerResponse);
  }
}

export class ChatDataAPI extends BaseAPI {
  async readUsers(id: string) {
    const response = await ChatsAPIInstance.get(`/${id}/users`, {});
    return this.processResponse(response as ServerResponse);
  }

  async addUser(data: AddUserToChatData) {
    const response = await ChatsAPIInstance.put(`/users`, data);
    return this.processResponse(response as ServerResponse);
  }

  async deleteUser(data: AddUserToChatData) {
    const response = await ChatsAPIInstance.delete(`/users`, data);
    return this.processResponse(response as ServerResponse);
  }

  async updatePhoto(avatarData: FormData) {
    const response = await ChatsAPIInstance.putFile('/avatar', avatarData);
    return this.processResponse(response as ServerResponse);
  }

  async requestToken(chatId:string) {
    const response = await ChatsAPIInstance.post(`/token/${chatId}`, {});
    return this.processResponse(response as ServerResponse);
  }

  async getUnreadMsgCount(chatId:string) {
    const response = await ChatsAPIInstance.get(`/new/${chatId}`, {});
    return this.processResponse(response as ServerResponse);
  }
}

export const chatDataAPI = new ChatDataAPI();
