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

  buttonRem: HTMLElement | null;

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
    this.buttonRem = null;
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
    this.checkInCart();
  }

  createButtonAdd() {
    this.buttons = new ElementCreator({
      tag: 'div',
      classNames: ['cards__buttons'],
    }).getNode();
    this.buttonAdd = new ElementCreator({
      tag: 'button',
      classNames: ['cards__button', 'add-cart'],
      callback: async (e: Event) => {
        if (!(e.target as HTMLElement).classList.contains('in-cart')) {
          (e.target as HTMLElement).classList.remove('add-cart');
          (e.target as HTMLElement).classList.add('in-cart');
          await this.checkForAddProduct();
          this.buttonRemove();
        }
      },
    }).getNode();
    this.buttons?.append(this.buttonAdd);
    this.bodyElement?.appendChild(this.buttons);
  }

  buttonRemove() {
    this.buttonRem = new ElementCreator({
      tag: 'button',
      classNames: ['cards__button', 'remove-cart'],
      callback: async () => {
        this.checkForRemoveProduct();
        this.buttonAdd?.classList.remove('in-cart');
        this.buttonAdd?.classList.add('add-cart');
        this.buttonRem?.remove();
        // await this.server.workApi.removeFromCart(this.server.cart, this.server.idAddItem, this.server.versionCart);
        // await this.server.workApi.getCarts(this.server.cart);
      },
    }).getNode();
    this.buttons?.append(this.buttonRem);
  }

  async checkForAddProduct() {
    if (await this.server.workApi.checkLoginUser()) {
      if (!(await this.server.workApi.checkActiveCartLoginUser())) {
        console.log('нет корзины залогинен')
        await this.server.workApi.createCartLogUser();
        await this.server.workApi.addProductToCartLogUser(
          this.server.cartLogin,
          this.idProduct,
          this.server.versionCartLogin
        );
        await this.server.workApi.checkExitCartLogUser();
      } else {
        console.log('есть корзины залогинен', this.server.cartLogin)
        await this.server.workApi.addProductToCartLogUser(
          this.server.cartLogin,
          this.idProduct,
          this.server.versionCartLogin
        );
        await this.server.workApi.checkExitCartLogUser();
      }
    } else if (!this.server.cartAnonimus) {
      console.log('нет корзины не залогинен')
      await this.server.workApi.createCartNoLogUser();
      await this.server.workApi.addProductToCartNoLogUser(this.server.cartAnonimus, this.idProduct);
      await this.server.workApi.getCartId(this.server.cartAnonimus);
    } else {
      console.log('есть корзины не залогинен', this.server.cartAnonimus)
      await this.server.workApi.addProductToCartNoLogUser(this.server.cartAnonimus, this.idProduct);
      await this.server.workApi.getCartId(this.server.cartAnonimus);
    }
  }

  async checkForRemoveProduct() {
    if (await this.server.workApi.checkLoginUser()) {
      const idAddItem = await this.server.workApi?.checkExitProductinCartLog(this.idProduct);
      if (idAddItem) {
        await this.server.workApi.removeFromCartLogUser(this.server.cartLogin, idAddItem, this.server.versionCartLogin);
        await this.server.workApi.checkExitCartLogUser();
      }
    } else {
      const idAddItem = await this.server.workApi?.checkExitProductinCartNoLog(
        this.server.cartAnonimus,
        this.idProduct
      );
      if (idAddItem) {
        await this.server.workApi.removeFromCartNoLogUser(this.server.cartAnonimus, idAddItem);
        await this.server.workApi.getCartId(this.server.cartAnonimus);
      }
    }
  }

  async checkInCart() {
    if (await this.server.workApi.checkLoginUser()) {
      const idAddItem = await this.server.workApi?.checkExitProductinCartLog(this.idProduct);
      if (idAddItem) {
        this.buttonAdd?.classList.add('in-cart');
        this.buttonRemove();
      }
    } else {
      const idAddItem = await this.server.workApi?.checkExitProductinCartNoLog(
        this.server.cartAnonimus,
        this.idProduct
      );
      if (idAddItem) {
        this.buttonAdd?.classList.add('in-cart');
        this.buttonRemove();
      }
    }
  }
}
