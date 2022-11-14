import '../Input.scss';

import Block from '../../../utils/Block';
import Templator from '../../../utils/Templator';
import saver from '../../Avatar/saver.png';
import { template } from './LabledInput.tmpl';

type LabledInputProps = {
  name: string;
  src: string;
  alt: string;
};

export default class LabledInput extends Block<LabledInputProps> {
  constructor(props: LabledInputProps) {
    super({
      name: props.name,
      src: props.src || (saver as string),
      alt: props.alt,
    });
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
