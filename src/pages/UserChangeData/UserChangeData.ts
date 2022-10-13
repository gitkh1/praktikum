import "../../layouts/Form.scss";
import "../../components/Avatar/Avatar.scss"

import Title from "../../components/Title/Title";
import LongField from "../../components/Fields/LongField/LongField";
import Button from "../../components/Button/Button";
import Block from "../../utils/Block";
import { template } from "./UserChangeData.tmpl";
import LabledInput from "../../components/Input/LabledInput/LabledInput";

class UserChangeData extends Block {
  constructor(props: object) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const label = new LabledInput({
  inputClasses: ['label__input'],
  labelClasses: ['label', 'avatar', 'form__avatar'],
  name: 'avatar',
  src: '#',
})

const title = new Title({
  titleClasses: ['form__title'],
  description: 'Пользователь',
})

const email = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Почта',
  inputClasses: ['field__input', 'field__input--long'],
  name: 'email',
  type: 'email',
  placeholder: ' ',
})

const login = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Логин',
  inputClasses: ['field__input', 'field__input--long'],
  name: 'login',
  type: 'text',
  placeholder: ' ',
})

const firstname = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Имя',
  inputClasses: ['field__input', 'field__input--long'],
  name: 'first_name',
  type: 'text',
  placeholder: ' ',
})

const lastname = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Фамилия',
  inputClasses: ['field__input', 'field__input--long'],
  name: 'last_name',
  type: 'text',
  placeholder: ' ',
})

const chatname = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Имя в чате',
  inputClasses: ['field__input', 'field__input--long'],
  name: 'display_name',
  type: 'text',
  placeholder: ' ',
})

const phone = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Телефон',
  inputClasses: ['field__input', 'field__input--long'],
  name: 'phone',
  type: 'phone',
  placeholder: ' ',
})

const button = new Button({
  description: 'Сохранить',
  type: 'submit',
  classNames: ['btn', 'form__btn'],
})

const userchangedata = new UserChangeData({
  formClasses: ['form', 'form--user'],
  label: label,
  title: title,
  email: email,
  login: login,
  firstname: firstname,
  lastname: lastname,
  chatname: chatname,
  phone: phone,
  button: button,
});

export { userchangedata };
