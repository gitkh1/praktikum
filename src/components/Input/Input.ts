// @ts-expect-error TS(2307): Cannot find module './Input.scss' or its correspon... Remove this comment to see the full error message
import inputStyle from "./Input.scss";

const Input = (classes: any, type: any, name: any, placeholder: any) =>
  `<input class="${classes.join(' ')}" type="${type}" name="${name}" placeholder="${placeholder}">`;

export default Input;
