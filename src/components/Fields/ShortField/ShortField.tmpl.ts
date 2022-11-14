import '../../Input/Input.scss';

export const template = `<div class="{{%form__field field%}}">
  <div class="{{%field__description%}}">{{ description }}</div>
  <input class="{{%field__input%}}" type="{{type}}" name="{{name}}">
</div>`;
