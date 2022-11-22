import './Err.scss';

import Link from '../../components/Link/Link';
import Title from '../../components/Title/Title';
import PATHS from '../../controllers/Paths';
import Block from '../../utils/Block';
import template from './Err.tmpl';

type ErrProps = {
  link: Link;
  title: Title;
  description: string;
};

class Err extends Block<ErrProps> {
  constructor(props: ErrProps) {
    super(props, 'root__inner');
  }

  render() {
    return this.compile(template, this.props);
  }
}

const title = new Title({
  titleClasses: ['error__title'],
  description: '404',
});

const link = new Link({
  linkClasses: ['error__link', 'link'],
  href: PATHS.messenger,
  description: 'Назад к чатам',
}, 'errLink');

const err = new Err({
  link: link,
  title: title,
  description: 'Не туда попали',
});

export default err;
