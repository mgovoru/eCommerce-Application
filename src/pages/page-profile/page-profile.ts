import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import Router from '../../router/router';
import { Server } from '../../server/server';
import State from '../../state/state';
import './page-profile.scss';
import { ElementCreator } from '../../app/base';
import { openModal } from './function-for-modal';
import { patterns, error } from '../page-registration/on-input-function';
import { userVariable } from './userVariable';
import { ProfilePageRequest } from '../../server/profileRequest';
import { passOpenModal } from './change-password/open-modal-for-password';

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
    // получаю данные пользователя с сервера
    this.server.workApi.updateUser().then((r) => {
      if (r) {
        userVariable.email = r.email;
        userVariable.currentPassword = r.password;
      }
      // отрисовываю страницу после получения данных
      this.mainUserData(elemCreatContainer);
      this.password(elemCreatContainer);
    });
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
      textContent: userVariable.firstName,
      classNames: ['user-main__value', 'f-name-value'],
    });
    const firstNameButton = new ElementCreator({
      tag: 'button',
      textContent: 'Change',
      classNames: ['user-main__button', 'f-name-button'],
    });
    firstNameButton.setCallback(() => {
      // код для обработки клика по кнопке
      const classOfSelectedElement = textLabelFirstName.getNode().className;
      const patternFirstName = Object.values(patterns[0])[0];
      const errorFirstName = Object.values(error[0])[0];
      openModal(classOfSelectedElement, patternFirstName, errorFirstName, () => {
        this.server.workApi.firstNameUpdateUser();
      });
    });
    containerUser.addInnerElement(labelFirstName);
    labelFirstName.addInnerElement(textLabelFirstName);
    labelFirstName.addInnerElement(firstName);
    labelFirstName.addInnerElement(firstNameButton);
    this.lastName(containerUser);
    this.dateOfBirth(containerUser);
    this.email(containerUser);
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
    const lastName = new ElementCreator({
      tag: 'span',
      textContent: userVariable.lastName,
      classNames: ['user-main__value', 'l-name-value'],
    });
    const lastNameButton = new ElementCreator({
      tag: 'button',
      textContent: 'Change',
      classNames: ['user-main__button', 'l-name-button'],
    });
    lastNameButton.setCallback(() => {
      // код для обработки клика по кнопке
      const classOfSelectedElement = textLabelLastName.getNode().className;
      const patternLastName = Object.values(patterns[1])[0];
      const errorLastName = Object.values(error[1])[0];
      openModal(classOfSelectedElement, patternLastName, errorLastName, () => {
        this.server.workApi.lastNameUpdateUser();
      });
    });
    container.addInnerElement(labelLastName);
    labelLastName.addInnerElement(textLabelLastName);
    labelLastName.addInnerElement(lastName);
    labelLastName.addInnerElement(lastNameButton);
  }

  dateOfBirth(container: ElementCreator) {
    const labelDateOfBirth = new ElementCreator({
      tag: 'div',
      classNames: ['user-main__label', 'date-birth'],
    });
    const textLabelDateOfBirth = new ElementCreator({
      tag: 'span',
      textContent: 'Date of birth(Y-M-D): ',
      classNames: ['pp__date-birth'],
    });
    const date = new ElementCreator({
      tag: 'span',
      textContent: userVariable.dateOfBirth,
      classNames: ['user-main__value', 'date-birth-value'],
    });
    const dateButton = new ElementCreator({
      tag: 'button',
      textContent: 'Change',
      classNames: ['user-main__button', 'date-birth-button'],
    });
    dateButton.setCallback(() => {
      // код для обработки клика по кнопке
      const classOfSelectedElement = textLabelDateOfBirth.getNode().className;
      const pattern = Object.values(patterns[5])[0];
      const errorThis = Object.values(error[5])[0];
      openModal(classOfSelectedElement, pattern, errorThis, () => {
        this.server.workApi.dateOfBirthUpdateUser();
      });
    });
    container.addInnerElement(labelDateOfBirth);
    labelDateOfBirth.addInnerElement(textLabelDateOfBirth);
    labelDateOfBirth.addInnerElement(date);
    labelDateOfBirth.addInnerElement(dateButton);
  }

  email(container: ElementCreator) {
    const labelEmail = new ElementCreator({
      tag: 'div',
      classNames: ['user-main__label', 'email__profile'],
    });
    const textLabelEmail = new ElementCreator({
      tag: 'span',
      textContent: 'email: ',
      classNames: ['pp__email'],
    });
    const email = new ElementCreator({
      tag: 'span',
      textContent: userVariable.email,
      classNames: ['user-main__value', 'pp__email-value'],
    });
    const emailButton = new ElementCreator({
      tag: 'button',
      textContent: 'Change',
      classNames: ['user-main__button', 'pp__email-button'],
    });
    emailButton.setCallback(() => {
      // код для обработки клика по кнопке
      const classOfSelectedElement = textLabelEmail.getNode().className;
      const pattern = Object.values(patterns[2])[0];
      const errorThis = Object.values(error[2])[0];
      openModal(classOfSelectedElement, pattern, errorThis, () => {
        new ProfilePageRequest(this.server, this.router).emailUpdateUser();
      });
    });
    container.addInnerElement(labelEmail);
    labelEmail.addInnerElement(textLabelEmail);
    labelEmail.addInnerElement(email);
    labelEmail.addInnerElement(emailButton);
  }

  password(container: ElementCreator) {
    const passwordTitle = new ElementCreator({
      tag: 'div',
      textContent: 'password',
      classNames: ['page-profile__password-title'],
    });
    const containerPassword = new ElementCreator({
      tag: 'div',
      classNames: ['page-profile__user-main__container'],
    });
    const textLabelPassword = new ElementCreator({
      tag: 'span',
      textContent: 'password: ',
      classNames: ['pp__password'],
    });
    const password = new ElementCreator({
      tag: 'span',
      textContent: userVariable.currentPassword,
      classNames: ['user-main__value', 'pp__password-value'],
    });
    const passwordButton = new ElementCreator({
      tag: 'button',
      textContent: 'Change',
      classNames: ['user-main__button', 'pp__password-button'],
    });
    passwordButton.setCallback(() => {
      // код для обработки клика по кнопке
      const classOfSelectedElement = textLabelPassword.getNode().className;
      const pattern = Object.values(patterns[3])[0];
      const errorThis = Object.values(error[3])[0];
      passOpenModal(classOfSelectedElement, pattern, errorThis, () => {
        new ProfilePageRequest(this.server, this.router).passwordUpdateUser();
        password.getNode().textContent = '*****';
      });
    });
    container.addInnerElement(passwordTitle);
    container.addInnerElement(containerPassword);
    containerPassword.addInnerElement(textLabelPassword);
    textLabelPassword.addInnerElement(password);
    textLabelPassword.addInnerElement(passwordButton);
  }
}
