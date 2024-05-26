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
import { QueryRequest } from '../../app/enum';

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

  blockTitle: HTMLElement | null;

  items: HTMLElement | null;

  constructor(router: Router, state: State, server: Server) {
    super(mainParams);
    this.state = state;
    this.router = router;
    this.server = server;
    this.container = null;
    this.blockTitle = null;
    this.items = null;
    this.configureView();
  }

  configureView() {
    const containerV = new ContainerView();
    containerV.addNameClass('page-catalog');
    this.container = containerV.getElement();
    this.server.workApi.requestProducts(this);
    this.blockTitle = new ElementCreator({ tag: 'div', classNames: ['catalog__header'] }).getNode();
    this.drawTitle();
    this.drawSelectSort();
    this.container.append(this.blockTitle);
    this.viewElementCreator.append(this.container);
  }

  drawItems(array: CardInfo[]) {
    this.items = new ElementCreator({ tag: 'div', classNames: ['cards__items'] }).getNode() as HTMLElement;
    array.forEach((el) => {
      const card = new CardView();
      this.items?.insertAdjacentHTML('beforeend', card.render(el));
    });
    this.container?.append(this.items);
  }

  drawSelectSort() {
    const selectSort = new ElementCreator({
      tag: 'select',
      classNames: ['catalog__sort'],
    }).getNode();
    selectSort.id = 'sort';
    const selectSortName = new ElementCreator({ tag: 'option', textContent: 'Sort by' }).getNode() as HTMLOptionElement;
    selectSortName.disabled = true;
    selectSortName.selected = true;
    selectSortName.hidden = true;
    const selectNameUp = new ElementCreator({ tag: 'option', textContent: 'name ↑' }).getNode() as HTMLOptionElement;
    selectNameUp.value = 'nameA';
    const selectNameDown = new ElementCreator({ tag: 'option', textContent: 'name ↓' }).getNode() as HTMLOptionElement;
    selectNameDown.value = 'nameZ';
    const selectPriceUp = new ElementCreator({ tag: 'option', textContent: 'price ↑' }).getNode() as HTMLOptionElement;
    selectPriceUp.value = 'priceA';
    const selectPriceDown = new ElementCreator({
      tag: 'option',
      textContent: 'price ↓',
    }).getNode() as HTMLOptionElement;
    selectPriceDown.value = 'priceZ';
    selectSort.append(selectSortName);
    selectSort.append(selectNameUp);
    selectSort.append(selectNameDown);
    selectSort.append(selectPriceUp);
    selectSort.append(selectPriceDown);
    this.blockTitle?.append(selectSort);
    selectSort.addEventListener('change', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const element = e.target as HTMLOptionElement;
      switch (element.value) {
        case 'nameA': {
          if (this.items) {
            this.items.innerHTML = '';
          }
          this.server.workApi.requestSortProducts(this, QueryRequest.SORTNAMEASC);
          break;
        }
        case 'nameZ': {
          if (this.items) {
            this.items.innerHTML = '';
          }
          this.server.workApi.requestSortProducts(this, QueryRequest.SORTNAMEDESC);
          break;
        }
        case 'priceA': {
          if (this.items) {
            this.items.innerHTML = '';
          }
          this.server.workApi.requestSortProducts(this, QueryRequest.SORTPRICEASC);
          break;
        }
        case 'priceZ': {
          if (this.items) {
            this.items.innerHTML = '';
          }
          this.server.workApi.requestSortProducts(this, QueryRequest.SORTPRICEDESC);
          break;
        }
        default:
          break;
      }
    });
  }

  drawTitle() {
    const titleCatalog = new ElementCreator({
      tag: 'h1',
      classNames: ['catalog__title'],
      textContent: 'Catalog',
    }).getNode();
    this.blockTitle?.append(titleCatalog);
  }
}
