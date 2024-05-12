import './login.scss';
import { ElementCreator } from '../../app/base';

export class LoginView {
  constructor() {
    this.createLoginCont();
  }

  createLoginCont() {
    const mainContainer = new ElementCreator({ tag: 'div', classNames: ['login-container'] });
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
      textContent: 'Login',
      classNames: ['login-title'],
    });
    container.addInnerElement(registrationText);
  }

  createForm(container: ElementCreator) {
    const form = new ElementCreator({
      tag: 'form',
      textContent: '',
      classNames: ['login__form'],
    });
    form.getNode().setAttribute('id', 'id-form-login');
    container.addInnerElement(form);
    this.createInputs(form);
  }

  createInputs(container: ElementCreator) {
    const inputsContainer = new ElementCreator({ tag: 'div', classNames: ['form__inputs-container__login'] });
    container.addInnerElement(inputsContainer);
    const labels = ['email address', 'password'];
    const inputClass = ['form-email__login', 'form-pass__login'];
    for (let i = 0; i < 2; i += 1) {
      const inputDiv = new ElementCreator({ tag: 'div', classNames: ['input-wrapper__login'] });
      const label = new ElementCreator({ tag: 'label', textContent: labels[i] });
      const errorDiv = new ElementCreator({ tag: 'div', classNames: ['input-reg-error__login'] });
      const input = new ElementCreator({ tag: 'input', classNames: [inputClass[i]] }).getNode() as HTMLInputElement;
      if (i === 1) {
        const showPasswordSpan = new ElementCreator({
          tag: 'span',
          classNames: ['hidden-reg-pas__login'],
          textContent: '👁️',
        });
        showPasswordSpan.setCallback(() => {
          const currentText = showPasswordSpan.getNode().textContent;
          const newText = currentText === '👁️' ? '👁️‍🗨️' : '👁️';
          showPasswordSpan.setTextContent(newText);
          const passwordInput = inputDiv.getNode().querySelector('input');
          if (passwordInput instanceof HTMLInputElement) {
            passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
          }
        });
        inputDiv.addInnerElement(showPasswordSpan);
      }
      inputDiv.addInnerElement(label);
      inputDiv.addInnerElement(input);
      inputDiv.addInnerElement(errorDiv);
      inputsContainer.addInnerElement(inputDiv);
    }
  }

  createLoginRef(container: ElementCreator) {
    const loginRefCont = new ElementCreator({
      tag: 'div',
      textContent: '',
      classNames: ['login__login-ref__cont'],
    });
    container.addInnerElement(loginRefCont);
    const loginRefQuestion = new ElementCreator({
      tag: 'div',
      textContent: 'You don`t have an account yet?',
      classNames: ['login__login-ref__cont__question'],
    });
    loginRefCont.addInnerElement(loginRefQuestion);
    const loginRefLogin = new ElementCreator({
      tag: 'a',
      textContent: 'REGISTER',
      classNames: ['login__register-ref__cont__login'],
    });
    loginRefCont.addInnerElement(loginRefLogin);
  }

  createAcceptButton(container: ElementCreator) {
    const acceptButton = new ElementCreator({
      tag: 'button',
      textContent: '',
      classNames: ['login__accept-button'],
    });
    acceptButton.getNode().setAttribute('form', 'id-form-login');
    acceptButton.setType('submit');
    acceptButton.setCallback((event) => {
      event.preventDefault();
      // submit cod
      // submit cod - end
    });
    container.addInnerElement(acceptButton);
    const acceptButtonText = new ElementCreator({
      tag: 'span',
      textContent: 'LOGIN',
      classNames: ['login__accept-button__text'],
    });
    acceptButton.addInnerElement(acceptButtonText);
    const acceptButtonArrow = new ElementCreator({
      tag: 'span',
      textContent: '➔',
      classNames: ['login__accept-button__arrow'],
    });
    acceptButton.addInnerElement(acceptButtonArrow);
  }
}
