import Router from '../router/router';
import ErrorView from './error';
import { Server } from './server';

export class RequestCart {
  server: Server;

  router: Router;

  constructor(server: Server, router: Router) {
    this.server = server;
    this.router = router;
  }

  async checkLoginUser(): Promise<boolean> {
    try {
      const response = await this.server.workApi?.userApi?.apiRoot()?.me().get().execute();
      if (response?.body) {
        return true;
      }
      return false;
    } catch (err) {
      // console.error(err);
      return false;
    }
    // const token = JSON.parse(localStorage.getItem('tokenCashe') as string);

    // if (token) {
    //   return true;
    // }
    // return false;
  }

  async checkActiveCartLoginUser(): Promise<boolean> {
    try {
      const response = await this.server.workApi?.userApi?.apiRoot()?.me().activeCart().get().execute();
      if (response?.body) {
        return true;
      }
      return false;
    } catch (err) {
      // console.error(err);
      return false;
    }
  }

  async createCartNoLogUser(): Promise<void> {
    try {
      const response = await this.server
        .apiRoot()
        .carts()
        .post({
          body: {
            currency: 'USD',
            // anonymousId: `anon-${Math.random().toString(36).substring(7)}`,
          },
        })
        .execute();
      localStorage.setItem('idCart', JSON.stringify(response.body.id));
      localStorage.setItem('idCartVersionAnonimus', JSON.stringify(response.body.version));
      this.server.anonimousId = response.body.anonymousId as string;
      this.server.cartAnonimus = response.body.id;
      this.server.versionCartAnonimus = response.body.version;
      if (this.server.firstTime === 0) {
        this.server.firstTime += 1;
      }
    } catch (err) {
      const errorElement = new ErrorView();
      errorElement.show(err as string);
    }
  }

  async createCartLogUser(): Promise<void> {
    try {
      const response = await this.server.workApi?.userApi
        ?.apiRoot()
        ?.me()
        .carts()
        .post({
          body: {
            currency: 'USD',
          },
        })
        .execute();
      this.server.cartLogin = response?.body.id as string;
      this.server.versionCartLogin = response?.body.version as number;
      if (this.server.firstTime === 0) {
        this.server.firstTime += 1;
      }
      this.server.workApi.checkExitCartLogUser();
    } catch (err) {
      const errorElement = new ErrorView();
      errorElement.show(err as string);
    }
  }

  async addProductToCartNoLogUser(cartId: string, productID: string) {
    if (await this.checkExitProductinCartNoLog(cartId, productID)) {
      return;
    }
    try {
      const response = await this.server
        .apiRoot()
        .carts()
        // .withCustomerId({ customerId: this.server.anonimousId })
        .withId({ ID: cartId })
        .post({
          body: {
            version: this.server.versionCartAnonimus,
            actions: [
              {
                action: 'addLineItem',
                productId: productID,
                quantity: 1,
              },
            ],
          },
        })
        .execute();
      // this.server.idAddItem = response.body.lineItems.find((el) => el.productId === productID)?.id as string;
      this.server.versionCartAnonimus = response.body.version;
      localStorage.setItem('idCartVersionAnonimus', JSON.stringify(response.body.version));
    } catch (err) {
      const errorElement = new ErrorView();
      errorElement.show(err as string);
    }
  }

  async removeFromCartNoLogUser(cartId: string, IdlineItem: string) {
    try {
      const response = await this.server
        .apiRoot()
        .carts()
        .withId({ ID: cartId })
        .post({
          body: {
            version: this.server.versionCartAnonimus,
            actions: [
              {
                action: 'removeLineItem',
                lineItemId: IdlineItem,
              },
            ],
          },
        })
        .execute();
      this.server.versionCartAnonimus = response?.body.version as number;
      localStorage.setItem('idCartVersionAnonimus', JSON.stringify(response.body.version));
    } catch (err) {
      const errorElement = new ErrorView();
      errorElement.show(err as string);
    }
  }

  async removeFromCartLogUser(cartId: string, IdlineItem: string, versionCart: number) {
    try {
      const response = await this.server.workApi?.userApi
        ?.apiRoot()
        ?.me()
        .carts()
        .withId({ ID: cartId })
        .post({
          body: {
            version: versionCart,
            actions: [
              {
                action: 'removeLineItem',
                lineItemId: IdlineItem,
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

  async getCartId(cartId: string) {
    try {
      const response = await this.server.apiRoot().carts().withId({ ID: cartId }).get().execute();
      return response?.statusCode === 200;
    } catch (err) {
      const errorElement = new ErrorView();
      errorElement.show(err as string);
    }
    return false;
  }

  async checkExitProductinCartLog(productID: string): Promise<string> {
    try {
      const response = await this.server.workApi?.userApi?.apiRoot()?.me().activeCart().get().execute();
      const findItem = response?.body.lineItems.find((el) => el.productId === productID);
      if (findItem) {
        return findItem.id;
      }
      return '';
    } catch (err) {
      return '';
      const errorElement = new ErrorView();
      errorElement.show(err as string);
    }
  }

  async checkExitProductinCartNoLog(cardId: string, productID: string): Promise<string> {
    try {
      const response = await this.server.apiRoot().carts().withId({ ID: cardId }).get().execute();
      const findItem = response.body.lineItems.find((el) => el.productId === productID);
      if (findItem) {
        return findItem.id;
      }
      return '';
    } catch (err) {
      return '';
      const errorElement = new ErrorView();
      errorElement.show(err as string);
    }
  }

  async checkExitCartLogUser() {
    return this.server.workApi?.userApi
      ?.apiRoot()
      ?.me()
      .activeCart()
      .get()
      .execute()
      .then((response) => {
        return response;
      })
      .catch((err: Error) => {
        const errorElement = new ErrorView();
        errorElement.show(err.message);
      });
  }

  async addProductToCartLogUser(cartId: string, productID: string, versionCart: number) {
    if (await this.checkExitProductinCartLog(productID)) {
      return;
    }
    try {
      const response = await this.server.workApi?.userApi
        ?.apiRoot()
        ?.me()
        .carts()
        .withId({ ID: cartId })
        .post({
          body: {
            version: versionCart,
            actions: [
              {
                action: 'addLineItem',
                productId: productID,
                quantity: 1,
              },
            ],
          },
        })
        .execute();
      // this.server.idAddItem = response?.body.lineItems.find((el) => el.productId === productID)?.id as string;
      this.server.versionCartLogin = response?.body.version as number;
    } catch (err) {
      const errorElement = new ErrorView();
      errorElement.show(err as string);
    }
  }

  async checkActiveCartLoginUserwithToken() {
    try {
      const response = await this.server.workApi?.userApi?.apiRoot()?.me().activeCart().get().execute();
      console.log(response);
      if (response?.body) {
        return [response?.body.id, response?.body.version];
      }
      return '';
    } catch (err) {
      // console.error(err);
      return '';
    }
  }
}
