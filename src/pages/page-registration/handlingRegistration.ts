import { matchPassword } from './validation';

export interface RegistrationData {
  email: string | null;
  password: string | null;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
}
export interface AddressOfRegistration {
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
};
export const billingRegistrationData: AddressOfRegistration = {
  country: null,
  street: null,
  city: null,
  postal: null,
};
export const shippingRegistrationData: AddressOfRegistration = {
  country: null,
  street: null,
  city: null,
  postal: null,
};

interface ValidationResult {
  result: boolean;
  error: string;
}

export function convertDateAsComTool(dateString: string): string {
  const [day, month, year] = dateString.split('.').map(Number);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function handlingRegistration(
  classId: string,
  validationFunction: (value: string) => ValidationResult,
  dataField: keyof RegistrationData,
  targetObject: RegistrationData
) {
  const mutableTargetObject = targetObject; // для избежания ошибки
  const input = document.getElementById(classId) as HTMLInputElement;
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
    mutableTargetObject[dataField] = null;
  } else {
    errorElement.textContent = '';
    input.classList.remove('registration-wrong-iput-field');
    // обработка даты
    if (dataField === 'dateOfBirth') {
      mutableTargetObject[dataField] = convertDateAsComTool(value);
      return;
    }
    mutableTargetObject[dataField] = value;
  }
}

export function addresshandlingRegistration(
  classId: string,
  validationFunction: (value: string) => ValidationResult,
  dataField: keyof AddressOfRegistration,
  targetObject: AddressOfRegistration
) {
  const mutableTargetObject = targetObject; // для избежания ошибки
  const input = document.getElementById(classId) as HTMLInputElement;
  const { value } = input;
  const errorElement = input.nextElementSibling as HTMLElement;
  const validationResult = validationFunction(value);
  if (dataField === 'country') {
    mutableTargetObject[dataField] = value;
    return;
  }
  // основная проверка
  if (!validationResult.result) {
    errorElement.textContent = validationResult.error;
    input.classList.add('registration-wrong-iput-field');
    mutableTargetObject[dataField] = null;
  } else {
    errorElement.textContent = '';
    input.classList.remove('registration-wrong-iput-field');
    mutableTargetObject[dataField] = value;
  }
}
