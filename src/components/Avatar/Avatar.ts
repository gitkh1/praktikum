import Block from "../../utils/Block";
import Templator from "../../utils/templator";
import { template } from "./Avatar.tmpl";
import "./Avatar.scss";

export default class Avatar extends Block {
  constructor(props: object) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
