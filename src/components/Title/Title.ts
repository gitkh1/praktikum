import Block from '../../utils/Block';
import Templator from '../../utils/templator';
import template from './Title.tmpl';

type TitleProps = {
  titleClasses?: string[];
  description: string;
};

export default class Title extends Block<TitleProps> {
  constructor(props: TitleProps) {
    super(
      {
        ...props,
        titleClasses: props.titleClasses || [''],
      },
      'form__title'
    );
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
