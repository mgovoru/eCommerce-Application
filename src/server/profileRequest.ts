import Router from '../router/router';
import { Server } from './server';
import { credentials } from './workapi';
import { userVariable } from '../pages/page-profile/userVariable';
import { successfulApply, errorApply } from '../pages/page-profile/successfulApply';

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
        .apiRoot(credentials)
        .withProjectKey({ projectKey: credentials.projectKey })
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
        .apiRoot(credentials)
        .withProjectKey({ projectKey: credentials.projectKey })
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

    if (idString) {
      const idThis: string = JSON.parse(idString);
      return this.server
        .apiRoot(credentials)
        .withProjectKey({ projectKey: credentials.projectKey })
        .customers()
        .withId({ ID: idThis })
        .post({
          body: {
            version: versionOfCustomer,
            actions: [
              {
                action: 'addAddress',
                address: {
                  streetName: userVariable.newStreet,
                  postalCode: userVariable.newPostalCode,
                  city: userVariable.newCity,
                  country: userVariable.newCountry || 'RU',
                },
              },
            ],
          },
        })
        .execute()
        .then((response) => {
          localStorage.setItem('versionCustomer', JSON.stringify(response.body.version));
          successfulApply();
          // тут заисать данные айди адреса для добавления его в билинг или шипинг
          return response.body;
        })
        .catch((error) => {
          errorApply(error.message);
        });
    }
    return Promise.reject(new Error('Идентификатор пользователя не найден в localStorage'));
  }
}
