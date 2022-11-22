import '../../Link/Link.scss';
import '../Fields.scss';

import Block from '../../../utils/Block';
import Templator from '../../../utils/templator';
import template from './LinkField.tmpl';

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
    }, 'form__field');
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
