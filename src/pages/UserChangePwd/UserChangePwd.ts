import "../../layouts/Form.scss";
import "../../components/Avatar/Avatar.scss";

import Avatar from "../../components/Avatar/Avatar";
import Button from "../../components/Button/Button";
import LongField from "../../components/Fields/LongField/LongField";
import Title from "../../components/Title/Title";
import formHandler from "../../utils/formHadler";
import View, {EventListeners} from "../../utils/View";
import { template } from "./UserChangePwd.tmpl";

type UserChangePwdProps = {
  formClasses: string[];
  avatar: Avatar;
  title: Title;
  oldpassword: LongField;
  password: LongField;
  password2: LongField;
  button: Button;
  events: EventListeners;
}

class UserChangePwd extends View<UserChangePwdProps> {
  constructor(props: UserChangePwdProps) {
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

// Может css классы всех компонентов сразу записать в шаблон?
// В пропсах тогда передавать динамические поля и поля, которые могут
// быть различными в пределах одного приложения?
const oldpassword = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Старый пароль',
  inputClasses: ['field__input', 'field__input--long'],
  name: 'oldPassword',
  type: 'password',
  placeholder: ' ',
})

const password = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Новый пароль',
  inputClasses: ['field__input', 'field__input--long'],
  name: 'newPassword',
  type: 'password',
  placeholder: ' ',
})

const password2 = new LongField({
  fieldClasses: ['form__field', 'field', 'field--long'],
  fieldInnerClasses: ['field__description', 'field__description--long'],
  description: 'Повторите новый пароль',
  inputClasses: ['field__input', 'field__input--long'],
  name: 'newPassword',
  type: 'password',
  placeholder: ' ',
})

const button = new Button({
  description: 'Сохранить',
  type: 'submit',
  classNames: ['btn', 'form__btn'],
})

const userchangepwd = new UserChangePwd({
  formClasses: ['form', 'form--user'],
  avatar: avatar,
  title: title,
  oldpassword: oldpassword,
  password: password,
  password2: password2,
  button: button,
  events: {
    submit: [formHandler, false],
    focus: [formHandler, true],
    blur: [formHandler, true],
  },
});

export { userchangepwd };
