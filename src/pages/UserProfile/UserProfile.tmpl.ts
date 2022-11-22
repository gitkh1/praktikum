const template = `<form class="{{%form form--user%}}">
    {{{ avatar }}}
    {{{ title }}}
    {{{ email }}}
    {{{ login }}}
    {{{ firstname }}}
    {{{ lastname }}}
    {{{ chatname }}}
    {{{ phone }}}
    <div class="{{%form__actions%}}">
      {{{ changedata }}}
      {{{ changepassword }}}
      {{{ gochats }}}
      {{{ out }}}
    </div>
  </form>`;

export default template;
