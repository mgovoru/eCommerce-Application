import { View } from '../../app/view';
import './container.scss';

const containerParams = {
  tag: 'div',
  textContent: '',
  classNames: ['container'],
};

export class ContainerView extends View {
  constructor() {
    super(containerParams);
  }
}
