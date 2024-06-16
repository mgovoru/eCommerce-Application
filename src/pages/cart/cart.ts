import { LineItem, LocalizedString } from '@commercetools/platform-sdk';
import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import Router from '../../router/router';
import { Server } from '../../server/server';
import State from '../../state/state';
import ErrorView from '../../server/error';
import { ElementCreator } from '../../app/base';
import './cart.scss';
import { Pages } from '../../router/pages';

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

    // div for Total Price
    const totalPriceContainer = this.drawElement({ tag: 'div', classNames: ['page-cart__total-cost'] }, cartContainer);

    this.getTotalPrice()
      .then((totalPrice) => {
        totalPriceContainer.textContent = `Total price: $${totalPrice.toFixed(2)}`;
      })
      .catch((error) => {
        console.error('Error fetching total price:', error);
        totalPriceContainer.textContent = 'Total price: 0';
      });

    const cartButtonsContainer = this.drawElement({ tag: 'div', classNames: ['page-cart__buttons'] }, cartContainer);
    const clearCartButton = this.drawElement({ tag: 'button', classNames: ['page-cart__clear'] }, cartButtonsContainer);
    clearCartButton.textContent = 'Clear the Cart';
    const proceedToOrderButton = this.drawElement(
      { tag: 'button', classNames: ['page-cart__order'] },
      cartButtonsContainer
    );
    proceedToOrderButton.textContent = 'Place the order';

    this.renderCartItems(cartItemsContainer);

    this.viewElementCreator.append(cartContainer);
  }

  // fetch and update TOTAL PRICE
  async getTotalPrice() {
    let totalPrice: number;

    if (!this.server.workApi.userApi) {
      const cartId = this.server.cartAnonimus;
      const fetchCartResult = await this.server.apiRoot().carts().withId({ ID: cartId }).get().execute();
      if (fetchCartResult && fetchCartResult.body) {
        totalPrice = fetchCartResult.body.totalPrice.centAmount / 100;
        console.log('total price is', totalPrice.toFixed(2));
        // установить бы вот отсюда значение Total price на странице
      } else {
        console.log('Fetch cart result or body is undefined');
        totalPrice = 0;
      }
    } else {
      const fetchCartResult = await this.server.workApi.userApi?.apiRoot()?.me().activeCart().get().execute();
      if (fetchCartResult && fetchCartResult.body) {
        totalPrice = fetchCartResult.body.totalPrice.centAmount / 100;
        console.log('total price is', totalPrice.toFixed(2));
      } else {
        console.log('Fetch cart result or body is undefined');
        totalPrice = 0;
      }
    }
    return totalPrice;
  }

  async renderCartItems(container: HTMLElement) {
    try {
      let cartItems: LineItem[] | undefined;
      if (!this.server.workApi?.userApi) {
        const cartId = this.server.cartAnonimus;
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
        linkToCatalog.addEventListener('click', () => this.router.navigate(Pages.SHOP));
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
    }
  }

  createCartItemElement(item: LineItem) {
    const itemElement = this.drawElement({ tag: 'div', classNames: ['cart-item'] });

    const itemName = this.drawElement({ tag: 'div', classNames: ['cart-item__name'] }, itemElement);
    itemName.textContent = getLocalizedString(item.name);

    const itemImage = this.drawElement(
      { tag: 'img', classNames: ['cart-item__image'] },
      itemElement
    ) as HTMLImageElement;
    itemImage.src =
      item.variant.images && item.variant.images.length > 0 ? item.variant.images[0]?.url : 'path/to/default/image.jpg';
    itemImage.alt = getLocalizedString(item.name);

    const itemQuantity = this.drawElement({ tag: 'div', classNames: ['cart-item__quantity'] }, itemElement);
    itemQuantity.textContent = `Quantity: ${item.quantity}`;

    const quantityButtons = this.drawElement({ tag: 'div', classNames: ['cart-item__quantity-buttons'] }, itemElement);

    const increaseButton = this.drawElement(
      { tag: 'button', classNames: ['cart-item__button', 'cart-item__increase'] },
      quantityButtons
    );
    increaseButton.textContent = '+';

    const decreaseButton = this.drawElement(
      { tag: 'button', classNames: ['cart-item__button', 'cart-item__decrease'] },
      quantityButtons
    );
    decreaseButton.textContent = '-';

    const itemPrice = this.drawElement({ tag: 'div', classNames: ['cart-item__price'] }, itemElement);
    const price = item.price.value.centAmount / 100;
    itemPrice.textContent = `Price: $ ${price.toFixed(2)}`;

    const removeButton = this.drawElement({ tag: 'button', classNames: ['cart-item__remove'] }, itemElement);
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => this.handleRemoveItem(item.id));

    return itemElement;
  }

  async handleRemoveItem(itemId: string) {
    const cartID = this.server.cartAnonimus;
    if (!this.server.workApi?.userApi) {
      console.log('пытается удалить тут');
      try {
        const response = await this.server
          .apiRoot()
          .carts()
          .withId({ ID: cartID })
          .post({
            body: {
              version: this.server.versionCartAnonimus,
              actions: [{ action: 'removeLineItem', lineItemId: itemId }],
            },
          })
          .execute();
        this.server.versionCartAnonimus = response?.body.version as number;
        localStorage.setItem('idCartVersionAnonimus', JSON.stringify(response.body.version));
      } catch (err) {
        const errorElement = new ErrorView();
        errorElement.show(err as string);
      }
    } else if (this.server.workApi?.userApi) {
      console.log(this.server.cartLogin, this.server.versionCartLogin, itemId);
      try {
        const response = await this.server.workApi.userApi
          .apiRoot()
          ?.me()
          .carts()
          .withId({ ID: this.server.cartLogin })
          .post({
            body: {
              version: this.server.versionCartLogin,
              actions: [
                {
                  action: 'removeLineItem',
                  lineItemId: itemId,
                },
              ],
            },
          })
          .execute();
        this.server.versionCartLogin = response?.body.version as number;
      } catch (err) {
        const errorElement = new ErrorView();
        errorElement.show(err as string);
      }
    }
  }

  updateView() {
    const container = this.viewElementCreator.getNode().querySelector('.page-cart__items') as HTMLElement;
    container.innerHTML = '';
    this.renderCartItems(container);
  }
}
