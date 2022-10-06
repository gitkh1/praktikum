import ButtonStyle from "./Button.scss";

export default Button = (description, type, classes) =>
  `<button class="${classes.join(' ')}" type="${type}">${description}</button>`;