import { AddressDraft, CustomerDraft } from '@commercetools/platform-sdk';
import { Settings } from '../app/enum';
import { apiRoot, Credentials } from './root';

export const credentials: Credentials = {
  projectKey: Settings.PROJECTKEY,
  clientID: Settings.CLIENTID,
  clientSecret: Settings.CLIENTSECRET,
  scopes: Settings.SCOPES,
};
// данные для тестов
const address: AddressDraft = {
  country: 'UK',
  city: 'London',
  streetName: 'st.WhiteRabbit',
  streetNumber: '3',
};

export const customerDraft: CustomerDraft = {
  key: 'key',
  email: '12345@gmail.com',
  password: '12345',
  addresses: [address],
};

export async function requestCreateCustomer() {
  return apiRoot(credentials)
    .withProjectKey({ projectKey: credentials.projectKey })
    .customers()
    .post({
      body: customerDraft,
    })
    .execute()
    .catch((err: Error) => err);
}

export async function requestGetCustomers() {
  return apiRoot(credentials)
    .withProjectKey({ projectKey: credentials.projectKey })
    .customers()
    .get()
    .execute()
    .catch((err: Error) => err);
}
