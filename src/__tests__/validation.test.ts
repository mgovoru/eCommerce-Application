import { isEmailValid, isPasswordValid } from '../pages/page-login/validation';

describe('isEmailValid', () => {
  it('should return true for a valid email', () => {
    expect(isEmailValid('test@example.com')).toBe(true);
    expect(isEmailValid('user.name+tag+sorting@example.com')).toBe(true);
    expect(isEmailValid('user_name@example.co.uk')).toBe(true);
  });

  it('should return false for an invalid email', () => {
    expect(isEmailValid('plainaddress')).toBe(false);
    expect(isEmailValid('plainaddress@')).toBe(false);
    expect(isEmailValid('@missingusername.com')).toBe(false);
    expect(isEmailValid('username@.com')).toBe(false);
    expect(isEmailValid('username@.com.')).toBe(false);
    expect(isEmailValid('username@-example.com1')).toBe(false);
    expect(isEmailValid('username@example..1com')).toBe(false);
  });
});

describe('isPasswordValid', () => {
  it('should return true for a valid password', () => {
    expect(isPasswordValid('Password1')).toBe(true);
    expect(isPasswordValid('Valid1234Password')).toBe(true);
    expect(isPasswordValid('Another1Password!')).toBe(true);
  });

  it('should return false for an invalid password', () => {
    expect(isPasswordValid('short1')).toBe(false); // короткий
    expect(isPasswordValid('nouppercase1')).toBe(false); // без больших букв
    expect(isPasswordValid('NOLOWERCASE1')).toBe(false); // без маленьких
    expect(isPasswordValid('NoNumbers')).toBe(false); // без цифр
    expect(isPasswordValid('short')).toBe(false); // короткий и без цифр
    expect(isPasswordValid('12345678')).toBe(false); // без букв
  });
});
