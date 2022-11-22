import { DEFAULT_BUTTON_CLASSES } from '../../components/Button/Button';

const template = `<form class="{{%form form--popup%}}" data-form="{{ formType }}">
      <div class="{{%form__title%}}">
        <h1>{{ title }}</h1>
      </div>
      <div class="{{%form__field%}}">
        <div class="{{%field%}}">
          <div class="{{%field__description%}}">{{ description }}</div>
          <input class="{{%field__input%}}" type="{{ inputType }}" name="{{ inputName }}">
        </div>
      </div>
      <div class="{{%form__field%}}">
        <button class="{{%${DEFAULT_BUTTON_CLASSES.join(' ')}%}}" type="{{%submit%}}">{{ buttonTitle }}</button>
      </div>
    </form>`;

export default template;
