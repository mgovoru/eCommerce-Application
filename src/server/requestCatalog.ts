import { Image, Price } from '@commercetools/platform-sdk';
import Router from '../router/router';
import ErrorView from './error';
import { Server } from './server';
import { credentials } from './workapi';
import ProductListView from '../pages/page-product/product-list';
import { CardInfo } from '../app/type';

export class RequestCatalog {
  server: Server;

  router: Router;

  constructor(server: Server, router: Router) {
    this.server = server;
    this.router = router;
  }

  getProducts(content: ProductListView) {
    return this.server
      .apiRoot(credentials)
      .withProjectKey({ projectKey: credentials.projectKey })
      .products()
      .get()
      .execute()
      .then((response) => {
        this.server.workApi.cards = [];
        response.body.results.forEach((el) => {
          const card: CardInfo = {
            src: el.masterData.current.masterVariant.images as Image[],
            title: el.masterData.current.name?.en as string,
            description: el.masterData.current.description?.en as string,
            price: el.masterData.current.masterVariant.prices as Price[],
            id: el.id,
          };
          this.server.workApi.cards.push(card);
        });
        content.drawItems(this.server.workApi.cards);
      })
      .catch((err: Error) => {
        const errorElement = new ErrorView();
        errorElement.show(err.message);
      });
  }
}
