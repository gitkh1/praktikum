import Block from "../../utils/View";
import Templator from "../../utils/templator";
import { template } from "./Button.tmpl";
import "./Button.scss";

export default class Button extends Block {
  constructor(props: object) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
