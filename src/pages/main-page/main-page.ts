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
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    this.viewElementCreator.append(container);
  }

  resize() {
    const heightHeader = document.querySelector('.header')?.clientHeight || 0;
    const heightFooter = document.querySelector('.footer')?.clientHeight || 0;
    this.getElement().style.height = `${window.innerHeight - heightHeader - heightFooter}px`;
  }

  addText(str: string) {
    if (this.textBlock) {
      this.textBlock.textContent = `Hello! ${str}`;
    }
  }
}
