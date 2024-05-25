import { CardInfo } from '../../app/type';
import { View } from '../../app/view';
import { CardView } from '../../components/card/card';
import { ContainerView } from '../../components/container/container';
import Router from '../../router/router';
import { Server } from '../../server/server';
import State from '../../state/state';
import './catalog.scss';
// import cardImg from '../../assets/turtle.jpg';
import { ElementCreator } from '../../app/base';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-catalog', 'catalog'],
};

export default class CatalogView extends View {
  state: State;

  router: Router;

  server: Server;

  container: HTMLElement | null;

  constructor(router: Router, state: State, server: Server) {
    super(mainParams);
    this.state = state;
    this.router = router;
    this.server = server;
    this.container = null;
    this.configureView();
  }

  configureView() {
    const containerV = new ContainerView();
    containerV.addNameClass('page-catalog');
    this.container = containerV.getElement();
    this.server.workApi.requestProducts(this);
    // const cardInfo: CardInfo = {
    //   src: cardImg,
    //   title: `Turtle`,
    //   description: `A small turtle swims gracefully in clear blue water, with its green shell gently reflecting the sunlight that filters through the surface.`,
    //   price: `15$`,
    // };
    // const length = 8;
    // const arrayCards = Array.from({ length }, () => cardInfo);
    // this.drawItems(this.server.workApi.cards);
    this.viewElementCreator.append(this.container);
  }

  drawItems(array: CardInfo[]) {
    const items = new ElementCreator({ tag: 'div', classNames: ['cards__items'] }).getNode();
    array.forEach((el) => {
      const card = new CardView();
      items.insertAdjacentHTML('beforeend', card.render(el));
    });
    this.container?.append(items);
  }
}
