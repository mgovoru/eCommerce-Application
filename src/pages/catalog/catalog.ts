import { AttributeDefinition } from '@commercetools/platform-sdk';
import { CardInfo } from '../../app/type';
import { View } from '../../app/view';
import { CardView } from '../../components/card/card';
import { ContainerView } from '../../components/container/container';
import Router from '../../router/router';
import { Server } from '../../server/server';
// import State from '../../state/state';
import './catalog.scss';
// import cardImg from '../../assets/turtle.jpg';
import { ElementCreator } from '../../app/base';
import { QueryRequest } from '../../app/enum';
import FilterView from './fliter';

const mainParams = {
  tag: 'div',
  textContent: '',
  classNames: ['page-catalog', 'catalog'],
};

export default class CatalogView extends View {
  // state: State;

  router: Router;

  server: Server;

  container: HTMLElement | null;

  blockTitle: HTMLElement | null;

  items: HTMLElement;

  strSort: string;

  strFilterArray: string[];

  selectSort: HTMLSelectElement | null;

  textSearch: string;

  contentArrayAtt: AttributeDefinition[] | undefined;

  arrayAtt: [string, string[]][];

  arrayCat: [string, string][];

  constructor(router: Router, server: Server) {
    super(mainParams);
    // this.state = state;
    this.router = router;
    this.server = server;
    this.container = null;
    this.blockTitle = null;
    this.strSort = '';
    this.textSearch = '';
    this.strFilterArray = [];
    this.selectSort = null;
    this.contentArrayAtt = [];
    this.arrayAtt = [];
    this.arrayCat = [];
    this.items = new ElementCreator({ tag: 'div', classNames: ['cards__items'] }).getNode() as HTMLElement;
    this.configureView();
  }

  configureView() {
    const containerV = new ContainerView();
    containerV.addNameClass('page-catalog');
    this.container = containerV.getElement();
    this.server.workApi.requestProducts(this);
    this.server.workApi.requestCategories(this);
    this.server.workApi.requestAttGroups(this);
    this.blockTitle = new ElementCreator({ tag: 'div', classNames: ['catalog__header'] }).getNode();
    this.drawTitle();
    this.drawFilter();
    this.drawSelectSort();
    this.container.append(this.blockTitle);
    this.viewElementCreator.append(this.container);
  }

  addArray(array: AttributeDefinition[]) {
    this.contentArrayAtt = this.contentArrayAtt?.concat(array);
    const arrayNew: [string, string[]][] = [];
    this.contentArrayAtt?.forEach((el) => {
      if (el.type.name === 'enum') {
        arrayNew.push([el.name as string, el.type.values.map((ell) => ell.key) as string[]]);
      }
    });
    this.arrayAtt = this.arrayAtt.concat(arrayNew);
  }

  drawItems(array: CardInfo[]) {
    this.items.innerHTML = '';
    array.forEach((el) => {
      const card = new CardView(this.router, el);
      // card.bodyCard.innerHTML = card.render(el);
      card.bodyCard?.insertAdjacentHTML('beforeend', card.render(el));
      this.items.append(card.bodyCard as HTMLElement);
    });
    this.container?.append(this.items);
  }

  drawSelectSort() {
    this.selectSort = new ElementCreator({
      tag: 'select',
      classNames: ['catalog__sort'],
    }).getNode() as HTMLSelectElement;
    this.selectSort.id = 'sort';
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
    this.selectSort.append(selectSortName);
    this.selectSort.append(selectNameUp);
    this.selectSort.append(selectNameDown);
    this.selectSort.append(selectPriceUp);
    this.selectSort.append(selectPriceDown);
    this.blockTitle?.append(this.selectSort);
    this.selectSort.addEventListener('change', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const element = e.target as HTMLOptionElement;
      switch (element.value) {
        case 'nameA': {
          if (this.items) {
            this.items.innerHTML = '';
          }
          this.strSort = QueryRequest.SORTNAMEASC;
          this.server.workApi.requestSortFilterProducts(this, this.strSort, this.strFilterArray, this.textSearch);
          break;
        }
        case 'nameZ': {
          if (this.items) {
            this.items.innerHTML = '';
          }
          this.strSort = QueryRequest.SORTNAMEDESC;
          this.server.workApi.requestSortFilterProducts(this, this.strSort, this.strFilterArray, this.textSearch);
          break;
        }
        case 'priceA': {
          if (this.items) {
            this.items.innerHTML = '';
          }
          this.strSort = QueryRequest.SORTPRICEASC;
          this.server.workApi.requestSortFilterProducts(this, this.strSort, this.strFilterArray, this.textSearch);
          break;
        }
        case 'priceZ': {
          if (this.items) {
            this.items.innerHTML = '';
          }
          this.strSort = QueryRequest.SORTPRICEDESC;
          this.server.workApi.requestSortFilterProducts(this, this.strSort, this.strFilterArray, this.textSearch);
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
      callback: () => {
        const check = document.querySelector('.categories__items') !== null;
        if (!check) {
          const cataloglistBlock = this.drawCatt();
          this.container?.insertBefore(cataloglistBlock, this.container?.firstChild);
        } else {
          document.querySelector('.categories__items')?.remove();
        }
      },
    }).getNode();
    this.blockTitle?.append(titleCatalog);
  }

  drawCatt() {
    const cattList = new ElementCreator({
      tag: 'ul',
      classNames: [`categories__items`],
    }).getNode();
    this.arrayCat.forEach((el) => {
      const li = new ElementCreator({
        tag: 'li',
        classNames: [`categories__item`],
        textContent: el[1],
        callback: (event) => {
          this.addSelectItem(event, el[0]);
        },
      }).getNode();
      cattList?.append(li);
    });
    return cattList;
  }

  addSelectItem(event: Event, strId: string) {
    event.preventDefault();
    event.stopPropagation();
    const parent = (event.target as HTMLElement).parentElement;
    if (!(event.target as HTMLElement).classList.contains('selected-item')) {
      if (parent) {
        const children = parent.querySelectorAll('.selected-item');
        children.forEach((child) => {
          (child as HTMLElement).classList.remove('selected-item');
        });
      }
      (event.target as HTMLElement).classList.add('selected-item');
      this.strFilterArray = this.strFilterArray.filter((ell) => !ell.includes(`categories.id`));
      const filterCat = `categories.id:"${strId}"`;
      this.strFilterArray.push(filterCat);
      // console.log(this.strFilterArray);
      this.server.workApi.requestSortFilterProducts(this, this.strSort, this.strFilterArray, this.textSearch);
    } else {
      (event.target as HTMLElement).classList.remove('selected-item');
      const index = this.strFilterArray.indexOf(`categories.id:"${strId}"`);
      if (index !== -1) {
        this.strFilterArray.splice(index, 1);
        this.server.workApi.requestSortFilterProducts(this, this.strSort, this.strFilterArray, this.textSearch);
      }
    }
  }

  drawFilter() {
    const filter = new ElementCreator({
      tag: 'div',
      classNames: ['catalog__filter'],
      textContent: 'filter',
      callback: () => {
        const check = document.querySelector('.filter') !== null;
        if (!check) {
          const filterBlock = new FilterView(this, this.server);
          this.container?.insertBefore(filterBlock.getElement(), this.items);
        } else {
          document.querySelector('.filter')?.remove();
        }
      },
    }).getNode();
    this.blockTitle?.append(filter);
  }
}
