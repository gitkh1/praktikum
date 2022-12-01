import '../Input.scss';

import saver from '../../../images/saver.png';
import EventHandler from '../../../types/Events';
import Block from '../../../utils/Block';
import Templator from '../../../utils/templator';
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
