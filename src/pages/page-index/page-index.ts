import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import State from '../../state/state';
import './page-index.scss';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-index'],
};

export default class PageIndexView extends View {
  state: State;

  constructor(state: State) {
    super(mainParams);
    this.state = state;
    this.configureView();
  }

  configureView() {
    const containerNew = new ContainerView();
    containerNew.addNameClass('page-index');
    const container = containerNew.getElement();
    const textBlock = this.drawElement({ tag: 'div', classNames: ['page-index__textblock'] }, container);
    this.drawElement({ tag: 'div', textContent: 'NEW IMAGE', classNames: ['page-index__boxNew'] }, textBlock);
    this.drawElement({ tag: 'H1', textContent: 'FORCE AI', classNames: ['page-index__title'] }, textBlock);
    this.drawElement(
      {
        tag: 'H6',
        textContent: 'universe galaxy view',
        classNames: ['page-index__sub-title'],
      },
      textBlock
    );
    this.drawElement(
      {
        tag: 'p',
        textContent: `79,99 €`,
        classNames: ['page-index__price'],
      },
      textBlock
    );
    this.drawButtonElement(
      { tag: 'button', textContent: 'BUY NOW', classNames: ['page-index__button', 'button'] },
      'button',
      textBlock
    );
    const heightHeader = document.querySelector('.header')?.clientHeight || 0;
    const heightFooter = document.querySelector('.footer')?.clientHeight || 0;
    this.getElement().style.height = `${window.innerHeight - heightHeader - heightFooter}px`;
    this.viewElementCreator.append(container);
  }
}
