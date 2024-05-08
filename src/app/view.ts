import { ElementCreator } from './base';
import { Params } from './type';

export class View {
  viewElementCreator: ElementCreator;

  constructor(p: Params) {
    this.viewElementCreator = this.createView(p);
  }

  public getElement() {
    return this.viewElementCreator.getNode();
  }

  createView(par: Params) {
    this.viewElementCreator = new ElementCreator(par);
    return this.viewElementCreator;
  }

  drawElement(par: Params, parent: HTMLElement = this.getElement()) {
    const element = new ElementCreator(par);
    const elementHTML = element.getNode() as HTMLElement;
    parent.append(elementHTML);
    return elementHTML;
  }

  drawImageElement(par: Params, srcImage: string, parent: HTMLElement = this.getElement()) {
    const element = new ElementCreator(par);
    const elementImage = element.getNode() as HTMLImageElement;
    elementImage.src = srcImage;
    parent.append(elementImage);
    return elementImage;
  }
}
