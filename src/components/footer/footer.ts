import { View } from '../../app/view';
import { ContainerView } from '../container/container';
import './footer.scss';

const footerParams = {
  tag: 'footer',
  textContent: '',
  classNames: ['footer'],
};
export class FooterView extends View {
  constructor() {
    super(footerParams);
    this.configureView();
  }

  configureView() {
    const container = new ContainerView();
    container.getElement().innerHTML = this.render();
    this.getElement().append(container.getElement());
  }

  render() {
    return `
        <div class="footer__item"><a href="https://github.com/mgovoru">Github</a></div>
        <div class="footer__item">
            <p>2024</p>
        </div>
        <div class="footer__item logo-image"><a href="https://rs.school/js/">
            </a>
        </div>`;
  }
}
