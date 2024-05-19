import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import State from '../../state/state';
import './main-page.scss';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-main'],
};

export default class MainPageView extends View {
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
    containerNew.addNameClass('page-main');
    const container = containerNew.getElement();
    this.textBlock = this.drawElement({ tag: 'div', classNames: ['page-main__text'] }, container);
    if (localStorage.getItem('name')) {
      this.textBlock.textContent = `Hello, ${JSON.parse(localStorage.getItem('name') as string)}`;
    } else {
      this.textBlock.textContent = `Hello!`;
    }
    this.viewElementCreator.append(container);
  }

  addText(str: string) {
    if (this.textBlock) {
      this.textBlock.textContent = `Hello! ${str}`;
    }
  }
}
