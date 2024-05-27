import { View } from '../../app/view';
import Router from '../../router/router';
import { Server } from '../../server/server';
import State from '../../state/state';
import 'detailed-product.scss';

const mainParams = {
  tag: 'div',
  textContent: '',
  classNames: ['page-detailed-product', 'detailed-product'],
};

export default class DetailedProductView extends View {
  router: Router;
  state: State;
  server: Server;
  id: string;
  container: HTMLElement | null;
  blockTitle: HTMLElement | null;
  item: HTMLElement | null;

  constructor(router: Router, state: State, server: Server, id: string) {
    super(mainParams);
    this.router = router;
    this.state = state;
    this.server = server;
    this.id = id;
    this.container = null;
    this.blockTitle = null;
    this.item = null;
    this.configureView();
  }

  configureView() {
    this.server.workApi.requestDetailedProduct(this.id);
  }
}
