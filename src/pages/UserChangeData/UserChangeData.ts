import '../../components/Avatar/Avatar.scss';

import Button from '../../components/Button/Button';
import LongField from '../../components/Fields/LongField/LongField';
import LabledInput from '../../components/Input/LabledInput/LabledInput';
import Title from '../../components/Title/Title';
import Block from '../../utils/Block';
import { formHandlers } from '../../utils/formHandlers';
import isEqual from '../../utils/isEqual';
import { mapUserToProps } from '../../utils/mapPropsFunctions';
import Store, { StoreEvents } from '../../utils/Store';
import template from './UserChangeData.tmpl';

const label = new LabledInput(
  {
    name: 'avatar',
    alt: 'Ваше фото',
  },
  'form__avatar'
);

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
  name: 'second_name',
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

const button = new Button(
  {
    description: 'Сохранить',
  },
  'form__field'
);

class UserChangeData extends Block<object> {
  constructor() {
    let state = mapUserToProps(Store.getState());
    super(
      {
        label,
        title,
        email,
        login,
        firstname,
        lastname,
        chatname,
        phone,
        button,
        events: { ...formHandlers, input: [changePhotoHandler, false] },
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
        title.setProps({ description: newState.display_name });
        chatname.setProps({ value: newState.display_name });
        label.setProps({ src: newState.avatar });
      }
      state = newState;
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const userchangedata = new UserChangeData();

export default userchangedata;

function changePhotoHandler(e: Event) {
  const fileReader = new FileReader();
  const target = e.target as HTMLInputElement;
  if (!target) {
    return;
  }
  const files = target.files;
  const file = files?.[0];
  if (!file) {
    return;
  }
  if (file.size > 1024 * 1024) {
    console.log('Файл слишком большой!');
    return;
  }
  fileReader.readAsDataURL(file);
  fileReader.addEventListener('load', () => {
    const form = target.closest('form');
    const img = form?.querySelector('img');
    if (!img) {
      return;
    }
    img.src = fileReader.result as string;
  });
}
