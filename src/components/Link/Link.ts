import "./Link.scss";

import Templator from "../../utils/Templator";
import View from "../../utils/View";
import { template } from "./Link.tmpl";

type LinkProps = {
  linkClasses: string[];
  href: string;
  description: string;
}

export default class Link extends View<LinkProps> {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
