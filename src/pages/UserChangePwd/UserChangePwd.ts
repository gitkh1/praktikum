import "../../layouts/Form.scss";
import "../../components/Avatar/Avatar.scss";

import Avatar from "../../components/Avatar/Avatar";
import Title from "../../components/Title/Title";
import LongField from "../../components/Fields/LongField/LongField";
import Button from "../../components/Button/Button";
import Block from "../../utils/Block";
import { template } from "./UserChangePwd.tmpl";

class UserChangePwd extends Block {
  constructor(props: object) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const avatar = new Avatar({
  labelClasses: ['label', 'avatar', 'form__avatar'],
  src: ' ',
  alt: ' '
})

const title = new Title({
  titleClasses: ['form__title'],
  description: 'Пользователь',
})

const oldpassword = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Старый пароль',
  inputClasses: ['field__input','field__input--long'],
  name: 'oldPassword',
  type: 'password',
  placeholder: ' ',
})

const password = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Новый пароль',
  inputClasses: ['field__input','field__input--long'],
  name: 'newPassword',
  type: 'password',
  placeholder: ' ',
})

const password2 = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Повторите новый пароль',
  inputClasses: ['field__input','field__input--long'],
  name: 'newPassword',
  type: 'password',
  placeholder: ' ',
})

const button = new Button({
  description: 'Сохранить',
  type: 'submit',
  classNames: ['btn', 'form__btn'],
})

const userpwd = new UserChangePwd({
  formClasses: ['form', 'form--user'],
  avatar: avatar,
  title: title,
  oldpassword: oldpassword,
  password: password,
  password2: password2,
  button: button,
});

export { userpwd };
