import Router from '../router/router';
import { Server } from './server';
import { userVariable } from '../pages/page-profile/userVariable';
import { successfulApply, errorApply } from '../pages/page-profile/successfulApply';
import { CustomerUpdateAction, CustomerAddAddressAction } from '../pages/page-profile/interfaces';
import { generateRandomKey } from '../pages/page-profile/addresse-modal/generateRandomKey';
import { changeBackgroundAdresses } from '../pages/page-profile/addresse-modal/deleteColorAddresseIfBilOrShip';

export class ProfilePageRequest {
  server: Server;

  router: Router;

  constructor(server: Server, router: Router) {
    this.server = server;
    this.router = router;
  }

  // ИЗМЕНЕНИЯ ВЕНСЕННЫЕ LEX010
  emailUpdateUser() {
    const idString = localStorage.getItem('id');
    const versionOfCustomerString = localStorage.getItem('versionCustomer');
    const versionOfCustomer: number = versionOfCustomerString !== null ? Number(versionOfCustomerString) : 1;

    if (idString) {
      const id: string = JSON.parse(idString);
      return this.server
        .apiRoot()
        .customers()
        .withId({ ID: id })
        .post({
          body: {
            version: versionOfCustomer,
            actions: [
              {
                action: 'changeEmail',
                email: userVariable.newEmail,
              },
            ],
          },
        })
        .execute()
        .then((response) => {
          localStorage.setItem('versionCustomer', JSON.stringify(response.body.version));
          successfulApply();
          return response.body;
        })
        .catch((error) => {
          errorApply(error.message);
        });
    }
    return Promise.reject(new Error('Идентификатор пользователя не найден в localStorage'));
  }

  passwordUpdateUser() {
    const idString = localStorage.getItem('id');
    const versionOfCustomerString = localStorage.getItem('versionCustomer');
    const versionOfCustomer: number = versionOfCustomerString !== null ? Number(versionOfCustomerString) : 1;

    if (idString) {
      const idThis: string = JSON.parse(idString);
      return this.server
        .apiRoot()
        .customers()
        .password()
        .post({
          body: {
            id: idThis,
            version: versionOfCustomer,
            currentPassword: userVariable.currentPassword || '',
            newPassword: userVariable.newPassword || '',
          },
        })
        .execute()
        .then((response) => {
          localStorage.setItem('versionCustomer', JSON.stringify(response.body.version));
          successfulApply();
          userVariable.currentPassword = response.body.password;
          return response.body;
        })
        .catch((error) => {
          errorApply(error.message);
        });
    }
    return Promise.reject(new Error('Идентификатор пользователя не найден в localStorage'));
  }

  addresseCreate() {
    const idString = localStorage.getItem('id');
    const versionOfCustomerString = localStorage.getItem('versionCustomer');
    const versionOfCustomer: number = versionOfCustomerString !== null ? Number(versionOfCustomerString) : 1;
    const keyThis = generateRandomKey();

    const newAddresse: CustomerUpdateAction[] = [
      {
        action: 'addAddress',
        address: {
          key: keyThis,
          streetName: userVariable.newStreet,
          postalCode: userVariable.newPostalCode,
          city: userVariable.newCity,
          country: userVariable.newCountry || 'RU',
        },
      },
    ];

    const billing: CustomerUpdateAction = {
      action: 'setDefaultBillingAddress',
      addressKey: (newAddresse[0] as CustomerAddAddressAction).address.key, // Используем правильное значение ключа
    };
    const shipping: CustomerUpdateAction = {
      action: 'setDefaultShippingAddress',
      addressKey: (newAddresse[0] as CustomerAddAddressAction).address.key, // Используем правильное значение ключа
    };
    if (userVariable.isDefaultBilling) {
      newAddresse.push(billing);
    }
    if (userVariable.isDefaultShipping) {
      newAddresse.push(shipping);
    }
    // окончание подготовки

    if (idString) {
      const idThis: string = JSON.parse(idString);
      return this.server
        .apiRoot()
        .customers()
        .withId({ ID: idThis })
        .post({
          body: {
            version: versionOfCustomer,
            actions: newAddresse,
          },
        })
        .execute()
        .then((response) => {
          localStorage.setItem('versionCustomer', JSON.stringify(response.body.version));
          successfulApply();
          // удаляю фоновый цвет адресов
          changeBackgroundAdresses();
          // тут заисать данные айди адреса для добавления его в билинг или шипинг
          return response.body;
        })
        .catch((error) => {
          errorApply(error.message);
        });
    }
    return Promise.reject(new Error('Идентификатор пользователя не найден в localStorage'));
  }

