import { Msg } from '../api/ws-api';
import { CheckedChatInfo } from '../controllers/ChatsController';
import { ChatData } from '../types/ChatListData';
import EventBus from './EventBus';
import { Indexed, mergeDeep } from './merge';
import set from './set';

export enum StoreEvents {
  Updated = 'updated',
  NewMessage = 'newmessage',
  Authorization = 'authorized',
  UserChanged = 'userchanged'
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
  AUTHORIZED: 'authorized',
  MESSAGE_TRANSFER: 'messageTransfer',
  FORM_EVENTS: {
    _PATH: 'formEvents',
    FORM_SUBMIT: 'formEvents.formSubmit',
    FORM_FOCUSBLUR: 'formEvents.formFocusBlur',
    SEARCH_SUBMIT: 'formEvents.searchSubmit',
  },
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
  authorized: boolean;
  messageTransfer: Msg | null;
  formEvents: {
    formSubmit: Event | null;
    formFocusBlur: Event | null;
    searchSubmit: Event | null;
  };
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
    authorized: false,
    messageTransfer: null,
    formEvents: {
      formSubmit: null,
      formFocusBlur: null,
      searchSubmit: null,
    },
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
