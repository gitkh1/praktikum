import '../../components/Input/Input.scss';

import POPUP_DATA from '../../consts/PopUpData';
import PopUpProps from '../../types/PopUpProps';
import Block from '../../utils/Block';
import { formHandlers } from '../../utils/formHandlers';
import isEqual from '../../utils/isEqual';
import { mapPopupToProps } from '../../utils/mapPropsFunctions';
import Store, { StoreEvents } from '../../utils/Store';
import Templator from '../../utils/templator';
import template from './PopUpInput.tmpl';

export const OVERLAY_CLASS = 'overlay';

export const DATA_FORM_TYPE = '#';

export default class PopUpInput extends Block<PopUpProps> {
  constructor(props: PopUpProps) {
    super({ ...props, events: formHandlers }, OVERLAY_CLASS);
    let state = mapPopupToProps(Store.getState());

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

export const popup = new PopUpInput(POPUP_DATA.createchat);
