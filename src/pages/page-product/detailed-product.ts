import { View } from '../../app/view';
import Router from '../../router/router';
import { Server } from '../../server/server';
import State from '../../state/state';
import './detailed-product.scss';
import { ElementCreator } from '../../app/base';
import { ProductDetail } from '../../app/type';

const mainParams = {
  tag: 'div',
  textContent: '',
  classNames: ['page-detailed-product', 'detailed-product'],
};

export default class DetailedProductView extends View {
  router: Router;

  state: State;

  server: Server;

  // id: string;
  productDetails: ProductDetail;

  container: HTMLElement | null;

  blockTitle: HTMLElement | null;

  item: HTMLElement | null;

  constructor(router: Router, state: State, server: Server, productDetails: ProductDetail) {
    super(mainParams);
    this.router = router;
    this.state = state;
    this.server = server;
    this.productDetails = productDetails;
    // this.id = id;
    this.container = null;
    this.blockTitle = null;
    this.item = null;
    this.configureView();
  }

  configureView() {
    // const productDetails = this.server.workApi.requestDetailedProduct(this.id);
    this.renderProductDetails(this.productDetails);
  }

  renderProductDetails(productDetails: ProductDetail) {
    this.getElement().innerHTML = '';

    this.container = new ElementCreator({ tag: 'div', classNames: ['product-details__container'] }).getNode();
    this.blockTitle = new ElementCreator({
      tag: 'h1',
      classNames: ['product-details__title'],
      textContent: productDetails.name,
    }).getNode();
    this.item = new ElementCreator({
      tag: 'div',
      classNames: ['product-details__description'],
      textContent: productDetails.description,
    }).getNode();

    this.container.append(this.blockTitle);
    this.container.append(this.item);

    this.getElement().append(this.container);
  }
}
