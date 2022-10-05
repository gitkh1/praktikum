import Templator from "./utils/templator";
import Auth from "./pages/auth";
import ErrNotFound from "./pages/ErrNotFound";
import Style from "./layouts/Layout.scss";
import UserProfile from "./pages/UserProfile";

const root = document.querySelector('#root');
let newFragment = new Templator(Auth());
root.append(newFragment.compile({}));