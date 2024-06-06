import { RegistrationValidation } from '../pages/page-registration/validation';

describe('RegistrationValidation', () => {
  let validation: RegistrationValidation;

  beforeEach(() => {
    validation = new RegistrationValidation();
  });

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
});
