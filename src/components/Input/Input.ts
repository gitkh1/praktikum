import "./Input.scss";

const Input = (classes: string[], type: string, name: string, placeholder = "") =>
  `<input class="${classes.join(' ')}" type="${type}" name="${name}" placeholder="${placeholder}">`;

export default Input;
