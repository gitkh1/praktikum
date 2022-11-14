import sendData from './Model';
import validateForm from './validation';

function collectInputsValues(form: HTMLFormElement): object {
  let data: object = {};
  if (!form?.elements) {
    return {};
  }
  const elements = form.querySelectorAll('input');
  elements.forEach((element) => {
    data = { ...data, [element.name]: element.value };
  });
  return data;
}

function formHandler(event: Event): void {
  event.preventDefault();
  const target = <HTMLElement>event.currentTarget;
  const form = target.closest('form');
  if (!form) {
    throw new Error('Форма не найдена');
  }
  if (validateForm(form) && event.type === 'submit') {
    const data: object = collectInputsValues(form);
    sendData(data);
    form.reset();
  }
}

const defaultEvents = {
  submit: [formHandler, false],
  focus: [formHandler, true],
  blur: [formHandler, true],
};

export default defaultEvents;
