import '../../layouts/Form.scss';
import '../../components/Avatar/Avatar.scss';

import Avatar from '../../components/Avatar/Avatar';
import Button from '../../components/Button/Button';
import LongField from '../../components/Fields/LongField/LongField';
import Title from '../../components/Title/Title';
import { formHandlers } from '../../controllers/FormsController';
import { mapUserToProps } from '../../controllers/UserController';
import Block from '../../utils/Block';
import isEqual from '../../utils/isEqual';
import Store, { StoreEvents } from '../../utils/Store';
import template from './UserChangePwd.tmpl';

const avatar = new Avatar();

const title = new Title({
  description: 'Пользователь',
});

const oldpassword = new LongField({
  description: 'Старый пароль',
  name: 'oldPassword',
  type: 'password',
  value: '',
});

const password = new LongField({
  description: 'Новый пароль',
  name: 'newPassword',
  type: 'password',
});

const password2 = new LongField({
  description: 'Повторите новый пароль',
  name: 'newPassword2',
  type: 'password',
});

const button = new Button(
  {
    description: 'Сохранить',
  },
  'form__field'
);

class UserChangePwd extends Block<object> {
  constructor() {
    let state = mapUserToProps(Store.getState());
    super(
      {
        avatar,
        title,
        oldpassword,
        password,
        password2,
        button,
        events: formHandlers,
      },
      'root__inner'
    );

    Store.on(StoreEvents.Updated, () => {
      const newState = mapUserToProps(Store.getState());
      if (!isEqual(state, newState)) {
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

const userchangepwd = new UserChangePwd();

export default userchangepwd;
