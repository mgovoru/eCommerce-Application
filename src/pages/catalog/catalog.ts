import { AttributeDefinition } from '@commercetools/platform-sdk';
import { CardInfo } from '../../app/type';
import { View } from '../../app/view';
import { CardView } from '../../components/card/card';
import { ContainerView } from '../../components/container/container';
import Router from '../../router/router';
import { Server } from '../../server/server';
import './catalog.scss';
import { ElementCreator } from '../../app/base';
import { LimitImages, QueryRequest } from '../../app/enum';
import FilterView from './fliter';
import { Pages } from '../../router/pages';

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

  items: HTMLElement | null;

  strSort: string;

  strFilterArray: string[];

  selectSort: HTMLSelectElement | null;

  textSearch: string;

  contentArrayAtt: AttributeDefinition[] | undefined;

  arrayAtt: [string, string[]][];

  arrayCat: [string, string][];

  treeSubCat: Map<string, [string, string][]>;

  itemsCatalog: HTMLElement | null;

  category: string;

  parentCategory: string;

  offset: number;

  scrollHandler: boolean;

  isLoading: boolean;

  loaderElement: HTMLElement | null;

  count: number;

  constructor(router: Router, server: Server, category: string = '') {
    super(mainParams);
    this.category = category;
    this.parentCategory = '';
    if (this.category.indexOf('/') !== -1) {
      [this.parentCategory, this.category] = category.split('/');
    }
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
    this.itemsCatalog = null;
    this.offset = 0;
    this.treeSubCat = new Map();
    this.items = null;
    this.scrollHandler = false;
    this.isLoading = false;
    this.loaderElement = null;
    this.count = 0;
    this.configureView();
  }

  async configureView() {
    this.items = new ElementCreator({ tag: 'div', classNames: ['cards__items'] }).getNode() as HTMLElement;
    this.server.workApi.getAllProductsCount(this);
    const containerV = new ContainerView();
    containerV.addNameClass('page-catalog');
    this.container = containerV.getElement();
    this.arrayCat = [];
    this.server.workApi.requestCategories(this, this.addFilterCategoryUrl.bind(this));
    this.server.workApi.requestAttGroups(this);
    this.blockTitle = new ElementCreator({ tag: 'div', classNames: ['catalog__header'] }).getNode();
    this.drawTitle();
    this.drawFilter();
    this.drawSelectSort();
    this.drawHeadWays();
    this.container.append(this.blockTitle);
    this.container?.append(this.items);
    this.viewElementCreator.append(this.container);
    this.addScroll();
    this.offsetZero();
    (this.items as HTMLElement).innerHTML = '';
  }

  addFilterCategoryUrl(): void {
    if (this.category && !this.parentCategory) {
      const indexCategoryFind = this.arrayCat?.filter((ell) => ell[1] === this.category);
      if (indexCategoryFind) {
        this.strFilterArray.push(`categories.id:"${indexCategoryFind[0][0]}"`);
        this.offsetZero();
        (this.items as HTMLElement).innerHTML = '';
        this.server.workApi.requestSortFilterProducts(this, '', this.strFilterArray, '');
      }
    } else if (this.category && this.parentCategory) {
      const indexParentCategoryFind = this.arrayCat?.filter((ell) => ell[1] === this.parentCategory);
      if (this.treeSubCat && this.treeSubCat.get(indexParentCategoryFind[0][0])) {
        const needCat = this.treeSubCat.get(indexParentCategoryFind[0][0]);
        const needId = needCat?.filter((subcategory) => subcategory[1] === this.category)[0];
        if (needId) {
          this.strFilterArray.push(`categories.id:"${needId[0]}"`);
          this.offsetZero();
          (this.items as HTMLElement).innerHTML = '';
          this.server.workApi.requestSortFilterProducts(this, '', this.strFilterArray, '');
        }
      }
    } else {
      this.offsetZero();
      (this.items as HTMLElement).innerHTML = '';
      this.server.workApi.requestSortFilterProducts(this, this.strSort, this.strFilterArray, this.textSearch);
    }
  }

  addScroll() {
    if (this.scrollHandler) {
      return;
    }
    if (this.offset > this.count) {
      return;
    }

    window.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !this.isLoading) {
        this.isLoading = true;
        this.loaderElement?.remove();
        this.loaderElement = null;
        this.server.workApi.requestSortFilterProducts(this, this.strSort, this.strFilterArray, this.textSearch);
      }
    });
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
    array.forEach((el) => {
      const card = new CardView(this.router, el);
      card.bodyCard?.insertAdjacentHTML('beforeend', card.render(el));
      this.items?.append(card.bodyCard as HTMLElement);
    });
    this.isLoading = false;
    console.log(array);
  }

  showLoader() {
    this.loaderElement = new ElementCreator({ tag: 'div', classNames: ['loader-block'] }).getNode();
  }

  setCountProduct(count: number) {
    this.count = count;
  }

  setPlusOffset() {
    this.offset += this.limitCount();
  }

  offsetZero() {
    this.offset = 0;
  }

  limitCount(): number {
    let limit = 0;
    if (window.innerWidth >= 1200) {
      limit = LimitImages.EIGHT;
    }
    if (window.innerWidth < 1200 && window.innerWidth >= 900) {
      limit = LimitImages.SIX;
    }
    if (window.innerWidth >= 600 && window.innerWidth < 900) {
      limit = LimitImages.FOUR;
    }
    if (window.innerWidth < 600) {
      limit = LimitImages.FIVE;
    }
    return limit;
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
      this.offset = 0;
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
    this.itemsCatalog = new ElementCreator({
      tag: 'div',
      classNames: ['catalog__block'],
    }).getNode();
    const titleCatalog = new ElementCreator({
      tag: 'h1',
      classNames: ['catalog__title'],
      textContent: 'Catalog',
      callback: () => {
        const check = document.querySelector('.categories__items') !== null;
        if (!check) {
          (this.itemsCatalog as HTMLElement).innerHTML = '';
          const cataloglistBlock = this.drawCatt();
          if (this.blockTitle) {
            this.itemsCatalog?.append(cataloglistBlock);
            this.blockTitle.insertAdjacentElement('afterend', this.itemsCatalog as HTMLElement);
            this.checkStr(`.categories__item`);
          }
        } else {
          this.itemsCatalog?.remove();
          this.router.navigate(Pages.SHOP);
        }
      },
    }).getNode();
    this.blockTitle?.append(titleCatalog);
  }

  drawHeadWays() {
    const wayCatalog = new ElementCreator({
      tag: 'div',
      classNames: ['catalog__way'],
    }).getNode();
    const breadcrumbs = [
      {
        path: `#${Pages.SHOP}`,
        name: 'shop',
      },
    ];
    if (this.category && !this.parentCategory) {
      breadcrumbs.push({ path: `#${Pages.SHOP}/${this.category}`, name: `${this.category}` });
    } else if (this.category && this.parentCategory) {
      breadcrumbs.push({ path: `#${Pages.SHOP}/${this.parentCategory}`, name: `${this.parentCategory}` });
      breadcrumbs.push({ path: `#${Pages.SHOP}/${this.parentCategory}/${this.category}`, name: `${this.category}` });
    }
    const ul = document.createElement('ul');
    ul.className = 'breadcrumb';
    breadcrumbs.forEach((crumb) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = crumb.path;
      link.textContent = crumb.name;
      li.appendChild(link);
      ul.appendChild(li);
    });

    wayCatalog.innerHTML = '';
    wayCatalog.appendChild(ul);
    this.blockTitle?.append(wayCatalog);
  }

  drawCatt() {
    const cattList = new ElementCreator({
      tag: 'ul',
      classNames: [`categories__items`],
      textContent: 'categories',
    }).getNode();
    const cattSubList = new ElementCreator({
      tag: 'ul',
      classNames: [`categories__sub-items`],
      textContent: 'subcategories',
    }).getNode();
    this.arrayCat.forEach((el) => {
      const li = new ElementCreator({
        tag: 'li',
        classNames: [`categories__item`],
        textContent: el[1],
        callback: (event) => {
          this.addSelectItem(event, el[1], el[0]);
          if (this.itemsCatalog?.contains(cattSubList)) {
            cattSubList.remove();
          } else if (this.treeSubCat.get(el[0])) {
            cattSubList.querySelectorAll('li').forEach((elemli) => elemli.remove());
            this.treeSubCat?.get(el[0])?.forEach((ell) => {
              const subli = new ElementCreator({
                tag: 'li',
                classNames: [`categories__sub-item`],
                textContent: ell[1],
                callback: (eventSub) => {
                  this.addSelectItem(eventSub, ell[1], ell[0], el[1]);
                },
              }).getNode();
              cattSubList?.append(subli);
            });
            li.append(cattSubList);
          }
          li.append(cattSubList);
        },
      }).getNode();
      cattList?.append(li);
    });
    return cattList;
  }

  addSelectItem(event: Event, str: string, strId: string, strParent?: string) {
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
      this.strFilterArray.push(`categories.id:"${strId}"`);
      if (strParent) {
        // this.router.navigate(`${strParent}/${str}`);
        //  console.log('строка с родителем', strParent, str);
        this.router.navigate(`${Pages.SHOP}/${strParent}/${str}`);
      } else {
        // this.router.navigate(`${str}`);
        // console.log('строка без родителем', str);
        this.router.navigate(`${Pages.SHOP}/${str}`);
      }
    } else if (!this.treeSubCat.get(strId)) {
      (event.target as HTMLElement).classList.remove('selected-item');
      const index = this.strFilterArray.indexOf(`categories.id:"${strId}"`);
      if (index !== -1) {
        this.strFilterArray.splice(index, 1);
        this.server.workApi.requestSortFilterProducts(this, this.strSort, this.strFilterArray, this.textSearch);
      }
    }
  }

  checkStr(strNameClass: string) {
    const strC = this.parentCategory ? this.parentCategory : this.category;
    if (strC) {
      const children = this.getElement().querySelectorAll(`${strNameClass}`);
      children.forEach((child) => {
        if (child.classList.contains('selected-item')) {
          (child as HTMLElement).classList.remove('selected-item');
        }
      });
      let elementCat = null;
      children.forEach((child) => {
        if (child.innerHTML === strC) {
          elementCat = child;
        }
      });
      if (elementCat) {
        (elementCat as HTMLElement).classList.add('selected-item');
      }
    } else if (!strC) {
      const children = document.querySelectorAll('.selected-item');
      children.forEach((child) => {
        (child as HTMLElement).classList.remove('selected-item');
      });
    }
  }

  fieldForItems() {
    (this.items as HTMLElement).innerHTML = '';
  }

  drawFilter() {
    const filter = new ElementCreator({
      tag: 'div',
      classNames: ['catalog__filter'],
      textContent: 'filter',
      callback: () => {
        const check = document.querySelector('.filter') !== null;
        if (!check) {
          const filterBlock = new FilterView(this, this.server, this.router);
          this.container?.insertBefore(filterBlock.getElement(), this.items);
        } else {
          document.querySelector('.filter')?.remove();
          this.offsetZero();
          (this.items as HTMLElement).innerHTML = '';
        }
      },
    }).getNode();
    this.blockTitle?.append(filter);
  }
}
