type Reg = {
  regExp: RegExp[],
  min: number,
  max: number,
}

const regExps: Record<string, Reg> = {
  ['password']: {
    regExp: [/[А-ЯA-Z]/gm, /[0-9]/gm],
    min: 8,
    max: 40,
  },
  ['message']: {
    regExp: [/./],
    min: 1,
    max: Infinity,
  },
  ['email']: {
    regExp: [/[a-z0-9_-]*@[a-z0-9]+\.[a-z]{2,}/gmi],
    min: 3,
    max: Infinity,
  },
  ['phone']: {
    regExp: [/[ +()\-0-9]/gm],
    min: 1,
    max: 20,
  },
  ['first_name']: {
    regExp: [/[А-ЯA-Z][а-яА-Яa-zA-Z]*/gm],
    min: 1,
    max: Infinity,
  },
  ['second_name']: {
    regExp: [/[А-ЯA-Z][а-яА-Яa-zA-Z]*/gm],
    min: 1,
    max: Infinity,
  },
  ['login']: {
    regExp: [/[a-z0-9_-]*[a-z][a-z0-9_-]*/gmi],
    min: 3,
    max: 20,
  },
}

function validateField(field: HTMLInputElement): boolean {
  const name = field.name;
  let result = true;
  if (name in regExps) {
    const value = field.value;
    const minLength = regExps[name].min;
    const maxLength = regExps[name].min;
    regExps[name].regExp.forEach(req => {
      result = result && req.test(field.value);
    });
    result = result && (value.length <= maxLength) && (value.length >= minLength)
  }
  return result;
}

export default function validateForm(form: HTMLFormElement): boolean {
  if (!form?.elements) {
    return true;
  }
  const elements = form.querySelectorAll('input');
  for (const element of Array.from(elements)) {
    if (!validateField(element)) {
      element.classList.add('input-invalid');
      return false;
    } else {
      element.classList.remove('input-invalid');
    }
  }
  return true;
}
