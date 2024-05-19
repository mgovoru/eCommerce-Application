import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  type Client,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { Credentials } from '../app/type';
import { WorkApi } from './workapi';
import Router from '../router/router';

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};
export class Server {
  workApi: WorkApi;

  constructor(router: Router) {
    this.workApi = new WorkApi(this, router);
  }

  client(projectKey: string, clientID: string, clientSecret: string, scopes: string): Client {
    const scopesSplit = scopes.split(',');
    console.log(scopesSplit);
    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey,
      credentials: {
        clientId: clientID,
        clientSecret,
      },
      fetch,
    };

    return new ClientBuilder()
      .withProjectKey(projectKey)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withClientCredentialsFlow(authMiddlewareOptions)
      .build();
  }

  apiRoot({ projectKey, clientID, clientSecret, scopes }: Credentials): ApiRoot {
    return createApiBuilderFromCtpClient(this.client(projectKey, clientID, clientSecret, scopes));
  }
}
