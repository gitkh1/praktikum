import '../../layouts/Form.scss';
import '../../components/Avatar/Avatar.scss';

import Button from '../../components/Button/Button';
import LongField from '../../components/Fields/LongField/LongField';
import LabledInput from '../../components/Input/LabledInput/LabledInput';
import Title from '../../components/Title/Title';
import Block from '../../utils/Block';
import defaultEvents from '../../utils/formHadler';
import { template } from './UserChangeData.tmpl';

const label = new LabledInput({
  name: 'avatar',
  src: '',
  alt: 'Ваше фото',
});

const title = new Title({
  description: 'Пользователь',
});

const email = new LongField({
  description: 'Почта',
  name: 'email',
  type: 'email',
});

const login = new LongField({
  description: 'Логин',
  name: 'login',
  type: 'text',
});

const firstname = new LongField({
  description: 'Имя',
  name: 'first_name',
  type: 'text',
});

const lastname = new LongField({
  description: 'Фамилия',
  name: 'last_name',
  type: 'text',
});

const chatname = new LongField({
  description: 'Имя в чате',
  name: 'display_name',
  type: 'text',
});

const phone = new LongField({
  description: 'Телефон',
  name: 'phone',
  type: 'phone',
});

const button = new Button({
  description: 'Сохранить',
});

class UserChangeData extends Block<object> {
  constructor() {
    super({
      label,
      title,
      email,
      login,
      firstname,
      lastname,
      chatname,
      phone,
      button,
      events: defaultEvents,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const userchangedata = new UserChangeData();

export default userchangedata;
