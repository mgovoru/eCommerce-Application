import { ElementCreator } from '../../../app/base';
import { onIputCheck } from '../../page-registration/on-input-function';
import { applyPasswordButtonOk } from './applyPassword';

function createInput(pattern: RegExp, error: string, container: ElementCreator, labelName: string, idInput: string) {
  const inputLabel = new ElementCreator({
    tag: 'div',
    classNames: ['modal-content-profile'],
    textContent: `${labelName}`,
  });
  const modalInputContainer = new ElementCreator({
    tag: 'div',
    classNames: ['modal-input-container-profile'],
  });
  const modalInput = new ElementCreator({
    tag: 'input',
    classNames: ['modal-input-profile', `${idInput}`],
  });
  modalInput.getNode().setAttribute('id', `${idInput}`);
  modalInput.getNode().addEventListener('input', () => {
    onIputCheck(`${idInput}`, pattern, error);
  });
  const modalInputError = new ElementCreator({
    tag: 'div',
    classNames: ['modal-input-error-profile'],
  });
  container.addInnerElement(inputLabel);
  container.addInnerElement(modalInputContainer);
  modalInputContainer.addInnerElement(modalInput);
  modalInputContainer.addInnerElement(modalInputError);
}

export function passCreateModal(elementClass: string, pattern: RegExp, error: string, callback: () => void) {
  const modalOverlay = new ElementCreator({
    tag: 'div',
    classNames: ['modal-overlay-profile'],
  });

  const modalContainer = new ElementCreator({
    tag: 'div',
    classNames: ['modal-container-profile'],
  });

  createInput(pattern, error, modalContainer, 'current password', 'id-current-pass__pp');
  createInput(pattern, error, modalContainer, 'new password', 'id-new-pass__pp');
  createInput(pattern, error, modalContainer, 'repeat new password', 'id-repeat-new-pass__pp');

  const containerForButtons = new ElementCreator({
    tag: 'div',
    classNames: ['modal-cont-for-buttons-profile'],
  });

  const applyButton = new ElementCreator({
    tag: 'button',
    classNames: ['modal-apply-button-profile'],
    textContent: 'Apply',
  });
  applyButton.getNode().addEventListener('click', () => {
    // клик на кнопку Apply
    applyPasswordButtonOk(elementClass, pattern, callback);
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

export function passOpenModal(value: string, pattern: RegExp, error: string, callback: () => void) {
  const modal = passCreateModal(value, pattern, error, callback);
  document.body.appendChild(modal.getNode());
  document.body.classList.add('modal-open');
}
