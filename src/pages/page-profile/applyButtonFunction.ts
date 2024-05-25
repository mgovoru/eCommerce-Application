import { successfulApply } from './successfulApply';

export function applyButtonOk(elementClass: string, pattern: RegExp) {
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
      console.log('THIS first name');
    }

    // закрыветься модальное окно
    successfulApply();
  }
}
