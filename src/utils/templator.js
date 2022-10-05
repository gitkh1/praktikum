// Simple template engine ((template, context) => DOM element)
// Loop support {{%each}} -- {{/%each}}
// Does not support loops within loops.

export default class Templator {
  elementRegExp = /(<[^<\n]*>)|({{.*}})/gi;
  openElementRegExp = /(<[^\/<\n]*>)/gi;
  closeElementRegExp = /<\/[\w]*>/gi;
  tagNameRegExp = /(<[^\/][a-z]*)/gi;
  classNamesRegExp = /class="{{(?:.*)}}"/gi;
  loopOpenRegExp = /({{%each.*}})/gi;
  loopCloseRegExp = /({{\/%each}})/gi;

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
      return 'element open';
    } else if (description.match(this.closeElementRegExp)) {
      return 'element close';
    } else if (description.match(this.loopOpenRegExp)) {
      return 'loop open';
    } else if (description.match(this.loopCloseRegExp)) {
      return 'loop close';
    } else {
      return 'element text';
    }
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

  createloopElement(match, matches, i, ctx, cursorElement) {
    const ctxName = match.match(this.loopOpenRegExp)[0].slice(7, -2).trim();
    const thisCtx = this.get(ctx, ctxName);
    const loopFragment = document.createDocumentFragment();
    let currentInLoopElement = loopFragment;

    let j, k;
    thisCtx.forEach(ctx => {
      j = i + 1;
      let thisMatch = matches[j];
      while (!this.getTagType(thisMatch).includes('loop close')) {
        currentInLoopElement = this.routeElement(thisMatch, ctx, currentInLoopElement);
        j++;
        thisMatch = matches[j];
      };
      k = j - i;
      j = i;
    });
    i = j + k;
    cursorElement.append(loopFragment);
    return [cursorElement, i];
  }

  routeElement(match, ctx, cursorElement) {
    if (this.getTagType(match) === 'element open') {
      const newElement = this.createElement(match, ctx);
      cursorElement.append(newElement);
      cursorElement = newElement;
    } else if (this.getTagType(match) === 'element text') {
      const newElement = this.createTextElement(match, ctx);
      cursorElement.textContent = newElement;
    } else if (this.getTagType(match) === 'element close') {
      cursorElement = cursorElement.parentNode;
    };
    return cursorElement;
  }

  compile(ctx) {
    return this._compileTemplate(ctx);
  }

  _compileTemplate(ctx) {
    const fragment = document.createDocumentFragment();
    let currentElement = fragment;
    const matches = this._template.match(this.elementRegExp);
    let i = 0;
    while (i < matches.length) {
      const match = matches[i];
      if (this.getTagType(match).includes('element')) {
        currentElement = this.routeElement(match, ctx, currentElement);
      } else if (this.getTagType(match).includes('loop open')) {
        [currentElement, i] = this.createloopElement(match, matches, i, ctx, currentElement);
      }
      i++;
    }
    return fragment;
  }

}