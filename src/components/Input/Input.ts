import "./Input.scss";
import Block from "../../utils/View";
import Templator from "../../utils/templator";
import { template } from "./Input.tmpl";

export default class Input extends Block {
  constructor(props: object) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
