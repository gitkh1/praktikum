import { chatDataAPI } from '../api/chats-api';
import userAPI from '../api/users-api';
import WSAPI, { Msg } from '../api/ws-api';
import myMessageList from '../modules/MessagesList/MessageList';
import PlainObject from '../types/PlainObject';
import UserProfileData from '../types/UserProfileData';
import Store, { StoreEvents } from '../utils/Store';
class ChatController {
  private token = '';
  private chatId = '';
  private userId = '';
  private connection: WSAPI | null = null;

  constructor() {
    Store.on(StoreEvents.Updated, () => {
      const store = Store.getState();
      if (store.messageTransfer) {
        const msg = store.messageTransfer;
        this.fromAPItoChat(msg);
        store.messageTransfer = null;
      }
    });
  }

  clearChat() {
    Store.merge({
      activeChat: { id: '', users: [], usersCount: '0', messages: [] },
    });
  }

  async getChatData(chatId: string) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  async initChat() {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  async closeWS() {
    try {
      if (!this.connection) {
        return;
      }
      await this.connection.close();
    } catch (error) {
      console.log(error);
    }
  }

  async getMessages() {
    try {
      if (!this.connection) {
        return;
      }

      for (let i = 0; i < 3; i += 1) {
        this.connection.getOldMessages(i);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async sendMessage(data: PlainObject) {
    try {
      const { message } = data;
      if (!message) {
        return;
      }
      if (!this.connection) {
        return;
      }
      this.connection.send(message as string);
    } catch (error) {
      console.log(error);
    }
  }

  async fromAPItoChat(msg: Msg) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }
}

const chatController = new ChatController();

export default chatController;
