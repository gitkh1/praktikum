import FORM_TYPES from '../../types/FormTypes';

const template = `<form class="{{%form form--sign%}}" data-form="{{%${FORM_TYPES.SIGNUP}%}}">
    {{{ title }}}
    {{{ email }}}
    {{{ login }}}
    {{{ firstname }}}
    {{{ lastname }}}
    {{{ phone }}}
    {{{ password }}}
    {{{ password2 }}}
    {{{ button }}}
    {{{ link }}}
  </form>`;

export default template;
