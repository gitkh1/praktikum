import '../Fields.scss';

import Block from '../../../utils/Block';
import Templator from '../../../utils/Templator';
import { template } from './LinkField.tmpl';

type LinkFieldProps = {
  description: string;
  href: string;
  linkClasses?: string[];
};

const DEFAULT_LINK_CLASSES = ['link', 'form__link', 'link--long'];

export default class LinkField extends Block<LinkFieldProps> {
  constructor(props: LinkFieldProps) {
    super({
      ...props,
      linkClasses: [...DEFAULT_LINK_CLASSES, ...(props.linkClasses || [''])],
    });
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
