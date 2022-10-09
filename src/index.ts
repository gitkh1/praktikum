import Templator from "./utils/templator";
import Auth from "./pages/Auth";
import ErrNotFound from "./pages/ErrNotFound";
import "./layouts/Layout.scss";
import UserProfile from "./pages/UserProfile";
import UserChangeData from "./pages/UserChangeData";
import UserChangePwd from "./pages/UserChangePwd";
import Sign from "./pages/Sign";
import Messeneger from "./pages/Messeneger";

const root = document.querySelector('#root');
if (root !== null) {
  const newFragment = new Templator(Messeneger());
  root.append(newFragment.compile({}));
}
