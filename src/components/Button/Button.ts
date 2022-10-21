import "./Button.scss";

import Templator from "../../utils/Templator";
import View from "../../utils/View";
import { template } from "./Button.tmpl";

type ButtonProps = {
  classNames: string[];
  description: string;
  type: string;
}
export default class Button extends View<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
