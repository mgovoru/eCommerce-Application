import { BaseAddress, CustomerDraft } from '@commercetools/platform-sdk';
import { Settings } from '../app/enum';
import { UserApiServer } from './user';
import ErrorView from './error';
import { Server } from './server';
import { CardInfo, Credentials } from '../app/type';
import { Pages } from '../router/pages';
import Router from '../router/router';
import { DataReturn } from '../pages/page-registration/validation';
import { RequestDetailedProduct } from './requestDetailedProduct';
import { RequestCatalog } from './requestCatalog';
import CatalogView from '../pages/catalog/catalog';
import { App } from '../app/app';

export const credentials: Credentials = {
  projectKey: Settings.PROJECTKEY,
  clientID: Settings.CLIENTID,
  clientSecret: Settings.CLIENTSECRET,
  scopes: Settings.SCOPES,
};

export class WorkApi {
  server: Server;

  router: Router;

  requestProductInstance: RequestDetailedProduct;

  requestInstance: RequestCatalog;

  idUser: string;

  cards: CardInfo[];

  constructor(server: Server, router: Router) {
    this.server = server;
    this.router = router;
    this.requestProductInstance = new RequestDetailedProduct(this.server, this.router);
    this.requestInstance = new RequestCatalog(this.server, this.router);
    this.cards = [];
    this.idUser = '';
  }

  requestDetailedProduct(id: string) {
    this.requestProductInstance.getProductById(id);
  }

  changeData(data: DataReturn, flagShippng: number, flagBilling: number): CustomerDraft {
    let countryShip = '';
    switch (data.ship.country) {
      case 'Russia': {
        countryShip = 'RU';
        break;
      }
      case 'Ukraine': {
        countryShip = 'UA';
        break;
      }
      case 'Belarus': {
        countryShip = 'BY';
        break;
      }
      default: {
        countryShip = '';
      }
    }
    let countryBill = '';
    switch (data.bill.country) {
      case 'Russia': {
        countryBill = 'RU';
        break;
      }
      case 'Ukraine': {
        countryBill = 'UA';
        break;
      }
      case 'Belarus': {
        countryBill = 'BY';
        break;
      }
      default: {
        countryBill = '';
      }
    }
    const shippingAddress: BaseAddress = {
      country: countryShip,
      city: data.ship.city as string,
      streetName: data.ship.street as string,
      postalCode: data.ship.postal as string,
    };

    const billingAddress: BaseAddress = {
      country: countryBill,
      city: data.bill.city as string,
      streetName: data.bill.street as string,
      postalCode: data.bill.postal as string,
    };

    return {
      firstName: data.data.firstName as string,
      lastName: data.data.lastName as string,
      email: data.data.email as string,
      password: data.data.password as string,
      addresses: [shippingAddress, billingAddress],
      defaultShippingAddress: flagShippng,
      defaultBillingAddress: flagBilling,
    };
  }

  registerCustomer(customerDraft: CustomerDraft) {
    return this.server
      .apiRoot(credentials)
      .withProjectKey({ projectKey: credentials.projectKey })
      .customers()
      .post({
        body: customerDraft,
      })
      .execute()
      .then((response) => {
        if (response.body.customer.firstName) {
          localStorage.setItem('name', JSON.stringify(response.body.customer.firstName));
        } else {
          localStorage.setItem('name', JSON.stringify('client who did not indicate a name upon registration'));
        }
        this.router.navigate(Pages.MAIN);
      })
      .catch((err: Error) => {
        const errorElement = new ErrorView();
        errorElement.show(err.message);
      });
  }

  loginCustomer(emailUser: string, passwordUser: string) {
    return this.server
      .apiRoot(credentials)
      .withProjectKey({ projectKey: credentials.projectKey })
      .login()
      .post({
        body: {
          email: emailUser,
          password: passwordUser,
        },
      })
      .execute()
      .then((response) => {
        this.idUser = response.body.customer.id;
        console.log(this.idUser);
        if (response.body.customer.firstName) {
          localStorage.setItem('name', JSON.stringify(response.body.customer.firstName));
        } else {
          localStorage.setItem('name', JSON.stringify('client who did not indicate a name upon registration'));
        }
        const userApi = new UserApiServer(this.server);
        userApi.createCustomerApiClient(emailUser, passwordUser);
        this.router.navigate(Pages.MAIN);
      })
      .catch((error) => {
        const errorElement = new ErrorView();
        errorElement.show(error.message);
      });
  }

  requestProducts(content: CatalogView) {
    this.requestInstance.getProducts(content);
  }

  requestAttGroups(content: CatalogView) {
    this.requestInstance.getAttGroups(content);
  }

  requestCategories(content: CatalogView, callback?: () => void) {
    this.requestInstance.getCategories(content, callback);
  }

  requestSortFilterProducts(
    content: CatalogView,
    strSort: string = '',
    strFilter: string[] = [''],
    strText: string = ''
  ) {
    this.requestInstance.getSortFilterProducts(content, strSort, strFilter, strText);
  }

  getCategoriesforPath(content: App) {
    return this.server
      .apiRoot(credentials)
      .withProjectKey({ projectKey: credentials.projectKey })
      .categories()
      .get()
      .execute()
      .then((response) => {
        response.body.results.forEach((el) => {
          if (el.key && !el.parent) {
            content.arrayCateg.push([el.id as string, el.key as string]);
          }
          // else if (el.parent) {
          //   if (!content.treeSubCat.has(el.parent.id)) {
          //     const subCategories: [string, string][] = [];
          //     subCategories.push([el.id, el.key as string]);
          //     content.treeSubCat.set(el.parent.id, subCategories);
          //   } else {
          //     const subCategories = content.treeSubCat.get(el.parent.id);
          //     if (subCategories) {
          //       subCategories.push([el.id, el.key as string]);
          //     }
          //   })
        });
      })
      .catch((err: Error) => {
        const errorElement = new ErrorView();
        errorElement.show(err.message);
      });
  }
}
