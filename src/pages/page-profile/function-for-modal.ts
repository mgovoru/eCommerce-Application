import { ElementCreator } from '../../app/base';
import { onIputCheck } from '../page-registration/on-input-function';

export function createModal(value: string, patternInMassiv: RegExp, errorInMassiv: string) {
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

  const modalInputContainer = new ElementCreator({
    tag: 'div',
    classNames: ['modal-input-container-profile'],
  });

  const modalInputError = new ElementCreator({
    tag: 'div',
    classNames: ['modal-input-error-profile'],
  });

  const modalInput = new ElementCreator({
    tag: 'input',
    classNames: ['modal-input-profile'],
  });
  modalInput.getNode().setAttribute('id', 'modal-input-profile');
  modalInput.getNode().addEventListener('input', () => {
    onIputCheck('modal-input-profile', patternInMassiv, errorInMassiv);
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
  modalContainer.addInnerElement(modalInputContainer);
  modalInputContainer.addInnerElement(modalInput);
  modalInputContainer.addInnerElement(modalInputError);
  modalContainer.addInnerElement(containerForButtons);
  containerForButtons.addInnerElement(applyButton);
  containerForButtons.addInnerElement(closeButton);
  modalOverlay.addInnerElement(modalContainer);

  return modalOverlay;
}

export function openModal(value: string, patternInMassiv: RegExp, errorInMassiv: string) {
  const modal = createModal(value, patternInMassiv, errorInMassiv);
  document.body.appendChild(modal.getNode());
  document.body.classList.add('modal-open');
}
