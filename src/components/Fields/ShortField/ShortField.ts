import '../Fields.scss';

import Block from '../../../utils/Block';
import Templator from '../../../utils/Templator';
import { template } from './ShortField.tmpl';

type ShortFieldProps = {
  description: string;
  name: string;
  type: string;
};
export default class ShortField extends Block<ShortFieldProps> {
  constructor(props: ShortFieldProps) {
    super(props);
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
