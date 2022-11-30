const PATHS = {
  auth: '/',
  messenger: '/messenger',
  sign: '/sign-up',
  userprofile: '/settings',
  userchangedata: '/settings/data',
  userchangepwd: '/settings/pwd',
  err: '/404',
};

export const LOGOUT_PATH = '/logout';
export const ERR_PAGE_PATH = PATHS.err;
export const AUTH_PAGE = PATHS.auth;
export const SIGN_PAGES = [PATHS.auth, PATHS.sign];
export const DEFAULT_MESSENGER_PAGE = PATHS.messenger;
export const USER_PROFILE = PATHS.userprofile;

export default PATHS;
