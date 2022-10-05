import Input from "../Input/Input";
import FormFieldStyle from "./FormField.scss";

const FormField = (description, name, type, isLongField = false) => {
  const shortField =
    `<div class="form__field field">
      <div class="field__description">${description}</div>
      ${Input(['field__input'], type, name)}
    </div>`;

  const longField =
    `<div class="form__field field field--long">
      <div class="field__description field__description--long">${description}</div>
      ${Input(['field__input', 'field__input--long'], type, name)}
    </div>`;

  switch (isLongField) {
    case false:
      return shortField;
      break;
    case true:
      return longField;
      break;
    default:
      break;
  }
}



export default FormField;