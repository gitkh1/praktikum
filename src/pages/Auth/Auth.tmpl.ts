import FORM_TYPES from '../../types/FormTypes';

const template = `<form class="{{%form form--sign%}}"  data-form="{{%${FORM_TYPES.LOGIN}%}}">
    {{{ title }}}
    {{{ login }}}
    {{{ password }}}
    {{{ button }}}
    {{{ link }}}
  </form>`;

export default template;
