import { View } from '../../app/view';
import elementImageSrc from '../../assets/AIPainterShop.png';
import srcSearch from '../../assets/search.svg';
import { ContainerView } from '../container/container';
import './header.scss';

const headerParams = {
  tag: 'header',
  textContent: '',
  classNames: ['header'],
};

export class HeaderView extends View {
  container: HTMLElement | null;

  elementNav: HTMLElement | null;

  elementButtons: HTMLElement | null;

  constructor() {
    super(headerParams);
    this.container = null;
    this.elementNav = null;
    this.elementButtons = null;
    this.configureView();
  }

  configureView() {
    this.headerContainerCreate();
    this.logoCreate();
    this.navCreate();
    this.addButtons();
    this.buttonSeachCreate(srcSearch);
  }

  headerContainerCreate(): void {
    const partParams = {
      tag: 'div',
      textContent: '',
      classNames: ['header__wrapper'],
    };
    const elementWhitePart = this.drawElement(partParams);
    const element = new ContainerView();
    element.addNameClass('header');
    this.container = element.getElement();
    elementWhitePart.append(this.container);
  }

  logoCreate(): void {
    const logoParams = {
      tag: 'img',
      textContent: '',
      classNames: ['header__img'],
    };
    this.drawImageElement(logoParams, elementImageSrc, this.container as HTMLElement);
  }

  navCreate(): void {
    const navParams = {
      tag: 'nav',
      textContent: '',
      classNames: ['header__nav'],
    };
    this.elementNav = this.drawElement(navParams, this.container as HTMLElement);
  }

  addButtons() {
    const butParams = {
      tag: 'div',
      textContent: '',
      classNames: ['header__group-buttons'],
    };
    this.elementButtons = this.drawElement(butParams, this.container as HTMLElement);
  }

  buttonSeachCreate(src: string) {
    const seachParams = {
      tag: 'img',
      textContent: '',
      classNames: ['header__search'],
    };
    this.drawImageElement(seachParams, src, this.elementButtons as HTMLElement);
  }

  buttonLoginCreate() { }

  buttonCartCreate() { }
}
