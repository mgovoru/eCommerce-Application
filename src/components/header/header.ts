import { View } from '../../app/view';
import elementImageSrc from '../../assets/AIPainterShop.png';
// import srcSearch from '../../assets/search.svg';
import srcProfile from '../../assets/profile.svg';
import srcCart from '../../assets/basket.svg';
import srcSignIn from '../../assets/sign-in.svg';
import srcSignOut from '../../assets/sign-out.svg';
import { ContainerView } from '../container/container';
import './header.scss';
import Router from '../../router/router';
import { Pages } from '../../router/pages';
import { Server } from '../../server/server';

const headerParams = {
  tag: 'header',
  textContent: '',
  classNames: ['header'],
};

export class HeaderView extends View {
  container: HTMLElement | null;

  elementNav: HTMLElement | null;

  elementButtons: HTMLElement | null;

  headerLinkElements: Map<string, HTMLElement>;

  router: Router;

  server: Server;

  constructor(router: Router, server: Server) {
    super(headerParams);
    this.container = null;
    this.elementNav = null;
    this.elementButtons = null;
    this.router = router;
    this.server = server;
    this.headerLinkElements = new Map();
    this.configureView();
  }

  configureView() {
    this.headerContainerCreate();
    this.logoCreate();
    this.navCreate();
    this.addButtons();
    this.buttonLoginCreate(srcProfile);
    this.buttonSignInCreate(srcSignIn);
    this.buttonSignOutCreate(srcSignOut);
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
      callback: async () => {
        this.router.navigate(``);
      },
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
    const names = [Pages.ABOUT, Pages.MAIN, Pages.SHOP];
    names.forEach((el) => {
      const elem = this.drawElement(itemParams, elementUl as HTMLElement);
      const linkParams = {
        tag: 'a',
        textContent: '',
        classNames: ['header__nav-link'],
        callback: (event: Event) => {
          event.preventDefault();
          this.router.navigate(el);
        },
      };
      const linkElement = this.drawLinkElement(linkParams, el.toUpperCase(), '', elem as HTMLElement);
      this.headerLinkElements.set(el.toUpperCase(), linkElement);
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

  buttonLoginCreate(src: string): HTMLButtonElement {
    const profileParams = {
      tag: 'button',
      textContent: '',
      classNames: ['header__profile'],
      callback: () => {
        if (!localStorage.getItem('name')) {
          this.router.navigate(Pages.LOGIN);
        } else {
          this.router.navigate(Pages.PROFILE);
        }
      },
    };
    const imgParams = {
      tag: 'img',
      textContent: '',
      classNames: ['header__img-profile'],
    };
    const element = this.drawButtonElement(profileParams, 'button', this.elementButtons as HTMLElement);
    const elementImage = this.drawImageElement(imgParams, src, 'profile', element);
    elementImage.title = 'login';

    return element;
  }

  buttonSignInCreate(src: string): HTMLButtonElement {
    const signInParams = {
      tag: 'button',
      textContent: '',
      classNames: ['header__sign-in'],
      callback: () => this.router.navigate(Pages.REGISTRATION),
    };
    const imgParams = {
      tag: 'img',
      textContent: '',
      classNames: ['header__img-sign-in'],
    };
    const element = this.drawButtonElement(signInParams, 'button', this.elementButtons as HTMLElement);
    const elementImage = this.drawImageElement(imgParams, src, 'sign-in', element);
    elementImage.title = 'sign in';
    return element;
  }

  buttonSignOutCreate(src: string): HTMLButtonElement {
    const signOutParams = {
      tag: 'button',
      textContent: '',
      classNames: ['header__sign-out'],
      callback: () => {
        localStorage.clear();
        this.router.navigate(Pages.INDEX);
      },
    };
    const imgParams = {
      tag: 'img',
      textContent: '',
      classNames: ['header__img-sign-out'],
    };
    const element = this.drawButtonElement(signOutParams, 'button', this.elementButtons as HTMLElement);
    const elementImage = this.drawImageElement(imgParams, src, 'sign-out', element);
    elementImage.title = 'sign out';
    return element;
  }

  buttonCartCreate(src: string): HTMLButtonElement {
    const cartParams = {
      tag: 'button',
      textContent: '',
      classNames: ['header__cart'],
      callback: () => this.router.navigate(Pages.CART),
    };
    const imgParams = {
      tag: 'img',
      textContent: '',
      classNames: ['header__img-profile'],
    };
    const element = this.drawButtonElement(cartParams, 'button', this.elementButtons as HTMLElement);
    const elementImage = this.drawImageElement(imgParams, src, 'cart', element);
    elementImage.title = 'cart';
    return element;
  }

  addMenu(): HTMLElement {
    const menu = this.drawElement({ tag: 'div', classNames: ['icon-menu'] }, this.container as HTMLElement);
    this.drawElement({ tag: 'span' }, menu as HTMLElement);
    return menu;
  }

  setSelectedItem(namePage: string) {
    this.setAllNoSelectedItem();
    if (this.headerLinkElements.get(namePage.toUpperCase())) {
      const linkItem = this.headerLinkElements.get(namePage.toUpperCase()) as HTMLLinkElement;
      this.setSelected(linkItem);
    }
  }

  setAllNoSelectedItem() {
    this.headerLinkElements.forEach((value) => {
      if (value.classList.contains('selected')) {
        this.setNotSelected(value as HTMLLinkElement);
      }
    });
  }
}
