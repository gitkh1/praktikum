import MessageStyle from "./Message.scss"

const Message = (content, time) =>
  `<div class="message">
    <div class="message__content">{{${content}}}</div>
    <div class="message__time">{{${time}}}</div>
  </div>`;

export default Message;