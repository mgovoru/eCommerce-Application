import Lenis from 'lenis';

import { View } from '../../app/view';

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
    this.addlenis();
  }

  setContent(content: View) {
    const htmlElement = this.viewElementCreator.getNode();
    while (htmlElement.firstElementChild) {
      htmlElement.firstElementChild.remove();
    }
    this.viewElementCreator.addInnerElement(content.getElement());
  }

  addlenis() {
    const lenis = new Lenis();

    // lenis.on('scroll', (e: unknown) => {
    //   console.log(e);
    // });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
}
