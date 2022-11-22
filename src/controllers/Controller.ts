import auth from '../pages/Auth/Auth';
import err from '../pages/Errors/Err';
import messenger from '../pages/Messeneger/Messenger';
import sign from '../pages/Sign/Sign';
import userchangedata from '../pages/UserChangeData/UserChangeData';
import userchangepwd from '../pages/UserChangePwd/UserChangePwd';
import userprofile from '../pages/UserProfile/UserProfile';
import chatController from './ChatController';
import chatListController from './ChatsController';
import PATHS from './Paths';
import Router from './Router';
import userAuthController from './UserController';

const router = new Router('#root');

export const UPDATE_INTERVAL = 1000;

let updateIntrval: ReturnType<typeof setInterval> | null = null;

function messengerOnRender() {
  userAuthController.getUser();
  chatController.clearChat();
  updateIntrval = setInterval(
    () => chatListController.getChats(),
    UPDATE_INTERVAL
  );
}

function messengerOnUnRender() {
  if (!updateIntrval) {
    return;
  }
  clearInterval(updateIntrval);
}

router
  .use(auth, PATHS.auth)
  .use(messenger, PATHS.messenger, messengerOnRender, messengerOnUnRender)
  .use(sign, PATHS.sign)
  .use(userprofile, PATHS.userprofile, userAuthController.getUser)
  .use(userchangepwd, PATHS.userchangepwd, userAuthController.getUser)
  .use(userchangedata, PATHS.userchangedata, userAuthController.getUser)
  .use(err, PATHS.err);

export default router;
