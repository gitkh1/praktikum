import FORM_TYPES from '../../types/FormTypes';

const template = `<form class="{{%chat__form new-msg%}}" data-form="{{%${FORM_TYPES.NEW_MESSAGE}%}}">
    <label class="{{%label new-msg__field new-msg__field--file%}}">
      <img alt="{{%Приложить файл%}}">
      <input class="{{%label__input%}}" type="{{%file%}}" name="{{%file%}}">
    </label>
    <input class="{{%colored-input new-msg__field new-msg__field--msg%}}" type="{{text}}" name="{{%message%}}" placeholder="{{%Сообщение%}}">
    <button class="{{%new-msg__field new-msg__field--btn%}}" type="{{%submit%}}"></button>
  </form>`;

export default template;
