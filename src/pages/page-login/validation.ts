import { ElementCreator } from '../../app/base';

const MIN_LOGIN_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 8;

const isEmailValid = (value: string) => {
  const pattern = new RegExp(`^[A-ZА-Я][a-zA-Zа-яА-Я0-9-_]{${MIN_LOGIN_LENGTH},}$`);
  return pattern.test(value);
};

const isPasswordValid = (value: string) => {
  const pattern = new RegExp(`^(?=.*[A-ZА-Я])(?=.*\\d)(?=.*[!@#$%^&*]).{${MIN_PASSWORD_LENGTH},}$`);
  return pattern.test(value);
};

export function validateEmail(email: ElementCreator, errorDiv: ElementCreator): boolean {
  const emailValue = (email.getNode() as HTMLInputElement).value;
  const isValid = isEmailValid(emailValue);
  errorDiv.setTextContent(isValid ? '' : 'Username must start with a capital letter and be at least 3 characters long');
  return isValid;
}

export function validatePassword(password: ElementCreator, errorDiv: ElementCreator): boolean {
  const passwordValue = (password.getNode() as HTMLInputElement).value;
  const isValid = isPasswordValid(passwordValue);
  errorDiv.setTextContent(
    isValid
      ? ''
      : 'Password must be at least 6 characters, include a small letter, a capital letter, a number and a special symbol'
  );
  return isValid;
}
