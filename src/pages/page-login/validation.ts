import { ElementCreator } from '../../app/base';

const isEmailValid = (value: string) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(value);
};

const isPasswordValid = (value: string) => {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
  return pattern.test(value);
};

export function validateEmail(email: ElementCreator, errorDiv: ElementCreator): boolean {
  const emailValue = (email.getNode() as HTMLInputElement).value;
  const isValid = isEmailValid(emailValue);
  errorDiv.setTextContent(isValid ? '' : 'Correct format: name@example.com');
  return isValid;
}

export function validatePassword(password: ElementCreator, errorDiv: ElementCreator): boolean {
  const passwordValue = (password.getNode() as HTMLInputElement).value;
  const isValid = isPasswordValid(passwordValue);
  errorDiv.setTextContent(
    isValid ? '' : 'Password must be at least 8 characters, include a small letter, a capital letter, a number'
  );
  return isValid;
}
