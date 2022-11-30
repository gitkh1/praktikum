import { chatDataAPI, ChatListAPI } from '../api/chats-api';
import POPUP_DATA from '../consts/PopUpData';
import { OVERLAY_CLASS } from '../modules/PopUpInput/PopUpInput';
import { NewChatData } from '../types/ChatListData';
import PlainObject from '../types/PlainObject';
import UserProfileData from '../types/UserProfileData';
import { mapCheckedChatToProps } from '../utils/mapPropsFunctions';
import Store, { STORE_PATHS } from '../utils/Store';
import chatController from './ChatController';

const chatListAPI = new ChatListAPI();

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
        this.overlayHide();
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
      const userId = formData[POPUP_DATA.adduser.inputName];
      const state = mapCheckedChatToProps(Store.getState());
      const chatId = state.activeChat.id;
      const data = {
        users: [Number(userId)],
        chatId: Number(chatId),
      };
      const [isOk] = await chatDataAPI.addUser(data);
      if (isOk) {
        chatController.getChatData(chatId);
        this.overlayHide();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async removeUserFromChat(formData: PlainObject) {
    try {
      const userId = formData[POPUP_DATA.removeuser.inputName];
      const state = mapCheckedChatToProps(Store.getState());
      const chatId = state.activeChat.id;
      const data = {
        users: [Number(userId)],
        chatId: Number(chatId),
      };
      const [isOk] = await chatDataAPI.deleteUser(data);
      if (isOk) {
        chatController.getChatData(chatId);
        this.overlayHide();
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
        this.overlayHide();
      }
    } catch (error) {
      console.log(error);
    }
  }

  overlayShow() {
    const overlay = document.querySelector(`.${OVERLAY_CLASS}`) as HTMLElement;
    if (overlay) {
      overlay.style.display = 'block';
    }
  }

  overlayHide() {
    const overlay = document.querySelector(`.${OVERLAY_CLASS}`) as HTMLElement;
    if (overlay) {
      overlay.style.display = 'none';
    }
  }
}

const chatListController = new ChatListController();
export default chatListController;
