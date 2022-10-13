import {template as Input} from "../../Input/Input.tmpl";

export const template =
  `<div class="{{fieldClasses}}">
    <div class="{{fieldInnerClasses}}">{{description}}</div>
    ${Input}
  </div>`;