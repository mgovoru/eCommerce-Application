import { ElementCreator } from '../../app/base';
import { View } from '../../app/view';
import { Pages } from '../../router/pages';
import Router from '../../router/router';
import State from '../../state/state';
import './page-registration.scss';
import { DataReturn, RegistrationValidation } from './validation';
import { copyBillingToShipping, stopCopy } from './copy-billing-to-shipping';
import { id, patterns, error, onIputCheck, idShipping, patternsShipping, errorShipping } from './on-input-function';
import { Server } from '../../server/server';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-registration'],
};

export default class RegistrationView extends View {
  state: State;

  router: Router;

  server: Server;

  constructor(router: Router, state: State, server: Server) {
    super(mainParams);
    this.state = state;
    this.router = router;
    this.server = server;
    this.createRegContainer();
  }

  createRegContainer() {
    const mainContainer = new ElementCreator({ tag: 'div', classNames: ['page-registration__container'] });
    this.viewElementCreator.append(mainContainer.getNode());
    this.createTitle(mainContainer);
    this.createForm(mainContainer);
    this.createLoginRef(mainContainer);
    this.createAcceptButton(mainContainer);
  }

  createTitle(container: ElementCreator) {
    const registrationText = new ElementCreator({
      tag: 'div',
      textContent: 'Registration',
      classNames: ['registration-title'],
    });
    container.addInnerElement(registrationText);
  }

  createForm(container: ElementCreator) {
    const form = new ElementCreator({
      tag: 'form',
      textContent: '',
      classNames: ['registration__form'],
    });
    form.getNode().setAttribute('id', 'id-form-reg');
    container.addInnerElement(form);
    this.createInputs(form);
    this.createFlagsForUseBillingAdress(form);
    this.createSecondAdressInputs(form);
  }

  createInputs(container: ElementCreator) {
    const inputsContainer = new ElementCreator({ tag: 'div', classNames: ['form__inputs-container'] });
    container.addInnerElement(inputsContainer);
    const labels = [
      'First Name',
      'Lastname',
      'email address',
      'password',
      'repeat password',
      'Date of birth',
      'Street*',
      'City*',
      'Postal code*',
      'Country*',
    ];
    const inputClass = [
      'form-f-name',
      'form-l-name',
      'form-email',
      'form-pass',
      'form-r-pass',
      'form-birth',
      'form-street',
      'form-city',
      'form-postal',
      'form-country',
    ];
    // Создаем 10 блоков div с label для каждого инпута
    for (let i = 0; i < 10; i += 1) {
      const inputDiv = new ElementCreator({ tag: 'div', classNames: ['input-wrapper'] });
      const label = new ElementCreator({ tag: 'label', textContent: labels[i] });
      const errorDiv = new ElementCreator({ tag: 'div', classNames: ['input-reg-error'] });
      let input: HTMLInputElement | HTMLSelectElement;
      if (i === 9) {
        // Создаем выпадающий список для последнего поля
        const selectOptions = ['Russia', 'Ukraine', 'Belarus'];
        input = new ElementCreator({ tag: 'select', classNames: [inputClass[i]] }).getNode() as HTMLSelectElement;
        input.setAttribute('id', inputClass[i]);
        label.getNode().setAttribute('for', inputClass[i]);
        selectOptions.forEach((option) => {
          const optionElement = new ElementCreator({ tag: 'option', textContent: option });
          input.appendChild(optionElement.getNode());
        });
      } else {
        input = new ElementCreator({ tag: 'input', classNames: [inputClass[i]] }).getNode() as HTMLInputElement;
        input.setAttribute('id', inputClass[i]);
        input.addEventListener('input', () => {
          const idInMassiv = Object.values(id[i])[0];
          const patternInMassiv = Object.values(patterns[i])[0];
          const errorInMassiv = Object.values(error[i])[0];
          onIputCheck(idInMassiv, patternInMassiv, errorInMassiv);
        });
        label.getNode().setAttribute('for', inputClass[i]);
        if (i === 3 || i === 4) {
          // Add span for password and repeat password fields
          const showPasswordSpan = new ElementCreator({
            tag: 'span',
            classNames: ['hidden-reg-pas'],
            textContent: '👁️',
          });
          showPasswordSpan.setCallback(() => {
            const currentText = showPasswordSpan.getNode().textContent;
            const newText = currentText === '👁️' ? '👁️‍🗨️' : '👁️'; // Изменение текста на другой символ при каждом клике
            showPasswordSpan.setTextContent(newText);
            const passwordInput = inputDiv.getNode().querySelector('input');
            if (passwordInput instanceof HTMLInputElement) {
              passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
            }
          });
          inputDiv.addInnerElement(showPasswordSpan);
        }
      }
      // Добавляем label и input в блок div
      inputDiv.addInnerElement(label);
      inputDiv.addInnerElement(input);
      inputDiv.addInnerElement(errorDiv);
      // Добавляем блок div с label и input в контейнер для инпутов
      inputsContainer.addInnerElement(inputDiv);
    }
  }

