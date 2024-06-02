import Router from '../router/router';
import Page404View from '../pages/404page/404page';
import { Server } from './server';
import { credentials } from './workapi';

export class RequestDetailedProduct {
  server: Server;

  router: Router;

  constructor(server: Server, router: Router) {
    this.server = server;
    this.router = router;
  }

  getProductByKey(key: string) {
    return this.server
      .apiRoot(credentials)
      .withProjectKey({ projectKey: credentials.projectKey })
      .products()
      .withKey({ key })
      .get()
      .execute()
      .then((response) => {
        const product = response.body;
        return product;
      })
      .catch((err: Error) => {
        this.render404View(`Failed to load product details. ${err.message}`);
        return null;
      });
  }

  render404View(errorMessage: string) {
    const page404View = new Page404View(this.router, errorMessage);
    document.body.innerHTML = '';
    document.body.appendChild(page404View.getElement());
  }
}
