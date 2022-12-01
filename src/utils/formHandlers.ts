import EventHandler from '../types/Events';
import Store, { STORE_PATHS } from './Store';

function emitFormSubmitEvent(e: Event) {
  Store.set(STORE_PATHS.FORM_EVENTS.FORM_SUBMIT, e);
}

function emitFormFocusBlurEvent(e: Event) {
  Store.set(STORE_PATHS.FORM_EVENTS.FORM_FOCUSBLUR, e);
}

function emitSearchSubmitEvent(e: Event) {
  Store.set(STORE_PATHS.FORM_EVENTS.SEARCH_SUBMIT, e);
}

export const formHandlers: EventHandler = {
  submit: [emitFormSubmitEvent, false],
  focus: [emitFormFocusBlurEvent, true],
  blur: [emitFormFocusBlurEvent, true],
};

export const searchHandler: EventHandler = {
  input: [emitSearchSubmitEvent, false],
};
