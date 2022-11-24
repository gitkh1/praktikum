import '../../layouts/Form.scss';
import '../../components/Avatar/Avatar.scss';

import Avatar from '../../components/Avatar/Avatar';
import LinkField from '../../components/Fields/LinkField/LinkField';
import LongField from '../../components/Fields/LongField/LongField';
import Title from '../../components/Title/Title';
import PATHS, { LOGOUT_PATH } from '../../controllers/Paths';
import { mapUserToProps } from '../../controllers/UserController';
import Block from '../../utils/Block';
import isEqual from '../../utils/isEqual';
import Store, { StoreEvents } from '../../utils/Store';
import template from './UserProfile.tmpl';

const avatar = new Avatar();

const title = new Title({
  description: 'Пользователь',
});

const email = new LongField({
  description: 'Почта',
  name: 'email',
  type: 'email',
  isDisabled: true,
});

const login = new LongField({
  description: 'Логин',
  name: 'login',
  type: 'text',
  isDisabled: true,
});

const firstname = new LongField({
  description: 'Имя',
  name: 'first_name',
  type: 'text',
  isDisabled: true,
});

const lastname = new LongField({
  description: 'Фамилия',
  name: 'second_name',
  type: 'text',
  isDisabled: true,
});

const chatname = new LongField({
  description: 'Имя в чате',
  name: 'display_name',
  type: 'text',
  isDisabled: true,
});

const phone = new LongField({
  description: 'Телефон',
  name: 'phone',
  type: 'phone',
  isDisabled: true,
});

const changedata = new LinkField({
  description: 'Изменить данные',
  href: PATHS.userchangedata,
});

const changepassword = new LinkField({
  description: 'Изменить пароль',
  href: PATHS.userchangepwd,
});

const gochats = new LinkField({
  description: 'Вернутся к чатам',
  href: PATHS.messenger,
});

const out = new LinkField({
  description: 'Выйти',
  href: LOGOUT_PATH,
  linkClasses: ['link--yellow'],
});

class UserProfile extends Block<object> {
  constructor() {
    let state = mapUserToProps(Store.getState());
    super(
      {
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
        gochats,
        out,
      },
      'root__inner'
    );

    Store.on(StoreEvents.Updated, () => {
      const newState = mapUserToProps(Store.getState());
      if (!isEqual(state, newState)) {
        email.setProps({ value: newState.email });
        phone.setProps({ value: newState.phone });
        firstname.setProps({ value: newState.first_name });
        lastname.setProps({ value: newState.second_name });
        login.setProps({ value: newState.login });
        chatname.setProps({ value: newState.display_name });
        title.setProps({ description: newState.display_name });
        avatar.setProps({ avatar: newState.avatar });
      }
      state = newState;
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const userprofile = new UserProfile();

export default userprofile;
