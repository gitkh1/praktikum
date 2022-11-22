import '../../layouts/Form.scss';

import Button from '../../components/Button/Button';
import ShortField from '../../components/Fields/ShortField/ShortField';
import Link from '../../components/Link/Link';
import Title from '../../components/Title/Title';
import { formHandlers } from '../../controllers/FormsController';
import PATHS from '../../controllers/Paths';
import Block from '../../utils/Block';
import template from './Sign.tmpl';

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
  name: 'second_name',
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
  name: 'password2',
  type: 'password',
});

const button = new Button(
  {
    description: 'Зарегистрироваться',
    classNames: ['btn', 'form__btn'],
  },
  'form__field'
);

const link = new Link(
  {
    linkClasses: ['link'],
    href: PATHS.auth,
    description: 'Войти',
  },
  'form__link'
);

class Sign extends Block<object> {
  constructor() {
    super(
      {
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
        events: formHandlers,
      },
      'root__inner'
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}

const sign = new Sign();

export default sign;
