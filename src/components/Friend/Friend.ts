// @ts-expect-error TS(2307): Cannot find module './Friend.scss' or its correspo... Remove this comment to see the full error message
import FriendStyle from "./Friend.scss";

const Friend = (className: any) => `<li class="friend ${className}">
  <div class="friend__photo">
    <img alt="" class="friend__img avatar">
  </div>
  <div class="friend__text">
    <div class="friend__name">{{Андрей}}</div>
    <div class="friend__message">{{Привет, как дела}}</div>
  </div>
  <div class="friend__info">
    <time class="friend__time">{{21:45}}</time>
    <div class="friend__unread">{{4}}</div>
  </div>
</li>`;

export default Friend;
