import { ChatDataAPI, ChatListAPI } from '../api/chats-api';
import { POPUP_DATA } from '../modules/PopUpInput/PopUpInput';
import { NewChatData } from '../types/ChatListData';
import FORM_TYPES from '../types/FormTypes';
import FriendProps from '../types/FriendProps';
import PlainObject from '../types/PlainObject';
import UserProfileData from '../types/UserProfileData';
import getTime from '../utils/getTime';
import Store, { STORE_PATHS, StoreState } from '../utils/Store';
import chatController from './ChatController';
import router from './Controller';

const chatListAPI = new ChatListAPI();
export const chatDataAPI = new ChatDataAPI();

export type CheckedChatInfo = {
  id: string;
  users: UserProfileData[];
  usersCount: string;
};

class ChatListController {
  async createChat(data: NewChatData) {
    try {
      const [isOk] = await chatListAPI.create(data);
      if (isOk) {
        router.overlayHide();
        this.getChats();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getChats() {
    try {
      const [isOk, body] = await chatListAPI.read();
      if (isOk) {
        Store.merge({ [STORE_PATHS.CHATS]: body });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addUserToChat(formData: PlainObject) {
    try {
      const userId = formData[POPUP_DATA[FORM_TYPES.ADD_USER].inputName];
      const state = mapCheckedChatToProps(Store.getState());
      const chatId = state.activeChat.id;
      const data = {
        users: [Number(userId)],
        chatId: Number(chatId),
      };
      const [isOk] = await chatDataAPI.addUser(data);
      if (isOk) {
        chatController.getChatData(chatId);
        router.overlayHide();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async removeUserFromChat(formData: PlainObject) {
    try {
      const userId = formData[POPUP_DATA[FORM_TYPES.REMOVE_USER].inputName];
      const state = mapCheckedChatToProps(Store.getState());
      const chatId = state.activeChat.id;
      const data = {
        users: [Number(userId)],
        chatId: Number(chatId),
      };
      const [isOk] = await chatDataAPI.deleteUser(data);
      if (isOk) {
        chatController.getChatData(chatId);
        router.overlayHide();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async changePhotoChat(formData: FormData) {
    try {
      const state = mapCheckedChatToProps(Store.getState());
      const chatId = state.activeChat.id;
      formData.append('chatId', chatId);
      const [isOk] = await chatDataAPI.updatePhoto(formData);
      if (isOk) {
        this.getChats();
        router.overlayHide();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export function mapChatListToProps(state: StoreState) {
  const chats = state.chats || [];
  const userList: FriendProps[] = [];
  const newChatId = state.activeChat.id;
  chats.forEach((chat) => {
    const friend: FriendProps = {
      avatar: chat.avatar,
      id: `${chat.id}`,
      chatname: chat.title,
      message: chat?.last_message?.content || '',
      time: getTime(chat?.last_message?.time || ''),
      unread: `${chat?.unread_count}`,
    };
    userList.push(friend);
  });
  return { userList: userList, activeChatId: newChatId };
}

export function mapCheckedChatToProps(state: StoreState) {
  const data: CheckedChatInfo = {
    id: state.activeChat.id || '',
    users: state.activeChat.users || [],
    usersCount: state.activeChat.usersCount || '0',
  };
  return { activeChat: data };
}

const chatListController = new ChatListController();
export default chatListController;
