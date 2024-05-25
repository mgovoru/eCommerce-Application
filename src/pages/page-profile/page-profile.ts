import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import Router from '../../router/router';
import { Server } from '../../server/server';
import State from '../../state/state';
import './page-profile.scss';
import { ElementCreator } from '../../app/base';
import { openModal } from './function-for-modal';
import { patterns, error } from '../page-registration/on-input-function';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-profile'],
};

export default class ProfilePageView extends View {
  state: State;

  router: Router;

  server: Server;

  constructor(router: Router, state: State, server: Server) {
    super(mainParams);
    this.state = state;
    this.router = router;
    this.server = server;
    this.configureView();
  }

  configureView() {
    const containerNew = new ContainerView();
    containerNew.addNameClass('page-profile');
    const container = containerNew.getElement();
    this.viewElementCreator.append(container);
    const elemCreatContainer = new ElementCreator({
      tag: 'div',
      classNames: ['elem-create__container'],
    });
    container.appendChild(elemCreatContainer.getNode());
    this.mainUserData(elemCreatContainer);
  }

  mainUserData(container: ElementCreator) {
    const title = new ElementCreator({
      tag: 'div',
      textContent: 'User Profile',
      classNames: ['page-profile__title'],
    });
    container.addInnerElement(title);

    const containerUser = new ElementCreator({
      tag: 'div',
      classNames: ['page-profile__user-main__container'],
    });
    container.addInnerElement(containerUser);

    const labelFirstName = new ElementCreator({
      tag: 'div',
      classNames: ['user-main__label', 'f-name'],
    });
    const textLabelFirstName = new ElementCreator({
      tag: 'span',
      textContent: 'First Name: ',
      classNames: ['pp-f-name'],
    });
    const firstName = new ElementCreator({
      tag: 'span',
      textContent: 'Test _Name',
      classNames: ['user-main__value', 'f-name-value'],
    });
    const firstNameButton = new ElementCreator({
      tag: 'button',
      textContent: 'Change',
      classNames: ['user-main__button', 'f-name-button'],
    });
    firstNameButton.setCallback(() => {
      const classOfSelectedElement = textLabelFirstName.getNode().className;
      const patternFirstName = Object.values(patterns[0])[0];
      const errorFirstName = Object.values(error[0])[0];
      openModal(classOfSelectedElement, patternFirstName, errorFirstName);
      // код для обработки клика по кнопке
    });
    containerUser.addInnerElement(labelFirstName);
    labelFirstName.addInnerElement(textLabelFirstName);
    labelFirstName.addInnerElement(firstName);
    labelFirstName.addInnerElement(firstNameButton);
    this.lastName(containerUser);
  }

  lastName(container: ElementCreator) {
    const labelLastName = new ElementCreator({
      tag: 'div',
      classNames: ['user-main__label', 'l-name'],
    });
    const textLabelLastName = new ElementCreator({
      tag: 'span',
      textContent: 'Last Name: ',
      classNames: ['pp-l-name'],
    });
    const LastName = new ElementCreator({
      tag: 'span',
      textContent: 'last',
      classNames: ['user-main__value', 'l-name-value'],
    });
    const lastNameButton = new ElementCreator({
      tag: 'button',
      textContent: 'Change',
      classNames: ['user-main__button', 'l-name-button'],
    });
    lastNameButton.setCallback(() => {
      const classOfSelectedElement = textLabelLastName.getNode().className;
      const patternLastName = Object.values(patterns[1])[0];
      const errorLastName = Object.values(error[1])[0];
      openModal(classOfSelectedElement, patternLastName, errorLastName);
      // код для обработки клика по кнопке
    });
    container.addInnerElement(labelLastName);
    labelLastName.addInnerElement(textLabelLastName);
    labelLastName.addInnerElement(LastName);
    labelLastName.addInnerElement(lastNameButton);
  }
}
