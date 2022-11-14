import Friend from "../../components/Friend/Friend";
import Block from "../../utils/Block";
import { template } from "./FriendsList.tnpl";

type FriendListProps = Friend[];

export class FriendsList extends Block<FriendListProps> {
  constructor(props: FriendListProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const friend0 = new Friend({
  chatname: 'Маша',
  message: 'Целую!',
  time: '18:00',
  unread: '1',
})
const friend1 = new Friend({
  chatname: 'Петя',
  message: 'Привет!',
  time: '18:00',
  unread: '2',
})
const friend2 = new Friend({
  chatname: 'Иван',
  message: 'Пока!',
  time: '12:00',
  unread: '1',
})

const userList: FriendListProps = [friend0, friend1, friend2];

const myFriendsList = new FriendsList(userList);

export default myFriendsList;
