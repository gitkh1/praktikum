import "./Avatar.scss";

import Templator from "../../utils/Templator";
import View from "../../utils/View";
import { template } from "./Avatar.tmpl";

type AvatarProps = {
  labelClasses: string[];
  src: string;
  alt: string;
}

export default class Avatar extends View<AvatarProps> {
  constructor(props: AvatarProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
