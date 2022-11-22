const template = `<div class="{{%friend__wrapper REPLACE%}}" data-id="{{ id }}">
  <div class="{{%friend__photo%}}">
        <img alt="{{%Фото друга%}}" class="{{%friend__img avatar%}}" src="{{ avatar }}">
      </div>
      <div class="{{%friend__text%}}">
        <div class="{{%friend__name%}}">{{chatname}}</div>
        <div class="{{%friend__message%}}">{{message}}</div>
      </div>
      <div class="{{%friend__info%}}">
        <time class="{{%friend__time%}}">{{time}}</time>
        <div class="{{ unreadClasses }}">{{unread}}</div>
      </div>
</div>`;

export default template;
