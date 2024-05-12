import { FooterView } from '../components/footer/footer';
import { HeaderView } from '../components/header/header';
import { MainView } from '../components/main/main';
import { Pages } from '../router/pages';
import Router from '../router/router';
import State from '../state/state';
import { View } from './view';

export class App {
  header: HeaderView | null;

  footer: FooterView | null;

  main: MainView | null;

  private router: Router;

  state: State;

  constructor() {
    this.header = null;
    this.main = null;
    this.footer = null;
    this.state = new State();
    const routes = this.createRoutes(this.state);
    this.router = new Router(routes);
    this.router.setHashHandler();
  }

  createView() {
    this.header = new HeaderView(this.router);
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
          const { default: PageMainView } = await import('../pages/page-main/page-main');
          this.setContent(Pages.MAIN, new PageMainView(state));
        },
      },
      {
        path: `${Pages.MAIN}`,
        callback: async () => {
          const { default: PageMainView } = await import('../pages/page-main/page-main');
          this.setContent(Pages.MAIN, new PageMainView(state));
        },
      },
      {
        path: `${Pages.LOGIN}`,
        callback: async () => {
          const { default: LoginView } = await import('../pages/login/login');
          this.setContent(Pages.LOGIN, new LoginView(state));
        },
      },
      // {
      //   path: `${Pages.REGISTARTION}`,
      //   callback: async () => {
      //     const { default: RegistartionView } = await import('./temp-pages/registartion/registartion-view');
      //     this.setContent(Pages.REGISTARTION, new RegistartionView(state));
      //   },
      // },
      {
        path: `${Pages.CART}`,
        callback: async () => {
          const { default: CartView } = await import('../pages/cart/cart');
          this.setContent(Pages.REGISTARTION, new CartView(state));
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
          this.setContent(Pages.NOT_FOUND, new Page404View());
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
