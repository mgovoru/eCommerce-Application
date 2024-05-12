import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import State from '../../state/state';
import './login.scss';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-login'],
};

export default class LoginView extends View {
  state: State;

  constructor(state: State) {
    super(mainParams);
    this.state = state;
    this.configureView();
  }

  configureView() {
    const containerNew = new ContainerView();
    containerNew.addNameClass('page-login');
    const container = containerNew.getElement();
    const textBlock = this.drawElement({ tag: 'div', classNames: ['page-login__text'] }, container);
    textBlock.textContent = 'page-login';
    this.viewElementCreator.append(container);
  }
}
