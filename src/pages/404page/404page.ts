import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import srcImg from '../../assets/cow.png';
import './404page.scss';
import { Pages } from '../../router/pages';
import Router from '../../router/router';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-404'],
};

export default class Page404View extends View {
  router: Router;

  errorMessage: string;

  constructor(router: Router, errorMessage: string = '') {
    super(mainParams);
    this.router = router;
    this.errorMessage = errorMessage;
    this.configureView();
  }

  configureView() {
    const containerNew = new ContainerView();
    containerNew.addNameClass('page-404');
    const container = containerNew.getElement();
    const contentBlock = this.drawElement({ tag: 'div', classNames: ['page-404__block', '-ibg'] }, container);
    this.drawImageElement({ tag: 'img', classNames: ['page-404__img'] }, srcImg, 'cow', contentBlock);
    const textBlock = this.drawElement({ tag: 'div', classNames: ['page-404__text-block'] }, container);
    const errorMessageText =
      this.errorMessage ||
      `We’ve hit a snag. The page you’re looking for isn’t here. Maybe it moved somewhere else, or you mistyped the address. How about we take you back to our homepage?`;
    this.drawElement(
      {
        tag: 'div',
        textContent: errorMessageText,
        classNames: ['page-404__text'],
      },
      textBlock
    );
    this.drawButtonElement(
      {
        tag: 'button',
        textContent: 'MAIN',
        classNames: ['page-404__button', 'button'],
        callback: () => {
          this.router.navigate(Pages.MAIN);
        },
      },
      'button',
      textBlock
    );
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
}
