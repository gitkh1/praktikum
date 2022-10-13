import validateForm from "./validation";
import sendData from "./Model";

function prepareData(form: HTMLFormElement): boolean {
  if (!form?.elements) {
    return false;
  }
  const elements = form.querySelectorAll('input');
  let data = {};
  elements.forEach(element => {
    data = { ...data, [element.name]: element.value }
  })
  if (sendData(data)) {
    return true;
  }
  return false;
}

export default function formHandler(event: Event): void {
  event.preventDefault();
  const target = <HTMLElement>event.currentTarget;
  const form = target.closest('form');
  if (!form) {
    throw new Error('Форма не найдена');
  }
  if (validateForm(form)) {
    prepareData(form);
    form.reset();
  }
}
