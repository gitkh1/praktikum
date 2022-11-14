import auth from '../pages/Auth/Auth';
import messenger from '../pages/Messeneger/Messenger';
import sign from '../pages/Sign/Sign';
import userchangedata from '../pages/UserChangeData/UserChangeData';
import userchangepwd from '../pages/UserChangePwd/UserChangePwd';
import userprofile from '../pages/UserProfile/UserProfile';
import PATHS from './Paths';
import Router from './Router';

const router = new Router('#root');

router
  .use(auth, PATHS.auth)
  .use(messenger, PATHS.messenger)
  .use(sign, PATHS.sign)
  .use(userprofile, PATHS.userprofile)
  .use(userchangepwd, PATHS.userchangepwd)
  .use(userchangedata, PATHS.userchangedata);

export { PATHS };
export default router;
