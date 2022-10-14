import scrap from "./scrap.svg";

export const template =
  `<form action="{{#}}" class="{{%chat__form new-msg%}}">
    <label class="{{%label new-msg__field%}}">
      <img src="{{${scrap}}}" alt="{{Приложить файл}}">
      <input class="{{label__input}}" type="{{file}}" name="{{file}}">
    </label>
    <input class="{{%colored-input new-msg__field new-msg__field--msg%}}" type="{{text}}" name="{{message}}" placeholder="{{Поиск}}">
    <button class="{{%new-msg__field new-msg__field--btn%}}" type="{{submit}}"></button>
  </form>`;
