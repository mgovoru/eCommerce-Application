import { ElementCreator } from '../../app/base';
import { View } from '../../app/view';
import elementImageSrc from '../../assets/AIPainterShop.png';

const headerParams = {
  tag: 'header',
  textContent: '',
  classNames: ['header'],
};

export class HeaderView extends View {
  constructor() {
    super(headerParams);
    this.configureView();
  }

  configureView() {
    this.logoCreate();
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
    this.getElement().append(elementImage);
  }

  navCreate() {}

  addButtons() {}

  buttonSeachCreate() {}

  buttonLoginCreate() {}

  buttonCartCreate() {}
}
