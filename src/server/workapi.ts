import { BaseAddress, CustomerDraft } from '@commercetools/platform-sdk';
import { Settings } from '../app/enum';
import { UserApiServer } from './user';
import ErrorView from './error';
import { Server } from './server';
import { CardInfo, Credentials } from '../app/type';
import { Pages } from '../router/pages';
import Router from '../router/router';
import { DataReturn } from '../pages/page-registration/validation';
import { userVariable } from '../pages/page-profile/userVariable'; // ИЗМЕНЕНИЯ ВЕНСЕННЫЕ LEX010
import { successfulApply, errorApply } from '../pages/page-profile/successfulApply'; // ИЗМЕНЕНИЯ ВЕНСЕННЫЕ LEX010
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

  requestDetailedProduct(key: string) {
    this.requestProductInstance.getProductByKey(key);
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
      dateOfBirth: data.data.dateOfBirth as string, // ИЗМЕНЕНИЯ ВЕНСЕННЫЕ LEX010
      addresses: [shippingAddress, billingAddress],
      defaultShippingAddress: flagShippng,
      defaultBillingAddress: flagBilling,
    };
  }

  registerCustomer(customerDraft: CustomerDraft) {
    return (
      this.server
        .apiRoot()
        // .withProjectKey({ projectKey: credentials.projectKey })
        .customers()
        .post({
          body: customerDraft,
        })
        .execute()
        .then((response) => {
          if (response.body.customer.firstName) {
            localStorage.setItem('name', JSON.stringify(response.body.customer.firstName));
            localStorage.setItem('id', JSON.stringify(response.body.customer.id)); // ИЗМЕНЕНИЯ ВЕНСЕННЫЕ LEX010
          } else {
            localStorage.setItem('name', JSON.stringify('client who did not indicate a name upon registration'));
          }
          this.router.navigate(Pages.MAIN);
        })
        .catch((err: Error) => {
          const errorElement = new ErrorView();
          errorElement.show(err.message);
        })
    );
  }

  loginCustomer(emailUser: string, passwordUser: string) {
    return (
      this.server
        .apiRoot()
        // .withProjectKey({ projectKey: credentials.projectKey })
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
          if (response.body.customer.firstName) {
            localStorage.setItem('id', JSON.stringify(response.body.customer.id)); // ИЗМЕНЕНИЯ ВЕНСЕННЫЕ LEX010
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
        })
    );
  }

  // ИЗМЕНЕНИЯ ВЕНСЕННЫЕ LEX010
  updateUser() {
    const idString = localStorage.getItem('id');

    if (idString) {
      const id: string = JSON.parse(idString);
      return (
        this.server
          .apiRoot()
          // .withProjectKey({ projectKey: credentials.projectKey })
          .customers()
          .withId({ ID: id })
          .get()
          .execute()
          .then((response) => {
            localStorage.setItem('versionCustomer', JSON.stringify(response.body.version));
            userVariable.firstName = response.body.firstName;
            userVariable.lastName = response.body.lastName;
            userVariable.dateOfBirth = response.body.dateOfBirth;
            return response.body;
          })
          .catch((error) => {
            console.log(error.message);
          })
      );
    }
    return Promise.reject(new Error('Идентификатор пользователя не найден в localStorage'));
  }

  // ИЗМЕНЕНИЯ ВЕНСЕННЫЕ LEX010
  firstNameUpdateUser() {
    const idString = localStorage.getItem('id');
    const versionOfCustomerString = localStorage.getItem('versionCustomer');
    const versionOfCustomer: number = versionOfCustomerString !== null ? Number(versionOfCustomerString) : 1;

    if (idString) {
      const id: string = JSON.parse(idString);
      return (
        this.server
          .apiRoot()
          // .withProjectKey({ projectKey: credentials.projectKey })
          .customers()
          .withId({ ID: id })
          .post({
            body: {
              version: versionOfCustomer,
              actions: [
                {
                  action: 'setFirstName',
                  firstName: userVariable.newFirstNameInIput,
                },
              ],
            },
          })
          .execute()
          .then((response) => {
            localStorage.setItem('versionCustomer', JSON.stringify(response.body.version));
            successfulApply();
            return response.body;
          })
          .catch((error) => {
            errorApply(error.message);
          })
      );
    }
    return Promise.reject(new Error('Идентификатор пользователя не найден в localStorage'));
  }

  // ИЗМЕНЕНИЯ ВЕНСЕННЫЕ LEX010
  lastNameUpdateUser() {
    const idString = localStorage.getItem('id');
    const versionOfCustomerString = localStorage.getItem('versionCustomer');
    const versionOfCustomer: number = versionOfCustomerString !== null ? Number(versionOfCustomerString) : 1;

    if (idString) {
      const id: string = JSON.parse(idString);
      return (
        this.server
          .apiRoot()
          // .withProjectKey({ projectKey: credentials.projectKey })
          .customers()
          .withId({ ID: id })
          .post({
            body: {
              version: versionOfCustomer,
              actions: [
                {
                  action: 'setLastName',
                  lastName: userVariable.newLastNameInIput,
                },
              ],
            },
          })
          .execute()
          .then((response) => {
            localStorage.setItem('versionCustomer', JSON.stringify(response.body.version));
            successfulApply();
            return response.body;
          })
          .catch((error) => {
            errorApply(error.message);
          })
      );
    }
    return Promise.reject(new Error('Идентификатор пользователя не найден в localStorage'));
  }

  // ИЗМЕНЕНИЯ ВЕНСЕННЫЕ LEX010
  dateOfBirthUpdateUser() {
    const idString = localStorage.getItem('id');
    const versionOfCustomerString = localStorage.getItem('versionCustomer');
    const versionOfCustomer: number = versionOfCustomerString !== null ? Number(versionOfCustomerString) : 1;

    if (idString) {
      const id: string = JSON.parse(idString);
      return (
        this.server
          .apiRoot()
          // .withProjectKey({ projectKey: credentials.projectKey })
          .customers()
          .withId({ ID: id })
          .post({
            body: {
              version: versionOfCustomer,
              actions: [
                {
                  action: 'setDateOfBirth',
                  dateOfBirth: userVariable.newDateOfBirth,
                },
              ],
            },
          })
          .execute()
          .then((response) => {
            localStorage.setItem('versionCustomer', JSON.stringify(response.body.version));
            successfulApply();
            return response.body;
          })
          .catch((error) => {
            errorApply(error.message);
          })
      );
    }
    return Promise.reject(new Error('Идентификатор пользователя не найден в localStorage'));
  }

  getAllProductsCount(content: CatalogView) {
    this.requestInstance.getAllProductsCount(content);
  }

  createToCart() {
    this.requestInstance.createToCart();
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
    return (
      this.server
        .apiRoot()
        // .withProjectKey({ projectKey: credentials.projectKey })
        .categories()
        .get()
        .execute()
        .then((response) => {
          response.body.results.forEach((el) => {
            if (el.key && !el.parent) {
              content.arrayCateg.push([el.id as string, el.key as string]);
            } else if (el.parent) {
              const elem = content.arrayCateg.find((ell) => ell[0] === el.parent?.id);
              if (elem && elem[1]) {
                content.arrayCateg.push([el.id, `${elem[1]}/${el.key}`]);
              }
            }
          });
        })
        .catch((err: Error) => {
          const errorElement = new ErrorView();
          errorElement.show(err.message);
        })
    );
  }
}
