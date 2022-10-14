import Input from "../../components/Input/Input";
import Link from "../../components/Link/Link";
import NewMessage from "../../components/NewMessage/NewMessage";
import myFriendsList, { FriendsList } from "../../modules/FriendsList/FriendsList";
import myMessageList, { MessageList } from "../../modules/MessagesList/MessageList";
import formHandler from "../../utils/formHadler";
import View, { EventListeners } from "../../utils/View";
import { template } from "./Messeneger.tmpl";

type MessenegerProps = {
  link: Link;
  search: Input;
  userList: FriendsList;
  messageList: MessageList;
  newmessage: NewMessage;
}

class Messeneger extends View<MessenegerProps> {
  constructor(props: MessenegerProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const link = new Link({
  linkClasses: ['link', 'link--grey'],
  description: 'Профиль',
  href: '#userprofile',
})

const search = new Input({
  inputClasses: ['colored-input', 'colored-input--search'],
  type: 'text',
  name: 'search',
  placeholder: 'Поиск',
})

const newmessage = new NewMessage({
  events: {
    submit: [formHandler, false],
    focus: [formHandler, true],
    blur: [formHandler, true],
  },
})

const msg = new Messeneger({
  link: link,
  search: search,
  userList: myFriendsList,
  messageList: myMessageList,
  newmessage: newmessage,
})

export default msg;
