import Templator from "./utils/templator";
import Auth from "./pages/Auth";
import ErrNotFound from "./pages/ErrNotFound";
import Style from "./layouts/Layout.scss";
import UserProfile from "./pages/UserProfile";
import UserChangeData from "./pages/UserChangeData";
import UserChangePwd from "./pages/UserChangePwd";
import Sign from "./pages/Sign";
import Messeneger from "./pages/Messeneger";

const root = document.querySelector('#root');
let newFragment = new Templator(Messeneger());
root.append(newFragment.compile({}));