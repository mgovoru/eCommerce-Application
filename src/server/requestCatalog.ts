import { AttributeDefinition, Image, Price } from '@commercetools/platform-sdk';
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
            id: el.key as string,
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

  getSortFilterProducts(content: CatalogView, strSort: string = '', strFilter: string[] = [''], strText: string = '') {
    return this.server
      .apiRoot(credentials)
      .withProjectKey({ projectKey: credentials.projectKey })
      .productProjections()
      .search()
      .get({
        queryArgs: {
          sort: [strSort],
          filter: strFilter,
          'text.en': strText,
        },
      })
      .execute()
      .then((response) => {
        console.log(response);
        this.server.workApi.cards = [];
        response.body.results.forEach((el) => {
          const card: CardInfo = {
            src: el.masterVariant.images as Image[],
            title: el.name?.en as string,
            description: el.description?.en as string,
            price: el.masterVariant.prices as Price[],
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

  getAttGroups(content: CatalogView) {
    return this.server
      .apiRoot(credentials)
      .withProjectKey({ projectKey: credentials.projectKey })
      .productTypes()
      .get()
      .execute()
      .then((response) => {
        content.addArray(
          response.body.results.filter((el) => el.name === 'Artworks')[0].attributes as AttributeDefinition[]
        );
      })
      .catch((err: Error) => {
        const errorElement = new ErrorView();
        errorElement.show(err.message);
      });
  }

  getCategories(content: CatalogView) {
    return this.server
      .apiRoot(credentials)
      .withProjectKey({ projectKey: credentials.projectKey })
      .categories()
      .get()
      .execute()
      .then((response) => {
        console.log(response);
        response.body.results.forEach((el) => {
          if (el.key) {
            content.arrayCat.push([el.id as string, el.key as string]);
          }
        });
        console.log(content.arrayCat);
      })
      .catch((err: Error) => {
        const errorElement = new ErrorView();
        errorElement.show(err.message);
      });
  }
}