  createFlagsForUseBillingAdress(container: ElementCreator) {
    const thisContainer = new ElementCreator({ tag: 'div', classNames: ['inputs__use-adress-b'] });
    container.addInnerElement(thisContainer);

    const howUseBilling = new ElementCreator({
      tag: 'div',
      textContent: 'Fields with "*" are Billing addresse. Use them for: ',
      classNames: ['how-use-billing-adress'],
    });
    thisContainer.addInnerElement(howUseBilling);

    const billing = new ElementCreator({ tag: 'span', textContent: '\n- Set as default Billing ' });
    howUseBilling.addInnerElement(billing);

    const checkBilling = new ElementCreator({ tag: 'input' });
    checkBilling.setType('checkbox');
    checkBilling.getNode().setAttribute('id', 'billing-flag');
    billing.addInnerElement(checkBilling);

    const asShipping = new ElementCreator({ tag: 'span', textContent: '\n- also use as Shipping address ' });
    howUseBilling.addInnerElement(asShipping);

    const checkAsShipping = new ElementCreator({ tag: 'input' });
    checkAsShipping.setType('checkbox');
    checkAsShipping.getNode().setAttribute('id', 'as-shipping-flag');
    asShipping.addInnerElement(checkAsShipping);

    checkAsShipping.getNode().addEventListener('change', () => {
      const checkbox = checkAsShipping.getNode() as HTMLInputElement;
      if (checkbox.checked) {
        copyBillingToShipping();
        // console.log('flag is true');
      } else {
        stopCopy();
      }
    });
  }

  createSecondAdressInputs(container: ElementCreator) {
    const inputsContainer = new ElementCreator({ tag: 'div', classNames: ['inputs-container__second'] });
    container.addInnerElement(inputsContainer);
    const hr = new ElementCreator({ tag: 'hr', classNames: ['inputs-container__second__hr'] });
    inputsContainer.addInnerElement(hr);
    const titleSecondInputs = new ElementCreator({
      tag: 'div',
      textContent: 'Shipping Address',
      classNames: ['inputs-container__second__title'],
    });
    inputsContainer.addInnerElement(titleSecondInputs);
    const inputsContainerForInputs = new ElementCreator({
      tag: 'div',
      classNames: ['inputs-container__second__for-inputs'],
    });
    inputsContainer.addInnerElement(inputsContainerForInputs);
    const labels = ['Country', 'City', 'Street', 'Postal code'];
    const inputsId = ['ship-country', 'ship-city', 'ship-street', 'ship-postal'];
    for (let i = 0; i < 4; i += 1) {
      const inputDiv = new ElementCreator({ tag: 'div', classNames: ['input-wrapper__ship'] });
      const label = new ElementCreator({ tag: 'label', textContent: labels[i] });
      label.getNode().setAttribute('for', inputsId[i]);
      const errorDiv = new ElementCreator({ tag: 'div', classNames: ['input-reg-error'] });
      let input: HTMLInputElement | HTMLSelectElement;
      if (i === 0) {
        const selectOptions = ['Russia', 'Ukraine', 'Belarus'];
        input = new ElementCreator({ tag: 'select' }).getNode() as HTMLSelectElement;
        input.setAttribute('id', inputsId[i]);
        selectOptions.forEach((option) => {
          const optionElement = new ElementCreator({ tag: 'option', textContent: option });
          input.appendChild(optionElement.getNode());
        });
      } else {
        input = new ElementCreator({ tag: 'input' }).getNode() as HTMLInputElement;
        input.setAttribute('id', inputsId[i]);
        input.addEventListener('input', () => {
          const idInMassiv = Object.values(idShipping[i - 1])[0];
          const patternInMassiv = Object.values(patternsShipping[i - 1])[0];
          const errorInMassiv = Object.values(errorShipping[i - 1])[0];
          onIputCheck(idInMassiv, patternInMassiv, errorInMassiv);
        });
      }
      inputDiv.addInnerElement(label);
      inputDiv.addInnerElement(input);
      inputDiv.addInnerElement(errorDiv);
      inputsContainerForInputs.addInnerElement(inputDiv);
    }
    this.createFlagsForDefaultShipping(container);
  }

