import '../Input.scss';

import { searchHandler } from '../../../controllers/FormsController';
import Block from '../../../utils/Block';
import Templator from '../../../utils/Templator';
import template from './Search.tmpl';

export default class Search extends Block<object> {
  constructor() {
    super({ events: searchHandler }, 'friends__search');
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
