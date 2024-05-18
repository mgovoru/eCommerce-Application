import { ElementCreator } from '../app/base';
import { View } from '../app/view';
import './error.scss';

export default class ErrorView extends View {
  errorContent: HTMLElement | null;

  constructor() {
    const errorParams = {
      tag: 'div',
      textContent: '',
      classNames: ['error-modal'],
      callback: () => this.hide(),
    };
    super(errorParams);
    this.errorContent = null;
    this.configureView();
  }

  configureView() {
    const errorContentParams = {
      tag: 'div',
      textContent: '',
      classNames: ['error-content'],
    };
    this.errorContent = new ElementCreator(errorContentParams).getNode();
    this.getElement().append(this.errorContent);
    window.addEventListener('click', (event) => {
      if (event.target === this.getElement()) {
        this.hide();
      }
    });
    document.body.append(this.getElement());
  }

  hide() {
    this.getElement().style.display = 'none';
  }

  show(message: string) {
    (this.errorContent as HTMLElement).innerText = message;
    this.getElement().style.display = 'block';
  }
}
