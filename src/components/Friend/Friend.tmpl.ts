import "../Avatar/Avatar.scss";

export const template =
  `<li class="{{friend}}">
    <div class="{{friend__photo}}">
      <img alt="{{Фото друга}}" class="{{%friend__img avatar%}}">
    </div>
    <div class="{{friend__text}}">
      <div class="{{friend__name}}">{{chatname}}</div>
      <div class="{{friend__message}}">{{message}}</div>
    </div>
    <div class="{{friend__info}}">
      <time class="{{friend__time}}">{{time}}</time>
      <div class="{{friend__unread}}">{{unread}}</div>
    </div>
  </li>`;
