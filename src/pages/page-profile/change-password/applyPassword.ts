import { userVariable } from '../userVariable';

export function applyPasswordButtonOk(elementClass: string, pattern: RegExp, callback: () => void) {
  const newPasswordInput = document.getElementById('id-new-pass__pp') as HTMLInputElement | null;
  const newPasswordInputValue = newPasswordInput?.value;
  const errorDivNew = newPasswordInput?.nextElementSibling as HTMLElement;

  const repeatNewPasswordInput = document.getElementById('id-repeat-new-pass__pp') as HTMLInputElement | null;
  const repeatNewPasswordInputValue = repeatNewPasswordInput?.value;
  const errorDivNewRepeat = repeatNewPasswordInput?.nextElementSibling as HTMLElement;

  const oldPass = document.getElementById('id-current-pass__pp') as HTMLInputElement | null;
  const oldPassValue = oldPass?.value;

  if (newPasswordInputValue !== repeatNewPasswordInputValue || !pattern.test(newPasswordInputValue || '')) {
    errorDivNew.textContent = 'not match or does not meet the conditions';
    errorDivNewRepeat.textContent = 'not match or does not meet the conditions';
  } else {
    errorDivNew.textContent = '';
    errorDivNewRepeat.textContent = '';
  }
  // сверяю введенное в поле ввода с патерном
  if (
    pattern.test(newPasswordInputValue || '') &&
    pattern.test(repeatNewPasswordInputValue || '') &&
    pattern.test(oldPassValue || '')
  ) {
    if (newPasswordInputValue === repeatNewPasswordInputValue) {
      userVariable.currentPassword = oldPassValue;
      userVariable.newPassword = newPasswordInputValue;
      callback();
    }
  }
}
