import myFriendsList from '../modules/FriendsList/FriendsList';
import ChangePasswordData from '../types/ChangePasswordData';
import { NewChatData } from '../types/ChatListData';
import EventHandler from '../types/Events';
import FORM_TYPES from '../types/FormTypes';
import PlainObject from '../types/PlainObject';
import SignInData from '../types/SignInData';
import SignUpData from '../types/SignUpData';
import UserProfileData from '../types/UserProfileData';
import Store, { STORE_PATHS } from '../utils/Store';
import validateForm, {
  validatePasswordForm,
  validateSignUpPasswordForm,
} from '../utils/validation';
import chatController from './ChatController';
import chatListController from './ChatsController';
import userAuthController from './UserController';

function getFormByEvent(event: Event): HTMLFormElement {
  const target = event.currentTarget as Element;
  const form = target.closest('form') as HTMLFormElement;
  if (!form) {
    console.log('Форма не найдена');
  }
  return form;
}

function collectInputsValues(form: HTMLFormElement): object {
  let data: object = {};
  if (!form?.elements) {
    return {};
  }
  const elements = form.querySelectorAll('input');
  elements.forEach((element) => {
    if (element.type !== 'file') {
      data = { ...data, [element.name]: element.value };
    }
  });
  return data;
}

function collectFile(form: HTMLFormElement): FormData | undefined {
  const elements = form.querySelectorAll('input');
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.type === 'file') {
      if (element.files && element.files?.length > 0) {
        const fd = new FormData(form);
        return fd;
      }
    }
  }
  return undefined;
}

class FormsController {
  setPopUpProps(linkType: string) {
    if (Object.values(FORM_TYPES).includes(linkType)) {
      Store.set(STORE_PATHS.POPUP, linkType);
    }
  }

  focusForm(event: Event): void {
    const form = getFormByEvent(event);
    validateForm(form);
  }

  blurForm(event: Event): void {
    const form = getFormByEvent(event);
    validateForm(form);
  }

  async submitForm(event: Event) {
    try {
      event.preventDefault();
      const form = getFormByEvent(event);
      if (!validateForm(form)) {
        return;
      }
      const data = collectInputsValues(form) as PlainObject;
      const type = form.dataset.form;
      if (type === FORM_TYPES.SIGNUP) {
        if (!validateSignUpPasswordForm(form)) {
          return;
        }
        userAuthController.signUp(data as SignUpData);
      } else if (type === FORM_TYPES.LOGIN) {
        userAuthController.login(data as SignInData);
      } else if (type === FORM_TYPES.UPDATE_USER) {
        const avatar = collectFile(form);
        userAuthController.updateUser(data as UserProfileData, avatar);
      } else if (type === FORM_TYPES.CHANGE_PWD) {
        if (!validatePasswordForm(form)) {
          return;
        }
        userAuthController.changePassword(data as ChangePasswordData);
      } else if (type === FORM_TYPES.CREATE_CHAT) {
        await chatListController.createChat(data as NewChatData);
        form.reset();
      } else if (type === FORM_TYPES.ADD_USER) {
        await chatListController.addUserToChat(data);
        form.reset();
      } else if (type === FORM_TYPES.REMOVE_USER) {
        await chatListController.removeUserFromChat(data);
        form.reset();
      } else if (type === FORM_TYPES.CHAT_PHOTO) {
        const avatar = collectFile(form);
        if (!avatar) {
          return;
        }
        await chatListController.changePhotoChat(avatar);
        form.reset();
      } else if (type === FORM_TYPES.NEW_MESSAGE) {
        await chatController.sendMessage(data);
        form.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  searchForm(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value;
    const chatList = myFriendsList.getChatList();
    chatList.forEach((chat) => {
      if (chat.getChatName().toLowerCase().includes(query.toLowerCase())) {
        chat.show();
      } else {
        chat.hide();
      }
    });
  }
}

const formController = new FormsController();

export const formHandlers: EventHandler = {
  submit: [formController.submitForm, false],
  focus: [formController.focusForm, true],
  blur: [formController.blurForm, true],
};

export const searchHandler: EventHandler = {
  input: [formController.searchForm, false],
};

export default formController;
