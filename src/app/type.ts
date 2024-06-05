import { Image, Price, Attribute, LocalizedString } from '@commercetools/platform-sdk';

export type Params = {
  tag?: string;
  textContent?: string;
  classNames?: Array<string>;
  callback?: (event: Event) => void;
  key?: string;
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
  key: string;
}

export interface Variant {
  id: number;
  sku?: string;
  prices?: Price[];
  images?: Image[];
  attributes?: Attribute[];
}

interface MasterData {
  current: {
    name: LocalizedString;
    description?: LocalizedString;
    masterVariant: Variant;
    variants: Variant[];
  };
}

export interface ProductDetail {
  masterData: MasterData;
}
