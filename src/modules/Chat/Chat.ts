import Message from "../../components/Message/Message";
import NewMessage from "../../components/NewMessage/NewMessage";
// @ts-expect-error TS(2307): Cannot find module './Chat.scss' or its correspond... Remove this comment to see the full error message
import ChatStyle from "./Chat.scss";

const Chat = () =>

  `<div class="chat">
    <div class="chat__menu">
      <div class="chat__friend user">
        <div class="user__avatar avatar">
          <img src="" alt="" class="user__img">
        </div>
        <div class="user__name">{{Иван}}</div>
      </div>
      <div class="chat__hamburger"></div>
    </div>
    <div class="chat__wrapper">
      <div class="chat__content">
        ${Message('Привет', '21:45')}
      </div>
    </div>
    <div class="chat__new-message">
      ${NewMessage()}
    </div>
  </div>`;

export default Chat;
