import HashRouterHandler from './handler/hash/hash-router-handler';
import HistoryRouterHandler from './handler/history-router-handler';
import { Pages, ID_SELECTOR } from './pages';

type Route = {
  path: string;
  callback: (resource: string) => void;
};
type RequestParams = {
  resource: string;
  path: string;
};

export default class Router {
  private routes: Route[];

  private handler: HashRouterHandler | HistoryRouterHandler;

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
    const pathForFind = requestParams.resource === '' ? requestParams.path : `${requestParams.path}/${ID_SELECTOR}`;
    const route = this.routes.find((item) => item.path === pathForFind);

    if (!route) {
      this.redirectToNotFoundPage();
      return;
    }

    route.callback(requestParams.resource);
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
