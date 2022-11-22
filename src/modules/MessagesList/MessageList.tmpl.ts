import Templator from '../../utils/templator';

export type MessageProps = {
  content: string;
  time: string;
  user_id: string;
};

export const MESSAGES_CONTAINER = 'chat__content';

const firstAnotherMsgTmpl = (message: MessageProps, name: string) =>
  `<div class="{{%message message--another%}}">
  <div class="{{%message__name%}}">{{%${name}%}}</div>
  <div class="{{%message__content%}}">{{%${message.content}%}}</div>
  <time class="{{%message__time%}}">{{%${message.time}%}}</time>
</div>`;

const firstMyMsgTmpl = (message: MessageProps, name: string) =>
  `<div class="{{%message%}}">
  <div class="{{%message__name%}}">{{%${name}%}}</div>
  <div class="{{%message__content%}}">{{%${message.content}%}}</div>
  <time class="{{%message__time%}}">{{%${message.time}%}}</time>
</div>`;

const anotherMsgTmpl = (message: MessageProps) =>
  `<div class="{{%message message--another%}}">
  <div class="{{%message__content%}}">{{%${message.content}%}}</div>
  <time class="{{%message__time%}}">{{%${message.time}%}}</time>
</div>`;

const myMsgTmpl = (message: MessageProps) =>
  `<div class="{{%message%}}">
  <div class="{{%message__content%}}">{{%${message.content}%}}</div>
  <time class="{{%message__time%}}">{{%${message.time}%}}</time>
</div>`;

const templator = new Templator();

export const message = (
  message: MessageProps,
  isFirstMessage: boolean,
  isMyMessage: boolean,
  name?: string
) => {
  let template;
  if (isFirstMessage) {
    if (isMyMessage) {
      template = firstMyMsgTmpl(message, name || '');
    } else {
      template = firstAnotherMsgTmpl(message, name || '');
    }
  } else {
    if (isMyMessage) {
      template = myMsgTmpl(message);
    } else {
      template = anotherMsgTmpl(message);
    }
  }
  return templator.compile(template, {});
};

const template = `<div class="{{%${MESSAGES_CONTAINER}%}}"></div>`;

export default template;
