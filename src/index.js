import Templator from "./utils/templator";

const str = `<div class="{{ className }}">
<span onClick="{{ handleClick }}">{{text}}</span>
{{%each users}}
<span>{{ name }}</span>
{{/%each}}
</div>
`;

const str2 = `<div class="">
{{%each users}}
<span>{{ name }}</span>
{{/%each}}
</div>
`;

const root = document.querySelector('#root');
let newFragment = new Templator(str);
root.append(newFragment.compile({
  text: 'Привет',
  className: 'myClass',
  user: {
    info: {
      firstName: 'Василий'
    }
  },
  users: [{ name: 'Василий' }, { name: 'Николай' }, {name: 'Петр'}],
}));