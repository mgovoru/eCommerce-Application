import { BaseAddress, CustomerDraft } from '@commercetools/platform-sdk';
import { Settings } from '../app/enum';
import { UserApiServer } from './user';
import ErrorView from './error';
import { Server } from './server';
import { Credentials } from '../app/type';
import { Pages } from '../router/pages';
import Router from '../router/router';

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
const shippingAddress: BaseAddress = {
  country: 'UK',
  state: '',
  city: 'London',
  streetName: 'st.WhiteRabbit',
  streetNumber: '',
  postalCode: '',
};

const billingAddress: BaseAddress = {
  country: 'UK',
  state: '',
  city: 'London',
  streetName: 'st.GrayRabbit',
  streetNumber: '',
  postalCode: '',
};

export const customerDraft: CustomerDraft = {
  key: 'key111',
  email: 'rabbit@google.com',
  password: '12345',
  addresses: [shippingAddress, billingAddress],
  defaultShippingAddress: 0,
  defaultBillingAddress: 1,
};

export class WorkApi {
  server: Server;

  router: Router;

  constructor(server: Server, router: Router) {
    this.server = server;
    this.router = router;
  }

  registerCustomer() {
    return this.server
      .apiRoot(credentials)
      .withProjectKey({ projectKey: credentials.projectKey })
      .customers()
      .post({
        body: customerDraft,
      })
      .execute()
      .catch((err: Error) => err);
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
