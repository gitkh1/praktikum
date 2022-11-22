import userAPI from '../api/users-api';
import WSAPI, { Msg } from '../api/ws-api';
import myMessageList from '../modules/MessagesList/MessageList';
import PlainObject from '../types/PlainObject';
import UserProfileData from '../types/UserProfileData';
import Store from '../utils/Store';
import { chatDataAPI } from './ChatsController';

class ChatController {
  private token = '';
  private chatId = '';
  private userId = '';
  private connection: WSAPI | null = null;

  async clearChat() {
    Store.merge({
      activeChat: { id: '', users: [], usersCount: '0', messages: [] },
    });
  }

  async getChatData(chatId: string) {
    const [isOk, body] = await chatDataAPI.readUsers(chatId);
    if (!isOk) {
      return;
    }
    const chatUsersCount = `${body.length}`;
    Store.merge({
      activeChat: {
        id: chatId,
        users: body,
        usersCount: chatUsersCount,
      },
    });
  }

  async initChat() {
    const state = Store.getState();
    this.chatId = state.activeChat.id;
    this.userId = state.user.id;
    const [isOk, body] = await chatDataAPI.requestToken(this.chatId);
    if (!isOk) {
      return;
    }
    this.token = (body.token as string) || '';
    if (this.token === '') {
      return;
    }

    this.connection = new WSAPI(this.userId, this.chatId, this.token);
    await this.connection.init();
    await this.getMessages();
  }

  async closeChat() {
    if (!this.connection) {
      return;
    }
    await this.connection.close();
  }

  async getMessages() {
    if (!this.connection) {
      return;
    }

    for (let i = 0; i < 3; i += 1) {
      this.connection.getOldMessages(i);
    }
  }

  async sendMessage(data: PlainObject) {
    const { message } = data;
    if (!message) {
      return;
    }
    if (!this.connection) {
      return;
    }
    this.connection.send(message as string);
  }

  async fromAPItoChat(msg: Msg) {
    const users = Store.getState().users;
    if (!users[`${msg.user_id}`]) {
      const [isOk, body] = await userAPI.getUserInfo(msg.user_id);
      if (!isOk) {
        return;
      }
      const data = body as UserProfileData;
      users[`${msg.user_id}`] = `${data.first_name} ${data.second_name}`;
    }
    myMessageList.addMessage(msg);
  }
}

const chatController = new ChatController();

export default chatController;
