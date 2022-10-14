export const template =
  `<div class="{{app}}">
  <div class="{{friends}}">
    <nav class="{{friends__menu}}">
      <div class="{{friends__profile}}">
        {{{ link }}}
      </div>
      <div class="{{friends__search}}">
        {{{ search }}}
      </div>
    </nav>
    {{{ userList }}}
  </div>
  <div class="{{%chat%}}">
    <div class="{{%chat__menu%}}">
      <div class="{{%chat__friend user%}}">
        <div class="{{%user__avatar avatar%}}">
          <img src="" alt="{{Фото друга}}" class="{{user__img}}">
        </div>
        <div class="{{user__name}}">{{Иван}}</div>
      </div>
      <a class="{{chat__control}}" href="{{#userprofile}}">
        <div class="{{chat__hamburger}}"></div>
      </a>
    </div>
    <div class="{{chat__wrapper}}">
      {{{ messageList }}}
    </div>
    <div class="{{chat__new-message}}">
      {{{ newmessage }}}
    </div>
  </div>
  </div>`;
