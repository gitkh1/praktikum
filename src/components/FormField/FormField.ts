import Input from "../Input/Input";
import Link from "../Link/Link";
import "./FormField.scss";

const ShortField = (description: string, name: string, type: string) =>
  `<div class="form__field field">
      <div class="field__description">${description}</div>
      ${      
Input(['field__input'], type, name)}
    </div>`;

const LongField = (description: string, name: string, type: string) =>
  `<div class="form__field field field--long">
    <div class="field__description field__description--long">${description}</div>
    ${    
Input(['field__input', 'field__input--long'], type, name)}
  </div>`;

const LinkField = (description: string, href: string, classes: string[]) =>
  `<div class="form__field field field--long">
    ${Link(description, href, classes)}
  </div>`;


export { ShortField, LongField, LinkField };
