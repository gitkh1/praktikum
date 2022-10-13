import "./NewMessage.scss";
import { template } from "./NewMessage.tmpl";
import Block from "../../utils/Block";
import Templator from "../../utils/templator";
export default class NewMessage extends Block {
  constructor(props: object) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
