import { FRIEND_CLASS } from '../components/Friend/Friend';
import {
  DATA_FORM_TYPE,
  OVERLAY_CLASS,
} from '../modules/PopUpInput/PopUpInput';
import auth from '../pages/Auth/Auth';
import err from '../pages/Errors/Err';
import messenger from '../pages/Messeneger/Messenger';
import { CHAT_CLASS } from '../pages/Messeneger/Messenger.tmpl';
import sign from '../pages/Sign/Sign';
import userchangedata from '../pages/UserChangeData/UserChangeData';
import userchangepwd from '../pages/UserChangePwd/UserChangePwd';
import userprofile from '../pages/UserProfile/UserProfile';
import AnyBlock from '../types/AnyBlock';
import CallBackFn from '../types/CallBackFn';
import FORM_TYPES from '../types/FormTypes';
import Store, { StoreEvents } from '../utils/Store';
import chatController from './ChatController';
import chatListController from './ChatsController';
import formController from './FormsController';
import PATHS, {
  AUTH_PAGE,
  DEFAULT_MESSENGER_PAGE,
  ERR_PAGE_PATH,
  LOGOUT_PATH,
  SIGN_PAGES,
  USER_PROFILE,
} from './Paths';
import userAuthController from './UserController';

const HREF_REGEXP = /https?:\/\/[a-z0-9-.:]*\//gim;

const ROOT_QUERY = '#root';

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

export class Router {
  static __instance: Router;
  private currentRoute: null | Route = null;
  private rootQuery = '';
  routes: Route[] = [];
  history: History = window.history;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }
    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this.rootQuery = ROOT_QUERY;

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

  async start() {
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
        // Click on LogoutLink
        if (href === LOGOUT_PATH) {
          userAuthController.logout().then(() => this.go(PATHS.auth));
        } else if (href.includes(DATA_FORM_TYPE)) {
          this._dispatchDataForm(href);
        } else {
          this.go(href);
        }
      } else if (isClickOnOverlay(event)) {
        chatListController.overlayHide();
      } else if (isClickOnFriend(event)) {
        this._dispatchChats(event);
      }
    });
    Store.on(StoreEvents.Authorization, () => {
      if (Store.getState().authorized) {
        this.go(DEFAULT_MESSENGER_PAGE);
      }
    });
    Store.on(StoreEvents.UserChanged, () => {
      this.go(USER_PROFILE);
    });
    try {
      await userAuthController.getUser();
      this._onRoute(window.location.pathname);
    } catch (error) {
      console.log(error);
    }
  }

  private async _dispatchChats(event: Event) {
    try {
      const clickedId = getFriendId(event);
      if (!clickedId) {
        return;
      }
      if (getActiveChatId() === '') {
        await chatController.getChatData(clickedId);
        await chatController.initChat();
        this.showChat();
      } else if (getActiveChatId() === clickedId) {
        await chatController.closeWS();
        chatController.clearChat();
        this.hideChat();
      } else {
        await chatController.closeWS();
        await chatController.getChatData(clickedId);
        await chatController.initChat();
        this.showChat();
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    // !Authorized & go to chat ? --> go to Authpage
    if (!Store.getState().authorized) {
      if (!SIGN_PAGES.includes(pathname)) {
        this.go(AUTH_PAGE);
        return;
      }
    }

    // Authorized & go to Authpage/Signpage ? --> go to chat
    if (Store.getState().authorized) {
      if (SIGN_PAGES.includes(pathname)) {
        this.go(DEFAULT_MESSENGER_PAGE);
        return;
      }
    }

    if (this.currentRoute)
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
      chatListController.overlayShow();
    }
  }
}

const router = new Router();
const UPDATE_INTERVAL = 1000;
let updateIntrval: ReturnType<typeof setInterval> | null = null;

function messengerOnRender() {
  userAuthController.getUser();
  chatController.clearChat();
  updateIntrval = setInterval(
    () => chatListController.getChats(),
    UPDATE_INTERVAL
  );
}

function messengerOnUnRender() {
  if (!updateIntrval) {
    return;
  }
  clearInterval(updateIntrval);
}

router
  .use(auth, PATHS.auth)
  .use(messenger, PATHS.messenger, messengerOnRender, messengerOnUnRender)
  .use(sign, PATHS.sign)
  .use(userprofile, PATHS.userprofile, userAuthController.getUser)
  .use(userchangepwd, PATHS.userchangepwd, userAuthController.getUser)
  .use(userchangedata, PATHS.userchangedata, userAuthController.getUser)
  .use(err, PATHS.err);

export default router;
