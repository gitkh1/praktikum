import '../Avatar/Avatar.scss';
import './Friend.scss';

import { FRIEND_CLASS } from '../../controllers/Router';
import FriendProps from '../../types/FriendProps';
import Block from '../../utils/Block';
import Templator from '../../utils/templator';
import saver from '../Avatar/saver.png';
import template from './Friend.tmpl';

export default class Friend extends Block<FriendProps> {
  private dataId: string;
  private chatName: string;
  private isChecked: boolean;
  constructor(props: FriendProps) {
    const unreadClasses = ['friend__unread'];

    if (props.unread === '0') {
      unreadClasses.push('friend__unread--hidden');
    }
    let extraProps = { ...props, unreadClasses: unreadClasses };
    if (!props.avatar) {
      extraProps = { ...extraProps, avatar: `${saver}` };
    }
    super(extraProps, 'friend', 'li');
    this.dataId = props.id;
    this.chatName = props.chatname;
    this.isChecked = false;
  }

  render() {
    let newTemplate = template;
    if (this.isChecked) {
      newTemplate = template.replace('REPLACE', `${FRIEND_CLASS}--active`);
    }
    return new Templator().compile(newTemplate, this.props);
  }

  check() {
    this.isChecked = true;
    this.dispatchComponentDidMount()
  }

  uncheck() {
    this.isChecked = false;
    this.dispatchComponentDidMount()
  }

  getChatName() {
    return this.chatName;
  }

  getDataId() {
    return this.dataId;
  }
}
