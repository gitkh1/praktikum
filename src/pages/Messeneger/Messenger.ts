import Search from '../../components/Input/Search/Search';
import Link from '../../components/Link/Link';
import NewMessage from '../../components/NewMessage/NewMessage';
import myFriendsList, {
  FriendsList,
} from '../../modules/FriendsList/FriendsList';
import myMessageList, {
  MessageList,
} from '../../modules/MessagesList/MessageList';
import Block from '../../utils/Block';
import PATHS from '../../utils/Paths';
import { template } from './Messenger.tmpl';

type MessenegerProps = {
  link: Link;
  search: Search;
  userList: FriendsList;
  messageList: MessageList;
  newmessage: NewMessage;
};

const link = new Link({
  linkClasses: ['link', 'link--grey'],
  description: 'Профиль',
  href: PATHS.userprofile,
});

const search = new Search();

const newmessage = new NewMessage();

class Messeneger extends Block<MessenegerProps> {
  constructor(props: MessenegerProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const messenger = new Messeneger({
  link,
  search,
  newmessage,
  userList: myFriendsList,
  messageList: myMessageList,
});

export default messenger;
