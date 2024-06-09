import { ElementCreator } from '../../app/base';
import { View } from '../../app/view';
import { Pages } from '../../router/pages';
import Router from '../../router/router';
import { Server } from '../../server/server';
import CatalogView from './catalog';
import './filter.scss';

const mainParams = {
  tag: 'div',
  classNames: ['filter'],
};

export default class FilterView extends View {
  router: Router;

  server: Server;

  priceFilter: HTMLElement | null;

  content: CatalogView;

  timeFilter: HTMLElement | null;

  filterColor: HTMLElement | null;

  sizeFilter: HTMLElement | null;

  rangeInputMin: HTMLInputElement | null;

  rangeInputMax: HTMLInputElement | null;

  searchInput: HTMLInputElement | null;

  constructor(content: CatalogView, server: Server, router: Router) {
    super(mainParams);
    this.server = server;
    this.router = router;
    this.content = content;
    this.priceFilter = null;
    this.timeFilter = null;
    this.filterColor = null;
    this.sizeFilter = null;
    this.rangeInputMin = null;
    this.rangeInputMax = null;
    this.searchInput = null;
    this.configureView();
  }

  configureView() {
    this.drawPrice();
    this.content.arrayAtt.forEach((el) => this.drawAttGrop(el[0], el[1]));
    this.resetFilters();
    this.createBlockSearch();
    this.drawNewScreen();
  }

  drawNewScreen() {
    this.content.offsetZero();
    (this.content.items as HTMLElement).innerHTML = '';
  }

  drawAttGrop(strName: string, arrayName: string[]) {
    this.timeFilter = new ElementCreator({
      tag: 'ul',
      classNames: [`filter__${strName}`],
    }).getNode();
    const timeItems = [`${strName.toUpperCase()}`].concat(arrayName);
    timeItems.forEach((el) => {
      const li = new ElementCreator({
        tag: 'li',
        classNames: [`filter__${strName}-item`],
        textContent: el,
        callback: (event) => {
          if (el !== `${strName.toUpperCase()}`) {
            this.addClassSelectItem(event, `${strName}`, el);
          }
        },
      }).getNode();
      this.timeFilter?.append(li);
    });
    this.getElement().append(this.timeFilter);
  }

