import Block from "../../../utils/Block";
import Templator from "../../../utils/templator";
import { template } from "./LongField.tmpl";
import "../Fields.scss";

export default class LongField extends Block {
  constructor(props: object) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
