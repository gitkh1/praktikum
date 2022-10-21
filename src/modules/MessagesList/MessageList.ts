import Message from "../../components/Message/Message";
import View from "../../utils/View";
import { template } from "./MessageList.tmpl";

type MessageListProps = Message[];

export class MessageList extends View<MessageListProps> {
  constructor(props: MessageListProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const message0 = new Message({
  content: 'Привет',
  time: '21:45',
})

const message1 = new Message({
  content: 'Как дела',
  time: '21:50',
})

const message2 = new Message({
  content: 'Что делаешь?',
  time: '21:55',
})


const messageList: MessageListProps = [message0, message1, message2];

const myMessageList = new MessageList(messageList);

export default myMessageList;
