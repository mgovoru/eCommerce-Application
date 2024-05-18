import { BaseAddress, CustomerDraft } from '@commercetools/platform-sdk';
import { Settings } from '../app/enum';
import { UserApiServer } from './user';
import ErrorView from './error';
import { Server } from './server';
import { Credentials } from '../app/type';

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

  constructor(server: Server) {
    this.server = server;
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
  loginCustomer() {
    return this.server
      .apiRoot(credentials)
      .withProjectKey({ projectKey: credentials.projectKey })
      .login()
      .post({
        body: {
          email: customerDraft.email as string,
          password: customerDraft.password as string,
        },
      })
      .execute()
      .then((response) => {
        console.log(response);
        const userApi = new UserApiServer(this.server);
        const data1 = userApi.createCustomerApiClient();
        console.log(data1);
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
