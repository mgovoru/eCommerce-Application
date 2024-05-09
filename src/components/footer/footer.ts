import { View } from '../../app/view';
import { ContainerView } from '../container/container';
import './footer.scss';
import imageSrc from '../../assets/rs_school_js.svg';
import { GitHubAdress, GitHubHame } from '../../app/enum';

const footerParams = {
  tag: 'footer',
  textContent: '',
  classNames: ['footer'],
};
export class FooterView extends View {
  container: HTMLElement | null;

  constructor() {
    super(footerParams);
    this.container = null;
    this.configureView();
  }

  configureView() {
    this.footerContainerCreate();
    this.listCreate();
    this.logoCreate();
  }

  footerContainerCreate(): void {
    const element = new ContainerView();
    element.addNameClass('footer');
    this.container = element.getElement();
    this.getElement().append(this.container);
    const yearParams = {
      tag: 'div',
      textContent: '',
      classNames: ['footer__year'],
    };
    const year = this.drawElement(yearParams, this.container as HTMLElement);
    year.innerHTML = '@2024';
  }

  logoCreate(): void {
    const logoParams = {
      tag: 'img',
      textContent: '',
      classNames: ['footer__img'],
    };
    this.drawImageElement(logoParams, imageSrc, 'logo', this.container as HTMLElement);
  }

  listCreate(): void {
    const navParams = {
      tag: 'div',
      textContent: '',
      classNames: ['footer__list'],
    };
    const elementList = this.drawElement(navParams, this.container as HTMLElement);
    const ulParams = {
      tag: 'ul',
      textContent: '',
      classNames: ['footer__items'],
    };
    const elementUl = this.drawElement(ulParams, elementList as HTMLElement);
    const itemParams = {
      tag: 'li',
      textContent: '',
      classNames: ['footer__item'],
    };
    const linkParams = {
      tag: 'a',
      textContent: '',
      classNames: ['footer__link'],
    };
    const names = [GitHubHame.GOVORU, GitHubHame.LEX, GitHubHame.KLYASS];
    const git = [GitHubAdress.GITGOVORU, GitHubAdress.GITLEX, GitHubAdress.GITKLYASS];
    names.forEach((el, index) => {
      const elem = this.drawElement(itemParams, elementUl as HTMLElement);
      this.drawLinkElement(linkParams, el, git[index], elem as HTMLElement);
    });
  }
}
