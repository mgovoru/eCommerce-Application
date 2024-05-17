export const id = [
  { firstName: 'form-f-name' },
  { lastName: 'form-l-name' },
  { email: 'form-email' },
  { password: 'form-pass' },
  { repeatPassword: 'form-r-pass' },
  { birthDay: 'form-birth' },
  { street: 'form-street' },
  { city: 'form-city' },
  { postalCode: 'form-postal' },
];
export const patterns = [
  { firstName: /^[a-zA-Z]+$/ },
  { lastName: /^[a-zA-Z]+$/ },
  { email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
  { password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/ },
  { repeatPassword: '' },
  { birthDay: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d\d$/ },
  { street: /^[0-9a-zA-Z-]+$/ },
  { city: /^[a-zA-Z]+$/ },
  { postalCode: /^[0-9]{6}$/ },
];
export const error = [
  { firstName: 'At least 1 symbol is required' },
  { lastName: 'At least 1 symbol is required' },
  { email: 'Correct format: name@example.com' },
  { password: 'Password must be at least 8 symbols, including numbers and letters in lowercase and uppercase.' },
  { repeatPassword: '' },
  { birthDay: 'Correct format: dd.mm.yyyy' },
  { street: 'At least 1 symbol is required. Letter or digits.' },
  { city: 'At least 1 symbol is required. Only letters.' },
  { postalCode: 'Only numbers are valid. For RU, UA, BY: 6 digits' },
];

export function onIputCheck(idThis: string, patternThis: RegExp, errorThis: string) {
  const inputById = document.getElementById(idThis) as HTMLInputElement;
  const inputValue = inputById.value;
  const errorDiv = inputById.nextElementSibling as HTMLElement;
  if (!patternThis.test(inputValue)) {
    errorDiv.textContent = errorThis;
    // inputById.classList.add('registration-wrong-iput-field');
  } else {
    errorDiv.textContent = '';
    inputById.classList.remove('registration-wrong-iput-field');
  }
}
