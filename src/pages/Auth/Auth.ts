import "../../layouts/Form.scss";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import ShortField from "../../components/Fields/ShortField/ShortField";
import Link from "../../components/Link/Link";
import View from "../../utils/View";
import { template } from "./Auth.tmpl";
import formHandler from "../../utils/formHadler";

class Auth extends View {
  constructor(props: object) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const title = new Title({
  titleClasses: ['form__title'],
  description: 'Вход',
})

const login = new ShortField({
  fieldClasses: ['form__field', 'field'],
  description: 'Логин',
  inputClasses: 'field__input',
  name: 'login',
  type: 'text',
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

const button = new Button({
  description: 'Войти',
  type: 'submit',
  classNames: ['btn', 'form__btn', 'form__field'],
})

const link = new Link({
  linkClasses: ['link', 'form__link', 'form__field'],
  href: '#sign',
  description: 'Нет аккаунта?',
})

const auth = new Auth({
  formClasses: ['form', 'form--sign'],
  button: button,
  login: login,
  password: password,
  title: title,
  link: link,
  events: {
    submit: formHandler,
    focusin: formHandler,
    focusout: formHandler,
  },
});

export { auth };
