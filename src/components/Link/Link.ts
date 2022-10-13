import "./Link.scss";
import { template } from "./Link.tmpl";
import Block from "../../utils/View";
import Templator from "../../utils/templator";

export default class Link extends Block {
  constructor(props: object) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
