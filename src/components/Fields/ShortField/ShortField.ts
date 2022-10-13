import Block from "../../../utils/View";
import Templator from "../../../utils/templator";
import { template } from "./ShortField.tmpl";
import "../Fields.scss";

export default class ShortField extends Block {
  constructor(props: object) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