  drawPrice() {
    let timer: number;
    this.priceFilter = new ElementCreator({
      classNames: ['filter__price'],
    }).getNode();
    this.getElement().append(this.priceFilter);
    this.rangeInputMin = this.drawInputPrice('range-min', 10);
    this.rangeInputMax = this.drawInputPrice('range-max', 110);
    this.rangeInputMin.addEventListener('input', () => {
      this.drawNewScreen();
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.content.strFilterArray = this.content.strFilterArray.filter(
          (el) => !el.includes(`variants.price.centAmount`)
        );
        const filterPrice = `variants.price.centAmount:range (
				 ${Number(this.rangeInputMin?.value) * 100} to ${Number(this.rangeInputMax?.value) * 100})`;
        this.content.strFilterArray.push(filterPrice);
        this.server.workApi.requestSortFilterProducts(
          this.content,
          '',
          this.content.strFilterArray,
          this.content.textSearch
        );
      }, 1000) as unknown as number;
    });
    this.rangeInputMax.addEventListener('input', () => {
      this.drawNewScreen();
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.content.strFilterArray = this.content.strFilterArray.filter(
          (el) => !el.includes(`variants.price.centAmount`)
        );
        const filterPrice = `variants.price.centAmount:range (
				 ${Number(this.rangeInputMin?.value) * 100} to ${Number(this.rangeInputMax?.value) * 100})`;
        this.content.strFilterArray.push(filterPrice);
        this.server.workApi.requestSortFilterProducts(
          this.content,
          '',
          this.content.strFilterArray,
          this.content.textSearch
        );
      }, 1000) as unknown as number;
    });
  }

  resetFilters() {
    const filterReset = new ElementCreator({
      tag: 'div',
      classNames: ['filter__reset'],
      textContent: 'Reset Filters',
      callback: () => {
        this.drawNewScreen();
        this.content.strSort = '';
        this.content.strFilterArray = [];
        document.querySelectorAll('.selected-item').forEach((el) => el.classList.remove('selected-item'));
        (this.rangeInputMin as HTMLInputElement).value = '10';
        (this.rangeInputMax as HTMLInputElement).value = '110';
        const array = document.querySelectorAll('.label');
        array[0].innerHTML = '';
        array[1].innerHTML = '';
        this.content.textSearch = '';
        (this.searchInput as HTMLInputElement).value = '';
        (this.content.selectSort as HTMLSelectElement).selectedIndex = 0;
        this.router.navigate(Pages.SHOP);
      },
    }).getNode();
    this.getElement().append(filterReset);
  }

  createBlockSearch() {
    const searchBlock = document.createElement('div');
    this.searchInput = document.createElement('input') as HTMLInputElement;
    this.searchInput.classList.add('catalog__search-input');
    searchBlock.append(this.searchInput);
    searchBlock.classList.add('catalog__search');
    this.searchInput.addEventListener('input', () => {
      this.drawNewScreen();
      this.content.textSearch = this.searchInput?.value as string;
      this.server.workApi.requestSortFilterProducts(
        this.content,
        '',
        this.content.strFilterArray,
        this.content.textSearch
      );
    });
    this.getElement().append(searchBlock);
  }

  drawInputPrice(className: string, valueInput: number): HTMLInputElement {
    const rangeWrapper = new ElementCreator({
      tag: 'div',
      classNames: ['range-wrapper'],
    }).getNode() as HTMLInputElement;
    const rangeInput = new ElementCreator({
      tag: 'input',
      classNames: [`${className}`, 'range'],
    }).getNode() as HTMLInputElement;
    rangeInput.type = 'range';
    rangeInput.min = '0';
    rangeInput.max = '120';
    rangeInput.value = `${valueInput}`;
    const rangeLabel = new ElementCreator({
      tag: 'div',
      classNames: [`${className}-label`, 'label'],
    }).getNode();
    rangeWrapper.append(rangeInput);
    rangeWrapper.append(rangeLabel);
    const updateRange = () => {
      rangeLabel.textContent = `${rangeInput.value}$`;
    };
    rangeInput.addEventListener('input', updateRange);
    this.priceFilter?.append(rangeWrapper);
    return rangeInput;
  }

  drawBlock(liItems: string[], funcLi: (() => void)[]) {
    const ulElement = new ElementCreator({
      tag: 'ul',
      classNames: ['filter__items'],
    });
    liItems.forEach((text, index) => {
      const liElement = new ElementCreator({
        tag: 'li',
        textContent: text,
        callback: funcLi[index],
      });
      ulElement.getNode().appendChild(liElement.getNode());
    });
    this.getElement().appendChild(ulElement.getNode());
  }

  addClassSelectItem(event: Event, str: string, el: string) {
    event.preventDefault();
    event.stopPropagation();
    this.drawNewScreen();
    const parent = (event.target as HTMLElement).parentElement;
    if (!(event.target as HTMLElement).classList.contains('selected-item')) {
      if (parent) {
        const children = parent.querySelectorAll('.selected-item');
        children.forEach((child) => {
          (child as HTMLElement).classList.remove('selected-item');
        });
      }
      this.content.strFilterArray = this.content.strFilterArray.filter(
        (ell) => !ell.includes(`variants.attributes.${str}.key`)
      );
      (event.target as HTMLElement).classList.add('selected-item');
      const filterTime = `variants.attributes.${str}.key:"${el}"`;
      this.content.strFilterArray.push(filterTime);
      this.server.workApi.requestSortFilterProducts(
        this.content,
        '',
        this.content.strFilterArray,
        this.content.textSearch
      );
    } else {
      (event.target as HTMLElement).classList.remove('selected-item');
      const index = this.content.strFilterArray.indexOf(`variants.attributes.${str}.key:"${el}"`);
      if (index !== -1) {
        this.content.strFilterArray.splice(index, 1);
        this.server.workApi.requestSortFilterProducts(
          this.content,
          '',
          this.content.strFilterArray,
          this.content.textSearch
        );
      }
    }
  }
}
