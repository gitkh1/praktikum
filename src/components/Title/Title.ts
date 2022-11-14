import "./Title.scss";

import Block from "../../utils/Block";
import Templator from "../../utils/Templator";
import { template } from "./Title.tmpl";

type TitleProps = {
  titleClasses?: string[];
  description: string;
}

const DEFAULT_TITLE_CLASSES = ['form__title'];

export default class Title extends Block<TitleProps> {
  constructor(props: TitleProps) {
    super({
      ...props,
      titleClasses: props.titleClasses || DEFAULT_TITLE_CLASSES,
    });
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
