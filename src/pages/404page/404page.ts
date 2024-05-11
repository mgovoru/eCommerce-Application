import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import srcImg from '../../assets/cow.png';
import './404page.scss';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-404'],
};

export default class Page404View extends View {
  constructor() {
    super(mainParams);
    this.configureView();
  }

  configureView() {
    const containerNew = new ContainerView();
    containerNew.addNameClass('page-404');
    const container = containerNew.getElement();
    const contentBlock = this.drawElement({ tag: 'div', classNames: ['page-404__block', '-ibg'] }, container);
    this.drawImageElement({ tag: 'img', classNames: ['page-404__img'] }, srcImg, 'cow', contentBlock);
    const textBlock = this.drawElement({ tag: 'div', classNames: ['page-404__text-block'] }, container);
    this.drawElement(
      {
        tag: 'div',
        textContent: `We’ve hit a snag. The page you’re looking for isn’t here. Maybe it moved somewhere else, or you mistyped the address. How about we take you back to our homepage?
`,
        classNames: ['page-404__text'],
      },
      textBlock
    );
    this.drawButtonElement(
      { tag: 'button', textContent: 'MAIN', classNames: ['page-404__button', 'button'] },
      'button',
      textBlock
    );
    this.viewElementCreator.append(container);
  }
}
