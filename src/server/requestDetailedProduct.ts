import Router from '../router/router';
import ErrorView from './error';
import { Server } from './server';
import { credentials } from './workapi';

export class RequestDetailedProduct {
  server: Server;

  router: Router;

  constructor(server: Server, router: Router) {
    this.server = server;
    this.router = router;
  }

  getProductById(id: string) {
    console.log(id);
    return (
      this.server
        .apiRoot(credentials)
        .withProjectKey({ projectKey: credentials.projectKey })
        .products()
        .withId({ ID: id })
        // .withKey({ key: key })
        .get()
        .execute()
        .then((response) => {
          console.log('initial response', response);
          const product = response.body;

          console.log('product', product);
          return product;
        })
        .catch((err: Error) => {
          const errorElement = new ErrorView();
          errorElement.show(err.message);
          throw err;
        })
    );
  }
}
