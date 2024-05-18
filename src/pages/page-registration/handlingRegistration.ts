import { matchPassword } from './validation';

export interface RegistrationData {
  email: string | null;
  password: string | null;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: Date | null;
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
  dateOfBirth: null,
  country: null,
  street: null,
  city: null,
  postal: null,
};

interface ValidationResult {
  result: boolean;
  error: string;
}

function convertToDate(dateString: string): Date {
  const [day, month, year] = dateString.split('.').map(Number);
  return new Date(year, month - 1, day);
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
    // обработка даты
    if (dataField === 'dateOfBirth') {
      registrationData[dataField] = convertToDate(value);
      return;
    }
    registrationData[dataField] = value;
  }
}
