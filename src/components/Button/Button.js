import ButtonStyle from "./Button.scss";

const Button = (description, type, classes) =>
  `<button class="${classes.join(' ')}" type="${type}">${description}</button>`;

export default Button;