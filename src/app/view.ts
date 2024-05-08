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
}
