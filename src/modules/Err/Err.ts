import Title from "../../components/Title/Title";
// @ts-expect-error TS(2307): Cannot find module './Err.scss' or its correspondi... Remove this comment to see the full error message
import ErrStyle from "./Err.scss";

const Err = (number: any, descr: any) =>
  `<div class="error">
    ${Title(['error__title'], number)}
    <div class="error__descr">{{${descr}}}</div>
    <a class="error__link link">{{Назад к чатам}}</a>
  </div>`;

export default Err;
