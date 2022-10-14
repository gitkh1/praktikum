import "./layouts/normalize.scss";
import "./layouts/Layout.scss";
import "./layouts/Messeneger.scss";

import { auth } from "./pages/Auth/Auth";
import msg from "./pages/Messeneger/Messeneger";
import { render } from "./utils/Controller";

render(msg);
