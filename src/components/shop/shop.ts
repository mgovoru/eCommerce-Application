import { View } from '../../app/view';
import CatalogView from '../../pages/catalog/catalog';
import Router from '../../router/router';
import { Server } from '../../server/server';
import State from '../../state/state';
import { RequestDetailedProduct } from '../../server/requestDetailedProduct';
import DetailedProductView from '../../pages/page-product/detailed-product';
import { ProductDetail } from '../../app/type';

const CssClasses = {
  SHOP: 'shop',
};

export default class ShopView extends View {
  router: Router;

  server: Server;

  state: State;

  constructor(router: Router, server: Server, state: State, key = '', category = '') {
    const params = {
      tag: 'section',
      classNames: [CssClasses.SHOP],
    };
    super(params);
    this.router = router;
    this.server = server;
    this.state = state;

    if (key) {
      this.loadDetailedProductView(key);
    } else if (category) {
      const catalog = new CatalogView(this.router, this.server, category).getElement();
      this.getElement().append(catalog);
    } else {
      const catalog = new CatalogView(this.router, this.server).getElement();
      this.getElement().append(catalog);
    }
  }

  async loadDetailedProductView(key: string) {
    const requestDetailedProduct = new RequestDetailedProduct(this.server, this.router);
    try {
      const productDetails: ProductDetail | null = await requestDetailedProduct.getProductByKey(key);
      if (productDetails) {
        const detailedProductView = new DetailedProductView(this.router, new State(), this.server, productDetails);
        this.getElement().append(detailedProductView.getElement());
      } else {
        console.error('Product details are null');
      }
    } catch (err) {
      console.error('Failed to load product details:', err);
    }
  }
}
