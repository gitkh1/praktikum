function validateField(field: HTMLInputElement): boolean {
  type Reg = {
    r: RegExp[],
    min: number,
    max: number,
  }
  const regExp: { [key: string]: Reg } = {
    password: {
      r: [/[А-ЯA-Z]/gm, /[0-9]/gm],
      min: 8,
      max: 40,
    },
    message: {
      r: [/./],
      min: 1,
      max: Infinity,
    },
    email: {
      r: [/[a-z0-9_-]*@[a-z0-9]+\.[a-z]{2,}/gmi],
      min: 3,
      max: Infinity,
    },
    phone: {
      r: [/[ +()\-0-9]/gm],
      min: 1,
      max: 20,
    },
    first_name: {
      r: [/[А-ЯA-Z][а-яА-Яa-zA-Z]*/gm],
      min: 1,
      max: Infinity,
    },
    second_name: {
      r: [/[А-ЯA-Z][а-яА-Яa-zA-Z]*/gm],
      min: 1,
      max: Infinity,
    },
    login: {
      r: [/[a-z0-9_-]*[a-z][a-z0-9_-]*/gmi],
      min: 3,
      max: 20,
    },
  }
  const name = field.name;
  let result = true;
  if (name in regExp) {
    const value = field.value;
    const minLength = regExp[name].min;
    const maxLength = regExp[name].min;
    regExp[name].r.forEach(req => {
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
