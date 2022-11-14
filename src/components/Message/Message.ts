import "./Message.scss";

import Block from "../../utils/Block";
import Templator from "../../utils/Templator";
import { template } from "./Message.tmpl";

type MessageProps = {
  content: string;
  time: string;
}

  export default class Message extends Block<MessageProps> {
    constructor(props: MessageProps) {
      super(props);
    }
  
    render() {
      return new Templator().compile(template, this.props);
    }
  }
