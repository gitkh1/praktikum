import "./layouts/normalize.scss";
import "./layouts/Layout.scss";
import "./layouts/Messeneger.scss";

import { render } from "./utils/renderDOM";
import { auth } from "./pages/Auth/Auth";
import { sign } from "./pages/Sign/Sign";
import { userpwd } from "./pages/UserChangePwd/UserChangePwd";
import { userprofile } from "./pages/UserProfile/UserProfile";
import { userchangedata } from "./pages/UserChangeData/UserChangeData";
import err404 from "./pages/ErrNotFound/ErrNotFound";
import err500 from "./pages/ErrServer/ErrServer";
import msg from "./pages/Messeneger/Messeneger";

render("#root", msg);
