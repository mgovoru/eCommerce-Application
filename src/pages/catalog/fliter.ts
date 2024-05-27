import { ElementCreator } from '../../app/base';
import { View } from '../../app/view';
import { Server } from '../../server/server';
import CatalogView from './catalog';
import './filter.scss';

const mainParams = {
  tag: 'div',
  classNames: ['filter'],
};

export default class FilterView extends View {
  server: Server;

  priceFilter: HTMLElement | null;

  content: CatalogView;

  constructor(content: CatalogView, server: Server) {
    super(mainParams);
    this.server = server;
    this.content = content;
    this.priceFilter = null;
    this.configureView();
  }

  configureView() {
    this.drawTime();
    this.drawPrice();
    this.drawColor();
    this.drawSize();
  }

  drawTime() {}

  drawPrice() {
    let timer: number;
    this.priceFilter = new ElementCreator({
      classNames: ['filter__price'],
    }).getNode();
    this.getElement().append(this.priceFilter);
    const rangeInputMin = this.drawInputPrice('range-min', 20);
    const rangeInputMax = this.drawInputPrice('range-max', 80);
    rangeInputMin.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const filterPrice = `variants.price.centAmount:range (
				 ${Number(rangeInputMin.value) * 100} to ${Number(rangeInputMax.value) * 100})`;
        this.server.workApi.requestFilterProducts(this.content, filterPrice);
      }, 1000) as unknown as number;
    });
    rangeInputMax.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const filterPrice = `variants.price.centAmount:range (
				 ${Number(rangeInputMin.value) * 100} to ${Number(rangeInputMax.value) * 100})`;
        this.server.workApi.requestFilterProducts(this.content, filterPrice);
      }, 1000) as unknown as number;
    });
  }

  startFilter() {}

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
      classNames: [`${className}-label`],
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

  drawColor() {}

  drawSize() {}

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
}
