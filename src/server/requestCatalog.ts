import { Image, Price } from '@commercetools/platform-sdk';
import { QueryRequest } from '../app/enum';
import { CardInfo } from '../app/type';
import Router from '../router/router';
import ErrorView from './error';
import { Server } from './server';
import { credentials } from './workapi';
import CatalogView from '../pages/catalog/catalog';

export class RequestCatalog {
  server: Server;

  router: Router;

  constructor(server: Server, router: Router) {
    this.server = server;
    this.router = router;
  }

  getProducts(content: CatalogView) {
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

  getSortProducts() {
    return this.server
      .apiRoot(credentials)
      .withProjectKey({ projectKey: credentials.projectKey })
      .productProjections()
      .search()
      .get({
        queryArgs: {
          sort: [QueryRequest.SORTPRICEASC],
        },
      })
      .execute()
      .then((response) => {
        console.log(response.body);
      })
      .catch((err: Error) => {
        const errorElement = new ErrorView();
        errorElement.show(err.message);
      });
  }

  getFilterProducts() {
    return this.server
      .apiRoot(credentials)
      .withProjectKey({ projectKey: credentials.projectKey })
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: '',
        },
      })
      .execute()
      .then((response) => {
        console.log(response.body);
      })
      .catch((err: Error) => {
        const errorElement = new ErrorView();
        errorElement.show(err.message);
      });
  }
}