  addresseEdit(idAddresse: string) {
    const idString = localStorage.getItem('id');
    const versionOfCustomerString = localStorage.getItem('versionCustomer');
    const versionOfCustomer: number = versionOfCustomerString !== null ? Number(versionOfCustomerString) : 1;

    const editAddresse: CustomerUpdateAction[] = [
      {
        action: 'changeAddress',
        addressId: idAddresse,
        address: {
          streetName: userVariable.newStreet,
          postalCode: userVariable.newPostalCode,
          city: userVariable.newCity,
          country: userVariable.newCountry || 'RU',
        },
      },
    ];

    const billing: CustomerUpdateAction = {
      action: 'addBillingAddressId',
      addressId: idAddresse,
    };
    const shipping: CustomerUpdateAction = {
      action: 'addShippingAddressId',
      addressId: idAddresse,
    };
    const defaultBilling: CustomerUpdateAction = {
      action: 'setDefaultBillingAddress',
      addressId: idAddresse,
    };
    const defaultShipping: CustomerUpdateAction = {
      action: 'setDefaultShippingAddress',
      addressId: idAddresse,
    };
    const removeBilling: CustomerUpdateAction = {
      action: 'removeBillingAddressId',
      addressId: idAddresse,
    };
    const removeShipping: CustomerUpdateAction = {
      action: 'removeShippingAddressId',
      addressId: idAddresse,
    };
    if (userVariable.isDefaultBilling) {
      editAddresse.push(defaultBilling);
    }
    if (!userVariable.isDefaultBilling) {
      editAddresse.push(billing);
      editAddresse.push(removeBilling);
    }
    if (userVariable.isDefaultShipping) {
      editAddresse.push(defaultShipping);
    }
    if (!userVariable.isDefaultShipping) {
      editAddresse.push(shipping);
      editAddresse.push(removeShipping);
    }
    // окончание подготовки

    if (idString) {
      const idThis: string = JSON.parse(idString);
      return this.server
        .apiRoot()
        .customers()
        .withId({ ID: idThis })
        .post({
          body: {
            version: versionOfCustomer,
            actions: editAddresse,
          },
        })
        .execute()
        .then((response) => {
          localStorage.setItem('versionCustomer', JSON.stringify(response.body.version));
          successfulApply();
          // удаляю фоновый цвет адресов
          changeBackgroundAdresses();
          // тут заисать данные айди адреса для добавления его в билинг или шипинг
          return response.body;
        })
        .catch((error) => {
          errorApply(error.message);
        });
    }
    return Promise.reject(new Error('Идентификатор пользователя не найден в localStorage'));
  }

  addresseDelete(idAddresse: string) {
    const idString = localStorage.getItem('id');
    const versionOfCustomerString = localStorage.getItem('versionCustomer');
    const versionOfCustomer: number = versionOfCustomerString !== null ? Number(versionOfCustomerString) : 1;

    if (idString) {
      const idThis: string = JSON.parse(idString);
      return this.server
        .apiRoot()
        .customers()
        .withId({ ID: idThis })
        .post({
          body: {
            version: versionOfCustomer,
            actions: [
              {
                action: 'removeAddress',
                addressId: idAddresse,
              },
            ],
          },
        })
        .execute()
        .then((response) => {
          localStorage.setItem('versionCustomer', JSON.stringify(response.body.version));
          successfulApply();
          return response.body;
        })
        .catch((error) => {
          errorApply(error.message);
        });
    }
    return Promise.reject(new Error('Идентификатор пользователя не найден в localStorage'));
  }
}
