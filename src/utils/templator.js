// Simple template engine ((template, context) => DOM element)
// Loop support {{%each}} -- {{/%each}}
// Does not support loops within loops.
import isEmpty from "./isEmpty";
export default class Templator {
  elementRegExp = /(<[^<\n]*>)|({{.*}})/gi;
  openElementRegExp = /(<[^\/<\n]*>)/gi;
  closeElementRegExp = /<\/[\w]*>/gi;
  tagNameRegExp = /(<[^\/][0-9a-z]*)/gi;
  classNamesRegExp = /class="([^=<>\n]*)"/gm;
  typeNameRegExp = /type="([^=<>\n]*)"/gm;
  nameNameRegExp = /name="([^=<>\n]*)"/gm;
  loopOpenRegExp = /({{%each.*}})/gi;
  loopCloseRegExp = /({{\/%each}})/gi;
  inputRegExp = /(<input[^<\n]*>)/gm;
  imgRegExp = /(<img[^<\n]*>)/gm;
  buttonRegExp = /(<button[^<\n]*>)/gm;

  constructor(template) {
    this._template = template;
  }

  get(obj, path, defaultValue) {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      const value = result[key];
      if (!value) {
        return path;
      }
      result = value;
    }
    return result ?? path;
  }

  getTagType(description) {
    if (description.match(this.imgRegExp)) {
      return 'element img';
    } else if (description.match(this.inputRegExp)) {
      return 'element input';
    } else if (description.match(this.openElementRegExp)) {
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
    if (!description.match(this.tagNameRegExp)) return;
    
    const tagName = description.match(this.tagNameRegExp)[0].slice(1).toLowerCase();
    const newElement = document.createElement(tagName);
    if (description.match(this.classNamesRegExp)) {
      const classNames = description.match(this.classNamesRegExp)[0].slice(7, -1).trim().split(' ');
      if (!isEmpty(classNames)) {
        classNames.forEach(className => newElement.classList.add(className));
      }
    };
    if (description.match(this.typeNameRegExp)) {
      const typeName = description.match(this.typeNameRegExp)[0].slice(6, -1).trim();
      newElement.type = typeName;
    }
    if (description.match(this.nameNameRegExp)) {
      const nameName = description.match(this.nameNameRegExp)[0].slice(6, -1).trim();
      newElement.name = nameName;
    }
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
    const tagType = this.getTagType(match);
    let newElement;
    switch (tagType) {
      case 'element img':
        newElement = this.createElement(match, ctx);
        cursorElement.append(newElement);
        break;
      case 'element input':
        newElement = this.createElement(match, ctx);
        cursorElement.append(newElement);
        break;
      case 'element open':
        newElement = this.createElement(match, ctx);
        cursorElement.append(newElement);
        cursorElement = newElement;
        break;
      case 'element text':
        newElement = this.createTextElement(match, ctx);
        cursorElement.textContent = newElement;
        break;
      case 'element close':
        cursorElement = cursorElement.parentNode;
        break;
      default:
        break;
    }
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
      };
      i++;
    }
    return fragment;
  }

}