import "../../Input/Input.scss";
import {template as Input} from "../../Input/Input.tmpl";

export const template =
  `<div class="{{fieldClasses}}">
  <div class="{{field__description}}">{{ description }}</div>
  ${Input}
</div>`;
