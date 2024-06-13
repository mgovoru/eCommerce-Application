import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import ErrorView from '../../server/error';
import { RequestCart } from '../../server/requestCart';
import { Server } from '../../server/server';
import './cart.scss';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-cart'],
};

export default class CartView extends View {
  server: Server;

  requestCart: RequestCart;

  constructor(server: Server) {
    super(mainParams);
    this.server = server;

    this.requestCart = new RequestCart(this.server);
    this.configureView();
  }

  configureView() {
    const container = new ContainerView();
    container.addNameClass('page-cart');
    const cartContainer = container.getElement();

    const textBlock = this.drawElement({ tag: 'div', classNames: ['page-cart__text'] }, cartContainer);
    textBlock.textContent = 'Cart Items';

    const cartItemsContainer = this.drawElement({ tag: 'div', classNames: ['page-cart__items'] }, cartContainer);

    this.renderCartItems(cartItemsContainer);

    this.viewElementCreator.append(cartContainer);
  }

  async renderCartItems(container: HTMLElement) {
    try {
      const test = await this.requestCart.fetchCartItems();
      console.log('test from cart.ts: ', test);
      // const cartItems = await this.requestCart.getCartItems();
      // console.log('Cart Items:', cartItems);

      // if (cartItems.length === 0) {
      //   const emptyMessage = this.drawElement({ tag: 'div', classNames: ['page-cart__empty'] }, container);
      //   emptyMessage.textContent = 'Your cart is empty.';
      // } else {
      //   cartItems.forEach((item) => {
      //     const itemElement = this.createCartItemElement(item);
      //     container.appendChild(itemElement);
      //   });
      // }
    } catch (err) {
      console.error(err);
      // const errorElement = new ErrorView();
      // errorElement.show(err.message);
    }
  }

  // createCartItemElement(item) {
  //   const itemElement = this.drawElement({ tag: 'div', classNames: ['cart-item'] });

  //   const itemName = this.drawElement({ tag: 'div', classNames: ['cart-item__name'] }, itemElement);
  //   itemName.textContent = item.name;

  //   const itemQuantity = this.drawElement({ tag: 'div', classNames: ['cart-item__quantity'] }, itemElement);
  //   itemQuantity.textContent = `Quantity: ${item.quantity}`;

  //   const increaseButton = this.drawElement(
  //     { tag: 'button', classNames: ['cart-item__button', 'cart-item__increase'] },
  //     itemElement
  //   );
  //   increaseButton.textContent = '+';
  //   // increaseButton.addEventListener('click', () => this.handleQuantityChange(item.id, 'increase'));

  //   const decreaseButton = this.drawElement(
  //     { tag: 'button', classNames: ['cart-item__button', 'cart-item__decrease'] },
  //     itemElement
  //   );
  //   decreaseButton.textContent = '-';
  //   // decreaseButton.addEventListener('click', () => this.handleQuantityChange(item.id, 'decrease'));

  //   const itemPrice = this.drawElement({ tag: 'div', classNames: ['cart-item__price'] }, itemElement);
  //   itemPrice.textContent = `Price: $${item.price}`;

  //   const removeButton = this.drawElement({ tag: 'button', classNames: ['cart-item__remove'] }, itemElement);
  //   removeButton.textContent = 'Remove';
  //   // removeButton.addEventListener('click', () => this.handleRemoveItem(item.id));

  //   return itemElement;
  // }

  // async handleQuantityChange(itemId: number, action: 'increase' | 'decrease') {
  //   try {
  //     await this.requestCart.updateCartItemQuantity(itemId, action);
  //     this.updateView();
  //   } catch (err) {
  //     const errorElement = new ErrorView();
  //     errorElement.show(err.message);
  //   }
  // }

  // async handleRemoveItem(itemId: number) {
  //   try {
  //     await this.requestCart.removeItemFromCart(itemId);
  //     this.updateView();
  //   } catch (err) {
  //     const errorElement = new ErrorView();
  //     errorElement.show(err.message);
  //   }
  // }

  updateView() {
    const container = this.viewElementCreator.getNode().querySelector('.page-cart__items') as HTMLElement;
    container.innerHTML = '';
    this.renderCartItems(container);
  }
}
