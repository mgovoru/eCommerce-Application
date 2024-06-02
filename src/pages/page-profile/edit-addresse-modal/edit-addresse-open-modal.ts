import { ElementCreator } from '../../../app/base';
import { onIputCheck, patterns, error } from '../../page-registration/on-input-function';
import { applyAddressButton } from './edit-applyAddress';
import { userVariable } from '../userVariable';
import { IAddressStatus } from '../interfaces';

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
// функция копирования значений
function setCurrentValue(value: string, id: string) {
  const elem = document.getElementById(id) as HTMLInputElement;
  if (elem) {
    elem.value = value;
    // if (id === 'id-coutry-modal__pp') {
    //   elem.value = value || 'RU';
    // }
  }
}

export function addressCreateModal(addressStatus: IAddressStatus, callback: () => void) {
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

  const defaultShipping = new ElementCreator({
    tag: 'div',
    textContent: 'Default shipping ',
    classNames: ['modal-adr-def-ship-text-profile'],
  });
  const defaultShippingCheckbox = new ElementCreator({
    tag: 'input',
    classNames: ['modal-adr-def-ship-checkbox-profile'],
  });
  defaultShippingCheckbox.setType('checkbox');
  defaultShippingCheckbox.getNode().setAttribute('id', 'modal-adr-def-ship-checkbox-profile');
  if (addressStatus.isDefaultShippingAddress) {
    (defaultShippingCheckbox.getNode() as HTMLInputElement).checked = true;
  }
  userVariable.isDefaultShipping = (defaultShippingCheckbox.getNode() as HTMLInputElement).checked;
  (defaultShippingCheckbox.getNode() as HTMLInputElement).addEventListener('change', (event) => {
    const checkbox = event.target as HTMLInputElement;
    userVariable.isDefaultShipping = checkbox.checked;
  });

  const defaultBilling = new ElementCreator({
    tag: 'div',
    textContent: 'Default billing ',
    classNames: ['modal-adr-def-bil-text-profile'],
  });
  const defaultBillingCheckbox = new ElementCreator({
    tag: 'input',
    classNames: ['modal-adr-def-bil-checkbox-profile'],
  });
  defaultBillingCheckbox.setType('checkbox');
  defaultBillingCheckbox.getNode().setAttribute('id', 'modal-adr-def-bil-checkbox-profile');
  if (addressStatus.isDefaultBillingAddress) {
    (defaultBillingCheckbox.getNode() as HTMLInputElement).checked = true;
  }
  userVariable.isDefaultBilling = (defaultBillingCheckbox.getNode() as HTMLInputElement).checked;
  (defaultBillingCheckbox.getNode() as HTMLInputElement).addEventListener('change', (event) => {
    const checkbox = event.target as HTMLInputElement;
    userVariable.isDefaultBilling = checkbox.checked;
  });

  const containerForButtons = new ElementCreator({
    tag: 'div',
    classNames: ['modal-cont-for-buttons-profile'],
  });

  const applyButton = new ElementCreator({
    tag: 'button',
    classNames: ['modal-apply-button-profile'],
    textContent: 'Save changes',
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

  modalContainer.addInnerElement(defaultShipping);
  defaultShipping.addInnerElement(defaultShippingCheckbox);
  modalContainer.addInnerElement(defaultBilling);
  defaultBilling.addInnerElement(defaultBillingCheckbox);
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

export function editAddressOpenModal(
  addressStatus: IAddressStatus,
  country: string,
  postalCode: string,
  city: string,
  street: string,
  callback: () => void
) {
  const modal = addressCreateModal(addressStatus, callback);
  document.body.appendChild(modal.getNode());
  document.body.classList.add('modal-open');
  // устанавливаю в инпуты текущие значения
  setCurrentValue(country, 'id-coutry-modal__pp');
  setCurrentValue(postalCode, 'id-postal-modal__pp');
  setCurrentValue(city, 'id-city-modal__pp');
  setCurrentValue(street, 'id-street-modal__pp');
}
