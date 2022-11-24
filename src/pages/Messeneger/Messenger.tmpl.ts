import { POPUP_DATA } from '../../modules/PopUpInput/PopUpInput';
import FORM_TYPES from '../../types/FormTypes';

export const CHAT_CLASS = 'chat';

const template = `<div class="{{%app%}}">
  <div class="{{%friends%}}">
    <nav class="{{%friends__menu%}}">
      <div class="{{%friends__links%}}">
        {{{ linknewchat }}}
        {{{ linkprofile }}}
      </div>
      {{{ search }}}
    </nav>
    {{{ userList }}}
  </div>
  <div class="{{%${CHAT_CLASS}%}}">
    <div class="{{%chat__menu%}}">
      <div class="{{%chat__friend user%}}">
        <div class="{{%user__avatar%}}">
          <img src="{{user.avatar}}" class="{{%avatar%}}" alt="{{%Аватар пользователя%}}">
        </div>
        <div class="{{%user__name%}}">{{user.display_name}}</div>
      </div>
      {{{ chatUsers }}}
      <div class="{{%chat__control control%}}">
        <div class="{{%control__active%}}">
          <div class="{{%control__hamburger%}}"></div>
        </div>
        <div class="{{%control__popup%}}">
          <div class="{{%control__links%}}">
            <a class="{{%link control__link%}}" href="{{%#${
              FORM_TYPES.ADD_USER
            }%}}">{{%${POPUP_DATA[FORM_TYPES.ADD_USER].title}%}}</a>
            <a class="{{%link control__link%}}" href="{{%#${
              FORM_TYPES.REMOVE_USER
            }%}}">{{%${POPUP_DATA[FORM_TYPES.REMOVE_USER].title}%}}</a>
            <a class="{{%link control__link%}}" href="{{%#${
              FORM_TYPES.CHAT_PHOTO
            }%}}">{{%${POPUP_DATA[FORM_TYPES.CHAT_PHOTO].title}%}}</a>
          </div>
        </div>
      </div>
    </div>
    {{{ messageList }}}
    {{{ newmessage }}}
  </div>
    {{{ newchatpopup }}}
  </div>`;

export default template;
