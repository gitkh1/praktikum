/* eslint-disable no-useless-escape */
// Simple template engine ((template, context) => DOM element)
// Loop support {{%each}} -- {{/%each}}
// Does not support loops within loops.
import isEmpty from "./isEmpty";
class Templator {
  _template: any;
  elementRegExp = /(<[^<\n]*>)|({{.*}})/gi;
  openElementRegExp = /(<[^\/][^><\n]*>)/gm;
  closeElementRegExp = /<\/[\w]*>/gi;
  tagNameRegExp = /(<[^\/][0-9a-z]*)/gi;
  classNamesRegExp = /class="([^=<>\n]*)"/gm;
  loopOpenRegExp = /({{%each.*}})/gi;
  loopCloseRegExp = /({{\/%each}})/gi;
  inputRegExp = /(<input[^<\n]*>)/gm;
  imgRegExp = /(<img[^<\n]*>)/gm;
  buttonRegExp = /(<button[^<\n]*>)/gm;
  quotesRegExp = /"([^=<>\n]*)"/gm;
  propsRegExp = {
    type: /type="([^=<>\n]*)"/gm,
    src: /src="([^=<>\n]*)"/gm,
    alt: /src="([^=<>\n]*)"/gm,
    href: /href="([^=<>\n]*)"/gm,
    name: /name="([^=<>\n]*)"/gm,
    placeholder: /placeholder="([^=<>\n]*)"/gm
  }

  constructor(template: any) {
    this._template = template;
  }

  get(obj: any, path: any) {
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

  getTagType(description: any) {
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

  setElementProps(description: any, element: any) {
    const firstMatch = 0;

    // @ts-expect-error TS(2550): Property 'entries' does not exist on type 'ObjectC... Remove this comment to see the full error message
    for (const [prop, regexp] of Object.entries(this.propsRegExp)) {
      const propValue = description?.match(regexp)?.[firstMatch]?.
        match(this.quotesRegExp)?.[firstMatch]?.slice(1, -1).trim();
      if (!isEmpty(propValue)) {
        element[prop] = propValue;
      }
    }
  }

  setElementClasses(description: any, element: any) {
    const firstMatch = 0;
    const classNames = description?.match(this.classNamesRegExp)?.[firstMatch]?.
      match(this.quotesRegExp)?.[firstMatch]?.slice(1, -1).trim().split(' ');

    if (!isEmpty(classNames)) {
      classNames.filter((className: any) => !isEmpty(className)).
        forEach((className: any) => element.classList.add(className));
    }
  }

  createElement(description: any) {
    if (!description?.match(this.tagNameRegExp)) {
      return
    }

    const firstMatch = 0;
    const tagName = description?.match(this.tagNameRegExp)?.[firstMatch]?.slice(1).toLowerCase();
    const newElement = document.createElement(tagName);
    this.setElementClasses(description, newElement)
    this.setElementProps(description, newElement);
    return newElement;
  }

  createTextContent(description: any, ctx: any) {
    const textName = description.slice(2, -2).trim();
    const textContent = this.get(ctx, textName);
    return textContent;
  }

  createloopElement(match: any, matches: any, i: any, ctx: any, cursorElement: any) {
    const firstMatch = 0;
    const ctxName = match.match(this.loopOpenRegExp)?.[firstMatch]?.slice(7, -2).trim();
    const thisCtx = this.get(ctx, ctxName);
    const loopFragment = document.createDocumentFragment();
    let currentInLoopElement = loopFragment;

    let j, k;
    thisCtx.forEach((ctx: any) => {
      j = i + 1;
      let thisMatch = matches[j];
      while (!this.getTagType(thisMatch).includes('loop close')) {
        currentInLoopElement = this.routeElement(thisMatch, ctx, currentInLoopElement);
        j++;
        thisMatch = matches[j];
      }
      k = j - i;
      j = i;
    });
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    i = j + k;
    cursorElement.append(loopFragment);

    return [cursorElement, i];
  }

  routeElement(match: any, ctx: any, cursorElement: any) {
    const tagType = this.getTagType(match);
    let newElement;

    switch (tagType) {
      case 'element img':
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
        newElement = this.createElement(match, ctx);
        cursorElement.append(newElement);
        break;
      case 'element input':
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
        newElement = this.createElement(match, ctx);
        cursorElement.append(newElement);
        break;
      case 'element open':
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
        newElement = this.createElement(match, ctx);
        cursorElement.append(newElement);
        cursorElement = newElement;
        break;
      case 'element text':
        newElement = this.createTextContent(match, ctx);
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

  compile(ctx: any) {
    return this._compileTemplate(ctx);
  }

  _compileTemplate(ctx: any) {
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

export default Templator;