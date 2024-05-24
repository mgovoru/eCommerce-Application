import { ElementCreator } from '../../app/base';

export function createModal(value: string) {
  const modalOverlay = new ElementCreator({
    tag: 'div',
    classNames: ['modal-overlay-profile'],
  });

  const modalContainer = new ElementCreator({
    tag: 'div',
    classNames: ['modal-container-profile'],
  });

  const modalContent = new ElementCreator({
    tag: 'div',
    classNames: ['modal-content-profile'],
    textContent: `NEW ${value}`,
  });

  const modalInput = new ElementCreator({
    tag: 'input',
    classNames: ['modal-input-profile'],
  });

  const containerForButtons = new ElementCreator({
    tag: 'div',
    classNames: ['modal-cont-for-buttons-profile'],
  });

  const applyButton = new ElementCreator({
    tag: 'button',
    classNames: ['modal-apply-button-profile'],
    textContent: 'Apply',
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

  modalContainer.addInnerElement(modalContent);
  modalContainer.addInnerElement(modalInput);
  modalContainer.addInnerElement(containerForButtons);
  containerForButtons.addInnerElement(applyButton);
  containerForButtons.addInnerElement(closeButton);
  modalOverlay.addInnerElement(modalContainer);

  return modalOverlay;
}

export function openModal(value: string) {
  const modal = createModal(value);
  document.body.appendChild(modal.getNode());
  document.body.classList.add('modal-open');
}
