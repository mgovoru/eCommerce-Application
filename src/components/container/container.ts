import { View } from '../../app/view';
import './container.scss';

const containerParams = {
  tag: 'div',
  textContent: '',
};

export class ContainerView extends View {
  constructor() {
    super(containerParams);
  }

  addNameClass(name: string) {
    this.viewElementCreator.addClass(`${name}__container`);
  }
}
