// import '../style.css';
import Router from './router/router';
import { Pages, ID_SELECTOR } from './router/pages';
import State from './state/state';
import FooterView from './temp-pages/footer/footer-view';
import HeaderView from './temp-pages/header/header-view';
import MainView from './temp-pages/main/main-view';
import View from './temp-pages/view';

export default class App {
  private header: HeaderView | null;
  private main: MainView | null;
  private router: Router;

  constructor() {
    this.header = null;
    this.main = null;

    const state = new State();

    const routes = this.createRoutes(state);
    this.router = new Router(routes);

    this.router.setHashHandler();

    this.createView();
  }

  createView() {
    this.header = new HeaderView(this.router);
    this.main = new MainView();
    const footer = new FooterView();

    document.body.append(this.header.getHtmlElement(), this.main.getHtmlElement(), footer.getHtmlElement());
  }

  createRoutes(state: State) {
    return [
      {
        path: ``,
        callback: async () => {
          const { default: IndexView } = await import('./temp-pages/index-view/index-view');
          this.setContent(Pages.INDEX, new IndexView(state));
        },
      },
      {
        path: `${Pages.INDEX}`,
        callback: async () => {
          const { default: IndexView } = await import('./temp-pages/index-view/index-view');
          this.setContent(Pages.INDEX, new IndexView(state));
        },
      },
      {
        path: `${Pages.LOGIN}`,
        callback: async () => {
          const { default: LoginView } = await import('./temp-pages/login/login-view');
          this.setContent(Pages.LOGIN, new LoginView(state));
        },
      },
      {
        path: `${Pages.REGISTARTION}`,
        callback: async () => {
          const { default: RegistartionView } = await import('./temp-pages/registartion/registartion-view');
          this.setContent(Pages.REGISTARTION, new RegistartionView(state));
        },
      },
      {
        path: `${Pages.PRODUCT}`,
        callback: async () => {
          const { default: ProductView } = await import('./temp-pages/product/product-view');
          this.setContent(Pages.PRODUCT, new ProductView(this.router));
        },
      },
      {
        path: `${Pages.PRODUCT}/${ID_SELECTOR}`,
        callback: async (id) => {
          const { default: ProductView } = await import('./temp-pages/product/product-view');
          this.setContent(Pages.PRODUCT, new ProductView(this.router, id));
        },
      },
      {
        path: `${Pages.NOT_FOUND}`,
        callback: async () => {
          const { default: NotFoundView } = await import('./temp-pages/not-found/not-found');
          this.setContent(Pages.NOT_FOUND, new NotFoundView());
        },
      },
    ];
  }

  setContent(page: string, view: View) {
    if (this.header) {
      this.header.setSelectedItem(page);
    }
    if (this.main) {
      this.main.setContent(view);
    }
  }
}
