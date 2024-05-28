import { Image, Price } from '@commercetools/platform-sdk';

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
export interface CardInfo {
  src: Image[];
  title: string;
  description: string;
  price: Price[];
  id: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  description: string;
}
