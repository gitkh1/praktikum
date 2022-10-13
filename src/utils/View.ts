//Based class View of MVC

import EventBus from "./EventBus";
import Templator from "./templator";

export default abstract class View {
  private eventBus: () => EventBus;
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
    FLOW_UNM: "flow:component-did-unmount"
  };

  _element: null | Element = null;
  _tagName = "";
  _id: null | string;
  props: {
    target?: { [key: string]: string | (() => void) },
    oldEvents?: { [key: string]: () => void },
    events?: { [key: string]: () => void },
  } | object;
  children: object = {};

  constructor(propsAndChildren = {}) {
    const tagName = "div"

    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;

    this._tagName = tagName;

    this._id = Math.trunc(Math.random() * (10 ** 9)).toString();
    this.props = this._makePropsProxy(props);

    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(View.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(View.EVENTS.INIT, this.init.bind(this));
    eventBus.on(View.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(View.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(View.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(View.EVENTS.FLOW_UNM, this._componentDidUnMount.bind(this));
  }

  _getChildren(propsAndChildren: object) {
    const children: { [key: string]: object | string | string[] } = {};
    const props: { [key: string]: object | string | string[] } = {};

    Object.entries(propsAndChildren).forEach(([key, value]: [string, object | string | string[]]) => {
      if (value instanceof View) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props };
  }

  _createResources() {
    if (this._tagName) {
      const tagName = this._tagName;
      this._element = this._createDocumentElement(tagName);
      if (this._id) {
        this._element.setAttribute('data-id', this._id);
      }
    }
  }

  init() {
    this._createResources();
    this.eventBus().emit(View.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {
    return true;
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(View.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate() {
    const response: boolean = this.componentDidUpdate();
    if (response) {
      this.eventBus().emit(View.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  _render() {
    const View = this.render();

    this._removeEvents();

    if (this._element) {
      this._element.innerHTML = '';
    }

    if (View) {
      this._element?.append(View);
    }

    this._addEvents();
  }

  render(): Node | null {
    return new HTMLElement;
  }

  compile(template: string, props: object) {
    const propsAndStubs: { [key: string]: string } = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    });

    const fragment = this._createDocumentElement('div');

    fragment.append((new Templator).compile(template, propsAndStubs));

    Object.values(this.children).forEach(child => {
      const stub = fragment.querySelector(`[data-id="${child._id.slice(2, -2)}"]`);
      if (stub) {
        stub.replaceWith(child.getContent().firstChild);
      }
    });

    return fragment.firstChild;
  }

  getContent(): Node | null {
    return this._element;
  }

  _makePropsProxy = (props: object) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    return new Proxy(props, {
      get(target: { [key: string]: object | string | string[] }, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: { [key: string]: string | (() => void) }, prop: string, value) {
        target[prop] = value;
        that.eventBus().emit(View.EVENTS.FLOW_CDU);
        return true;
      }
    });
  }

  _addEvents() {
    if ('events' in this.props) {
      const events = this.props.events || {};
      if (!this?._element?.firstChild) {
        return;
      }
      const element = this?._element?.firstChild;
      Object.keys(events).forEach((eventName: string) => {
        element.addEventListener(eventName, events[eventName]);
        if (('oldEvents' in this.props) && (this.props.oldEvents) && ('eventName' in this.props.oldEvents)) {
          this.props.oldEvents[eventName] = events[eventName];
        }
      });
    }
  }

  _removeEvents() {
    if ('oldEvents' in this.props) {
      const events = this.props.oldEvents || {};
      if (!this?._element?.firstChild) {
        return;
      }
      const element = this?._element?.firstChild;
      Object.keys(events).forEach(eventName => {
        element.removeEventListener(eventName, events[eventName]);
        if (('oldEvents' in this.props) && (this.props.oldEvents) && ('eventName' in this.props.oldEvents)) {
          delete this?.props?.oldEvents?.[eventName];
        }
      });
    }
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    const element: HTMLElement = <HTMLElement>this.getContent();
    element.style.display = "block";
  }

  hide() {
    const element: HTMLElement = <HTMLElement>this.getContent();
    if (element) {
      element.style.display = "none";
    }
  }

  dispatchComponentDidUnMount() {
    this._removeEvents();
    this.eventBus().emit(View.EVENTS.FLOW_UNM);
  }

  _componentDidUnMount() {
    this.componentDidUnMount();
    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidUnMount() {
    return true;
  }
}
