import Friend from "../../components/Friend/Friend";
import Input from "../../components/Input/Input";
import Link from "../../components/Link/Link";
// @ts-expect-error TS(2307): Cannot find module './Friends.scss' or its corresp... Remove this comment to see the full error message
import FriedsListStyle from "./Friends.scss";

const Friends = () =>

  `<div class="friends">
    <nav class="friends__menu">
      <div class="friends__profile">
        ${Link('{{Профиль}}', '#', ['link', 'link--grey'])}
      </div>
      <div class="friends__search">
        ${Input(['colored-input', 'colored-input--search'], 'text', 'search', 'Поиск')}
      </div>
    </nav>
    <ul class="friends__list">
      ${Friend('friend')}
      ${Friend('friend')}
      ${Friend('friend')}
      ${Friend('friend')}
    </ul>
  </div>`;

export default Friends;
