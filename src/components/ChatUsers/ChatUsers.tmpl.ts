import { CheckedChatInfo } from '../../controllers/ChatsController';

const userElement = `<div class="{{%link control__link%}}">{{% REPLACE %}}</div>`;

const template = (checkedChatInfo: CheckedChatInfo) => `
<div class="{{%control%}}">
  <div class="{{%control__active control__active--userscount%}}">
    <div class="{{%control__active-users%}}">{{%Участники чата%}}</div>
    <div class="{{%control__active-users%}}">{{${
      checkedChatInfo.usersCount
    }}}</div>
  </div>
  <div class="{{%control__popup%}}">
    <div class="{{%control__links%}}">
      ${checkedChatInfo.users
        .map((user) =>
          userElement.replace(
            'REPLACE',
            `${user.first_name} ${user.second_name}`
          )
        )
        .join('\n')}
    </div>
  </div>
</div>`;

export default template;
