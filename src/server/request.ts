// import { AddressDraft, CustomerDraft } from '@commercetools/platform-sdk';
import { apiRoot, Credentials } from './root';

const credentials: Credentials = {
  projectKey: `ecommerceteam2024`,
  clientID: `6lID9e7e_dGhnVSIWF53MiwX`,
  clientSecret: `lXAZCHvhzRMB6uOcf7lm7Q_XKJ_PpLa9`,
  scopes: `manage_project: ecommerceteam2024 manage_api_clients: ecommerceteam2024 view_api_clients: ecommerceteam2024`,
};
// const address: AddressDraft = {
//   country: 'UK',
//   city: 'London',
//   streetName: 'st.WhiteRabbit',
//   streetNumber: '3',
// };

// const customerDraft: CustomerDraft = {
//   key: 'key',
//   email: 'mmmm@google.com',
//   password: '111111',
//   addresses: [address],
// };

// apiRoot(credentials)
//   .withProjectKey({ projectKey: credentials.projectKey })
//   .customers()
//   .post({
//     body: customerDraft,
//   })
//   .execute()
//   .catch((err: Error) => err);

console.log(
  apiRoot(credentials)
    .withProjectKey({ projectKey: credentials.projectKey })
    .products()
    .get()
    .execute()
    .catch((err: Error) => err)
);
