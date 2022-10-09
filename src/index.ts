import Templator from "./utils/templator";
import Auth from "./pages/Auth";
import ErrNotFound from "./pages/ErrNotFound";
// @ts-expect-error TS(2307): Cannot find module './layouts/Layout.scss' or its ... Remove this comment to see the full error message
import Style from "./layouts/Layout.scss";
import UserProfile from "./pages/UserProfile";
import UserChangeData from "./pages/UserChangeData";
import UserChangePwd from "./pages/UserChangePwd";
import Sign from "./pages/Sign";
import Messeneger from "./pages/Messeneger";

const root = document.querySelector('#root');
const newFragment = new Templator(Messeneger());
// @ts-expect-error TS(2531): Object is possibly 'null'.
root.append(newFragment.compile({}));
