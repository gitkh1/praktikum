import "./Friend.scss";

import Block from "../../utils/Block";
import Templator from "../../utils/Templator";
import { template } from "./Friend.tmpl";

type FriendProps = {
  chatname: string;
  message: string;
  time: string;
  unread: string;
}
export default class Friend extends Block<FriendProps> {
  constructor(props: FriendProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
