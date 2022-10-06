import Title from "../../components/Title/Title";
import ErrStyle from "./Err.scss";

const Err = (number, descr) =>
  `<div class="error">
    ${Title(['error__title'], number)}
    <div class="error__descr">{{${descr}}}</div>
    <a class="error__link link">{{Назад к чатам}}</a>
  </div>`;

export default Err;