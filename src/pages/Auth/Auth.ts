import "../../layouts/Form.scss";

import Button from "../../components/Button/Button";
import ShortField from "../../components/Fields/ShortField/ShortField";
import Link from "../../components/Link/Link";
import Title from "../../components/Title/Title";
import formHandler from "../../utils/formHadler";
import View from "../../utils/View";
import { template } from "./Auth.tmpl";

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

class Auth extends View<object> {
  // Auth расширяет View, но ничего не передает во View.
  // Что нужно написать View<here> в определении класса View,
  // чтобы передавать пропсы по желанию?
  constructor() {
    super({
      formClasses: ['form', 'form--sign'],
      button: button,
      login: login,
      password: password,
      title: title,
      link: link,
      events: {
        submit: [formHandler, false],
        focus: [formHandler, true],
        blur: [formHandler, true],
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const auth = new Auth();

export { auth };
