import '../../layouts/Form.scss';

import Button from '../../components/Button/Button';
import ShortField from '../../components/Fields/ShortField/ShortField';
import Link from '../../components/Link/Link';
import Title from '../../components/Title/Title';
import Block from '../../utils/Block';
import defaultEvents from '../../utils/formHadler';
import PATHS from '../../utils/Paths';
import { template } from './Sign.tmpl';

const title = new Title({
  description: 'Регистрация',
});

const email = new ShortField({
  description: 'Почта',
  name: 'email',
  type: 'email',
});

const login = new ShortField({
  description: 'Логин',
  name: 'login',
  type: 'text',
});

const firstname = new ShortField({
  description: 'Имя',
  name: 'first_name',
  type: 'text',
});

const lastname = new ShortField({
  description: 'Фамилия',
  name: 'last_name',
  type: 'text',
});

const phone = new ShortField({
  description: 'Телефон',
  name: 'phone',
  type: 'phone',
});

const password = new ShortField({
  description: 'Пароль',
  name: 'password',
  type: 'password',
});

const password2 = new ShortField({
  description: 'Пароль (еще раз)',
  name: 'password',
  type: 'password',
});

const button = new Button({
  description: 'Зарегистрироваться',
  classNames: ['btn', 'form__btn', 'form__field'],
});

const link = new Link({
  linkClasses: ['link', 'form__link', 'form__field'],
  href: PATHS.auth,
  description: 'Войти',
});

class Sign extends Block<object> {
  constructor() {
    super({
      title,
      email,
      firstname,
      lastname,
      phone,
      login,
      password,
      password2,
      button,
      link,
      events: defaultEvents,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const sign = new Sign();

export default sign;
