import '../Input.scss';

import Block from '../../../utils/Block';
import Templator from '../../../utils/Templator';
import { template } from './Search.tmpl';

export default class Search extends Block<object> {
  constructor() {
    super({});
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
