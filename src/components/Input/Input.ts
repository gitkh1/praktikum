import "./Input.scss";

import Templator from "../../utils/Templator";
import View from "../../utils/View";
import { template } from "./Input.tmpl";

type InputProps = {
  inputClasses: string[];
  type: string;
  name: string;
  placeholder: string;
}

export default class Input extends View<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
