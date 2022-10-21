import "../Fields.scss";

import Templator from "../../../utils/Templator";
import View from "../../../utils/View";
import { template } from "./LongField.tmpl";

type LongFieldProps = {
  fieldClasses: string[];
  fieldInnerClasses: string[];
  description: string;
  inputClasses: string[];
  name: string;
  type: string;
  placeholder: string;
}
export default class LongField extends View<LongFieldProps> {
  constructor(props: LongFieldProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
