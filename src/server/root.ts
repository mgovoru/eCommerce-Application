import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './client';

export type Credentials = {
  projectKey: string;
  clientID: string;
  clientSecret: string;
  scopes: string;
  user?: {
    username: string;
    password: string;
  };
};

export function apiRoot({ projectKey, clientID, clientSecret, scopes }: Credentials): ApiRoot {
  return createApiBuilderFromCtpClient(client(projectKey, clientID, clientSecret, scopes));
}
