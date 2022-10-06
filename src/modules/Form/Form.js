import Avatar from "../../components/Avatar/Avatar";
import Button from "../../components/Button/Button";
import { ShortField, LongField, LinkField } from "../../components/FormField/FormField";
import LabledInput from "../../components/Input/LabledInput";
import Link from "../../components/Link/Link";
import Title from "../../components/Title/Title";
import FormStyle from "./Form.scss";

const formSign = () =>
  `<form class="form form--sign">
    ${Title(['form__title'], 'Регистрация')}
    ${ShortField('{{Почта}}', 'email', 'email')}
    ${ShortField('{{Логин}}', 'login', 'text')}
    ${ShortField('{{Имя}}', 'first_name', 'text')}
    ${ShortField('{{Фамилия}}', 'second_name', 'text')}
    ${ShortField('{{Телефон}}', 'phone', 'phone')}
    ${ShortField('{{Пароль}}', 'password', 'password')}
    ${ShortField('{{Пароль (еще раз)}}', 'password', 'password')}
    ${Button('{{Зарегистрироваться}}', 'submit', ['btn', 'form__btn', 'form__field'])}
    ${Link('{{Войти}}', '#', ['link', 'form__link', 'form__field'])}
  </form>`;

const formAuth = () =>
  `<form class="form form--sign">
    ${Title(['form__title'], 'Вход')}
    ${ShortField('{{Логин}}', 'login', 'text')}
    ${ShortField('{{Пароль}}', 'password', 'password')}
    ${Button('{{Войти}}', 'submit', ['btn', 'form__btn', 'form__field'])}
    ${Link('{{Нет аккаунта?}}', '#', ['link', 'form__link', 'form__field'])}
  </form>`;

const formUserProfile = () =>
  `<form class="form form--user">
      ${Avatar(['label', 'avatar', 'form__avatar'])}
      ${Title(['form__title'], 'Пользователь')}
      ${LongField('{{Почта}}', 'email', 'email')}
      ${LongField('{{Логин}}', 'login', 'text')}
      ${LongField('{{Имя}}', 'first_name', 'text')}
      ${LongField('{{Фамилия}}', 'second_name', 'text')}
      ${LongField('{{Имя в чате}}', 'display_name', 'text')}
      ${LongField('{{Телефон}}', 'phone', 'phone')}
      <div class="form__actions">
        ${LinkField('{{Изменить данные}}', '#', ['link', 'form__link', 'link--long'])}
        ${LinkField('{{Изменить пароль}}', '#', ['link', 'form__link', 'link--long'])}
        ${LinkField('{{Выйти}}', '#', ['link', 'link--yellow', 'form__link', 'link--long'])}
      </div>
    </form>`;

const formUserChangeData = () =>
  `<form class="form form--user">
      ${LabledInput(['label__input'], ['label', 'avatar', 'form__avatar'], 'avatar')}
      ${Title(['form__title'], 'Пользователь')}
      ${LongField('{{Почта}}', 'email', 'email')}
      ${LongField('{{Логин}}', 'login', 'text')}
      ${LongField('{{Имя}}', 'first_name', 'text')}
      ${LongField('{{Фамилия}}', 'second_name', 'text')}
      ${LongField('{{Имя в чате}}', 'display_name', 'text')}
      ${LongField('{{Телефон}}', 'phone', 'phone')}
      ${Button('{{Сохранить}}', 'submit', ['btn', 'form__btn'])}
    </form>`;

const formUserChangePwd = () =>
  `<form class="form form--user">
      ${Avatar(['label', 'avatar', 'form__avatar'])}
      ${Title(['form__title'], 'Пользователь')}
      ${LongField('{{Старый пароль}}', 'oldPassword', 'password')}
      ${LongField('{{Новый пароль}}', 'newPassword', 'password')}
      ${LongField('{{Повторите новый пароль}}', 'newPassword', 'password')}
      ${Button('{{Сохранить}}', 'submit', ['btn', 'form__btn'])}
    </form>`;

export { formSign, formAuth, formUserProfile, formUserChangeData, formUserChangePwd };