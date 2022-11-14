import "./Link.scss";

import Block from "../../utils/Block";
import Templator from "../../utils/Templator";
import { template } from "./Link.tmpl";

type LinkProps = {
  linkClasses: string[];
  href: string;
  description: string;
}

export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
