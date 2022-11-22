import '../../components/Input/Input.scss';

import { formHandlers } from '../../controllers/FormsController';
import EventHandler from '../../types/Events';
import FORM_TYPES from '../../types/FormTypes';
import PlainObject from '../../types/PlainObject';
import Block from '../../utils/Block';
import isEqual from '../../utils/isEqual';
import Store, { STORE_PATHS,StoreEvents } from '../../utils/Store';
import Templator from '../../utils/Templator';
import template from './PopUpInput.tmpl';

export const OVERLAY_CLASS = 'overlay';

export const DATA_FORM_TYPE = '#';

export type PopUpProps = {
  formType: string;
  title: string;
  description: string;
  inputName: string;
  inputType: string;
  buttonTitle: string;
  events?: EventHandler;
};

export const POPUP_DATA = {
  [FORM_TYPES.CREATE_CHAT]: {
    formType: FORM_TYPES.CREATE_CHAT,
    title: 'Создать чат',
    description: 'Имя чата',
    inputName: 'title',
    inputType: 'text',
    buttonTitle: 'Создать',
  },
  [FORM_TYPES.ADD_USER]: {
    formType: FORM_TYPES.ADD_USER,
    title: 'Добавить пользователя',
    description: 'Id пользователя',
    inputName: 'user',
    inputType: 'text',
    buttonTitle: 'Добавить',
  },
  [FORM_TYPES.REMOVE_USER]: {
    formType: FORM_TYPES.REMOVE_USER,
    title: 'Удалить пользователя',
    description: 'Id пользователя',
    inputName: 'user',
    inputType: 'text',
    buttonTitle: 'Удалить',
  },
  [FORM_TYPES.CHAT_PHOTO]: {
    formType: FORM_TYPES.CHAT_PHOTO,
    title: 'Изменить логотип чата',
    description: 'Логотип',
    inputName: 'avatar',
    inputType: 'file',
    buttonTitle: 'Загрузить',
  },
};

export function mapPopupToProps(state: PlainObject) {
  const popupName = (state[STORE_PATHS.POPUP] as string) || '';
  if (Object.values(FORM_TYPES).includes(popupName)) {
    return POPUP_DATA[popupName];
  } else {
    return POPUP_DATA[FORM_TYPES.CREATE_CHAT];
  }
}

export default class PopUpInput extends Block<PopUpProps> {
  constructor(props: PopUpProps) {
    let state = mapPopupToProps(Store.getState());
    super({ ...props, events: formHandlers }, OVERLAY_CLASS);

    Store.on(StoreEvents.Updated, () => {
      const newState = mapPopupToProps(Store.getState());
      if (!isEqual(state, newState)) {
        this.setProps(newState);
      }
      state = newState;
    });
  }

  render() {
    return new Templator().compile(template, this.props);
  }
}
