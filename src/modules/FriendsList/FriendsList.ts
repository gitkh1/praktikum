import Friend from '../../components/Friend/Friend';
import Block from '../../utils/Block';
import isEqual from '../../utils/isEqual';
import { mapChatListToProps } from '../../utils/mapPropsFunctions';
import Store, { StoreEvents } from '../../utils/Store';
import template from './FriendsList.tmpl';

export class FriendsList extends Block<object> {
  private userList: Friend[] = [];
  private checkedFriend: Friend | null;

  constructor() {
    super({}, 'friends__container');
    let state = mapChatListToProps(Store.getState());
    this.checkedFriend = null;

    Store.on(StoreEvents.Updated, () => {
      const store = Store.getState();
      const newState = mapChatListToProps(store);
      if (!isEqual(state, newState)) {
        this.userList = newState.userList.map((friend) => new Friend(friend));
        this.setChildren(this.userList);
        this.toggleChecked();
        state = newState;
        if (this.userList.length === 0) {
          this.hide();
        } else {
          this.show();
        }
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  getChatList() {
    return this.userList;
  }

  toggleChecked() {
    const store = Store.getState();
    const newChatId = store.activeChat.id;

    if (newChatId !== '') {
      this.checkedFriend?.uncheck();
      this.checkedFriend =
        this.userList.find((friend) => friend.getDataId() === newChatId) ||
        null;
      this.checkedFriend?.check();
    } else {
      this.userList.find((friend) => friend.getDataId() === newChatId) || null;
      this.checkedFriend?.check();
    }
  }
}

const myFriendsList = new FriendsList();

export default myFriendsList;
