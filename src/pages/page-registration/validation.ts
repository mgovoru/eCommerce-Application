interface RegistrationData {
  email: string | null;
  password: string | null;
  firstName: string | null;
  lastName: string | null;
  date: string | null;
}
interface Response {
  error: string;
  result: boolean;
}
let matchPassword = false;
let registrationData: RegistrationData = {
  email: null,
  password: null,
  firstName: null,
  lastName: null,
  date: null,
};
function allValuesAreStrings(data: RegistrationData): boolean {
  return Object.values(data).every((value) => value === null || typeof value === 'string');
}

export class RegistrationValidation {
  validMail(str: string): Response {
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const response = {
      error: 'example: mail12@cs.com',
      result: emailValid.test(str),
    };
    // (буквы или цифры или ._%+-) + (@) + (буквы или цифры или .-) + (.) + (мин. 2 буквы)
    return response;
  }

  validPassword(str: string): Response {
    const passValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
    const response = {
      error: 'min-8sumb, 1Uper, 1Lower, 1Digit',
      result: passValid.test(str),
    };
    // минимум 1 маленькая буква, 1 большая, 1 цифра. минимум 8 символов. Принимает Англ буквы, цифры, спецсимволы.
    return response;
  }

  validRepeatPassword(str: string): Response {
    const originalPasswordInput = document.querySelector('.form-pass') as HTMLInputElement;
    const response = {
      error: 'not match',
      result: originalPasswordInput.value === str,
    };
    return response;
  }

  validFirstAndLastName(str: string): Response {
    const firstLastNameValid = /^[a-zA-Z]+$/;
    const response = {
      error: 'min-1sumb, only eng.',
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
        error: 'dd.mm.yyyy',
        result: false,
      };
      return response;
    }
    const parts = str.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const birthDate = new Date(year, month, day);
    // console.log(birthDate);
    const currentDate = new Date();
    let ageDifference = currentDate.getFullYear() - birthDate.getFullYear();
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
      ageDifference -= 1;
    }
    const response = {
      error: 'You are younger 13',
      result: ageDifference >= 13,
    };
    return response;
  }

  validStrit(str: string): boolean {
    const regex = /^[0-9a-zA-Z-]+$/;
    // минимум 1 символ. допустимые англ буквы, чилса и -
    return regex.test(str);
  }

  validCity(str: string): boolean {
    const regex = /^[a-zA-Z]+$/;
    // минимум 1 символ. допустимы только англ буквы
    return regex.test(str);
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
    // Очистить объект registrationData
    matchPassword = false;
    registrationData = {
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      date: null,
    };
    const emailInput = document.querySelector('.form-email') as HTMLInputElement;
    const email = emailInput.value;
    const emailError = emailInput.nextElementSibling as HTMLElement;
    if (!this.validMail(email).result) {
      emailError.textContent = this.validMail(email).error;
      emailInput.classList.add('registration-wrong-iput-field');
    } else {
      registrationData.email = email;
    }
    const passwordInput = document.querySelector('.form-pass') as HTMLInputElement;
    const password = passwordInput.value;
    const passwordError = passwordInput.nextElementSibling as HTMLElement;
    if (!this.validPassword(password).result) {
      passwordError.textContent = this.validPassword(password).error;
      passwordInput.classList.add('registration-wrong-iput-field');
    } else {
      registrationData.password = password;
    }
    const passwordRepeatInput = document.querySelector('.form-r-pass') as HTMLInputElement;
    const passwordRepeat = passwordRepeatInput.value;
    const passwordRepeatError = passwordRepeatInput.nextElementSibling as HTMLElement;
    if (!this.validRepeatPassword(passwordRepeat).result) {
      passwordRepeatError.textContent = this.validRepeatPassword(passwordRepeat).error;
      passwordRepeatInput.classList.add('registration-wrong-iput-field');
    } else {
      matchPassword = true;
    }

    const firstNameInput = document.querySelector('.form-f-name') as HTMLInputElement;
    const firstName = firstNameInput.value;
    const firstNameError = firstNameInput.nextElementSibling as HTMLElement;
    if (!this.validFirstAndLastName(firstName).result) {
      firstNameError.textContent = this.validFirstAndLastName(firstName).error;
      firstNameInput.classList.add('registration-wrong-iput-field');
    } else {
      registrationData.firstName = firstName;
    }
    const lastNameInput = document.querySelector('.form-l-name') as HTMLInputElement;
    const lastName = lastNameInput.value;
    const lastNameError = lastNameInput.nextElementSibling as HTMLElement;
    if (!this.validFirstAndLastName(lastName).result) {
      lastNameError.textContent = this.validFirstAndLastName(lastName).error;
      lastNameInput.classList.add('registration-wrong-iput-field');
    } else {
      registrationData.lastName = lastName;
    }
    const dateInput = document.querySelector('.form-birth') as HTMLInputElement;
    const date = dateInput.value;
    const dateError = dateInput.nextElementSibling as HTMLElement;
    if (!this.validBirthDate(date).result) {
      dateError.textContent = this.validBirthDate(date).error;
      dateInput.classList.add('registration-wrong-iput-field');
    } else {
      registrationData.date = date;
    }
    console.log(registrationData);
    // Ниже проверка что все значения записанны и пароль повторен верно
    if (matchPassword && allValuesAreStrings(registrationData)) {
      console.log('password is match');
      console.log('Все данные введены верно', registrationData);
      return registrationData;
    }
    return null;
  }
}
