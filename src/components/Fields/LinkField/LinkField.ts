import "../Fields.scss";

import Templator from "../../../utils/Templator";
import View from "../../../utils/View";
import { template } from "./LinkField.tmpl";

type LinkFieldProps = {
  fieldClasses: string[];
  description: string;
  href: string;
  linkClasses: string[];
}
export default class LinkField extends View<LinkFieldProps> {
  constructor(props: LinkFieldProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
