import "../Input.scss";

import Templator from "../../../utils/Templator";
import View from "../../../utils/View";
import { template } from "./LabledInput.tmpl";

type LabledInputProps  = {
  inputClasses: string[];
  labelClasses: string[];
  name: string;
  src: string;
  alt: string;
}

export default class LabledInput extends View<LabledInputProps> {
  constructor(props: LabledInputProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
