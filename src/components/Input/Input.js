import inputStyle from "./Input.scss";

const Input = (classes, type, name, placeholder) =>
  `<input class="${classes.join(' ')}" type="${type}" name="${name}" placeholder="${placeholder}">`;

export default Input;