  createFlagsForDefaultShipping(container: ElementCreator) {
    const thisContainer = new ElementCreator({ tag: 'div', classNames: ['inputs__use-adress-s'] });
    container.addInnerElement(thisContainer);

    const defaultShipping = new ElementCreator({ tag: 'div', textContent: '- Set as default Sipping ' });
    thisContainer.addInnerElement(defaultShipping);

    const checkShipping = new ElementCreator({ tag: 'input' });
    checkShipping.setType('checkbox');
    checkShipping.getNode().setAttribute('id', 'shipping-flag');
    defaultShipping.addInnerElement(checkShipping);
  }

  createLoginRef(container: ElementCreator) {
    const loginRefCont = new ElementCreator({
      tag: 'div',
      textContent: '',
      classNames: ['registration-login-ref__cont'],
    });
    container.addInnerElement(loginRefCont);
    const loginRefQuestion = new ElementCreator({
      tag: 'div',
      textContent: 'Alredy have an account?',
      classNames: ['login-ref__cont__question'],
    });
    loginRefCont.addInnerElement(loginRefQuestion);
    const loginRefLogin = new ElementCreator({
      tag: 'a',
      textContent: 'LOGIN',
      classNames: ['login-ref__cont__login'],
      callback: () => this.router.navigate(Pages.LOGIN),
    });
    loginRefCont.addInnerElement(loginRefLogin);
  }

  createAcceptButton(container: ElementCreator) {
    const acceptButton = new ElementCreator({
      tag: 'button',
      textContent: '',
      classNames: ['registration__accept-button'],
    });
    acceptButton.getNode().setAttribute('form', 'id-form-reg');
    acceptButton.setType('submit');
    acceptButton.setCallback((event) => {
      event.preventDefault();
      // submit cod
      const data = new RegistrationValidation().registrationValidAllInputs() as DataReturn;
      const checkаflagAsShipping = (document.querySelector('#as-shipping-flag') as HTMLInputElement).checked;
      const checkаflagAsBilling = (document.querySelector('#billing-flag') as HTMLInputElement).checked;
      const flagDefaultAsShipping = checkаflagAsShipping ? 1 : 0;
      const flagDefaultAsBilling = checkаflagAsBilling ? 1 : 0;
      // console.log(this.server.workApi.changeData(data, flagDefaultAsShipping, flagDefaultAsBilling));
      this.server.workApi.registerCustomer(
        this.server.workApi.changeData(data, flagDefaultAsShipping, flagDefaultAsBilling)
      );
      // submit cod - end
    });
    container.addInnerElement(acceptButton);
    const acceptButtonText = new ElementCreator({
      tag: 'span',
      textContent: 'REGISTER',
      classNames: ['registration__accept-button__text'],
    });
    acceptButton.addInnerElement(acceptButtonText);
    const acceptButtonArrow = new ElementCreator({
      tag: 'span',
      textContent: '➔',
      classNames: ['registration__accept-button__arrow'],
    });
    acceptButton.addInnerElement(acceptButtonArrow);
  }
}
