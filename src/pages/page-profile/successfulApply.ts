import { ElementCreator } from '../../app/base';

export function successfulApply() {
  const mainModalWindow = document.querySelector('.modal-overlay-profile');
  const containerForChange = document.querySelector('.modal-container-profile');

  const messageSuccessful = new ElementCreator({
    tag: 'div',
    classNames: ['modal-successful-profile'],
    textContent: `Successful`,
  });

  const okButton = new ElementCreator({
    tag: 'button',
    classNames: ['modal-ok-button-profile'],
    textContent: 'OK',
  });

  okButton.setCallback(() => {
    document.body.classList.remove('modal-open');
    mainModalWindow?.remove();
  });

  if (containerForChange) {
    containerForChange.innerHTML = ''; // Удалить все содержимое элемента
    containerForChange.appendChild(messageSuccessful.getNode());
    containerForChange.appendChild(okButton.getNode());
  }
}

export function errorApply(errorText: string) {
  const mainModalWindow = document.querySelector('.modal-overlay-profile');
  const containerForChange = document.querySelector('.modal-container-profile');

  const errApply = new ElementCreator({
    tag: 'div',
    classNames: ['modal-errorApply-profile'],
    textContent: errorText || 'Error',
  });

  const okButton = new ElementCreator({
    tag: 'button',
    classNames: ['modal-ok-button-profile'],
    textContent: 'OK',
  });

  okButton.setCallback(() => {
    document.body.classList.remove('modal-open');
    mainModalWindow?.remove();
  });

  if (containerForChange) {
    containerForChange.innerHTML = ''; // Удалить все содержимое элемента
    containerForChange.appendChild(errApply.getNode());
    containerForChange.appendChild(okButton.getNode());
  }
}
