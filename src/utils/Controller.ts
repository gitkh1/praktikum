import msg from "../pages/Messeneger/Messeneger";
import { auth } from "../pages/Auth/Auth";
import { sign } from "../pages/Sign/Sign";
import { userchangepwd } from "../pages/UserChangePwd/UserChangePwd";
import { userprofile } from "../pages/UserProfile/UserProfile";
import { userchangedata } from "../pages/UserChangeData/UserChangeData";
import err404 from "../pages/ErrNotFound/ErrNotFound";
import err500 from "../pages/ErrServer/ErrServer";
import View from "./View";

const root = document.querySelector('#root');
const routes: { [key: string]: View } = {
  msg: msg,
  auth: auth,
  sign: sign,
  userchangepwd: userchangepwd,
  userprofile: userprofile,
  userchangedata: userchangedata,
  err404: err404,
  err500: err500,
}
let thisView: View;

root?.addEventListener('click', (event) => {
  const target = <Element>event.target;
  const regExp = /\/#.*/gm;
  const firstMatch = 0;
  const href = target.closest('a')?.href?.match(regExp)?.[firstMatch].slice(2);
  if ((href) && (href !== '')) {
    event.preventDefault();
    const view = routes[href];
    thisView.dispatchComponentDidUnMount();
    unrender();
    thisView = view;
    render(view);
  }
})

function unrender() {
  if (root?.firstChild) {
    root.removeChild(root.firstChild);
  }
}

export function render(view: View) {
  if (root) {
    thisView = view;
    root.append(<Node>view.getContent()?.firstChild);

    view.dispatchComponentDidMount();

    return root;
  }
}
