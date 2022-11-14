import '../../layouts/Form.scss';
import '../../components/Avatar/Avatar.scss';

import Avatar from '../../components/Avatar/Avatar';
import Button from '../../components/Button/Button';
import LongField from '../../components/Fields/LongField/LongField';
import Title from '../../components/Title/Title';
import Block from '../../utils/Block';
import defaultEvents from '../../utils/formHadler';
import { template } from './UserChangePwd.tmpl';

const avatar = new Avatar({
  src: ' ',
  alt: ' ',
});

const title = new Title({
  description: 'Пользователь',
});

const oldpassword = new LongField({
  description: 'Старый пароль',
  name: 'oldPassword',
  type: 'password',
});

const password = new LongField({
  description: 'Новый пароль',
  name: 'newPassword',
  type: 'password',
});

const password2 = new LongField({
  description: 'Повторите новый пароль',
  name: 'newPassword',
  type: 'password',
});

const button = new Button({
  description: 'Сохранить',
});

class UserChangePwd extends Block<object> {
  constructor() {
    super({
      avatar,
      title,
      oldpassword,
      password,
      password2,
      button,
      events: defaultEvents,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const userchangepwd = new UserChangePwd();

export default userchangepwd;
