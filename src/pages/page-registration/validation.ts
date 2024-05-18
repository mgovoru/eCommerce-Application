import {
  RegistrationData,
  registrationData,
  handlingRegistration,
  addresshandlingRegistration,
  billingRegistrationData,
  shippingRegistrationData,
  AddressOfRegistration,
} from './handlingRegistration';

interface LoginData {
  email: string | null;
  password: string | null;
}
interface Response {
  error: string;
  result: boolean;
}
export const matchPassword = {
  status: false,
};

let loginData: LoginData = {
  email: null,
  password: null,
};
// ИСПРАВИТЬ ПРОВЕКРУ
function allValuesAreNotNull(data: RegistrationData | LoginData | AddressOfRegistration): boolean {
  return Object.values(data).every((value) => value !== null);
}

export class RegistrationValidation {
  validMail(str: string): Response {
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const response = {
      error: 'Correct format: name@example.com',
      result: emailValid.test(str),
    };
    // (буквы или цифры или ._%+-) + (@) + (буквы или цифры или .-) + (.) + (мин. 2 буквы)
    return response;
  }

  validPassword(str: string): Response {
    const passValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
    const response = {
      error:
        'Password must be at least 8 characters, include a small letter, a capital letter, a number and a special symbol',
      result: passValid.test(str),
    };
    // минимум 1 маленькая буква, 1 большая, 1 цифра. минимум 8 символов. Принимает Англ буквы, цифры, спецсимволы.
    return response;
  }

  validRepeatPassword(str: string): Response {
    const originalPasswordInput = document.querySelector('.form-pass') as HTMLInputElement;
    const response = {
      error: "Doesn't match the password. Please enter correct password.",
      result: originalPasswordInput.value === str,
    };
    return response;
  }

  validFirstAndLastName(str: string): Response {
    const firstLastNameValid = /^[a-zA-Z]+$/;
    const response = {
      error: 'At least 1 symbol is required',
      result: firstLastNameValid.test(str),
    };
    // Как минимум 1 буква англ алфавита
    return response;
  }

  validBirthDate(str: string): Response {
    const dateFormatRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d\d$/;
    // формат dd.mm.yyyy
    if (!dateFormatRegex.test(str)) {
      const response = {
        error: 'Correct format: dd.mm.yyyy',
        result: false,
      };
      return response;
    }
    const parts = str.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const birthDate = new Date(year, month, day);
    const currentDate = new Date();
    let ageDifference = currentDate.getFullYear() - birthDate.getFullYear();
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
      ageDifference -= 1;
    }
    const response = {
      error: 'Not eligible for users under 13 years old',
      result: ageDifference >= 13,
    };
    return response;
  }

  validStreet(str: string): Response {
    const regex = /^[0-9a-zA-Z-]+$/;
    const response = {
      error: 'At least 1 symbol is required. Letter or digits.',
      result: regex.test(str),
    };
    // минимум 1 символ. допустимые англ буквы, чилса и -
    return response;
  }

  validCity(str: string): Response {
    const regex = /^[a-zA-Z]+$/;
    const response = {
      error: 'At least 1 symbol is required. Only letters.',
      result: regex.test(str),
    };
    // минимум 1 символ. допустимы только англ буквы
    return response;
  }

  validPostalCode(str: string): Response {
    const regex = /^[0-9]{6}$/;
    const response = {
      error: 'Only numbers are valid. For RU, UA, BY: 6 digits',
      result: regex.test(str),
    };
    // только цифры, 6 цифр
    return response;
  }

  registrationValidAllInputs(): RegistrationData | null {
    // Удаление красного фона в инпутах
    const allWrongInputs = document.querySelectorAll('.registration-wrong-iput-field');
    allWrongInputs.forEach((element) => {
      element.classList.remove('registration-wrong-iput-field');
    });
    // Удаление текста во всех элементах с классом 'input-reg-error'
    const errorElements = document.querySelectorAll('.input-reg-error');
    errorElements.forEach((element) => {
      const el = element as HTMLElement;
      el.textContent = '';
    });
    matchPassword.status = false;

    handlingRegistration('form-email', this.validMail, 'email', registrationData);
    handlingRegistration('form-pass', this.validPassword, 'password', registrationData);
    handlingRegistration('form-r-pass', this.validRepeatPassword, 'password', registrationData);
    handlingRegistration('form-f-name', this.validFirstAndLastName, 'firstName', registrationData);
    handlingRegistration('form-l-name', this.validFirstAndLastName, 'lastName', registrationData);
    handlingRegistration('form-birth', this.validBirthDate, 'dateOfBirth', registrationData);

    addresshandlingRegistration('form-country', this.validBirthDate, 'country', billingRegistrationData);
    addresshandlingRegistration('form-street', this.validStreet, 'street', billingRegistrationData);
    addresshandlingRegistration('form-city', this.validCity, 'city', billingRegistrationData);
    addresshandlingRegistration('form-postal', this.validPostalCode, 'postal', billingRegistrationData);

    addresshandlingRegistration('ship-country', this.validBirthDate, 'country', shippingRegistrationData);
    addresshandlingRegistration('ship-street', this.validStreet, 'street', shippingRegistrationData);
    addresshandlingRegistration('ship-city', this.validCity, 'city', shippingRegistrationData);
    addresshandlingRegistration('ship-postal', this.validPostalCode, 'postal', shippingRegistrationData);

    // Ниже проверка что все значения записанны и пароль повторен верно
    // console.log('reg', registrationData, 'bil', billingRegistrationData, 'ship', shippingRegistrationData);
    // console.log('shippingRegistrationData', allValuesAreNotNull(shippingRegistrationData));
    if (
      matchPassword &&
      allValuesAreNotNull(registrationData) &&
      allValuesAreNotNull(billingRegistrationData) &&
      allValuesAreNotNull(shippingRegistrationData)
    ) {
      console.log('Все данные введены верно', registrationData);
      return registrationData;
    }
    return null;
  }

  loginValidAllInputs(): LoginData | null {
    // Удаление красного фона в инпутах
    const allWrongInputs = document.querySelectorAll('.login-wrong-iput-field');
    allWrongInputs.forEach((element) => {
      element.classList.remove('login-wrong-iput-field');
    });
    // Удаление текста во всех элементах с классом 'input-reg-error'
    const errorElements = document.querySelectorAll('.input-reg-error__login');
    errorElements.forEach((element) => {
      const el = element as HTMLElement;
      el.textContent = '';
    });
    loginData = {
      email: null,
      password: null,
    };

    const emailInput = document.querySelector('.form-email__login') as HTMLInputElement;
    const email = emailInput.value;
    const emailError = emailInput.nextElementSibling as HTMLElement;
    if (!this.validMail(email).result) {
      emailError.textContent = this.validMail(email).error;
      emailInput.classList.add('login-wrong-iput-field');
    } else {
      loginData.email = email;
    }

    const passwordInput = document.querySelector('.form-pass__login') as HTMLInputElement;
    const password = passwordInput.value;
    const passwordError = passwordInput.nextElementSibling as HTMLElement;
    if (!this.validPassword(password).result) {
      passwordError.textContent = this.validPassword(password).error;
      passwordInput.classList.add('login-wrong-iput-field');
    } else {
      loginData.password = password;
    }

    if (allValuesAreNotNull(loginData)) {
      // console.log('Дальше нужна проверка на сервере. Данные:', loginData);
      return loginData;
    }
    return null;
  }
}
