/* eslint-disable no-useless-escape */
// Simple template engine ((template, context) => DOM element)
// Loop support {{%each}} -- {{/%each}}
// Does not support loops within loops.
import isEmpty from "./isEmpty";

type DOMElement = HTMLElement | DocumentFragment;
class Templator {
  _template: string;

  elementsRegExp = {
    element: /(<[^<\n]*>)|({{.*}})/gi,
    open: /(<[^\/][^><\n]*>)/gm,
    close: /<\/[\w]*>/gi,
    tag: /(<[^\/][0-9a-z]*)/gi,
    classes: /class="([^=<>\n]*)"/gm,
    loopOpen: /({{%each.*}})/gi,
    loopClose: /({{\/%each}})/gi,
    input: /(<input[^<\n]*>)/gm,
    img: /(<img[^<\n]*>)/gm,
    button: /(<button[^<\n]*>)/gm,
    quotes: /"([^=<>\n]*)"/gm,
  }
  propsRegExp = {
    type: /type="([^=<>\n]*)"/gm,
    src: /src="([^=<>\n]*)"/gm,
    alt: /src="([^=<>\n]*)"/gm,
    href: /href="([^=<>\n]*)"/gm,
    name: /name="([^=<>\n]*)"/gm,
    placeholder: /placeholder="([^=<>\n]*)"/gm
  }

  constructor(template: string) {
    this._template = template;
  }

  get(obj: object, path: string | undefined) {
    if (path === undefined) {
      return obj;
    }
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

  getTagType(description: string): string {
    if (description.match(this.elementsRegExp.img)) {
      return 'element img';
    } else if (description.match(this.elementsRegExp.input)) {
      return 'element input';
    } else if (description.match(this.elementsRegExp.open)) {
      return 'element open';
    } else if (description.match(this.elementsRegExp.close)) {
      return 'element close';
    } else if (description.match(this.elementsRegExp.loopOpen)) {
      return 'loop open';
    } else if (description.match(this.elementsRegExp.loopClose)) {
      return 'loop close';
    } else {
      return 'element text';
    }
  }

  setElementProps(description: string, element: HTMLElement) {
    const firstMatch = 0;

    for (const [prop, regexp] of Object.entries(this.propsRegExp)) {
      const propValue = description?.match(regexp)?.[firstMatch]?.
        match(this.elementsRegExp.quotes)?.[firstMatch]?.slice(1, -1).trim();
      if (!isEmpty(propValue)) {
        element[prop] = propValue;
      }
    }
  }

  setElementClasses(description: string, element: HTMLElement) {
    const firstMatch = 0;
    const classNames = description?.match(this.elementsRegExp.classes)?.[firstMatch]?.
      match(this.elementsRegExp.quotes)?.[firstMatch]?.slice(1, -1).trim().split(' ');

    if ((classNames) && (!isEmpty(classNames))) {
      classNames.filter((className: string) => !isEmpty(className)).
        forEach((className: string) => element.classList.add(className));
    }
  }

  createElement(description: string): HTMLElement | null {
    const firstMatch = 0;
    const tagName = description?.match(this.elementsRegExp.tag)?.[firstMatch]?.slice(1).toLowerCase();
    if (!tagName) {
      return null;
    }

    const newElement = document.createElement(tagName);
    this.setElementClasses(description, newElement)
    this.setElementProps(description, newElement);
    return newElement;
  }

  createTextContent(description: string, ctx: object): string {
    const textName = description.slice(2, -2).trim();
    const textContent = this.get(ctx, textName);
    if (typeof textContent !== 'string') {
      return "";
    }
    return textContent;
  }

  createloopElement(match: string, matches: string[], i: number, ctx: object, cursorElement: DOMElement): [DOMElement, number] {
    const firstMatch = 0;
    const ctxName = match.match(this.elementsRegExp.loopOpen)?.[firstMatch]?.slice(7, -2).trim();
    const thisCtx = this.get(ctx, ctxName);
    const loopFragment: DocumentFragment = document.createDocumentFragment();
    let currentInLoopElement: DOMElement = loopFragment;

    if (Array.isArray(thisCtx)) {
      let j: number | undefined;
      thisCtx.forEach((ctx: object) => {
        j = i + 1;
        let thisMatch = matches[j];
        while (!this.getTagType(thisMatch).includes('loop close')) {
          currentInLoopElement = this.routeElement(thisMatch, ctx, currentInLoopElement);
          j++;
          thisMatch = matches[j];
        }
      });
      i = j || i;
      cursorElement.append(loopFragment);
    }
    return [cursorElement, i];
  }

  routeElement(match: string, ctx: object, cursorElement: DOMElement): DOMElement {
    const tagType = this.getTagType(match);
    let newElement: HTMLElement | null;
    let newTextContent: string;

    switch (tagType) {
      case 'element img':
        newElement = this.createElement(match);
        if (newElement) {
          cursorElement.append(newElement);
        }
        break;
      case 'element input':
        newElement = this.createElement(match);
        if (newElement) {
          cursorElement.append(newElement);
        }
        break;
      case 'element open':
        newElement = this.createElement(match);
        if (newElement) {
          cursorElement.append(newElement);
          cursorElement = newElement;
        }
        break;
      case 'element text':
        newTextContent = this.createTextContent(match, ctx);
        cursorElement.textContent = newTextContent;
        break;
      case 'element close':
        if ((cursorElement.parentNode instanceof HTMLElement) ||
          (cursorElement.parentNode instanceof DocumentFragment)) {
          cursorElement = cursorElement.parentNode;
        }
        break;
      default:
        break;
    }

    return cursorElement;
  }

  compile(ctx: object): DocumentFragment {
    return this._compileTemplate(ctx);
  }

  _compileTemplate(ctx: object): DocumentFragment {
    const fragment = document.createDocumentFragment();
    let currentElement: DOMElement = fragment;

    const matches = this._template.match(this.elementsRegExp.element);
    if (Array.isArray(matches)) {
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
    }
    return fragment;
  }
}

export default Templator;
