import { View } from '../../app/view';
import Page404View from '../../pages/404page/404page';
// import PageMainView from '../../pages/page-main/page-main';

import './main.scss';

export class MainView extends View {
  page: View | null;

  constructor() {
    const mainParams = {
      tag: 'main',
      textContent: '',
      classNames: ['main'],
    };
    super(mainParams);
    this.page = null;
    // чтобы проверить верстку страницы без роутера
    this.setContent(new Page404View());
  }

  setContent(content: View) {
    const htmlElement = this.viewElementCreator.getNode();
    while (htmlElement.firstElementChild) {
      htmlElement.firstElementChild.remove();
    }
    this.viewElementCreator.addInnerElement(content.getElement());
  }
}
