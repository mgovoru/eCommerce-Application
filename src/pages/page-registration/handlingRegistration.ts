import { matchPassword } from './validation';

export interface RegistrationData {
  email: string | null;
  password: string | null;
  firstName: string | null;
  lastName: string | null;
  date: string | null;
  country: string | null;
  street: string | null;
  city: string | null;
  postal: string | null;
}

export const registrationData: RegistrationData = {
  email: null,
  password: null,
  firstName: null,
  lastName: null,
  date: null,
  country: null,
  street: null,
  city: null,
  postal: null,
};

interface ValidationResult {
  result: boolean;
  error: string;
}

export function handlingRegistration(
  classId: string,
  validationFunction: (value: string) => ValidationResult,
  dataField: keyof RegistrationData
) {
  const input = document.querySelector(classId) as HTMLInputElement;
  const { value } = input;
  const errorElement = input.nextElementSibling as HTMLElement;
  const validationResult = validationFunction(value);
  // отдельная проверка повтора пароля
  if (classId === '.form-r-pass') {
    if (!validationResult.result) {
      errorElement.textContent = validationResult.error;
      input.classList.add('registration-wrong-iput-field');
    } else {
      errorElement.textContent = '';
      input.classList.remove('registration-wrong-iput-field');
      matchPassword.status = true;
    }
    return;
  }
  // основная проверка
  if (!validationResult.result) {
    errorElement.textContent = validationResult.error;
    input.classList.add('registration-wrong-iput-field');
    registrationData[dataField] = null;
  } else {
    errorElement.textContent = '';
    input.classList.remove('registration-wrong-iput-field');
    registrationData[dataField] = value;
  }
  console.log(registrationData);
}
