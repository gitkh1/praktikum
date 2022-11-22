import FORM_TYPES from '../../types/FormTypes';
import scrap from './scrap.svg';

const template = `<form class="{{%chat__form new-msg%}}" data-form="{{%${FORM_TYPES.NEW_MESSAGE}%}}">
    <label class="{{%label new-msg__field new-msg__field--file%}}">
      <img src="{{${scrap}}}" alt="{{%Приложить файл%}}">
      <input class="{{%label__input%}}" type="{{%file%}}" name="{{%file%}}">
    </label>
    <input class="{{%colored-input new-msg__field new-msg__field--msg%}}" type="{{text}}" name="{{%message%}}" placeholder="{{%Поиск%}}">
    <button class="{{%new-msg__field new-msg__field--btn%}}" type="{{%submit%}}"></button>
  </form>`;

export default template;
