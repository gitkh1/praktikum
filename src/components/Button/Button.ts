// @ts-expect-error TS(2307): Cannot find module './Button.scss' or its correspo... Remove this comment to see the full error message
import ButtonStyle from "./Button.scss";

const Button = (description: any, type: any, classes: any) =>
  `<button class="${classes.join(' ')}" type="${type}">${description}</button>`;

export default Button;
