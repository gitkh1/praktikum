import './Avatar.scss';

import saver from '../../images/saver.png';
import Block from '../../utils/Block';
import Templator from '../../utils/templator';
import template from './Avatar.tmpl';

type AvatarProps = {
  src: string;
};

export default class Avatar extends Block<AvatarProps> {
  constructor() {
    super({ src: `${saver}` }, 'form__avatar');
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
