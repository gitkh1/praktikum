const template = `<div class="{{%field field--long%}}">
    <div class="{{%field__description field__description--long%}}">{{description}}</div>
    <input class="{{%field__input field__input--long%}}" type="{{type}}" name="{{name}}" disabled="{{?isDisabled}}" value="{{value}}">
  </div>`;

export default template;
