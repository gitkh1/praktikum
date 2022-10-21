import "./Friend.scss";

import Templator from "../../utils/Templator";
import View from "../../utils/View";
import { template } from "./Friend.tmpl";

type FriendProps = {
  chatname: string;
  message: string;
  time: string;
  unread: string;
}
export default class Friend extends View<FriendProps> {
  constructor(props: FriendProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
