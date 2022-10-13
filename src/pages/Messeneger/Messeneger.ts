import Link from "../../components/Link/Link";
import Input from "../../components/Input/Input";
import Block from "../../utils/Block";
import Friend from "../../components/Friend/Friend";
import Message from "../../components/Message/Message";
import NewMessage from "../../components/NewMessage/NewMessage";
import { template } from "./Messeneger.tmpl";

class Messeneger extends Block {
  constructor(props: object) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const link = new Link({
  linkClasses: ['link', 'link--grey'],
  description: 'Профиль',
  href: '#',
})

const search = new Input({
  inputClasses: ['colored-input', 'colored-input--search'],
  type: 'text',
  name: 'search',
  placeholder: 'Поиск',
})

const friend1 = new Friend({
  chatname: 'Иван',
  message: 'Привет',
  time: '21:45',
  unread: '2',
})

const friend2 = new Friend({
  chatname: 'Петр',
  message: 'Что нового?',
  time: '20:00',
  unread: '3',
})

const friend3 = new Friend({
  chatname: 'Анастасия',
  message: 'Пока!',
  time: '19:00',
  unread: '1',
})

const friend4 = new Friend({
  chatname: 'Маша',
  message: 'Целую!',
  time: '18:00',
  unread: '1',
})

const message1 = new Message({
  content: 'Привет',
  time: '21:45',
})

const newmessage = new NewMessage({})

const msg = new Messeneger({
  link: link,
  search: search,
  friend1: friend1,
  friend2: friend2,
  friend3: friend3,
  friend4: friend4,
  message1: message1,
  newmessage: newmessage,
})

export default msg;
