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

  // проверка для ввода имени и фамилии
  describe('validFirstAndLastName', () => {
    test('should return true for a valid first/last name with only letters', () => {
      const response = validation.validFirstAndLastName('John');
      expect(response.result).toBe(true);
    });

    test('should return false for a first/last name with digits', () => {
      const response = validation.validFirstAndLastName('John123');
      expect(response.result).toBe(false);
    });

    test('should return false for a first/last name with special characters', () => {
      const response = validation.validFirstAndLastName('John#');
      expect(response.result).toBe(false);
    });

    test('should return false for an empty first/last name', () => {
      const response = validation.validFirstAndLastName('');
      expect(response.result).toBe(false);
    });

    test('should return true for a valid first/last name with only one letter', () => {
      const response = validation.validFirstAndLastName('q');
      expect(response.result).toBe(true);
    });
  });

  // проверка ввода даты рождения
  describe('validBirthDate', () => {
    test('should return true for a valid birth date in the format dd.mm.yyyy and user older than 13 years old', () => {
      const response = validation.validBirthDate('01.01.2000');
      expect(response.result).toBe(true);
    });

    test('should return false for an invalid birth date format', () => {
      const response = validation.validBirthDate('01-01-2000');
      expect(response.result).toBe(false);
      expect(response.error).toBe('Correct format: dd.mm.yyyy');
    });

    test('should return false for a birth date that makes the user under 13 years old', () => {
      const response = validation.validBirthDate('01.01.2015');
      expect(response.result).toBe(false);
      expect(response.error).toBe('Not eligible for users under 13 years old');
    });
  });

  // проверка ввода улицы
  describe('validStreet', () => {
    test('should return true for a valid street with letters and  digits', () => {
      const response = validation.validStreet('123MainSt');
      expect(response.result).toBe(true);
    });

    test('should return false for a street with special characters', () => {
      const response = validation.validStreet('123MainSt#');
      expect(response.result).toBe(false);
    });

    test('should return false for an empty street', () => {
      const response = validation.validStreet('');
      expect(response.result).toBe(false);
    });

    test('should return false for a street with spaces', () => {
      const response = validation.validStreet('123 Main St');
      expect(response.result).toBe(false);
    });
  });
  // проверка ввода города
  describe('validCity', () => {
    test('should return true for a valid city with only letters', () => {
      const response = validation.validCity('NewYork');
      expect(response.result).toBe(true);
    });

    test('should return false for a city with digits', () => {
      const response = validation.validCity('SanFrancisco1');
      expect(response.result).toBe(false);
    });

    test('should return false for a city with special characters', () => {
      const response = validation.validCity('LosAngeles!');
      expect(response.result).toBe(false);
    });

    test('should return false for an empty city', () => {
      const response = validation.validCity('');
      expect(response.result).toBe(false);
    });

    test('should return false for a city with spaces', () => {
      const response = validation.validCity('Los Angeles');
      expect(response.result).toBe(false);
    });
  });
});
