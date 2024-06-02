import { ElementCreator } from '../../../app/base';

export function deleteAddressCreateModal(callback: () => void) {
  const modalOverlay = new ElementCreator({
    tag: 'div',
    classNames: ['modal-overlay-profile'],
  });

  const modalContainer = new ElementCreator({
    tag: 'div',
    classNames: ['modal-container-profile'],
  });
  // закончилось зосдание основы
  const questionText = new ElementCreator({
    tag: 'div',
    textContent: 'Delete chosen addresse?',
    classNames: ['modal-question-del-addresse-profile'],
  });

  const containerForButtons = new ElementCreator({
    tag: 'div',
    classNames: ['modal-cont-for-buttons-profile'],
  });

  const applyButton = new ElementCreator({
    tag: 'button',
    classNames: ['modal-apply-button-profile'],
    textContent: 'YES',
  });
  applyButton.getNode().addEventListener('click', () => {
    // клик на кнопку Apply
    callback();
  });

  const closeButton = new ElementCreator({
    tag: 'button',
    classNames: ['modal-close-button-profile'],
    textContent: 'Cancel',
  });

  closeButton.setCallback(() => {
    document.body.classList.remove('modal-open');
    modalOverlay.getNode().remove();
  });

  modalContainer.addInnerElement(questionText);
  modalContainer.addInnerElement(containerForButtons);
  containerForButtons.addInnerElement(applyButton);
  containerForButtons.addInnerElement(closeButton);
  modalOverlay.addInnerElement(modalContainer);
  // закрытие модального окна при клике в свободное место
  modalOverlay.getNode().addEventListener('mousedown', (event: MouseEvent) => {
    if (!modalContainer.getNode().contains(event.target as Node)) {
      document.body.classList.remove('modal-open');
      modalOverlay.getNode().remove();
    }
  });

  return modalOverlay;
}

export function delAddressOpenModal(callback: () => void) {
  const modal = deleteAddressCreateModal(callback);
  document.body.appendChild(modal.getNode());
  document.body.classList.add('modal-open');
}
