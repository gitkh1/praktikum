import { CheckedChatInfo } from '../controllers/ChatsController';
import { ChatData } from '../types/ChatListData';
import EventBus from './EventBus';
import { Indexed, mergeDeep } from './merge';
import set from './set';

export enum StoreEvents {
  Updated = 'updated',
  NewMessage = 'newmessage',
}

export const STORE_PATHS = {
  ACTIVE_CHAT: {
    _PATH: 'activeChat',
    ID: 'activeChat.id',
    USERS: 'activeChat.users',
    USERS_COUNT: 'activeChat.usersCount',
  },
  CHATS: 'chats',
  USER: 'user',
  POPUP: 'popup',
};

export type StoreState = {
  activeChat: CheckedChatInfo;
  chats?: ChatData[];
  user: {
    id: string;
    first_name?: string;
    second_name?: string;
    avatar?: string;
    display_name?: string;
    login?: string;
    email?: string;
    phone?: string;
  };
  popup?: string;
  users: Record<string, string>;
};

export const EMPTY_USER = {
  id: '',
  first_name: '',
  second_name: '',
  avatar: '',
  display_name: '',
  login: '',
  email: '',
  phone: '',
};

class Store extends EventBus {
  private state: StoreState = {
    activeChat: {
      id: '',
      users: [],
      usersCount: '0',
    },
    chats: [],
    user: EMPTY_USER,
    popup: '',
    users: {},
  };

  getState() {
    return this.state;
  }

  set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }

  merge(object: Indexed) {
    mergeDeep(this.state, object);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
