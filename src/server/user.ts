import { ClientBuilder, PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { credentials, customerDraft } from './workapi';
import { Server, httpMiddlewareOptions } from './server';
import { MyTokenCache } from './token';
import ErrorView from './error';

const myTokenCache = new MyTokenCache();
export class UserApiServer {
  server: Server;

  constructor(server: Server) {
    this.server = server;
  }

  createCustomerApiClient() {
    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: 'https://auth.europe-west1.gcp.commercetools.com',
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
      tokenCache: myTokenCache,
    };
    const clientUser = new ClientBuilder()
      .withProjectKey(credentials.projectKey)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .build();

    const clientApiUser = createApiBuilderFromCtpClient(clientUser);
    return clientApiUser
      .withProjectKey({
        projectKey: credentials.projectKey,
      })
      .get()
      .execute()
      .then(() => {
        localStorage.setItem('tokenCashe', JSON.stringify(myTokenCache));
      })
      .catch((err) => {
        const errorElement = new ErrorView();
        errorElement.show(err.message);
      });
  }
}
