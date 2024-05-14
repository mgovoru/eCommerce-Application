import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './client';

// type Nullable<T> = T | null;
// export type Credentials = {
//   projectKey: Nullable<string>;
//   clientID: Nullable<string>;
//   clientSecret: Nullable<string>;
//   scopes: Nullable<string>;
// };
export type Credentials = {
  projectKey: string;
  clientID: string;
  clientSecret: string;
  scopes: string;
};

export function apiRoot({ projectKey, clientID, clientSecret, scopes }: Credentials): ApiRoot {
  return createApiBuilderFromCtpClient(client(projectKey, clientID, clientSecret, scopes));
}
