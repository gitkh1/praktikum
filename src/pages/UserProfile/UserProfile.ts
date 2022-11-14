import '../../layouts/Form.scss';
import '../../components/Avatar/Avatar.scss';

import Avatar from '../../components/Avatar/Avatar';
import LinkField from '../../components/Fields/LinkField/LinkField';
import LongField from '../../components/Fields/LongField/LongField';
import Title from '../../components/Title/Title';
import Block from '../../utils/Block';
import PATHS from '../../utils/Paths';
import { template } from './UserProfile.tmpl';

const avatar = new Avatar({
  src: ' ',
  alt: 'Аватар пользователя',
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

const changedata = new LinkField({
  description: 'Изменить данные',
  href: PATHS.userchangedata,
});

const changepassword = new LinkField({
  description: 'Изменить пароль',
  href: PATHS.userchangepwd,
});

const out = new LinkField({
  description: 'Выйти',
  href: PATHS.messenger,
  linkClasses: ['link--yellow'],
});

class UserProfile extends Block<object> {
  constructor() {
    super({
      avatar,
      title,
      email,
      login,
      firstname,
      lastname,
      chatname,
      phone,
      changedata,
      changepassword,
      out,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const userprofile = new UserProfile();

export default userprofile;
