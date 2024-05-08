import { ElementCreator } from '../../app/base';
import { View } from '../../app/view';
import elementImageSrc from '../../assets/AIPainterShop.png';
import { ContainerView } from '../container/container';
import './header.scss';

const headerParams = {
  tag: 'header',
  textContent: '',
  classNames: ['header'],
};

export class HeaderView extends View {
  container: HTMLElement | null;

  constructor() {
    super(headerParams);
    this.container = null;
    this.configureView();
  }

  configureView() {
    this.headerContainerCreate();
    this.logoCreate();
  }

  headerContainerCreate() {
    const partParams = {
      tag: 'div',
      textContent: '',
      classNames: ['header__wrapper'],
    };
    const elementWhitePart = new ElementCreator(partParams);
    this.getElement().append(elementWhitePart.getNode());
    const element = new ContainerView();
    element.addNameClass('header');
    this.container = element.getElement();
    elementWhitePart.getNode().append(this.container);
  }

  logoCreate() {
    const logoParams = {
      tag: 'img',
      textContent: '',
      classNames: ['header__img'],
    };
    const element = new ElementCreator(logoParams);
    const elementImage = element.getNode() as HTMLImageElement;
    elementImage.src = elementImageSrc;
    this.container?.append(elementImage);
  }

  // navCreate() { }

  // addButtons() { }

  // buttonSeachCreate() { }

  // buttonLoginCreate() { }

  // buttonCartCreate() { }
}
