import "./Title.scss";
import { template } from "./Title.tmpl";
import Block from "../../utils/Block";
import Templator from "../../utils/templator";

export default class Title extends Block {
  constructor(props: object) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
