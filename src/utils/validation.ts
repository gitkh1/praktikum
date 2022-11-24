type Reg = {
  regExp: RegExp[];
  min: number;
  max: number;
};

const REG_EXPS: Record<string, Reg> = {
  ['password']: {
    regExp: [/[А-ЯA-Z]/gm, /[0-9]/gm],
    min: 8,
    max: 40,
  },
  ['oldPassword']: {
    regExp: [/[А-ЯA-Z]/gm, /[0-9]/gm],
    min: 8,
    max: 40,
  },
  ['newPassword']: {
    regExp: [/[А-ЯA-Z]/gm, /[0-9]/gm],
    min: 8,
    max: 40,
  },
  ['newPassword2']: {
    regExp: [/[А-ЯA-Z]/gm, /[0-9]/gm],
    min: 8,
    max: 40,
  },
  ['message']: {
    regExp: [/.*/],
    min: 1,
    max: Infinity,
  },
  ['title']: {
    regExp: [/.*/],
    min: 1,
    max: Infinity,
  },
  ['email']: {
    regExp: [/[a-z0-9_-]*@[a-z0-9]+\.[a-z]{2,}/gim],
    min: 3,
    max: 60,
  },
  ['phone']: {
    regExp: [/[ +()\-0-9]/gm],
    min: 1,
    max: 20,
  },
  ['first_name']: {
    regExp: [/[А-ЯA-Z][а-яА-Яa-zA-Z]*/gm],
    min: 1,
    max: 40,
  },
  ['second_name']: {
    regExp: [/[А-ЯA-Z][а-яА-Яa-zA-Z]*/gm],
    min: 1,
    max: 40,
  },
  ['display_name']: {
    regExp: [/.*/],
    min: 1,
    max: 40,
  },
  ['login']: {
    regExp: [/[a-zA-Z-_]+/gm, /[a-zA-Z-_0-9]*/gm],
    min: 3,
    max: 20,
  },
};

const IVALID_CLASSNAME = 'input-invalid';

function validateField(field: HTMLInputElement): boolean {
  const name = field.name;
  if (name in REG_EXPS) {
    const value = field.value;
    REG_EXPS[name].regExp.forEach((req) => {
      if (!req.test(value)) {
        return false;
      }
    });
    if (value.length > REG_EXPS[name].max) {
      return false;
    }
    if (value.length < REG_EXPS[name].min) {
      return false;
    }
  }
  return true;
}

export function validatePasswordForm(form: HTMLFormElement): boolean {
  const oldPassword = form.elements[0] as HTMLInputElement;
  const newPassword = form.elements[1] as HTMLInputElement;
  const newPassword2 = form.elements[2] as HTMLInputElement;
  const result =
    oldPassword.value !== newPassword.value &&
    newPassword.value === newPassword2.value;

  for (const element of Array.from([oldPassword, newPassword, newPassword2])) {
    if (!result) {
      element.classList.add(IVALID_CLASSNAME);
    } else if (element.classList.contains(IVALID_CLASSNAME)) {
      element.classList.remove(IVALID_CLASSNAME);
    }
  }
  return result;
}

export function validateSignUpPasswordForm(form: HTMLFormElement): boolean {
  const newPassword = form.querySelector('[name=password]') as HTMLInputElement;
  const newPassword2 = form.querySelector(
    '[name=password2]'
  ) as HTMLInputElement;
  if (!newPassword) {
    return true;
  }
  if (!newPassword2) {
    return true;
  }
  const result = newPassword.value === newPassword2.value;

  for (const element of Array.from([newPassword, newPassword2])) {
    if (!result) {
      element.classList.add(IVALID_CLASSNAME);
    } else if (element.classList.contains(IVALID_CLASSNAME)) {
      element.classList.remove(IVALID_CLASSNAME);
    }
  }
  return result;
}

export default function validateForm(form: HTMLFormElement): boolean {
  const elements = form.querySelectorAll('input');
  let result = true;
  for (const element of Array.from(elements)) {
    if (!validateField(element)) {
      element.classList.add(IVALID_CLASSNAME);
      result = false;
    } else if (element.classList.contains(IVALID_CLASSNAME)) {
      element.classList.remove(IVALID_CLASSNAME);
    }
  }
  return result;
}
