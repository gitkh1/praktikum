import Button from "../Button/Button";
import Input from "../Input/Input";
import LabledInput from "../Input/LabledInput";
import NewMessageStyle from "./NewMessage.scss";
import Scrap from "./scrap.svg"


const NewMessage = () =>
  `<form action="#" class="chat__form new-msg">
    ${LabledInput(['label__input'], ['label', 'new-msg__field', 'new-msg__field--srap'], 'file', Scrap)}
    ${Input(['colored-input', 'new-msg__field', 'new-msg__field--msg'], 'text', 'newMsg', 'Поиск')}
    ${Button('Отправить', 'submit', ['new-msg__field', 'new-msg__field--btn'])}
  </form>`;

export default NewMessage;