// import { Image, Price } from '@commercetools/platform-sdk';
import Router from '../router/router';
import ErrorView from './error';
import { Server } from './server';
import { credentials } from './workapi';
// import DetailedProductView from '../pages/page-product/detailed-product';

export class RequestDetailedProduct {
  server: Server;

  router: Router;

  constructor(server: Server, router: Router) {
    this.server = server;
    this.router = router;
  }

  getProductById(id: string) {
    console.log(id);
    const productId = '1c2c0ee7-9d6f-4348-8e66-a2ee693edca4';
    return (
      this.server
        .apiRoot(credentials)
        .withProjectKey({ projectKey: credentials.projectKey })
        .products()
        .withId({ ID: productId })
        // .withId({ ID: id })
        .get()
        .execute()
        .then((response) => {
          console.log(response);
          // const product = response.body;
          // const productView = new DetailedProductView(product);
          // productView.render();
        })
        .catch((err: Error) => {
          const errorElement = new ErrorView();
          errorElement.show(err.message);
        })
    );
  }
}
