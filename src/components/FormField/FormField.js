import Input from "../Input/Input";
import Link from "../Link/Link";
import FormFieldStyle from "./FormField.scss";

const ShortField = (description, name, type) =>
  `<div class="form__field field">
      <div class="field__description">${description}</div>
      ${Input(['field__input'], type, name)}
    </div>`;

const LongField = (description, name, type) =>
  `<div class="form__field field field--long">
    <div class="field__description field__description--long">${description}</div>
    ${Input(['field__input', 'field__input--long'], type, name)}
  </div>`;

const LinkField = (description, href, classes) =>
  `<div class="form__field field field--long">
    ${Link(description, href, classes)}
  </div>`;


export { ShortField, LongField, LinkField };
