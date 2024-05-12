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
}
