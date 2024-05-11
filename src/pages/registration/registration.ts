import './registration.scss';
import { ElementCreator } from '../../app/base';

export class RegistrationViev {
  constructor() {
    this.createRegContainer();
  }

  createRegContainer() {
    const mainContainer = new ElementCreator({ tag: 'div', classNames: ['registration-container'] });
    const mainElement = document.querySelector('.main');
    if (mainElement) {
      mainElement.appendChild(mainContainer.getNode());
      this.createTitle(mainContainer);
      this.createForm(mainContainer);
      this.createLoginRef(mainContainer);
      this.createAcceptButton(mainContainer);
    }
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
      'Street',
      'City',
      'Postal code',
      'Country',
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
        selectOptions.forEach((option) => {
          const optionElement = new ElementCreator({ tag: 'option', textContent: option });
          input.appendChild(optionElement.getNode());
        });
      } else {
        input = new ElementCreator({ tag: 'input', classNames: [inputClass[i]] }).getNode() as HTMLInputElement;
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
    });
    loginRefCont.addInnerElement(loginRefLogin);
  }

  createAcceptButton(container: ElementCreator) {
    const acceptButton = new ElementCreator({
      tag: 'button',
      textContent: '',
      classNames: ['registration__accept-button'],
    });
    // acceptButton.getNode().setAttribute('form', 'id-form-reg');
    acceptButton.setType('submit');
    acceptButton.setCallback((event) => {
      event.preventDefault();
      // submit cod
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
