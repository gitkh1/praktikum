import FriendStyle from "./Friend.scss";

export default Friend = (className) =>

`<li class="friend ${className}">
    <div class="friend__photo">
      <img alt="" class="friend__img avatar">
    </div>
    <div class="friend__text">
      <div class="friend__name">{{Андрей}}</div>
      <div class="friend__message">{{Привет, как дела}}</div>
    </div>
    <div class="friend__info">
      <div class="friend__time">{{21:45}}</div>
      <div class="friend__unread">{{4}}</div>
    </div>
  </li>`;