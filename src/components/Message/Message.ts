// @ts-expect-error TS(2307): Cannot find module './Message.scss' or its corresp... Remove this comment to see the full error message
import MessageStyle from "./Message.scss"

const Message = (content: any, time: any) =>
  `<div class="message">
    <div class="message__content">{{${content}}}</div>
    <time class="message__time">{{${time}}}</time>
  </div>`;

export default Message;
