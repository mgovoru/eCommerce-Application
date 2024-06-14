import { LineItem, LocalizedString } from '@commercetools/platform-sdk';
import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import Router from '../../router/router';
import { Server } from '../../server/server';
import State from '../../state/state';
import ErrorView from '../../server/error';
import { ElementCreator } from '../../app/base';
import './cart.scss';

function getLocalizedString(localizedString: LocalizedString, locale: string = 'en'): string {
  return localizedString[locale] || Object.values(localizedString)[0];
}

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-cart'],
};

export default class CartView extends View {
  server: Server;

  state: State;

  router: Router;

  clearCartButton: ElementCreator | null = null;

  constructor(server: Server, state: State, router: Router) {
    super(mainParams);
    this.server = server;
    this.state = state;
    this.router = router;
    this.configureView();
  }

  configureView() {
    const container = new ContainerView();
    container.addNameClass('page-cart');
    const cartContainer = container.getElement();

    const textBlock = this.drawElement({ tag: 'div', classNames: ['page-cart__text'] }, cartContainer);
    textBlock.textContent = 'Cart Items';

    const cartItemsContainer = this.drawElement({ tag: 'div', classNames: ['page-cart__items'] }, cartContainer);

    const clearCartButton = this.drawElement({ tag: 'button', classNames: ['page-cart__clear'] }, cartContainer);
    clearCartButton.textContent = 'Clear Shopping Cart';
    // clearCartButton.addEventListener('click', () => this.clearCart());

    this.renderCartItems(cartItemsContainer);

    this.viewElementCreator.append(cartContainer);
  }

  async renderCartItems(container: HTMLElement) {
    try {
      let cartItems: LineItem[] | undefined;
      if (!this.server.workApi?.userApi) {
        const cartId = localStorage.getItem('idCart');
        if (cartId) {
          const fetchCartResult = await this.server.apiRoot().carts().withId({ ID: cartId }).get().execute();
          cartItems = fetchCartResult?.body.lineItems;
        } else {
          cartItems = [];
        }
      }

      if (this.server.workApi?.userApi) {
        const fetchCartResult = await this.server.workApi.userApi?.apiRoot()?.me().activeCart().get().execute();
        cartItems = fetchCartResult?.body.lineItems;
        console.log(cartItems);
      }

      if (cartItems?.length === 0) {
        const emptyMessage = this.drawElement({ tag: 'div', classNames: ['page-cart__empty'] }, container);
        emptyMessage.textContent = 'Your cart is empty.';
        const linkToCatalog = this.drawElement({ tag: 'button', classNames: ['page-cart__button'] }, container);
        linkToCatalog.textContent = 'Try to find something you like here ->';
      } else {
        cartItems?.forEach((item) => {
          const itemElement = this.createCartItemElement(item);
          container.appendChild(itemElement);
        });
      }
    } catch (err) {
      console.error(err);
      const errorElement = new ErrorView();
      console.log(errorElement);
      // errorElement.show(err.message);
    }
  }

  createCartItemElement(item: LineItem) {
    const itemElement = this.drawElement({ tag: 'div', classNames: ['cart-item'] });

    const itemName = this.drawElement({ tag: 'div', classNames: ['cart-item__name'] }, itemElement);
    itemName.textContent = getLocalizedString(item.name);

    const itemQuantity = this.drawElement({ tag: 'div', classNames: ['cart-item__quantity'] }, itemElement);
    itemQuantity.textContent = `Quantity: ${item.quantity}`;

    const increaseButton = this.drawElement(
      { tag: 'button', classNames: ['cart-item__button', 'cart-item__increase'] },
      itemElement
    );
    increaseButton.textContent = '+';
    // increaseButton.addEventListener('click', () => this.handleQuantityChange(item.id, 'increase'));

    const decreaseButton = this.drawElement(
      { tag: 'button', classNames: ['cart-item__button', 'cart-item__decrease'] },
      itemElement
    );
    decreaseButton.textContent = '-';
    // decreaseButton.addEventListener('click', () => this.handleQuantityChange(item.id, 'decrease'));

    const itemPrice = this.drawElement({ tag: 'div', classNames: ['cart-item__price'] }, itemElement);
    const price = item.price.value.centAmount / 100;
    itemPrice.textContent = `Price: $ ${price.toFixed(2)}`;

    const removeButton = this.drawElement({ tag: 'button', classNames: ['cart-item__remove'] }, itemElement);
    removeButton.textContent = 'Remove';
    // removeButton.addEventListener('click', () => this.handleRemoveItem(item.id));

    return itemElement;
  }

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
