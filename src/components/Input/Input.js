import inputStyle from "./Input.scss";

export default Input = (classes, type, name) =>
  `<input class="${classes.join(' ')}" type="${type}" name="${name}">`;