import { FooterView } from '../components/footer/footer';
import { HeaderView } from '../components/header/header';
import { MainView } from '../components/main/main';
import { Pages } from '../router/pages';
import Router from '../router/router';
import { Server } from '../server/server';
import State from '../state/state';
import { View } from './view';

export class App {
  header: HeaderView | null;

  footer: FooterView | null;

  main: MainView | null;

  private router: Router;

  state: State;

  server: Server;

  constructor() {
    this.header = null;
    this.main = null;
    this.footer = null;
    this.state = new State();
    const routes = this.createRoutes(this.state);
    this.router = new Router(routes);
    this.router.setHashHandler();
    this.server = new Server();
  }

  createView() {
    this.header = new HeaderView(this.router, this.server);
    this.main = new MainView();
    this.footer = new FooterView();
    document.body.append(this.header.getElement());
    document.body.append(this.main.getElement());
    document.body.append(this.footer.getElement());
  }

  createRoutes(state: State) {
    return [
      {
        path: ``,
        callback: async () => {
          const { default: PageIndexView } = await import('../pages/page-index/page-index');
          this.setContent(Pages.INDEX, new PageIndexView(state));
        },
      },
      {
        path: `${Pages.MAIN}`,
        callback: async () => {
          const { default: MainPageView } = await import('../pages/main-page/main-page');
          this.setContent(Pages.MAIN, new MainPageView(state));
        },
      },
      {
        path: `${Pages.LOGIN}`,
        callback: async () => {
          if (!localStorage.getItem('tokenCashe')) {
            const { default: LoginView } = await import('../pages/page-login/page-login');
            this.setContent(Pages.LOGIN, new LoginView(this.router, state));
          }
        },
      },
      {
        path: `${Pages.REGISTRATION}`,
        callback: async () => {
          if (!localStorage.getItem('tokenCashe')) {
            const { default: RegistartionView } = await import('../pages/page-registration/page-registration');
            this.setContent(Pages.REGISTRATION, new RegistartionView(this.router, state));
          }
        },
      },
      {
        path: `${Pages.CART}`,
        callback: async () => {
          const { default: CartView } = await import('../pages/cart/cart');
          this.setContent(Pages.CART, new CartView(state));
        },
      },
      // {
      //   path: `${Pages.PRODUCT}`,
      //   callback: async () => {
      //     const { default: ProductView } = await import('./temp-pages/product/product-view');
      //     this.setContent(Pages.PRODUCT, new ProductView(this.router));
      //   },
      // },
      // {
      //   path: `${Pages.PRODUCT}/${ID_SELECTOR}`,
      //   callback: async (id) => {
      //     const { default: ProductView } = await import('./temp-pages/product/product-view');
      //     this.setContent(Pages.PRODUCT, new ProductView(this.router, id));
      //   },
      // },
      {
        path: `${Pages.NOT_FOUND}`,
        callback: async () => {
          const { default: Page404View } = await import('../pages/404page/404page');
          this.setContent(Pages.NOT_FOUND, new Page404View(this.router));
        },
      },
    ];
  }

  setContent(page: string, view: View) {
    // if (this.header) {
    //   this.header.setSelected(page);
    // }
    if (this.main) {
      this.main.setContent(view);
    }
  }
}
