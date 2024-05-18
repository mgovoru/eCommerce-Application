import { ElementCreator } from '../../app/base';
import { View } from '../../app/view';
import { Pages } from '../../router/pages';
import Router from '../../router/router';
import State from '../../state/state';
import './page-login.scss';
import { validateEmail, validatePassword } from './validation';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-login'],
};

export default class LoginView extends View {
  state: State;

  router: Router;

  private email!: ElementCreator;

  private password!: ElementCreator;

  private emailError!: ElementCreator;

  private passwordError!: ElementCreator;

  constructor(router: Router, state: State) {
    super(mainParams);
    this.state = state;
    this.router = router;
    this.createLoginCont();
  }

  createLoginCont() {
    const mainContainer = new ElementCreator({ tag: 'div', classNames: ['page-login__container'] });
    this.viewElementCreator.append(mainContainer.getNode());
    this.createTitle(mainContainer);
    this.createForm(mainContainer);
    this.createLoginRef(mainContainer);
    this.createAcceptButton(mainContainer);
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

    this.emailError = new ElementCreator({ tag: 'div', classNames: ['input-reg-error__login'] });
    this.passwordError = new ElementCreator({ tag: 'div', classNames: ['input-reg-error__login'] });

    this.email = new ElementCreator({
      tag: 'input',
      classNames: ['form-email__login'],
      textContent: '',
    });
    this.email.getNode().setAttribute('type', 'text');
    this.email.getNode().setAttribute('name', 'Email');
    this.email.getNode().setAttribute('id', 'Email');
    this.email.getNode().setAttribute('placeholder', 'Enter email address');
    this.email.getNode().addEventListener('input', () => {
      if (validateEmail(this.email, this.emailError)) {
        this.email.removeClass('invalid');
      } else {
        this.email.addClass('invalid');
      }
    });

    this.password = new ElementCreator({
      tag: 'input',
      classNames: ['form-pass__login'],
      textContent: '',
    });
    this.password.getNode().setAttribute('type', 'password');
    this.password.getNode().setAttribute('name', 'Password');
    this.password.getNode().setAttribute('id', 'Password');
    this.password.getNode().setAttribute('placeholder', 'Enter password');
    this.password.getNode().addEventListener('input', () => {
      if (validatePassword(this.password, this.passwordError)) {
        this.password.removeClass('invalid');
      } else {
        this.password.addClass('invalid');
      }
    });

    const emailInputDiv = new ElementCreator({ tag: 'div', classNames: ['input-wrapper__login'] });
    const labelEmail = new ElementCreator({ tag: 'label', textContent: 'Email address' });
    labelEmail.getNode().setAttribute('for', 'Email');
    emailInputDiv.addInnerElement(labelEmail);
    emailInputDiv.addInnerElement(this.email);
    emailInputDiv.addInnerElement(this.emailError);
    inputsContainer.addInnerElement(emailInputDiv);

    const passwordInputDiv = new ElementCreator({ tag: 'div', classNames: ['input-wrapper__login'] });
    const labelPass = new ElementCreator({ tag: 'label', textContent: 'Password' });
    labelPass.getNode().setAttribute('for', 'Password');
    passwordInputDiv.addInnerElement(labelPass);
    passwordInputDiv.addInnerElement(this.password);
    passwordInputDiv.addInnerElement(this.passwordError);
    inputsContainer.addInnerElement(passwordInputDiv);

    const showPasswordSpan = new ElementCreator({
      tag: 'span',
      classNames: ['hidden-reg-pas__login'],
      textContent: '👁️‍🗨️',
    });
    showPasswordSpan.setCallback(() => {
      const currentText = showPasswordSpan.getNode().textContent;
      const newText = currentText === '👁️' ? '👁️‍🗨️' : '👁️';
      showPasswordSpan.setTextContent(newText);
      const passwordInput = passwordInputDiv.getNode().querySelector('input');
      if (passwordInput instanceof HTMLInputElement) {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
      }
    });
    passwordInputDiv.addInnerElement(showPasswordSpan);
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
      callback: () => this.router.navigate(Pages.REGISTRATION),
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
      this.submitHandler();
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

  submitHandler() {
    const isEmailValid = validateEmail(this.email, this.emailError);
    const isPasswordValid = validatePassword(this.password, this.passwordError);
    if (isEmailValid && isPasswordValid) {
      console.log('Email:', (this.email.getNode() as HTMLInputElement).value);
      console.log('Password:', (this.password.getNode() as HTMLInputElement).value);
      // if true, send data to commercetools, check there (if such user already exists) and store it
    }
  }
}
