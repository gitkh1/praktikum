import "./Message.scss";
import { template } from "./Message.tmpl";
import Block from "../../utils/View";
import Templator from "../../utils/templator";
  export default class Message extends Block {
    constructor(props: object) {
      super(props);
    }
  
    render() {
      return new Templator().compile(template, this.props);
    }
  }
