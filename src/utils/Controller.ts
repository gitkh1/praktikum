import { auth } from "../pages/Auth/Auth";
import msg from "../pages/Messeneger/Messeneger";
import { sign } from "../pages/Sign/Sign";
import { userchangedata } from "../pages/UserChangeData/UserChangeData";
import { userchangepwd } from "../pages/UserChangePwd/UserChangePwd";
import { userprofile } from "../pages/UserProfile/UserProfile";
import View from "./View";

type AnyView = View<any>;

const root = document.querySelector('#root');
const routes: Record<string, AnyView> = {
  msg: msg,
  auth: auth,
  sign: sign,
  userchangepwd: userchangepwd,
  userprofile: userprofile,
  userchangedata: userchangedata,
}
let lastView: AnyView;

root?.addEventListener('click', (event) => {
  const target = <Element>event.target;
  const regExp = /\/#.*/gm;
  const firstMatch = 0;
  const href = target.closest('a')?.href?.match(regExp)?.[firstMatch].slice(2);
  if ((href) && (href !== '')) {
    event.preventDefault();
    const view = routes[href];
    if (lastView) {
      lastView.dispatchComponentDidUnMount();
      unrender();
    }
    render(view);
  }
})

function unrender() {
  if (root?.firstChild) {
    root.removeChild(root.firstChild);
  }
}

export function render(view: AnyView) {
  if (root) {
    root.append(<Node>view.getContent()?.firstChild);
    view.dispatchComponentDidMount();
    lastView = view;
    return root;
  }
}
