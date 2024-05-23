export type Params = {
  tag?: string;
  textContent?: string;
  classNames?: Array<string>;
  callback?: (event: Event) => void;
};
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
