import inputStyle from "./Input.scss";

export default Input = (classes, type, name, placeholder) =>
  `<input class="${classes.join(' ')}" type="${type}" name="${name}" placeholder="${placeholder}">`;