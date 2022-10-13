import "./Err.scss";
import { template } from "./Err.tmpl";
import Link from "../../components/Link/Link";
import Block from "../../utils/View";

export class Err extends Block {
  constructor(props: object) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const link = new Link({
  linkClasses: ['error__link', 'link'],
  href: '#',
  description: 'Назад к чатам',
})
