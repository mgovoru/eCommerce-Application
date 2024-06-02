import { ProductDetail } from '../app/type';
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
    return this.server
      .apiRoot(credentials)
      .withProjectKey({ projectKey: credentials.projectKey })
      .products()
      .withId({ ID: id })
      .get()
      .execute()
      .then((response) => {
        const product = response.body;
        return product as ProductDetail;
      })
      .catch((err: Error) => {
        const errorElement = new ErrorView();
        errorElement.show(err.message);
        throw err;
      });
  }
}
