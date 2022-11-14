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
  ['message']: {
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
  ['last_name']: {
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
    regExp: [/[a-z0-9_-]*[a-z][a-z0-9_-]*/gim],
    min: 3,
    max: 20,
  },
};

const IVALID_CLASSNAME = 'input-invalid';

function validateField(field: HTMLInputElement): boolean {
  const name = field.name;
  let result = true;
  if (name in REG_EXPS) {
    const value = field.value;
    const minLength = REG_EXPS[name].min;
    const maxLength = REG_EXPS[name].max;
    REG_EXPS[name].regExp.forEach((req) => {
      result = result && req.test(field.value);
    });
    result = result && value.length <= maxLength && value.length >= minLength;
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
