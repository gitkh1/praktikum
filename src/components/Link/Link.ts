import './Link.scss';

import Block from '../../utils/Block';
import Templator from '../../utils/templator';
import template from './Link.tmpl';

type LinkProps = {
  linkClasses: string[];
  href: string;
  description: string;
};

export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps, containerClassName?:string) {
    super(props, containerClassName);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
