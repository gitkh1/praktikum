import "../Input.scss";
import { template } from "./LabledInput.tmpl";
import Block from "../../../utils/View";
import Templator from "../../../utils/templator";

export default class LabledInput extends Block {
  constructor(props: object) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
