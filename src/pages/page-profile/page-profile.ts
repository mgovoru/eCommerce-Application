import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import Router from '../../router/router';
import { Server } from '../../server/server';
import State from '../../state/state';
import './page-profile.scss';
import { ElementCreator } from '../../app/base';

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
      textContent: 'First Name: ',
      classNames: ['user-main__label', 'f-name'],
    });
    containerUser.addInnerElement(labelFirstName);
    const firstName = new ElementCreator({
      tag: 'span',
      textContent: 'Test _Name',
      classNames: ['user-main__value', 'f-name-value'],
    });
    labelFirstName.addInnerElement(firstName);
    const firstNameButton = new ElementCreator({
      tag: 'button',
      textContent: 'Change',
      classNames: ['user-main__button', 'f-name-button'],
    });
    labelFirstName.addInnerElement(firstNameButton);
  }
}
