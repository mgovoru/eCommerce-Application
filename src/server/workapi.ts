import { BaseAddress, CustomerDraft } from '@commercetools/platform-sdk';
import { Settings } from '../app/enum';
import { UserApiServer } from './user';
import ErrorView from './error';
import { Server } from './server';
import { Credentials } from '../app/type';
import { Pages } from '../router/pages';
import Router from '../router/router';
import { DataReturn } from '../pages/page-registration/validation';

export const credentials: Credentials = {
  projectKey: Settings.PROJECTKEY,
  clientID: Settings.CLIENTID,
  clientSecret: Settings.CLIENTSECRET,
  scopes: Settings.SCOPES,
};
// данные для тестов
// const address: AddressDraft = {
//   country: 'UK',
//   city: 'London',
//   streetName: 'st.WhiteRabbit',
//   streetNumber: '3',
// };
// const shippingAddress: BaseAddress = {
//   country: 'UK',
//   state: '',
//   city: 'London',
//   streetName: 'st.WhiteRabbit',
//   streetNumber: '',
//   postalCode: '',
// };

// const billingAddress: BaseAddress = {
//   country: 'UK',
//   state: '',
//   city: 'London',
//   streetName: 'st.GrayRabbit',
//   streetNumber: '',
//   postalCode: '',
// };

// export const customerDraft: CustomerDraft = {
//   key: 'key111',
//   email: 'rabbit@google.com',
//   password: '12345',
//   addresses: [shippingAddress, billingAddress],
//   defaultShippingAddress: 0,
//   defaultBillingAddress: 1,
// };

export class WorkApi {
  server: Server;

  router: Router;

  constructor(server: Server, router: Router) {
    this.server = server;
    this.router = router;
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
        console.log(response);
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

  // функция выдает список покупателей
  // requestGetCustomers() {
  //   return apiRoot(credentials)
  //     .withProjectKey({ projectKey: credentials.projectKey })
  //     .customers()
  //     .get()
  //     .execute()
  //     .catch((err: Error) => err);
  // }
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
        console.log(response);
        if (response.body.customer.firstName) {
          localStorage.setItem('name', JSON.stringify(response.body.customer.firstName));
        } else {
          localStorage.setItem('name', JSON.stringify('client who did not indicate a name upon registration'));
        }
        const userApi = new UserApiServer(this.server);
        const data1 = userApi.createCustomerApiClient(emailUser, passwordUser);
        console.log(data1);
        this.router.navigate(Pages.MAIN);
      })
      .catch((error) => {
        const errorElement = new ErrorView();
        errorElement.show(error.message);
      });
  }
  // handle
  // requestLogin() {
  //   return apiRoot(credentials)
  //     .withProjectKey({ projectKey: credentials.projectKey })
  //     .get()
  //     .execute()
  //     .then((response) => console.log(response))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
}
