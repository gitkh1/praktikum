import '../../layouts/Form.scss';

import Button from '../../components/Button/Button';
import ShortField from '../../components/Fields/ShortField/ShortField';
import Link from '../../components/Link/Link';
import Title from '../../components/Title/Title';
import Block from '../../utils/Block';
import defaultEvents from '../../utils/formHadler';
import PATHS from '../../utils/Paths';
import { template } from './Auth.tmpl';

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

const button = new Button({
  description: 'Войти',
  classNames: ['btn', 'form__btn', 'form__field'],
});

const link = new Link({
  linkClasses: ['link', 'form__link', 'form__field'],
  href: PATHS.sign,
  description: 'Нет аккаунта?',
});

class Auth extends Block<object> {
  constructor() {
    super({
      button,
      login,
      password,
      title,
      link,
      events: defaultEvents,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const auth = new Auth();

export default auth;
