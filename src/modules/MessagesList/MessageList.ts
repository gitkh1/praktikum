import { Msg } from '../../api/ws-api';
import Block from '../../utils/Block';
import Store, { StoreEvents } from '../../utils/Store';
import template, { message, MESSAGES_CONTAINER } from './MessageList.tmpl';

export class MessageList extends Block<object> {
  private activeChatId = '';
  private lastMsgSenderId = '';
  constructor() {
    super({}, 'chat__wrapper');
    Store.on(StoreEvents.Updated, () => {
      const state = Store.getState();
      if (state.activeChat.id !== this.activeChatId) {
        this.componentDidMount();
        this.activeChatId = state.activeChat.id;
        if (!this.activeChatId) {
          return;
        }
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  addMessage(newMsgProps: Msg) {
    const state = Store.getState();
    const myId = state.user.id;

    const isFirstMessage = this.lastMsgSenderId !== `${newMsgProps.user_id}`;
    const isMyMessage = myId === `${newMsgProps.user_id}`;
    const senderName = state.users[`${newMsgProps.user_id}`];
    this.lastMsgSenderId = `${newMsgProps.user_id}`;
    const newMessage = message(
      newMsgProps,
      isFirstMessage,
      isMyMessage,
      senderName
    );

    const element = this.getContent() as HTMLElement;
    const container = element.querySelector(`.${MESSAGES_CONTAINER}`);
    if (!container) {
      return;
    }
    container.append(newMessage);
    container.parentElement?.scrollTo(
      container.scrollWidth,
      container.clientHeight
    );
  }
}

const myMessageList = new MessageList();

export default myMessageList;
