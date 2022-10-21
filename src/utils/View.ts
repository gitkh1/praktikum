//Based class View of MVC
import EventBus from "./EventBus";
import Templator from "./Templator";

type EventCallback = [(event: Event) => void, boolean?];
type EventHandler = Record<string, EventCallback>;
type OwnProps = Record<string, object | object[] | string | string[]> & { events?: EventHandler };
export type EventListeners = Record<'submit' | 'focus' | 'blur', EventCallback>
// focus и blur не всплывают, а обработчики я ставлю на всю форму,
// поэтому будем ловить эти события на погружении
export default abstract class View<Props extends object> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
    FLOW_UNM: "flow:component-did-unmount",
    FLOW_RME: "flow:component-remove-events",
  };

  private eventBus: () => EventBus;
  private element: null | Element = null;
  private tagName: string;
  private id: string;
  private children: Record<string, View<Props>> = {};
  protected props: OwnProps = {
  };

  constructor(propsAndChildren: Props, tagName = 'div') {
    const { children, props } = this.getChildren(propsAndChildren);
    this.children = children;
    this.tagName = tagName;
    this.id = Math.trunc(Math.random() * (10 ** 9)).toString();
    this.props = this.makePropsProxy(props);

    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this.registerEvents(eventBus);
    eventBus.emit(View.EVENTS.INIT);
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(View.EVENTS.INIT, this.init.bind(this));
    eventBus.on(View.EVENTS.FLOW_CDM, this.componentDidMountPrivate.bind(this));
    eventBus.on(View.EVENTS.FLOW_CDU, this.componentDidUpdatePrivate.bind(this));
    eventBus.on(View.EVENTS.FLOW_RENDER, this.renderPrivate.bind(this));
    eventBus.on(View.EVENTS.FLOW_UNM, this.componentDidUnMountPrivate.bind(this));
    eventBus.on(View.EVENTS.FLOW_RME, this.removeEvents.bind(this));
  }

  private getChildren(propsAndChildren: object) {
    const children: Record<string, View<Props>> = {};
    const props: OwnProps = {};
    Object.entries(propsAndChildren).forEach(([key, value]: [string, object | string | string[]]) => {
      if (value instanceof View) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props };
  }

  private createResources() {
    if (this.tagName) {
      const tagName = this.tagName;
      this.element = this.createDocumentElement(tagName);
      if (this.id) {
        this.element.setAttribute('data-id', this.id);
      }
    }
  }

  init() {
    this.createResources();
    this.eventBus().emit(View.EVENTS.FLOW_RENDER);
  }

  private componentDidMountPrivate() {
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

  private componentDidUpdatePrivate() {
    const response: boolean = this.componentDidUpdate();
    if (response) {
      this.eventBus().emit(View.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: OwnProps) => {
    if (!nextProps) {
      return;
    }
    //Вначале удаляем существующие события
    if ('events' in nextProps) {
      this.eventBus().emit(View.EVENTS.FLOW_RME);
    }
    Object.assign(this.props, nextProps);
  };

  private renderPrivate() {
    const View = this.render();

    if (this.element) {
      this.element.innerHTML = '';
    }

    if (View) {
      this.element?.append(View);
    }

    this.addEvents();
  }

  render(): Node | null {
    return new HTMLElement;
  }

  compile(template: string, props: object) {
    const propsAndStubs: Record<string, string> = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`
    });

    const fragment = this.createDocumentElement('div');
    fragment.append((new Templator).compile(template, propsAndStubs));

    Object.values(this.children).forEach(child => {
      const stub = fragment.querySelector(`[data-id="${child.id.slice(2, -2)}"]`);
      const newElement = child?.getContent()?.firstChild;
      if ((stub) && (newElement)) {
        stub.replaceWith(newElement);
      }
    });

    return fragment.firstChild;
  }

  getContent(): Node | null {
    return this.element;
  }

  private makePropsProxy = (props: OwnProps) => new Proxy(props, {
    get: (target: OwnProps, prop: string) => {
      const value = target[prop];
      return typeof value === "function" ? value.bind(target) : value;
    },
    set: (target: OwnProps, prop: string, value) => {
      target[prop] = value;
      this.eventBus().emit(View.EVENTS.FLOW_CDU);
      return true;
    }
  });

  private addEvents() {
    if ((this) && (this.props) && ('events' in this.props)) {
      const events = this?.props?.events || {};
      if (!this?.element?.firstChild) {
        return;
      }
      const element = this?.element?.firstChild;
      Object.keys(events).forEach((eventName: string) => {
        const handler = events[eventName][0];
        const isCapture = events[eventName][1] || false;
        element.addEventListener(eventName, handler, isCapture);
      });
    }
  }

  private removeEvents() {
    if ('events' in this.props) {
      const events = this?.props?.events || {};
      if (!this?.element?.firstChild) {
        return;
      }
      const element = this?.element?.firstChild;
      Object.keys(events).forEach(eventName => {
        const handler = events[eventName][0];
        const isCapture = events[eventName][1] || false;
        element.removeEventListener(eventName, handler, isCapture);
      });
    }
  }

  private createDocumentElement(tagName: string) {
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
    this.eventBus().emit(View.EVENTS.FLOW_UNM);
  }

  private componentDidUnMountPrivate() {
    this.componentDidUnMount();
    this.eventBus().emit(View.EVENTS.FLOW_RME);
    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidUnMount();
    });
  }

  componentDidUnMount() {
    return true;
  }
}
