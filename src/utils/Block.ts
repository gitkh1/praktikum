import { EventCallback } from '../types/Events';
import PlainObject from '../types/PlainObject';
import EventBus from './EventBus';
import Templator from './templator';

type OwnProps = PlainObject;

const CONTAINER_TAGNAME = 'div';

export default abstract class Block<Props extends object> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_UNM: 'flow:component-did-unmount',
    FLOW_RME: 'flow:component-remove-events',
  };

  private eventBus: () => EventBus;
  private element: Element;
  private id: string;
  private rootClass: string;
  private tagName: string;
  private children: Record<string, Block<Props>> = {};
  protected props: OwnProps = {};

  constructor(propsAndChildren: Props, rootClass?: string, tagName?: string) {
    const { children, props } = this.getChildren(propsAndChildren);
    this.children = children;
    this.id = Math.trunc(Math.random() * 10 ** 9).toString();
    this.props = props;
    this.rootClass = rootClass || '';
    this.tagName = tagName || CONTAINER_TAGNAME;
    this.element = document.createElement(this.tagName);

    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this.registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(
      Block.EVENTS.FLOW_CDM,
      this.componentDidMountPrivate.bind(this)
    );
    eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this.componentDidUpdatePrivate.bind(this)
    );
    eventBus.on(Block.EVENTS.FLOW_RENDER, this.renderPrivate.bind(this));
    eventBus.on(
      Block.EVENTS.FLOW_UNM,
      this.componentDidUnMountPrivate.bind(this)
    );
    eventBus.on(Block.EVENTS.FLOW_RME, this.removeEvents.bind(this));
  }

  private getChildren(propsAndChildren: object) {
    const children: Record<string, Block<Props>> = {};
    const props: OwnProps = {};
    Object.entries(propsAndChildren).forEach(
      ([key, value]: [string, object | string | string[]]) => {
        if (value instanceof Block) {
          children[key] = value;
        } else {
          props[key] = value;
        }
      }
    );
    return { children, props };
  }

  private createResources() {
    if (!this.id) {
      return;
    }
    if (this.rootClass) {
      this.element.classList.add(this.rootClass);
    } else {
      this.setElemAttr('data-id', this.id);
    }
  }

  init() {
    this.createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  setElemAttr(key: string, value: string) {
    this.element.setAttribute(key, value);
  }

  private componentDidMountPrivate() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {
    this.renderPrivate();
    return true;
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private componentDidUpdatePrivate() {
    const response: boolean = this.componentDidUpdate();
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: OwnProps) => {
    if (!nextProps) {
      return;
    }
    if ('events' in nextProps) {
      this.eventBus().emit(Block.EVENTS.FLOW_RME);
    }
    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  setChildren = (nexChildren: object) => {
    const { children } = this.getChildren(nexChildren);
    this.children = children;
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  private renderPrivate() {
    const block = this.render();
    if (this.element) {
      this.element.innerHTML = '';
    }
    if (block) {
      this.element?.append(block);
    }
    this.addEvents();
  }

  render(): Node | null {
    return new HTMLElement();
  }

  compile(template: string, props: object) {
    const propsAndStubs: Record<string, string> = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = this.createDocumentElement('div');
    fragment.append(new Templator().compile(template, propsAndStubs));

    Object.values(this.children).forEach((child) => {
      const stub = fragment.querySelector(
        `[data-id="${child.id.slice(2, -2)}"]`
      );
      const newElement = child?.getContent();
      if (stub && newElement) {
        stub.replaceWith(newElement);
      }
    });

    return fragment.firstChild;
  }

  getContent(): Node {
    return this.element;
  }

  private addEvents() {
    if (this && this.props && 'events' in this.props) {
      if (!this?.element?.firstChild) {
        return;
      }
      if (!this?.props?.events) {
        return;
      }

      const element = this?.element?.firstChild;
      const events = this?.props?.events as PlainObject;
      Object.keys(events).forEach((eventName: string) => {
        const event = events[eventName] as EventCallback;
        const handler = event[0];
        const isCapture = event[1];
        element.addEventListener(eventName, handler, isCapture);
      });
    }
  }

  private removeEvents() {
    if ('events' in this.props) {
      if (!this?.element?.firstChild) {
        return;
      }
      if (!this?.props?.events) {
        return;
      }
      const element = this?.element?.firstChild;
      const events = this?.props?.events as PlainObject;
      Object.keys(events).forEach((eventName) => {
        const event = events[eventName] as EventCallback;
        const handler = event[0];
        const isCapture = event[1] || false;
        element.removeEventListener(eventName, handler, isCapture);
      });
    }
  }

  private createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    const element: HTMLElement = <HTMLElement>this.getContent();
    element.style.display = 'block';
  }

  hide() {
    const element: HTMLElement = <HTMLElement>this.getContent();
    if (element) {
      element.style.display = 'none';
    }
  }

  dispatchComponentDidUnMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_UNM);
  }

  private componentDidUnMountPrivate() {
    this.componentDidUnMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RME);
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidUnMount();
    });
  }

  componentDidUnMount() {
    return true;
  }
}
