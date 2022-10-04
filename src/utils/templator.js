export default class Templator {
  elementRegExp = /(<[^<\n]*>)|({{.*}})/gi;
  openElementRegExp = /(<[^\/<\n]*>)/gi;
  closeElementRegExp = /<\/[\w]*>/gi;
  tagNameRegExp = /(<[^\/][a-z]*)/gi;
  classNamesRegExp = /class="{{(?:.*)}}"/gi;

  constructor(template) {
    this._template = template;
  }

  get(obj, path, defaultValue) {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      const value = result[key];
      if (!value) {
        return defaultValue;
      }
      result = value;
    }
    return result ?? defaultValue;
  }

  getTagType(description) {
    if (description.match(this.openElementRegExp)) {
      return 'open';
    } else if (description.match(this.closeElementRegExp)) {
      return 'close';
    } else return 'text';
  }

  createElement(description, ctx) {
    const tagName = description.match(this.tagNameRegExp)[0].slice(1).toLowerCase();
    let classNames = [];
    if (description.match(this.classNamesRegExp)) {
      classNames = description.match(this.classNamesRegExp)[0].slice(9, -3).trim().split(' ');
    };
    const newElement = document.createElement(tagName);
    classNames.forEach(className => newElement.classList.add(this.get(ctx, className)));
    return newElement;
  }

  createTextElement(description, ctx) {
    const textName = description.slice(2, -2).trim();
    const textContent = this.get(ctx, textName);
    return textContent;
  }

  compile(ctx) {
    return this._compileTemplate(ctx);
  }

  _compileTemplate(ctx) {
    const fragment = document.createDocumentFragment();
    let currentElement = fragment;
    const matches = this._template.match(this.elementRegExp);
    matches.forEach(match => {
      if (this.getTagType(match) === 'open') {
        const newElement = this.createElement(match, ctx);
        currentElement.append(newElement);
        currentElement = newElement;
      } else if (this.getTagType(match) === 'text') {
        const newElement = this.createTextElement(match, ctx);
        currentElement.textContent = newElement;
      } else if (this.getTagType(match) === 'close') {
        currentElement = currentElement.parentNode;
      };
    });
    return fragment;
  }

}