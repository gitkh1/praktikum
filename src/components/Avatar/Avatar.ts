import "./Avatar.scss";

import Block from "../../utils/Block";
import Templator from "../../utils/Templator";
import { template } from "./Avatar.tmpl";

type AvatarProps = {
  src: string;
  alt: string;
}

export default class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
