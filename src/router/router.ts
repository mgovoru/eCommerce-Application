import HashRouterHandler from './handler/hash/hash-router-handler';
import HistoryRouterHandler from './handler/history-router-handler';
import { ID_SELECTOR, Pages } from './pages';

type Route = {
  path: string;
  callback: (resource: string, category?: string) => void;
};
type RequestParams = {
  resource: string;
  path: string;
  category?: string;
};

export default class Router {
  routes: Route[];

  private handler: HashRouterHandler | HistoryRouterHandler;

  private isHandling: boolean = false;

  constructor(routes: Route[]) {
    this.routes = routes;
    this.handler = new HistoryRouterHandler(this.urlChangedHandler.bind(this));

    document.addEventListener('DOMContentLoaded', () => {
      this.handler.navigate('');
    });
  }

  setHashHandler() {
    this.handler.disable();
    this.handler = new HashRouterHandler(this.urlChangedHandler.bind(this));
  }

  navigate(url: string) {
    this.handler.navigate(url);
  }

  urlChangedHandler(requestParams: RequestParams) {
    if (this.isHandling) return;
    this.isHandling = true;

    let pathForFind = requestParams.path;

    if (requestParams.resource !== '' && requestParams.path === 'product') {
      pathForFind = `${requestParams.path}/${ID_SELECTOR}`;
    } else if (requestParams.resource) {
      pathForFind = `${requestParams.path}/${requestParams.resource}`;
    }
    const route = this.routes.find((item) => item.path === pathForFind);
    if (!route) {
      this.redirectToNotFoundPage();
      this.isHandling = false;
      return;
    }

    route.callback(requestParams.resource);
    this.isHandling = false;
  }

  redirectToNotFoundPage() {
    const notFoundPage = this.routes.find((item) => item.path === Pages.NOT_FOUND);
    if (notFoundPage) {
      window.history.replaceState(null, '', null);
      notFoundPage.callback('');
    } else {
      console.error('Not-found page is not registered.');
    }
  }
}
