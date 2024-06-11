import { ElementCreator } from '../../app/base';
import { CardInfo } from '../../app/type';
import { View } from '../../app/view';
import { Pages } from '../../router/pages';
import Router from '../../router/router';
import { Server } from '../../server/server';
import './card.scss';

const containerParams = {
  tag: 'div',
  classNames: ['cards__item'],
};

export class CardView extends View {
  bodyCard: HTMLElement | null;

  router: Router;

  buttonAdd: HTMLElement | null;

  buttons: HTMLElement | null;

  bodyElement: HTMLElement | null;

  server: Server;

  idProduct: string;

  constructor(server: Server, router: Router, cardInfo: CardInfo) {
    super(containerParams);
    this.router = router;
    this.server = server;
    this.bodyCard = null;
    this.buttonAdd = null;
    this.buttons = null;
    this.bodyElement = null;
    this.configureView();
    this.render(cardInfo);
    this.createButtonAdd();
    this.idProduct = cardInfo.id;
  }

  configureView() {
    this.bodyElement = new ElementCreator({
      tag: 'div',
      classNames: ['cards__element'],
    }).getNode();
    this.getElement().appendChild(this.bodyElement);
  }

  render(cardInfo: CardInfo): void {
    let discount = '';
    let styleline = '';
    let stylecolor = '';
    const price = String(cardInfo.price[0]?.value?.centAmount).slice(0, -2);
    if (cardInfo.price[0] && cardInfo.price[0].discounted?.value.centAmount) {
      discount = String(cardInfo.price[0].discounted?.value.centAmount).slice(0, -2);
      styleline = 'text-decoration: line-through';
      stylecolor = 'color: red';
    }
    const boxImage = new ElementCreator({
      tag: 'div',
      classNames: ['cards__image', '-ibg'],
      callback: () => {
        this.router.navigate(`${Pages.PRODUCT}/${cardInfo.key}`);
      },
    }).getNode();
    const imageCard = new ElementCreator({
      tag: 'img',
      classNames: ['cards__img'],
    }).getNode() as HTMLImageElement;
    imageCard.src = cardInfo.src[0]?.url;
    boxImage?.appendChild(imageCard);
    this.bodyElement?.appendChild(boxImage);
    const contentCard = new ElementCreator({
      tag: 'div',
      classNames: ['cards__content'],
    }).getNode();
    const textCard = new ElementCreator({
      tag: 'div',
      classNames: ['cards__text'],
    }).getNode();
    const titleCard = new ElementCreator({
      tag: 'div',
      classNames: ['cards__title'],
    }).getNode();
    titleCard.innerHTML = cardInfo?.title;
    contentCard.appendChild(textCard);
    const subtitleCard = new ElementCreator({
      tag: 'h4',
      classNames: ['cards__sub-title'],
    }).getNode();
    subtitleCard.innerHTML = cardInfo?.description;
    textCard.appendChild(titleCard);
    contentCard.appendChild(textCard);
    const priceCard = new ElementCreator({
      tag: 'div',
      classNames: ['cards__price'],
      textContent: `  ${cardInfo.price[0]?.value?.currencyCode}`,
    }).getNode();
    const spanCard = new ElementCreator({
      tag: 'span',
      textContent: `  ${price}`,
    }).getNode();
    spanCard.style.cssText = styleline;
    priceCard.prepend(spanCard);
    const spanNextCard = new ElementCreator({
      tag: 'span',
      textContent: discount,
    }).getNode();
    spanNextCard.style.cssText = stylecolor;
    priceCard.prepend(spanNextCard);
    textCard.appendChild(priceCard);
    contentCard.appendChild(subtitleCard);
    this.bodyElement?.appendChild(contentCard);
  }

  createButtonAdd() {
    this.buttons = new ElementCreator({
      tag: 'div',
      classNames: ['cards__buttons'],
    }).getNode();
    const buttonRemove = new ElementCreator({
      tag: 'button',
      classNames: ['cards__button', 'remove-cart'],
      callback: () => {
        this.buttonAdd?.classList.toggle('in-cart');
        this.buttonAdd?.classList.toggle('add-cart');
        buttonRemove.style.display = 'none';
        console.log('удаляется', this.server.cart);
        this.server.workApi.removeFromCart(this.server.cart, this.server.idAddItem, this.server.versionCart);
        this.server.workApi.getCarts(this.server.cart);
      },
    }).getNode();
    buttonRemove.style.display = 'none';
    this.buttonAdd = new ElementCreator({
      tag: 'button',
      classNames: ['cards__button', 'add-cart'],
      callback: async (e: Event) => {
        if (!(e.target as HTMLElement).classList.contains('in-cart')) {
          (e.target as HTMLElement).classList.toggle('add-cart');
          (e.target as HTMLElement).classList.toggle('in-cart');
          buttonRemove.style.display = 'flex';
          await this.server.workApi.addToCart(this.server.cart, this.idProduct, this.server.versionCart);
          console.log(this.server.cart);
          this.server.workApi.getCarts(this.server.cart);
        }
      },
    }).getNode();
    this.buttons?.append(this.buttonAdd);
    this.buttons?.append(buttonRemove);
    this.bodyElement?.appendChild(this.buttons);
  }
}
