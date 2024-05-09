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

  drawElement(par: Params, parent: HTMLElement = this.getElement()): HTMLElement {
    const element = new ElementCreator(par);
    const elementHTML = element.getNode() as HTMLElement;
    parent.append(elementHTML);
    return elementHTML;
  }

  drawImageElement(par: Params, srcImage: string, parent: HTMLElement = this.getElement()) {
    const elementImage = this.drawElement(par, parent) as HTMLImageElement;
    elementImage.src = srcImage;
    return elementImage;
  }

  drawButtonElement(par: Params, type: 'submit' | 'reset' | 'button', parent: HTMLElement = this.getElement()) {
    const elementButton = this.drawElement(par, parent) as HTMLButtonElement;
    elementButton.type = type;
    return elementButton;
  }

  drawLinkElement(par: Params, text: string, src: string, parent: HTMLElement = this.getElement()) {
    const elementLink = this.drawElement(par, parent) as HTMLLinkElement;
    elementLink.innerHTML = text;
    elementLink.href = src;
    return elementLink;
  }
}
