import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import State from '../../state/state';
import './registration-mg.scss';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-registration'],
};

export default class RegistrationView extends View {
  state: State;

  constructor(state: State) {
    super(mainParams);
    this.state = state;
    this.configureView();
  }

  configureView() {
    const containerNew = new ContainerView();
    containerNew.addNameClass('page-registration');
    const container = containerNew.getElement();
    const textBlock = this.drawElement({ tag: 'div', classNames: ['page-registration__text'] }, container);
    textBlock.textContent = 'page-registration';
    this.viewElementCreator.append(container);
  }
}
