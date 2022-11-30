import FORM_TYPES from '../types/FormTypes';
import PopUpProps from '../types/PopUpProps';

const POPUP_DATA: Record<string, PopUpProps> = {
  createchat: {
    formType: FORM_TYPES.CREATE_CHAT,
    title: 'Создать чат',
    description: 'Имя чата',
    inputName: 'title',
    inputType: 'text',
    buttonTitle: 'Создать',
  },
  adduser: {
    formType: FORM_TYPES.ADD_USER,
    title: 'Добавить пользователя',
    description: 'Id пользователя',
    inputName: 'user',
    inputType: 'text',
    buttonTitle: 'Добавить',
  },
  removeuser: {
    formType: FORM_TYPES.REMOVE_USER,
    title: 'Удалить пользователя',
    description: 'Id пользователя',
    inputName: 'user',
    inputType: 'text',
    buttonTitle: 'Удалить',
  },
  chatphoto: {
    formType: FORM_TYPES.CHAT_PHOTO,
    title: 'Изменить логотип чата',
    description: 'Логотип',
    inputName: 'avatar',
    inputType: 'file',
    buttonTitle: 'Загрузить',
  },
};

export default POPUP_DATA;
