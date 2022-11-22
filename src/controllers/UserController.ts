import AuthAPI from '../api/auth-api';
import userAPI from '../api/users-api';
import ChangePasswordData from '../types/ChangePasswordData';
import SignInData from '../types/SignInData';
import SignUpData from '../types/SignUpData';
import UserProfileData from '../types/UserProfileData';
import Store, { EMPTY_USER, STORE_PATHS, StoreState } from '../utils/Store';
import saver from './../components/Avatar/saver.png';
import chatController from './ChatController';
import router from './Controller';
import PATHS from './Paths';

const authAPI = new AuthAPI();

class UserAuthController {
  async getUser() {
    const [isOk, body] = await authAPI.getUser();
    if (isOk) {
      const userInfo = {
        avatar: body.avatar || saver,
        display_name: body.display_name,
        email: body.email,
        first_name: body.first_name,
        id: `${body.id}`,
        login: body.login,
        phone: body.phone,
        second_name: body.second_name,
      };
      Store.merge({ [STORE_PATHS.USER]: userInfo });
    } else {
      router.go(PATHS.auth);
    }
  }

  async login(data: SignInData) {
    const [isOk] = await authAPI.signIn(data);
    if (isOk) {
      router.go(PATHS.messenger);
    }
  }

  async signUp(data: SignUpData) {
    const [isOk, body] = await authAPI.signUp(data);
    if (isOk) {
      Store.merge({ [STORE_PATHS.USER]: body });
      router.go(PATHS.messenger);
    }
  }

  async logout() {
    await chatController.clearChat();
    await chatController.closeChat();
    await authAPI.logOut();
  }

  async updateUser(data: UserProfileData, avatar?: FormData) {
    let success = false;
    const [isOk1, body1] = await userAPI.updateUser(data);
    if (isOk1) {
      Store.merge({ [STORE_PATHS.USER]: body1 });
      success = true;
    }
    if (avatar) {
      const [isOk2, body2] = await userAPI.updateAvatar(avatar);
      if (isOk2) {
        Store.merge({ [STORE_PATHS.USER]: body2 });
        success = true;
      }
    }
    if (success) {
      router.go(PATHS.userprofile);
    }
  }

  async changePassword(data: ChangePasswordData) {
    const [isOk, body] = await userAPI.updatePassword(data);
    if (isOk) {
      Store.merge({ [STORE_PATHS.USER]: body });
      router.go(PATHS.userprofile);
    }
  }
}

export function mapUserToProps(state: StoreState) {
  const user = state.user || EMPTY_USER;
  return {
    id: user.id || '',
    first_name: user.first_name || '',
    second_name: user.second_name || '',
    avatar: user.avatar || '',
    display_name: user.display_name || '',
    login: user.login || '',
    email: user.email || '',
    phone: user.phone || '',
  };
}

export function getUserId(state: StoreState) {
  const user = state.user;
  return user.id;
}

export function mapMessenegerToProps(state: StoreState) {
  const msgProps = { user: mapUserToProps(state) };
  const activeChat = state.activeChat;
  Object.assign(msgProps, {
    activeChat: activeChat,
  });
  return msgProps;
}

const userAuthController = new UserAuthController();
export default userAuthController;
