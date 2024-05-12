import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import State from '../../state/state';
import './page-main.scss';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-main'],
};

export default class PageMainView extends View {
  state: State;

  constructor(state: State) {
    super(mainParams);
    this.state = state;
    this.configureView();
  }

  configureView() {
    const containerNew = new ContainerView();
    containerNew.addNameClass('page-main');
    const container = containerNew.getElement();
    const textBlock = this.drawElement({ tag: 'div', classNames: ['page-main__textblock'] }, container);
    this.drawElement({ tag: 'div', textContent: 'NEW IMAGE', classNames: ['page-main__boxNew'] }, textBlock);
    this.drawElement({ tag: 'H1', textContent: 'FORCE AI', classNames: ['page-main__title'] }, textBlock);
    this.drawElement(
      {
        tag: 'H6',
        textContent: 'universe galaxy view',
        classNames: ['page-main__sub-title'],
      },
      textBlock
    );
    this.drawElement(
      {
        tag: 'p',
        textContent: `79,99 €`,
        classNames: ['page-main__price'],
      },
      textBlock
    );
    this.drawButtonElement(
      { tag: 'button', textContent: 'BUY NOW', classNames: ['page-main__button', 'button'] },
      'button',
      textBlock
    );
    this.viewElementCreator.append(container);
  }
}
