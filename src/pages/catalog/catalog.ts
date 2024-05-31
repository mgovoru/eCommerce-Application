import { CardInfo } from '../../app/type';
import { View } from '../../app/view';
import { CardView } from '../../components/card/card';
import { ContainerView } from '../../components/container/container';
import Router from '../../router/router';
import { Server } from '../../server/server';
import './catalog.scss';
import { ElementCreator } from '../../app/base';
import { QueryRequest } from '../../app/enum';
import FilterView from './fliter';

const mainParams = {
  tag: 'div',
  textContent: '',
  classNames: ['page-catalog', 'catalog'],
};

export default class CatalogView extends View {
  router: Router;

  server: Server;

  container: HTMLElement | null;

  blockTitle: HTMLElement | null;

  items: HTMLElement;

  strSort: string;

  strFilter: string;

  constructor(router: Router, server: Server) {
    super(mainParams);
    this.router = router;
    this.server = server;
    this.container = null;
    this.blockTitle = null;
    this.strSort = '';
    this.strFilter = '';
    this.items = new ElementCreator({ tag: 'div', classNames: ['cards__items'] }).getNode() as HTMLElement;
    this.configureView();
  }

  configureView() {
    const containerV = new ContainerView();
    containerV.addNameClass('page-catalog');
    this.container = containerV.getElement();
    this.server.workApi.requestProducts(this);
    this.blockTitle = new ElementCreator({ tag: 'div', classNames: ['catalog__header'] }).getNode();
    this.drawTitle();
    this.drawFilter();
    this.drawSelectSort();
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
          this.strSort = QueryRequest.SORTNAMEASC;
          this.server.workApi.requestSortFilterProducts(this, this.strSort, this.strFilter);
          break;
        }
        case 'nameZ': {
          if (this.items) {
            this.items.innerHTML = '';
          }
          this.strSort = QueryRequest.SORTNAMEDESC;
          this.server.workApi.requestSortFilterProducts(this, this.strSort, this.strFilter);
          break;
        }
        case 'priceA': {
          if (this.items) {
            this.items.innerHTML = '';
          }
          this.strSort = QueryRequest.SORTPRICEASC;
          this.server.workApi.requestSortFilterProducts(this, this.strSort, this.strFilter);
          break;
        }
        case 'priceZ': {
          if (this.items) {
            this.items.innerHTML = '';
          }
          this.strSort = QueryRequest.SORTPRICEDESC;
          this.server.workApi.requestSortFilterProducts(this, this.strSort, this.strFilter);
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

  drawFilter() {
    const filter = new ElementCreator({
      tag: 'div',
      classNames: ['catalog__filter'],
      textContent: 'filter',
      callback: () => {
        const filterBlock = new FilterView(this, this.server);
        this.container?.insertBefore(filterBlock.getElement(), this.items);
      },
    }).getNode();
    this.blockTitle?.append(filter);
  }
}
