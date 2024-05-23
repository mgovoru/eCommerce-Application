import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import State from '../../state/state';
import './page-profile.scss';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-profile'],
};

export default class MainPageView extends View {
  state: State;

  constructor(state: State) {
    super(mainParams);
    this.state = state;
    this.configureView();
  }

  configureView() {
    const containerNew = new ContainerView();
    containerNew.addNameClass('page-profile');
    const container = containerNew.getElement();
    this.viewElementCreator.append(container);
  }
}
