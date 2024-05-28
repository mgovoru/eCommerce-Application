import { FooterView } from '../components/footer/footer';
import { HeaderView } from '../components/header/header';
import { MainView } from '../components/main/main';
import { ID_SELECTOR, Pages } from '../router/pages';
import Router from '../router/router';
import { Server } from '../server/server';
import State from '../state/state';
import { ElementCreator } from './base';
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
    this.server = new Server(this.router);
  }

  createView() {
    this.header = new HeaderView(this.router, this.server);
    this.main = new MainView();
    this.footer = new FooterView();
    const element = new ElementCreator({ tag: 'div', classNames: ['wrapper'] });
    element.append(this.header.getElement());
    element.append(this.main.getElement());
    element.append(this.footer.getElement());
    document.body.append(element.getNode());
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
          if (!localStorage.getItem('name')) {
            const { default: LoginView } = await import('../pages/page-login/page-login');
            this.setContent(Pages.LOGIN, new LoginView(this.router, state, this.server));
          }
        },
      },
      {
        path: `${Pages.PROFILE}`,
        callback: async () => {
          const { default: ProfilePageView } = await import('../pages/page-profile/page-profile');
          this.setContent(Pages.PROFILE, new ProfilePageView(this.router, state, this.server));
        },
      },
      // {
      //   path: `${Pages.CATALOG}`,
      //   callback: async () => {
      //     const { default: CatalogView } = await import('../pages/catalog/catalog');
      //     this.setContent(Pages.CATALOG, new CatalogView(this.router, state, this.server));
      //   },
      // },
      {
        path: `${Pages.REGISTRATION}`,
        callback: async () => {
          if (!localStorage.getItem('name')) {
            const { default: RegistartionView } = await import('../pages/page-registration/page-registration');
            this.setContent(Pages.REGISTRATION, new RegistartionView(this.router, state, this.server));
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
      {
        path: `${Pages.SHOP}`,
        callback: async () => {
          const { default: ShopView } = await import('../components/shop/shop');
          this.setContent(Pages.SHOP, new ShopView(this.router, this.server, this.state));
        },
      },
      {
        path: `${Pages.SHOP}/${ID_SELECTOR}`,
        callback: async (id: string) => {
          const { default: ShopView } = await import('../components/shop/shop');
          this.setContent(Pages.SHOP, new ShopView(this.router, this.server, this.state, id));
        },
      },
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
    if (this.header) {
      this.header.setSelectedItem(page);
    }
    if (this.main) {
      this.main.setContent(view);
    }
  }
}
