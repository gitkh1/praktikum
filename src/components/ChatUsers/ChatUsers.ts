import { CheckedChatInfo } from '../../controllers/ChatsController';
import Block from '../../utils/Block';
import { mapCheckedChatToProps } from '../../utils/mapPropsFunctions';
import Store, { StoreEvents } from '../../utils/Store';
import Templator from '../../utils/templator';
import template from './ChatUsers.tmpl';

export type ChatUsersType = {
  activeChat: CheckedChatInfo;
};

export class ChatUsers extends Block<ChatUsersType> {
  constructor(props: ChatUsersType) {
    super(props, 'chat__control');
    let checkedId = mapCheckedChatToProps(Store.getState()).activeChat.id;

    Store.on(StoreEvents.Updated, () => {
      const store = Store.getState();
      const newState = mapCheckedChatToProps(store);
      if (checkedId !== newState.activeChat.id) {
        this.setProps(newState);
        checkedId = newState.activeChat.id;
      }
    });
  }

  render() {
    const checkedChatInfo = mapCheckedChatToProps(Store.getState()).activeChat;
    return new Templator().compile(template(checkedChatInfo), this.props);
  }
}

const chatUsers = new ChatUsers(mapCheckedChatToProps(Store.getState()));

export default chatUsers;
