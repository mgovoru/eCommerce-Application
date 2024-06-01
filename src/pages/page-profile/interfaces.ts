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
type EditJustBillingAddressAction = {
  action: 'addBillingAddressId';
  addressId: string;
};
type EditJustShippingAddressAction = {
  action: 'addShippingAddressId';
  addressId: string;
};
type RemoveBillingAddressAction = {
  action: 'removeBillingAddressId';
  addressId: string;
};
type RemoveShippingAddressAction = {
  action: 'removeShippingAddressId';
  addressId: string;
};

export type CustomerUpdateAction =
  | CustomerAddAddressAction
  | CustomerEditAction
  | EditJustBillingAddressAction
  | EditJustShippingAddressAction
  | RemoveBillingAddressAction
  | RemoveShippingAddressAction
  | EditSetDefaultBillingAddressAction
  | EditSetDefaultShippingAddressAction
  | CustomerSetDefaultBillingAddressAction
  | CustomerSetDefaultShippingAddressAction;
