/* eslint-disable no-useless-escape */
// Simple template engine ((template, context) => DOM element)
// Поддержка циклов {{%each}} -- {{/%each}}
// Временное решение шаблонизатора, в планах упростить код
// и повысить его читабельность.
import isEmpty from "./isEmpty";

type DOMElement = HTMLElement | DocumentFragment;

// Тип MyObject используется для описания контекста шаблона. Пришлось для полей использовать any,
// так как неизвестно, вернется объект, массив строк или строка. А строить многочисленные
// проверки в других методах считаю ухудшат читабельность кода.
type MyObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propname?: any
}
export default class Templator {
  _template!: string;

  elementsRegExp = {
    element: /(<[^<\n]*>)|({{.*}})/gi,
    open: /(<[^\/][^><\n]*>)/gm,
    close: /<\/[\w]*>/gi,
    tag: /((?<=<)[^\/][0-9a-z]*)/gi,
    classes: /class="([^=<>\n]*)"/gm,
    loopOpen: /({{%each.*}})/gi,
    loopClose: /({{\/%each}})/gi,
    input: /(<input[^<\n]*>)/gm,
    img: /(<img[^<\n]*>)/gm,
    button: /(<button[^<\n]*>)/gm,
    quotes: /"([^=<>\n]*)"/gm,
    HTMLbrackets: /({{{.*}}})/gi,
    HTMLbracketsInLoop: /({{{!.*!}}})/gi
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

  private get(obj: MyObject, path: string | undefined) {
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

  private getTagType(description: string): string {
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
    } else if (description.match(this.elementsRegExp.HTMLbracketsInLoop)) {
      return 'element html bracketsInLoop';
    } else if (description.match(this.elementsRegExp.HTMLbrackets)) {
      return 'element html brackets';
    } else {
      return 'element text';
    }
  }

  private cutStringByMask(string: string, regExpMask: RegExp): string {
    const firstMatch = 0;
    const stringByMask: string = string?.match(regExpMask)?.[firstMatch] || '';
    return stringByMask;
  }

  private cutStringByMaskAndQuotes(string: string, regExpMask: RegExp): string {
    const quotesLength = 3;
    const stringByMask: string = this.cutStringByMask(string, regExpMask);
    const stringByQuotes = this.cutStringByMask(stringByMask, this.elementsRegExp.quotes);
    const stringWithoutQuotes: string = stringByQuotes.slice(quotesLength, -quotesLength).trim() || '';
    return stringWithoutQuotes;
  }

  private setElementProps(description: string, element: HTMLElement, ctx: object) {
    for (const [prop, regexp] of Object.entries(this.propsRegExp)) {
      const propName = this.cutStringByMaskAndQuotes(description, regexp);
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

  private setElementClasses(description: string, element: HTMLElement, ctx: object) {
    const classes = this.cutStringByMaskAndQuotes(description, this.elementsRegExp.classes);
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

  private createElement(description: string, ctx: object): HTMLElement | null {
    const tagName = this.cutStringByMask(description, this.elementsRegExp.tag).toLowerCase();
    if (!tagName) {
      return null;
    }

    const newElement = document.createElement(tagName);
    this.setElementClasses(description, newElement, ctx)
    this.setElementProps(description, newElement, ctx);
    return newElement;
  }

  private createTextContent(description: string, ctx: object): string {
    const textName = description.slice(2, -2).trim();
    const textContent = this.get(ctx, textName);
    if (typeof textContent !== 'string') {
      return "";
    }
    return textContent;
  }

  private createloopElement(i: number, ctx: object, cursorElement: DOMElement): [DOMElement, number] {
    const loopFragment: DocumentFragment = document.createDocumentFragment();
    Object.values(ctx).forEach((description: string) => {
      i++;
      const newElement = this.createElement(description, {});
      if (newElement) {
        loopFragment.append(newElement);
      }
    });
    cursorElement.append(loopFragment);
    return [cursorElement, i];
  }

  private routeElement(match: string, ctx: object, cursorElement: DOMElement): DOMElement {
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
      case 'element html bracketsInLoop':
        newDescr = match.slice(4, -4).trim();
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
    return this.compileTemplate(ctx);
  }

  private compileTemplate(ctx: object): DocumentFragment {
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
          [currentElement, i] = this.createloopElement(i, ctx, currentElement);
        }
        i++;
      }
    }
    return fragment;
  }
}
