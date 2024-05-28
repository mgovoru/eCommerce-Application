import { successfulApply } from './successfulApply';
import { userVariable } from './userVariable';

export function applyButtonOk(elementClass: string, pattern: RegExp, callback: () => void) {
  const elementSpan = document.querySelector(`.${elementClass}`);
  let name: HTMLElement | null = null;
  if (elementSpan) {
    name = elementSpan.nextElementSibling as HTMLElement;
  }
  const thisInput = document.getElementById('modal-input-profile') as HTMLInputElement | null;
  let thisInputValue = '';
  if (thisInput) {
    thisInputValue = thisInput.value;
  }

  // сверяю введенное в поле ввода с патерном
  if (pattern.test(thisInputValue)) {
    // меняю значение на странице
    if (name) {
      name.textContent = thisInputValue;
    }
    // запросы в комерстулс относительно выбраного элемента
    if (elementClass === 'pp-f-name') {
      userVariable.newFirstNameInIput = thisInputValue;
      callback();
    }
    // просто калбаск если не pp-f-name
    if (elementClass === 'pp-l-name') {
      userVariable.newLastNameInIput = thisInputValue;
      callback();
    }

    // закрыветься модальное окно
    successfulApply();
  }
}
