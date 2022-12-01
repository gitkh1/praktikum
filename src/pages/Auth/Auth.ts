import Button from '../../components/Button/Button';
import ShortField from '../../components/Fields/ShortField/ShortField';
import Link from '../../components/Link/Link';
import Title from '../../components/Title/Title';
import PATHS from '../../controllers/Paths';
import Block from '../../utils/Block';
import { formHandlers } from '../../utils/formHandlers';
import template from './Auth.tmpl';

const title = new Title({
  description: 'Вход',
});

const login = new ShortField({
  description: 'Логин',
  name: 'login',
  type: 'text',
});

const password = new ShortField({
  description: 'Пароль',
  name: 'password',
  type: 'password',
});

const button = new Button(
  {
    description: 'Войти',
    classNames: ['btn', 'form__btn'],
  },
  'form__field'
);

const link = new Link(
  {
    linkClasses: ['link'],
    href: PATHS.sign,
    description: 'Нет аккаунта?',
  },
  'form__link'
);

class Auth extends Block<object> {
  constructor() {
    super(
      {
        button,
        login,
        password,
        title,
        link,
        events: formHandlers,
      },
      'root__inner'
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}

const auth = new Auth();

export default auth;
