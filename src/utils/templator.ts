/* eslint-disable no-useless-escape */
// Simple template engine ((template, context) => DOM element)
// Loop support {{%each}} -- {{/%each}}
// Does not support loops within loops.
import isEmpty from "./isEmpty";

type DOMElement = HTMLElement | DocumentFragment;
type MyObject = {
  [key: string]: any
  propname?: any
}
class Templator {
  _template!: string;

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
    HTMLbrackets: /({{{.*}}})/gi
  }
  propsRegExp = {
    type: /type="([^=<>\n]*)"/gm,
    src: /src="([^=<>\n]*)"/gm,
    alt: /src="([^=<>\n]*)"/gm,
    href: /href="([^=<>\n]*)"/gm,
    name: /name="([^=<>\n]*)"/gm,
    dataId: /data-id="([^=<>\n]*)"/gm,
    placeholder: /placeholder="([^=<>\n]*)"/gm
  }

  get(obj: MyObject, path: string | undefined) {
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
    } else if (description.match(this.elementsRegExp.HTMLbrackets)) {
      return 'element html brackets';
    } else {
      return 'element text';
    }
  }

  setElementProps(description: string, element: HTMLElement, ctx: object) {
    const firstMatch = 0;

    for (const [prop, regexp] of Object.entries(this.propsRegExp)) {
      const propName = description?.match(regexp)?.[firstMatch]?.
        match(this.elementsRegExp.quotes)?.[firstMatch]?.slice(3, -3).trim();
      const propValue = <string>this.get(ctx, propName);
      if (!isEmpty(propName)) {
        if (prop === 'dataId') {
          element.dataset.id = <string>propValue;
        } else {
          element.setAttribute(prop, propValue);
        }
      }
    }
  }

  setElementClasses(description: string, element: HTMLElement, ctx: object) {
    const firstMatch = 0;
    const classes = description?.match(this.elementsRegExp.classes)?.[firstMatch]?.
      match(this.elementsRegExp.quotes)?.[firstMatch]?.slice(3, -3).trim();
    let classNames;
    if ((classes) && (classes.slice(0, 1) === `%`) && (classes.slice(-1) === `%`)) {
      classNames = classes.slice(1, -1).split(' ');
    } else {
      classNames = this.get(ctx, classes);
      if (!Array.isArray(classNames)) {
        classNames = Array.of(classNames);
      }
    }
    if ((classes) && (!isEmpty(classNames)) && (Array.isArray(classNames))) {
      classNames.filter((className: string) => !isEmpty(className)).
        forEach((className: string) => element.classList.add(className));
    }
  }

  createElement(description: string, ctx: object): HTMLElement | null {
    const firstMatch = 0;
    const tagName = description?.match(this.elementsRegExp.tag)?.[firstMatch]?.slice(1).toLowerCase();
    if (!tagName) {
      return null;
    }

    const newElement = document.createElement(tagName);
    this.setElementClasses(description, newElement, ctx)
    this.setElementProps(description, newElement, ctx);
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
    let newDescr: string;
    let newElementDescr: string;

    switch (tagType) {
      case 'element img':
        newElement = this.createElement(match, ctx);
        if (newElement) {
          cursorElement.append(newElement);
        }
        break;
      case 'element input':
        newElement = this.createElement(match, ctx);
        if (newElement) {
          cursorElement.append(newElement);
        }
        break;
      case 'element open':
        newElement = this.createElement(match, ctx);
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
      case 'element html brackets':
        newDescr = match.slice(3, -3).trim();
        newElementDescr = <string>this.get(ctx, newDescr);
        this.routeElement(newElementDescr, ctx, cursorElement);
        break;
      default:
        break;
    }

    return cursorElement;
  }

  compile(template: string, ctx: object): DocumentFragment {
    this._template = template;
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
