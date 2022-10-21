import "./Title.scss";

import Templator from "../../utils/Templator";
import View from "../../utils/View";
import { template } from "./Title.tmpl";

type TitleProps = {
  titleClasses: string[];
  description: string;
}

export default class Title extends View<TitleProps> {
  constructor(props: TitleProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
