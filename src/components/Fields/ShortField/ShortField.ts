import '../../Input/Input.scss';
import '../Fields.scss';

import Block from '../../../utils/Block';
import Templator from '../../../utils/templator';
import template from './ShortField.tmpl';

type ShortFieldProps = {
  description: string;
  name: string;
  type: string;
};
export default class ShortField extends Block<ShortFieldProps> {
  constructor(props: ShortFieldProps) {
    super(props, 'form__field');
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
