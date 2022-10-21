import "./Message.scss";

import Templator from "../../utils/Templator";
import View from "../../utils/View";
import { template } from "./Message.tmpl";

type MessageProps = {
  content: string;
  time: string;
}

  export default class Message extends View<MessageProps> {
    constructor(props: MessageProps) {
      super(props);
    }
  
    render() {
      return new Templator().compile(template, this.props);
    }
  }
