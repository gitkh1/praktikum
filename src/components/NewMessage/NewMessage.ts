import './NewMessage.scss';

import { formHandlers } from '../../controllers/FormsController';
import Block from '../../utils/Block';
import Templator from '../../utils/templator';
import template from './NewMessage.tmpl';

export default class NewMessage extends Block<object> {
  constructor() {
    super({
      events: formHandlers,
    }, 'chat__new-message');
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
