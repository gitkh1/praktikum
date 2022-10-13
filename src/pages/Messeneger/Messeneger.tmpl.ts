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
    <ul class="{{friends__list}}">
      {{{ friend1 }}}
      {{{ friend2 }}}
      {{{ friend3 }}}
      {{{ friend4 }}}
    </ul>
  </div>
  <div class="{{%chat%}}">
    <div class="{{%chat__menu%}}">
      <div class="{{%chat__friend user%}}">
        <div class="{{%user__avatar avatar%}}">
          <img src="" alt="" class="{{user__img}}">
        </div>
        <div class="{{user__name}}">{{Иван}}</div>
      </div>
      <div class="{{chat__hamburger}}"></div>
    </div>
    <div class="{{chat__wrapper}}">
      <div class="{{chat__content}}">
        {{{ message1 }}}
      </div>
    </div>
    <div class="{{chat__new-message}}">
      {{{ newmessage }}}
    </div>
  </div>
  </div>`;
