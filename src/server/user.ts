import { ClientBuilder, PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { credentials } from './workapi';
import { Server, httpMiddlewareOptions } from './server';
import { MyTokenCache } from './token';
import ErrorView from './error';

const myTokenCache = new MyTokenCache();
export class UserApiServer {
  server: Server;

  clientApiUser: ApiRoot | null;

  constructor(server: Server) {
    this.server = server;
    this.clientApiUser = null;
  }

  createCustomerApiClient(emailUser: string, passwordUser: string) {
    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey: credentials.projectKey,
      credentials: {
        clientId: credentials.clientID,
        clientSecret: credentials.clientSecret,
        user: {
          username: emailUser,
          password: passwordUser,
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

    this.clientApiUser = createApiBuilderFromCtpClient(clientUser);
    this.clientApiUser
      .withProjectKey({
        projectKey: credentials.projectKey,
      })
      .get()
      .execute()
      .then(() => {
        localStorage.setItem('tokenCashe', JSON.stringify(myTokenCache.getToken()));
      })
      .catch((err) => {
        const errorElement = new ErrorView();
        errorElement.show(err.message);
      });
  }

  apiRoot() {
    return this.clientApiUser?.withProjectKey({
      projectKey: credentials.projectKey,
    });
  }

  // createCustomerApiClientWithToken(token: string) {
  //   const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
  //     host: 'https://auth.europe-west1.gcp.commercetools.com',
  //     projectKey: credentials.projectKey,
  //     credentials: {
  //       clientId: credentials.clientID,
  //       clientSecret: credentials.clientSecret,
  //       // headers: {
  //       //   Authorization: `Bearer ${token}`,
  //       // },
  //     },
  //     scopes: [`manage_project:${credentials.projectKey}`],
  //     fetch,
  //     tokenCache: myTokenCache,
  //   };
  //   const clientUser = new ClientBuilder()
  //     .withProjectKey(credentials.projectKey)
  //     .withHttpMiddleware(httpMiddlewareOptions)
  //     .withPasswordFlow(passwordAuthMiddlewareOptions)
  //     .build();

  //   this.clientApiUser = createApiBuilderFromCtpClient(clientUser);
  //   this.clientApiUser
  //     .withProjectKey({
  //       projectKey: credentials.projectKey,
  //     })
  //     .get()
  //     .execute()
  //     .then(() => {
  //       localStorage.setItem('tokenCashe', JSON.stringify(myTokenCache.getToken()));
  //     })
  //     .catch((err) => {
  //       const errorElement = new ErrorView();
  //       errorElement.show(err.message);
  //     });
  // }
}
