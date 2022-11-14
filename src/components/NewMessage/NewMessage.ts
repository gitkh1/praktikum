import './NewMessage.scss';

import Block from '../../utils/Block';
import defaultEvents from '../../utils/formHadler';
import Templator from '../../utils/Templator';
import { template } from './NewMessage.tmpl';

export default class NewMessage extends Block<object> {
  constructor() {
    super({
      events: defaultEvents,
    });
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
