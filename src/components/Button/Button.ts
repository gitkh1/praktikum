import "./Button.scss";

const Button = (description: string, type: string, classes: string[]) =>
  `<button class="${classes.join(' ')}" type="${type}">${description}</button>`;

export default Button;
