import { View } from '../../app/view';
import CatalogView from '../../pages/catalog/catalog';
import Router from '../../router/router';
import { Server } from '../../server/server';

const CssClasses = {
  SHOP: 'shop',
};

export default class ShopView extends View {
  router: Router;

  server: Server;

  constructor(router: Router, server: Server, id = '') {
    const params = {
      tag: 'section',
      classNames: [CssClasses.SHOP],
    };
    super(params);
    this.router = router;
    this.server = server;

    if (id) {
      // this.addLargeCardToView(this.router, id);
      this.getElement().textContent = 'карточка товара';
    } else {
      const catalog = new CatalogView(this.router, this.server).getElement();
      this.getElement().append(catalog);
    }
  }
}
