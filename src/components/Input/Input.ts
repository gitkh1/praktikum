import "./Input.scss";

import Block from "../../utils/Block";
import Templator from "../../utils/Templator";
import { template } from "./Input.tmpl";

type InputProps = {
  inputClasses: string[];
  type: string;
  name: string;
  placeholder: string;
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
