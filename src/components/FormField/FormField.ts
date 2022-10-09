import Input from "../Input/Input";
import Link from "../Link/Link";
// @ts-expect-error TS(2307): Cannot find module './FormField.scss' or its corre... Remove this comment to see the full error message
import FormFieldStyle from "./FormField.scss";

const ShortField = (description: any, name: any, type: any) =>
  `<div class="form__field field">
      <div class="field__description">${description}</div>
      ${      
// @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
Input(['field__input'], type, name)}
    </div>`;

const LongField = (description: any, name: any, type: any) =>
  `<div class="form__field field field--long">
    <div class="field__description field__description--long">${description}</div>
    ${    
// @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
Input(['field__input', 'field__input--long'], type, name)}
  </div>`;

const LinkField = (description: any, href: any, classes: any) =>
  `<div class="form__field field field--long">
    ${Link(description, href, classes)}
  </div>`;


export { ShortField, LongField, LinkField };
