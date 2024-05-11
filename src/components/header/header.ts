import { View } from '../../app/view';
import elementImageSrc from '../../assets/AIPainterShop.png';
import srcSearch from '../../assets/search.svg';
import srcProfile from '../../assets/profile.svg';
import srcCart from '../../assets/basket.svg';
import { ContainerView } from '../container/container';
import './header.scss';
import { Navigation } from '../../app/enum';

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
    this.buttonLoginCreate(srcProfile);
    this.buttonCartCreate(srcCart);
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
    this.drawImageElement(logoParams, elementImageSrc, 'logo', this.container as HTMLElement);
  }

  navCreate(): HTMLElement {
    const navParams = {
      tag: 'nav',
      textContent: '',
      classNames: ['header__nav'],
    };
    this.elementNav = this.drawElement(navParams, this.container as HTMLElement);
    const ulParams = {
      tag: 'ul',
      textContent: '',
      classNames: ['header__nav-items'],
    };
    const elementUl = this.drawElement(ulParams, this.elementNav as HTMLElement);
    const itemParams = {
      tag: 'li',
      textContent: '',
      classNames: ['header__nav-item'],
    };
    const linkParams = {
      tag: 'a',
      textContent: '',
      classNames: ['header__nav-link'],
    };
    const names = [Navigation.ABOUT, Navigation.MAIN, Navigation.SHOP];
    names.forEach((el) => {
      const elem = this.drawElement(itemParams, elementUl as HTMLElement);
      // вставляется ссылка
      const src = '';
      this.drawLinkElement(linkParams, el, src, elem as HTMLElement);
    });
    if (window.innerWidth < 768) {
      const menu = this.addMenu();
      menu.addEventListener('click', () => {
        menu.classList.toggle('menu-open');
        elementUl.style.display = 'flex';
        if (!elementUl.classList.contains('animation')) {
          elementUl.classList.add('animation');
          elementUl.classList.remove('animationReturn');
        } else {
          elementUl.classList.add('animationReturn');
          elementUl.classList.remove('animation');
          setTimeout(() => {
            elementUl.style.display = 'none';
          }, 1000);
        }
      });
      elementUl.addEventListener('click', () => {
        menu.classList.toggle('menu-open');
        elementUl.classList.add('animationReturn');
        elementUl.classList.remove('animation');
        setTimeout(() => {
          elementUl.style.display = 'none';
        }, 1000);
      });
    }
    return this.elementNav;
  }

  addButtons(): void {
    const butParams = {
      tag: 'div',
      textContent: '',
      classNames: ['header__group-buttons'],
    };
    this.elementButtons = this.drawElement(butParams, this.container as HTMLElement);
  }

  buttonSeachCreate(src: string): HTMLButtonElement {
    const seachParams = {
      tag: 'button',
      textContent: '',
      classNames: ['header__search'],
    };
    const imgParams = {
      tag: 'img',
      textContent: '',
      classNames: ['header__img-search'],
    };
    const element = this.drawButtonElement(seachParams, 'button', this.elementButtons as HTMLElement);
    this.drawImageElement(imgParams, src, 'search', element);
    return element;
  }

  buttonLoginCreate(src: string): HTMLButtonElement {
    const profileParams = {
      tag: 'button',
      textContent: '',
      classNames: ['header__profile'],
    };
    const imgParams = {
      tag: 'img',
      textContent: '',
      classNames: ['header__img-profile'],
    };
    const element = this.drawButtonElement(profileParams, 'button', this.elementButtons as HTMLElement);
    this.drawImageElement(imgParams, src, 'profile', element);
    return element;
  }

  buttonCartCreate(src: string): HTMLButtonElement {
    const cartParams = {
      tag: 'button',
      textContent: '',
      classNames: ['header__cart'],
    };
    const imgParams = {
      tag: 'img',
      textContent: '',
      classNames: ['header__img-profile'],
    };
    const element = this.drawButtonElement(cartParams, 'button', this.elementButtons as HTMLElement);
    this.drawImageElement(imgParams, src, 'cart', element);
    return element;
  }

  addMenu(): HTMLElement {
    const menu = this.drawElement({ tag: 'div', classNames: ['icon-menu'] }, this.container as HTMLElement);
    this.drawElement({ tag: 'span' }, menu as HTMLElement);
    return menu;
  }
}
