import '../Input.scss';

import EventHandler from '../../../types/Events';
import Block from '../../../utils/Block';
import Templator from '../../../utils/templator';
import saver from '../../Avatar/saver.png';
import template from './LabledInput.tmpl';

type LabledInputProps = {
  name: string;
  src?: string;
  alt: string;
  events?: EventHandler
};

export default class LabledInput extends Block<LabledInputProps> {
  constructor(props: LabledInputProps, containerClassName?:string) {
    super({
      name: props.name,
      src: props.src || (saver as string),
      alt: props.alt,
    }, containerClassName);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
