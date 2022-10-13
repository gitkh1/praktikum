import "./Friend.scss";
import Block from "../../utils/View";
import Templator from "../../utils/templator";
import { template } from "./Friend.tmpl";

export default class Friend extends Block {
  constructor(props: object) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
