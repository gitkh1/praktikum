import Block from './Block';
import isEqual from './isEqual';

type AnyBlock = Block<object>;

function render(rootQuery: string, block: AnyBlock) {
  const root = document.querySelector(rootQuery);
  if (root) {
    root.append(block.getContent()?.firstChild as Node);
    block.dispatchComponentDidMount();
  }
}

class Route {
  private pathname: string;
  private block: AnyBlock;
  private props: Record<string, unknown>;

  constructor(
    pathname: string,
    view: AnyBlock,
    props: Record<string, unknown>
  ) {
    this.pathname = pathname;
    this.block = view;
    this.props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    render(this.props?.rootQuery as string, this.block);
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

  use(block: AnyBlock, pathname: string) {
    const route = new Route(pathname, block, { rootQuery: this.rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      if (event && event.currentTarget && 'location' in event.currentTarget) {
        this._onRoute(event.currentTarget?.['location']?.['pathname']);
      }
    }).bind(this);
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
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

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
