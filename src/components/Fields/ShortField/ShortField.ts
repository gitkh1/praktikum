import "../Fields.scss";

import Templator from "../../../utils/Templator";
import View from "../../../utils/View";
import { template } from "./ShortField.tmpl";

type ShortFieldProps = {
  fieldClasses: string[];
  description: string;
  inputClasses: string;
  name: string;
  type: string;
  placeholder: string;
}
export default class ShortField extends View<ShortFieldProps> {
  constructor(props: ShortFieldProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
