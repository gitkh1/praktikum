import Block from "../../../utils/View";
import Templator from "../../../utils/templator";
import { template } from "./LinkField.tmpl";
import "../Fields.scss";

export default class LinkField extends Block {
  constructor(props: object) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
