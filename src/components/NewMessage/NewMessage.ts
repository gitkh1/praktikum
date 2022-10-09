import Button from "../Button/Button";
import Input from "../Input/Input";
import LabledInput from "../Input/LabledInput";
// @ts-expect-error TS(2307): Cannot find module './NewMessage.scss' or its corr... Remove this comment to see the full error message
import NewMessageStyle from "./NewMessage.scss";
// @ts-expect-error TS(2307): Cannot find module './scrap.svg' or its correspond... Remove this comment to see the full error message
import Scrap from "./scrap.svg"


const NewMessage = () =>
  `<form action="#" class="chat__form new-msg">
    ${LabledInput(['label__input'], ['label', 'new-msg__field', 'new-msg__field--srap'], 'file', Scrap)}
    ${Input(['colored-input', 'new-msg__field', 'new-msg__field--msg'], 'text', 'newMsg', 'Поиск')}
    ${Button('Отправить', 'submit', ['new-msg__field', 'new-msg__field--btn'])}
  </form>`;

export default NewMessage;
