import FORM_TYPES from '../../types/FormTypes';

const template = `<form class="{{%form form--user%}}" data-form="{{%${FORM_TYPES.CHANGE_PWD}%}}" >
    {{{ avatar }}}
    {{{ title }}}
    {{{ oldpassword }}}
    {{{ password }}}
    {{{ password2 }}}
    {{{ button }}}
  </form>`;

export default template;
