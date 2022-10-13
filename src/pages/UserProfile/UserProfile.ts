import "../../layouts/Form.scss";
import "../../components/Avatar/Avatar.scss";

import Avatar from "../../components/Avatar/Avatar";
import Title from "../../components/Title/Title";
import LongField from "../../components/Fields/LongField/LongField";
import LinkField from "../../components/Fields/LinkField/LinkField";
import Block from "../../utils/Block";
import { template } from "./UserProfile.tmpl";

class UserProfile extends Block {
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

const email = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Почта',
  inputClasses: ['field__input','field__input--long'],
  name: 'email',
  type: 'email',
  placeholder: ' ',
})

const login = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Логин',
  inputClasses: ['field__input','field__input--long'],
  name: 'login',
  type: 'text',
  placeholder: ' ',
})

const firstname = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Имя',
  inputClasses: ['field__input','field__input--long'],
  name: 'first_name',
  type: 'text',
  placeholder: ' ',
})

const lastname = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Фамилия',
  inputClasses: ['field__input','field__input--long'],
  name: 'last_name',
  type: 'text',
  placeholder: ' ',
})

const chatname = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Имя в чате',
  inputClasses: ['field__input','field__input--long'],
  name: 'display_name',
  type: 'text',
  placeholder: ' ',
})

const phone = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Телефон',
  inputClasses: ['field__input','field__input--long'],
  name: 'phone',
  type: 'phone',
  placeholder: ' ',
})

const changedata = new LinkField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  description: 'Изменить данные',
  href: '#',
  linkClasses: ['link', 'form__link', 'link--long'],
})

const changepassword = new LinkField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  description: 'Изменить пароль',
  href: '#',
  linkClasses: ['link', 'form__link', 'link--long'],
})

const out = new LinkField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  description: 'Выйти',
  href: '#',
  linkClasses: ['link', 'link--yellow', 'form__link', 'link--long'],
})

const userprofile = new UserProfile({
  formClasses: ['form', 'form--user'],
  avatar: avatar,
  title: title,
  email: email,
  login: login,
  firstname: firstname,
  lastname: lastname,
  chatname: chatname,
  phone: phone,
  changedata: changedata,
  changepassword: changepassword,
  out: out,
});

export { userprofile };
