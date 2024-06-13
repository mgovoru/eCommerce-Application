import { Cart, LineItem } from '@commercetools/platform-sdk';
import ErrorView from './error';
import { Server } from './server';
import { UserApiServer } from './user';
import { WorkApi } from './workapi';
import Router from '../router/router';

export class RequestCart {
  server: Server;

  constructor(server: Server) {
    this.server = server;
  }

  async fetchCartItems() {
    try {
      const response = await this.server.workApi?.userApi?.apiRoot()?.me().activeCart().get().execute();
      console.log('the response with me: ', response);
      console.log('me', response?.body);
      return response?.body || null;
    } catch (err) {
      console.error(err);
    }
  }

  // async getCartItems() {
  //   try {
  //     let isAuthenticated = false;
  //     const tokenCache = localStorage.getItem('tokenCashe');

  //     if (tokenCache) {
  //       try {
  //         const tokenCacheObj = JSON.parse(tokenCache);
  //         console.log('Token:', tokenCacheObj.myCaсhe.token);
  //         isAuthenticated = true;
  //       } catch (error) {
  //         console.error('Error parsing tokenCache JSON:', error);
  //       }
  //     } else {
  //       console.log('TokenCashe not found in localStorage');
  //     }
  //     console.log('its true:', isAuthenticated == true);

  //     let carts: Cart[];

  //     if (isAuthenticated) {
  //       // carts = await this.workApi.fetchCartItems().then((res) => console.log(res));
  //       console.log('auth carts', carts);
  //     } else {
  //       // carts = await this.workApi.fetchAnonymousCartItems();
  //       // console.log('anon carts', carts);
  //     }

  //     const cart = carts.find((cart) => cart.lineItems.length > 0);

  //     if (!cart) {
  //       throw new Error('No carts found or all carts are empty.');
  //     }

  //     const items: LineItem[] = cart.lineItems;

  //     return items.map((item) => ({
  //       id: item.id,
  //       productId: item.productId,
  //       name: item.name.en,
  //       quantity: item.quantity,
  //       price: item.price.value.centAmount / 100,
  //       totalPrice: item.totalPrice.centAmount / 100,
  //     }));
  //   } catch (err) {
  //     console.log(err);
  //     const errorElement = new ErrorView();
  //     errorElement.show(err.message);
  //     throw err;
  //   }
  // }
}
