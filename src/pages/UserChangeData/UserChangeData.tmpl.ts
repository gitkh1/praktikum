import FORM_TYPES from "../../types/FormTypes";

const template = `<form class="{{%form form--user%}}" data-form="{{%${FORM_TYPES.UPDATE_USER}%}}">
    {{{ label }}}
    {{{ title }}}
    {{{ email }}}
    {{{ login }}}
    {{{ firstname }}}
    {{{ lastname }}}
    {{{ chatname }}}
    {{{ phone }}}
    {{{ button }}}
  </form>`;

export default template;
