import POPUP_DATA from '../consts/PopUpData';
import { CheckedChatInfo } from '../controllers/ChatsController';
import FORM_TYPES from '../types/FormTypes';
import FriendProps from '../types/FriendProps';
import PlainObject from '../types/PlainObject';
import getTime from './getTime';
import { EMPTY_USER, STORE_PATHS, StoreState } from './Store';

export function mapMessenegerToProps(state: StoreState) {
  const msgProps = { user: mapUserToProps(state) };
  const activeChat = state.activeChat;
  Object.assign(msgProps, {
    activeChat: activeChat,
  });
  return msgProps;
}

export function mapUserToProps(state: StoreState) {
  const user = state.user || EMPTY_USER;
  return {
    id: user.id || '',
    first_name: user.first_name || '',
    second_name: user.second_name || '',
    avatar: user.avatar || '',
    display_name: user.display_name || '',
    login: user.login || '',
    email: user.email || '',
    phone: user.phone || '',
  };
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

export function mapPopupToProps(state: PlainObject) {
  const popupName = (state[STORE_PATHS.POPUP] as string) || '';
  if (
    Object.values(FORM_TYPES).includes(popupName) &&
    popupName in POPUP_DATA
  ) {
    return POPUP_DATA[popupName];
  } else {
    return POPUP_DATA.createchat;
  }
}
