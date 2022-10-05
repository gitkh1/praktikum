import Button from "../../components/Button/Button";
import FormField from "../../components/FormField/FormField";
import AvatarInput from "../../components/input/AvatarInput";
import Input from "../../components/Input/Input";
import Link from "../../components/Link/Link";
import Title from "../../components/Title/Title";
import FormStyle from "./Form.scss";

const formSign = () =>
  `<form class="form">
    ${Title(['form__title'], 'Регистрация')}
    ${FormField('{{Почта}}', 'email', 'email')}
    ${FormField('{{Логин}}', 'login', 'text')}
    ${FormField('{{Имя}}', 'first_name', 'text')}
    ${FormField('{{Фамилия}}', 'second_name', 'text')}
    ${FormField('{{Телефон}}', 'phone', 'phone')}
    ${FormField('{{Пароль}}', 'password', 'password')}
    ${FormField('{{Пароль (еще раз)}}', 'password', 'password')}
    <div class="form__actions">
      ${Button('{{Зарегистрироваться}}', ['btn', 'form__btn'])}
      ${Link('{{Войти}}', '{{#}}', ['link', 'form__link'])}
    </div>
  </form>`;

const formAuth = () =>
  `<form class="form">
    ${Title(['form__title'], 'Вход')}
    ${FormField('{{Логин}}', 'login', 'text')}
    ${FormField('{{Пароль}}', 'password', 'password')}
    <div class="form__actions">
      ${Link('{{Войти}}', '{{#}}', ['btn', 'form__btn'])}
      ${Link('{{Нет аккаунта?}}', '{{#}}', ['link', 'form__link'])}
    </div>
  </form>`;

const formUserProfile = () =>
  `<form class="form form--user">
      ${AvatarInput(['input', 'input--file'], ['label', 'avatar'], 'avatar')}
      ${Title(['form__title'], 'Пользователь')}
      ${FormField('{{Почта}}', 'email', 'email', true)}
      ${FormField('{{Логин}}', 'login', 'text', true)}
      ${FormField('{{Имя}}', 'first_name', 'text', true)}
      ${FormField('{{Фамилия}}', 'second_name', 'text', true)}
      ${FormField('{{Имя в чате}}', 'display_name', 'text', true)}
      ${FormField('{{Телефон}}', 'phone', 'phone', true)}
      <div class="form__actions">
        ${Link('{{Изменить данные}}', '{{#}}', ['link', 'form__link', 'link--long'])}
        ${Link('{{Изменить пароль}}', '{{#}}', ['link', 'form__link', 'link--long'])}
        ${Link('{{Выйти}}', '{{#}}', ['link', 'link--blue', 'form__link', 'link--long'])}
      </div>
    </form>`;

const formUserChangeData = () =>
  `<form class="form form--user">
      ${AvatarInput(['input', 'input--file'], ['label', 'avatar'], 'avatar')}
      ${FormField('{{Почта}}', 'email', 'email', true)}
      ${FormField('{{Логин}}', 'login', 'text', true)}
      ${FormField('{{Имя}}', 'first_name', 'text', true)}
      ${FormField('{{Фамилия}}', 'second_name', 'text', true)}
      ${FormField('{{Имя в чате}}', 'display_name', 'text', true)}
      ${FormField('{{Телефон}}', 'phone', 'phone', true)}
      ${Link('{{Сохранить}}', '{{#}}', ['btn', 'form__btn'])}
      </form>`;


export { formSign, formAuth, formUserProfile, formUserChangeData };