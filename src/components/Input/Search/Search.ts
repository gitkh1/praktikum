import '../Input.scss';

import Block from '../../../utils/Block';
import { searchHandler } from '../../../utils/formHandlers';
import Templator from '../../../utils/templator';
import template from './Search.tmpl';

export default class Search extends Block<object> {
  constructor() {
    super({ events: searchHandler }, 'friends__search');
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
