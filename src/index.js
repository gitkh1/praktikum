import Templator from "./utils/templator";

const str = `<div class="{{ className }}">
<span onClick="{{ handleClick }}">{{text}}</span>
<span>{{ user.info.firstName }}</span>
</div>
`;

const str2 = `<div class="">
<span onClick=""></span>
<span></span>
</div>
`;

const root = document.querySelector('#root');
let newFragment = new Templator(str);
root.append(newFragment.compile({
  className: 'myClass',
  user: {
    info: {
      firstName: 'Василий'
    }
  }
}));