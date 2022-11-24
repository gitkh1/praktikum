import chatUsers, { ChatUsers } from '../../components/ChatUsers/ChatUsers';
import Search from '../../components/Input/Search/Search';
import Link from '../../components/Link/Link';
import NewMessage from '../../components/NewMessage/NewMessage';
import PATHS from '../../controllers/Paths';
import { mapMessenegerToProps } from '../../controllers/UserController';
import myFriendsList, {
  FriendsList,
} from '../../modules/FriendsList/FriendsList';
import myMessageList, {
  MessageList,
} from '../../modules/MessagesList/MessageList';
import PopUpInput, { POPUP_DATA } from '../../modules/PopUpInput/PopUpInput';
import FORM_TYPES from '../../types/FormTypes';
import Block from '../../utils/Block';
import isEqual from '../../utils/isEqual';
import Store, { StoreEvents } from '../../utils/Store';
import template from './Messenger.tmpl';

type MessenegerProps = {
  linknewchat: Link;
  linkprofile: Link;
  search: Search;
  userList: FriendsList;
  chatUsers: ChatUsers;
  messageList: MessageList;
  newmessage: NewMessage;
  newchatpopup: PopUpInput;
};

const linknewchat = new Link(
  {
    linkClasses: ['link', 'link--grey'],
    description: 'Создать чат',
    href: `#${FORM_TYPES.CREATE_CHAT}`,
  },
  'friends__newchat'
);

const linkprofile = new Link(
  {
    linkClasses: ['link', 'link--grey'],
    description: 'Профиль',
    href: PATHS.userprofile,
  },
  'friends__profile'
);

const search = new Search();

const newmessage = new NewMessage();

export const popup = new PopUpInput(POPUP_DATA[FORM_TYPES.CREATE_CHAT]);

class Messeneger extends Block<MessenegerProps> {
  constructor(props: MessenegerProps) {
    let state = mapMessenegerToProps(Store.getState());
    super(props, 'root__inner');
    this.hide();

    Store.on(StoreEvents.Updated, () => {
      const store = Store.getState();
      const newState = mapMessenegerToProps(store);
      if (!isEqual(state, newState)) {
        this.setProps(newState);
      }
      state = newState;
      this.show();
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const messenger = new Messeneger({
  linknewchat,
  linkprofile,
  search,
  newmessage,
  userList: myFriendsList,
  messageList: myMessageList,
  chatUsers: chatUsers,
  newchatpopup: popup,
});

export default messenger;
