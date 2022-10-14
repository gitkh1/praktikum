import "./NewMessage.scss";

import Templator from "../../utils/Templator";
import View, { EventListeners } from "../../utils/View";
import { template } from "./NewMessage.tmpl";

type NewMessageProps = {
  events: EventListeners;
}
export default class NewMessage extends View<NewMessageProps> {
  constructor(props: NewMessageProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
