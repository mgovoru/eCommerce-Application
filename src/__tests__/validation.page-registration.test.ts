import { RegistrationValidation } from '../pages/page-registration/validation';

describe('RegistrationValidation', () => {
  let validation: RegistrationValidation;

  beforeEach(() => {
    validation = new RegistrationValidation();
  });

  // тест ввода почты
  describe('validMail', () => {
    test('should return true for a valid email', () => {
      const response = validation.validMail('test@example.com');
      expect(response.result).toBe(true);
      expect(response.error).toBe('Correct format: name@example.com');
    });

    test('should return false for an email without "@"', () => {
      const response = validation.validMail('testexample.com');
      expect(response.result).toBe(false);
      expect(response.error).toBe('Correct format: name@example.com');
    });

    test('should return false for an email without domain', () => {
      const response = validation.validMail('test@.com');
      expect(response.result).toBe(false);
      expect(response.error).toBe('Correct format: name@example.com');
    });

    test('should return false for an email without top-level domain', () => {
      const response = validation.validMail('test@example');
      expect(response.result).toBe(false);
      expect(response.error).toBe('Correct format: name@example.com');
    });

    test('should return false for an email with invalid characters', () => {
      const response = validation.validMail('test@exa*mple.com');
      expect(response.result).toBe(false);
      expect(response.error).toBe('Correct format: name@example.com');
    });
  });

  // тест ввода пароля
  describe('validPassword', () => {
    test('should return true for a valid password', () => {
      const response = validation.validPassword('Valid1Password');
      expect(response.result).toBe(true);
    });

    test('should return false for a password less than 8 characters', () => {
      const response = validation.validPassword('Va1P');
      expect(response.result).toBe(false);
    });

    test('should return false for a password without a lowercase letter', () => {
      const response = validation.validPassword('VALID1PASSWORD');
      expect(response.result).toBe(false);
    });

    test('should return false for a password without an uppercase letter', () => {
      const response = validation.validPassword('valid1password');
      expect(response.result).toBe(false);
    });

    test('should return false for a password without a number', () => {
      const response = validation.validPassword('ValidPassword');
      expect(response.result).toBe(false);
    });

    test('should return true for a password with special characters', () => {
      const response = validation.validPassword('Valid1Password!');
      expect(response.result).toBe(true);
    });

    test('should return false for a password with invalid characters', () => {
      const response = validation.validPassword('Valid1Passwor👁️');
      expect(response.result).toBe(false);
    });
  });
});
