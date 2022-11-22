import {
  DATA_FORM_TYPE,
  OVERLAY_CLASS,
} from '../modules/PopUpInput/PopUpInput';
import { CHAT_CLASS } from '../pages/Messeneger/Messenger.tmpl';
import AnyBlock from '../types/AnyBlock';
import CallBackFn from '../types/CallBackFn';
import FORM_TYPES from '../types/FormTypes';
import Store from '../utils/Store';
import chatController from './ChatController';
import formController from './FormsController';
import { ERR_PAGE_PATH } from './Paths';

const HREF_REGEXP = /https?:\/\/[a-z0-9-.:]*\//gim;

export const FRIEND_CLASS = 'friend__wrapper';

function getLinkType(href: string): string {
  const REGEXP = /(?<=#).*/gim;
  const matches = href.match(REGEXP) || [''];
  return matches[0];
}

function render(rootQuery: string, block: AnyBlock) {
  const root = document.querySelector(rootQuery);
  if (root) {
    const container = block.getContent();
    if (!container.firstChild) {
      block.dispatchComponentDidMount();
    }
    root.append(container as Node);
  }
}

function unRender(rootQuery: string) {
  const root = document.querySelector(rootQuery);
  if (root) {
    root.innerHTML = '';
  }
}

function getHref(element: HTMLElement): string | undefined {
  const fullHref = element.closest('a')?.href;
  const href = fullHref?.replace(HREF_REGEXP, '/');
  return href || undefined;
}

function isClickOnLink(event: Event): boolean {
  const element = event.target as HTMLElement;
  if (element.closest('a')) {
    return true;
  } else {
    return false;
  }
}

function isClickOnOverlay(event: Event): boolean {
  const element = event.target as HTMLElement;
  if (element.classList.contains(OVERLAY_CLASS)) {
    return true;
  } else {
    return false;
  }
}

function isClickOnFriend(event: Event): boolean {
  const element = event.target as HTMLElement;
  if (element.closest(`.${FRIEND_CLASS}`)) {
    return true;
  } else {
    return false;
  }
}

function getFriendId(event: Event): string {
  const element = event.target as HTMLElement;
  const friend = element.closest(`.${FRIEND_CLASS}`) as HTMLElement;
  return friend?.dataset?.id || '';
}

function getActiveChatId(): string {
  return `${Store.getState().activeChat.id}`;
}

class Route {
  pathname: string;
  block: AnyBlock;
  props: Record<string, unknown>;
  renderCallback?: CallBackFn;
  unrenderCallback?: CallBackFn;

  constructor(
    pathname: string,
    block: AnyBlock,
    props: Record<string, unknown>,
    renderCallback?: CallBackFn,
    unrenderCallback?: CallBackFn
  ) {
    this.pathname = pathname;
    this.block = block;
    this.props = props;
    if (renderCallback) {
      this.renderCallback = renderCallback;
    }
    if (unrenderCallback) {
      this.unrenderCallback = unrenderCallback;
    }
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  match(pathname: string) {
    return pathname === this.pathname;
  }

  render() {
    if (this.renderCallback) {
      this.renderCallback();
    }
    render(this.props?.rootQuery as string, this.block);
  }

  unRender() {
    if (this.unrenderCallback) {
      this.unrenderCallback();
    }
    unRender(this.props?.rootQuery as string);
  }
}

class Router {
  static __instance: Router;
  private currentRoute: null | Route = null;
  private rootQuery = '';
  routes: Route[] = [];
  history: History = window.history;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this.rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(
    block: AnyBlock,
    pathname: string,
    renderCallback?: CallBackFn,
    unrenderCallback?: CallBackFn
  ) {
    const route = new Route(
      pathname,
      block,
      { rootQuery: this.rootQuery },
      renderCallback,
      unrenderCallback
    );
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      if (event && event.currentTarget && 'location' in event.currentTarget) {
        this._onRoute(event.currentTarget?.['location']?.['pathname']);
      }
    }).bind(this);
    window.addEventListener('click', (event) => {
      if (!(event && event.target)) {
        return;
      }
      const element = event.target as HTMLElement;
      if (isClickOnLink(event)) {
        event.preventDefault();
        const href = getHref(element);
        if (href === undefined) {
          return;
        }
        if (href.includes(DATA_FORM_TYPE)) {
          this._dispatchDataForm(href);
        } else {
          this.go(href);
        }
      } else if (isClickOnOverlay(event)) {
        this.overlayHide();
      } else if (isClickOnFriend(event)) {
        this._dispatchChats(event);
      }
    });
    this._onRoute(window.location.pathname);
  }

  private async _dispatchChats(event: Event) {
    const clickedId = getFriendId(event);
    if (!clickedId) {
      return;
    }
    if (getActiveChatId() === '') {
      await chatController.getChatData(clickedId);
      await chatController.initChat();
      this.showChat();
    } else if (getActiveChatId() === clickedId) {
      await chatController.clearChat();
      await chatController.closeChat();
      this.hideChat();
    } else {
      await chatController.closeChat();
      await chatController.getChatData(clickedId);
      await chatController.initChat();
      this.showChat();
    }
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.unRender();
    }

    this.currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  update() {
    this._onRoute(window.location.pathname);
  }

  getRoute(pathname: string) {
    const route =
      this.routes.find((route) => route.match(pathname)) ||
      this.routes.find((route) => route.match(ERR_PAGE_PATH));
    return route;
  }

  overlayShow() {
    const overlay = document.querySelector(`.${OVERLAY_CLASS}`) as HTMLElement;
    if (overlay) {
      overlay.style.display = 'block';
    }
  }

  overlayHide() {
    const overlay = document.querySelector(`.${OVERLAY_CLASS}`) as HTMLElement;
    if (overlay) {
      overlay.style.display = 'none';
    }
  }

  hideChat() {
    const overlay = document.querySelector(`.${CHAT_CLASS}`) as HTMLElement;
    if (overlay) {
      overlay.style.visibility = 'hidden';
    }
  }

  showChat() {
    const overlay = document.querySelector(`.${CHAT_CLASS}`) as HTMLElement;
    if (overlay) {
      overlay.style.visibility = 'visible';
    }
  }

  private _dispatchDataForm(href: string) {
    const linkType = getLinkType(href);
    if (Object.values(FORM_TYPES).includes(linkType)) {
      formController.setPopUpProps(linkType);
      this.overlayShow();
    }
  }
}

export default Router;
