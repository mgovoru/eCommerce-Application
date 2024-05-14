// import fetch from 'node-fetch';
import {
  ClientBuilder,
  type Client,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const date = new Date().toISOString();

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
export function client(projectKey: string, clientID: string, clientSecret: string, scopes: string): Client {
  const scopesSplit = scopes.split(',');
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId: clientID,
      clientSecret,
    },
    scopes: scopesSplit,
    fetch,
  };

  return (
    new ClientBuilder()
      .withProjectKey(projectKey)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withUserAgentMiddleware({ libraryName: `stackblitz-env-${date}-typescript-sdk-v2` })
      // .withLoggerMiddleware()
      .build()
  );
}
