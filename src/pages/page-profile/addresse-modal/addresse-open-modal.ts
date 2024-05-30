import { ElementCreator } from '../../../app/base';
import { onIputCheck, patterns, error } from '../../page-registration/on-input-function';
import { applyAddressButton } from './applyAddress';

function createInput(
  pattern: RegExp,
  errorThis: string,
  container: ElementCreator,
  labelName: string,
  idInput: string
) {
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
    onIputCheck(`${idInput}`, pattern, errorThis);
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

export function addressCreateModal(callback: () => void) {
  const modalOverlay = new ElementCreator({
    tag: 'div',
    classNames: ['modal-overlay-profile'],
  });

  const modalContainer = new ElementCreator({
    tag: 'div',
    classNames: ['modal-container-profile'],
  });
  // Создание полей ввода
  const patternPostal = Object.values(patterns[8])[0];
  const errorPostal = Object.values(error[8])[0];
  const patternCity = Object.values(patterns[7])[0];
  const errorCity = Object.values(error[7])[0];
  const patternStreet = Object.values(patterns[6])[0];
  const errorStreet = Object.values(error[6])[0];
  const selectOptions = ['RU', 'UA', 'BY'];
  const countrtInputLabel = new ElementCreator({
    tag: 'div',
    classNames: ['modal-content-profile'],
    textContent: 'Country',
  });
  const countryModalInputContainer = new ElementCreator({
    tag: 'div',
    classNames: ['modal-input-container-profile'],
  });
  const countryModalSelect = new ElementCreator({
    tag: 'select',
    classNames: ['modal-input-profile', `id-coutry-modal__pp`],
  });
  countryModalSelect.getNode().setAttribute('id', `id-coutry-modal__pp`);
  selectOptions.forEach((option) => {
    const optionElement = new ElementCreator({ tag: 'option', textContent: option });
    countryModalSelect.addInnerElement(optionElement.getNode());
  });
  const countryModalInputError = new ElementCreator({
    tag: 'div',
    classNames: ['modal-input-error-profile'],
  });
  modalContainer.addInnerElement(countrtInputLabel);
  modalContainer.addInnerElement(countryModalInputContainer);
  countryModalInputContainer.addInnerElement(countryModalSelect);
  countryModalInputContainer.addInnerElement(countryModalInputError);

  createInput(patternPostal, errorPostal, modalContainer, 'Postal code', 'id-postal-modal__pp');
  createInput(patternCity, errorCity, modalContainer, 'City', 'id-city-modal__pp');
  createInput(patternStreet, errorStreet, modalContainer, 'Street', 'id-street-modal__pp');

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
    applyAddressButton(callback);
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

export function addressOpenModal(callback: () => void) {
  const modal = addressCreateModal(callback);
  document.body.appendChild(modal.getNode());
  document.body.classList.add('modal-open');
}
