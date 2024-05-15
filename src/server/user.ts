import { ClientBuilder, PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { MyCustomerSignin, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { credentials, customerDraft } from './request';
import { httpMiddlewareOptions } from './client';

const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
  host: httpMiddlewareOptions.host,
  projectKey: credentials.projectKey,
  credentials: {
    clientId: credentials.clientID,
    clientSecret: credentials.clientSecret,
    user: {
      username: customerDraft.email as string,
      password: customerDraft.password as string,
    },
  },
  scopes: [`manage_project:${credentials.projectKey}`],
  fetch,
};

const clientUser = new ClientBuilder()
  .withPasswordFlow(passwordAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export const clientApiUser = createApiBuilderFromCtpClient(clientUser).withProjectKey({
  projectKey: credentials.projectKey,
});

export const customerLogin: MyCustomerSignin = {
  email: customerDraft.email as string,
  password: customerDraft.password as string,
};

export async function requestLoginCustomer() {
  return clientApiUser
    .me()
    .login()
    .post({
      body: customerLogin,
    })
    .execute()
    .catch((err: Error) => err);
}
