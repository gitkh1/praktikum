import "../../layouts/Form.scss";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import ShortField from "../../components/Fields/ShortField/ShortField";
import Link from "../../components/Link/Link";
import View from "../../utils/View";
import { template } from "./Sign.tmpl";
import formHandler from "../../utils/formHadler";

class Sign extends View {
  constructor(props: object) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const title = new Title({
  titleClasses: ['form__title'],
  description: 'Регистрация',
})

const email = new ShortField({
  fieldClasses: ['form__field', 'field'],
  description: 'Почта',
  inputClasses: 'field__input',
  name: 'email',
  type: 'email',
  placeholder: ' ',
})

const login = new ShortField({
  fieldClasses: ['form__field', 'field'],
  description: 'Логин',
  inputClasses: 'field__input',
  name: 'login',
  type: 'text',
  placeholder: ' ',
})

const firstname = new ShortField({
  fieldClasses: ['form__field', 'field'],
  description: 'Имя',
  inputClasses: 'field__input',
  name: 'first_name',
  type: 'text',
  placeholder: ' ',
})

const lastname = new ShortField({
  fieldClasses: ['form__field', 'field'],
  description: 'Фамилия',
  inputClasses: 'field__input',
  name: 'last_name',
  type: 'text',
  placeholder: ' ',
})

const phone = new ShortField({
  fieldClasses: ['form__field', 'field'],
  description: 'Телефон',
  inputClasses: 'field__input',
  name: 'phone',
  type: 'phone',
  placeholder: ' ',
})

const password = new ShortField({
  fieldClasses: ['form__field', 'field'],
  description: 'Пароль',
  inputClasses: 'field__input',
  name: 'password',
  type: 'password',
  placeholder: ' ',
})

const password2 = new ShortField({
  fieldClasses: ['form__field', 'field'],
  description: 'Пароль (еще раз)',
  inputClasses: 'field__input',
  name: 'password',
  type: 'password',
  placeholder: ' ',
})

const button = new Button({
  description: 'Зарегистрироваться',
  type: 'submit',
  classNames: ['btn', 'form__btn', 'form__field'],
})

const link = new Link({
  linkClasses: ['link', 'form__link', 'form__field'],
  href: '#auth',
  description: 'Войти',
})

const sign = new Sign({
  formClasses: ['form', 'form--sign'],
  title: title,
  email: email,
  firstname: firstname,
  lastname: lastname,
  phone: phone,
  login: login,
  password: password,
  password2: password2,
  button: button,
  link: link,
  events: {
    submit: formHandler,
    focusin: formHandler,
    focusout: formHandler,
  },
});

export { sign };
