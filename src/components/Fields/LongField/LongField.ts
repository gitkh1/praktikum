import "../Fields.scss";

import Block from "../../../utils/Block";
import Templator from "../../../utils/Templator";
import { template } from "./LongField.tmpl";

type LongFieldProps = {
  description: string;
  name: string;
  type: string;
}
export default class LongField extends Block<LongFieldProps> {
  constructor(props: LongFieldProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
