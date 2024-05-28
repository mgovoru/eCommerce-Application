import { View } from '../../app/view';
import { CardView } from '../../components/card/card';
import { ContainerView } from '../../components/container/container';
import Router from '../../router/router';
import { Server } from '../../server/server';
import './catalog.scss';
import { ElementCreator } from '../../app/base';
import { CardInfo } from '../../app/type';

const mainParams = {
  tag: 'div',
  textContent: '',
  classNames: ['page-catalog', 'catalog'],
};

export default class ProductListView extends View {
  router: Router;

  server: Server;

  container: HTMLElement | null;

  blockTitle: HTMLElement | null;

  items: HTMLElement;

  constructor(router: Router, server: Server) {
    super(mainParams);
    this.router = router;
    this.server = server;
    this.container = null;
    this.blockTitle = null;
    this.items = new ElementCreator({ tag: 'div', classNames: ['cards__items'] }).getNode() as HTMLElement;
    this.configureView();
  }

  configureView() {
    const containerV = new ContainerView();
    containerV.addNameClass('page-catalog');
    this.container = containerV.getElement();
    this.server.workApi.requestProducts(this);
    this.blockTitle = new ElementCreator({ tag: 'div', classNames: ['catalog__header'] }).getNode();
    this.container.append(this.blockTitle);
    this.viewElementCreator.append(this.container);
  }

  drawItems(array: CardInfo[]) {
    this.items.innerHTML = '';
    array.forEach((el) => {
      const card = new CardView(this.router, el);
      card.bodyCard?.insertAdjacentHTML('beforeend', card.render(el));
      this.items.append(card.bodyCard as HTMLElement);
    });
    this.container?.append(this.items);
  }
}
