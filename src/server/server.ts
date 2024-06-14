import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  type Client,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { WorkApi, credentials } from './workapi';
import Router from '../router/router';

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};
export class Server {
  workApi: WorkApi;

  categories: [string, string][];

  clientNew: Client;

  cartLogin: string;

  versionCartLogin: number;

  versionCartAnonimus: number;

  idAddItem: string;

  firstTime: number;

  cartAnonimus: string;

  anonimousId: string;

  constructor(router: Router) {
    this.workApi = new WorkApi(this, router);
    this.categories = [];
    this.clientNew = this.client(
      credentials.projectKey,
      credentials.clientID,
      credentials.clientSecret,
      credentials.scopes
    );
    this.cartLogin = '';
    this.cartAnonimus = '';
    this.versionCartLogin = 1;
    this.versionCartAnonimus = 1;
    this.idAddItem = '';
    this.firstTime = 0;
    this.anonimousId = '';
    this.workApi.checkIdCart();
    console.log(this.cartAnonimus);
    this.workApi.checkLogin();
  }

  client(projectKey: string, clientID: string, clientSecret: string, scopes: string): Client {
    scopes.split(',');
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

  apiRoot() {
    return createApiBuilderFromCtpClient(this.clientNew).withProjectKey({
      projectKey: credentials.projectKey,
    });
  }
}
