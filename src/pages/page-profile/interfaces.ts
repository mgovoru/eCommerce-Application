export interface IAddressStatus {
  isShippingAddress: boolean | undefined;
  isDefaultShippingAddress: boolean;
  isBillingAddress: boolean | undefined;
  isDefaultBillingAddress: boolean;
}

export type CustomerAddAddressAction = {
  action: 'addAddress';
  address: {
    key: string;
    streetName: string | undefined;
    postalCode: string | undefined;
    city: string | undefined;
    country: string;
  };
};
type CustomerEditAction = {
  action: 'changeAddress';
  addressId: string;
  address: {
    streetName: string | undefined;
    postalCode: string | undefined;
    city: string | undefined;
    country: string;
  };
};
type CustomerSetDefaultBillingAddressAction = {
  action: 'setDefaultBillingAddress';
  addressKey: string;
};
type CustomerSetDefaultShippingAddressAction = {
  action: 'setDefaultShippingAddress';
  addressKey: string;
};
type EditSetDefaultBillingAddressAction = {
  action: 'setDefaultBillingAddress';
  addressId: string;
};
type EditSetDefaultShippingAddressAction = {
  action: 'setDefaultShippingAddress';
  addressId: string;
};

export type CustomerUpdateAction =
  | CustomerAddAddressAction
  | CustomerEditAction
  | EditSetDefaultBillingAddressAction
  | EditSetDefaultShippingAddressAction
  | CustomerSetDefaultBillingAddressAction
  | CustomerSetDefaultShippingAddressAction;
