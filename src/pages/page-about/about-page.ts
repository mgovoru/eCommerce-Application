import './about-page.scss';
import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import State from '../../state/state';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-about'],
};

export default class AboutPageView extends View {
  state: State;

  textBlock: HTMLElement | null;

  constructor(state: State) {
    super(mainParams);
    this.state = state;
    this.textBlock = null;
    this.configureView();
  }

  configureView() {
    const containerNew = new ContainerView();
    containerNew.addNameClass('page-about');
    const container = containerNew.getElement();
    this.textBlock = this.drawElement({ tag: 'div', classNames: ['page-about__text'] }, container);
    this.textBlock.textContent = `This ABOUT page`;
    this.viewElementCreator.append(container);
  }
}
