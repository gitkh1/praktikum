import './Button.scss';

import Block from '../../utils/Block';
import Templator from '../../utils/Templator';
import template from './Button.tmpl';

type ButtonProps = {
  classNames?: string[];
  description: string;
};

export const DEFAULT_BUTTON_CLASSES = ['btn', 'form__btn'];

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps, containerClassName?:string) {
    super({
      ...props,
      classNames: props.classNames || DEFAULT_BUTTON_CLASSES,
    }, containerClassName);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
