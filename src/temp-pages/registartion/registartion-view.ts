import View from '../view';
// import './not-found.css';

const CssClasses = {
  ERROR: 'not-found',
};
const TEXT_REG = 'THIS IS OUR REGISTARTION PAGE';

export default class RegistartionView extends View {
  constructor() {
    /**
     * @type {import('../../view').ViewParams}
     */
    const params = {
      tag: 'section',
      classNames: [CssClasses.ERROR],
    };
    super(params);
    this.configureView();
  }

  configureView() {
    this.viewElementCreator.setTextContent(TEXT_REG);
  }
}
